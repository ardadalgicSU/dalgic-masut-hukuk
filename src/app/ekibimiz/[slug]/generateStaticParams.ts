import { fetchTeamMembers } from "@/lib/api";

const generateStaticParams = async () => {
  const team = await fetchTeamMembers();
  return team.map((member) => ({ slug: member.slug }));
};

export default generateStaticParams;
