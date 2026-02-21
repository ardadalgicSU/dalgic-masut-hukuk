import HeroSection from "@/components/HeroSection";
import StatisticsBand from "@/components/StatisticsBand";
import ServicesPreview from "@/components/ServicesPreview";
import TeamPreview from "@/components/TeamPreview";
import Testimonials from "@/components/Testimonials";
import PublicationsPreview from "@/components/PublicationsPreview";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import {
  fetchFaqs,
  fetchPublications,
  fetchServices,
  fetchSiteSettings,
  fetchTeamMembers,
  fetchTestimonials,
} from "@/lib/api";
import { fallbackServices } from "@/lib/fallbackData";

export default async function Home() {
  const [siteSettings, services, team, publications, testimonials, faqs] =
    await Promise.all([
      fetchSiteSettings(),
      fetchServices(6),
      fetchTeamMembers(),
      fetchPublications(3),
      fetchTestimonials(),
      fetchFaqs(),
    ]);

  const displayServices = services.length >= 3 ? services : fallbackServices;

  return (
    <>
      <HeroSection hero={siteSettings.hero} />
      <StatisticsBand statistics={siteSettings.statistics} />
      <ServicesPreview services={displayServices} />
      <TeamPreview team={team} />
      <Testimonials testimonials={testimonials} />
      <PublicationsPreview publications={publications} />
      <FAQAccordion faqs={faqs} />
      <CTASection />
    </>
  );
}
