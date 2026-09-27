"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export interface RelatedCourseItem {
  title: string;
  slug: string;
  badge?: string;
  description: string;
}

export interface RelatedCoursesProps {
  relatedCourses: RelatedCourseItem[];
  facultyHref?: string;
  resultsHref?: string;
  demoHref?: string;
}

export function RelatedCourses({
  relatedCourses,
  facultyHref = "/faculty",
  resultsHref = "/results",
  demoHref = "/demo-class",
}: RelatedCoursesProps) {
  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-2 block">
            Related Programmes
          </span>
          <h2 className="font-heading font-bold text-2xl text-navy-dark tracking-tight">
            Explore Other Judicial &amp; Legal Exam Courses
          </h2>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedCourses.map((course, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-black/[0.08] shadow-xs hover:shadow-md hover:border-navy-light/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {course.badge && (
                  <span className="inline-block text-[11px] font-semibold text-navy-mid bg-navy-tint px-2.5 py-0.5 rounded-full mb-3">
                    {course.badge}
                  </span>
                )}
                <h3 className="font-heading font-bold text-lg text-navy-dark leading-snug mb-2">
                  {course.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {course.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-black/[0.06]">
                <Link
                  href={`/courses/${course.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald hover:text-emerald-dark transition-colors"
                >
                  <span>View Course Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Useful Internal Links Strip */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-slate-600">
          <Link href={facultyHref} className="hover:text-navy-mid hover:underline">
            About Our Faculty &rarr;
          </Link>
          <span className="text-slate-300">•</span>
          <Link href={demoHref} className="hover:text-navy-mid hover:underline">
            Book Free Demo Class &rarr;
          </Link>
          {resultsHref && (
            <>
              <span className="text-slate-300">•</span>
              <Link href={resultsHref} className="hover:text-navy-mid hover:underline">
                View Past Results &rarr;
              </Link>
            </>
          )}
          <span className="text-slate-300">•</span>
          <Link href="/courses" className="hover:text-navy-mid hover:underline">
            All Coaching Courses &rarr;
          </Link>
          <span className="text-slate-300">•</span>
          <Link href="/contact" className="hover:text-navy-mid hover:underline">
            Contact Institute &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

export default RelatedCourses;
