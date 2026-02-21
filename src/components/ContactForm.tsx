"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  kvkk: boolean;
};

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isHoveringSubmit, setIsHoveringSubmit] = useState(false);

  const onSubmit = async (values: ContactFormValues) => {
    setFeedback(null);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("İletişim formu gönderilirken hata oluştu.");
      }

      setFeedback("İletiniz alınmıştır. En kısa sürede dönüş yapacağız.");
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Beklenmeyen bir hata oluştu.");
    }
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
      <h3 className="font-heading text-2xl text-gray-900">
        Ücretsiz ön değerlendirme için formu doldurun
      </h3>
      <p className="mt-2 text-sm text-gray-600">
        Uyuşmazlığınızı kısaca anlatın, aynı gün içerisinde size ulaşalım.
      </p>
      <form
        id="contact-form"
        className="mt-6 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Ad Soyad
          </label>
          <input
            id="contact-name"
            type="text"
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
            {...register("name", { required: "Lütfen adınızı girin." })}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-brand">{errors.name.message}</p>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              E-posta
            </label>
            <input
              id="contact-email"
              type="email"
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
              {...register("email", {
                required: "E-posta adresi gereklidir.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
                  message: "Geçerli bir e-posta adresi girin.",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-brand">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="contact-phone" className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Telefon
            </label>
            <input
              id="contact-phone"
              type="tel"
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
              {...register("phone")}
            />
          </div>
        </div>
        <div>
          <label htmlFor="contact-subject" className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Konu
          </label>
          <input
            id="contact-subject"
            type="text"
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
            {...register("subject", { required: "Lütfen konu başlığı girin." })}
          />
          {errors.subject && (
            <p className="mt-1 text-xs text-brand">{errors.subject.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Mesajınız
          </label>
          <textarea
            id="contact-message"
            rows={4}
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
            {...register("message", {
              required: "Lütfen mesajınızı paylaşın.",
              minLength: { value: 20, message: "Mesajınız en az 20 karakter olmalıdır." },
            })}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-brand">{errors.message.message}</p>
          )}
        </div>
        <label className="flex items-start gap-2 text-xs text-gray-600">
          <input
            type="checkbox"
            className="mt-1"
            {...register("kvkk", {
              required: "KVKK metnini onaylamanız gerekmektedir.",
            })}
          />
          <span>
            Kişisel verilerimin 6698 sayılı KVKK kapsamında işlenmesini kabul ediyorum.
          </span>
        </label>
        {errors.kvkk && (
          <p className="mt-1 text-xs text-brand">{errors.kvkk.message}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          onMouseEnter={() => setIsHoveringSubmit(true)}
          onMouseLeave={() => setIsHoveringSubmit(false)}
          style={{
            backgroundColor: "#8B1A1A",
            color: "#ffffff",
            borderRadius: "9999px",
            padding: "0.75rem 1.5rem",
            fontWeight: 600,
            boxShadow: isHoveringSubmit
              ? "0 16px 30px rgba(139, 26, 26, 0.28)"
              : "0 8px 18px rgba(139, 26, 26, 0.18)",
            transform: isHoveringSubmit ? "translateY(-2px)" : "translateY(0)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          className="w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60"
        >
          {isSubmitting ? "Gönderiliyor..." : "Gönder"}
        </button>
      </form>
      {feedback && (
        <p className="mt-4 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          {feedback}
        </p>
      )}
      {error && (
        <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-500">
          {error}
        </p>
      )}
      <p className="mt-6 text-xs text-gray-500">
        Bu form üzerinden iletilen bilgiler gizlilik politikamız kapsamında yalnızca
        sizinle iletişim kurmak ve ön değerlendirme yapmak için kullanılacaktır.
      </p>
    </div>
  );
};

export default ContactForm;
