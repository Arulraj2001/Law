"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare } from "lucide-react";

export interface TestimonialItem {
  id: string;
  student_name: string;
  current_post: string;
  course_name: string;
  college?: string;
  batch_year?: string;
  quote: string;
  video_url?: string | null;
  photo_url?: string | null;
  type?: string;
  rating?: number;
  is_featured?: boolean;
  sort_order?: number;
}

interface TextTestimonialsGridProps {
  testimonials: TestimonialItem[];
}

export function TextTestimonialsGrid({
  testimonials,
}: TextTestimonialsGridProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const filterTabs = [
    "All",
    "Civil Judge",
    "APP Exam",
    "5 Star",
    "Recent (2024)",
  ];

  const filtered = useMemo(() => {
    return testimonials.filter((t) => {
      if (selectedFilter === "All") return true;
      if (selectedFilter === "Civil Judge") {
        return (
          t.course_name?.toLowerCase().includes("civil judge") ||
          t.current_post?.toLowerCase().includes("civil judge")
        );
      }
      if (selectedFilter === "APP Exam") {
        return (
          t.course_name?.toLowerCase().includes("app") ||
          t.current_post?.toLowerCase().includes("app") ||
          t.current_post?.toLowerCase().includes("prosecutor")
        );
      }
      if (selectedFilter === "5 Star") {
        return (t.rating || 5) === 5;
      }
      if (selectedFilter === "Recent (2024)") {
        return t.batch_year === "2024";
      }
      return true;
    });
  }, [testimonials, selectedFilter]);

  return (
    <section className="bg-[#F5F5F0] py-16 sm:py-24 border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald">
            All Testimonials
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-navy-dark mt-2 mb-3">
            What Our Students Say
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Honest reflections from successful candidates who trained with our faculty.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-3 mb-10 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedFilter(tab)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                selectedFilter === tab
                  ? "bg-navy-dark text-white shadow-sm"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Testimonials 2-Column Grid */}
        {filtered.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => {
                const initials = (item.student_name || "TN")
                  .replace(/[\[\]]/g, "")
                  .split(" ")
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((p) => p[0])
                  .join("")
                  .toUpperCase();

                const isCivilJudge =
                  item.course_name?.toLowerCase().includes("civil judge") ||
                  item.current_post?.toLowerCase().includes("civil judge");

                const courseBadge = isCivilJudge
                  ? "⭐ Civil Judge"
                  : "⭐ APP";

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="relative bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden"
                  >
                    {/* Top tags row */}
                    <div className="flex items-center justify-between mb-4">
                      {/* Top-left: Featured Tag if is_featured */}
                      {item.is_featured ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-[11px] font-bold tracking-wide">
                          Featured
                        </span>
                      ) : (
                        <div />
                      )}

                      {/* Top-right: Course Badge */}
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-navy-tint text-navy-dark border border-navy-light/30 text-[11px] font-semibold">
                        {courseBadge}
                      </span>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < (item.rating || 5)
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-200"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Quote Content */}
                    <div className="mb-6 flex-1">
                      <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>

                    {/* Author Meta Row */}
                    <div className="flex items-center gap-3.5 pt-5 border-t border-slate-100">
                      <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 bg-navy-mid/10 border border-emerald/30 flex items-center justify-center font-bold text-navy-dark text-sm">
                        {item.photo_url ? (
                          <Image
                            src={item.photo_url}
                            alt={item.student_name}
                            width={44}
                            height={44}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <span>{initials}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-navy-dark text-sm sm:text-base">
                          {item.student_name}
                        </h4>
                        <p className="text-emerald text-xs sm:text-sm font-semibold">
                          {item.current_post}
                        </p>
                        <p className="text-slate-500 text-xs">
                          {[item.college, item.batch_year && `Batch ${item.batch_year}`]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-base sm:text-lg text-navy-dark mb-1">
              No testimonials found for this filter.
            </h4>
            <p className="text-slate-500 text-xs sm:text-sm mb-6">
              Try selecting another category or view all reviews.
            </p>
            <button
              type="button"
              onClick={() => setSelectedFilter("All")}
              className="px-5 py-2.5 rounded-full bg-navy-dark text-white text-xs font-semibold hover:bg-navy-mid transition-colors"
            >
              View All
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default TextTestimonialsGrid;
