"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface BlogPostCTAProps {
  relatedCourseTitle?: string;
  relatedCourseSlug?: string;
}

export function BlogPostCTA({
  relatedCourseTitle,
  relatedCourseSlug,
}: BlogPostCTAProps) {
  const courseTarget =
    relatedCourseTitle || "TNPSC Civil Judge or APP Exam";
  const courseLink = relatedCourseSlug
    ? `/courses/${relatedCourseSlug}`
    : "/courses";

  return (
    <div className="bg-navy-dark text-white rounded-2xl p-6 sm:p-8 my-10 shadow-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: Text */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Targeted Preparation</span>
          </div>

          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white mb-2 leading-snug">
            Preparing for {courseTarget}?
          </h3>

          <p className="text-white/80 text-sm leading-relaxed">
            XYZ Law Coaching has helped 25+ students clear this exam. Experience our courtroom-anchored methodology in a free demo class.
          </p>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-3 shrink-0">
          <Link
            href="/demo-class"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald hover:bg-emerald-dark text-white font-bold text-sm shadow-md transition-all duration-150"
          >
            <span>Book Free Demo Class</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href={courseLink}
            className="text-xs sm:text-sm text-white/70 hover:text-white underline underline-offset-4 transition-colors font-medium ml-2 md:ml-0"
          >
            View all courses →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogPostCTA;
