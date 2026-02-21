import { Eye, Target, Cpu } from "lucide-react";

const values = [
  {
    icon: Eye,
    title: "Şeffaflık ve Güven",
    description:
      "Müvekkillerimizle tüm süreçleri açık şekilde paylaşıyor, kararları birlikte alıyoruz.",
    iconBg: "bg-brand/10",
    iconColor: "text-brand",
    accentBorder: "border-brand/20",
    accentBg: "group-hover:bg-brand/5",
  },
  {
    icon: Target,
    title: "Stratejik Yaklaşım",
    description:
      "Her dava için özel stratejiler geliştiriyor, alternatif çözüm yollarını birlikte değerlendiriyoruz.",
    iconBg: "bg-brand/10",
    iconColor: "text-brand",
    accentBorder: "border-brand/20",
    accentBg: "group-hover:bg-brand/5",
  },
  {
    icon: Cpu,
    title: "Teknoloji Odaklılık",
    description:
      "Modern araçlarla doküman, içerik ve raporlama süreçlerini dijitalleştiriyoruz.",
    iconBg: "bg-brand/10",
    iconColor: "text-brand",
    accentBorder: "border-brand/20",
    accentBg: "group-hover:bg-brand/5",
  },
];

const ValuesSection = () => (
  <section className="relative overflow-hidden bg-gray-50 py-16">
    <div className="absolute inset-0 pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(139 26 26 / 0.05) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />
    </div>

    <div className="relative mx-auto max-w-7xl px-4">
      <div className="grid gap-6 md:grid-cols-3">
        {values.map((value) => {
          const Icon = value.icon;
          return (
            <div
              key={value.title}
              className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:border-brand/20"
            >
              {/* Üst ince çizgi */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              {/* İkon */}
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${value.iconBg} ${value.iconColor} mb-6 transition-transform group-hover:scale-110`}>
                <Icon size={26} strokeWidth={1.5} />
              </div>

              <h3 className="font-heading text-xl text-gray-900 group-hover:text-brand transition-colors">
                {value.title}
              </h3>
              <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                {value.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default ValuesSection;
