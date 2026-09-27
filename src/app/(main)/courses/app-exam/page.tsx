import type { Metadata } from "next";
import { LeadForm } from "@/components/shared/LeadForm";
import { BatchTable } from "@/components/shared/BatchTable";
import { CheckCircle2 } from "lucide-react";
import { COURSES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "APP Exam Coaching Tamil Nadu | TNPSC Assistant Public Prosecutor",
  description:
    "TNPSC APP Grade II exam preparation: Criminal law (BNS, BNSS, BSA), General Studies, Aptitude, descriptive answer writing, and interview practice.",
};

export default function APPExamPage() {
  const course = COURSES.find((c) => c.slug === "app-exam")!;

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
              <h2 className="font-heading font-bold text-2xl text-navy-dark">TNPSC APP Grade II Scheme</h2>
              <div className="space-y-4">
                <div className="p-5 border rounded-lg">
                  <h3 className="font-semibold text-navy-mid text-base mb-2">Preliminary Examination (200 Questions)</h3>
                  <p className="text-sm text-slate-600">
                    175 objective questions in Law focusing on Indian Criminal Laws (BNS, BNSS, BSA) and special acts, plus 25 questions in Aptitude and Mental Ability.
                  </p>
                </div>
                <div className="p-5 border rounded-lg">
                  <h3 className="font-semibold text-navy-mid text-base mb-2">Main Written Examination (4 Papers)</h3>
                  <p className="text-sm text-slate-600">
                    Law Paper I, Law Paper II, Law Paper III, and Law Paper IV covering procedural law, substantive penal statutes, and trial advocacy answers.
                  </p>
                </div>
                <div className="p-5 border rounded-lg">
                  <h3 className="font-semibold text-navy-mid text-base mb-2">Oral Interview</h3>
                  <p className="text-sm text-slate-600">
                    Testing trial preparedness, ethical standards, forensic appreciation, and courtroom demeanor.
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
              <LeadForm defaultCourse="app-exam" source="app-exam-course-page" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
