import type { Metadata } from "next";
import { FAQPageHero } from "@/components/faq/FAQPageHero";
import { FAQFullList } from "@/components/faq/FAQFullList";
import { FAQ_CATEGORIES, FALLBACK_FAQS } from "@/lib/faq-data";
import { SITE_CONFIG } from "@/lib/constants";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { getAllFAQsSanity } from "@/lib/sanity/queries";

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

export const revalidate = 3600;

export default async function FAQPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url || "https://yourdomain.com";

  let faqs: Array<{ question: string; answer: string; category?: string }> = [];

  try {
    const sanityFaqs = await getAllFAQsSanity();
    if (sanityFaqs && sanityFaqs.length > 0) {
      faqs = sanityFaqs;
    }
  } catch {
    faqs = [];
  }

  const grouped = faqs.length > 0
    ? faqs.reduce(
        (acc, faq) => {
          const cat = faq.category || "about-courses";
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push({ question: faq.question, answer: faq.answer });
          return acc;
        },
        {} as Record<string, Array<{ question: string; answer: string }>>
      )
    : undefined;

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
  const allQuestions = grouped
    ? Object.values(grouped).flat()
    : FAQ_CATEGORIES.flatMap((category) => category.items);

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
        <FAQFullList groupedFaqs={grouped} />
      </main>
    </>
  );
}
