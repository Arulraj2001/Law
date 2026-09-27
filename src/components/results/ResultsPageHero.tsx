"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Award } from "lucide-react";

export function ResultsPageHero() {
  const stats = [
    { number: "25+", label: "Judicial Selections" },
    { number: "6+", label: "Exam Categories" },
    { number: "8+", label: "Districts Represented" },
    { number: "100%", label: "First attempt (2024 batch)" },
  ];

  return (
    <section
      className="relative overflow-hidden text-white pt-32 pb-16 sm:pb-20 min-h-[400px] flex items-center justify-center text-center"
      style={{
        background: "linear-gradient(135deg, #0F6E56 0%, #1D9E75 100%)",
      }}
    >
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          aria-label="Breadcrumb"
          className="flex items-center justify-center gap-2 text-sm text-white/60 mb-6"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/40" />
          <span className="text-white font-medium">Results &amp; Toppers</span>
        </motion.nav>

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white font-semibold text-xs uppercase tracking-wider mb-6"
        >
          <Award className="w-3.5 h-3.5 text-gold" />
          <span>Verified Selections · Tamil Nadu Judiciary</span>
        </motion.div>

        {/* H1 Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-heading font-extrabold text-[30px] sm:text-[38px] md:text-[44px] text-white leading-tight tracking-tight mb-6"
        >
          Our Students Are Now Tamil Nadu&apos;s Civil Judges and Prosecutors
        </motion.h1>

        {/* Sub-text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-sans text-base sm:text-[17px] text-white/85 leading-relaxed max-w-[620px] mx-auto mb-12"
        >
          Every name on this page is a real person who sat in the same coaching
          sessions you are considering. They prepared with us. They passed. They
          serve Tamil Nadu today.
        </motion.p>

        {/* Large Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-white/20"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 flex flex-col items-center"
            >
              <span className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-white">
                {stat.number}
              </span>
              <span className="text-xs sm:text-sm text-white/80 font-medium mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default ResultsPageHero;
