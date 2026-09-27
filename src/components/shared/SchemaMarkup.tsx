import { SITE_CONFIG, COURSES, FAQS } from "@/lib/constants";

export interface SchemaMarkupProps {
  type:
    | "home"
    | "course"
    | "blog"
    | "faq"
    | "contact"
    | "Organization"
    | "Course"
    | "FAQ";
  data?: Record<string, any>;
}

export function SchemaMarkup({
  type,
  data = {},
}: SchemaMarkupProps) {
  const normalizedType = type.toLowerCase();
  const schemas: Record<string, any>[] = [];

  const siteUrl = data.url || SITE_CONFIG.url || "https://yourdomain.com";
  const siteName = data.siteName || SITE_CONFIG.name;
  const description = data.description || SITE_CONFIG.description;
  const phone = data.phone || SITE_CONFIG.phone;
  const email = data.email || SITE_CONFIG.email;
  const address = data.address || SITE_CONFIG.address;

  // 1. Home / Organization Schema
  if (normalizedType === "home" || normalizedType === "organization") {
    // Educational Organization
    schemas.push({
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: siteName,
      description,
      url: siteUrl,
      telephone: phone,
      email,
      address: {
        "@type": "PostalAddress",
        streetAddress: address,
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      foundingDate: data.establishedYear || SITE_CONFIG.established,
      areaServed: "Tamil Nadu",
      sameAs: [
        SITE_CONFIG.social.youtube,
        SITE_CONFIG.social.instagram,
        SITE_CONFIG.social.facebook,
        SITE_CONFIG.social.whatsappChannel,
      ].filter(Boolean),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Law Coaching Courses",
        itemListElement: (data.courses || COURSES).map((course: any) => ({
          "@type": "Course",
          name: course.title,
          url: `${siteUrl}${course.href || `/courses/${course.slug}`}`,
        })),
      },
    });

    // WebSite with SearchAction
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/blog?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    });

    // BreadcrumbList for Home
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
      ],
    });
  }

  // 2. Course Schema
  else if (normalizedType === "course") {
    const courseTitle = data.title || "Law Coaching Course";
    const courseUrl = data.url || `${siteUrl}/courses/${data.slug || ""}`;

    schemas.push({
      "@context": "https://schema.org",
      "@type": "Course",
      name: courseTitle,
      description: data.description || description,
      url: courseUrl,
      provider: {
        "@type": "EducationalOrganization",
        name: siteName,
        url: siteUrl,
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: data.mode || "Online + Offline",
        duration: data.duration,
      },
    });

    // BreadcrumbList: Home > Courses > [Course Name]
    schemas.push({
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
          name: "Courses",
          item: `${siteUrl}#courses`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: courseTitle,
          item: courseUrl,
        },
      ],
    });

    // FAQPage if course faqs exist
    if (data.faqs && Array.isArray(data.faqs) && data.faqs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: data.faqs.map((faq: any) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      });
    }
  }

  // 3. Blog Schema
  else if (normalizedType === "blog") {
    const postTitle = data.title || "Legal Exam Article";
    const postUrl = data.url || `${siteUrl}/blog/${data.slug || ""}`;

    schemas.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: postTitle,
      description: data.excerpt || description,
      image: data.coverImage ? [data.coverImage] : undefined,
      datePublished: data.publishedAt || new Date().toISOString(),
      dateModified: data.updatedAt || data.publishedAt,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": postUrl,
      },
      author: {
        "@type": "Person",
        name: data.authorName || "XYZ Law Faculty",
      },
      publisher: {
        "@type": "EducationalOrganization",
        name: siteName,
        url: siteUrl,
      },
    });

    // BreadcrumbList: Home > Blog > [Post Title]
    schemas.push({
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
          name: "Blog",
          item: `${siteUrl}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: postTitle,
          item: postUrl,
        },
      ],
    });
  }

  // 4. FAQ Schema
  else if (normalizedType === "faq") {
    const faqList = data.faqs || FAQS;
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqList.map((faq: any) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  // 5. Contact Schema
  else if (normalizedType === "contact") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: siteName,
      url: siteUrl,
      telephone: phone,
      email,
      address: {
        "@type": "PostalAddress",
        streetAddress: address,
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: data.latitude || 13.0827,
        longitude: data.longitude || 80.2707,
      },
      hasMap: SITE_CONFIG.mapUrl,
    });
  }

  if (schemas.length === 0) return null;

  return (
    <>
      {schemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export default SchemaMarkup;
