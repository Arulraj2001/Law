"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SITE_CONFIG, STATS } from "@/lib/constants";

export function AboutHero() {
  const establishedYear = SITE_CONFIG.established && SITE_CONFIG.established !== "[Year]"
    ? SITE_CONFIG.established
    : "2016";

  const statsData = [
    { value: "1000+", label: "Students Trained" },
    { value: "25+", label: "Judges Selected" },
    { value: "10+", label: "Years Experience" },
    { value: "6", label: "Exam Categories" },
  ];

  return (
    <section
      className="relative min-h-[320px] md:min-h-[420px] pt-32 pb-16 flex flex-col justify-center items-center text-center overflow-hidden text-white"
      style={{
        background: "linear-gradient(135deg, #042C53 0%, #185FA5 100%)",
      }}
    >
      {/* Subtle Background Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl">
        {/* Breadcrumb (top) */}
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          aria-label="Breadcrumb"
          className="flex items-center justify-center gap-2 text-[13px] text-white/50 mb-4"
        >
          <Link
            href="/"
            className="hover:text-white/80 transition-colors"
          >
            Home
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-white/80 font-medium">About Us</span>
        </motion.nav>

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald text-white text-xs font-semibold tracking-wide mb-4 shadow-sm"
        >
          <span>Established {establishedYear} · Tamil Nadu</span>
        </motion.div>

        {/* H1 heading */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="font-heading font-extrabold text-[32px] sm:text-[40px] md:text-[48px] text-white leading-tight tracking-tight mb-4"
        >
          About {SITE_CONFIG.name || "XYZ Law Coaching"}
        </motion.h1>

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="font-sans text-base sm:text-lg text-white/75 leading-relaxed max-w-[600px] mx-auto mb-10"
        >
          Tamil Nadu&apos;s trusted judiciary coaching institute — led by practicing
          lawyers, built for serious judicial aspirants.
        </motion.p>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 max-w-3xl mx-auto pt-6 border-t border-white/15"
        >
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center py-2 px-4 ${
                idx !== statsData.length - 1
                  ? "md:border-r md:border-white/20"
                  : ""
              }`}
            >
              <span className="font-heading font-bold text-2xl md:text-[28px] text-white">
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-wider text-white/60 mt-0.5 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default AboutHero;
