"use client";

import { Video, BookOpen, FileCheck, HelpCircle, Award, CheckCircle } from "lucide-react";

const BENEFITS = [
  {
    icon: Video,
    title: "60-Minute Live Lecture",
    description: "Experience a full-length live lecture covering a high-weightage topic, exactly as taught in our regular batches.",
  },
  {
    icon: Award,
    title: "Taught by Senior Advocates",
    description: "Learn directly from experienced practitioners with proven track records in guiding judicial aspirants.",
  },
  {
    icon: BookOpen,
    title: "Tamil-English Translation Sample",
    description: "Receive an exclusive sample translation sheet with legal terms frequently tested in the TNPSC Mains exam.",
  },
  {
    icon: FileCheck,
    title: "Model MCQ Practice Set",
    description: "Test your baseline knowledge with exam-level MCQs and learn our elimination and memory techniques.",
  },
  {
    icon: HelpCircle,
    title: "Interactive Q&A Session",
    description: "Get your personal doubts resolved regarding eligibility, exam pattern, new criminal laws, and preparation strategy.",
  },
  {
    icon: CheckCircle,
    title: "100% Free & No Obligation",
    description: "Attend the entire session with complete peace of mind. No payment details, no pushy sales, no commitment.",
  },
];

export function DemoBenefits() {
  return (
    <section className="py-16 sm:py-20 bg-[#F5F5F0]">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald px-3 py-1 rounded-full bg-emerald-tint mb-3">
            What to Expect
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy-dark">
            Inside Your 60-Minute Demo Session
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            We believe you should see exactly how we teach before you invest your time and money.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-tint text-emerald flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-navy-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
