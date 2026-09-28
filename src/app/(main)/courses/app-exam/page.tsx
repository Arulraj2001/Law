import type { Metadata } from "next";
import { CourseHero } from "@/components/courses/CourseHero";
import { CourseHighlights } from "@/components/courses/CourseHighlights";
import { ExamPatternSection } from "@/components/courses/ExamPatternSection";
import { SyllabusSection } from "@/components/courses/SyllabusSection";
import { CourseFeatures } from "@/components/courses/CourseFeatures";
import { CourseToppersSection } from "@/components/courses/CourseToppersSection";
import { CourseFAQ } from "@/components/courses/CourseFAQ";
import { CourseEnrollCTA } from "@/components/courses/CourseEnrollCTA";
import { CourseStickySidebar } from "@/components/courses/CourseStickySidebar";
import { RelatedCourses } from "@/components/courses/RelatedCourses";
import { SITE_CONFIG } from "@/lib/constants";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { getCourseFullData } from "@/lib/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const course = await getCourseFullData("app-exam");

  return generatePageMetadata({
    title:
      course?.seoTitle ||
      "APP Exam Coaching Tamil Nadu | TNPSC Assistant Public Prosecutor",
    description:
      course?.seoDescription ||
      "XYZ offers complete TNPSC APP Grade II exam coaching in Tamil Nadu. All 200 MCQs covered — Law, GS & Aptitude. BNS, BNSS & BSA included. Online & offline. Expert faculty.",
    keywords: course?.subjects || [
      "APP exam coaching Tamil Nadu",
      "TNPSC APP coaching",
      "assistant public prosecutor coaching Tamil Nadu",
      "APP grade 2 exam preparation",
      "APP exam coaching Chennai",
    ],
    path: "/courses/app-exam",
  });
}

export const revalidate = 3600;

export default async function APPExamPage() {
  const course = await getCourseFullData("app-exam");
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url || "https://yourdomain.com";

  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "APP Exam Coaching", href: "/courses/app-exam" },
  ];

  const highlights = [
    "All 200 Prelims MCQs covered",
    "Criminal law — BNS, BNSS, BSA in full",
    "GS + Aptitude + Mental Ability sections",
    "Mains descriptive answer writing practice",
    "Interview / oral test preparation",
    "Online + offline batches available",
    "Weekly mock tests — APP pattern",
    "WhatsApp MCQ practice PDFs",
    "Personal mentorship and doubt clearing",
    "Updated notes for every batch",
  ];

  const stages = [
    {
      name: "Stage 1: Preliminary Exam",
      description: "Objective type MCQ paper",
      marks: 200,
      duration: "3 hours",
      details: [
        "200 multiple choice questions total",
        "Law papers: 100 questions",
        "General Studies: 75 questions",
        "Aptitude & Mental Ability: 25 questions",
        "Negative marking applies",
        "Qualifying stage only",
      ],
    },
    {
      name: "Stage 2: Mains Exam",
      description: "Descriptive written papers",
      marks: 300,
      duration: "Multiple sessions",
      details: [
        "Paper I: Criminal Law (BNS/BNSS/BSA/IPC/CrPC) — 150 marks",
        "Paper II: Civil Law + GS — 150 marks",
        "Answer writing skills essential",
        "Legal reasoning and case analysis",
        "Current legal affairs expected",
      ],
    },
    {
      name: "Stage 3: Oral Interview",
      description: "Personality and aptitude test",
      marks: 60,
      duration: "20-30 minutes",
      details: [
        "Assesses suitability for prosecution work",
        "Criminal law knowledge tested",
        "Communication skills in English & Tamil",
        "Current affairs and general awareness",
        "Final merit = Mains + Interview",
      ],
    },
  ];

  const syllabus = [
    {
      stage: "Prelims — Law (100 Qs)",
      tabLabel: "Prelims — Law",
      topics: [
        "Bharatiya Nyaya Sanhita, 2023 (BNS)",
        "Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)",
        "Bharatiya Sakshya Adhiniyam, 2023 (BSA)",
        "Indian Penal Code (IPC) — transitional",
        "Code of Criminal Procedure — transitional",
        "Indian Evidence Act — transitional",
        "Constitution of India (fundamental rights)",
        "Juvenile Justice Act",
        "Protection of Children from Sexual Offences Act",
      ],
    },
    {
      stage: "Prelims — GS (75 Qs)",
      tabLabel: "Prelims — GS",
      topics: [
        "History of Tamil Nadu",
        "Geography of Tamil Nadu",
        "Tamil Nadu Polity and Governance",
        "Indian Economy basics",
        "Current Affairs — Tamil Nadu focus",
        "Science and Technology",
        "Environment and Ecology",
      ],
    },
    {
      stage: "Prelims — Aptitude (25 Qs)",
      tabLabel: "Prelims — Aptitude",
      topics: [
        "Logical Reasoning",
        "Quantitative Aptitude",
        "Mental Ability",
        "Data Interpretation",
        "English Comprehension",
      ],
    },
    {
      stage: "Mains — Criminal Law",
      tabLabel: "Mains — Criminal",
      topics: [
        "BNS — all 358 sections in detail",
        "BNSS — all 531 sections in detail",
        "BSA — all 170 sections in detail",
        "Differences between old and new laws",
        "Case laws and landmark judgments",
        "Prosecution procedures",
        "Bail, remand, and custody procedures",
      ],
    },
    {
      stage: "Mains — Civil Law + GS",
      tabLabel: "Mains — Civil & GS",
      topics: [
        "Code of Civil Procedure basics",
        "Constitution of India — detailed",
        "Tamil Nadu specific laws",
        "Current Legal Affairs",
        "Essay writing on legal topics",
        "Legal reasoning questions",
      ],
    },
    {
      stage: "Interview Preparation",
      tabLabel: "Interview Prep",
      topics: [
        "Criminal prosecution knowledge",
        "Current legal developments",
        "Communication skills practice",
        "Mock interview sessions",
        "GK and current affairs",
        "Body language and presentation",
      ],
    },
  ];

  const features = [
    {
      icon: "scale",
      title: "Criminal Law Deep-Dive",
      description:
        "Intensive coverage of BNS, BNSS and BSA — the three new criminal laws that replaced IPC, CrPC and Evidence Act from July 2024. Essential for APP exam.",
    },
    {
      icon: "clipboard-list",
      title: "200 MCQ Pattern Tests",
      description:
        "Weekly mock tests replicating the exact APP Prelims pattern — 100 Law, 75 GS, 25 Aptitude questions with detailed answer analysis.",
    },
    {
      icon: "book-open",
      title: "GS & Aptitude Coaching",
      description:
        "Dedicated General Studies sessions covering Tamil Nadu history, geography, economy and current affairs. Aptitude and mental ability training.",
    },
    {
      icon: "pen-tool",
      title: "Mains Answer Writing",
      description:
        "Structured criminal law answer writing sessions. Faculty reviews every answer and provides written feedback.",
    },
    {
      icon: "user-check",
      title: "1-on-1 Mentorship",
      description:
        "Individual progress tracking and personal attention. Doubt clearing via WhatsApp between classes. Personalised revision plan.",
    },
    {
      icon: "mic",
      title: "Interview Preparation",
      description:
        "Mock prosecution interviews testing criminal law knowledge, current affairs and communication skills in English and Tamil.",
    },
  ];

  const faqs = [
    {
      question:
        "What is the eligibility for the TNPSC APP Grade II exam?",
      answer:
        "You must hold an LLB degree from a recognised university. Age limit and specific eligibility criteria are as per the latest TNPSC notification. Check the official TNPSC website for the current notification details.",
    },
    {
      question:
        "How many vacancies are there for APP Grade II in 2026?",
      answer:
        "The most recent TNPSC APP Grade II notification announced 61 vacancies. Actual vacancy count may vary — always check the official TNPSC notification for confirmed numbers.",
    },
    {
      question:
        "Does XYZ cover BNS, BNSS and BSA for the APP exam?",
      answer:
        "Yes, completely. BNS, BNSS and BSA are the core criminal laws tested in the APP exam. XYZ covers all three new laws in full detail with updated notes and dedicated sessions in every batch.",
    },
    {
      question:
        "What is covered in the APP Prelims GS section?",
      answer:
        "The General Studies section (75 questions) covers Tamil Nadu history, geography, governance, Indian economy, current affairs with a Tamil Nadu focus, science and technology, and environment. XYZ covers all these topics alongside the law sections.",
    },
    {
      question:
        "Can I prepare for both Civil Judge and APP exam simultaneously?",
      answer:
        "Yes. The Civil Judge and APP exams share significant syllabus overlap — particularly in criminal law (BNS, BNSS, BSA) and constitutional law. Many students prepare for both simultaneously. Discuss your goals with our faculty during the free counselling session.",
    },
    {
      question:
        "Does XYZ offer online coaching for the APP exam?",
      answer:
        "Yes. Complete online coaching is available — live classes, recorded lectures, weekly MCQ PDFs, study notes and WhatsApp mentorship. Same quality as offline preparation.",
    },
  ];

  const relatedCourses = [
    {
      title: "Civil Judge Exam Coaching",
      slug: "civil-judge",
      badge: "Judiciary",
      description:
        "Comprehensive Prelims, Mains & Viva preparation for the Tamil Nadu judicial service examination.",
    },
    {
      title: "Patent Agent Exam Coaching",
      slug: "patent-agent",
      badge: "Patent Office",
      description:
        "CGPDTM Patent Agent exam coaching covering Patent Act, rules, and drafting.",
    },
    {
      title: "UGC-NET Law Coaching",
      slug: "ugc-net-law",
      badge: "NET · JRF",
      description:
        "Paper I and Paper II coaching for assistant professor and JRF eligibility.",
    },
  ];

  const appToppers = [
    {
      id: "4",
      name: "[Name 4]",
      post: "Assistant Public Prosecutor",
      course_name: "APP Exam Coaching",
      college: "Vels University, Chennai",
      batch_year: "2024",
      district: "Salem",
      photo_url: null,
      quote:
        "The mock tests exactly matched the real exam pattern. I felt prepared for every question.",
    },
    {
      id: "6",
      name: "[Name 6]",
      post: "Assistant Public Prosecutor",
      course_name: "APP Exam Coaching",
      college: "SASTRA University",
      batch_year: "2024",
      district: "Trichy",
      photo_url: null,
      quote:
        "Best decision I made for my legal career. The GS + Law combination coaching is exceptional.",
    },
  ];

  const courseData = {
    title: course?.title || "APP Exam Coaching in Tamil Nadu",
    subtitle:
      course?.shortDescription ||
      "Complete preparation for the TNPSC Assistant Public Prosecutor Grade II exam — all 200 MCQs, Mains, and Interview. BNS, BNSS & BSA fully covered. Expert faculty. Online and offline batches.",
    badge: course?.badge || "Prosecution Service",
    badgeColor: (course?.badgeColor as "navy" | "emerald" | "gold") || "navy",
    duration: course?.duration || "8–10 Months",
    mode: course?.mode || "Online + Offline Batches",
    fee: course?.fee || "Contact for fee details",
    feeNote: course?.feeNote || "",
    highlights: course?.highlights?.length ? course.highlights : highlights,
    syllabus: course?.syllabus?.length ? course.syllabus : syllabus,
    faqs: course?.faqs?.length ? course.faqs : faqs,
    seoTitle:
      course?.seoTitle ||
      "APP Exam Coaching Tamil Nadu | TNPSC Assistant Public Prosecutor",
    seoDescription:
      course?.seoDescription ||
      "XYZ offers complete TNPSC APP Grade II exam coaching in Tamil Nadu. All 200 MCQs covered — Law, GS & Aptitude. BNS, BNSS & BSA included. Online & offline. Expert faculty.",
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
      courseMode: ["online", "onsite"],
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
        item: `${siteUrl}/courses/app-exam`,
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
        courseSlug="app-exam"
        breadcrumb={breadcrumb}
      />

      <CourseHighlights
        highlights={courseData.highlights}
        courseTitle={courseData.title}
      />

      <ExamPatternSection
        examName="TNPSC APP Grade II Exam Pattern"
        stages={stages}
        totalMarks={560}
        meritNote="61 vacancies announced for 2026. Final selection based on Mains + Interview performance. Preliminary marks not included in merit calculation."
        eligibilityTitle="Eligibility for TNPSC APP Grade II Exam"
        eligibility={[
          { label: "Qualification", value: "LLB degree required", icon: "🎓" },
          { label: "Vacancies", value: "61 Posts (2026)", icon: "🏛" },
          { label: "Age Limit", value: "As per TNPSC notification", icon: "👤" },
          { label: "Language", value: "English & Tamil", icon: "🗣" },
        ]}
      />

      <SyllabusSection courseTitle="APP Exam" syllabus={courseData.syllabus} />

      <CourseFeatures features={features} courseTitle="APP Exam" />

      {/* CourseToppersSection rendered on APP page */}
      <CourseToppersSection
        heading="Assistant Public Prosecutor Selections from XYZ"
        courseKeyword="Assistant Public Prosecutor"
        toppers={appToppers}
      />

      <CourseFAQ faqs={courseData.faqs} courseTitle="APP Exam" />

      {/* Related Courses Strip */}
      <RelatedCourses
        relatedCourses={relatedCourses}
        facultyHref="/faculty"
        resultsHref="/results"
        demoHref="/demo-class"
      />

      <CourseEnrollCTA
        courseTitle={courseData.title}
        courseSlug="app-exam"
        defaultCourseName={courseData.title}
        subText="Join the coaching programme dedicated to preparing Assistant Public Prosecutors for Tamil Nadu. Online and offline batches available."
      />
    </>
  );
}
