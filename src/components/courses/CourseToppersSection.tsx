"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TopperCard } from "@/components/shared/TopperCard";

export interface CourseToppersProps {
  heading?: string;
  courseKeyword?: string;
  toppers?: any[];
}

const defaultCivilJudgeToppers = [
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
  },
];

export function CourseToppersSection({
  heading = "Civil Judge Selections from XYZ",
  courseKeyword = "Civil Judge",
  toppers = defaultCivilJudgeToppers,
}: CourseToppersProps) {
  // Filter to matching course toppers
  const filteredToppers = toppers.filter((t) =>
    (t.course_name || t.post || "")
      .toLowerCase()
      .includes(courseKeyword.toLowerCase())
  );

  const displayList =
    filteredToppers.length > 0 ? filteredToppers : defaultCivilJudgeToppers;

  return (
    <section className="py-20 bg-[#F5F5F0]" id="toppers">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Social Proof"
          title={heading}
          subtitle="Real candidates from across Tamil Nadu who transformed their legal ambition into judicial service through our structured coaching."
          align="center"
          eyebrowColor="emerald"
        />

        {/* 4 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {displayList.slice(0, 8).map((topper, idx) => (
            <TopperCard
              key={topper.id || idx}
              topper={topper}
              index={idx}
              variant="grid"
            />
          ))}
        </div>

        {/* Link below: See All Results */}
        <div className="text-center mt-12">
          <Link
            href="/results"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white border-2 border-navy-mid text-navy-dark font-bold text-sm hover:bg-navy-dark hover:border-navy-dark hover:text-white transition-all duration-200 shadow-sm"
          >
            <span>See All Results</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CourseToppersSection;
