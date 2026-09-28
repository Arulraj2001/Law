"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Search, BookOpen } from "lucide-react";

interface BlogHeroProps {
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
}

export function BlogHero({
  searchQuery = "",
  onSearchChange,
}: BlogHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1628] via-[#042C53] to-[#0A1628] text-white pt-32 pb-14 min-h-[320px] flex items-center justify-center text-center">
      {/* Ambient background lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-15 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400 via-transparent to-transparent" />
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-3xl">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          aria-label="Breadcrumb"
          className="flex items-center justify-center gap-2 text-sm text-white/70 mb-5"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/50" />
          <span className="text-white font-medium">Blog</span>
        </motion.nav>

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 font-semibold text-xs uppercase tracking-wider mb-5"
        >
          <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
          <span>Free Resources</span>
        </motion.div>

        {/* H1 Heading */}
        <motion.h1
          suppressHydrationWarning
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-serif font-bold text-3xl sm:text-4xl md:text-[48px] text-white leading-tight tracking-tight mb-4"
        >
          Guides &amp; Articles for Tamil Nadu Law Exam Aspirants
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-sans text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto mb-8"
        >
          Expert articles on exam strategy, legal updates, and preparation tips —
          written by faculty who have trained 25+ successful judges.
        </motion.p>

        {/* Search Bar */}
        {onSearchChange && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="max-w-md mx-auto relative"
          >
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search articles by title or topic..."
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white/95 text-navy-dark placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald border border-slate-300 shadow-md transition-all"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default BlogHero;
