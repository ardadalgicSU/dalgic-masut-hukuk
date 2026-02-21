import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import { fetchTeamMemberBySlug, fetchTeamMembers } from "@/lib/api";
import { sanitizeHtml } from "@/lib/utils";

export async function generateStaticParams() {
  const team = await fetchTeamMembers();
  return team.map((m) => ({ slug: m.slug }));
}

interface TeamMemberPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TeamMemberPageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = await fetchTeamMemberBySlug(slug);

  if (!member) {
    return { title: "Avukat Bulunamadı | Dalgıç-Masüt Hukuk Bürosu" };
  }

  const title = `${member.name} | Dalgıç-Masüt Hukuk Bürosu`;
  const description = [member.title, member.expertise.slice(0, 3).join(", ")]
    .filter(Boolean)
    .join(" · ") || "Dalgıç-Masüt Hukuk Bürosu avukat profili.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://dalgicmasut.av.tr/ekibimiz/${slug}`,
      siteName: "Dalgıç-Masüt Hukuk Bürosu",
      locale: "tr_TR",
      type: "profile",
    },
    alternates: { canonical: `https://dalgicmasut.av.tr/ekibimiz/${slug}` },
  };
}

const TeamMemberPage = async ({ params }: TeamMemberPageProps) => {
  const { slug } = await params;
  const member = await fetchTeamMemberBySlug(slug);

  if (!member) {
    notFound();
  }

  return (
    <>
      <PageHeader
        title={member.name}
        description={[member.title, member.expertise.join(", ")]
          .filter(Boolean)
          .join(" · ")}
      />
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-6 text-sm text-gray-600">
            {member.bio && (
              <div
                className="prose prose-sm max-w-none text-gray-600 prose-p:my-4"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(member.bio) }}
              />
            )}
            <div className="grid gap-6 md:grid-cols-2">
              {!!member.expertise.length && (
                <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6">
                  <h3 className="font-heading text-lg text-gray-900">Uzmanlıklar</h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    {member.expertise.map((item, index) => (
                      <li key={`${member.slug}-expertise-${index}`}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {!!member.barAdmissions.length && (
                <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6">
                  <h3 className="font-heading text-lg text-gray-900">Baro Kayıtları</h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    {member.barAdmissions.map((item, index) => (
                      <li key={`${member.slug}-bar-${index}`}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <aside className="space-y-6">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg text-gray-900">İletişim</h3>
              {member.phone && (
                <p className="mt-3 text-sm text-gray-600">
                  Telefon: <strong>{member.phone}</strong>
                </p>
              )}
              {member.email && (
                <p className="text-sm text-gray-600">
                  E-posta: <strong>{member.email}</strong>
                </p>
              )}
              {member.linkedin && (
                <Link
                  href={member.linkedin}
                  className="mt-3 inline-block text-sm font-semibold text-brand hover:text-brand-dark"
                >
                  LinkedIn Profili
                </Link>
              )}
            </div>
            {(member.education.length > 0 || member.languages.length > 0) && (
              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm text-sm text-gray-600">
                {member.education.length > 0 && (
                  <>
                    <h3 className="font-heading text-lg text-gray-900">Eğitim</h3>
                    <ul className="mt-3 space-y-2">
                      {member.education.map((item, index) => (
                        <li key={`${member.slug}-edu-${index}`}>• {item}</li>
                      ))}
                    </ul>
                  </>
                )}
                {member.languages.length > 0 && (
                  <>
                    <h3 className="mt-6 font-heading text-lg text-gray-900">Yabancı Diller</h3>
                    <p className="mt-3">{member.languages.join(", ")}</p>
                  </>
                )}
              </div>
            )}
          </aside>
        </div>
      </section>
      <CTASection />
    </>
  );
};

export default TeamMemberPage;
