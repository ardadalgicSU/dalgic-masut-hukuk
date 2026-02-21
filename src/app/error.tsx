"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Hata izleme servisi entegre edildiğinde buraya eklenebilir (ör. Sentry)
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
        Bir hata oluştu
      </p>
      <h1 className="mt-4 font-heading text-3xl text-gray-900">
        Sayfa yüklenemedi
      </h1>
      <p className="mt-3 max-w-md text-sm text-gray-500">
        Beklenmedik bir sorun oluştu. Lütfen tekrar deneyin ya da ana sayfaya dönün.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={reset}
          className="rounded-full border border-brand/30 px-6 py-2.5 text-sm font-semibold text-brand transition hover:bg-brand/5"
        >
          Tekrar Dene
        </button>
        <Link
          href="/"
          className="rounded-full px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          style={{ backgroundColor: "#8B1A1A" }}
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
