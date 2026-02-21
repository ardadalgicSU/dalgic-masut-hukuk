import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Service } from "@/lib/types";

type ServicesPreviewProps = {
  services: Service[];
};


const ServicesPreview = ({ services }: ServicesPreviewProps) => {
  if (!services.length) {
    return null;
  }

  const featured = services.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-white py-24 border-t border-gray-200">
      {/* Arkaplan efekti */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-brand/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-brand/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Başlık */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-14">
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
                Uzmanlık Alanlarımız
              </span>
            </div>
            <h2 className="font-heading text-3xl leading-tight text-gray-900 md:text-4xl lg:text-5xl">
              İş dünyasından aile hukukuna
              <br />
              <span className="text-brand">kadar yanınızdayız</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-gray-500 leading-relaxed">
              Her hukuk alanı için uzman avukatlarımızla detaylı analiz yapıyor,
              dava dosyalarınızı uçtan uca yönetiyoruz.
            </p>
          </div>
          <Link
            href="/hizmetler"
            className="group inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-all hover:border-brand hover:text-brand shrink-0"
          >
            Tüm Hizmetleri Görüntüle
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Servis kartları */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((service) => (
            <Link
              key={service.slug}
              href={`/hizmetler/${service.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-brand/30 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />
              </div>

              <h3 className="font-heading text-xl text-gray-900 group-hover:text-brand transition-colors">
                {service.title}
              </h3>

              {service.summary && (
                <p className="mt-3 text-sm text-gray-500 leading-relaxed line-clamp-2">
                  {service.summary}
                </p>
              )}

              {service.highlights.length > 0 && (
                <ul className="mt-4 space-y-1.5">
                  {service.highlights.slice(0, 3).map((highlight, i) => (
                    <li key={`${service.slug}-h-${i}`} className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="h-1 w-1 rounded-full bg-brand shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-brand opacity-0 transition-all group-hover:opacity-100 translate-y-1 group-hover:translate-y-0">
                Detaylı Bilgi
                <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
