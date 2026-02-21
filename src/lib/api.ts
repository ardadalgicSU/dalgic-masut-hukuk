import {
  Calculator,
  ContactInfo,
  FAQ,
  FirmInfo,
  HeroContent,
  Media,
  NavigationItem,
  Publication,
  PublicationSummary,
  Service,
  SiteSettings,
  Statistic,
  TeamMember,
  Testimonial,
  TimelineEvent,
} from "./types";
import { buildMediaUrl, strapiFetch } from "./strapi";
import { markdownToHtml, toPlainText } from "./utils";
import {
  fallbackCalculators,
  fallbackFaqs,
  fallbackPublications,
  fallbackServices,
  fallbackSiteSettings,
  fallbackTeam,
  fallbackTestimonials,
  fallbackTimeline,
} from "./fallbackData";

type StrapiMedia = {
  data: {
    id: number;
    attributes: {
      url: string;
      alternativeText?: string;
    };
  } | null;
};

type StrapiComponent<T> = (T & { id?: number })[] | null | undefined;

type StrapiRelation<T> = {
  data: StrapiEntity<T>[];
} | null;

type StrapiSingleRelation<T> = {
  data: StrapiEntity<T> | null;
} | null;

type StrapiEntity<T> = {
  id: number;
  attributes?: T;
  documentId?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string | null;
} & Partial<T>;

type StrapiListResponse<T> = {
  data: StrapiEntity<T>[];
};

type StrapiSingleResponse<T> = {
  data: StrapiEntity<T> | null;
};

const extractAttributes = <T>(entity: StrapiEntity<T>): T => {
  if (entity.attributes) {
    return entity.attributes;
  }

  const sanitizedEntity = { ...(entity as Record<string, unknown>) };
  delete sanitizedEntity.attributes;
  delete sanitizedEntity.id;
  delete sanitizedEntity.documentId;
  delete sanitizedEntity.createdAt;
  delete sanitizedEntity.updatedAt;
  delete sanitizedEntity.publishedAt;

  return sanitizedEntity as T;
};

type SiteSettingAttributes = {
  firmName?: string;
  tagline?: string;
  description?: string;
  foundingYear?: number;
  hero?: HeroComponent;
  statistics?: StrapiComponent<{ value?: string; label?: string; description?: string }>;
  contactInfo?: ContactInfoComponent;
  navigation?: StrapiComponent<{ label?: string; href?: string }>;
  footerDescription?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
};

type HeroComponent = {
  heading?: string;
  subheading?: string;
  primaryCtaLabel?: string;
  primaryCtaUrl?: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
  highlights?: StrapiComponent<{ text?: string }>;
};

type ContactInfoComponent = {
  address?: string;
  phone?: string;
  email?: string;
  workingHours?: string;
  mapEmbedUrl?: string;
};

type ServiceAttributes = {
  title?: string;
  slug?: string;
  summary?: string;
  description?: string;
  highlights?: StrapiComponent<{ text?: string }>;
  image?: StrapiMedia;
  ctaLabel?: string;
  ctaUrl?: string;
  relatedArticles?: StrapiRelation<PublicationAttributes>;
};

type TeamMemberAttributes = {
  name?: string;
  slug?: string;
  title?: string;
  bio?: string;
  expertise?: StrapiComponent<{ text?: string }>;
  education?: StrapiComponent<{ text?: string }>;
  barAdmissions?: StrapiComponent<{ text?: string }>;
  languages?: StrapiComponent<{ text?: string }>;
  email?: string;
  phone?: string;
  linkedin?: string;
  image?: StrapiMedia;
};

type PublicationAttributes = {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  publishedDate?: string;
  readTime?: string;
  tags?: StrapiComponent<{ text?: string }>;
  image?: StrapiMedia;
  author?: StrapiSingleRelation<TeamMemberAttributes>;
};

type TestimonialAttributes = {
  quote?: string;
  author?: string;
  role?: string;
  company?: string;
};

type FAQAttributes = {
  question?: string;
  answer?: string;
};

type TimelineEventAttributes = {
  year?: string;
  title?: string;
  description?: string;
  order?: number;
};

type CalculatorAttributes = {
  name?: string;
  slug?: string;
  description?: string;
  category?: "employment" | "family" | "injury";
  config?: unknown;
};

const mapMedia = (media?: StrapiMedia): Media | undefined => {
  const url = media?.data?.attributes?.url;
  if (!url) {
    return undefined;
  }

  return {
    url: buildMediaUrl(url) ?? url,
    alternativeText: media?.data?.attributes?.alternativeText ?? undefined,
  };
};

const mapHighlights = (items?: StrapiComponent<{ text?: string }>): string[] => {
  if (!items) {
    return [];
  }

  return items
    .map((item) => item?.text)
    .filter((value): value is string => Boolean(value));
};

const mapNavigation = (items?: StrapiComponent<{ label?: string; href?: string }>): NavigationItem[] => {
  if (!items) {
    return [];
  }

  return items
    .map((item, index) => {
      if (!item?.label || !item?.href) {
        return null;
      }

      return {
        id: item.id ?? index,
        label: item.label,
        href: item.href,
      } satisfies NavigationItem;
    })
    .filter((item): item is NavigationItem => Boolean(item));
};

const mapStatistics = (
  items?: StrapiComponent<{ value?: string; label?: string; description?: string }>,
): Statistic[] => {
  if (!items) {
    return [];
  }

  return items.reduce<Statistic[]>((acc, item, index) => {
    if (!item?.value || !item?.label) {
      return acc;
    }

    acc.push({
      id: item.id ?? index,
      value: item.value,
      label: item.label,
      description: item.description ?? undefined,
    });

    return acc;
  }, []);
};

const mapContactInfo = (contact?: ContactInfoComponent): ContactInfo | undefined => {
  if (!contact) {
    return undefined;
  }

  return {
    address: contact.address ?? undefined,
    phone: contact.phone ?? undefined,
    email: contact.email ?? undefined,
    workingHours: contact.workingHours ?? undefined,
    mapEmbedUrl: contact.mapEmbedUrl ?? undefined,
  } satisfies ContactInfo;
};

const mapHero = (hero?: HeroComponent): HeroContent | undefined => {
  if (!hero?.heading) {
    return undefined;
  }

  return {
    heading: hero.heading,
    subheading: hero.subheading ?? undefined,
    primaryCtaLabel: hero.primaryCtaLabel ?? undefined,
    primaryCtaUrl: hero.primaryCtaUrl ?? undefined,
    secondaryCtaLabel: hero.secondaryCtaLabel ?? undefined,
    secondaryCtaUrl: hero.secondaryCtaUrl ?? undefined,
    highlights: mapHighlights(hero.highlights),
  } satisfies HeroContent;
};

const mapTeamMemberSummary = (
  entity: StrapiEntity<TeamMemberAttributes>,
): TeamMember => ({
  id: entity.id,
  ...(() => {
    const attributes = extractAttributes(entity);
    return {
      slug: attributes.slug ?? String(entity.id),
      name: attributes.name ?? "",
      title: attributes.title ?? undefined,
      bio: attributes.bio ?? undefined,
      expertise: mapHighlights(attributes.expertise),
      education: mapHighlights(attributes.education),
      barAdmissions: mapHighlights(attributes.barAdmissions),
      languages: mapHighlights(attributes.languages),
      email: attributes.email ?? undefined,
      phone: attributes.phone ?? undefined,
      linkedin: attributes.linkedin ?? undefined,
      image: mapMedia(attributes.image),
    } satisfies Omit<TeamMember, "id">;
  })(),
});

const mapPublicationSummary = (
  entity: StrapiEntity<PublicationAttributes>,
): PublicationSummary => ({
  id: entity.id,
  ...(() => {
    const attributes = extractAttributes(entity);
    const authorEntity = attributes.author?.data;
    const authorAttributes = authorEntity ? extractAttributes(authorEntity) : null;
    const excerptMarkdown = attributes.excerpt ?? undefined;
    const excerptHtml = excerptMarkdown ? markdownToHtml(excerptMarkdown) : undefined;

    return {
      title: attributes.title ?? "",
      slug: attributes.slug ?? String(entity.id),
      excerpt: excerptHtml ? toPlainText(excerptHtml) : excerptMarkdown ? toPlainText(excerptMarkdown) : undefined,
      excerptHtml,
      readTime: attributes.readTime ?? undefined,
      publishedDate: attributes.publishedDate ?? undefined,
      tags: mapHighlights(attributes.tags),
      image: mapMedia(attributes.image),
      author: authorEntity
        ? {
            id: authorEntity.id,
            name: authorAttributes?.name ?? "",
            slug: authorAttributes?.slug ?? undefined,
            title: authorAttributes?.title ?? undefined,
          }
        : undefined,
    } satisfies Omit<PublicationSummary, "id">;
  })(),
});

const mapPublication = (
  entity: StrapiEntity<PublicationAttributes>,
): Publication => ({
  ...mapPublicationSummary(entity),
  content: extractAttributes(entity).content ?? undefined,
});

const mapService = (entity: StrapiEntity<ServiceAttributes>): Service => ({
  id: entity.id,
  ...(() => {
    const attributes = extractAttributes(entity);
    return {
      slug: attributes.slug ?? String(entity.id),
      title: attributes.title ?? "",
      summary: attributes.summary ?? undefined,
      description: attributes.description ?? undefined,
      image: mapMedia(attributes.image),
      highlights: mapHighlights(attributes.highlights),
      ctaLabel: attributes.ctaLabel ?? undefined,
      ctaUrl: attributes.ctaUrl ?? undefined,
      relatedArticles:
        attributes.relatedArticles?.data?.map(mapPublicationSummary) ?? [],
    } satisfies Omit<Service, "id">;
  })(),
});

const mapTestimonial = (
  entity: StrapiEntity<TestimonialAttributes>,
): Testimonial => ({
  id: entity.id,
  ...(() => {
    const attributes = extractAttributes(entity);
    return {
      quote: attributes.quote ?? "",
      author: attributes.author ?? "",
      role: attributes.role ?? undefined,
      company: attributes.company ?? undefined,
    } satisfies Omit<Testimonial, "id">;
  })(),
});

const mapFaq = (entity: StrapiEntity<FAQAttributes>): FAQ => ({
  id: entity.id,
  ...(() => {
    const attributes = extractAttributes(entity);
    return {
      question: attributes.question ?? "",
      answer: attributes.answer ?? "",
    } satisfies Omit<FAQ, "id">;
  })(),
});

const mapTimelineEvent = (
  entity: StrapiEntity<TimelineEventAttributes>,
): TimelineEvent => ({
  id: entity.id,
  ...(() => {
    const attributes = extractAttributes(entity);
    return {
      year: attributes.year ?? "",
      title: attributes.title ?? "",
      description: attributes.description ?? undefined,
      order: attributes.order ?? undefined,
    } satisfies Omit<TimelineEvent, "id">;
  })(),
});

const mapCalculator = (
  entity: StrapiEntity<CalculatorAttributes>,
): Calculator => ({
  id: entity.id,
  ...(() => {
    const attributes = extractAttributes(entity);
    const config = attributes.config;

    return {
      slug: attributes.slug ?? String(entity.id),
      name: attributes.name ?? "",
      description: attributes.description ?? undefined,
      category: attributes.category ?? "other",
      config: config ?? undefined,
      longDescription:
        typeof config === "object" && config
          ? (config as { longDescription?: string }).longDescription ?? undefined
          : undefined,
      info:
        typeof config === "object" && config
          ? (config as { info?: string[] }).info ?? undefined
          : undefined,
    } satisfies Omit<Calculator, "id">;
  })(),
});

const DEFAULT_NAVIGATION: NavigationItem[] = fallbackSiteSettings.navigation;

export const fetchSiteSettings = async (): Promise<SiteSettings> => {
  const response = await strapiFetch<StrapiSingleResponse<SiteSettingAttributes>>(
    "/site-setting",
    {
      params: {
        populate: {
          hero: { populate: { highlights: true } },
          statistics: true,
          contactInfo: true,
          navigation: true,
        },
      },
    },
  );

  if (!response || !response.data) {
    return fallbackSiteSettings;
  }

  const attributes: SiteSettingAttributes = extractAttributes(response.data);

  const firm: FirmInfo = {
    name: attributes.firmName || fallbackSiteSettings.firm.name,
    tagline: attributes.tagline ?? fallbackSiteSettings.firm.tagline,
    description: attributes.description ?? fallbackSiteSettings.firm.description,
    foundingYear: attributes.foundingYear ?? fallbackSiteSettings.firm.foundingYear,
  } satisfies FirmInfo;

  const navigation = mapNavigation(attributes.navigation);
  const statistics = mapStatistics(attributes.statistics);

  return {
    firm,
    hero: mapHero(attributes.hero) ?? fallbackSiteSettings.hero,
    statistics: statistics.length ? statistics : fallbackSiteSettings.statistics,
    contactInfo: mapContactInfo(attributes.contactInfo) ?? fallbackSiteSettings.contactInfo,
    navigation: navigation.length ? navigation : DEFAULT_NAVIGATION,
    footerDescription: attributes.footerDescription ?? fallbackSiteSettings.footerDescription,
    seo: {
      title: attributes.seoTitle ?? fallbackSiteSettings.seo?.title,
      description: attributes.seoDescription ?? fallbackSiteSettings.seo?.description,
      keywords: attributes.seoKeywords ?? fallbackSiteSettings.seo?.keywords,
    },
  } satisfies SiteSettings;
};

export const fetchServices = async (limit?: number): Promise<Service[]> => {
  const response = await strapiFetch<StrapiListResponse<ServiceAttributes>>("/services", {
    params: {
      populate: {
        highlights: true,
        image: true,
        relatedArticles: {
          populate: {
            image: true,
            tags: true,
            author: {
              fields: ["name", "slug", "title"],
            },
          },
        },
      },
      sort: ["title:asc"],
      pagination: limit ? { pageSize: limit } : undefined,
    },
  });

  if (!response) {
    return fallbackServices.slice(0, limit ?? fallbackServices.length);
  }

  return response.data.map(mapService);
};

export const fetchServiceBySlug = async (slug: string): Promise<Service | null> => {
  const response = await strapiFetch<StrapiListResponse<ServiceAttributes>>("/services", {
    params: {
      filters: { slug: { $eq: slug } },
      populate: {
        highlights: true,
        image: true,
        relatedArticles: {
          populate: {
            image: true,
            tags: true,
            author: {
              fields: ["name", "slug", "title"],
            },
          },
        },
      },
      pagination: { pageSize: 1 },
    },
  });

  if (!response) {
    return fallbackServices.find((service) => service.slug === slug) ?? null;
  }

  const entity = response.data[0];

  if (!entity) {
    return fallbackServices.find((service) => service.slug === slug) ?? null;
  }

  return mapService(entity);
};

export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  const response = await strapiFetch<StrapiListResponse<TeamMemberAttributes>>(
    "/team-members",
    {
      params: {
        populate: {
          expertise: true,
          education: true,
          barAdmissions: true,
          languages: true,
          image: true,
        },
        sort: ["name:asc"],
      },
    },
  );

  if (!response) {
    return fallbackTeam;
  }

  return response.data.map(mapTeamMemberSummary);
};

export const fetchTeamMemberBySlug = async (
  slug: string,
): Promise<TeamMember | null> => {
  const response = await strapiFetch<StrapiListResponse<TeamMemberAttributes>>(
    "/team-members",
    {
      params: {
        filters: { slug: { $eq: slug } },
        populate: {
          expertise: true,
          education: true,
          barAdmissions: true,
          languages: true,
          image: true,
        },
        pagination: { pageSize: 1 },
      },
    },
  );

  if (!response) {
    return fallbackTeam.find((member) => member.slug === slug) ?? null;
  }

  const entity = response.data[0];
  return entity ? mapTeamMemberSummary(entity) : fallbackTeam.find((member) => member.slug === slug) ?? null;
};

export const fetchPublications = async (
  limit?: number,
): Promise<PublicationSummary[]> => {
  const response = await strapiFetch<StrapiListResponse<PublicationAttributes>>(
    "/publications",
    {
      params: {
        populate: {
          tags: true,
          image: true,
          author: {
            fields: ["name", "slug", "title"],
          },
        },
        sort: ["publishedDate:desc"],
        pagination: limit ? { pageSize: limit } : undefined,
      },
    },
  );

  if (!response) {
    return fallbackPublications
      .slice(0, limit ?? fallbackPublications.length)
      .map(({ id, title, slug, excerpt, readTime, publishedDate, tags }) => {
        const html = excerpt ? markdownToHtml(excerpt) : undefined;
        return {
          id,
          title,
          slug,
          excerpt: html ? toPlainText(html) : excerpt,
          excerptHtml: html,
          readTime,
          publishedDate,
          tags,
        } satisfies PublicationSummary;
      });
  }

  return response.data.map(mapPublicationSummary);
};

export const fetchPublicationBySlug = async (
  slug: string,
): Promise<Publication | null> => {
  const response = await strapiFetch<StrapiListResponse<PublicationAttributes>>(
    "/publications",
    {
      params: {
        filters: { slug: { $eq: slug } },
        populate: {
          tags: true,
          image: true,
          author: {
            fields: ["name", "slug", "title"],
          },
        },
        pagination: { pageSize: 1 },
      },
    },
  );

  if (!response) {
    return fallbackPublications.find((publication) => publication.slug === slug) ?? null;
  }

  const entity = response.data[0];
  return entity ? mapPublication(entity) : fallbackPublications.find((publication) => publication.slug === slug) ?? null;
};

export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  const response = await strapiFetch<StrapiListResponse<TestimonialAttributes>>(
    "/testimonials",
  );

  if (!response) {
    return fallbackTestimonials;
  }

  return response.data.map(mapTestimonial);
};

export const fetchFaqs = async (): Promise<FAQ[]> => {
  const response = await strapiFetch<StrapiListResponse<FAQAttributes>>(
    "/faqs",
    { params: { sort: ["id:asc"] } },
  );

  if (!response) {
    return fallbackFaqs;
  }

  return response.data.map(mapFaq);
};

export const fetchTimelineEvents = async (): Promise<TimelineEvent[]> => {
  const response = await strapiFetch<StrapiListResponse<TimelineEventAttributes>>(
    "/timeline-events",
    { params: { sort: ["order:asc", "year:asc"] } },
  );

  if (!response) {
    return fallbackTimeline;
  }

  return response.data.map(mapTimelineEvent);
};

export const fetchCalculators = async (): Promise<Calculator[]> => {
  const response = await strapiFetch<StrapiListResponse<CalculatorAttributes>>(
    "/calculators",
    { params: { sort: ["name:asc"] } },
  );

  // Strapi erişilemezse ya da boş liste dönerse geliştirme sırasında
  // zengin bir deneyim için fallback hesaplayıcıları gösterelim.
  if (!response || !response.data || response.data.length === 0) {
    return fallbackCalculators;
  }

  return response.data.map(mapCalculator);
};

export const fetchCalculatorBySlug = async (slug: string): Promise<Calculator | null> => {
  const response = await strapiFetch<StrapiListResponse<CalculatorAttributes>>(
    "/calculators",
    {
      params: {
        filters: { slug: { $eq: slug } },
        pagination: { pageSize: 1 },
      },
    },
  );

  if (!response) {
    return fallbackCalculators.find((calculator) => calculator.slug === slug) ?? null;
  }

  const entity = response.data[0];
  return entity ? mapCalculator(entity) : fallbackCalculators.find((calculator) => calculator.slug === slug) ?? null;
};
