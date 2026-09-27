import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { Testimonial } from "@/types/testimonial";

export const metadata: Metadata = {
  title: "Testimonials | What Our Students Say",
  description:
    "Read real student reviews and testimonials from candidates who prepared for TNPSC Civil Judge, APP Exam, and IP exams at XYZ.",
};

const ALL_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Adv. Priyadharshini M.",
    role: "Selected Civil Judge",
    examCleared: "Civil Judge 2023",
    quote:
      "The dedicated Tamil translation sessions and the meticulous evaluation of judgment writing by senior advocates were unmatched. XYZ gave me the exact strategy needed.",
    rating: 5,
  },
  {
    id: "2",
    name: "Adv. Karthikeyan S.",
    role: "Selected APP Grade II",
    examCleared: "APP Exam 2023",
    quote:
      "The coverage of criminal major acts with recent Supreme Court citations gave me immense confidence during both prelims and mains.",
    rating: 5,
  },
  {
    id: "3",
    name: "Adv. Saravanan B.",
    role: "Patent Agent",
    examCleared: "CGPDTM Patent Agent 2024",
    quote:
      "Patent drafting was my biggest concern. The drafting templates and mock drafting papers prepared me thoroughly.",
    rating: 5,
  },
  {
    id: "4",
    name: "Adv. A. Divya",
    role: "Civil Judge (Junior Division)",
    examCleared: "Civil Judge 2022",
    quote:
      "Online classes fit my schedule as a practicing junior advocate. I was able to watch recorded sessions and attend live tests every Sunday without missing court dates.",
    rating: 5,
  },
  {
    id: "5",
    name: "Adv. K. Ramesh",
    role: "Selected Candidate",
    examCleared: "APP Exam 2022",
    quote:
      "The faculty's guidance in framing answers with relevant statutory provisions and case law ratios was the defining factor in clearing the descriptive mains paper.",
    rating: 5,
  },
  {
    id: "6",
    name: "Adv. S. Vijay",
    role: "Registered Trademark Agent",
    examCleared: "Trademark Agent 2023",
    quote:
      "Concise notes and systematic study of the Trade Marks Act and Rules helped me crack the examination in my very first attempt.",
    rating: 5,
  },
];

export default function TestimonialsPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 sm:px-8">
        <SectionHeading
          badge="Candidate Reviews"
          title="Inspiring Stories from Our Alumni"
          subtitle="Discover how structured preparation, personal mentorship, and continuous feedback transformed our students into judicial officers."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {ALL_TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
