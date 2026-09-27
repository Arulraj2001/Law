"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { TopperCard } from "@/components/shared/TopperCard";

export interface TopperItem {
  id: string;
  name: string;
  post: string;
  course_name: string;
  college?: string;
  batch_year?: string;
  district?: string;
  rank?: string;
  photo_url?: string | null;
  quote?: string;
  mode?: "Online Batch" | "Offline Batch";
  is_featured?: boolean;
  sort_order?: number;
}

interface TopperGridProps {
  toppers: TopperItem[];
}

export function TopperGrid({ toppers }: TopperGridProps) {
  // Filter States
  const [selectedExam, setSelectedExam] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All Years");
  const [selectedMode, setSelectedMode] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(12);

  const examOptions = ["All", "Civil Judge", "APP Exam"];
  const yearOptions = ["All Years", "2021", "2022", "2023", "2024", "2025-26"];
  const modeOptions = ["All", "Online Batch", "Offline Batch"];

  // Filter Logic
  const filteredToppers = useMemo(() => {
    return toppers.filter((topper) => {
      // Exam Filter
      if (selectedExam !== "All") {
        if (selectedExam === "Civil Judge") {
          const isCivilJudge =
            topper.post?.toLowerCase().includes("civil judge") ||
            topper.course_name?.toLowerCase().includes("civil judge");
          if (!isCivilJudge) return false;
        } else if (selectedExam === "APP Exam") {
          const isApp =
            topper.post?.toLowerCase().includes("app") ||
            topper.post?.toLowerCase().includes("prosecutor") ||
            topper.course_name?.toLowerCase().includes("app");
          if (!isApp) return false;
        }
      }

      // Year Filter
      if (selectedYear !== "All Years") {
        if (selectedYear === "2025-26") {
          if (topper.batch_year !== "2025" && topper.batch_year !== "2026") {
            return false;
          }
        } else {
          if (topper.batch_year !== selectedYear) return false;
        }
      }

      // Mode Filter
      if (selectedMode !== "All") {
        if (topper.mode && topper.mode !== selectedMode) return false;
      }

      return true;
    });
  }, [toppers, selectedExam, selectedYear, selectedMode]);

  const displayedToppers = filteredToppers.slice(0, visibleCount);

  return (
    <section className="bg-[#F5F5F0] py-16 sm:py-20 border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald">
            Our Selections
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-navy-dark mt-2 mb-3">
            Complete List of XYZ Law Coaching Toppers
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Every selection below is a real person — name, college, and current
            posting.
          </p>
        </div>

        {/* Filter Controls (3 rows) */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-10 space-y-6">
          {/* Row 1: Exam Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 w-24 shrink-0">
              Exam:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {examOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedExam(option)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    selectedExam === option
                      ? "bg-navy-dark text-white shadow-sm"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Row 2: Year Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 w-24 shrink-0">
              Year:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {yearOptions.map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => setSelectedYear(year)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                    selectedYear === year
                      ? "bg-emerald text-white shadow-xs"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Row 3: Mode Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 w-24 shrink-0">
              Batch:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {modeOptions.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setSelectedMode(mode)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                    selectedMode === mode
                      ? "bg-navy-mid text-white shadow-xs"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result Count Display */}
        <div className="flex items-center justify-between mb-6 px-1">
          <span className="text-xs sm:text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-navy-dark">
              {displayedToppers.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-navy-dark">
              {filteredToppers.length}
            </span>{" "}
            selections
          </span>

          {(selectedExam !== "All" ||
            selectedYear !== "All Years" ||
            selectedMode !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSelectedExam("All");
                setSelectedYear("All Years");
                setSelectedMode("All");
              }}
              className="text-xs text-emerald font-semibold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Toppers Grid */}
        {displayedToppers.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {displayedToppers.map((topper, index) => (
                <motion.div
                  key={topper.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <TopperCard
                    topper={topper}
                    index={index}
                    variant="featured"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-md mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h4 className="font-heading font-bold text-lg text-navy-dark mb-1">
              No selections found for this filter
            </h4>
            <p className="text-slate-500 text-sm mb-6">
              Try a different combination of exam, year, or batch mode.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedExam("All");
                setSelectedYear("All Years");
                setSelectedMode("All");
              }}
              className="px-5 py-2.5 rounded-full bg-navy-dark text-white text-xs font-semibold hover:bg-navy-mid transition-colors"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {filteredToppers.length > visibleCount && (
          <div className="text-center mt-12">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="px-8 py-3 rounded-full border border-navy-dark text-navy-dark font-semibold text-sm hover:bg-navy-dark hover:text-white transition-all shadow-xs"
            >
              Load More Toppers
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default TopperGrid;
