import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// --- Rate limiting (in-memory, per IP) ---
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 dakika

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  return false;
}

// --- Zod validation schema ---
const contactSchema = z.object({
  name: z.string().min(2, "Ad en az 2 karakter olmalı.").max(100),
  email: z.string().email("Geçerli bir e-posta adresi girin."),
  phone: z.string().max(20).optional().default(""),
  subject: z.string().max(200).optional().default("Web Formu"),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalı.").max(2000),
});

// --- HTML escape helper (email body için) ---
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Çok fazla istek gönderildi. Lütfen 10 dakika sonra tekrar deneyin." },
        { status: 429 },
      );
    }

    // Parse & validate
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message ?? "Geçersiz form verisi.";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const payload = result.data;

    const targetEmail =
      process.env.CONTACT_TO ||
      process.env.SMTP_USER ||
      "atilayd@gmail.com";

    const fromEmail =
      process.env.CONTACT_FROM ||
      process.env.SMTP_USER ||
      "noreply@dalgicmasut.av.tr";

    const hasSmtpConfig =
      process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS;

    const transporter = hasSmtpConfig
      ? nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT),
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        })
      : nodemailer.createTransport({
          sendmail: true,
          newline: "unix",
          path: process.env.SENDMAIL_PATH || "/usr/sbin/sendmail",
        });

    await transporter.sendMail({
      // Sabit from — header injection önlemi
      from: `Dalgıç-Masüt Web Formu <${fromEmail}>`,
      // Kullanıcı emaili replyTo'ya — güvenli
      replyTo: `${escapeHtml(payload.name)} <${payload.email}>`,
      to: targetEmail,
      subject: `Web iletişim formu: ${escapeHtml(payload.subject ?? "Web Formu")}`,
      html: `
        <p><strong>Ad Soyad:</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>E-posta:</strong> ${escapeHtml(payload.email)}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(payload.phone ?? "")}</p>
        <p><strong>Konu:</strong> ${escapeHtml(payload.subject ?? "")}</p>
        <hr/>
        <p><strong>Mesaj:</strong></p>
        <p>${escapeHtml(payload.message).replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Mesajınız gönderilirken bir sorun oluştu." },
      { status: 500 },
    );
  }
}
