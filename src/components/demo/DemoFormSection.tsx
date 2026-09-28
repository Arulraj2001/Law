"use client";

import { useRouter } from "next/navigation";
import { LeadForm } from "@/components/shared/LeadForm";
import { COURSES } from "@/lib/constants";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { track } from "@/lib/analytics";
import { ShieldCheck, Zap, GraduationCap, Quote } from "lucide-react";

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.828z" />
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.179L2 22l4.957-1.399C8.423 21.493 10.155 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.697 0-3.272-.512-4.588-1.39l-.329-.222-2.943.83.829-2.883-.238-.344C3.805 14.802 3.273 13.442 3.273 12c0-4.811 3.916-8.727 8.727-8.727 4.812 0 8.727 3.916 8.727 8.727 0 4.811-3.915 8.727-8.727 8.727z" />
    </svg>
  );
}

export function DemoFormSection() {
  const router = useRouter();
  const { openDemoClass } = useWhatsApp();

  const handleSuccess = (course?: string) => {
    track.demoClassBook(course);
    const query = new URLSearchParams({ type: "demo" });
    if (course) {
      query.set("course", course);
    }
    router.push(`/thank-you?${query.toString()}`);
  };


  return (
    <section id="demo-form" className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT: Form (55% on desktop = col-span-7) */}
          <div className="lg:col-span-7 order-1">
            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-[0_4px_32px_rgba(0,0,0,0.08)]">
              <div className="mb-6">
                <h2 className="font-heading text-2xl sm:text-[24px] font-bold text-navy-dark">
                  📝 Register for Free Demo Class
                </h2>
                <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
                  Fill in your details and we will contact you within 2 hours to confirm your demo class slot.
                </p>
              </div>

              <LeadForm
                formType="demo_class"
                courseOptions={COURSES.map((c) => c.title)}
                buttonText="Book My Free Demo Class"
                buttonVariant="primary"
                source="demo_page"
                onSuccess={handleSuccess}
                className="p-0 border-0 shadow-none !space-y-4"
              />

              {/* Trust signals */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald" />
                  Your info is private
                </span>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  2-hour WhatsApp response
                </span>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-navy-mid" />
                  Free — no hidden charges
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Info (45% on desktop = col-span-5) */}
          <div className="lg:col-span-5 order-2 space-y-8">
            {/* Heading & 3 Steps */}
            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-navy-dark mb-6">
                What Happens After You Register?
              </h3>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald text-white flex items-center justify-center font-bold font-heading text-base shrink-0 shadow-sm shadow-emerald/30">
                    1
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-bold text-navy-dark">
                      We contact you on WhatsApp
                    </h4>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      Usually within 2 hours of registration. We will confirm your preferred date, time and mode (online or offline).
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-navy-dark text-white flex items-center justify-center font-bold font-heading text-base shrink-0 shadow-sm shadow-navy-dark/30">
                    2
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-bold text-navy-dark">
                      Attend your free demo class
                    </h4>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      A full 60-minute class covering a key topic from your chosen course — taught exactly as our regular batches are conducted.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald text-white flex items-center justify-center font-bold font-heading text-base shrink-0 shadow-sm shadow-emerald/30">
                    3
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-bold text-navy-dark">
                      Decide with clarity
                    </h4>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      No pressure. If you feel XYZ is the right fit, you can enrol. If not, the demo is still completely yours — no questions asked.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mini-Stats */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
              <div>
                <p className="font-heading text-xl sm:text-2xl font-extrabold text-emerald">500+</p>
                <p className="text-xs text-slate-500 mt-0.5">Demo classes conducted</p>
              </div>
              <div className="border-x border-slate-200">
                <p className="font-heading text-xl sm:text-2xl font-extrabold text-emerald">92%</p>
                <p className="text-xs text-slate-500 mt-0.5">Demo attendees who enrolled</p>
              </div>
              <div>
                <p className="font-heading text-xl sm:text-2xl font-extrabold text-emerald">48 hrs</p>
                <p className="text-xs text-slate-500 mt-0.5">Max response time</p>
              </div>
            </div>

            {/* Testimonial Quote Mini-Card */}
            <div className="p-5 rounded-xl bg-navy-tint/60 border-l-[3px] border-navy-dark text-navy-dark relative">
              <Quote className="w-5 h-5 text-navy-mid/40 mb-2" />
              <p className="text-sm italic font-medium leading-relaxed text-slate-800">
                &ldquo;I attended the free demo and enrolled the same day. That class alone was more valuable than months of self-study.&rdquo;
              </p>
              <p className="text-xs font-semibold text-navy-dark mt-2.5">
                — Judge Sundaram M., Civil Judge, Chennai District
              </p>
            </div>

            {/* WhatsApp Alternative */}
            <div className="pt-2">
              <p className="text-xs text-slate-500 mb-2 font-medium">Prefer to talk first?</p>
              <button
                type="button"
                onClick={() => openDemoClass()}
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-sm transition-all duration-200 shadow-sm shadow-[#25D366]/30 cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
