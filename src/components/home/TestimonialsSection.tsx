import { getFeaturedTestimonialsSanity, getSiteSettingsFull } from "@/lib/sanity/queries";
import {
  TestimonialsSectionClient,
  TestimonialItem,
} from "./TestimonialsSectionClient";

const placeholderTestimonials: TestimonialItem[] = [
  {
    id: "1",
    student_name: "Judge [Name]",
    current_post: "Civil Judge, Chennai District",
    course_name: "Civil Judge Exam Coaching",
    college: "Government Law College",
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
    college: "SRM Law School",
    batch_year: "2024",
    quote:
      "I found the right assistance at the right time from the best people. XYZ played the crucial role in building my legal career. The mock tests were exactly like the real exam. I will be grateful from my heart.",
    video_url: null,
    photo_url: null,
    type: "text",
    rating: 5,
    is_featured: true,
    sort_order: 4,
  },
];

export async function TestimonialsSection() {
  let testimonials: TestimonialItem[] = placeholderTestimonials;
  let youtubeUrl: string | undefined;

  try {
    const [sanityTestimonials, settings] = await Promise.all([
      getFeaturedTestimonialsSanity(),
      getSiteSettingsFull(),
    ]);
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
        type: t.type || (t.videoUrl ? "video" : "text"),
        rating: typeof t.rating === "number" ? t.rating : 5,
        is_featured: true,
        sort_order: t.sortOrder || index + 1,
      }));
    }
    if (settings?.socialLinks?.youtube) {
      youtubeUrl = settings.socialLinks.youtube;
    }
  } catch {
    testimonials = placeholderTestimonials;
  }

  return <TestimonialsSectionClient testimonials={testimonials} youtubeUrl={youtubeUrl} />;
}

export default TestimonialsSection;
