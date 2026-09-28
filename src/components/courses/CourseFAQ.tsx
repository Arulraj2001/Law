"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";
import { useWhatsApp } from "@/hooks/useWhatsApp";

export interface CourseFAQItem {
  question: string;
  answer: string;
}

export interface CourseFAQProps {
  faqs: CourseFAQItem[];
  courseTitle: string;
}

export function CourseFAQ({ faqs, courseTitle }: CourseFAQProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { openGeneralEnquiry } = useWhatsApp();

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };


  return (
    <section className="py-20 bg-white" id="faq">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Questions & Answers"
          title={`Frequently Asked Questions — ${courseTitle}`}
          subtitle="Everything you need to know about eligibility, course structure, syllabus coverage, and class schedules."
          align="center"
          eyebrowColor="emerald"
        />

        {/* Single Column Accordion Container */}
        <div className="max-w-[800px] mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                className={`bg-white rounded-xl mb-3 border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-navy-light/40 shadow-sm"
                    : "border-black/[0.08]"
                }`}
              >
                {/* Question Row (Always visible) */}
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  className="w-full flex items-center justify-between p-5 sm:px-6 sm:py-5 cursor-pointer hover:bg-navy-tint/30 transition-colors select-none text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-heading text-base font-semibold pr-4 flex-1 text-left transition-colors duration-200 ${
                      isOpen ? "text-navy-dark" : "text-charcoal"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-navy-tint flex items-center justify-center shrink-0">
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center justify-center"
                    >
                      <ChevronDown className="w-[18px] h-[18px] text-navy-dark" />
                    </motion.div>
                  </div>
                </button>

                {/* Answer Area (AnimatePresence) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0">
                        <div className="border-t border-black/[0.06] pt-4 font-sans text-[15px] leading-[1.7] text-slate-600">
                          {faq.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Below Accordion WhatsApp CTA */}
        <div className="mt-10 text-center p-6 sm:p-7 rounded-2xl bg-[#F5F5F0] border border-black/[0.06] max-w-[800px] mx-auto shadow-sm">
          <p className="font-heading font-bold text-navy-dark text-base sm:text-lg mb-1">
            Have a question that is not answered here?
          </p>
          <p className="text-xs sm:text-sm text-slate-600 mb-4">
            Our expert faculty and student counsellors are available to assist you.
          </p>
          <button
            type="button"
            onClick={openGeneralEnquiry}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5c] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
          >
            <span>Chat on WhatsApp</span>
          </button>
        </div>

        {/* Embedded FAQPage Schema */}
        <SchemaMarkup type="faq" data={{ faqs }} />
      </div>
    </section>
  );
}


export default CourseFAQ;
