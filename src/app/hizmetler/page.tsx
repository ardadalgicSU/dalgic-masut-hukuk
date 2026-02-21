import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { ArrowRight } from "lucide-react";
import { fetchServices } from "@/lib/api";

export const metadata: Metadata = {
  title: "Hizmetlerimiz | Dalgıç-Masüt Hukuk Bürosu",
  description: "İş hukuku, aile hukuku, trafik kazaları, ticari uyuşmazlıklar ve daha fazlası. Eskişehir'de kapsamlı hukuki danışmanlık hizmetleri.",
  openGraph: {
    title: "Hizmetlerimiz | Dalgıç-Masüt Hukuk Bürosu",
    description: "İş hukuku, aile hukuku, trafik kazaları, ticari uyuşmazlıklar ve daha fazlası. Eskişehir'de kapsamlı hukuki danışmanlık hizmetleri.",
    url: "https://dalgicmasut.av.tr/hizmetler",
    siteName: "Dalgıç-Masüt Hukuk Bürosu",
    locale: "tr_TR",
    type: "website",
  },
  alternates: { canonical: "https://dalgicmasut.av.tr/hizmetler" },
};

const ServicesPage = async () => {
  const services = await fetchServices();

  return (
    <>
      <PageHeader
        title="Hizmetlerimiz"
        description="Kurumsal danışmanlıktan bireysel uyuşmazlıklara kadar geniş uzmanlık yelpazesinde hizmet sunuyoruz."
      />
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <h2 className="font-heading text-3xl text-gray-900">
              Şirketler ve Bireyler İçin Özel Çözümler
            </h2>
            <p className="text-sm text-gray-600">
              İş, ticaret, aile, ceza ve sigorta hukukunda kapsamlı danışmanlık
              sunuyoruz. Strapi CMS entegrasyonu sayesinde tüm içerikler kolayca
              yönetilebilir, Next.js altyapısı ile hızlı ve güvenli bir kullanıcı
              deneyimi sağlanır.
            </p>
            <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6 text-sm text-gray-600">
              <p className="font-semibold text-brand">Dijital Raporlama ve Doküman Yönetimi</p>
              <p className="mt-2">
                Her hizmet alanı için vaka çalışmaları, ekip atamaları ve belge
                paylaşımları dijital ortamda merkezi olarak yürütülür.
              </p>
            </div>
          </div>
          <div className="rounded-3xl bg-brand/5 p-6 text-sm text-gray-600">
            <h3 className="font-heading text-xl text-brand">Çalışma Modelimiz</h3>
            <ul className="mt-4 space-y-3">
              <li>• Ön değerlendirme toplantısı ve doküman analizi</li>
              <li>• Yol haritası ve ücretlendirme planı</li>
              <li>• Dava ve idari süreç yönetimi</li>
              <li>• Periyodik rapor ve sonuç değerlendirmesi</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/hizmetler/${service.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
              >
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                  {service.title.split(" ")[0]}
                </span>
                <h3 className="mt-4 font-heading text-2xl text-gray-900 group-hover:text-brand">
                  {service.title}
                </h3>
                {service.summary && (
                  <p className="mt-3 text-sm text-gray-600">{service.summary}</p>
                )}
                <ul className="mt-4 space-y-2 text-xs text-gray-500">
                  {service.highlights.slice(0, 3).map((highlight, index) => (
                    <li key={`${service.slug}-highlight-${index}`} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand" />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-brand">
                  Detaylı Bilgi
                  <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
