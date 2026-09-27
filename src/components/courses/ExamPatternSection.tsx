"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Clock, Award } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

export interface ExamStage {
  name: string;
  description: string;
  marks: number;
  duration: string;
  details: string[];
}

export interface ExamPatternProps {
  examName: string;
  stages: ExamStage[];
  totalMarks: number;
  meritNote: string;
  eligibilityTitle?: string;
  eligibility?: {
    label: string;
    value: string;
    icon?: string;
  }[];
}

export function ExamPatternSection({
  examName,
  stages,
  totalMarks,
  meritNote,
  eligibilityTitle = "Eligibility for TNPSC Civil Judge Exam",
  eligibility = [
    { label: "Qualification", value: "LLB degree required", icon: "🎓" },
    { label: "Age Limit", value: "25 to 42 years", icon: "👤" },
    { label: "Min. Marks", value: "50% (45% reserved)", icon: "📊" },
    { label: "Language", value: "English + Tamil required", icon: "🗣" },
  ],
}: ExamPatternProps) {
  return (
    <section className="py-20 bg-white" id="exam-pattern">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Heading */}
        <SectionHeading
          eyebrow="Examination Structure"
          title={examName}
          subtitle={`Total evaluation marks across stages: ${totalMarks}. Understand the weightage and selection criteria to plan your preparation.`}
          align="center"
          eyebrowColor="emerald"
        />

        {/* 3 Stage Cards in a row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {stages.map((stage, idx) => {
            const isMains = idx === 1; // Stage 2 is Mains (Most Important)

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                  isMains
                    ? "bg-white border-2 border-emerald shadow-xl ring-4 ring-emerald/10 lg:-translate-y-2"
                    : "bg-white border border-black/[0.08] shadow-sm hover:shadow-md hover:border-navy-light/40"
                }`}
              >
                {/* Most Important Badge for Mains */}
                {isMains && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-0.5 rounded-full shadow-md z-10">
                    Most Important
                  </div>
                )}

                <div>
                  {/* Top Row: Stage Circle + Badges */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-full bg-navy-dark text-white flex items-center justify-center font-heading font-bold text-lg shrink-0 shadow-sm">
                      {idx + 1}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 bg-emerald-tint text-emerald-dark font-semibold text-xs px-2.5 py-1 rounded-full">
                        <Award className="w-3.5 h-3.5 text-emerald-dark" />
                        <span>{stage.marks} Marks</span>
                      </span>
                      <span className="inline-flex items-center gap-1 bg-navy-tint text-navy-mid font-semibold text-xs px-2.5 py-1 rounded-full">
                        <Clock className="w-3.5 h-3.5 text-navy-mid" />
                        <span>{stage.duration}</span>
                      </span>
                    </div>
                  </div>

                  {/* Stage Name & Description */}
                  <h3 className="font-heading font-bold text-lg text-navy-dark leading-snug">
                    {stage.name}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1 mb-5">
                    {stage.description}
                  </p>

                  {/* Bullet list of details */}
                  <div className="space-y-2.5 pt-4 border-t border-black/[0.06]">
                    {stage.details.map((detail, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-[13px] text-charcoal leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Merit Note Box */}
        <div className="bg-navy-dark text-white rounded-xl p-4 sm:p-5 max-w-6xl mx-auto mt-8 flex items-start sm:items-center gap-3.5 shadow-md border border-navy-mid/40">
          <AlertCircle className="w-5 h-5 text-gold shrink-0 mt-0.5 sm:mt-0" />
          <p className="font-sans text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
            <span className="text-amber-300 font-bold uppercase tracking-wider mr-1.5">
              Selection Rule:
            </span>
            {meritNote}
          </p>
        </div>

        {/* Eligibility Section Below Merit Note */}
        <div className="mt-12 pt-10 border-t border-black/[0.08]">
          <h3 className="font-heading font-bold text-xl text-navy-dark text-center mb-6">
            {eligibilityTitle}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {eligibility.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#F5F5F0] rounded-xl p-4 text-center border border-black/[0.04] shadow-xs hover:border-emerald/40 transition-colors"
              >
                {item.icon && (
                  <span className="text-2xl block mb-1">{item.icon}</span>
                )}
                <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                  {item.label}
                </span>
                <span className="text-sm font-bold text-navy-dark">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExamPatternSection;
