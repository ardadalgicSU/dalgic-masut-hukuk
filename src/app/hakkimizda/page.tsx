import type { Metadata } from "next";
import { Building2, Heart, Car, Laptop } from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkımızda | Dalgıç-Masüt Hukuk Bürosu",
  description: "1997'den bu yana Eskişehir'de hukuki danışmanlık hizmeti sunan Dalgıç-Masüt Hukuk Bürosu'nun hikayesi, misyonu ve değerleri hakkında bilgi edinin.",
  openGraph: {
    title: "Hakkımızda | Dalgıç-Masüt Hukuk Bürosu",
    description: "1997'den bu yana Eskişehir'de hukuki danışmanlık hizmeti sunan Dalgıç-Masüt Hukuk Bürosu'nun hikayesi, misyonu ve değerleri.",
    url: "https://dalgicmasut.av.tr/hakkimizda",
    siteName: "Dalgıç-Masüt Hukuk Bürosu",
    locale: "tr_TR",
    type: "website",
  },
  alternates: { canonical: "https://dalgicmasut.av.tr/hakkimizda" },
};
import PageHeader from "@/components/PageHeader";
import ValuesSection from "@/components/ValuesSection";
import Timeline from "@/components/Timeline";
import TeamPreview from "@/components/TeamPreview";
import { fetchSiteSettings, fetchTeamMembers, fetchTimelineEvents } from "@/lib/api";

const supportItems = [
  {
    icon: Building2,
    text: "İşletmelere yönelik düzenli hukuki denetimler ve sözleşme yönetimi.",
  },
  {
    icon: Heart,
    text: "Aile hukukunda duygusal süreçlere duyarlı, çözüm odaklı yaklaşım.",
  },
  {
    icon: Car,
    text: "Trafik ve sigorta dosyalarında hızlı tazminat sonuçları.",
  },
  {
    icon: Laptop,
    text: "Dijital araçlarla dosya takibi ve müvekkil portalı planlaması.",
  },
];

const AboutPage = async () => {
  const [siteSettings, timelineEvents, team] = await Promise.all([
    fetchSiteSettings(),
    fetchTimelineEvents(),
    fetchTeamMembers(),
  ]);

  const { firm, contactInfo } = siteSettings;

  return (
    <>
      <PageHeader
        title="Hakkımızda"
        description={`${firm.name}, ${firm.foundingYear ?? "kuruluş"} yılından bu yana Eskişehir ve çevresinde şirketlere ve bireylere stratejik hukuki danışmanlık sunuyor.`}
      />
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <h2 className="font-heading text-3xl text-gray-900">
              Kuruluşumuz ve Vizyonumuz
            </h2>
            <p className="text-sm leading-relaxed text-gray-600">
              1997&apos;den gelen tecrübemizi güncel mevzuat ve modern çalışma yöntemleriyle birleştirerek; bireyler ve kurumlar için güvenilir çözüm ortağı olmayı, uyuşmazlıkları yalnızca sonuçlandırmayı değil aynı zamanda önleyici hukuk yaklaşımıyla riskleri azaltmayı ve kaliteli hizmet standardımızı sürdürülebilir biçimde geliştirerek saygın, referans gösterilen bir hukuk bürosu olarak konumumuzu güçlendirmeyi hedefliyoruz.
            </p>
            <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6">
              <h3 className="font-heading text-xl text-gray-900">
                Misyonumuz
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Av. Atilay Dalgıç tarafından 1997 yılında kurulan büromuzun misyonu; müvekkillerimizin hak ve menfaatlerini şeffaf, etik ve özenli bir çalışma anlayışıyla korumak, her dosyaya özel strateji geliştirerek süreci baştan sona doğru yönetmek ve erişilebilir iletişimle güvene dayalı, uzun soluklu bir hukuki destek sunmaktır.
              </p>
            </div>
          </div>
          <div className="rounded-3xl border border-brand/20 bg-brand/5 p-6 shadow-soft">
            <h3 className="font-heading text-xl text-brand">
              Size Nasıl Destek Oluyoruz?
            </h3>
            <ul className="mt-6 space-y-3 text-sm text-gray-600">
              {supportItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.text} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <Icon size={15} strokeWidth={1.8} />
                    </span>
                    <span className="leading-relaxed">{item.text}</span>
                  </li>
                );
              })}
            </ul>
            {contactInfo && (
              <div className="mt-6 rounded-2xl border border-dashed border-brand/40 bg-white p-5 text-sm text-gray-600">
                <strong className="font-semibold text-brand">Ofis Adresimiz</strong>
                {contactInfo.address && <p className="mt-2">{contactInfo.address}</p>}
                {contactInfo.workingHours && <p className="mt-1">{contactInfo.workingHours}</p>}
              </div>
            )}
          </div>
        </div>
      </section>
      <ValuesSection />
      <Timeline events={timelineEvents} />
      <TeamPreview team={team} />
    </>
  );
};

export default AboutPage;
