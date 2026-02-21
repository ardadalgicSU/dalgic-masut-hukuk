import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | Dalgıç-Masüt Hukuk Bürosu",
  description: "Kişisel Verilerin Korunması Kanunu kapsamında Dalgıç-Masüt Hukuk Bürosu aydınlatma metni ve gizlilik politikası.",
  openGraph: {
    title: "KVKK Aydınlatma Metni | Dalgıç-Masüt Hukuk Bürosu",
    description: "Kişisel Verilerin Korunması Kanunu kapsamında Dalgıç-Masüt Hukuk Bürosu aydınlatma metni.",
    url: "https://dalgicmasut.av.tr/kvkk",
    siteName: "Dalgıç-Masüt Hukuk Bürosu",
    locale: "tr_TR",
    type: "website",
  },
  alternates: { canonical: "https://dalgicmasut.av.tr/kvkk" },
};

const KVKKPage = () => (
  <>
    <PageHeader
      title="KVKK Aydınlatma Metni"
      description="6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri işleme ve saklama politikamız."
    />
    <section className="bg-white">
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-16 text-sm text-gray-600">
        <p>
          Dalgıç-Masüt Hukuk Bürosu olarak, danışmanlık hizmetlerimizi sunarken paylaştığınız kişisel verileri 6698
          sayılı Kanun ve ilgili mevzuat doğrultusunda işlemekteyiz. Veri sorumlusu sıfatıyla hangi verileri hangi
          amaçlarla işlediğimizi ve haklarınızı bu metinle bilginize sunuyoruz.
        </p>
        <p>
          İletişim formu, danışmanlık sözleşmeleri ve dava dosyaları kapsamında toplanan kişisel verileriniz yalnızca
          hukuki hizmetlerin sunulması ve tarafınızla iletişim kurulması amacıyla işlenir. Verileriniz ilgili mevzuatta
          belirtilen saklama süreleri boyunca güvenli sunucularımızda saklanır ve yetkisiz erişimlere karşı korunur.
        </p>
        <p>
          Haklarınızı kullanmak için <strong>kvkk@dalgicmasut.av.tr</strong> adresine başvurabilirsiniz. Talebiniz en geç
          30 gün içerisinde yanıtlanacaktır.
        </p>
      </div>
    </section>
  </>
);

export default KVKKPage;
