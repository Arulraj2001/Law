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
  title: "UGC NET Law Coaching Tamil Nadu | UGC NET Law Prep",
  description:
    "XYZ offers comprehensive UGC-NET Law coaching covering Paper I and Paper II. For law graduates targeting assistant lectureship and JRF. Online classes. Expert faculty.",
  keywords: [
    "UGC NET law coaching Tamil Nadu",
    "UGC NET law preparation",
    "NET law exam coaching Chennai",
    "UGC NET law coaching online India",
    "UGC NET law 2026",
  ],
  path: "/courses/ugc-net-law",
});

export default function UGCNETLawPage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url || "https://yourdomain.com";

  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "UGC-NET Law", href: "/courses/ugc-net-law" },
  ];

  const highlights = [
    "Paper I — Teaching & Research Aptitude",
    "Paper II — all law subjects covered",
    "Constitutional law deep-dive",
    "Jurisprudence and legal theory",
    "BNS, BNSS & BSA for criminal law section",
    "Previous year question analysis",
    "JRF-focused merit maximisation strategy",
    "Weekly mock tests — NET pattern",
    "Online classes — pan India access",
    "Recorded lectures for revision",
  ];

  const stages = [
    {
      name: "Paper I: General Paper",
      description: "Teaching & Research Aptitude",
      marks: 100,
      duration: "1 hour",
      details: [
        "50 compulsory questions",
        "Teaching aptitude",
        "Research aptitude",
        "Reading comprehension",
        "Communication skills",
        "Reasoning ability",
        "Information & communication technology",
        "Higher education system",
      ],
    },
    {
      name: "Paper II: Law",
      description: "Subject-specific law paper",
      marks: 200,
      duration: "2 hours",
      details: [
        "100 questions from law syllabus",
        "Constitutional law",
        "Jurisprudence",
        "International law",
        "All major law subjects tested",
        "Both papers held in same sitting",
      ],
    },
  ];

  const syllabus = [
    {
      stage: "Paper I — Teaching Aptitude",
      tabLabel: "Paper I: Teaching",
      topics: [
        "Concept of teaching and learning",
        "Learner's characteristics",
        "Methods of teaching",
        "Teaching aids and technology",
        "Evaluation systems",
        "Higher education in India",
      ],
    },
    {
      stage: "Paper I — Research Aptitude",
      tabLabel: "Paper I: Research",
      topics: [
        "Research methods and types",
        "Research ethics",
        "Thesis and research paper writing",
        "Data interpretation",
        "Reasoning and comprehension",
        "ICT basics",
      ],
    },
    {
      stage: "Paper II — Constitutional Law",
      tabLabel: "Paper II: Constitution",
      topics: [
        "Constitutional law of India",
        "Fundamental Rights and Duties",
        "Constitutional remedies",
        "Federal structure",
        "Emergency provisions",
        "Comparative constitutional law",
      ],
    },
    {
      stage: "Paper II — Core Law Subjects",
      tabLabel: "Paper II: Core Law",
      topics: [
        "Jurisprudence and Legal Theory",
        "Law of Contracts",
        "Law of Torts",
        "Criminal Law (IPC/BNS, CrPC/BNSS)",
        "Law of Evidence (BSA)",
        "Family Law",
        "Property Law",
        "Administrative Law",
        "International Law",
        "Human Rights Law",
        "Environmental Law",
      ],
    },
  ];

  const features = [
    {
      icon: "book-open",
      title: "Paper I — Complete Coverage",
      description:
        "Teaching aptitude, research methods, reasoning, ICT basics and comprehension — all 10 units of Paper I systematically covered.",
    },
    {
      icon: "scale",
      title: "All Law Subjects — Paper II",
      description:
        "Constitutional law, jurisprudence, international law, contract, tort, criminal law and all other subjects in the UGC-NET Law syllabus.",
    },
    {
      icon: "clipboard-list",
      title: "Previous Year Questions",
      description:
        "Complete analysis of past UGC-NET Law papers with model answers, answer key discussions and pattern-based preparation.",
    },
    {
      icon: "refresh-cw",
      title: "Updated for New Criminal Laws",
      description:
        "BNS, BNSS and BSA integrated into the criminal law portion of Paper II — updated for 2026 exam requirements.",
    },
    {
      icon: "monitor",
      title: "Online Classes — Pan India",
      description:
        "Live online coaching accessible from anywhere. Recorded lectures. Weekly mock tests. WhatsApp group for doubts.",
    },
    {
      icon: "award",
      title: "JRF Focused Strategy",
      description:
        "Targeted preparation for students aiming for Junior Research Fellowship — higher cutoff strategy and merit maximisation approach.",
    },
  ];

  const faqs = [
    {
      question: "Who is eligible for UGC-NET Law?",
      answer:
        "Any person who holds a post-graduate degree (LLM) or LLB with minimum 55% marks (50% for reserved categories) is eligible. Final year students also eligible. Check the latest NTA notification for current eligibility criteria.",
    },
    {
      question: "What is the difference between NET qualification and JRF?",
      answer:
        "NET qualification makes you eligible for assistant professor positions in colleges and universities. JRF (Junior Research Fellowship) additionally gives you a monthly stipend for PhD research. JRF requires a higher merit rank within NET-qualified candidates.",
    },
    {
      question: "How many times is UGC-NET conducted per year?",
      answer:
        "UGC-NET is conducted twice a year (June and December cycles) by NTA. The exact schedule is announced through the NTA official website. XYZ keeps students updated on exam dates via WhatsApp.",
    },
    {
      question:
        "Does XYZ cover the new criminal laws (BNS/BNSS/BSA) for NET Law?",
      answer:
        "Yes. BNS, BNSS and BSA are now part of the criminal law portion of UGC-NET Paper II. XYZ covers all three new laws along with the transitional provisions.",
    },
  ];

  const relatedCourses = [
    {
      title: "SET Law Coaching",
      slug: "set-law",
      badge: "State Eligibility",
      description:
        "Complete coaching for the Tamil Nadu State Eligibility Test (TNSET) in Law with state-specific legal coverage.",
    },
    {
      title: "Civil Judge Exam Coaching",
      slug: "civil-judge",
      badge: "Primary Focus",
      description:
        "Tamil Nadu judicial service examination preparation for Prelims, Mains, and Viva-Voce.",
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
    name: "UGC-NET Law Coaching",
    description:
      "Complete preparation for the UGC National Eligibility Test in Law — Paper I (Teaching & Research Aptitude) and Paper II (Law).",
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
        name: "UGC-NET Law",
        item: `${siteUrl}/courses/ugc-net-law`,
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

      <CourseStickySidebar courseTitle="UGC-NET Law Coaching" />

      <CourseHero
        title="UGC-NET Law Coaching"
        subtitle="Complete preparation for the UGC National Eligibility Test in Law — Paper I (Teaching & Research Aptitude) and Paper II (Law). For law graduates targeting assistant lectureship and JRF positions. Online classes available."
        badge="UGC-NET Law · 40% Focus"
        badgeColor="gold"
        highlights={[
          "Paper I + Paper II coverage",
          "Teaching & Research Aptitude",
          "All law subjects covered",
          "JRF preparation included",
        ]}
        duration="4–6 Months"
        mode="Live Online Classes"
        fee="Contact for fee details"
        courseSlug="ugc-net-law"
        breadcrumb={breadcrumb}
      />

      <CourseHighlights
        highlights={highlights}
        courseTitle="UGC-NET Law"
      />

      <ExamPatternSection
        examName="UGC-NET Law Exam Pattern"
        stages={stages}
        totalMarks={300}
        meritNote="Both papers held in a single session. Paper I is common for all subjects. Paper II is subject-specific (Law). Minimum cutoff marks required in both papers for NET qualification. JRF requires higher marks with separate merit list."
        eligibilityTitle="Eligibility for UGC-NET Law"
        eligibility={[
          { label: "Degree", value: "LLM or LLB with 55%", icon: "🎓" },
          { label: "Conducted By", value: "National Testing Agency (NTA)", icon: "🏛" },
          { label: "Frequency", value: "Twice a Year (June & Dec)", icon: "🗓" },
          { label: "Qualifies", value: "Assistant Professor & JRF", icon: "⭐" },
        ]}
      />

      <SyllabusSection courseTitle="UGC-NET Law" syllabus={syllabus} />

      <CourseFeatures features={features} courseTitle="UGC-NET Law" />

      {/* No ToppersSection rendered as specified */}

      <CourseFAQ faqs={faqs} courseTitle="UGC-NET Law" />

      {/* Related Courses Strip */}
      <RelatedCourses
        relatedCourses={relatedCourses}
        facultyHref="/faculty"
        resultsHref="/results"
        demoHref="/demo-class"
      />

      <CourseEnrollCTA
        courseTitle="UGC-NET Law"
        courseSlug="ugc-net-law"
        defaultCourseName="UGC-NET Law"
        subText="Achieve your lectureship qualification or Junior Research Fellowship. Attend a free demo session to learn our structured strategy."
      />
    </>
  );
}
