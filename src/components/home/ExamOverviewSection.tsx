"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertCircle, Scale, BookOpen, UserCheck, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useWhatsApp } from "@/hooks/useWhatsApp";

export function ExamOverviewSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });
  const { openCourseEnquiry } = useWhatsApp();

  const comparisonRows = [
    {
      feature: "Focus Area",
      civilJudge: "Civil Matters",
      appExam: "Criminal Cases",
    },
    {
      feature: "Translation Paper",
      civilJudge: "Yes (100 Marks)",
      civilJudgeHighlight: true,
      appExam: "No",
      appExamHighlight: false,
    },
    {
      feature: "GS Section",
      civilJudge: "Minimal",
      appExam: "75 Questions",
      appExamHighlight: true,
    },
    {
      feature: "Vacancies (2026)",
      civilJudge: "~50 posts",
      appExam: "61 posts",
      appExamHighlight: true,
    },
    {
      feature: "Salary",
      civilJudge: "₹88K–₹1.05L/mo",
      appExam: "Similar scale",
    },
    {
      feature: "XYZ Coverage",
      civilJudge: "Full",
      civilJudgeHighlight: true,
      appExam: "Full",
      appExamHighlight: true,
    },
  ];

  return (
    <section
      id="exam-overview"
      ref={containerRef}
      className="py-14 md:py-20 bg-white relative overflow-hidden"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Exam Overview"
          title="Know the Exam You Are Preparing For"
          subtitle="TNPSC conducts two primary judicial recruitment exams. Here is what you need to know before you start preparing."
          align="center"
        />

        {/* Two Detailed Exam Cards Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* CARD 1 — Civil Judge Exam */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="bg-white rounded-[16px] p-6 sm:p-7 border-[1.5px] border-[#185FA5] border-t-4 border-t-[#0C447C] shadow-[0_4px_24px_rgba(12,68,124,0.08)] hover:shadow-xl transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                  <h3 className="font-heading font-bold text-[20px] text-navy-dark leading-tight">
                    TNPSC Civil Judge Exam 2026
                  </h3>
                  <p className="text-[13px] text-slate-500 font-medium mt-1">
                    Tamil Nadu Judicial Service
                  </p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#E6F1FB] text-navy-dark text-[11px] font-semibold tracking-wide shrink-0">
                  ⚖ Official Exam
                </span>
              </div>

              {/* Three Exam Stages Chips */}
              <div className="space-y-2 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="rounded-lg bg-[#E6F1FB] text-navy-dark p-2.5 text-center text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#185FA5]/15">
                    <Scale className="w-3.5 h-3.5 text-[#0C447C] shrink-0" />
                    <span>Prelims · 100 MCQ · 100 Marks</span>
                  </div>
                  <div className="rounded-lg bg-[#E6F1FB] text-navy-dark p-2.5 text-center text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#185FA5]/15">
                    <BookOpen className="w-3.5 h-3.5 text-[#0C447C] shrink-0" />
                    <span>Mains · 4 Papers · 400 Marks</span>
                  </div>
                  <div className="rounded-lg bg-[#E6F1FB] text-navy-dark p-2.5 text-center text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#185FA5]/15">
                    <UserCheck className="w-3.5 h-3.5 text-[#0C447C] shrink-0" />
                    <span>Viva · Interview · 60 Marks</span>
                  </div>
                </div>
                <p className="text-[12px] text-slate-500 font-medium text-center sm:text-left">
                  Total: 560 Marks (Merit based on Mains + Viva)
                </p>
              </div>

              {/* 2x2 Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="bg-[#F8F8F5] rounded-lg p-3 border border-slate-100">
                  <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Eligibility
                  </span>
                  <span className="block text-[13px] text-[#444441] font-semibold leading-snug">
                    LLB Degree · 25–42 years · English &amp; Tamil proficiency
                  </span>
                </div>
                <div className="bg-[#F8F8F5] rounded-lg p-3 border border-slate-100">
                  <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Min. Marks
                  </span>
                  <span className="block text-[13px] text-[#444441] font-semibold leading-snug">
                    50% (45% for reserved categories)
                  </span>
                </div>
                <div className="bg-[#F8F8F5] rounded-lg p-3 border border-slate-100">
                  <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Salary (In-hand)
                  </span>
                  <span className="block text-[13px] text-[#1D9E75] font-bold leading-snug">
                    ₹88,000 – ₹1,05,000/month
                  </span>
                </div>
                <div className="bg-[#F8F8F5] rounded-lg p-3 border border-slate-100">
                  <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Conducted by
                  </span>
                  <span className="block text-[13px] text-[#444441] font-semibold leading-snug">
                    TNPSC under Madras High Court
                  </span>
                </div>
              </div>

              {/* New Laws Callout Inside Card */}
              <div className="bg-[#E1F5EE] border border-[#9FE1CB] rounded-lg p-[10px_14px] flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#1D9E75] shrink-0 mt-0.5" />
                <p className="text-[12px] text-[#0F6E56] font-medium leading-relaxed">
                  <strong className="font-bold">New Criminal Laws (from July 2024):</strong>{" "}
                  BNS replaces IPC · BNSS replaces CrPC · BSA replaces Evidence Act
                </p>
              </div>
            </div>

            {/* CTA Inside Card */}
            <div className="pt-4 mt-2">
              <button
                type="button"
                onClick={() => openCourseEnquiry("Civil Judge")}
                className="text-navy-dark hover:text-navy-mid font-semibold text-[13px] inline-flex items-center gap-1.5 hover:underline transition-colors cursor-pointer"
              >
                <span>Enquire for Civil Judge Coaching</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* CARD 2 — APP Exam */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="bg-white rounded-[16px] p-6 sm:p-7 border-[1.5px] border-[#1D9E75] border-t-4 border-t-[#0F6E56] shadow-[0_4px_24px_rgba(29,158,117,0.08)] hover:shadow-xl transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                  <h3 className="font-heading font-bold text-[20px] text-navy-dark leading-tight">
                    TNPSC APP Grade II Exam 2026
                  </h3>
                  <p className="text-[13px] text-slate-500 font-medium mt-1">
                    Assistant Public Prosecutor
                  </p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-tint text-emerald-dark text-[11px] font-semibold tracking-wide shrink-0 border border-emerald/20">
                  📋 61 Vacancies
                </span>
              </div>

              {/* Three Exam Stages Chips */}
              <div className="space-y-2 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="rounded-lg bg-emerald-tint text-emerald-dark p-2.5 text-center text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#1D9E75]/20">
                    <Scale className="w-3.5 h-3.5 text-[#0F6E56] shrink-0" />
                    <span>Prelims · 200 MCQ · 200 Marks</span>
                  </div>
                  <div className="rounded-lg bg-emerald-tint text-emerald-dark p-2.5 text-center text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#1D9E75]/20">
                    <BookOpen className="w-3.5 h-3.5 text-[#0F6E56] shrink-0" />
                    <span>Mains · Descriptive · Law + GS</span>
                  </div>
                  <div className="rounded-lg bg-emerald-tint text-emerald-dark p-2.5 text-center text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#1D9E75]/20">
                    <UserCheck className="w-3.5 h-3.5 text-[#0F6E56] shrink-0" />
                    <span>Interview · Personality Test</span>
                  </div>
                </div>
                <p className="text-[12px] text-slate-500 font-medium text-center sm:text-left">
                  3 Stages: Prelims (Objective) + Mains (Descriptive) + Oral Test
                </p>
              </div>

              {/* 2x2 Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="bg-[#F8F8F5] rounded-lg p-3 border border-slate-100">
                  <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Eligibility
                  </span>
                  <span className="block text-[13px] text-[#444441] font-semibold leading-snug">
                    LLB Degree · Age limit per notification
                  </span>
                </div>
                <div className="bg-[#F8F8F5] rounded-lg p-3 border border-slate-100">
                  <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Prelims Pattern
                  </span>
                  <span className="block text-[13px] text-[#444441] font-semibold leading-snug">
                    100 Law + 75 GS + 25 Aptitude = 200 Questions
                  </span>
                </div>
                <div className="bg-[#F8F8F5] rounded-lg p-3 border border-slate-100">
                  <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Vacancies
                  </span>
                  <span className="block text-[13px] text-[#1D9E75] font-bold leading-snug">
                    61 Posts (2026 Notification)
                  </span>
                </div>
                <div className="bg-[#F8F8F5] rounded-lg p-3 border border-slate-100">
                  <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Conducted by
                  </span>
                  <span className="block text-[13px] text-[#444441] font-semibold leading-snug">
                    Tamil Nadu Public Service Commission
                  </span>
                </div>
              </div>

              {/* New Laws Callout Inside Card */}
              <div className="bg-[#E1F5EE] border border-[#9FE1CB] rounded-lg p-[10px_14px] flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#1D9E75] shrink-0 mt-0.5" />
                <p className="text-[12px] text-[#0F6E56] font-medium leading-relaxed">
                  <strong className="font-bold">New Criminal Laws (from July 2024):</strong>{" "}
                  BNS replaces IPC · BNSS replaces CrPC · BSA replaces Evidence Act
                </p>
              </div>
            </div>

            {/* CTA Inside Card */}
            <div className="pt-4 mt-2">
              <button
                type="button"
                onClick={() => openCourseEnquiry("APP Exam")}
                className="text-[#0F6E56] hover:text-[#1D9E75] font-semibold text-[13px] inline-flex items-center gap-1.5 hover:underline transition-colors cursor-pointer"
              >
                <span>Enquire for APP Exam Coaching</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Comparing Section Below Cards */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="mt-12"
        >
          <h4 className="font-heading font-bold text-[13px] uppercase tracking-wider text-navy-dark mb-3">
            Civil Judge vs APP — Quick Comparison
          </h4>

          <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13px] font-sans min-w-[500px]">
              <thead>
                <tr className="bg-[#042C53] text-white">
                  <th className="py-3.5 px-4 font-semibold">Feature</th>
                  <th className="py-3.5 px-4 font-semibold">Civil Judge</th>
                  <th className="py-3.5 px-4 font-semibold">APP Exam</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, idx) => (
                  <tr
                    key={row.feature}
                    className={idx % 2 === 0 ? "bg-white" : "bg-[#F0F7FD]"}
                  >
                    <td className="py-3 px-4 font-medium text-slate-800 border-t border-slate-100">
                      {row.feature}
                    </td>
                    <td className="py-3 px-4 text-slate-700 border-t border-slate-100">
                      {row.civilJudgeHighlight ? (
                        <span className="inline-flex items-center gap-1 font-semibold text-[#1D9E75]">
                          <span>✅</span> {row.civilJudge}
                        </span>
                      ) : (
                        row.civilJudge
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-700 border-t border-slate-100">
                      {row.appExamHighlight ? (
                        <span className="inline-flex items-center gap-1 font-semibold text-[#1D9E75]">
                          <span>✅</span> {row.appExam}
                        </span>
                      ) : row.appExam === "No" ? (
                        <span className="inline-flex items-center gap-1 font-medium text-slate-400">
                          <span className="text-red-500">❌</span> No
                        </span>
                      ) : (
                        row.appExam
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ExamOverviewSection;
