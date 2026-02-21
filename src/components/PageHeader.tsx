import Link from "next/link";
import Image from "next/image";

type PageHeaderProps = {
  title: string;
  description: string;
  background?: "light" | "brand";
  actions?: React.ReactNode;
};

const PageHeader = ({
  title,
  description,
  actions,
}: PageHeaderProps) => (
  <section className="relative overflow-hidden">
    {/* Arkaplan fotoğrafı: Eskişehir gündüz kanal */}
    <div className="absolute inset-0">
      <Image
        src="/eskisehir-gunduz.jpg"
        alt="Eskişehir manzarası"
        fill
        className="object-cover object-center"
        priority
        quality={85}
      />
      {/* Koyu overlay — metinler okunabilir kalır */}
      <div className="absolute inset-0 bg-black/52" />
      {/* Sola doğru ek karartma */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      {/* Kırmızı glow sol üst */}
      <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-brand/20 blur-[80px] pointer-events-none" />
      {/* Sağ alt hafif glow */}
      <div className="absolute right-0 bottom-0 h-48 w-48 rounded-full bg-brand/10 blur-[60px] pointer-events-none" />
    </div>

    <div className="relative mx-auto max-w-7xl px-4 py-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/50 mb-4">
            <Link href="/" className="hover:text-brand transition-colors">
              Ana Sayfa
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white/70">{title}</span>
          </nav>

          <h1 className="font-heading text-3xl leading-tight text-white md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/60">
            {description}
          </p>
        </div>
        {actions}
      </div>
    </div>

    {/* Alt çizgi */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
  </section>
);

export default PageHeader;
