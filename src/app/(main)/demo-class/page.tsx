import type { Metadata } from "next";
import { DemoHero } from "@/components/demo/DemoHero";
import { DemoFormSection } from "@/components/demo/DemoFormSection";
import { DemoBenefits } from "@/components/demo/DemoBenefits";
import { DemoTestimonial } from "@/components/demo/DemoTestimonial";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Book a Free Demo Class — Experience XYZ Coaching | Tamil Nadu",
  description:
    "Attend a free demo class at XYZ Law Coaching before you enrol. Experience our teaching style — Civil Judge, APP Exam coaching. Online and offline. No commitment required.",
  robots: "index, follow",
};

export default function DemoClassPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url || "https://yourdomain.com";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Free Demo Class",
        item: `${siteUrl}/demo-class`,
      },
    ],
  };

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Free Demo Class — XYZ Law Coaching Tamil Nadu",
    description:
      "Attend a free demo coaching class before enrolling. Experience our teaching style for TNPSC Civil Judge and APP Exam preparation.",
    eventStatus: "EventScheduled",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    organizer: {
      "@type": "EducationalOrganization",
      name: SITE_CONFIG.name,
      url: siteUrl,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      description: "Completely free — no payment required",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      <main className="min-h-screen">
        <DemoHero />
        <DemoFormSection />
        <DemoBenefits />
        <DemoTestimonial />
      </main>
    </>
  );
}
