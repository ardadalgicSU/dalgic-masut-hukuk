import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "İletişim | Dalgıç-Masüt Hukuk Bürosu",
  description: "Eskişehir'deki hukuk büromuzla iletişime geçin. Ücretsiz ilk değerlendirme için formu doldurun veya bizi arayın.",
  openGraph: {
    title: "İletişim | Dalgıç-Masüt Hukuk Bürosu",
    description: "Eskişehir'deki hukuk büromuzla iletişime geçin. Ücretsiz ilk değerlendirme için formu doldurun veya bizi arayın.",
    url: "https://dalgicmasut.av.tr/iletisim",
    siteName: "Dalgıç-Masüt Hukuk Bürosu",
    locale: "tr_TR",
    type: "website",
  },
  alternates: { canonical: "https://dalgicmasut.av.tr/iletisim" },
};
import { fetchSiteSettings } from "@/lib/api";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactPage = async () => {
  const siteSettings = await fetchSiteSettings();
  const { firm, contactInfo } = siteSettings;

  return (
    <>
      <PageHeader
        title="Bize Ulaşın"
        description="Danışmanlık ihtiyacınızı bizimle paylaşın, aynı gün içerisinde dönüş yapalım."
      />
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-[1.1fr_1fr]">
          <ContactForm />
          <aside className="space-y-6">
            <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6 shadow-sm">
              <h3 className="font-heading text-xl text-gray-900">{firm.name}</h3>
              {contactInfo?.address && (
                <p className="mt-3 text-sm text-gray-600">{contactInfo.address}</p>
              )}
              <div className="mt-4 space-y-3 text-sm text-gray-600">
                {contactInfo?.phone && (
                  <p className="flex items-center gap-2">
                    <Phone size={16} className="text-brand" />
                    {contactInfo.phone}
                  </p>
                )}
                {contactInfo?.email && (
                  <p className="flex items-center gap-2">
                    <Mail size={16} className="text-brand" />
                    {contactInfo.email}
                  </p>
                )}
                {contactInfo?.workingHours && (
                  <p className="flex items-center gap-2">
                    <Clock size={16} className="text-brand" />
                    {contactInfo.workingHours}
                  </p>
                )}
              </div>
            </div>
            {contactInfo?.mapEmbedUrl && (
              <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-sm">
                <iframe
                  src={contactInfo.mapEmbedUrl}
                  title="Dalgıç-Masüt Hukuk Bürosu Harita"
                  width="100%"
                  height="320"
                  className="border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
            <div className="rounded-3xl border border-brand/20 bg-brand/5 p-6 text-sm text-gray-600">
              <h3 className="font-heading text-lg text-brand">Ofise Ulaşım</h3>
              <p className="mt-2 flex items-center gap-2">
                <MapPin size={16} className="text-brand" />
                Kurtuluş Mahallesi, Cumhuriyet Bulvarı üzerindeki Şimşek İş Merkezi 7. kat.
              </p>
              <p className="mt-2">
                Tramvay: SSK - Otogar hattı, Cumhuriyet Meydanı durağı (5 dk yürüme).
              </p>
              <p className="mt-2">
                Otobüs: 4, 16, 18 numaralı hatlar Cumhuriyet Bulvarı duraklarında inmektedir.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
