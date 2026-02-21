import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import { fetchPublicationBySlug, fetchPublications } from "@/lib/api";
import { Calendar, Clock3 } from "lucide-react";

export async function generateStaticParams() {
  const publications = await fetchPublications();
  return publications.map((p) => ({ slug: p.slug }));
}

interface PublicationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PublicationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const publication = await fetchPublicationBySlug(slug);

  if (!publication) {
    return { title: "Yayın Bulunamadı | Dalgıç-Masüt Hukuk Bürosu" };
  }

  const title = `${publication.title} | Dalgıç-Masüt Hukuk Bürosu`;
  const description = publication.excerpt ?? `Dalgıç-Masüt Hukuk Bürosu hukuki yayın ve makaleleri.`;

  return {
    title,
    description,
    authors: publication.author ? [{ name: publication.author.name }] : undefined,
    openGraph: {
      title,
      description,
      url: `https://dalgicmasut.av.tr/yayinlar/${slug}`,
      siteName: "Dalgıç-Masüt Hukuk Bürosu",
      locale: "tr_TR",
      type: "article",
      publishedTime: publication.publishedDate ?? undefined,
      authors: publication.author ? [publication.author.name] : undefined,
    },
    alternates: {
      canonical: `https://dalgicmasut.av.tr/yayinlar/${slug}`,
    },
  };
}

const PublicationPage = async ({ params }: PublicationPageProps) => {
  const { slug } = await params;
  const publication = await fetchPublicationBySlug(slug);

  if (!publication) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: publication.title,
    description: publication.excerpt ?? "",
    datePublished: publication.publishedDate ?? undefined,
    author: publication.author
      ? { "@type": "Person", name: publication.author.name }
      : { "@type": "Organization", name: "Dalgıç-Masüt Hukuk Bürosu" },
    publisher: {
      "@type": "Organization",
      name: "Dalgıç-Masüt Hukuk Bürosu",
      url: "https://dalgicmasut.av.tr",
    },
    url: `https://dalgicmasut.av.tr/yayinlar/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <PageHeader
        title={publication.title}
        description={publication.excerpt ?? "Güncel hukuki değerlendirme"}
      />
      <section className="bg-white">
        <article className="mx-auto max-w-3xl px-4 py-16">
          <div className="flex items-center gap-4 text-xs text-gray-500">
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
          {publication.content && (
            <div className="prose prose-sm mt-10 max-w-none text-gray-700 prose-headings:text-gray-900 prose-strong:text-gray-800">
              {publication.content.split(/\n\n+/).map((block, i) => {
                const trimmed = block.trim();
                if (!trimmed) return null;
                // Madde işareti satırları (•, -, *)
                if (trimmed.split('\n').every(l => /^[\s]*[•\-\*\t]/.test(l) || l.trim() === '')) {
                  return (
                    <ul key={i} className="my-3 space-y-1 pl-4">
                      {trimmed.split('\n').filter(l => l.trim()).map((line, j) => (
                        <li key={j} className="flex gap-2 text-sm text-gray-700">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                          {line.replace(/^[\s•\-\*\t]+/, '')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                // Tek satır ve kısa → başlık
                if (!trimmed.includes('\n') && trimmed.length < 60 && i > 0) {
                  return <h3 key={i} className="mt-6 font-heading text-base font-semibold text-gray-900">{trimmed}</h3>;
                }
                // Normal paragraf
                return (
                  <p key={i} className="my-3 text-sm leading-relaxed text-gray-700">
                    {trimmed.replace(/\n/g, ' ')}
                  </p>
                );
              })}
            </div>
          )}
          {publication.author && (
            <p className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              {publication.author.name}
            </p>
          )}
        </article>
      </section>
      <CTASection />
    </>
  );
};

export default PublicationPage;
