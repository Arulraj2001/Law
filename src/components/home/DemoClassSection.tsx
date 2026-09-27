"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { COURSES, SITE_CONFIG } from "@/lib/constants";
import { LeadForm } from "@/components/shared/LeadForm";
import { useWhatsApp } from "@/hooks/useWhatsApp";

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.828z" />
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.179L2 22l4.957-1.399C8.423 21.493 10.155 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.697 0-3.272-.512-4.588-1.39l-.329-.222-2.943.83.829-2.883-.238-.344C3.805 14.802 3.273 13.442 3.273 12c0-4.811 3.916-8.727 8.727-8.727 4.812 0 8.727 3.916 8.727 8.727 0 4.811-3.915 8.727-8.727 8.727z" />
    </svg>
  );
}

export function DemoClassSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { openGeneralEnquiry } = useWhatsApp();

  const courseNames = COURSES.map((c) => c.title);

  const benefits = [
    "Experience our teaching style first-hand",
    "Get your syllabus questions answered by faculty",
    "See a real mock test question solved live",
    "Understand the exam pattern in 60 minutes",
    "No sales pressure — purely educational",
    "Online or offline — choose what suits you",
  ];

  return (
    <section
      id="demo-class"
      ref={containerRef}
      className="py-14 md:py-20 bg-[#F5F5F0] relative overflow-hidden"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* FORM COLUMN: Left on desktop (58% -> col-span-7), below benefits on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -35 }}
            transition={{ duration: 0.7, delay: 0, ease: "easeOut" }}
            className="w-full order-2 lg:order-1 lg:col-span-7"
          >
            {/* Top Pill Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#1D9E75] text-white text-xs font-bold tracking-wide shadow-sm">
                🎓 Free Demo Class — No Payment Required
              </span>
            </div>

            {/* Heading & Sub-heading */}
            <h2 className="font-heading font-extrabold text-[26px] sm:text-[32px] text-navy-dark leading-[1.2] tracking-tight">
              Experience Our Teaching Before You Enrol
            </h2>

            <p className="font-sans text-sm sm:text-base text-slate-600 mt-2.5 mb-6 leading-relaxed">
              One class. No commitment. See if we are the right fit for you — before you decide.
            </p>

            {/* Form Container or Success State */}
            <div className="bg-white rounded-[16px] p-6 sm:p-7 border border-black/[0.08] shadow-[0_4px_32px_rgba(0,0,0,0.06)]">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  /* Success Card */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className="py-8 px-4 text-center flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-tint flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-10 h-10 text-[#1D9E75]" />
                    </div>

                    <h3 className="font-heading font-extrabold text-2xl text-navy-dark">
                      You&apos;re booked! 🎉
                    </h3>

                    <p className="font-sans text-sm text-slate-600 max-w-md mt-2 mb-6 leading-relaxed">
                      We&apos;ll contact you within 2 hours on WhatsApp to confirm your demo class slot.
                    </p>

                    <div className="w-full pt-4 border-t border-slate-100 flex flex-col items-center">
                      <p className="text-xs text-slate-500 mb-3 font-medium">
                        In the meantime, join our WhatsApp channel for exam updates:
                      </p>

                      <a
                        href={SITE_CONFIG.social.whatsappChannel}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1D9E75] hover:bg-emerald-dark text-white text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer"
                      >
                        <span>Join WhatsApp Channel</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  /* Lead Form */
                  <motion.div key="form">
                    <LeadForm
                      formType="demo_class"
                      courseOptions={courseNames}
                      buttonText="Book My Free Demo Class"
                      buttonVariant="primary"
                      onSuccess={() => setIsSubmitted(true)}
                      className="p-0 border-0 shadow-none"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* BENEFITS COLUMN: Right on desktop (42% -> col-span-5), top on mobile */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 35 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="w-full order-1 lg:order-2 lg:col-span-5 space-y-6"
          >
            <div>
              <h3 className="font-heading font-bold text-[22px] text-navy-dark leading-tight">
                What You Get in the Free Demo
              </h3>
            </div>

            {/* 6 Benefit Rows */}
            <div className="space-y-3.5">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: 15 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 15 }
                  }
                  transition={{
                    duration: 0.45,
                    delay: 0.3 + index * 0.08,
                    ease: "easeOut",
                  }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#1D9E75] shrink-0 mt-0.5" />
                  <span className="font-sans text-sm sm:text-[15px] text-slate-700 leading-snug">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Testimonial Mini-Quote */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
              className="rounded-xl p-4 sm:p-5 bg-[#E6F1FB] border-l-4 border-l-[#0C447C] shadow-xs"
            >
              <p className="font-sans text-xs sm:text-sm italic text-navy-dark leading-relaxed">
                &ldquo;I attended the demo class and enrolled the very same day. That class alone was more valuable than anything else I had studied.&rdquo;
              </p>
              <p className="text-xs font-semibold text-[#0C447C] mt-2">
                — Judge [Name], Civil Judge, Chennai District
              </p>
            </motion.div>

            {/* 3 Inline Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
              }
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.9,
              }}
              className="grid grid-cols-3 gap-2 py-4 px-2 rounded-xl bg-white border border-slate-200/80 shadow-xs text-center"
            >
              <div className="px-1">
                <span className="block font-heading font-extrabold text-lg sm:text-xl text-[#1D9E75] leading-tight">
                  500+
                </span>
                <span className="block text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                  Demo classes conducted
                </span>
              </div>
              <div className="px-1 border-x border-slate-100">
                <span className="block font-heading font-extrabold text-lg sm:text-xl text-[#1D9E75] leading-tight">
                  92%
                </span>
                <span className="block text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                  Demo attendees who enrolled
                </span>
              </div>
              <div className="px-1">
                <span className="block font-heading font-extrabold text-lg sm:text-xl text-[#1D9E75] leading-tight">
                  48 hrs
                </span>
                <span className="block text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                  Average WhatsApp response time
                </span>
              </div>
            </motion.div>

            {/* WhatsApp Alternative CTA */}
            <div className="pt-2">
              <p className="text-xs text-slate-500 text-center mb-2 font-medium">
                Prefer to talk first? Chat with us now
              </p>
              <button
                type="button"
                onClick={openGeneralEnquiry}
                className="w-full py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 fill-white" />
                <span>Chat on WhatsApp — We Reply in Minutes</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default DemoClassSection;
