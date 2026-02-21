import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Çerez Politikası | Dalgıç-Masüt Hukuk Bürosu",
  description: "Dalgıç-Masüt Hukuk Bürosu web sitesinde kullanılan çerezler ve veri toplama uygulamaları hakkında bilgi.",
  openGraph: {
    title: "Çerez Politikası | Dalgıç-Masüt Hukuk Bürosu",
    description: "Dalgıç-Masüt Hukuk Bürosu web sitesinde kullanılan çerezler hakkında bilgi.",
    url: "https://dalgicmasut.av.tr/cerez-politikasi",
    siteName: "Dalgıç-Masüt Hukuk Bürosu",
    locale: "tr_TR",
    type: "website",
  },
  alternates: { canonical: "https://dalgicmasut.av.tr/cerez-politikasi" },
};

const CookiePolicyPage = () => (
  <>
    <PageHeader
      title="Çerez Politikası"
      description="Web sitemizde kullanılan çerezler ve tercihlerinizi yönetme seçenekleriniz."
    />
    <section className="bg-white">
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-16 text-sm text-gray-600">
        <p>
          Web sitemizde kullanıcı deneyimini geliştirmek, istatistiksel analizler yapmak ve hukuki hizmetlerimizi
          tanıtmak amacıyla çerezler kullanılmaktadır. Çerez tercihlerinizi tarayıcınız üzerinden değiştirebilir veya
          dilediğiniz zaman silebilirsiniz.
        </p>
        <p>
          Zorunlu çerezler site güvenliği ve performansı için gereklidir. Analitik çerezler ise ziyaretçi davranışlarını
          anonim olarak ölçmemize yardımcı olur. Üçüncü taraf çerezler yalnızca açık rızanız ile etkinleştirilir.
        </p>
        <p>
          Detaylı bilgi için bizimle <strong>info@dalgicmasut.av.tr</strong> adresi üzerinden iletişime geçebilirsiniz.
        </p>
      </div>
    </section>
  </>
);

export default CookiePolicyPage;
