import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import { fetchCalculators } from "@/lib/api";

export const metadata: Metadata = {
  title: "Hukuki Hesaplayıcılar | Dalgıç-Masüt Hukuk Bürosu",
  description: "Kıdem tazminatı, nafaka, kira artışı ve trafik kazası tazminat hesaplayıcıları. Ücretsiz hukuki hesaplama araçları.",
  openGraph: {
    title: "Hukuki Hesaplayıcılar | Dalgıç-Masüt Hukuk Bürosu",
    description: "Kıdem tazminatı, nafaka, kira artışı ve trafik kazası tazminat hesaplayıcıları. Ücretsiz hukuki hesaplama araçları.",
    url: "https://dalgicmasut.av.tr/hesaplayicilar",
    siteName: "Dalgıç-Masüt Hukuk Bürosu",
    locale: "tr_TR",
    type: "website",
  },
  alternates: { canonical: "https://dalgicmasut.av.tr/hesaplayicilar" },
};

const categoryLabels: Record<string, string> = {
  employment: "İş Hukuku",
  family: "Aile Hukuku",
  injury: "Tazminat Hukuku",
  rental: "Kira Hukuku",
  other: "Genel Hesaplama",
};

const CalculatorsPage = async () => {
  const calculators = await fetchCalculators();

  return (
    <>
      <PageHeader
        title="Hukuki Hesaplayıcılar"
        description="Hızlı ön hesaplamalar ile dava sürecine hazırlıklı olun. Sonuçlar yalnızca bilgi amaçlıdır ve nihai hesaplama için avukat görüşü gereklidir."
      />
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 space-y-10">
          <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6 text-sm text-gray-600">
            <p>
              Hesaplayıcılar, ilgili mevzuattaki ortalama parametrelere göre hızlı bir ön
              değerlendirme sunar. Nihai tutarlar, hakim takdiri ve uzman aktüeryal
              çalışmalar doğrultusunda değişebilir.
            </p>
            <p className="mt-2">
              Her hesaplayıcıyı açtığınızda hem formülün dayandığı varsayımlar hem de
              çıktıların nasıl yorumlanacağı detaylı biçimde açıklanır.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {calculators.map((calculator) => (
              <Link
                key={calculator.slug}
                href={`/hesaplayicilar/${calculator.slug}`}
                className="group relative flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_8px_30px_rgba(139,26,26,0.12)]"
              >
                {/* Üst kırmızı şerit */}
                <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-3xl bg-gradient-to-r from-transparent via-brand/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute right-6 top-6 inline-flex items-center rounded-full border border-brand/20 bg-brand/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand">
                  {categoryLabels[calculator.category] ?? categoryLabels.other}
                </span>
                <div className="flex-1 space-y-4 pt-10">
                  <h3 className="font-heading text-2xl text-gray-900 transition-colors duration-300 group-hover:text-brand">
                    {calculator.name}
                  </h3>
                  {calculator.description && (
                    <p className="text-sm text-gray-600">
                      {calculator.description}
                    </p>
                  )}
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-all duration-300">
                  Hesaplayıcıyı Aç
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
};

export default CalculatorsPage;
