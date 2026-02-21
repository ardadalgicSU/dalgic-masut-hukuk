import type { MetadataRoute } from "next";
import { fetchServices, fetchPublications, fetchTeamMembers } from "@/lib/api";

const BASE_URL = "https://dalgicmasut.av.tr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, publications, team] = await Promise.all([
    fetchServices(),
    fetchPublications(),
    fetchTeamMembers(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/hizmetler`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/ekibimiz`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/yayinlar`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/hesaplayicilar`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/iletisim`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/kvkk`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cerez-politikasi`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${BASE_URL}/hizmetler/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const publicationPages: MetadataRoute.Sitemap = publications.map((pub) => ({
    url: `${BASE_URL}/yayinlar/${pub.slug}`,
    lastModified: pub.publishedDate ? new Date(pub.publishedDate) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const teamPages: MetadataRoute.Sitemap = team.map((member) => ({
    url: `${BASE_URL}/ekibimiz/${member.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...publicationPages, ...teamPages];
}
