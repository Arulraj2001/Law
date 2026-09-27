"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Star, MessageSquare } from "lucide-react";

export function TestimonialsHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1628] via-[#042C53] to-[#0F6E56] text-white pt-32 pb-16 min-h-[380px] flex items-center justify-center text-center">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400 via-transparent to-transparent" />
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl">
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
          <span className="text-white font-medium">Testimonials</span>
        </motion.nav>

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 font-semibold text-xs uppercase tracking-wider mb-6"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
          <span>Student Testimonials</span>
        </motion.div>

        {/* H1 Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight mb-6"
        >
          Words from Those Who Are Now Serving as Tamil Nadu&apos;s Judges
        </motion.h1>

        {/* Sub-text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-sans text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl mx-auto mb-8"
        >
          These are not reviews from aspirants. These are testimonials from real
          judicial officers — Civil Judges and APPs — who prepared with XYZ and
          serve Tamil Nadu today.
        </motion.p>

        {/* Rating strip: ⭐⭐⭐⭐⭐ 5.0 / 5.0 · 50+ verified reviews */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white"
        >
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-white text-white"
              />
            ))}
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-wide">
            5.0 / 5.0 · 50+ verified reviews
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default TestimonialsHero;
