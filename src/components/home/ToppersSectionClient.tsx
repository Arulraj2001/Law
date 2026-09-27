"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TopperCard } from "@/components/shared/TopperCard";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

export interface TopperItem {
  id: string;
  name: string;
  post: string;
  course_name: string;
  college?: string | null;
  batch_year?: string | null;
  district?: string | null;
  photo_url?: string | null;
  quote?: string | null;
  rank?: string | null;
  is_featured?: boolean;
  sort_order?: number;
}

export interface ToppersSectionClientProps {
  toppers: TopperItem[];
}

export function ToppersSectionClient({ toppers }: ToppersSectionClientProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const filterOptions = ["All", "Civil Judge", "APP Exam"];

  const filteredToppers = toppers.filter((topper) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Civil Judge") {
      return (
        topper.post?.toLowerCase().includes("civil judge") ||
        topper.course_name?.toLowerCase().includes("civil judge")
      );
    }
    if (selectedFilter === "APP Exam") {
      return (
        topper.post?.toLowerCase().includes("app") ||
        topper.post?.toLowerCase().includes("prosecutor") ||
        topper.course_name?.toLowerCase().includes("app")
      );
    }
    return true;
  });

  const bannerQuote =
    "Every Civil Judge you see on this page sat in the same classroom you're considering today.";
  const bannerWords = bannerQuote.split(" ");

  const bannerContainerVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.15,
      },
    },
  };

  const bannerWordVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <section
      id="toppers"
      ref={sectionRef}
      className="pt-14 md:pt-20 pb-0 bg-white relative overflow-hidden"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Our Results"
          title="Our Students Are Now Serving as Judges Across Tamil Nadu"
          subtitle="These are not just numbers. These are real lawyers and fresh graduates who prepared here — and walk into courtrooms today."
          align="center"
        />

        {/* Results Counter Row (Above Grid) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[#042C53] rounded-2xl py-6 px-6 sm:px-8 max-w-4xl mx-auto mb-12 shadow-xl border border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
            {/* Stat 1 */}
            <div className="py-4 md:py-2 px-4 flex flex-col items-center justify-center">
              <AnimatedCounter
                value={25}
                suffix="+"
                className="text-3xl sm:text-[36px] text-[#1D9E75] font-extrabold leading-none"
              />
              <p className="text-xs sm:text-sm text-slate-200 font-medium mt-2">
                Civil Judges & APPs Selected
              </p>
            </div>

            {/* Stat 2 */}
            <div className="py-4 md:py-2 px-4 flex flex-col items-center justify-center">
              <AnimatedCounter
                value={100}
                suffix="%"
                className="text-3xl sm:text-[36px] text-[#1D9E75] font-extrabold leading-none"
              />
              <p className="text-xs sm:text-sm text-slate-200 font-medium mt-2">
                First-attempt success rate (2024 batch)
              </p>
            </div>

            {/* Stat 3 */}
            <div className="py-4 md:py-2 px-4 flex flex-col items-center justify-center">
              <AnimatedCounter
                value={8}
                suffix="+"
                className="text-3xl sm:text-[36px] text-[#1D9E75] font-extrabold leading-none"
              />
              <p className="text-xs sm:text-sm text-slate-200 font-medium mt-2">
                Tamil Nadu Districts Represented
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filter Tabs by Course */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-10">
          {filterOptions.map((filter) => {
            const isActive = selectedFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                className={`relative px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-[#042C53] text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-navy-dark"
                }`}
              >
                <span>{filter}</span>
                {isActive && (
                  <motion.div
                    layoutId="topperFilterActive"
                    className="absolute inset-0 rounded-full border-2 border-emerald pointer-events-none"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Toppers Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredToppers.map((topper, index) => (
              <motion.div
                key={topper.id}
                layout
                initial={{ opacity: 0, y: 30, rotateX: 10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="h-full rounded-2xl hover:shadow-xl transition-shadow duration-300"
                style={{ perspective: 1000 }}
              >
                <TopperCard topper={topper} index={index} variant="featured" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* "View All Results" CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center text-center mt-14 mb-16 space-y-4"
        >
          <p className="text-sm text-slate-600 max-w-lg">
            Showing featured selections. View complete results page for all{" "}
            <span className="font-semibold text-navy-dark">[25+]</span>{" "}
            successful students.
          </p>

          <Link href="/results">
            <button
              type="button"
              className="px-6 py-3 rounded-full bg-[#042C53] hover:bg-navy-mid text-white text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <span>View All Toppers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Achievement Banner (Full Width, Below CTA) */}
      <div
        className="w-full py-10 px-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0F6E56 0%, #1D9E75 100%)",
        }}
      >
        {/* Decorative Quote Mark */}
        <span className="absolute -top-4 left-6 sm:left-16 text-[80px] font-serif font-black text-white/20 select-none pointer-events-none">
          &ldquo;
        </span>

        <div className="container max-w-4xl mx-auto text-center relative z-10">
          <motion.h3
            variants={bannerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="font-heading font-semibold text-[18px] sm:text-[22px] md:text-[24px] text-white max-w-[700px] mx-auto leading-relaxed"
          >
            {bannerWords.map((word, i) => (
              <motion.span
                key={i}
                variants={bannerWordVariants}
                className="inline-block mr-1.5"
              >
                {word}
              </motion.span>
            ))}
          </motion.h3>

          <p className="text-xs sm:text-sm text-white/70 font-medium mt-3">
            — {SITE_CONFIG.name}, Tamil Nadu
          </p>
        </div>
      </div>
    </section>
  );
}

export default ToppersSectionClient;
