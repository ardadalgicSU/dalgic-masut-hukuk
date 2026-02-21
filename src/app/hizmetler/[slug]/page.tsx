import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import { fetchServiceBySlug, fetchServices } from "@/lib/api";

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const services = await fetchServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await fetchServiceBySlug(slug);

  if (!service) {
    return { title: "Hizmet Bulunamadı | Dalgıç-Masüt Hukuk Bürosu" };
  }

  const title = `${service.title} | Dalgıç-Masüt Hukuk Bürosu`;
  const description = service.summary ?? `Eskişehir'de ${service.title} alanında uzman hukuki danışmanlık. Dalgıç-Masüt Hukuk Bürosu.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://dalgicmasut.av.tr/hizmetler/${slug}`,
      siteName: "Dalgıç-Masüt Hukuk Bürosu",
      locale: "tr_TR",
      type: "website",
    },
    alternates: {
      canonical: `https://dalgicmasut.av.tr/hizmetler/${slug}`,
    },
  };
}

const ServiceDetailPage = async ({ params }: ServiceDetailPageProps) => {
  const { slug } = await params;
  const service = await fetchServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <PageHeader
        title={service.title}
        description={service.summary ?? "Hizmet detayları"}
        background="brand"
        actions={
          <Link
            href="/iletisim"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand transition hover:bg-gray-50"
          >
            Uzmanla Görüşün
          </Link>
        }
      />
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6 text-sm text-gray-600">
            {service.description && (
              <div className="prose prose-sm max-w-none text-gray-600 prose-headings:text-gray-900 prose-strong:text-gray-800">
                {service.description.split(/\n\n+/).map((block, i) => {
                  const trimmed = block.trim();
                  if (!trimmed) return null;
                  // Madde işareti satırları (•, -, *)
                  if (trimmed.split('\n').every(l => /^[\s]*[•\-\*\t]/.test(l) || l.trim() === '')) {
                    return (
                      <ul key={i} className="my-3 space-y-1 pl-4">
                        {trimmed.split('\n').filter(l => l.trim()).map((line, j) => (
                          <li key={j} className="flex gap-2 text-sm text-gray-600">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                            {line.replace(/^[\s•\-\*\t]+/, '')}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  // Tek satır ve kısa → başlık gibi davran
                  if (!trimmed.includes('\n') && trimmed.length < 60 && i > 0) {
                    return <h3 key={i} className="mt-6 font-heading text-base font-semibold text-gray-900">{trimmed}</h3>;
                  }
                  // Normal paragraf
                  return (
                    <p key={i} className="my-3 text-sm leading-relaxed text-gray-600">
                      {trimmed.replace(/\n/g, ' ')}
                    </p>
                  );
                })}
              </div>
            )}
            <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6">
              <h2 className="font-heading text-xl text-gray-900">
                Hizmet Kapsamımız
              </h2>
              <ul className="mt-3 space-y-2">
                {service.highlights.map((highlight, index) => (
                  <li key={`${service.slug}-highlight-${index}`} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <aside className="space-y-6">
            <div className="rounded-3xl border border-brand/20 bg-brand/5 p-6 text-sm text-gray-600">
              <h3 className="font-heading text-xl text-brand">
                Sürecimiz Nasıl İşliyor?
              </h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5">
                <li>İlk değerlendirme görüşmesi ve doküman analizi</li>
                <li>Strateji ve aksiyon planının paylaşılması</li>
                <li>Dava/uzlaşma sürecinin yürütülmesi</li>
                <li>Periyodik raporlama ve sonuç takibi</li>
              </ol>
            </div>
            {service.relatedArticles.length > 0 && (
              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="font-heading text-xl text-gray-900">
                  İlgili Yayınlar
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-brand">
                  {service.relatedArticles.map((publication) => (
                    <li key={publication.slug}>
                      <Link
                        href={`/yayinlar/${publication.slug}`}
                        className="hover:text-brand-dark"
                      >
                        {publication.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
      <CTASection />
    </>
  );
};

export default ServiceDetailPage;
