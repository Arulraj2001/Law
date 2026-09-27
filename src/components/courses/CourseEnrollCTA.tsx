"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MessageSquare, ArrowRight } from "lucide-react";
import { LeadForm } from "@/components/shared/LeadForm";
import { COURSES } from "@/lib/constants";
import Link from "next/link";

export interface CourseEnrollCTAProps {
  courseTitle: string;
  courseSlug: string;
  defaultCourseName?: string;
  subText?: string;
}

export function CourseEnrollCTA({
  courseTitle,
  courseSlug,
  defaultCourseName = "Civil Judge Exam Coaching",
  subText = "Join the coaching programme that has produced 25+ Civil Judges across Tamil Nadu. Online and offline batches available.",
}: CourseEnrollCTAProps) {
  const courseOptions = COURSES.map((c) => c.title);

  const steps = [
    { number: "1", title: "Chat with us on WhatsApp", desc: "Get all batch timings, fees, and curriculum details." },
    { number: "2", title: "Attend a free demo class", desc: "Experience our practical teaching approach firsthand." },
    { number: "3", title: "Enrol in the next batch", desc: "Start your structured journey towards judicial service." },
  ];

  return (
    <section
      className="py-16 md:py-20 relative overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(135deg, #042C53 0%, #0C447C 60%, #185FA5 100%)",
      }}
      id="enroll"
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading and 3 Steps */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald text-white text-xs font-semibold tracking-wide">
              <span>🎓 Admissions Open</span>
            </span>

            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-white leading-tight tracking-tight">
              Start Your {courseTitle} Preparation Today
            </h2>

            <p className="font-sans text-base text-white/80 leading-relaxed max-w-lg">
              {subText}
            </p>

            {/* "What's next:" label */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider text-amber-300 font-bold block mb-4">
                What&apos;s Next:
              </span>

              <div className="space-y-4">
                {steps.map((step) => (
                  <div key={step.number} className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-heading font-bold text-sm text-white shrink-0">
                      {step.number}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-white">
                        {step.title}
                      </h4>
                      <p className="text-xs text-white/70 leading-relaxed mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reassurance link */}
            <div className="pt-4 border-t border-white/10 text-xs text-white/60">
              <span>Questions before enrolling? </span>
              <Link
                href="/faculty"
                className="text-emerald-light hover:underline font-semibold"
              >
                Learn more about our faculty &rarr;
              </Link>
            </div>
          </div>

          {/* Right Column: LeadForm in White Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-charcoal">
              <div className="mb-6">
                <h3 className="font-heading font-bold text-xl text-navy-dark">
                  Request Course Information
                </h3>
                <p className="font-sans text-xs text-slate-500 mt-1">
                  Fill in your details and our faculty counsellor will connect
                  with you within 2 hours.
                </p>
              </div>

              <LeadForm
                formType="enquiry"
                courseOptions={courseOptions}
                defaultCourse={defaultCourseName}
                source={`${courseSlug}-course-page`}
                buttonText="Send Enquiry"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseEnrollCTA;
