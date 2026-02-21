import { fetchPublications } from "@/lib/api";

const generateStaticParams = async () => {
  const publications = await fetchPublications();
  return publications.map((publication) => ({ slug: publication.slug }));
};

export default generateStaticParams;
