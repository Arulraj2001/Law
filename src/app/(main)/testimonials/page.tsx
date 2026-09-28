import type { Metadata } from "next";
import { TestimonialsHero } from "@/components/testimonials/TestimonialsHero";
import { VideoTestimonialsRow } from "@/components/testimonials/VideoTestimonialsRow";
import {
  TextTestimonialsGrid,
  TestimonialItem,
} from "@/components/testimonials/TextTestimonialsGrid";
import { TestimonialsCTA } from "@/components/testimonials/TestimonialsCTA";
import { getAllTestimonialsSanity } from "@/lib/sanity/queries";
import { SITE_CONFIG } from "@/lib/constants";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Student Testimonials — Judges & APPs Who Trained at XYZ",
  description:
    "Read testimonials from Civil Judges and Assistant Public Prosecutors who prepared with XYZ Law Coaching. Real words from real judicial officers serving Tamil Nadu.",
  keywords: [
    "judiciary coaching reviews Tamil Nadu",
    "XYZ law coaching feedback",
    "civil judge topper testimonials",
    "APP exam success stories",
  ],
  path: "/testimonials",
});

export const revalidate = 3600;

const placeholderTestimonials: TestimonialItem[] = [
  {
    id: "1",
    student_name: "Judge [Name 1]",
    current_post: "Civil Judge, Chennai District",
    course_name: "Civil Judge Exam Coaching",
    college: "Government Law College, Chennai",
    batch_year: "2024",
    quote:
      "I consider myself fortunate to have found XYZ at the right time. The mentorship I received changed the way I understood law — and I passed on my first attempt. The faculty does not just teach the syllabus. They teach you how to think.",
    video_url: null,
    photo_url: null,
    type: "text",
    rating: 5,
    is_featured: true,
    sort_order: 1,
  },
  {
    id: "2",
    student_name: "Judge [Name 2]",
    current_post: "Civil Judge, Coimbatore District",
    course_name: "Civil Judge Exam Coaching",
    college: "Madras Law College",
    batch_year: "2024",
    quote:
      "XYZ helped me ace my preparation, especially civil judgment writing. The online classes were structured and perfectly paced. The translation sessions are the best resource available anywhere for this exam.",
    video_url: null,
    photo_url: null,
    type: "text",
    rating: 5,
    is_featured: true,
    sort_order: 2,
  },
  {
    id: "3",
    student_name: "Judge [Name 3]",
    current_post: "Civil Judge, Madurai District",
    course_name: "Civil Judge Exam Coaching",
    college: "Vels University",
    batch_year: "2023",
    quote:
      "The finest, most student-friendly institute I have encountered for judicial preparation. They never said 'you can do this alone' — they always said 'let us do this together.' That collaborative spirit makes all the difference.",
    video_url: null,
    photo_url: null,
    type: "text",
    rating: 5,
    is_featured: true,
    sort_order: 3,
  },
  {
    id: "4",
    student_name: "[Name 4]",
    current_post: "APP Grade II, Salem District",
    course_name: "APP Exam Coaching",
    college: "Dr Ambedkar Law University",
    batch_year: "2024",
    quote:
      "The mock tests exactly matched the real exam pattern. I felt prepared for every question. The criminal law notes on the new BNS, BNSS, and BSA were the most organized material I found.",
    video_url: null,
    photo_url: null,
    type: "text",
    rating: 5,
    is_featured: true,
    sort_order: 4,
  },
  {
    id: "5",
    student_name: "Judge [Name 5]",
    current_post: "Civil Judge, Madurai District",
    course_name: "Civil Judge Exam Coaching",
    college: "Government Law College, Madurai",
    batch_year: "2023",
    quote:
      "The weekly mock tests were the most valuable part of my preparation. By exam day, I had already sat 24 full-length tests. Nothing in the real exam surprised me.",
    video_url: null,
    photo_url: null,
    type: "text",
    rating: 5,
    is_featured: true,
    sort_order: 5,
  },
  {
    id: "6",
    student_name: "[Name 6]",
    current_post: "APP Grade II, Salem District",
    course_name: "APP Exam Coaching",
    college: "SASTRA University, Thanjavur",
    batch_year: "2023",
    quote:
      "The APP exam coaching at XYZ covered all 200 questions pattern perfectly. The GS sessions were especially helpful — I scored well above cutoff in the GS section.",
    video_url: null,
    photo_url: null,
    type: "text",
    rating: 5,
    is_featured: false,
    sort_order: 6,
  },
  {
    id: "7",
    student_name: "Judge [Name 7]",
    current_post: "Civil Judge, Vellore District",
    course_name: "Civil Judge Exam Coaching",
    college: "Vels Institute of Science",
    batch_year: "2024",
    quote:
      "I had failed the Civil Judge exam once before joining XYZ. The personal attention and structured revision plan made all the difference in my second attempt.",
    video_url: null,
    photo_url: null,
    type: "text",
    rating: 5,
    is_featured: false,
    sort_order: 7,
  },
  {
    id: "8",
    student_name: "Judge [Name 8]",
    current_post: "Civil Judge, Trichy District",
    course_name: "Civil Judge Exam Coaching",
    college: "Bharathidasan University",
    batch_year: "2024",
    quote:
      "XYZ is not just about passing an exam. The faculty teaches you to think like a judge. That mindset shift is what actually gets you through the viva-voce stage.",
    video_url: null,
    photo_url: null,
    type: "text",
    rating: 5,
    is_featured: false,
    sort_order: 8,
  },
];

export default async function TestimonialsPage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url || "https://yourdomain.com";

  let testimonials: TestimonialItem[] = placeholderTestimonials;

  try {
    const sanityTestimonials = await getAllTestimonialsSanity();
    if (Array.isArray(sanityTestimonials) && sanityTestimonials.length > 0) {
      testimonials = sanityTestimonials.map((t: any, index: number) => ({
        id: t._id || String(index + 1),
        student_name: t.studentName,
        current_post: t.currentPost,
        course_name:
          t.course?.title || t.courseName || "Civil Judge Exam Coaching",
        college: t.college,
        batch_year: t.batchYear ? String(t.batchYear) : undefined,
        quote: t.quote,
        video_url: t.videoUrl || null,
        photo_url: t.photo?.asset?.url || null,
        type: t.type || "text",
        rating: t.rating || 5,
        is_featured: Boolean(t.isFeatured),
        sort_order: t.sortOrder || index + 1,
      }));
    }
  } catch {
    testimonials = placeholderTestimonials;
  }

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
        name: "Testimonials",
        item: `${siteUrl}/testimonials`,
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
      <TestimonialsHero />

      {/* Section 2: Video Testimonials Row */}
      <VideoTestimonialsRow testimonials={testimonials} />

      {/* Section 3: Text Testimonials Grid (8 cards) */}
      <TextTestimonialsGrid testimonials={testimonials} />

      {/* Section 4: CTA */}
      <TestimonialsCTA />
    </>
  );
}
