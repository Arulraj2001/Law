import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { LeadForm } from "@/components/shared/LeadForm";
import { CheckCircle2, Video, Calendar, Clock, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Book Free Demo Class | XYZ Law Coaching",
  description:
    "Experience our judiciary coaching methodology firsthand. Attend a free live demo class for TNPSC Civil Judge or APP Exam.",
};

export default function DemoClassPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 sm:px-8">
        <SectionHeading
          badge="No Obligation Trial"
          title="Experience Our Teaching Firsthand"
          subtitle="Join an upcoming live demo lecture conducted by senior advocates. Understand how we simplify complex statutes for the judiciary exam."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          <div className="space-y-8">
            <div className="p-6 rounded-xl bg-slate-50 border space-y-4">
              <h3 className="font-heading font-bold text-xl text-navy-dark">What You Receive in the Demo</h3>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <Video className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                  <span>2 hours of live interactive lecture on criminal &amp; civil law concepts</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                  <span>Sample Tamil-to-English legal translation study booklet</span>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                  <span>Model prelims MCQ paper with comprehensive explanations</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-navy-mid shrink-0 mt-0.5" />
                  <span>Doubt-clearing session with faculty at the end of class</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3 text-sm text-slate-600">
              <h4 className="font-semibold text-slate-900">How It Works:</h4>
              <p>1. Fill in your name, contact number, and target exam.</p>
              <p>2. Our academic counselor will WhatsApp you the class link &amp; batch schedule.</p>
              <p>3. Attend the live class from anywhere on mobile or laptop, or visit our centre in person.</p>
            </div>
          </div>

          <div>
            <LeadForm defaultCourse="civil-judge" source="demo-class-dedicated-page" />
          </div>
        </div>
      </div>
    </div>
  );
}
