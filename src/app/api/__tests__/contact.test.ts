import { describe, it, expect, vi, beforeEach } from "vitest";

// nodemailer mock
vi.mock("nodemailer", () => ({
  default: {
    createTransport: vi.fn(() => ({
      sendMail: vi.fn().mockResolvedValue({ messageId: "test-id" }),
    })),
  },
}));

// Request helper
function makeRequest(body: unknown, ip = "127.0.0.1"): Request {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("geçerli form başarıyla gönderilir", async () => {
    const { POST } = await import("../contact/route");
    const req = makeRequest({
      name: "Ali Yılmaz",
      email: "ali@example.com",
      message: "Bu bir test mesajıdır.",
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
  });

  it("eksik isim 400 döner", async () => {
    const { POST } = await import("../contact/route");
    const req = makeRequest({
      email: "ali@example.com",
      message: "Mesaj içeriği burada.",
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("geçersiz email formatı 400 döner", async () => {
    const { POST } = await import("../contact/route");
    const req = makeRequest({
      name: "Ali Yılmaz",
      email: "gecersiz-email",
      message: "Mesaj içeriği burada.",
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("çok kısa mesaj 400 döner", async () => {
    const { POST } = await import("../contact/route");
    const req = makeRequest({
      name: "Ali Yılmaz",
      email: "ali@example.com",
      message: "kısa",
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("rate limiting — aynı IP'den 6. istek 429 döner", async () => {
    const { POST } = await import("../contact/route");
    const validBody = {
      name: "Test Kullanıcı",
      email: "test@example.com",
      message: "Rate limit test mesajı içeriği.",
    };
    const testIp = "192.168.1.100";

    // 5 başarılı istek
    for (let i = 0; i < 5; i++) {
      const req = makeRequest(validBody, testIp);
      await POST(req);
    }

    // 6. istek rate limit'e takılmalı
    const req = makeRequest(validBody, testIp);
    const res = await POST(req);
    expect(res.status).toBe(429);
  });
});
