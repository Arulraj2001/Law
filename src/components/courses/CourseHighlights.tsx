"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export interface CourseHighlightsProps {
  highlights: string[];
  courseTitle: string;
}

export function CourseHighlights({
  highlights,
  courseTitle,
}: CourseHighlightsProps) {
  return (
    <section className="py-16 bg-[#F5F5F0]" id="highlights">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald mb-2 block">
            Programme Overview
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-navy-dark tracking-tight">
            What&apos;s Included in {courseTitle}
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Every aspect of the exam pattern is systematically addressed through
            expert lectures, test series, and personalized feedback.
          </p>
        </div>

        {/* Highlights 2-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="flex items-start gap-3 bg-white p-4 sm:p-4.5 rounded-xl border border-black/[0.06] shadow-xs text-sm sm:text-base text-charcoal font-medium hover:border-emerald/40 transition-colors"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
              <span>{item}</span>
            </motion.div>
          ))}
        </div>

        {/* Key Differentiators Strip Below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
          {/* Box 1: Translation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="bg-navy-dark text-white rounded-2xl p-6 shadow-md border border-navy-mid/40 flex flex-col justify-between"
          >
            <div>
              <span className="inline-block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                🌟 Exclusive
              </span>
              <h3 className="font-heading font-bold text-lg text-white mb-2 leading-snug">
                Tamil-to-English Legal Translation Classes
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed">
                The only coaching institute offering dedicated translation
                preparation with past TNPSC vocabulary and court document
                exercises.
              </p>
            </div>
          </motion.div>

          {/* Box 2: BNS, BNSS, BSA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="bg-emerald text-white rounded-2xl p-6 shadow-md flex flex-col justify-between"
          >
            <div>
              <span className="inline-block text-xs font-bold text-emerald-light uppercase tracking-wider mb-2">
                📋 Updated
              </span>
              <h3 className="font-heading font-bold text-lg text-white mb-2 leading-snug">
                BNS, BNSS &amp; BSA Coverage
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/95 leading-relaxed">
                New criminal laws from July 2024 fully integrated into all
                sessions, notes, comparative charts, and mock question papers.
              </p>
            </div>
          </motion.div>

          {/* Box 3: Proven Selections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="bg-navy-tint text-navy-dark rounded-2xl p-6 shadow-sm border border-navy-light/20 flex flex-col justify-between"
          >
            <div>
              <span className="inline-block text-xs font-bold text-navy-mid uppercase tracking-wider mb-2">
                ⭐ Proven
              </span>
              <h3 className="font-heading font-bold text-lg text-navy-dark mb-2 leading-snug">
                25+ Civil Judges Selected
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
                Real results from real students — named candidates currently
                serving across Tamil Nadu courts.
              </p>
            </div>
            <div>
              <Link
                href="/results"
                className="text-xs font-bold text-navy-mid hover:text-emerald transition-colors underline"
              >
                View all results &rarr;
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CourseHighlights;
