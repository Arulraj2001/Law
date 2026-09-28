"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { FAQ_CATEGORIES, FAQCategory } from "@/lib/faq-data";

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.828z" />
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.179L2 22l4.957-1.399C8.423 21.493 10.155 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.697 0-3.272-.512-4.588-1.39l-.329-.222-2.943.83.829-2.883-.238-.344C3.805 14.802 3.273 13.442 3.273 12c0-4.811 3.916-8.727 8.727-8.727 4.812 0 8.727 3.916 8.727 8.727 0 4.811-3.915 8.727-8.727 8.727z" />
    </svg>
  );
}

export interface FAQFullListProps {
  categories?: FAQCategory[];
  groupedFaqs?: Record<string, Array<{ question: string; answer: string }>>;
}

const CATEGORY_ORDER = [
  { key: "about-courses", id: "about-the-courses", title: "About the Courses" },
  { key: "fees-batches", id: "fees-and-batches", title: "Fees & Batches" },
  { key: "study-prep", id: "study-and-preparation", title: "Study & Preparation" },
  { key: "online-classes", id: "online-classes", title: "Online Classes" },
  { key: "career-results", id: "career-and-results", title: "Career & Results" },
];

export function FAQFullList({ categories, groupedFaqs }: FAQFullListProps) {
  const renderedCategories: FAQCategory[] = useMemo(() => {
    if (categories && categories.length > 0) return categories;
    if (groupedFaqs && Object.keys(groupedFaqs).length > 0) {
      const result: FAQCategory[] = [];
      for (const def of CATEGORY_ORDER) {
        const items = groupedFaqs[def.key] || groupedFaqs[def.id] || [];
        if (items.length > 0) {
          result.push({
            id: def.id,
            title: def.title,
            items,
          });
        }
      }
      for (const [key, items] of Object.entries(groupedFaqs)) {
        if (!CATEGORY_ORDER.some((c) => c.key === key || c.id === key) && items.length > 0) {
          result.push({
            id: key,
            title: key.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
            items,
          });
        }
      }
      if (result.length > 0) return result;
    }
    return FAQ_CATEGORIES;
  }, [categories, groupedFaqs]);

  // Independent activeIndex for each category
  const [activeIndices, setActiveIndices] = useState<Record<string, number | null>>({
    "about-the-courses": 0,
    "fees-and-batches": null,
    "study-and-preparation": null,
    "online-classes": null,
    "career-and-results": null,
  });

  const [activeCategory, setActiveCategory] = useState<string>("about-the-courses");
  const { openGeneralEnquiry } = useWhatsApp();

  const toggleFAQ = (categoryId: string, index: number) => {
    setActiveIndices((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId] === index ? null : index,
    }));
  };

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Scrollspy to update active category
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (const cat of renderedCategories) {
        const el = document.getElementById(cat.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveCategory(cat.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [renderedCategories]);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT: Accordion Sections (70% on desktop = col-span-8) */}
          <div className="lg:col-span-8 space-y-14">
            {renderedCategories.map((category) => {
              const currentActive = activeIndices[category.id];

              return (
                <div key={category.id} id={category.id} className="scroll-mt-28">
                  {/* Category H3 Heading */}
                  <div className="pb-3 mb-6 border-b border-slate-200">
                    <h3 className="font-heading text-xl sm:text-[20px] font-bold text-navy-dark">
                      {category.title}
                    </h3>
                  </div>

                  {/* Accordion Items */}
                  <div className="space-y-3">
                    {category.items.map((item, idx) => {
                      const isOpen = currentActive === idx;

                      return (
                        <div
                          key={idx}
                          className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                            isOpen
                              ? "bg-slate-50/70 border-navy-light/40 shadow-sm"
                              : "bg-white border-slate-200/90 hover:border-slate-300"
                          }`}
                        >
                          {/* Question Bar */}
                          <button
                            type="button"
                            onClick={() => toggleFAQ(category.id, idx)}
                            className="w-full flex items-center justify-between p-4 sm:p-5 cursor-pointer text-left select-none gap-4"
                            aria-expanded={isOpen}
                          >
                            <span
                              className={`font-heading text-sm sm:text-base font-semibold leading-snug transition-colors ${
                                isOpen ? "text-navy-dark" : "text-slate-800"
                              }`}
                            >
                              {item.question}
                            </span>
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                isOpen ? "bg-navy-dark text-white" : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.25 }}
                              >
                                <ChevronDown className="w-4 h-4" />
                              </motion.div>
                            </div>
                          </button>

                          {/* Answer Area */}
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                key="answer"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className="px-5 pb-5 pt-0">
                                  <div className="border-t border-slate-200/70 pt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                                    {item.answer}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Sticky Sidebar (30% on desktop = col-span-4) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            {/* Category Jump Navigation */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm">
              <h4 className="text-[13px] font-bold uppercase tracking-wider text-navy-dark mb-3.5">
                Jump to:
              </h4>
              <ul className="space-y-1.5">
                {renderedCategories.map((cat) => {
                  const isActive = activeCategory === cat.id;

                  return (
                    <li key={cat.id}>
                      <button
                        type="button"
                        onClick={() => scrollToCategory(cat.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left cursor-pointer ${
                          isActive
                            ? "bg-navy-dark text-white shadow-sm"
                            : "text-slate-700 hover:bg-slate-200/70"
                        }`}
                      >
                        <span>{cat.title}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-70" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* CTA Box: Still have questions? */}
            <div className="p-5 rounded-2xl bg-navy-dark text-white shadow-sm">
              <h4 className="font-heading text-base font-bold mb-1">
                Still have questions?
              </h4>
              <p className="text-xs text-white/80 leading-relaxed mb-4">
                Chat with our admissions team on WhatsApp. We respond within 2 hours.
              </p>
              <button
                type="button"
                onClick={openGeneralEnquiry}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-xs tracking-wide transition-all shadow-sm shadow-[#25D366]/20 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>

            {/* Ask Our Faculty Box */}
            <div className="p-5 rounded-2xl bg-emerald-tint/80 border border-emerald/20 text-slate-800 shadow-sm">
              <h4 className="font-heading text-base font-bold text-navy-dark mb-1">
                Ask Our Faculty
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Book a free 15-min Q&amp;A call with our faculty to assess your exam readiness.
              </p>
              <Link
                href="/demo-class"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-navy-dark hover:bg-navy-mid text-white font-semibold text-xs tracking-wide transition-colors"
              >
                <span>Free Counselling →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
