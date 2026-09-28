"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Phone, ArrowDown } from "lucide-react";
import { useWhatsApp } from "@/hooks/useWhatsApp";

export interface CourseHeroProps {
  title: string;
  subtitle: string;
  badge: string;
  badgeColor?: "navy" | "emerald" | "gold";
  highlights: string[];
  duration?: string;
  mode?: string;
  fee?: string;
  feeNote?: string;
  courseSlug: string;
  breadcrumb: { label: string; href: string }[];
}

export function CourseHero({
  title,
  subtitle,
  badge,
  badgeColor = "emerald",
  highlights,
  duration = "Contact us",
  mode = "Online + Offline Classes",
  fee = "Contact for fee details",
  courseSlug,
  breadcrumb,
}: CourseHeroProps) {
  const { openCourseEnquiry } = useWhatsApp();

  const badgeColorClasses = {
    emerald: "bg-emerald text-white",
    navy: "bg-navy-mid text-white",
    gold: "bg-gold-light text-amber-900 border border-gold",
  };

  const detailRows = [
    { label: "Duration", value: duration, icon: "📚" },
    { label: "Mode", value: mode, icon: "🖥" },
    { label: "Fee", value: fee, icon: "💰" },
    { label: "Next Batch", value: "Contact for batch dates", icon: "🗓" },
    { label: "Location", value: "Tamil Nadu (Online + Chennai)", icon: "📍" },
  ];

  return (
    <section
      className="relative min-h-[500px] pt-32 pb-16 overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(135deg, #042C53 0%, #0C447C 60%, #185FA5 100%)",
      }}
      id="course-hero"
    >
      {/* Background radial dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT COLUMN: Content (60% -> col-span-7) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-[13px] text-white/50"
            >
              {breadcrumb.map((crumb, idx) => (
                <span key={idx} className="flex items-center gap-2">
                  <Link
                    href={crumb.href}
                    className="hover:text-white/80 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                  {idx < breadcrumb.length - 1 && (
                    <span className="text-white/30">/</span>
                  )}
                </span>
              ))}
            </nav>

            {/* Badge */}
            <div className="inline-block">
              <span
                className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide shadow-sm ${badgeColorClasses[badgeColor]}`}
              >
                <span>{badge}</span>
              </span>
            </div>

            {/* H1 Heading */}
            <h1
              suppressHydrationWarning
              className="font-serif font-bold text-[34px] sm:text-[42px] md:text-[50px] text-white leading-[1.15] tracking-tight"
            >
              {title}
            </h1>

            {/* Sub-headline */}
            <p className="font-sans text-base sm:text-[17px] text-white/80 leading-[1.7] max-w-[520px]">
              {subtitle}
            </p>

            {/* Quick highlights row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 max-w-[520px]">
              {highlights.slice(0, 4).map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-white/85 text-[13px] font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Two CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => openCourseEnquiry(title)}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-emerald hover:bg-emerald-dark text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Phone className="w-4 h-4" />
                <span>Enquire Now — WhatsApp</span>
              </button>

              <a
                href="#syllabus"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-transparent border border-white/60 hover:bg-white/10 text-white font-semibold text-sm transition-all duration-200"
              >
                <span>View Syllabus</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Enrol Card (40% -> col-span-5) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="bg-white/[0.08] backdrop-blur-xl border border-white/15 rounded-[20px] p-6 sm:p-7 shadow-2xl">
              {/* Card Title */}
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald inline-block animate-pulse" />
                <h3 className="font-heading font-bold text-[13px] tracking-wider text-white uppercase">
                  Course Details
                </h3>
              </div>

              {/* Detail Rows */}
              <div className="space-y-3.5">
                {detailRows.map((row, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between pb-3 text-xs sm:text-[13px] ${
                      idx !== detailRows.length - 1
                        ? "border-b border-white/[0.08]"
                        : ""
                    }`}
                  >
                    <span className="text-white/60 flex items-center gap-2">
                      <span className="text-sm">{row.icon}</span>
                      <span>{row.label}</span>
                    </span>
                    <span className="text-white font-medium text-right ml-4">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Secure Your Seat Button */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => openCourseEnquiry(title)}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald hover:bg-emerald-dark text-white font-bold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-emerald/30 animate-pulseGlow"
                >
                  Secure Your Seat
                </button>
              </div>

              {/* Free Demo Available Note */}
              <div className="mt-4 flex items-center justify-center gap-2 text-white/60 text-xs text-center">
                <Calendar className="w-3.5 h-3.5 text-white/70" />
                <span>Try a free demo class before enrolling</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CourseHero;
