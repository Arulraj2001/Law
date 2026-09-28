import type { Metadata } from "next";
import { FacultyPageHero } from "@/components/faculty/FacultyPageHero";
import {
  FacultyDetailCard,
  FacultyDetailItem,
} from "@/components/faculty/FacultyDetailCard";
import { FacultyPhilosophy } from "@/components/faculty/FacultyPhilosophy";
import { FacultyCTA } from "@/components/faculty/FacultyCTA";
import { getAllFacultySanity } from "@/lib/sanity/queries";
import { SITE_CONFIG } from "@/lib/constants";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Our Faculty — Expert Judiciary Mentors",
  description:
    "Meet the expert faculty behind XYZ Law Coaching — practicing lawyers and legal educators with 10+ years of judiciary exam mentoring experience in Tamil Nadu.",
  keywords: [
    "law coaching faculty Tamil Nadu",
    "judiciary mentors Chennai",
    "TNPSC civil judge teachers",
    "APP exam faculty",
  ],
  path: "/faculty",
});

export const revalidate = 3600;

const placeholderFaculty: FacultyDetailItem[] = [
  {
    id: "1",
    name: "[Founder Name]",
    designation: "Founder & Chief Faculty",
    qualification: "BA.BL / LLM",
    specialization: "Civil Law · Criminal Law",
    short_bio:
      "Practicing advocate with 10+ years mentoring judiciary aspirants across Tamil Nadu.",
    credentials: [
      "Practicing Advocate",
      "10+ Years",
      "Madras High Court Bar",
    ],
    is_founder: true,
    photo_url: null,
    philosophy:
      "Law should be taught the way courts apply it, not the way textbooks explain it. Every session is designed around the question: 'How would a judge think about this?'",
    courses_taught: [
      { name: "Civil Judge Exam Coaching", href: "/courses/civil-judge" },
      { name: "APP Exam Coaching", href: "/courses/app-exam" },
    ],
  },
  {
    id: "2",
    name: "[Faculty Name 2]",
    designation: "Senior Faculty — Criminal Law",
    qualification: "LLB · LLM",
    specialization: "Criminal Law · BNS · BNSS",
    short_bio:
      "Specialist in new criminal laws (BNS, BNSS, BSA) with extensive exam coaching experience.",
    credentials: ["LLB · LLM", "Criminal Law Expert", "Trial Practice"],
    is_founder: false,
    photo_url: null,
    philosophy:
      "Criminal law clarity comes from understanding the purpose behind each provision. I teach the intent of every section, not just its words.",
    courses_taught: [
      { name: "APP Exam Coaching", href: "/courses/app-exam" },
      { name: "Civil Judge (Criminal Law)", href: "/courses/civil-judge" },
    ],
  },
  {
    id: "3",
    name: "[Faculty Name 3]",
    designation: "Faculty — IP Law",
    qualification: "LLB · Patent Agent",
    specialization: "IP Law · Patent · Trademark",
    short_bio:
      "Certified patent agent coaching Patent Agent and Trademark Agent exam aspirants.",
    credentials: [
      "Certified Patent Agent",
      "IP Specialist",
      "Registered Trademark Agent",
    ],
    is_founder: false,
    photo_url: null,
    philosophy:
      "IP law is the intersection of creativity and commerce. I help students see patents and trademarks as business tools, not just legal documents.",
    courses_taught: [
      { name: "Patent Agent Exam", href: "/courses/patent-agent" },
      { name: "Trademark Agent Exam", href: "/courses/trademark-agent" },
    ],
  },
];

export default async function FacultyPage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url || "https://yourdomain.com";

  let facultyList: FacultyDetailItem[] = placeholderFaculty;

  try {
    const sanityFaculty = await getAllFacultySanity();
    if (Array.isArray(sanityFaculty) && sanityFaculty.length > 0) {
      facultyList = sanityFaculty.map((f: any, idx: number) => ({
        id: f._id || String(idx + 1),
        name: f.name || `Faculty Member ${idx + 1}`,
        designation: f.designation || "Law Faculty",
        qualification: f.qualification || "LLB · LLM",
        specialization: f.specialization || "Judicial Preparation",
        short_bio:
          f.shortBio ||
          "Expert educator dedicated to guiding aspirants toward judicial success.",
        full_bio: f.fullBio || null,
        credentials: Array.isArray(f.credentials) ? f.credentials : [],
        is_founder: Boolean(f.isFounder),
        photo_url: f.photo?.asset?.url || null,
        philosophy: f.philosophy || undefined,
        courses_taught: Array.isArray(f.coursesTaught)
          ? f.coursesTaught.map((c: any) => ({
              name: typeof c === "string" ? c : c.name || "Law Course",
              href:
                typeof c === "string"
                  ? `/courses/${c.toLowerCase().replace(/\s+/g, "-")}`
                  : c.href || "/courses",
            }))
          : undefined,
      }));
    }
  } catch {
    facultyList = placeholderFaculty;
  }

  // Schema generation
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
        name: "Faculty",
        item: `${siteUrl}/faculty`,
      },
    ],
  };

  const personSchemas = facultyList.map((faculty) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: faculty.name,
    jobTitle: faculty.designation,
    worksFor: {
      "@type": "EducationalOrganization",
      name: SITE_CONFIG.name || "XYZ Law Coaching",
      sameAs: siteUrl,
    },
    description: faculty.short_bio,
    image: faculty.photo_url || undefined,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {personSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Section 1: Hero */}
      <FacultyPageHero />

      {/* Section 2: Faculty Detailed Cards */}
      <section className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald">
              Our Mentors
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-navy-dark mt-2">
              Learn Directly from Practicing Advocates
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mt-3">
              Every mentor brings real-world courtroom insight, exam pattern mastery, and a personal commitment to your judicial selection.
            </p>
          </div>

          <div className="space-y-6">
            {facultyList.map((faculty, index) => (
              <FacultyDetailCard
                key={faculty.id}
                faculty={faculty}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Teaching Philosophy */}
      <FacultyPhilosophy />

      {/* Section 4: CTA */}
      <FacultyCTA />
    </>
  );
}
