import { getFeaturedToppersSanity } from "@/lib/sanity/queries";
import {
  ToppersSectionClient,
  TopperItem,
} from "./ToppersSectionClient";

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
    is_featured: true,
    sort_order: 8,
  },
];

export async function ToppersSection() {
  let toppers: TopperItem[] = placeholderToppers;

  try {
    const sanityToppers = await getFeaturedToppersSanity();
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
        is_featured: true,
        sort_order: t.sortOrder || index + 1,
      }));
    }
  } catch {
    toppers = placeholderToppers;
  }

  return <ToppersSectionClient toppers={toppers} />;
}

export default ToppersSection;
