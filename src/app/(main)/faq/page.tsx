import type { Metadata } from "next";
import { FAQPageHero } from "@/components/faq/FAQPageHero";
import { FAQFullList } from "@/components/faq/FAQFullList";
import { FAQ_CATEGORIES } from "@/lib/faq-data";
import { SITE_CONFIG } from "@/lib/constants";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "FAQ — Frequently Asked Questions",
  description:
    "Answers to common questions about XYZ Law Coaching programmes, TNPSC Civil Judge exam, APP exam, fees, batches, online classes and more.",
  keywords: [
    "civil judge coaching FAQ",
    "TNPSC exam eligibility",
    "judiciary coaching fees Tamil Nadu",
    "XYZ law coaching questions",
  ],
  path: "/faq",
});

export default function FAQPage() {
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
        name: "FAQ",
        item: `${siteUrl}/faq`,
      },
    ],
  };

  // Flatten all category questions into single FAQPage schema
  const allQuestions = FAQ_CATEGORIES.flatMap((category) => category.items);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allQuestions.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen">
        <FAQPageHero />
        <FAQFullList />
      </main>
    </>
  );
}
