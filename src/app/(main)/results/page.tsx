import type { Metadata } from "next";
import { ResultsPageHero } from "@/components/results/ResultsPageHero";
import { ResultsStats } from "@/components/results/ResultsStats";
import { TopperGrid, TopperItem } from "@/components/results/TopperGrid";
import { ResultsTimeline } from "@/components/results/ResultsTimeline";
import { ResultsTestimonials } from "@/components/results/ResultsTestimonials";
import { ResultsCTA } from "@/components/results/ResultsCTA";
import { getAllToppersSanity } from "@/lib/sanity/queries";
import { SITE_CONFIG } from "@/lib/constants";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Results & Toppers — Civil Judge Selections",
  description:
    "25+ students from XYZ Law Coaching are now serving as Civil Judges and APPs across Tamil Nadu. See the complete list of successful selections from our coaching programmes.",
  keywords: [
    "civil judge selections Tamil Nadu",
    "TNPSC judiciary results",
    "XYZ law coaching toppers",
    "APP exam selections Chennai",
  ],
  path: "/results",
});

const placeholderToppers: TopperItem[] = [
  {
    id: "1",
    name: "Judge [Name 1]",
    post: "Civil Judge",
    course_name: "Civil Judge Exam Coaching",
    college: "Government Law College, Chennai",
    batch_year: "2024",
    district: "Chennai",
    photo_url: null,
    quote:
      "XYZ gave me the structure and confidence I needed to clear the exam on my first attempt.",
    mode: "Offline Batch",
    is_featured: true,
    sort_order: 1,
  },
  {
    id: "2",
    name: "Judge [Name 2]",
    post: "Civil Judge",
    course_name: "Civil Judge Exam Coaching",
    college: "SRM Law School",
    batch_year: "2024",
    district: "Coimbatore",
    photo_url: null,
    quote:
      "The translation classes were unlike anything I found elsewhere. That section alone is worth enrolling.",
    mode: "Online Batch",
    is_featured: true,
    sort_order: 2,
  },
  {
    id: "3",
    name: "Judge [Name 3]",
    post: "Civil Judge",
    course_name: "Civil Judge Exam Coaching",
    college: "Madras Law College",
    batch_year: "2023",
    district: "Madurai",
    photo_url: null,
    quote:
      "Personal mentorship from a practicing advocate made all the difference. Real law, not just theory.",
    mode: "Offline Batch",
    is_featured: true,
    sort_order: 3,
  },
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
    mode: "Online Batch",
    is_featured: true,
    sort_order: 4,
  },
  {
    id: "5",
    name: "Judge [Name 5]",
    post: "Civil Judge",
    course_name: "Civil Judge Exam Coaching",
    college: "Government Law College, Coimbatore",
    batch_year: "2023",
    district: "Tirunelveli",
    photo_url: null,
    quote:
      "Cleared on first attempt. The faculty's courtroom experience made complex topics simple.",
    mode: "Online Batch",
    is_featured: true,
    sort_order: 5,
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
    mode: "Offline Batch",
    is_featured: true,
    sort_order: 6,
  },
  {
    id: "7",
    name: "Judge [Name 7]",
    post: "Civil Judge",
    course_name: "Civil Judge Exam Coaching",
    college: "Dr Ambedkar Law University",
    batch_year: "2023",
    district: "Vellore",
    photo_url: null,
    quote:
      "The answer writing practice sessions were the most valuable part of my preparation.",
    mode: "Online Batch",
    is_featured: true,
    sort_order: 7,
  },
  {
    id: "8",
    name: "Judge [Name 8]",
    post: "Civil Judge",
    course_name: "Civil Judge Exam Coaching",
    college: "Loyola College of Law",
    batch_year: "2024",
    district: "Erode",
    photo_url: null,
    quote:
      "XYZ is not just a coaching class — it is a judicial career launchpad.",
    mode: "Offline Batch",
    is_featured: true,
    sort_order: 8,
  },
];

export default async function ResultsPage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url || "https://yourdomain.com";

  let toppers: TopperItem[] = placeholderToppers;

  try {
    const sanityToppers = await getAllToppersSanity();
    if (Array.isArray(sanityToppers) && sanityToppers.length > 0) {
      toppers = sanityToppers.map((t: any, index: number) => ({
        id: t._id || String(index + 1),
        name: t.name,
        post: t.post || "Civil Judge",
        course_name:
          t.course?.title || t.courseName || "Civil Judge Exam Coaching",
        college: t.college,
        batch_year: t.batchYear ? String(t.batchYear) : undefined,
        district: t.district,
        rank: t.rank,
        photo_url: t.photo?.asset?.url || null,
        quote: t.quote,
        mode: t.mode || (index % 2 === 0 ? "Offline Batch" : "Online Batch"),
        is_featured: true,
        sort_order: t.sortOrder || index + 1,
      }));
    }
  } catch {
    toppers = placeholderToppers;
  }

  // Schema: BreadcrumbList
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
        name: "Results & Toppers",
        item: `${siteUrl}/results`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Section 1: Hero */}
      <ResultsPageHero />

      {/* Section 2: Stats Breakdown */}
      <ResultsStats />

      {/* Section 3: Toppers Grid with Multi-Filter */}
      <TopperGrid toppers={toppers} />

      {/* Section 4: Results Timeline */}
      <ResultsTimeline />

      {/* Section 5: In Their Own Words (Testimonial pull quotes) */}
      <ResultsTestimonials />

      {/* Section 6: Results CTA */}
      <ResultsCTA />
    </>
  );
}
