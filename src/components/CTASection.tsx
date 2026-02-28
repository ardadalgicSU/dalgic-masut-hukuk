import Link from "next/link";
import { Phone, MessageSquare, ArrowRight, Clock } from "lucide-react";

const CTASection = () => (
  <section className="relative overflow-hidden py-24">
    {/* Arkaplan fotoğrafı: Eskişehir tramvay/şehir */}
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/eskisehir-sehir.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 60%",
        }}
      />
      {/* Güçlü koyu overlay */}
      <div className="absolute inset-0 bg-black/62" />
      {/* Kırmızı ton ekle */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-950/60 via-transparent to-black/50" />
      {/* Glow'lar */}
      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-brand/15 blur-[100px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-brand/10 blur-[80px] pointer-events-none" />
    </div>

    {/* İçerik */}
    <div className="relative mx-auto max-w-7xl px-4">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        {/* Sol taraf */}
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl leading-tight text-white md:text-4xl lg:text-5xl">
            Dosyanız için bugün
            <br />
            <span className="text-brand">aksiyon alalım</span>
          </h2>

          <p className="mt-5 text-sm text-gray-400 leading-relaxed max-w-xl">
            İş, aile, ticaret veya sigorta hukukuna ilişkin sorunlarınızı ilk
            görüşmede analiz ediyor, etkili bir yol haritası sunuyoruz.
          </p>

          {/* Çalışma saati */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-400">
            <Clock size={14} className="text-brand" />
            Pzt–Cum: 09:00–18:00 · Randevu ile Cmt: 10:00–14:00
          </div>
        </div>

        {/* Sağ taraf - Butonlar */}
        <div className="flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
          <Link
            href="tel:+905301598132"
            className="group inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
            style={{ color: "#ffffff" }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-colors group-hover:bg-white/25">
              <Phone size={16} style={{ color: "#ffffff" }} />
            </div>
            Hemen Arayın
            <ArrowRight size={14} className="ml-1 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/iletisim"
            className="group inline-flex items-center justify-center gap-3 rounded-2xl px-8 py-4 text-sm font-semibold shadow-lg transition-all hover:-translate-y-0.5"
            style={{ backgroundColor: "#8B1A1A", color: "#ffffff" }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <MessageSquare size={16} style={{ color: "#ffffff" }} />
            </div>
            İletişim Formu
            <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Alt bilgi şeridi */}
      <div className="mt-16 flex flex-wrap items-center justify-center gap-8 border-t border-white/5 pt-10">
        {[
          { value: "Gizli", label: "Müvekkil Bilgileri" },
          { value: "Şeffaf", label: "Bilgilendirme" },
          { value: "Eskişehir", label: "Barosu Kayıtlı" },
          { value: "Yazılı", label: "Vekâletname ile" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3 text-sm">
            <div className="h-1.5 w-1.5 rounded-full bg-brand" />
            <strong className="font-semibold text-white">{item.value}</strong>
            <span className="text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CTASection;
