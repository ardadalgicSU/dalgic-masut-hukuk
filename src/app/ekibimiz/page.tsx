import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { ArrowRight } from "lucide-react";
import { fetchTeamMembers } from "@/lib/api";
import { toPlainText, truncate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Ekibimiz | Dalgıç-Masüt Hukuk Bürosu",
  description: "Dalgıç-Masüt Hukuk Bürosu'nun deneyimli avukat ve hukuk danışmanlarıyla tanışın. İş, aile, ticaret ve sigorta hukukunda uzman kadro.",
  openGraph: {
    title: "Ekibimiz | Dalgıç-Masüt Hukuk Bürosu",
    description: "Dalgıç-Masüt Hukuk Bürosu'nun deneyimli avukat ve hukuk danışmanlarıyla tanışın.",
    url: "https://dalgicmasut.av.tr/ekibimiz",
    siteName: "Dalgıç-Masüt Hukuk Bürosu",
    locale: "tr_TR",
    type: "website",
  },
  alternates: { canonical: "https://dalgicmasut.av.tr/ekibimiz" },
};

const TeamPage = async () => {
  const team = await fetchTeamMembers();

  return (
    <>
      <PageHeader
        title="Ekibimiz"
        description="Çapraz disiplinli ekibimizle iş, aile, ticaret ve sigorta hukukunda entegre çözümler sunuyoruz."
      />
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-8 md:grid-cols-2">
            {team.map((member) => {
              const summary = truncate(toPlainText(member.bio) || "", 180);

              return (
                <div
                  key={member.slug}
                  className="flex h-full flex-col rounded-3xl border border-gray-100 bg-gray-50 p-8 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-xl font-heading text-brand">
                      {member.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </div>
                    <div>
                      <h2 className="font-heading text-2xl text-gray-900">
                        {member.name}
                      </h2>
                      {member.title && (
                        <p className="text-sm font-semibold text-brand">
                          {member.title}
                        </p>
                      )}
                    </div>
                  </div>
                  {summary && (
                    <p className="mt-6 text-sm text-gray-600">{summary}</p>
                  )}
                  <div className="mt-4 grid gap-3 text-sm text-gray-500">
                    {!!member.expertise.length && (
                      <p>
                        <strong>Uzmanlık Alanları: </strong>
                        {member.expertise.join(", ")}
                      </p>
                    )}
                    {!!member.education.length && (
                      <p>
                        <strong>Eğitim: </strong>
                        {member.education.join(", ")}
                      </p>
                    )}
                    {!!member.languages.length && (
                      <p>
                        <strong>Diller: </strong>
                        {member.languages.join(", ")}
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/ekibimiz/${member.slug}`}
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-brand hover:text-brand-dark"
                  >
                    Detaylı Profili Gör
                    <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamPage;
