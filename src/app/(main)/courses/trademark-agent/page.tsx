import type { Metadata } from "next";
import { CourseHero } from "@/components/courses/CourseHero";
import { CourseHighlights } from "@/components/courses/CourseHighlights";
import { ExamPatternSection } from "@/components/courses/ExamPatternSection";
import { SyllabusSection } from "@/components/courses/SyllabusSection";
import { CourseFeatures } from "@/components/courses/CourseFeatures";
import { CourseFAQ } from "@/components/courses/CourseFAQ";
import { CourseEnrollCTA } from "@/components/courses/CourseEnrollCTA";
import { CourseStickySidebar } from "@/components/courses/CourseStickySidebar";
import { RelatedCourses } from "@/components/courses/RelatedCourses";
import { SITE_CONFIG } from "@/lib/constants";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Trademark Agent Exam Coaching | Trade Marks Registry Prep",
  description:
    "XYZ offers expert Trademark Agent exam coaching covering the Trade Marks Act, TM filing procedures, opposition, registration and IP law. Online classes available.",
  keywords: [
    "trademark agent exam coaching",
    "trademark agent exam preparation India",
    "trade marks registry agent exam",
    "how to become a trademark agent India",
    "trademark agent coaching Tamil Nadu",
  ],
  path: "/courses/trademark-agent",
});

export default function TrademarkAgentPage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url || "https://yourdomain.com";

  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Trademark Agent Exam", href: "/courses/trademark-agent" },
  ];

  const highlights = [
    "Trade Marks Act 1999 & Rules 2017 — complete",
    "TM application filing procedures",
    "Goods and services classification (NICE)",
    "Opposition and cancellation proceedings",
    "Madrid Protocol — international TM filing",
    "Previous year questions analysis",
    "Online classes — pan India access",
    "Recorded lectures for revision",
    "Expert IP law faculty",
    "Practice with real TM application scenarios",
  ];

  const stages = [
    {
      name: "Paper 1: Trade Marks Law",
      description: "Law and practice paper",
      marks: 100,
      duration: "3 hours",
      details: [
        "Trade Marks Act, 1999 — complete",
        "Trade Marks Rules, 2017",
        "Absolute and relative grounds",
        "Registration procedures",
        "Opposition and cancellation",
      ],
    },
    {
      name: "Paper 2: Trade Mark Practice",
      description: "Practical application paper",
      marks: 100,
      duration: "3 hours",
      details: [
        "TM application drafting",
        "Goods and services classification",
        "Responding to examination reports",
        "Opposition proceedings",
        "International trademark filing (Madrid)",
      ],
    },
  ];

  const syllabus = [
    {
      stage: "Trade Marks Act & Rules",
      tabLabel: "Act & Rules",
      topics: [
        "Trade Marks Act, 1999 — all sections",
        "Trade Marks Rules, 2017 — complete",
        "Definition of trademark",
        "Types of trademarks",
        "Absolute grounds for refusal (Section 9)",
        "Relative grounds for refusal (Section 11)",
        "Well-known trademarks",
      ],
    },
    {
      stage: "Registration Procedure",
      tabLabel: "Registration",
      topics: [
        "Application filing procedure",
        "Classification of goods and services (NICE)",
        "Examination of trademark applications",
        "Publication in Trade Marks Journal",
        "Opposition proceedings",
        "Registration certificate",
        "Renewal of trademark",
      ],
    },
    {
      stage: "International TM Law",
      tabLabel: "Madrid Protocol",
      topics: [
        "Madrid Protocol for international filing",
        "Paris Convention — trademark provisions",
        "TRIPS Agreement — trademark provisions",
        "International registration procedure",
        "Territorial extension to India",
      ],
    },
    {
      stage: "Practice & Procedure",
      tabLabel: "Drafting & Practice",
      topics: [
        "Drafting trademark applications",
        "Responding to examination reports",
        "Filing opposition notices",
        "Cancellation and rectification proceedings",
        "Practice with real TM scenarios",
      ],
    },
  ];

  const features = [
    {
      icon: "registered",
      title: "Trade Marks Act — Full Coverage",
      description:
        "Complete coverage of Trade Marks Act 1999 and Rules 2017 with focus on exam-tested provisions and recent TM Registry updates.",
    },
    {
      icon: "file-text",
      title: "TM Application Drafting",
      description:
        "Practical sessions on drafting trademark applications, goods classification and responding to TM Registry examination reports.",
    },
    {
      icon: "globe",
      title: "Madrid Protocol Coverage",
      description:
        "International trademark filing via Madrid Protocol — procedure, fees, and national phase entry — tested in Paper 2.",
    },
    {
      icon: "clipboard-list",
      title: "Previous Year Questions",
      description:
        "Analysis of past Trademark Agent exam papers with model answers and targeted exam strategy for both papers.",
    },
    {
      icon: "monitor",
      title: "Online Classes — Pan India",
      description:
        "Live online sessions from anywhere in India. Recorded lectures for revision. Dedicated WhatsApp study group.",
    },
    {
      icon: "shield",
      title: "IP Law Integration",
      description:
        "Trade mark law taught in context of the broader Indian IP framework — patents, designs and copyright connections explained.",
    },
  ];

  const faqs = [
    {
      question: "Who can become a registered Trademark Agent in India?",
      answer:
        "Any person who is a citizen of India, holds an LLB degree or a degree in science, engineering or technology, and clears the Trade Marks Registry Agent examination can register as a Trademark Agent.",
    },
    {
      question: "What is the Trademark Agent exam pattern?",
      answer:
        "The exam has two papers: Paper 1 covers Trade Marks Law and Practice (100 marks, 3 hours) and Paper 2 covers practical Trademark application and procedure (100 marks, 3 hours). Both conducted by the Trade Marks Registry, Government of India.",
    },
    {
      question: "Is this course available online?",
      answer:
        "Yes. XYZ offers complete online coaching for the Trademark Agent exam accessible from anywhere in India — live classes, recorded lectures, study notes and WhatsApp support.",
    },
    {
      question:
        "What can I do after becoming a registered Trademark Agent?",
      answer:
        "A registered Trademark Agent can file trademark applications, represent clients before the Trade Marks Registry, advise on brand protection strategies, handle opposition and cancellation proceedings, and work in IP law firms or as an independent IP consultant.",
    },
  ];

  const relatedCourses = [
    {
      title: "Patent Agent Exam Coaching",
      slug: "patent-agent",
      badge: "IP Specialisation",
      description:
        "CGPDTM Patent Agent exam coaching covering Patent Act, rules, and drafting practice.",
    },
    {
      title: "Civil Judge Exam Coaching",
      slug: "civil-judge",
      badge: "Primary Focus",
      description:
        "Tamil Nadu judicial service exam preparation for Prelims, Mains, and Viva-Voce.",
    },
    {
      title: "APP Exam Coaching",
      slug: "app-exam",
      badge: "Primary Focus",
      description:
        "TNPSC Assistant Public Prosecutor preparation covering criminal law, GS, and interview.",
    },
  ];

  // Schemas
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Trademark Agent Exam Coaching",
    description:
      "Complete preparation for the Trade Marks Registry Agent examination — Trade Marks Act, filing procedures, opposition, registration and international trademark law.",
    provider: {
      "@type": "EducationalOrganization",
      name: SITE_CONFIG.name || "XYZ Law Coaching",
      sameAs: siteUrl,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: ["online"],
      location: {
        "@type": "Place",
        name: "India",
      },
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
        name: "Courses",
        item: `${siteUrl}/courses`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Trademark Agent Exam",
        item: `${siteUrl}/courses/trademark-agent`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <CourseStickySidebar courseTitle="Trademark Agent Exam" />

      <CourseHero
        title="Trademark Agent Exam Coaching"
        subtitle="Complete preparation for the Trade Marks Registry Agent examination — Trade Marks Act, filing procedures, opposition, registration and international trademark law. Online classes. Expert IP faculty."
        badge="Trade Marks Registry · 60% Focus"
        badgeColor="emerald"
        highlights={[
          "Trade Marks Act — complete",
          "TM filing & prosecution",
          "Opposition & registration",
          "Online classes — pan India",
        ]}
        duration="3–4 Months"
        mode="Live Online Classes"
        fee="Contact for fee details"
        courseSlug="trademark-agent"
        breadcrumb={breadcrumb}
      />

      <CourseHighlights
        highlights={highlights}
        courseTitle="Trademark Agent Exam"
      />

      <ExamPatternSection
        examName="Trade Marks Registry Agent Exam Pattern"
        stages={stages}
        totalMarks={200}
        meritNote="Conducted by the Trade Marks Registry, Government of India. Both papers must be cleared. Registration as a Trade Mark Agent follows successful completion."
        eligibilityTitle="Eligibility for Trademark Agent Exam"
        eligibility={[
          { label: "Degree", value: "LLB / Science / Engg / Tech", icon: "🎓" },
          { label: "Authority", value: "Trade Marks Registry (CGPDTM)", icon: "🏛" },
          { label: "Papers", value: "Paper 1 (100) + Paper 2 (100)", icon: "📑" },
          { label: "Mode", value: "Pan-India Online", icon: "🌐" },
        ]}
      />

      <SyllabusSection
        courseTitle="Trademark Agent Exam"
        syllabus={syllabus}
      />

      <CourseFeatures
        features={features}
        courseTitle="Trademark Agent Exam"
      />

      {/* No ToppersSection rendered as specified */}

      <CourseFAQ
        faqs={faqs}
        courseTitle="Trademark Agent Exam"
      />

      {/* Related Courses Strip */}
      <RelatedCourses
        relatedCourses={relatedCourses}
        facultyHref="/faculty"
        resultsHref="/results"
        demoHref="/demo-class"
      />

      <CourseEnrollCTA
        courseTitle="Trademark Agent Exam"
        courseSlug="trademark-agent"
        defaultCourseName="Trademark Agent Exam"
        subText="Become a certified Trade Mark Agent and practice before the Trade Marks Registry. Attend a free demo class to get started."
      />
    </>
  );
}
