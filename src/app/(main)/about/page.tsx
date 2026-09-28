import type { Metadata } from "next";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";
import { AboutHero } from "@/components/about/AboutHero";
import { FounderSection } from "@/components/about/FounderSection";
import { MissionSection } from "@/components/about/MissionSection";
import { AchievementsTimeline } from "@/components/about/AchievementsTimeline";
import { TeamSection } from "@/components/about/TeamSection";
import { AboutCTA } from "@/components/about/AboutCTA";
import { SITE_CONFIG } from "@/lib/constants";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "About Us — Tamil Nadu Judiciary Coaching",
  description:
    "Learn about XYZ Law Coaching — Tamil Nadu's trusted judiciary coaching institute led by practicing lawyers. 10+ years, 25+ judges selected, online and offline classes.",
  keywords: [
    "about XYZ law coaching",
    "Tamil Nadu judiciary coaching institute",
    "law coaching Chennai history",
    "judiciary faculty Tamil Nadu",
  ],
  path: "/about",
});

import { getSiteSettingsFull } from "@/lib/sanity/queries";

export const revalidate = 3600;

export default async function AboutPage() {
  const settings = await getSiteSettingsFull();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url || "https://yourdomain.com";

  const founderPersonSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: settings?.founderName || "[Founder Name]",
    jobTitle: "Founder & Chief Faculty",
    worksFor: {
      "@type": "EducationalOrganization",
      name: settings?.siteName || SITE_CONFIG.name || "XYZ Law Coaching",
    },
    knowsAbout: [
      "Civil Judge Exam Coaching",
      "Tamil Nadu Judicial Service",
      "TNPSC APP Exam",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: settings?.address || SITE_CONFIG.address,
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About Us",
        item: `${siteUrl}/about`,
      },
    ],
  };

  return (
    <>
      {/* Home / EducationalOrganization Schema */}
      <SchemaMarkup
        type="home"
        data={{
          siteName: settings?.siteName || SITE_CONFIG.name || "XYZ Law Coaching",
          description:
            settings?.tagline ||
            "Tamil Nadu judiciary coaching institute led by practicing lawyers",
          url: siteUrl,
          phone: settings?.phone || SITE_CONFIG.phone || "",
          email: settings?.email || SITE_CONFIG.email || "",
          address: settings?.address || SITE_CONFIG.address || "",
          establishedYear: settings?.establishedYear || SITE_CONFIG.established || "",
          courses: [],
        }}
      />

      {/* Founder Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(founderPersonSchema),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Page Sections (Top to Bottom) */}
      {/* 1. AboutHero */}
      <AboutHero />

      {/* 2. FounderSection */}
      <FounderSection />

      {/* 3. MissionSection */}
      <MissionSection
        mission={settings?.mission}
        vision={settings?.vision}
        values={settings?.values}
      />

      {/* 4. AchievementsTimeline */}
      <AchievementsTimeline milestones={settings?.milestones} />

      {/* 5. TeamSection */}
      <TeamSection />

      {/* 6. AboutCTA */}
      <AboutCTA />
    </>
  );
}
