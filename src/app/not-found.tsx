import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const NotFoundPage = () => (
  <section className="flex min-h-[60vh] items-center justify-center bg-white">
    <div className="mx-auto max-w-xl rounded-3xl border border-gray-100 bg-gray-50 p-10 text-center shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">
        404
      </p>
      <h1 className="mt-4 font-heading text-4xl text-gray-900">
        Sayfa bulunamadı
      </h1>
      <p className="mt-3 text-sm text-gray-600">
        Aradığınız sayfa taşınmış veya silinmiş olabilir. Ana sayfaya dönerek aradığınız içeriğe ulaşabilirsiniz.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
      >
        <ArrowLeft size={16} />
        Ana Sayfaya Dön
      </Link>
    </div>
  </section>
);

export default NotFoundPage;
