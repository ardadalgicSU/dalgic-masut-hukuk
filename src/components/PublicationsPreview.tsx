import Link from "next/link";
import { ArrowRight, Calendar, Clock3, Tag } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { PublicationSummary } from "@/lib/types";
import { sanitizeHtml } from "@/lib/utils";

type PublicationsPreviewProps = {
  publications: PublicationSummary[];
};

const PublicationsPreview = ({ publications }: PublicationsPreviewProps) => {
  if (!publications.length) {
    return null;
  }

  const [featured, ...rest] = publications.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-gray-50 py-24">
      {/* Arkaplan */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(139 26 26 / 0.05) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Başlık */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-14">
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
                Güncel Yayınlar
              </span>
            </div>
            <h2 className="font-heading text-3xl leading-tight text-gray-900 md:text-4xl lg:text-5xl">
              Hukuki gelişmeleri yakından
              <br />takip ediyoruz
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-gray-500 leading-relaxed">
              Mevzuat değişiklikleri ve içtihatları yorumladığımız makalelerimizi inceleyin.
            </p>
          </div>
        </div>

        {/* Yayın grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Öne çıkan yayın */}
          {featured && (
            <Link
              href={`/yayinlar/${featured.slug}`}
              className="group relative col-span-1 flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm lg:col-span-2 transition-all hover:shadow-xl hover:border-brand/20"
            >
              {/* Sol kırmızı kenar aksanı */}
              <div className="absolute left-0 inset-y-0 w-1 bg-gradient-to-b from-brand via-brand/60 to-transparent rounded-l-3xl" />
              {/* Sağ üst hafif glow */}
              <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-brand/5 blur-3xl pointer-events-none" />

              <div className="relative flex flex-1 flex-col p-8 md:p-10">
                {/* Etiketler */}
                {!!featured.tags.length && (
                  <div className="flex items-center gap-2 mb-3">
                    <Tag size={12} className="text-brand" />
                    <span className="text-xs font-semibold text-brand">
                      {featured.tags.join(" · ")}
                    </span>
                  </div>
                )}

                {/* Öne çıkan rozet */}
                <span className="mb-4 inline-flex w-fit items-center rounded-full bg-brand/8 px-3 py-1 text-xs font-semibold text-brand border border-brand/15">
                  Öne Çıkan
                </span>

                <h3 className="font-heading text-2xl text-gray-900 group-hover:text-brand transition-colors md:text-3xl">
                  {featured.title}
                </h3>

                {featured.excerptHtml ? (
                  <div
                    className="mt-4 text-sm text-gray-600 leading-relaxed line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(featured.excerptHtml) }}
                  />
                ) : featured.excerpt ? (
                  <p className="mt-4 text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {featured.excerpt}
                  </p>
                ) : null}

                <div className="mt-auto pt-8 flex items-center justify-between border-t border-gray-100">
                  <div className="flex items-center gap-4 text-xs text-gray-400 pt-4">
                    {featured.publishedDate && (
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {format(new Date(featured.publishedDate), "d MMMM yyyy", { locale: tr })}
                      </span>
                    )}
                    {featured.readTime && (
                      <span className="flex items-center gap-1.5">
                        <Clock3 size={12} />
                        {featured.readTime}
                      </span>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand pt-4">
                    Devamını Oku
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Diğer yayınlar */}
          <div className="flex flex-col gap-4">
            {rest.map((publication) => (
              <Link
                key={publication.slug}
                href={`/yayinlar/${publication.slug}`}
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-brand/20"
              >
                {!!publication.tags.length && (
                  <span className="text-xs font-semibold text-brand mb-2">
                    {publication.tags.join(" · ")}
                  </span>
                )}

                <h3 className="font-heading text-base text-gray-900 group-hover:text-brand transition-colors line-clamp-2">
                  {publication.title}
                </h3>

                <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
                  {publication.publishedDate && (
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {format(new Date(publication.publishedDate), "d MMM yyyy", { locale: tr })}
                    </span>
                  )}
                  {publication.readTime && (
                    <span className="flex items-center gap-1">
                      <Clock3 size={11} />
                      {publication.readTime}
                    </span>
                  )}
                </div>

                {publication.author && (
                  <p className="mt-3 text-xs text-gray-400 pt-3 border-t border-gray-100">
                    {publication.author.name}
                  </p>
                )}
              </Link>
            ))}

            {/* Tüm yayınlar linki */}
            <Link
              href="/yayinlar"
              className="group flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-brand/20 p-6 text-sm font-semibold text-brand/60 transition-all hover:border-brand hover:text-brand hover:bg-brand/5"
            >
              Tüm Yayınları Gör
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicationsPreview;
