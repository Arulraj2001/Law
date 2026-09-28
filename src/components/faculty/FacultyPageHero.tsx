"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Award, Users, Scale } from "lucide-react";

export function FacultyPageHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1628] via-[#042C53] to-[#0F6E56] text-white pt-32 pb-16 min-h-[380px] flex items-center justify-center">
      {/* Background radial glow effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400 via-transparent to-transparent" />
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl text-center">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          aria-label="Breadcrumb"
          className="flex items-center justify-center gap-2 text-sm text-white/70 mb-6"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/50" />
          <span className="text-white font-medium">Faculty</span>
        </motion.nav>

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 font-semibold text-xs uppercase tracking-wider mb-6"
        >
          <Scale className="w-3.5 h-3.5 text-emerald-400" />
          <span>Expert Legal Faculty</span>
        </motion.div>

        {/* H1 Heading */}
        <motion.h1
          suppressHydrationWarning
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-serif font-bold text-3xl sm:text-4xl md:text-[54px] text-white leading-tight tracking-tight mb-6"
        >
          The Team Behind Tamil Nadu&apos;s Judicial Success Stories
        </motion.h1>

        {/* Sub-text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-sans text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl mx-auto mb-12"
        >
          Our faculty are not just educators. They are practicing lawyers who
          bring real courtroom experience into every class — teaching law the
          way courts apply it.
        </motion.p>

        {/* 3 quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-6 border-t border-white/15"
        >
          <div className="flex flex-col items-center p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <span className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              10+ Years
            </span>
            <span className="text-xs sm:text-sm text-white/70 font-medium mt-0.5">
              Mentoring Experience
            </span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <span className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-300">
              25+
            </span>
            <span className="text-xs sm:text-sm text-white/70 font-medium mt-0.5">
              Judges &amp; APPs Selected
            </span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <span className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Practicing
            </span>
            <span className="text-xs sm:text-sm text-white/70 font-medium mt-0.5">
              Advocates on Faculty
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FacultyPageHero;
