import type { Metadata } from "next";
import Link from "next/link";
import { CourseHero } from "@/components/courses/CourseHero";
import { CourseHighlights } from "@/components/courses/CourseHighlights";
import { ExamPatternSection } from "@/components/courses/ExamPatternSection";
import { SyllabusSection } from "@/components/courses/SyllabusSection";
import { CourseFeatures } from "@/components/courses/CourseFeatures";
import { CourseToppersSection } from "@/components/courses/CourseToppersSection";
import { CourseFAQ } from "@/components/courses/CourseFAQ";
import { CourseEnrollCTA } from "@/components/courses/CourseEnrollCTA";
import { CourseStickySidebar } from "@/components/courses/CourseStickySidebar";
import { SITE_CONFIG } from "@/lib/constants";
import { generatePageMetadata } from "@/lib/seo/metadata";

import { getCourseFullData } from "@/lib/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const course = await getCourseFullData("civil-judge");

  return generatePageMetadata({
    title:
      course?.seoTitle ||
      "Civil Judge Exam Coaching in Tamil Nadu | TNPSC Civil Judge Coaching",
    description:
      course?.seoDescription ||
      "XYZ offers the most comprehensive TNPSC Civil Judge exam coaching in Tamil Nadu. Prelims + Mains + Viva preparation, BNS/BNSS/BSA coverage, weekly mock tests, translation classes. 25+ students selected. Online & offline.",
    keywords: course?.subjects || [
      "civil judge coaching Tamil Nadu",
      "TNPSC civil judge coaching",
      "civil judge exam preparation Tamil Nadu",
      "Tamil Nadu judicial service coaching",
      "civil judge coaching Chennai",
      "judiciary coaching Tamil Nadu 2026",
    ],
    path: "/courses/civil-judge",
  });
}

export const revalidate = 3600;

export default async function CivilJudgeCoursePage() {
  const course = await getCourseFullData("civil-judge");
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url || "https://yourdomain.com";

  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Civil Judge Exam Coaching", href: "/courses/civil-judge" },
  ];

  const highlights = [
    "Complete coverage of Preliminary, Main Examination, and Viva-Voce stages",
    "Exclusive Tamil-to-English and English-to-Tamil legal translation classes",
    "In-depth analysis of BNS, BNSS, and BSA (new criminal laws effective July 2024)",
    "Rigorous weekly MCQ tests matching latest TNPSC negative marking pattern",
    "Judgment writing, framing of issues, and drafting of pleadings practice",
    "Personalized 1-on-1 mentorship with comprehensive answer evaluation",
    "Bilingual classes and handwritten updated study material",
    "Flexible learning options: live interactive online batches and offline classroom",
  ];

  const examStages = [
    {
      name: "Stage 1: Preliminary Exam",
      description: "Objective type MCQ paper",
      marks: 100,
      duration: "3 hours",
      details: [
        "100 multiple choice questions",
        "Civil Law: 50 questions",
        "Criminal Law (BNS/BNSS/BSA): 30 questions",
        "General Knowledge: 20 questions",
        "Negative marking: 0.25 per wrong answer",
        "Qualifying stage — marks not in final merit",
      ],
    },
    {
      name: "Stage 2: Mains Exam",
      description: "Descriptive/narrative papers",
      marks: 400,
      duration: "Multiple sessions",
      details: [
        "Paper I: Translation (Tamil to English) — 100 marks",
        "Paper II: CPC, BNSS/CrPC, BSA/Evidence, Constitution — 100 marks",
        "Paper III: BNS/IPC, Transfer of Property, Contract, Specific Relief — 100 marks",
        "Paper IV: Judgment writing, pleadings, framing of issues — 100 marks",
        "Descriptive answers required — answer writing practice essential",
      ],
    },
    {
      name: "Stage 3: Viva-Voce",
      description: "Oral interview by Madras HC panel",
      marks: 60,
      duration: "20–30 minutes",
      details: [
        "Minimum 18 marks required to qualify",
        "Tests judicial temperament and personality",
        "Legal reasoning and current affairs",
        "Communication in English and Tamil",
        "Final merit = Mains (400) + Viva (60) only",
      ],
    },
  ];

  const syllabus = [
    {
      stage: "Preliminary — Civil Law",
      tabLabel: "Prelims — Civil",
      topics: [
        "Code of Civil Procedure, 1908 (CPC)",
        "Indian Contract Act, 1872",
        "Transfer of Property Act, 1882",
        "Specific Relief Act, 1963",
        "Negotiable Instruments Act, 1881",
        "Constitution of India",
        "Tamil Nadu Rent Control Act",
        "Limitation Act, 1963",
      ],
    },
    {
      stage: "Preliminary — Criminal Law (New Laws)",
      tabLabel: "Prelims — Criminal",
      topics: [
        "Bharatiya Nyaya Sanhita, 2023 (BNS)",
        "Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)",
        "Bharatiya Sakshya Adhiniyam, 2023 (BSA)",
        "Important differences from IPC/CrPC/Evidence Act",
        "General Knowledge & Current Affairs",
      ],
    },
    {
      stage: "Mains — Paper I (Translation)",
      tabLabel: "Mains Paper I",
      topics: [
        "Tamil to English legal translation",
        "Legal terminology in Tamil and English",
        "Court document translation",
        "Judgment translation practice",
        "Past paper translation word list",
      ],
    },
    {
      stage: "Mains — Papers II & III (Law)",
      tabLabel: "Mains Papers II & III",
      topics: [
        "Code of Civil Procedure (CPC) — detailed",
        "BNSS (replaces CrPC) — complete",
        "BSA (replaces Evidence Act) — complete",
        "Constitution of India — Articles & cases",
        "BNS (replaces IPC) — all provisions",
        "Transfer of Property Act — deep dive",
        "Indian Contract Act — essentials",
        "Specific Relief Act — reliefs & remedies",
      ],
    },
    {
      stage: "Mains — Paper IV (Skills)",
      tabLabel: "Mains Paper IV",
      topics: [
        "Civil court judgment writing",
        "Criminal court judgment writing",
        "Framing of issues in civil cases",
        "Drafting of pleadings",
        "Order and decree writing",
        "Cross-examination techniques",
      ],
    },
    {
      stage: "Viva-Voce Preparation",
      tabLabel: "Viva Prep",
      topics: [
        "Judicial temperament and personality",
        "Current legal affairs (recent judgments)",
        "Questions on studied law subjects",
        "Communication skills in English & Tamil",
        "Mock viva sessions with faculty",
        "Interview do's and don'ts",
      ],
    },
  ];

  const features = [
    {
      icon: "language",
      title: "Exclusive Translation Classes",
      description:
        "Tamil-to-English legal translation sessions using actual TNPSC past paper words. No other institute offers this depth of translation prep.",
    },
    {
      icon: "clipboard-list",
      title: "Weekly Mock Tests",
      description:
        "TNPSC-pattern MCQ tests every week for Prelims. Descriptive tests for Mains every fortnight. Detailed answer analysis provided.",
    },
    {
      icon: "pen-tool",
      title: "Mains Answer Writing Practice",
      description:
        "Structured judgment writing sessions. Faculty reviews every answer and gives written feedback. Essential for Mains Paper IV.",
    },
    {
      icon: "refresh-cw",
      title: "Updated Study Material",
      description:
        "Handwritten notes updated every batch to include BNS, BNSS, BSA changes and latest TNPSC exam pattern. No outdated material.",
    },
    {
      icon: "user-check",
      title: "Personal 1-on-1 Mentorship",
      description:
        "Progress tracked individually. Weak areas identified from test scores. Personalised revision plan before exam. WhatsApp doubt clearing.",
    },
    {
      icon: "monitor",
      title: "Recorded Lectures",
      description:
        "All sessions recorded and shared with enrolled students for revision. Particularly useful for topics covered during holidays or missed sessions.",
    },
    {
      icon: "mic",
      title: "Interview Preparation",
      description:
        "Dedicated mock viva-voce sessions before the TNPSC interview. Covers judicial temperament, communication, and legal reasoning.",
    },
    {
      icon: "bell",
      title: "Exam Updates via WhatsApp",
      description:
        "Instant notification of TNPSC Civil Judge exam notifications, results, and admit card releases via WhatsApp group.",
    },
  ];

  const faqs = [
    {
      question: "What is the eligibility for the TNPSC Civil Judge exam?",
      answer:
        "You must hold an LLB degree from a recognised university obtained within 3 years of the notification date, with minimum 50% marks (45% for SC/ST/MBC/BC). Age limit is 25 to 42 years. You must also be proficient in both English and Tamil.",
    },
    {
      question: "Does XYZ cover the new BNS, BNSS, and BSA laws?",
      answer:
        "Yes, completely. From 1 July 2024, BNS replaced IPC, BNSS replaced CrPC, and BSA replaced the Indian Evidence Act. The TNPSC Civil Judge exam now tests all three new laws. XYZ covers them fully in every batch with updated notes and dedicated sessions.",
    },
    {
      question:
        "What does the Translation Paper cover and how does XYZ prepare for it?",
      answer:
        "The Translation Paper (100 marks in Mains) requires translating Tamil legal text to English. XYZ runs exclusive Tamil-to-English translation sessions using actual vocabulary from past TNPSC papers. This is the most unique offering at XYZ — no other coaching institute provides dedicated translation preparation at this depth.",
    },
    {
      question: "What is the fee for Civil Judge coaching at XYZ?",
      answer:
        "Please contact us directly on WhatsApp or call for current fee details and available batch dates. We offer both online and offline options with different fee structures.",
    },
    {
      question: "How long is the Civil Judge coaching programme?",
      answer:
        "The full Civil Judge coaching programme covers Prelims, Mains, and Viva-Voce. Duration depends on the batch and the student's starting level. Contact us to know the current batch duration and schedule.",
    },
    {
      question: "Does XYZ offer online coaching for the Civil Judge exam?",
      answer:
        "Yes. XYZ offers complete online coaching for the Civil Judge exam. Online students receive live classes, recorded lectures, weekly MCQ PDFs, handwritten study notes, and WhatsApp mentorship — the same quality as offline classes.",
    },
  ];

  const courseData = {
    title: course?.title || "Civil Judge Exam Coaching in Tamil Nadu",
    subtitle:
      course?.shortDescription ||
      "Complete preparation for the TNPSC Tamil Nadu Judicial Service Exam — Preliminary, Mains and Viva-Voce. Taught by a practicing advocate. 25+ students now serving as Civil Judges.",
    badge: course?.badge || "Judicial Service",
    badgeColor: (course?.badgeColor as "navy" | "emerald" | "gold") || "emerald",
    duration: course?.duration || "10–12 Months",
    mode: course?.mode || "Online + Offline Classes",
    fee: course?.fee || "Contact for fee details",
    feeNote: course?.feeNote || "",
    highlights: course?.highlights?.length ? course.highlights : highlights,
    syllabus: course?.syllabus?.length ? course.syllabus : syllabus,
    faqs: course?.faqs?.length ? course.faqs : faqs,
    seoTitle:
      course?.seoTitle ||
      "Civil Judge Exam Coaching in Tamil Nadu | TNPSC Civil Judge Coaching",
    seoDescription:
      course?.seoDescription ||
      "XYZ offers the most comprehensive TNPSC Civil Judge exam coaching in Tamil Nadu. Prelims + Mains + Viva preparation, BNS/BNSS/BSA coverage, weekly mock tests, translation classes. 25+ students selected. Online & offline.",
  };

  // 1. Course Schema
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
      courseMode: ["online", "onsite"],
      location: {
        "@type": "Place",
        name: "Tamil Nadu, India",
      },
    },
  };

  // 2. BreadcrumbList Schema
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
        item: `${siteUrl}/courses/civil-judge`,
      },
    ],
  };

  // 3. FAQPage Schema
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
      {/* JSON-LD Schemas */}
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

      {/* Desktop Sticky Quick Action Sidebar */}
      <CourseStickySidebar courseTitle={courseData.title} />

      {/* 1. Hero Section */}
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
        courseSlug="civil-judge"
        breadcrumb={breadcrumb}
      />

      {/* 2. Course Highlights */}
      <CourseHighlights
        highlights={courseData.highlights}
        courseTitle={courseData.title}
      />

      {/* 3. Exam Pattern Section */}
      <ExamPatternSection
        examName="TNPSC Civil Judge Exam Pattern"
        stages={examStages}
        totalMarks={560}
        meritNote="Final selection merit is calculated on Mains (400 marks) + Viva-Voce (60 marks) only. Preliminary marks are NOT counted."
      />

      {/* 4. Syllabus Section */}
      <SyllabusSection
        courseTitle="Civil Judge Exam"
        syllabus={courseData.syllabus}
      />

      {/* 5. Course Features */}
      <CourseFeatures
        features={features}
        courseTitle={courseData.title}
      />

      {/* 6. Course Toppers (Filtered) */}
      <CourseToppersSection
        heading="Civil Judge Selections from XYZ"
        courseKeyword="Civil Judge"
      />

      {/* 7. Course FAQ */}
      <CourseFAQ
        faqs={courseData.faqs}
        courseTitle={courseData.title}
      />

      {/* Internal Linking SEO Strip */}
      <div className="bg-slate-100/80 py-8 border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-3">
            Explore Related Programmes &amp; Guidance
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-slate-700">
            <Link
              href="/faculty"
              className="hover:text-navy-mid hover:underline"
            >
              Learn about our faculty &rarr;
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              href="/results"
              className="hover:text-navy-mid hover:underline"
            >
              See all results &rarr;
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              href="/courses/app-exam"
              className="hover:text-navy-mid hover:underline"
            >
              APP Exam Coaching &rarr;
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              href="/demo-class"
              className="hover:text-navy-mid hover:underline"
            >
              Free demo class &rarr;
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              href="/courses/patent-agent"
              className="hover:text-navy-mid hover:underline"
            >
              Patent Agent Exam &rarr;
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              href="/courses"
              className="hover:text-navy-mid hover:underline"
            >
              View all courses &rarr;
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              href="/contact"
              className="hover:text-navy-mid hover:underline"
            >
              Contact us &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* 8. Course Enroll CTA */}
      <CourseEnrollCTA
        courseTitle={courseData.title}
        courseSlug="civil-judge"
        defaultCourseName={courseData.title}
      />
    </>
  );
}
