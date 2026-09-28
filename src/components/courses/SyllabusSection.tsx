"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Download, Scale } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useWhatsApp } from "@/hooks/useWhatsApp";

export interface SyllabusStage {
  stage: string;
  tabLabel?: string;
  topics: string[];
}

export interface SyllabusSectionProps {
  courseTitle: string;
  syllabus: SyllabusStage[];
}

export function SyllabusSection({
  courseTitle,
  syllabus,
}: SyllabusSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const { openSyllabusRequest } = useWhatsApp();

  const handleDownloadPdf = () => {
    openSyllabusRequest(courseTitle);
  };


  return (
    <section className="py-20 bg-[#F5F5F0]" id="syllabus">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Course Syllabus"
          title={`Complete ${courseTitle} Syllabus — What XYZ Covers`}
          subtitle="Updated for the 2026 exam including comprehensive coverage of BNS, BNSS & BSA (new criminal laws effective July 2024)."
          align="center"
          eyebrowColor="emerald"
        />

        {/* Tab Navigation (Scrollable on mobile) */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 pb-3 mb-6 px-1">
          {syllabus.map((item, idx) => {
            const isActive = activeTab === idx;
            const label = item.tabLabel || item.stage;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`relative px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-navy-dark text-white shadow-md"
                    : "bg-white text-navy-dark border border-navy-mid/30 hover:bg-navy-tint/50"
                }`}
              >
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Content Area */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-sm max-w-4xl mx-auto min-h-[280px]">
          <div className="border-b border-black/[0.06] pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="font-heading font-bold text-lg sm:text-xl text-navy-dark">
              {syllabus[activeTab]?.stage}
            </h3>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-dark bg-emerald-tint px-3 py-1 rounded-full w-fit">
              {syllabus[activeTab]?.topics.length} Key Topics Covered
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-3.5"
            >
              {syllabus[activeTab]?.topics.map((topic, tIdx) => (
                <div
                  key={tIdx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald/40 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-charcoal leading-relaxed">
                    {topic}
                  </span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BNS / BNSS / BSA Highlight Box (Always Visible) */}
        <div className="bg-emerald-tint border border-emerald/40 rounded-2xl p-6 sm:p-7 max-w-4xl mx-auto mt-8 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-full bg-emerald text-white flex items-center justify-center shrink-0">
              <Scale className="w-4 h-4" />
            </div>
            <h4 className="font-heading font-bold text-base sm:text-lg text-emerald-dark">
              New Criminal Laws — July 2024 Update
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/80 p-3.5 rounded-xl border border-emerald/20 text-center">
              <span className="font-heading font-extrabold text-navy-dark text-base block">
                BNS
              </span>
              <span className="text-xs text-slate-700 font-medium">
                Replaces IPC · 358 Sections
              </span>
            </div>
            <div className="bg-white/80 p-3.5 rounded-xl border border-emerald/20 text-center">
              <span className="font-heading font-extrabold text-navy-dark text-base block">
                BNSS
              </span>
              <span className="text-xs text-slate-700 font-medium">
                Replaces CrPC · 531 Sections
              </span>
            </div>
            <div className="bg-white/80 p-3.5 rounded-xl border border-emerald/20 text-center">
              <span className="font-heading font-extrabold text-navy-dark text-base block">
                BSA
              </span>
              <span className="text-xs text-slate-700 font-medium">
                Replaces Evidence Act · 170 Sections
              </span>
            </div>
          </div>

          <span className="text-xs font-semibold text-emerald-dark mt-4 text-center block pt-3 border-t border-emerald/20">
            XYZ covers all three new criminal laws comprehensively in every
            batch with comparative provisions &amp; courtroom applications.
          </span>
        </div>

        {/* Download Syllabus CTA */}
        <div className="text-center mt-10">
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white border-2 border-navy-mid text-navy-dark font-bold text-sm hover:bg-navy-dark hover:border-navy-dark hover:text-white transition-all duration-200 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download Complete Syllabus PDF</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default SyllabusSection;
