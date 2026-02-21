import Link from "next/link";
import { ArrowRight, Phone, Mail, Scale } from "lucide-react";
import { TeamMember } from "@/lib/types";
import { toPlainText, truncate } from "@/lib/utils";

type TeamPreviewProps = {
  team: TeamMember[];
};

const TeamPreview = ({ team }: TeamPreviewProps) => {
  if (!team.length) {
    return null;
  }

  const featured = team.slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-gray-50 py-14">
      {/* Arkaplan desen */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(139 26 26 / 0.06) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Başlık */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-14">
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
                Uzman Ekibimiz
              </span>
            </div>
            <h2 className="font-heading text-3xl leading-tight text-gray-900 md:text-4xl lg:text-5xl">
              Deneyimli avukatlarımızla
              <br />tanışın
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-gray-500 leading-relaxed">
              Her dava bir ekip işidir. Yetkin avukatlarımız ve danışmanlarımızla
              süreci birlikte yönetiyoruz.
            </p>
          </div>
          <Link
            href="/ekibimiz"
            className="group inline-flex items-center gap-2 rounded-full border border-brand/30 bg-white px-6 py-3 text-sm font-semibold text-brand transition-all hover:bg-brand hover:text-white hover:border-brand shrink-0 shadow-sm"
          >
            Tüm Ekibi Gör
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Ekip kartları */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((member) => {
            const summary = truncate(toPlainText(member.bio) || "", 110);
            const initials = member.name
              .split(" ")
              .filter(Boolean)
              .map((part) => part[0].toUpperCase())
              .join("")
              .slice(0, 2);

            return (
              <div
                key={member.slug}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(139,26,26,0.10)] hover:border-brand/25"
              >
                {/* Üst kırmızı şerit */}
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-brand/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Avatar alanı */}
                <div className="flex items-center gap-4 border-b border-gray-100 p-5">
                  {/* Monogram */}
                  <div className="relative shrink-0">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-xl"
                      style={{ backgroundColor: "#8B1A1A" }}
                    >
                      <span className="font-heading text-lg font-semibold text-white">
                        {initials}
                      </span>
                    </div>
                    {/* Küçük terazi rozeti */}
                    <div className="absolute -bottom-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-gray-100">
                      <Scale size={9} className="text-brand" strokeWidth={2} />
                    </div>
                  </div>

                  {/* İsim ve unvan */}
                  <div className="min-w-0">
                    <p className="font-heading text-sm font-semibold leading-snug text-gray-900 group-hover:text-brand transition-colors truncate">
                      {member.name}
                    </p>
                    {member.title && (
                      <p className="mt-0.5 text-xs text-brand/70 font-medium leading-snug truncate">
                        {member.title}
                      </p>
                    )}
                  </div>
                </div>

                {/* Özet */}
                <div className="flex flex-1 flex-col px-5 py-4">
                  {summary ? (
                    <p className="text-xs leading-relaxed text-gray-500">{summary}</p>
                  ) : (
                    <p className="text-xs leading-relaxed text-gray-400 italic">
                      Profil bilgisi yakında eklenecektir.
                    </p>
                  )}

                  {/* İletişim */}
                  {(member.phone || member.email) && (
                    <div className="mt-4 space-y-1.5 border-t border-gray-100 pt-4">
                      {member.phone && (
                        <a
                          href={`tel:${member.phone.replace(/[^+\d]/g, "")}`}
                          className="flex items-center gap-2 text-xs text-gray-400 hover:text-brand transition-colors"
                        >
                          <Phone size={11} />
                          <span>{member.phone}</span>
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center gap-2 text-xs text-gray-400 hover:text-brand transition-colors"
                        >
                          <Mail size={11} />
                          <span className="truncate">{member.email}</span>
                        </a>
                      )}
                    </div>
                  )}

                  {/* Profil linki */}
                  <Link
                    href={`/ekibimiz/${member.slug}`}
                    className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-semibold text-brand opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0"
                  >
                    Profili Gör
                    <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamPreview;
