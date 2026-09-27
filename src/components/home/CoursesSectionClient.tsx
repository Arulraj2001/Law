"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CourseCard } from "@/components/shared/CourseCard";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { staggerContainer } from "@/hooks/useScrollAnimation";

export interface CoursesSectionClientProps {
  courses: any[];
}

export function CoursesSectionClient({ courses }: CoursesSectionClientProps) {
  const [activeTab, setActiveTab] = useState<"all" | "primary" | "secondary">("all");
  const { openChat } = useWhatsApp();

  const tabs: { id: "all" | "primary" | "secondary"; label: string }[] = [
    { id: "all", label: "All Courses" },
    { id: "primary", label: "Primary Focus" },
    { id: "secondary", label: "Secondary" },
  ];

  // Filtering logic
  const filteredCourses = courses.filter((course) => {
    const badgeColor = course.badge_color || course.badgeColor || "navy";
    if (activeTab === "primary") {
      return badgeColor === "navy";
    }
    if (activeTab === "secondary") {
      return badgeColor === "emerald" || badgeColor === "gold";
    }
    return true;
  });

  const handlePrimaryEnquiry = () => {
    openChat(
      "Hi, I'd like to enquire about your primary programmes: Civil Judge & APP Exam coaching. Please share the syllabus, schedule, and fee details."
    );
  };

  return (
    <section id="courses" className="py-20 md:py-24 bg-white relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Our Courses"
          title="Coaching for Every Law Exam in Tamil Nadu"
          subtitle="Six focused programmes — from TNPSC Civil Judge and APP Exam to Patent Agent, Trademark Agent, UGC-NET Law and SET Law."
          align="center"
          eyebrowColor="emerald"
        />

        {/* Tab Filter Bar */}
        <div className="flex items-center justify-center mb-12">
          <div className="inline-flex items-center p-1.5 rounded-full bg-slate-100 border border-slate-200/80 gap-1.5 overflow-x-auto max-w-full">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "text-white"
                      : "text-navy-dark hover:text-navy-mid hover:bg-white/60"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="courseTabIndicator"
                      className="absolute inset-0 rounded-full bg-navy-dark shadow-sm"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Course Grid with AnimatePresence */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, idx) => (
              <motion.div
                key={course.id || course.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="h-full"
              >
                <CourseCard course={course} index={idx} variant="home" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Primary Courses Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-12 rounded-xl p-5 sm:p-6 bg-navy-tint border border-navy-light/40 border-l-4 border-l-emerald shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
        >
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white text-navy-dark border border-navy-light/20 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Most Popular</span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-navy-dark/90 leading-relaxed font-medium">
              Civil Judge &amp; APP Exam coaching are our primary programmes with
              25+ successful selections. These courses include exclusive
              Tamil-to-English translation classes not available anywhere else.
            </p>
          </div>

          <button
            type="button"
            onClick={handlePrimaryEnquiry}
            className="shrink-0 px-6 py-3 rounded-full bg-emerald hover:bg-emerald-dark text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-colors flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
          >
            <span>Enquire for Primary Courses</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default CoursesSectionClient;
