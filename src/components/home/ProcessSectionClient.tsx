"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ProcessSectionClientProps {
  steps: ProcessStep[];
}

export function ProcessSectionClient({ steps }: ProcessSectionClientProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section
      id="process"
      ref={containerRef}
      className="py-14 md:py-20 bg-[#F5F5F0] relative overflow-hidden"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="How It Works"
          title="Your Journey from Aspirant to Civil Judge"
          subtitle="Five clear steps. Personal guidance at every stage. No guesswork."
          align="center"
        />

        {/* ======================================================== */}
        {/* DESKTOP TIMELINE (Horizontal, md and above) */}
        {/* ======================================================== */}
        <div className="hidden md:block relative mt-16 mb-20 max-w-5xl mx-auto">
          {/* Timeline Connector Lines Container */}
          <div className="absolute top-[76px] left-[10%] right-[10%] h-[2px] z-0 pointer-events-none">
            {/* Base line */}
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
              className="w-full h-full bg-[#E6F1FB]"
            />
            {/* Emerald progress line */}
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.0, ease: "easeInOut", delay: 0.6 }}
              className="w-full h-full bg-[#1D9E75] absolute top-0 left-0"
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-5 gap-4 relative z-10">
            {steps.map((item, index) => {
              const isFirst = item.step === 1;
              const isCompleted = item.step === 1 || item.step === 2;
              const isHovered = hoveredStep === item.step;

              return (
                <div
                  key={item.step}
                  className="flex flex-col items-center text-center relative group cursor-pointer"
                  onMouseEnter={() => setHoveredStep(item.step)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  {/* Fixed 40px Header Space for "Start here" tag & Tooltip */}
                  <div className="h-10 flex items-end justify-center mb-2 relative w-full">
                    {/* Step 1 "Start here" tag */}
                    {isFirst && (
                      <motion.span
                        initial={{ opacity: 0, y: -6 }}
                        animate={
                          isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }
                        }
                        transition={{ duration: 0.4, delay: 0.4 }}
                        className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#1D9E75] text-white text-[10px] font-bold tracking-wider uppercase shadow-sm"
                      >
                        Start here
                      </motion.span>
                    )}

                    {/* Interactive Hover Tooltip */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.95 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute -top-12 z-30 bg-[#042C53] text-white rounded-lg px-3 py-2 text-[12px] shadow-2xl pointer-events-none w-48 text-center leading-snug border border-white/10"
                        >
                          {item.description}
                          {/* Tooltip Downward Arrow */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#042C53]" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Step Circle (56px x 56px) */}
                  <div className="relative">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={
                        isInView
                          ? { scale: isHovered ? 1.1 : 1, opacity: 1 }
                          : { scale: 0, opacity: 0 }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.2 + index * 0.15,
                      }}
                      className={`w-14 h-14 rounded-full flex items-center justify-center font-heading font-bold text-[20px] text-white transition-colors duration-300 shadow-md ${
                        isFirst
                          ? "bg-[#1D9E75] ring-4 ring-[#1D9E75]/25"
                          : isHovered
                          ? "bg-[#1D9E75]"
                          : "bg-[#042C53]"
                      }`}
                    >
                      {item.step}
                    </motion.div>

                    {/* Checkmark overlay for completed steps (1 & 2) */}
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          delay: 0.5 + index * 0.15,
                        }}
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#1D9E75] text-white flex items-center justify-center shadow-md border-2 border-white pointer-events-none"
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </motion.div>
                    )}
                  </div>

                  {/* Step Content Below Circle */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
                    }
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + index * 0.15,
                      ease: "easeOut",
                    }}
                    className="mt-4 flex flex-col items-center"
                  >
                    <h3
                      className={`font-heading font-bold text-[16px] transition-colors duration-200 ${
                        isFirst || isHovered
                          ? "text-[#1D9E75]"
                          : "text-[#042C53]"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="font-sans text-[13px] text-slate-600 leading-[1.6] max-w-[140px] mt-1.5">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* MOBILE TIMELINE (Vertical, below md) */}
        {/* ======================================================== */}
        <div className="block md:hidden relative mt-12 mb-16 pl-2 pr-4">
          {/* Vertical Connector Line */}
          <div className="absolute top-7 bottom-7 left-[35px] w-[2px] z-0 pointer-events-none">
            {/* Base line */}
            <motion.div
              initial={{ scaleY: 0, originY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
              className="w-full h-full bg-[#E6F1FB]"
            />
            {/* Emerald line */}
            <motion.div
              initial={{ scaleY: 0, originY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.0, ease: "easeInOut", delay: 0.6 }}
              className="w-full h-full bg-[#1D9E75] absolute top-0 left-0"
            />
          </div>

          {/* Steps List */}
          <div className="space-y-8 relative z-10">
            {steps.map((item, index) => {
              const isFirst = item.step === 1;
              const isCompleted = item.step === 1 || item.step === 2;
              const isHovered = hoveredStep === item.step;

              return (
                <div
                  key={item.step}
                  className="flex items-start gap-4 relative group"
                  onClick={() =>
                    setHoveredStep(hoveredStep === item.step ? null : item.step)
                  }
                >
                  {/* Step Circle Container */}
                  <div className="relative shrink-0">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={
                        isInView
                          ? { scale: isHovered ? 1.08 : 1, opacity: 1 }
                          : { scale: 0, opacity: 0 }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.2 + index * 0.12,
                      }}
                      className={`w-14 h-14 rounded-full flex items-center justify-center font-heading font-bold text-[20px] text-white shadow-md transition-colors duration-300 ${
                        isFirst
                          ? "bg-[#1D9E75] ring-4 ring-[#1D9E75]/25"
                          : isHovered
                          ? "bg-[#1D9E75]"
                          : "bg-[#042C53]"
                      }`}
                    >
                      {item.step}
                    </motion.div>

                    {/* Checkmark overlay for completed steps */}
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          delay: 0.4 + index * 0.12,
                        }}
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#1D9E75] text-white flex items-center justify-center shadow-md border-2 border-white pointer-events-none"
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </motion.div>
                    )}
                  </div>

                  {/* Step Text */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                    }
                    transition={{
                      duration: 0.45,
                      delay: 0.35 + index * 0.12,
                      ease: "easeOut",
                    }}
                    className="flex-1 pt-1"
                  >
                    <div className="flex items-center gap-2">
                      <h3
                        className={`font-heading font-bold text-[16px] transition-colors duration-200 ${
                          isFirst || isHovered
                            ? "text-[#1D9E75]"
                            : "text-[#042C53]"
                        }`}
                      >
                        {item.title}
                      </h3>
                      {isFirst && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#1D9E75] text-white text-[10px] font-bold tracking-wider uppercase">
                          Start here
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-[13px] text-slate-600 leading-[1.6] mt-1">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* CTA ROW BELOW TIMELINE */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center mt-12 pt-4"
        >
          <span className="font-heading font-semibold text-base text-[#042C53]">
            Ready to start your journey?
          </span>

          <Link href="/demo-class">
            <button
              type="button"
              className="px-6 py-3 rounded-full bg-[#1D9E75] hover:bg-emerald-dark text-white text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <span>Book Free Demo Class</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>

          <span className="font-sans text-xs sm:text-sm text-slate-500">
            or call us at{" "}
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/[^0-9+]/g, "")}`}
              className="font-medium text-[#042C53] hover:text-[#1D9E75] transition-colors underline underline-offset-4"
            >
              {SITE_CONFIG.phone}
            </a>
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default ProcessSectionClient;
