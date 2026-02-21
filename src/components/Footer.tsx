import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Linkedin, Instagram, Scale } from "lucide-react";
import {
  ContactInfo,
  FirmInfo,
  NavigationItem,
  PublicationSummary,
  Service,
} from "@/lib/types";

type FooterProps = {
  firm: FirmInfo;
  contact?: ContactInfo;
  navigation: NavigationItem[];
  services: Service[];
  publications: PublicationSummary[];
};

const Footer = ({ firm, contact, navigation, services, publications }: FooterProps) => {
  const featuredServices = services.slice(0, 5);
  const recentPublications = publications.slice(0, 2);

  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      {/* Ana footer içeriği */}
      <div className="relative overflow-hidden">
        {/* Hafif kırmızı glow solda */}
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-brand/5 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Firma bilgisi */}
            <div className="lg:col-span-1">
              <Link href="/" className="group inline-flex items-center gap-3 mb-5">
                <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-white border border-gray-200 p-1 shadow-sm">
                  <Image
                    src="/logo.png"
                    alt={`${firm.name} logosu`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="font-heading text-base text-gray-900 group-hover:text-brand transition-colors">
                    {firm.name}
                  </p>
                  {firm.tagline && (
                    <p className="text-xs text-gray-500">{firm.tagline}</p>
                  )}
                </div>
              </Link>

              {firm.description && (
                <p className="text-sm text-gray-600 leading-relaxed">{firm.description}</p>
              )}

              {/* Sosyal medya */}
              <div className="mt-6 flex items-center gap-3">
                <Link
                  href="https://www.linkedin.com"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-all hover:border-brand/50 hover:bg-brand/5 hover:text-brand shadow-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="https://www.instagram.com"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-all hover:border-brand/50 hover:bg-brand/5 hover:text-brand shadow-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={16} aria-hidden="true" />
                </Link>
              </div>

              {/* Küçük rozet */}
              <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 shadow-sm">
                <Scale size={12} className="text-brand" />
                Eskişehir Barosu Üyesi
              </div>
            </div>

            {/* İletişim */}
            <div>
              <h3 className="mb-5 font-heading text-sm uppercase tracking-[0.2em] text-gray-500">
                İletişim
              </h3>
              <ul className="space-y-4 text-sm text-gray-600">
                {contact?.address && (
                  <li className="flex items-start gap-3">
                    <MapPin size={15} className="mt-0.5 shrink-0 text-brand" />
                    <span className="leading-relaxed">{contact.address}</span>
                  </li>
                )}
                {contact?.phone && (
                  <li className="flex items-center gap-3">
                    <Phone size={15} className="shrink-0 text-brand" />
                    <Link
                      href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                      className="hover:text-brand transition-colors"
                    >
                      {contact.phone}
                    </Link>
                  </li>
                )}
                {contact?.email && (
                  <li className="flex items-center gap-3">
                    <Mail size={15} className="shrink-0 text-brand" />
                    <Link
                      href={`mailto:${contact.email}`}
                      className="hover:text-brand transition-colors"
                    >
                      {contact.email}
                    </Link>
                  </li>
                )}
                {contact?.workingHours && (
                  <li className="flex items-start gap-3">
                    <Clock size={15} className="mt-0.5 shrink-0 text-brand" />
                    <span>{contact.workingHours}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Hizmetler */}
            <div>
              <h3 className="mb-5 font-heading text-sm uppercase tracking-[0.2em] text-gray-500">
                Hizmetlerimiz
              </h3>
              <ul className="space-y-2.5 text-sm">
                {featuredServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/hizmetler/${service.slug}`}
                      className="flex items-center gap-2 text-gray-600 hover:text-brand transition-colors group"
                    >
                      <span className="h-px w-3 bg-brand shrink-0 transition-all group-hover:w-5" />
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hızlı bağlantılar + Yayınlar */}
            <div>
              <h3 className="mb-5 font-heading text-sm uppercase tracking-[0.2em] text-gray-500">
                Hızlı Bağlantılar
              </h3>
              <ul className="space-y-2.5 text-sm">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 text-gray-600 hover:text-brand transition-colors group"
                    >
                      <span className="h-px w-3 bg-brand shrink-0 transition-all group-hover:w-5" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {recentPublications.length > 0 && (
                <div className="mt-8">
                  <h4 className="mb-4 font-heading text-sm uppercase tracking-[0.2em] text-gray-500">
                    Son Yayınlar
                  </h4>
                  <ul className="space-y-3 text-sm">
                    {recentPublications.map((pub) => (
                      <li key={pub.slug}>
                        <Link
                          href={`/yayinlar/${pub.slug}`}
                          className="text-gray-600 hover:text-brand transition-colors line-clamp-2 leading-relaxed"
                        >
                          {pub.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Alt çizgi */}
      <div className="border-t border-gray-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-gray-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} {firm.name}. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-6">
            <Link href="/kvkk" className="hover:text-brand transition-colors">
              KVKK Aydınlatma Metni
            </Link>
            <Link href="/cerez-politikasi" className="hover:text-brand transition-colors">
              Çerez Politikası
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
