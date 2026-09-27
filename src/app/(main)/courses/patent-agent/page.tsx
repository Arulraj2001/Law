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
  title: "Patent Agent Exam Coaching India | CGPDTM Preparation",
  description:
    "XYZ offers expert Patent Agent exam coaching covering the Patent Act, Rules, IP law fundamentals and patent drafting. Online classes. Expert faculty.",
  keywords: [
    "patent agent exam coaching",
    "patent agent exam preparation India",
    "CGPDTM patent agent coaching",
    "how to become a patent agent India",
    "patent agent exam coaching Tamil Nadu",
  ],
  path: "/courses/patent-agent",
});

export default function PatentAgentPage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url || "https://yourdomain.com";

  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Patent Agent Exam", href: "/courses/patent-agent" },
  ];

  const highlights = [
    "Patents Act 1970 & Rules 2003 — complete",
    "Patent prosecution procedures",
    "Patent drafting — claims & specifications",
    "International patent law (PCT, TRIPS)",
    "Previous year questions analysis",
    "Mock tests — exam pattern based",
    "Online classes — pan India access",
    "Recorded lectures for revision",
    "Expert IP law faculty",
    "WhatsApp study group support",
  ];

  const stages = [
    {
      name: "Paper 1: Patent Law & Practice",
      description: "Multiple choice + descriptive",
      marks: 100,
      duration: "3 hours",
      details: [
        "Patent Act, 1970 and Patent Rules, 2003",
        "International patent law (PCT)",
        "Patent office procedures",
        "Opposition and revocation",
        "Patent prosecution practice",
      ],
    },
    {
      name: "Paper 2: Patent Drafting",
      description: "Practical drafting paper",
      marks: 100,
      duration: "3 hours",
      details: [
        "Drafting patent claims",
        "Writing complete patent specifications",
        "Provisional and complete applications",
        "Abstract and description writing",
        "Response to examination reports",
      ],
    },
  ];

  const syllabus = [
    {
      stage: "Patent Act & Rules",
      tabLabel: "Act & Rules",
      topics: [
        "Patents Act, 1970 — all sections",
        "Patent Rules, 2003 — complete",
        "Definition and types of patents",
        "Patentability requirements",
        "Novelty, inventive step, industrial application",
        "Non-patentable inventions (Section 3)",
        "Patent term and renewal",
      ],
    },
    {
      stage: "Patent Prosecution",
      tabLabel: "Prosecution",
      topics: [
        "Filing patent applications",
        "Examination process",
        "Request for examination",
        "First Examination Report (FER) response",
        "Grant and publication procedures",
        "Pre-grant and post-grant opposition",
        "Revocation proceedings",
      ],
    },
    {
      stage: "International Patent Law",
      tabLabel: "International Law",
      topics: [
        "Patent Cooperation Treaty (PCT)",
        "International filing under PCT",
        "National phase entry in India",
        "Paris Convention basics",
        "TRIPS Agreement — patent provisions",
      ],
    },
    {
      stage: "Patent Drafting",
      tabLabel: "Drafting Practice",
      topics: [
        "Structure of a patent specification",
        "Drafting independent claims",
        "Drafting dependent claims",
        "Writing detailed descriptions",
        "Drafting abstracts",
        "Practice with real patent examples",
      ],
    },
  ];

  const features = [
    {
      icon: "file-text",
      title: "Patents Act — Complete Coverage",
      description:
        "All sections of the Patents Act, 1970 and Patent Rules, 2003 covered systematically with emphasis on exam-relevant provisions.",
    },
    {
      icon: "pen-tool",
      title: "Patent Drafting Practice",
      description:
        "Hands-on patent claim drafting sessions. Practice writing specifications, claims, and abstracts for real-world patent scenarios.",
    },
    {
      icon: "globe",
      title: "International IP Law",
      description:
        "PCT procedure, Paris Convention, and TRIPS agreement provisions — key international frameworks tested in the exam.",
    },
    {
      icon: "clipboard-list",
      title: "Previous Year Questions",
      description:
        "Comprehensive analysis of past Patent Agent exam papers with model answers and exam strategy for both papers.",
    },
    {
      icon: "monitor",
      title: "Online Classes — Pan India",
      description:
        "Live online sessions accessible from anywhere in India. Recorded lectures for revision. WhatsApp study group support.",
    },
    {
      icon: "user-check",
      title: "Expert IP Faculty",
      description:
        "Faculty with IP law specialisation and patent agent examination experience guiding every session.",
    },
  ];

  const faqs = [
    {
      question: "Who is eligible to appear for the Patent Agent exam?",
      answer:
        "Any person who is a citizen of India and holds a degree in science, engineering or technology from a recognised university, OR holds an LLB degree, is eligible to register as a patent agent after clearing the Patent Agent examination.",
    },
    {
      question: "What is the Patent Agent exam pattern?",
      answer:
        "The exam has two papers: Paper 1 covers Patent Law and Practice (100 marks, 3 hours) and Paper 2 covers Patent Drafting (100 marks, 3 hours). Both are conducted by CGPDTM, Government of India. Both papers must be cleared separately.",
    },
    {
      question: "Is XYZ Patent Agent coaching available online?",
      answer:
        "Yes. XYZ offers complete online Patent Agent exam coaching with live classes, recorded lectures, study notes and WhatsApp mentorship — accessible from anywhere in India.",
    },
    {
      question:
        "What career opportunities exist after clearing the Patent Agent exam?",
      answer:
        "A registered patent agent can practice before the Indian Patent Office, file patent applications on behalf of inventors, advise on patentability, and work in IP law firms, technology companies, or as an independent IP consultant.",
    },
  ];

  const relatedCourses = [
    {
      title: "Trademark Agent Exam Coaching",
      slug: "trademark-agent",
      badge: "IP Specialisation",
      description:
        "Complete Trade Marks Registry Agent preparation covering Trade Marks Act, filing, opposition, and registration.",
    },
    {
      title: "Civil Judge Exam Coaching",
      slug: "civil-judge",
      badge: "Primary Focus",
      description:
        "Comprehensive Prelims, Mains & Viva preparation for Tamil Nadu judicial service aspirants.",
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
    name: "Patent Agent Exam Coaching",
    description:
      "Comprehensive preparation for the CGPDTM Patent Agent Examination — Patent Act, Rules, IP law fundamentals, patent drafting and prosecution.",
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
        name: "Patent Agent Exam",
        item: `${siteUrl}/courses/patent-agent`,
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

      <CourseStickySidebar courseTitle="Patent Agent Exam" />

      <CourseHero
        title="Patent Agent Exam Coaching"
        subtitle="Comprehensive preparation for the CGPDTM Patent Agent Examination — Patent Act, Rules, IP law fundamentals, patent drafting and prosecution. Online classes available across India."
        badge="CGPDTM Patent Agent Exam · 60% Focus"
        badgeColor="emerald"
        highlights={[
          "Patent Act & Rules — complete",
          "IP law fundamentals",
          "Patent drafting practice",
          "Online classes — pan India",
        ]}
        duration="4–6 Months"
        mode="Live Online Classes"
        fee="Contact for fee details"
        courseSlug="patent-agent"
        breadcrumb={breadcrumb}
      />

      <CourseHighlights
        highlights={highlights}
        courseTitle="Patent Agent Exam"
      />

      <ExamPatternSection
        examName="CGPDTM Patent Agent Exam Pattern"
        stages={stages}
        totalMarks={200}
        meritNote="Both papers must be cleared separately. Conducted by Office of the Controller General of Patents, Designs & Trade Marks (CGPDTM), Government of India."
        eligibilityTitle="Eligibility for Patent Agent Exam"
        eligibility={[
          { label: "Degree", value: "Science / Engg / Tech / LLB", icon: "🎓" },
          { label: "Authority", value: "CGPDTM, Govt of India", icon: "🏛" },
          { label: "Papers", value: "Paper 1 (100) + Paper 2 (100)", icon: "📑" },
          { label: "Mode", value: "Pan-India Online", icon: "🌐" },
        ]}
      />

      <SyllabusSection courseTitle="Patent Agent Exam" syllabus={syllabus} />

      <CourseFeatures features={features} courseTitle="Patent Agent Exam" />

      {/* No ToppersSection rendered as specified */}

      <CourseFAQ faqs={faqs} courseTitle="Patent Agent Exam" />

      {/* Related Courses Strip */}
      <RelatedCourses
        relatedCourses={relatedCourses}
        facultyHref="/faculty"
        resultsHref="/results"
        demoHref="/demo-class"
      />

      <CourseEnrollCTA
        courseTitle="Patent Agent Exam"
        courseSlug="patent-agent"
        defaultCourseName="Patent Agent Exam"
        subText="Launch your career as a registered Patent Agent in India. Attend a free demo class and start your guided preparation today."
      />
    </>
  );
}
