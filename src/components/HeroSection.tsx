import Link from "next/link";
import { ArrowRight, Scale } from "lucide-react";
import { HeroContent } from "@/lib/types";

const DEFAULT_TAGLINE = "Eskişehir · Hukuk Bürosu";

const defaultBullets = [
  "Davalarınız için kişiye özel stratejiler geliştiriyoruz.",
  "Şeffaf raporlama ile sürecin her aşamasında sizi bilgilendiriyoruz.",
  "25 yılı aşkın deneyim ve kanıtlanmış başarı geçmişi.",
];

type HeroSectionProps = {
  hero?: HeroContent;
};

const HeroSection = ({ hero }: HeroSectionProps) => {
  if (!hero) {
    return null;
  }

  return (
    <section className="relative flex items-center overflow-hidden" style={{ minHeight: "95vh" }}>
      {/* ── Arkaplan fotoğrafı: Eskişehir gece ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/eskisehir-gece.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Soldan sağa gradient — sol taraf içerik okunabilir, sağ taraf fotoğraf görünür */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/45 to-black/22" />
      </div>

      {/* İçerik */}
      <div className="relative mx-auto flex max-w-7xl flex-col gap-16 px-4 py-24 lg:flex-row lg:items-center">
        {/* Sol taraf - Ana içerik */}
        <div className="flex-1 space-y-8 animate-fade-in-up">
          {/* Etiket */}
          <div className="inline-flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white">
              {DEFAULT_TAGLINE}
            </span>
          </div>

          {/* Başlık */}
          <h1 className="font-heading text-4xl leading-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
            {hero.heading}
          </h1>

          {/* Alt başlık */}
          {hero.subheading && (
            <p className="max-w-xl text-lg leading-relaxed text-white/70">
              {hero.subheading}
            </p>
          )}

          {/* Butonlar */}
          <div className="flex flex-wrap items-center gap-4">
            {hero.primaryCtaLabel && hero.primaryCtaUrl && (
              <Link
                href={hero.primaryCtaUrl}
                className="group inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold backdrop-blur-sm shadow-lg transition-all hover:bg-white/20 hover:border-white/50 hover:-translate-y-0.5"
                style={{ color: "#ffffff" }}
              >
                Bize Danışın
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            )}
            {hero.secondaryCtaLabel && hero.secondaryCtaUrl && (
              <Link
                href={hero.secondaryCtaUrl}
                className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/50 hover:-translate-y-0.5"
                style={{ color: "#ffffff" }}
              >
                {hero.secondaryCtaLabel}
              </Link>
            )}
          </div>

        </div>

        {/* Sağ taraf - Bilgi kutusu */}
        <div className="flex-1 max-w-lg">
          {/* Ana kart */}
          <div className="relative rounded-3xl border border-white/15 bg-black/40 p-8 backdrop-blur-md">
            {/* Kart üst süsü */}
            <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />

            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-heading text-2xl text-white">
                Neden Dalgıç-Masüt?
              </h2>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                <Scale size={24} strokeWidth={1.5} />
              </div>
            </div>

            <ul className="space-y-4">
              {defaultBullets.map((item, i) => (
                <li key={item} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-xs font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="text-sm leading-relaxed text-white/75">{item}</p>
                </li>
              ))}
            </ul>

            {/* Uzman vurgusu */}
            <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-4">
              <p className="text-sm text-white/70">
                <strong className="font-semibold text-brand">Uzman ekibimiz</strong>, iş ve aile hukukunda derin tecrübe ile hareket eder ve her dosyada riskleri önceden analiz eder.
              </p>
            </div>

            {/* Kart alt süsü */}
            <div className="absolute -bottom-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* Küçük istatistik kartları */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/15 bg-black/40 p-4 backdrop-blur-sm text-center">
              <p className="font-heading text-2xl text-white">25+</p>
              <p className="text-xs text-white/50">Yıl Deneyim</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-black/40 p-4 backdrop-blur-sm text-center">
              <p className="font-heading text-2xl text-white">2000+</p>
              <p className="text-xs text-white/50">Başarılı Dava</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alt geçiş — fotoğraf açık griye eriyerek biter */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
