import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchPublications, fetchServices, fetchSiteSettings } from "@/lib/api";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#8B1A1A",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://dalgicmasut.av.tr"),
  title: "Dalgıç-Masüt Hukuk Bürosu | Eskişehir Avukat",
  description:
    "25 yıllık tecrübe ile Eskişehir'de hukuki danışmanlık hizmetleri. İş hukuku, aile hukuku, trafik kazaları, ticari uyuşmazlıklar ve daha fazlası için bizimle iletişime geçin.",
  keywords:
    "eskişehir avukat, hukuk bürosu, iş hukuku, aile hukuku, trafik kazası avukatı, dalgıç masüt, eskişehir hukuk bürosu",
  authors: [{ name: "Dalgıç-Masüt Hukuk Bürosu" }],
  openGraph: {
    title: "Dalgıç-Masüt Hukuk Bürosu",
    description: "25 yıllık tecrübe ile hukuki danışmanlık",
    url: "https://dalgicmasut.av.tr",
    siteName: "Dalgıç-Masüt Hukuk Bürosu",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/eskisehir-sehir.jpg",
        width: 1200,
        height: 630,
        alt: "Dalgıç-Masüt Hukuk Bürosu — Eskişehir",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [siteSettings, services, publications] = await Promise.all([
    fetchSiteSettings(),
    fetchServices(6),
    fetchPublications(3),
  ]);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["LegalService", "LocalBusiness"],
    name: "Dalgıç-Masüt Hukuk Bürosu",
    url: "https://dalgicmasut.av.tr",
    telephone: "+90-530-159-8132",
    email: "info@dalgicmasut.av.tr",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Eskişehir",
      addressCountry: "TR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
    foundingDate: "1997",
    description: "25 yıllık tecrübe ile Eskişehir'de iş hukuku, aile hukuku, trafik kazaları ve ticari uyuşmazlık alanlarında hukuki danışmanlık.",
    areaServed: {
      "@type": "City",
      name: "Eskişehir",
    },
    priceRange: "$$",
  };

  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} bg-gray-50 text-gray-900 antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Header
            firm={siteSettings.firm}
            contact={siteSettings.contactInfo}
            navigation={siteSettings.navigation}
          />
          <main className="flex-1">{children}</main>
          <Footer
            firm={siteSettings.firm}
            contact={siteSettings.contactInfo}
            navigation={siteSettings.navigation}
            services={services}
            publications={publications}
          />
        </div>
      </body>
    </html>
  );
}
