import type { Metadata } from "next";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";
import { AboutHero } from "@/components/about/AboutHero";
import { FounderSection } from "@/components/about/FounderSection";
import { MissionSection } from "@/components/about/MissionSection";
import { AchievementsTimeline } from "@/components/about/AchievementsTimeline";
import { TeamSection } from "@/components/about/TeamSection";
import { AboutCTA } from "@/components/about/AboutCTA";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us — XYZ Law Coaching Tamil Nadu",
  description:
    "Learn about XYZ Law Coaching — Tamil Nadu's trusted judiciary coaching institute led by practicing lawyers. 10+ years, 25+ judges selected, online and offline classes.",
  openGraph: {
    title: "About XYZ Law Coaching — Tamil Nadu Judiciary Coaching",
    description:
      "Founded by a practicing advocate, XYZ has trained 1000+ students and produced 25+ Civil Judges and APPs across Tamil Nadu.",
  },
};

export default function AboutPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url || "https://yourdomain.com";

  const founderPersonSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "[Founder Name]",
    jobTitle: "Founder & Chief Faculty",
    worksFor: {
      "@type": "EducationalOrganization",
      name: SITE_CONFIG.name || "XYZ Law Coaching",
    },
    knowsAbout: [
      "Civil Judge Exam Coaching",
      "Tamil Nadu Judicial Service",
      "TNPSC APP Exam",
    ],
    address: {
      "@type": "PostalAddress",
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
          siteName: SITE_CONFIG.name || "XYZ Law Coaching",
          description:
            "Tamil Nadu judiciary coaching institute led by practicing lawyers",
          url: siteUrl,
          phone: SITE_CONFIG.phone || "",
          email: SITE_CONFIG.email || "",
          address: SITE_CONFIG.address || "",
          establishedYear: SITE_CONFIG.established || "",
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
      <MissionSection />

      {/* 4. AchievementsTimeline */}
      <AchievementsTimeline />

      {/* 5. TeamSection */}
      <TeamSection />

      {/* 6. AboutCTA */}
      <AboutCTA />
    </>
  );
}
