import type { Metadata } from "next";
import { LeadForm } from "@/components/shared/LeadForm";
import { BatchTable } from "@/components/shared/BatchTable";
import { CheckCircle2 } from "lucide-react";
import { COURSES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "SET Law Coaching Tamil Nadu | State Eligibility Test Preparation",
  description:
    "Preparation for the Tamil Nadu State Eligibility Test (TN-SET) in Law. Tailored for law postgraduates targeting assistant professorship.",
};

export default function SETLawPage() {
  const course = COURSES.find((c) => c.slug === "set-law")!;

  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold bg-gold-light/20 rounded-full mb-3">
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
              <h2 className="font-heading font-bold text-2xl text-navy-dark">Tamil Nadu SET Curriculum</h2>
              <div className="space-y-4">
                <div className="p-5 border rounded-lg">
                  <h3 className="font-semibold text-navy-mid text-base mb-2">Paper I: General Teaching &amp; Research Paper</h3>
                  <p className="text-sm text-slate-600">
                    50 objective questions evaluating teaching aptitude, reasoning skills, data interpretation, and ICT fundamentals.
                  </p>
                </div>
                <div className="p-5 border rounded-lg">
                  <h3 className="font-semibold text-navy-mid text-base mb-2">Paper II: Law Subjects</h3>
                  <p className="text-sm text-slate-600">
                    State SET specific pattern covering Constitutional Law, Jurisprudence, Family Law, Contracts, Torts, and Criminal Law.
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
              <LeadForm defaultCourse="set-law" source="set-law-course-page" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
