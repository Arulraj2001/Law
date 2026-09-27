import { SITE_CONFIG } from "@/lib/constants";
import { validateSchema } from "./validate";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

export function organizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${siteUrl}/#organization`,
    name: "XYZ Law Coaching",
    alternateName: "XYZ Judiciary Coaching",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.png`,
      width: 200,
      height: 60,
    },
    description:
      "Tamil Nadu's trusted judiciary coaching institute for TNPSC Civil Judge, APP Exam, Patent Agent, Trademark Agent, UGC-NET & SET Law.",
    foundingDate: SITE_CONFIG.established || "2016",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address,
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE_CONFIG.phone,
        contactType: "customer service",
        availableLanguage: ["English", "Tamil"],
        contactOption: "TollFree",
      },
      {
        "@type": "ContactPoint",
        telephone: SITE_CONFIG.whatsapp,
        contactType: "sales",
        availableLanguage: ["English", "Tamil"],
      },
    ],
    sameAs: [
      SITE_CONFIG.social.youtube,
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.facebook,
    ].filter(Boolean),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Law Coaching Programmes",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "Civil Judge Exam Coaching",
            url: `${siteUrl}/courses/civil-judge`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "APP Exam Coaching",
            url: `${siteUrl}/courses/app-exam`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "Patent Agent Exam Coaching",
            url: `${siteUrl}/courses/patent-agent`,
          },
        },
      ],
    },
  };

  validateSchema(schema as Record<string, unknown>, "organizationSchema");
  return schema;
}

export function websiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "XYZ Law Coaching",
    description: "Tamil Nadu judiciary and law exam coaching",
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/blog?search={query}`,
      },
      "query-input": "required name=query",
    },
  };

  validateSchema(schema as Record<string, unknown>, "websiteSchema");
  return schema;
}

export function courseSchema({
  name,
  description,
  url,
  provider = "XYZ Law Coaching",
  mode = ["online", "onsite"],
  inLanguage = ["en", "ta"],
}: {
  name: string;
  description: string;
  url: string;
  provider?: string;
  mode?: string[];
  inLanguage?: string[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    url,
    inLanguage,
    provider: {
      "@type": "EducationalOrganization",
      name: provider,
      "@id": `${siteUrl}/#organization`,
    },
    hasCourseInstance: mode.map((m) => ({
      "@type": "CourseInstance",
      courseMode: m,
      inLanguage,
      ...(m === "onsite"
        ? {
            location: {
              "@type": "Place",
              name: "XYZ Law Coaching Centre",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Chennai",
                addressRegion: "Tamil Nadu",
                addressCountry: "IN",
              },
            },
          }
        : {}),
    })),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      url: `${siteUrl}/demo-class`,
    },
  };

  validateSchema(schema as Record<string, unknown>, `courseSchema:${name}`);
  return schema;
}

export function breadcrumbSchema(
  items: { name: string; href: string }[]
) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href.startsWith("http")
        ? item.href
        : `${siteUrl}${item.href}`,
    })),
  };

  validateSchema(schema as Record<string, unknown>, "breadcrumbSchema");
  return schema;
}

export function faqSchema(
  faqs: { question: string; answer: string }[]
) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  validateSchema(schema as Record<string, unknown>, "faqSchema");
  return schema;
}

export function articleSchema({
  title,
  description,
  url,
  imageUrl,
  publishedAt,
  authorName,
  authorUrl,
}: {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  publishedAt?: string;
  authorName?: string;
  authorUrl?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished: publishedAt,
    dateModified: publishedAt,
    image: imageUrl
      ? [
          {
            "@type": "ImageObject",
            url: imageUrl,
            width: 1200,
            height: 630,
          },
        ]
      : undefined,
    author: {
      "@type": "Person",
      name: authorName || "XYZ Law Coaching",
      url: authorUrl || siteUrl,
    },
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  validateSchema(schema as Record<string, unknown>, `articleSchema:${title}`);
  return schema;
}

export function localBusinessSchema({
  phone,
  email,
  address,
  mapUrl,
}: {
  phone: string;
  email: string;
  address: string;
  mapUrl?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EducationalOrganization"],
    "@id": `${siteUrl}/#organization`,
    name: "XYZ Law Coaching",
    url: siteUrl,
    telephone: phone,
    email,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      postalCode: "600001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "13.0843",
      longitude: "80.2705",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "17:00",
      },
    ],
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Online Transfer",
    areaServed: {
      "@type": "State",
      name: "Tamil Nadu",
    },
    hasMap: mapUrl,
    sameAs: [
      SITE_CONFIG.social.youtube,
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.facebook,
    ].filter(Boolean),
  };

  validateSchema(schema as Record<string, unknown>, "localBusinessSchema");
  return schema;
}

export function personSchema({
  name,
  jobTitle,
  description,
  url,
  imageUrl,
  knowsAbout,
}: {
  name: string;
  jobTitle: string;
  description?: string;
  url: string;
  imageUrl?: string;
  knowsAbout?: string[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    description,
    url,
    image: imageUrl,
    worksFor: {
      "@id": `${siteUrl}/#organization`,
    },
    knowsAbout: knowsAbout || [
      "Civil Judge Exam Coaching",
      "TNPSC Tamil Nadu Judicial Service",
      "APP Exam Coaching",
      "Indian Law",
      "Legal Education",
    ],
    address: {
      "@type": "PostalAddress",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
  };

  validateSchema(schema as Record<string, unknown>, `personSchema:${name}`);
  return schema;
}
