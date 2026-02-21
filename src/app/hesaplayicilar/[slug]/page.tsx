import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import { calculatorComponentMap, isSupportedCalculator } from "@/components/calculators";
import { fetchCalculatorBySlug, fetchCalculators } from "@/lib/api";

export const dynamicParams = false;

export async function generateStaticParams() {
  const calculators = await fetchCalculators();
  return calculators.map((calculator) => ({ slug: calculator.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const calculator = await fetchCalculatorBySlug(slug);

  if (!calculator) {
    return {
      title: "Hesaplayıcı bulunamadı",
    };
  }

  return {
    title: `${calculator.name} | Dalgıç-Masüt Hukuk Bürosu`,
    description:
      calculator.description ??
      "Hukuki süreçleriniz için hazırlanmış pratik hesaplama aracımızı kullanın.",
  };
}

const CalculatorDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const calculator = await fetchCalculatorBySlug(slug);

  if (!calculator || !isSupportedCalculator(calculator.slug)) {
    notFound();
  }

  const CalculatorComponent = calculatorComponentMap[calculator.slug];

  return (
    <>
      <PageHeader
        title={calculator.name}
        description={
          calculator.description ??
          "Hukuki süreçler için hazırlanmış pratik hesaplama aracımızı kullanın."
        }
      />
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="space-y-4 text-sm text-gray-600">
            {calculator.longDescription && (
              <p className="text-base text-gray-700">{calculator.longDescription}</p>
            )}
            {calculator.info && calculator.info.length > 0 && (
              <ul className="space-y-2 rounded-3xl border border-gray-100 bg-gray-50 px-4 py-4 text-sm text-gray-600">
                {calculator.info.map((item, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            <div className="rounded-3xl border border-dashed border-brand/40 bg-brand/5 px-5 py-4 text-xs text-gray-600">
              Bu araç bilgilendirme amaçlıdır. Hesaplamalar mevzuattaki genel kabullere göre
              sadeleştirilmiş olup, dava veya uzlaşma sürecinizde profesyonel hukuki destek
              almanız önerilir.
            </div>
            <div className="mt-8 flex justify-center">
              <Link
                href="tel:+905301598132"
                className="inline-flex items-center justify-center rounded-2xl bg-brand px-8 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark"
              >
                Hemen Ücretsiz Danışın
              </Link>
            </div>
          </article>
          <div className="space-y-4">
            {CalculatorComponent(calculator.config)}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
};

export default CalculatorDetailPage;
