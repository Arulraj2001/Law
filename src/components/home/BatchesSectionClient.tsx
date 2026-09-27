"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Clock, Laptop, FileText, ArrowRight, MessageCircle, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { useWhatsApp } from "@/hooks/useWhatsApp";

export interface BatchItem {
  id: string;
  course_name: string;
  start_date: string;
  timing: string;
  mode: string;
  total_seats: number;
  seats_filled: number;
  status: "open" | "filling" | "full" | string;
  notes?: string | null;
  is_active?: boolean;
}

export interface BatchesSectionClientProps {
  batches: BatchItem[];
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function BatchesSectionClient({ batches }: BatchesSectionClientProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });
  const { openCourseEnquiry, openChat } = useWhatsApp();

  return (
    <section
      id="batches"
      ref={containerRef}
      className="py-12 md:py-16 bg-[#042C53] text-white relative overflow-hidden"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dark Heading (Centered) */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-14 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-[#1D9E75] mb-3"
          >
            <span className="h-[1.5px] w-6 sm:w-8 rounded-full bg-[#1D9E75]/40" />
            <span>Upcoming Batches</span>
            <span className="h-[1.5px] w-6 sm:w-8 rounded-full bg-[#1D9E75]/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading font-extrabold text-[28px] md:text-4xl text-white leading-[1.2] tracking-tight"
          >
            Enrol in the Next Batch — Limited Seats
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="font-sans text-sm sm:text-base text-white/70 mt-3.5 leading-relaxed max-w-[600px]"
          >
            Batches fill quickly. Secure your seat before the next intake closes.
          </motion.p>
        </div>

        {/* 2-Column Batch Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {batches.map((batch, index) => {
            const fillRatio = Math.min(
              1,
              Math.max(0, batch.seats_filled / (batch.total_seats || 1))
            );
            const fillPercentage = Math.round(fillRatio * 100);
            const seatsRemaining = Math.max(
              0,
              batch.total_seats - batch.seats_filled
            );

            // Progress bar color
            const barColor =
              fillPercentage > 80
                ? "bg-[#EF4444]"
                : fillPercentage >= 50
                ? "bg-[#F59E0B]"
                : "bg-[#1D9E75]";

            return (
              <motion.div
                key={batch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="rounded-[16px] p-6 bg-white/[0.05] border border-white/[0.12] hover:border-white/[0.25] hover:bg-white/[0.08] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Course Name + Status Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <h3 className="font-heading font-bold text-base sm:text-[17px] text-white leading-snug">
                      {batch.course_name}
                    </h3>

                    {/* Status Badge */}
                    {batch.status === "filling" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F59E0B] text-white text-xs font-semibold tracking-wide shrink-0 shadow-xs">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                        </span>
                        <span>Filling Fast</span>
                      </span>
                    ) : batch.status === "full" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EF4444] text-white text-xs font-semibold tracking-wide shrink-0 shadow-xs">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-white" />
                        <span>Full</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1D9E75] text-white text-xs font-semibold tracking-wide shrink-0 shadow-xs">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-white" />
                        <span>Open</span>
                      </span>
                    )}
                  </div>

                  {/* Middle Detail Rows */}
                  <div className="space-y-2 mb-5 text-[13px] text-white/70">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-[#1D9E75] shrink-0" />
                      <span>Starts {formatDate(batch.start_date)}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#1D9E75] shrink-0" />
                      <span>{batch.timing}</span>
                    </div>

                    <div className="flex items-center gap-2.5 flex-wrap">
                      <div className="flex items-center gap-2">
                        <Laptop className="w-4 h-4 text-[#1D9E75] shrink-0" />
                        <span>{batch.mode}</span>
                      </div>
                      {batch.notes && (
                        <>
                          <span className="text-white/30">•</span>
                          <div className="flex items-center gap-1.5 text-white/80">
                            <FileText className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                            <span>{batch.notes}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Seats Progress Bar */}
                  <div className="mb-5 bg-white/[0.04] p-3 rounded-xl border border-white/[0.06]">
                    <div className="flex items-center justify-between text-[12px] text-white/60 mb-1.5 font-medium">
                      <span>Seats</span>
                      <span>
                        {batch.seats_filled} of {batch.total_seats} filled
                      </span>
                    </div>

                    {/* Bar track */}
                    <div className="w-full h-[6px] rounded-[3px] bg-white/10 overflow-hidden relative">
                      <motion.div
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={
                          isInView
                            ? { scaleX: fillRatio, originX: 0 }
                            : { scaleX: 0, originX: 0 }
                        }
                        transition={{
                          duration: 0.8,
                          delay: 0.2 + index * 0.1,
                          ease: "easeOut",
                        }}
                        className={`h-full w-full rounded-[3px] ${barColor}`}
                      />
                    </div>

                    {/* Subtext below bar */}
                    <div className="mt-2 text-right">
                      {seatsRemaining < 6 ? (
                        <span className="text-xs font-bold text-[#F59E0B]">
                          Only {seatsRemaining} seats left!
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-[#1D9E75]">
                          {seatsRemaining} seats available
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* CTA Button Inside Card */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openCourseEnquiry(batch.course_name)}
                  className="w-full py-3 px-4 rounded-full bg-[#1D9E75] hover:bg-[#0F6E56] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Enquire Now</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Strip Below Cards */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          <span className="text-sm text-white/70">
            Don&apos;t see your preferred batch timing?
          </span>
          <span className="text-sm text-white font-semibold">
            Contact us to arrange a custom batch:
          </span>
          <div className="inline-flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                openChat(
                  "Hi, I'd like to ask about a custom batch timing for law coaching."
                )
              }
              className="text-sm font-semibold text-[#1D9E75] hover:text-[#9FE1CB] underline transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
            <span className="text-white/30">|</span>
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/[^0-9+]/g, "")}`}
              className="text-sm font-semibold text-[#1D9E75] hover:text-[#9FE1CB] underline transition-colors inline-flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BatchesSectionClient;
