import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { LeadForm } from "@/components/shared/LeadForm";
import { BatchTable } from "@/components/shared/BatchTable";
import { CheckCircle2, BookOpen, Clock, ShieldCheck, Award } from "lucide-react";
import { COURSES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Civil Judge Exam Coaching in Tamil Nadu | Prelims, Mains & Viva",
  description:
    "TNPSC Civil Judge coaching in Tamil Nadu with comprehensive coverage of BNS, BNSS, BSA, Tamil-to-English translation classes, and weekly mock exams.",
};

export default function CivilJudgePage() {
  const course = COURSES.find((c) => c.slug === "civil-judge")!;

  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy-mid bg-navy-tint rounded-full mb-3">
                {course.badge}
              </span>
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-navy-dark tracking-tight mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                {course.description}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border space-y-4">
              <h2 className="font-heading font-bold text-xl text-navy-dark">Key Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="font-heading font-bold text-2xl text-navy-dark">Comprehensive 3-Stage Syllabus</h2>
              <div className="space-y-4">
                <div className="p-5 border rounded-lg">
                  <h3 className="font-semibold text-navy-mid text-base mb-2">Stage 1: Preliminary Examination</h3>
                  <p className="text-sm text-slate-600">
                    Objective MCQ paper covering Civil Procedure Code, Indian Penal Code / BNS, Code of Criminal Procedure / BNSS, Indian Evidence Act / BSA, Constitution of India, and General Knowledge.
                  </p>
                </div>
                <div className="p-5 border rounded-lg">
                  <h3 className="font-semibold text-navy-mid text-base mb-2">Stage 2: Main Written Examination</h3>
                  <p className="text-sm text-slate-600">
                    Four descriptive papers: Translation Paper (Tamil to English &amp; English to Tamil), Law Paper I (Civil), Law Paper II (Criminal), and Judgment Writing / Framing of Issues and Charges.
                  </p>
                </div>
                <div className="p-5 border rounded-lg">
                  <h3 className="font-semibold text-navy-mid text-base mb-2">Stage 3: Viva-Voce Interview</h3>
                  <p className="text-sm text-slate-600">
                    Mock interview boards conducted by retired judges and senior advocates focusing on legal reasoning, case analysis, and court demeanor.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-heading font-bold text-2xl text-navy-dark mb-4">Batch Schedules</h2>
              <BatchTable />
            </div>
          </div>

          <div>
            <div className="sticky top-24">
              <LeadForm defaultCourse="civil-judge" source="civil-judge-course-page" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
