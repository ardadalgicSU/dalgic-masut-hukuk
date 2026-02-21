import type { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import PageHeader from "@/components/PageHeader";
import { ArrowRight, Calendar, Clock3 } from "lucide-react";
import { sanitizeHtml } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Yayınlar | Dalgıç-Masüt Hukuk Bürosu",
  description: "Mevzuat değişiklikleri ve içtihat yorumları. Dalgıç-Masüt Hukuk Bürosu avukatlarının kaleme aldığı hukuki makaleler ve değerlendirmeler.",
  openGraph: {
    title: "Yayınlar | Dalgıç-Masüt Hukuk Bürosu",
    description: "Mevzuat değişiklikleri ve içtihat yorumları. Dalgıç-Masüt Hukuk Bürosu avukatlarının kaleme aldığı hukuki makaleler ve değerlendirmeler.",
    url: "https://dalgicmasut.av.tr/yayinlar",
    siteName: "Dalgıç-Masüt Hukuk Bürosu",
    locale: "tr_TR",
    type: "website",
  },
  alternates: { canonical: "https://dalgicmasut.av.tr/yayinlar" },
};
import { fetchPublications } from "@/lib/api";

const PublicationsPage = async () => {
  const publications = await fetchPublications();

  return (
    <>
      <PageHeader
        title="Yayınlar"
        description="Hukuki gelişmeleri yorumladığımız makaleler, e-bültenler ve bilgi notlarımız."
      />
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-8 md:grid-cols-2">
            {publications.map((publication) => (
              <article
                key={publication.slug}
                className="flex h-full flex-col rounded-3xl border border-gray-100 bg-gray-50 p-8 shadow-sm"
              >
                {!!publication.tags.length && (
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                    {publication.tags.join(" · ")}
                  </span>
                )}
                <h2 className="mt-4 font-heading text-2xl text-gray-900">
                  {publication.title}
                </h2>
                {publication.excerptHtml ? (
                  <div
                    className="mt-3 text-sm text-gray-600"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(publication.excerptHtml) }}
                  />
                ) :
                publication.excerpt ? (
                  <p className="mt-3 whitespace-pre-line text-sm text-gray-600">
                    {publication.excerpt}
                  </p>
                ) : null}
                <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                  {publication.publishedDate && (
                    <span className="flex items-center gap-2">
                      <Calendar size={14} />
                      {format(new Date(publication.publishedDate), "d MMMM yyyy", {
                        locale: tr,
                      })}
                    </span>
                  )}
                  {publication.readTime && (
                    <span className="flex items-center gap-2">
                      <Clock3 size={14} />
                      {publication.readTime}
                    </span>
                  )}
                </div>
                <Link
                  href={`/yayinlar/${publication.slug}`}
                  className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-brand"
                >
                  Makaleyi Oku
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PublicationsPage;
