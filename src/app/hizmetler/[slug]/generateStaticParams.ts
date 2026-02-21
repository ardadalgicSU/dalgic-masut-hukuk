import { fetchServices } from "@/lib/api";

const generateStaticParams = async () => {
  const services = await fetchServices();
  return services.map((service) => ({ slug: service.slug }));
};

export default generateStaticParams;
