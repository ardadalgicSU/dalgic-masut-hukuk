export type Media = {
  url: string;
  alternativeText?: string;
};

export type NavigationItem = {
  id: number;
  label: string;
  href: string;
};

export type ContactInfo = {
  address?: string;
  phone?: string;
  email?: string;
  mapEmbedUrl?: string;
  workingHours?: string;
};

export type Statistic = {
  id: number;
  value: string;
  label: string;
  description?: string;
};

export type HeroContent = {
  heading: string;
  subheading?: string;
  primaryCtaLabel?: string;
  primaryCtaUrl?: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
  highlights: string[];
};

export type FirmInfo = {
  name: string;
  tagline?: string;
  description?: string;
  foundingYear?: number;
};

export type SiteSettings = {
  firm: FirmInfo;
  hero?: HeroContent;
  statistics: Statistic[];
  contactInfo?: ContactInfo;
  navigation: NavigationItem[];
  footerDescription?: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
};

export type PublicationSummary = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  excerptHtml?: string;
  readTime?: string;
  publishedDate?: string;
  tags: string[];
  image?: Media;
  author?: {
    id: number;
    name: string;
    slug?: string;
    title?: string;
  };
};

export type Service = {
  id: number;
  slug: string;
  title: string;
  summary?: string;
  description?: string;
  image?: Media;
  highlights: string[];
  ctaLabel?: string;
  ctaUrl?: string;
  relatedArticles: PublicationSummary[];
};

export type TeamMember = {
  id: number;
  slug: string;
  name: string;
  title?: string;
  bio?: string;
  expertise: string[];
  education: string[];
  barAdmissions: string[];
  languages: string[];
  email?: string;
  phone?: string;
  linkedin?: string;
  image?: Media;
};

export type Publication = PublicationSummary & {
  content?: string;
};

export type Testimonial = {
  id: number;
  quote: string;
  author: string;
  role?: string;
  company?: string;
};

export type FAQ = {
  id: number;
  question: string;
  answer: string;
};

export type TimelineEvent = {
  id: number;
  year: string;
  title: string;
  description?: string;
  order?: number;
};

export type Calculator = {
  id: number;
  slug: string;
  name: string;
  description?: string;
  category: "employment" | "family" | "injury" | "rental" | "other";
  config?: unknown;
  longDescription?: string;
  info?: string[];
};
