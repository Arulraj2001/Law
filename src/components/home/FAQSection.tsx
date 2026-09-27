"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";
import { FAQS } from "@/lib/constants";
import { useWhatsApp } from "@/hooks/useWhatsApp";

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.828z" />
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.179L2 22l4.957-1.399C8.423 21.493 10.155 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.697 0-3.272-.512-4.588-1.39l-.329-.222-2.943.83.829-2.883-.238-.344C3.805 14.802 3.273 13.442 3.273 12c0-4.811 3.916-8.727 8.727-8.727 4.812 0 8.727 3.916 8.727 8.727 0 4.811-3.915 8.727-8.727 8.727z" />
    </svg>
  );
}

const additionalFAQs = [
  {
    question: "What study materials does XYZ provide?",
    answer:
      "Every student receives handwritten, updated study notes covering the complete syllabus — including the new BNS, BNSS, and BSA laws. Notes are rewritten for every new batch to reflect the latest TNPSC exam pattern changes. Online students also receive weekly MCQ practice PDFs via WhatsApp.",
  },
  {
    question: "Does XYZ cover the new criminal laws BNS, BNSS, and BSA?",
    answer:
      "Yes — completely. From 1 July 2024, the Bharatiya Nyaya Sanhita (BNS) replaced IPC, the Bharatiya Nagarik Suraksha Sanhita (BNSS) replaced CrPC, and the Bharatiya Sakshya Adhiniyam (BSA) replaced the Indian Evidence Act. The TNPSC Civil Judge and APP exams now test these new laws. XYZ covers all three comprehensively in every batch.",
  },
  {
    question: "How does XYZ's 1-on-1 mentorship work?",
    answer:
      "Every student's progress is tracked individually from the first week. Faculty identifies weak areas through weekly test performance and assigns targeted revision sessions. Students can ask doubts via WhatsApp between classes. Before the exam, each student gets a personal revision plan based on their specific weak areas.",
  },
  {
    question: "Is XYZ coaching available for students outside Tamil Nadu?",
    answer:
      "Yes. XYZ offers complete online coaching accessible from anywhere in India. Online students receive live classes, recorded lectures, weekly MCQ PDFs, study notes, and WhatsApp-based mentorship — the same quality as offline students. We have students from 15+ states who have successfully cleared their respective judicial service exams.",
  },
];

const allFAQs = [...FAQS, ...additionalFAQs];

export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { openGeneralEnquiry } = useWhatsApp();

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-14 lg:py-20 bg-[#F5F5F0]" id="faq">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about our coaching programmes and the TNPSC Civil Judge and APP exams."
          align="center"
          eyebrowColor="emerald"
        />

        {/* Single Column Accordion Container */}
        <div className="max-w-[800px] mx-auto">
          {allFAQs.map((faq, index) => {
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
                className={`bg-white rounded-xl mb-2 border transition-all duration-200 overflow-hidden ${
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

        {/* Still Have Questions? Row Below Accordion */}
        <div className="mt-10 lg:mt-12 text-center">
          <h3 className="font-heading text-lg font-bold text-navy-dark mb-4">
            Still have questions? We&apos;re happy to help.
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={openGeneralEnquiry}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-emerald hover:bg-emerald-dark text-white font-semibold text-sm transition-all duration-200 shadow-sm w-full sm:w-auto"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </button>
            <Link
              href="/demo-class"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-navy-dark hover:bg-navy-mid text-white font-semibold text-sm transition-all duration-200 shadow-sm w-full sm:w-auto"
            >
              <span>Book Free Counselling</span>
            </Link>
          </div>
        </div>

        {/* FAQPage Schema JSON-LD */}
        <SchemaMarkup type="faq" data={{ faqs: allFAQs }} />
      </div>
    </section>
  );
}

export default FAQSection;
