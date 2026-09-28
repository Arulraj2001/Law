"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ChevronRight, Bell } from "lucide-react";
import { useWhatsApp } from "@/hooks/useWhatsApp";

interface Announcement {
  id: string;
  badge: string;
  badgeColor: string;
  text: string;
  ctaText: string;
  action: "whatsapp_demo" | "whatsapp_syllabus" | "whatsapp_batch";
}

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "batch-seats",
    badge: "🔴 ADMISSIONS OPEN",
    badgeColor: "bg-red-500/20 text-red-300 border-red-500/30",
    text: "TNPSC Civil Judge 2026 Batch Starting Oct 5 — Only 7 Seats Remaining!",
    ctaText: "Reserve Seat",
    action: "whatsapp_batch",
  },
  {
    id: "syllabus-update",
    badge: "⚖ 2026 SYLLABUS",
    badgeColor: "bg-emerald/20 text-emerald-light border-emerald/30",
    text: "Updated for New Criminal Laws (BNS, BNSS, BSA) & Tamil Legal Translation.",
    ctaText: "View Syllabus",
    action: "whatsapp_syllabus",
  },
  {
    id: "free-demo",
    badge: "🎁 FREE DEMO",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    text: "Attend 2 Full Classes Free (Online & Offline) — Zero Commitment Required.",
    ctaText: "Book Free Slot",
    action: "whatsapp_demo",
  },
];

export function TopAlertBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { openDemoClass, openBatchEnquiry, openSyllabusRequest } =
    useWhatsApp();

  // Auto-cycle announcements every 5 seconds
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  const current = ANNOUNCEMENTS[currentIndex];

  const handleCtaClick = () => {
    if (current.action === "whatsapp_batch") {
      openBatchEnquiry("Civil Judge 2026 Foundation Batch (7 Seats Remaining)");
    } else if (current.action === "whatsapp_syllabus") {
      openSyllabusRequest("Civil Judge 2026 (New BNS & Tamil Translation)");
    } else {
      openDemoClass("Civil Judge 2026");
    }
  };

  return (
    <div
      role="region"
      aria-label="Live announcements"
      className="relative z-50 bg-[#021730] border-b border-white/10 text-white select-none overflow-hidden"
    >
      {/* Subtle gold gradient accent bar at top */}
      <div className="h-[2px] w-full bg-gradient-to-r from-emerald via-[#C9A84C] to-emerald" />

      <div className="container max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left / Center Announcement Carousel */}
          <div className="flex-1 flex items-center justify-center min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex items-center gap-2 sm:gap-3 text-xs sm:text-[13px] font-medium tracking-wide truncate"
              >
                {/* Status Badge */}
                <span
                  className={`hidden xs:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shrink-0 ${current.badgeColor}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  <span>{current.badge}</span>
                </span>

                {/* Announcement Copy */}
                <span className="text-white/90 truncate font-sans">
                  {current.text}
                </span>

                {/* Inline Action Link */}
                <button
                  type="button"
                  onClick={handleCtaClick}
                  className="inline-flex items-center gap-0.5 text-emerald-light hover:text-white font-semibold underline underline-offset-2 shrink-0 cursor-pointer transition-colors"
                >
                  <span>{current.ctaText}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dismiss button */}
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss announcement"
            className="w-5 h-5 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopAlertBar;
