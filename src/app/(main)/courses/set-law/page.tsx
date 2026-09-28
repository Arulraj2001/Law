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
import { getCourseFullData } from "@/lib/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const course = await getCourseFullData("set-law");

  return generatePageMetadata({
    title:
      course?.seoTitle ||
      "SET Law Coaching Tamil Nadu | TNSET Law Exam Prep",
    description:
      course?.seoDescription ||
      "XYZ offers SET Law coaching for Tamil Nadu SET and other state SET exams. For law graduates targeting assistant professor eligibility. Online classes. Expert faculty.",
    keywords: course?.subjects || [
      "SET law coaching Tamil Nadu",
      "TNSET law exam preparation",
      "SET law coaching Chennai",
      "state eligibility test law coaching",
      "SET exam law preparation online",
    ],
    path: "/courses/set-law",
  });
}

export const revalidate = 3600;

export default async function SETLawPage() {
  const course = await getCourseFullData("set-law");
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url || "https://yourdomain.com";

  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "SET Law", href: "/courses/set-law" },
  ];

  const highlights = [
    "Tamil Nadu SET pattern — complete prep",
    "Paper I — General aptitude & teaching",
    "Paper II — all law subjects",
    "Tamil Nadu specific legislation covered",
    "Madras High Court key judgments",
    "BNS, BNSS & BSA covered",
    "Previous year question bank",
    "Mock tests — TNSET pattern",
    "Online classes available",
    "Multi-state SET exam preparation",
  ];

  const stages = [
    {
      name: "Paper I: General Aptitude",
      description: "General awareness paper",
      marks: 100,
      duration: "1 hour",
      details: [
        "50 questions — general aptitude",
        "Teaching methodology",
        "Research aptitude",
        "Reasoning and comprehension",
        "General awareness",
        "ICT basics",
      ],
    },
    {
      name: "Paper II: Law",
      description: "Subject-specific law paper",
      marks: 200,
      duration: "2 hours",
      details: [
        "100 questions from law subjects",
        "Constitutional law focus",
        "All core law subjects",
        "Tamil Nadu specific law provisions",
        "Current legal developments",
      ],
    },
  ];

  const syllabus = [
    {
      stage: "Paper I — General Paper",
      tabLabel: "Paper I: General",
      topics: [
        "Teaching aptitude and methodology",
        "Research methods and ethics",
        "Logical reasoning",
        "Reading comprehension",
        "General awareness — Tamil Nadu focus",
        "ICT and education technology",
      ],
    },
    {
      stage: "Paper II — Constitutional Law",
      tabLabel: "Paper II: Constitution",
      topics: [
        "Constitution of India",
        "Fundamental Rights and Directive Principles",
        "Federal structure and Centre-State relations",
        "Tamil Nadu in the constitutional framework",
        "Constitutional amendments",
        "Judicial review",
      ],
    },
    {
      stage: "Paper II — Core Law",
      tabLabel: "Paper II: Core Law",
      topics: [
        "Jurisprudence",
        "Indian Contract Act",
        "Transfer of Property Act",
        "BNS / IPC",
        "BNSS / CrPC",
        "BSA / Indian Evidence Act",
        "Family Law — Hindu and Muslim",
        "Law of Torts",
        "Administrative Law",
      ],
    },
    {
      stage: "Tamil Nadu Specific Laws",
      tabLabel: "TN Specific Laws",
      topics: [
        "Tamil Nadu Rent Control Act",
        "Tamil Nadu Panchayats Act",
        "Tamil Nadu Shops and Establishments Act",
        "Tamil Nadu specific court procedures",
        "Key Madras High Court judgments",
        "Tamil Nadu government schemes (legal aspects)",
      ],
    },
  ];

  const features = [
    {
      icon: "book-open",
      title: "TNSET Pattern Coverage",
      description:
        "Complete preparation specifically for Tamil Nadu SET pattern including Tamil Nadu-specific law provisions not in national tests.",
    },
    {
      icon: "map-pin",
      title: "Tamil Nadu Law Focus",
      description:
        "Tamil Nadu specific legislation, Madras High Court judgments, and state-specific legal provisions — unique to TNSET preparation.",
    },
    {
      icon: "clipboard-list",
      title: "Previous Year Questions",
      description:
        "Analysis of past TNSET Law papers with model answers and targeted exam strategy.",
    },
    {
      icon: "refresh-cw",
      title: "New Criminal Laws Covered",
      description:
        "BNS, BNSS and BSA fully integrated into the criminal law portion — updated for current exam requirements.",
    },
    {
      icon: "monitor",
      title: "Online Classes Available",
      description:
        "Live online coaching sessions with recorded lectures for revision and WhatsApp group support.",
    },
    {
      icon: "users",
      title: "Multi-State SET Preparation",
      description:
        "Covers Tamil Nadu SET and can be adapted for other state SET exams with similar law syllabus patterns.",
    },
  ];

  const faqs = [
    {
      question: "What is TNSET and how is it different from UGC-NET?",
      answer:
        "TNSET (Tamil Nadu State Eligibility Test) is conducted by the Tamil Nadu government and qualifies candidates for assistant professor positions specifically in Tamil Nadu colleges. UGC-NET is national and qualifies for colleges across India. Both have similar patterns but TNSET includes Tamil Nadu-specific content.",
    },
    {
      question: "What qualification is needed for TNSET Law?",
      answer:
        "You must have a postgraduate degree (LLM) with minimum 55% marks (50% for reserved categories) OR an LLB with equivalent qualifications as per TNSET notification. Check the latest official TNSET notification for current criteria.",
    },
    {
      question: "Can I prepare for both UGC-NET and TNSET simultaneously?",
      answer:
        "Yes. The syllabus of UGC-NET Law and TNSET Law overlaps significantly. The main difference is that TNSET includes Tamil Nadu-specific legal provisions. XYZ's coaching covers both with targeted sessions for Tamil Nadu content.",
    },
    {
      question: "Does XYZ offer online SET Law coaching?",
      answer:
        "Yes. Complete online coaching is available for SET Law — live classes, recorded lectures, previous year questions, mock tests and WhatsApp mentorship. Accessible from anywhere in India.",
    },
  ];

  const relatedCourses = [
    {
      title: "UGC-NET Law Coaching",
      slug: "ugc-net-law",
      badge: "NET · JRF",
      description:
        "Complete preparation for Paper I & II with teaching aptitude, research aptitude, and JRF focused guidance.",
    },
    {
      title: "Civil Judge Exam Coaching",
      slug: "civil-judge",
      badge: "Judiciary",
      description:
        "Tamil Nadu judicial service examination preparation for Prelims, Mains, and Viva-Voce.",
    },
    {
      title: "APP Exam Coaching",
      slug: "app-exam",
      badge: "Prosecution",
      description:
        "TNPSC Assistant Public Prosecutor preparation covering criminal law, GS, and interview.",
    },
  ];

  const courseData = {
    title: course?.title || "SET Law Coaching — Tamil Nadu",
    subtitle:
      course?.shortDescription ||
      "Complete preparation for the Tamil Nadu State Eligibility Test (TNSET) in Law and other state SET exams. Achieve assistant professor eligibility in Tamil Nadu law colleges. Online classes available.",
    badge: course?.badge || "SET Law",
    badgeColor: (course?.badgeColor as "navy" | "emerald" | "gold") || "gold",
    duration: course?.duration || "4–6 Months",
    mode: course?.mode || "Live Online Classes",
    fee: course?.fee || "Contact for fee details",
    feeNote: course?.feeNote || "",
    highlights: course?.highlights?.length ? course.highlights : highlights,
    syllabus: course?.syllabus?.length ? course.syllabus : syllabus,
    faqs: course?.faqs?.length ? course.faqs : faqs,
    seoTitle:
      course?.seoTitle ||
      "SET Law Coaching Tamil Nadu | TNSET Law Exam Prep",
    seoDescription:
      course?.seoDescription ||
      "XYZ offers SET Law coaching for Tamil Nadu SET and other state SET exams. For law graduates targeting assistant professor eligibility. Online classes. Expert faculty.",
  };

  // Schemas
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: courseData.title,
    description: courseData.subtitle,
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
        name: "Tamil Nadu, India",
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
        name: courseData.title,
        item: `${siteUrl}/courses/set-law`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: courseData.faqs.map((f: { question: string; answer: string }) => ({
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

      <CourseStickySidebar courseTitle={courseData.title} />

      <CourseHero
        title={courseData.title}
        subtitle={courseData.subtitle}
        badge={courseData.badge}
        badgeColor={courseData.badgeColor}
        highlights={courseData.highlights.slice(0, 4)}
        duration={courseData.duration}
        mode={courseData.mode}
        fee={courseData.fee}
        feeNote={courseData.feeNote}
        courseSlug="set-law"
        breadcrumb={breadcrumb}
      />

      <CourseHighlights
        highlights={courseData.highlights}
        courseTitle={courseData.title}
      />

      <ExamPatternSection
        examName="Tamil Nadu SET Law Exam Pattern"
        stages={stages}
        totalMarks={300}
        meritNote="TNSET is conducted by the Tamil Nadu government for assistant professor eligibility in Tamil Nadu colleges. Pattern is similar to UGC-NET but with Tamil Nadu-specific content. Check TNSET official notification for current exam dates."
        eligibilityTitle="Eligibility for TNSET Law"
        eligibility={[
          { label: "Degree", value: "LLM or LLB with 55%", icon: "🎓" },
          { label: "Conducted By", value: "Govt of Tamil Nadu", icon: "🏛" },
          { label: "Qualifies", value: "TN Assistant Professor", icon: "⭐" },
          { label: "Mode", value: "Online Batches", icon: "🌐" },
        ]}
      />

      <SyllabusSection courseTitle={courseData.title} syllabus={courseData.syllabus} />

      <CourseFeatures features={features} courseTitle={courseData.title} />

      {/* No ToppersSection rendered as specified */}

      <CourseFAQ faqs={courseData.faqs} courseTitle={courseData.title} />

      {/* Related Courses Strip */}
      <RelatedCourses
        relatedCourses={relatedCourses}
        facultyHref="/faculty"
        resultsHref="/results"
        demoHref="/demo-class"
      />

      <CourseEnrollCTA
        courseTitle={courseData.title}
        courseSlug="set-law"
        defaultCourseName={courseData.title}
        subText="Qualify for assistant professor positions in Tamil Nadu law colleges. Attend a free demo session to understand our Tamil Nadu focused curriculum."
      />
    </>
  );
}
