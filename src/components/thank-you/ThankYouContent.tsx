"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Clock, ChevronRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.828z" />
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.179L2 22l4.957-1.399C8.423 21.493 10.155 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.697 0-3.272-.512-4.588-1.39l-.329-.222-2.943.83.829-2.883-.238-.344C3.805 14.802 3.273 13.442 3.273 12c0-4.811 3.916-8.727 8.727-8.727 4.812 0 8.727 3.916 8.727 8.727 0 4.811-3.915 8.727-8.727 8.727z" />
    </svg>
  );
}

// Particle bursts data
const BURST_PARTICLES = [
  { x: -55, y: -45, color: "#1D9E75", size: 9 },
  { x: 50, y: -50, color: "#0D1B2A", size: 8 },
  { x: -70, y: 15, color: "#E0A96D", size: 10 },
  { x: 65, y: 20, color: "#1D9E75", size: 8 },
  { x: -35, y: 60, color: "#0D1B2A", size: 7 },
  { x: 45, y: 55, color: "#E0A96D", size: 9 },
];

export function ThankYouContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const course = searchParams.get("course");

  // 2-hour countdown in seconds (7200s)
  const [timeLeft, setTimeLeft] = useState(7200);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // Dynamic message based on query parameter
  let message =
    "Thank you for your enquiry. We will contact you on WhatsApp within 2 hours with all the details you need.";

  if (type === "demo") {
    message =
      "Thank you for booking your free demo class. We will contact you on WhatsApp within 2 hours to confirm your slot.";
  } else if (type === "contact") {
    message =
      "Thank you for your message. Our team will respond on WhatsApp or email within 2 hours.";
  }

  return (
    <div className="min-h-screen bg-white pt-28 sm:pt-32 pb-20 px-4 sm:px-6 flex flex-col items-center justify-center">
      <div className="max-w-[600px] w-full mx-auto text-center">
        {/* Animated Success Icon & Particle Burst */}
        <div className="relative inline-flex items-center justify-center mb-6">
          {/* Confetti particles */}
          {BURST_PARTICLES.map((p, i) => (
            <motion.div
              key={i}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{
                x: p.x,
                y: p.y,
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0.8],
              }}
              transition={{
                duration: 1.2,
                delay: 0.2 + i * 0.05,
                ease: "easeOut",
              }}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
              }}
            />
          ))}

          {/* Main 96px emerald check circle */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.1, 1], opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className="w-24 h-24 rounded-full bg-emerald text-white flex items-center justify-center shadow-lg shadow-emerald/30 relative z-10"
          >
            <Check className="w-12 h-12 stroke-[3]" />
          </motion.div>
        </div>

        {/* Heading */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-heading text-3xl sm:text-4xl font-extrabold text-navy-dark tracking-tight mb-4"
        >
          You&apos;re All Set! 🎉
        </motion.h1>

        {/* Dynamic Message */}
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="font-sans text-[17px] text-slate-600 leading-[1.7] max-w-[480px] mx-auto mb-6"
        >
          {message}
        </motion.p>

        {course && (
          <div className="inline-block px-4 py-1.5 rounded-full bg-navy-tint text-navy-dark text-xs font-semibold mb-6">
            Course: {course}
          </div>
        )}

        {/* Countdown Timer Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 mb-10 max-w-[440px] mx-auto"
        >
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            <Clock className="w-3.5 h-3.5 text-emerald" />
            <span>Our team has been notified. Expected response in:</span>
          </div>

          <div className="font-heading text-3xl sm:text-[32px] font-extrabold text-navy-dark tracking-wider my-1">
            {formatTime(timeLeft)}
          </div>

          <p className="text-[12px] text-slate-500 mt-1">
            Response times may vary. WhatsApp for faster response.
          </p>
        </motion.div>

        {/* What Happens Next (3 Steps Timeline) */}
        <div className="text-left mb-10 max-w-[480px] mx-auto">
          <h3 className="font-heading text-base font-bold text-navy-dark text-center mb-6">
            What Happens Next?
          </h3>

          <div className="space-y-6 relative pl-3">
            {/* Step 1 */}
            <div className="flex items-start gap-4 relative">
              <div className="w-9 h-9 rounded-full bg-emerald text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm shadow-emerald/30 z-10">
                1
              </div>
              <div className="pt-0.5">
                <h4 className="font-heading text-sm font-bold text-navy-dark">
                  Within 2 hours
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                  We contact you on WhatsApp to confirm your booking details
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4 relative">
              <div className="w-9 h-9 rounded-full bg-navy-dark text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm shadow-navy-dark/30 z-10">
                2
              </div>
              <div className="pt-0.5">
                <h4 className="font-heading text-sm font-bold text-navy-dark">
                  Your demo class / counselling
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                  Attend your session — online or offline as preferred
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4 relative">
              <div className="w-9 h-9 rounded-full bg-emerald text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm shadow-emerald/30 z-10">
                3
              </div>
              <div className="pt-0.5">
                <h4 className="font-heading text-sm font-bold text-navy-dark">
                  Start your preparation
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                  Enrol in the right batch and begin your judicial journey
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 max-w-[420px] mx-auto mb-10">
          <div>
            <a
              href={SITE_CONFIG.social.whatsappChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 w-full px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-sm transition-all shadow-sm shadow-[#25D366]/30"
            >
              <WhatsAppIcon className="w-5 h-5 fill-current" />
              <span>💬 Join Our WhatsApp Channel</span>
            </a>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Get exam updates and study tips instantly
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 pt-2 text-sm">
            <Link
              href="/"
              className="text-navy-dark hover:text-emerald font-semibold underline underline-offset-4 transition-colors"
            >
              ← Back to Home
            </Link>
            <span className="text-slate-300">|</span>
            <Link
              href="/courses/civil-judge"
              className="text-navy-dark hover:text-emerald font-semibold underline underline-offset-4 transition-colors"
            >
              View All Courses →
            </Link>
          </div>
        </div>

        {/* Social / Resource Prompt */}
        <div className="pt-6 border-t border-slate-200 text-center">
          <p className="text-xs font-medium text-slate-500 mb-3">
            While you wait, explore our resources:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/blog/tnpsc-civil-judge-syllabus-2026"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-navy-tint text-navy-dark hover:bg-navy-mid hover:text-white transition-colors text-xs font-semibold"
            >
              <span>📚 Civil Judge Syllabus</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/blog/bns-bnss-bsa-judiciary-exam-guide"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-navy-tint text-navy-dark hover:bg-navy-mid hover:text-white transition-colors text-xs font-semibold"
            >
              <span>📋 APP Exam Guide</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-navy-tint text-navy-dark hover:bg-navy-mid hover:text-white transition-colors text-xs font-semibold"
            >
              <span>🔔 Latest Exam Updates</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
