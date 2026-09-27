"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { MessageSquare } from "lucide-react";

export function FAQPageHero() {
  const { openGeneralEnquiry } = useWhatsApp();

  return (
    <section className="relative overflow-hidden min-h-[340px] pt-32 pb-16 text-white flex items-center justify-center bg-[linear-gradient(135deg,#0D1B2A_0%,#1B263B_60%,#274060_100%)]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-emerald/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-4xl text-center">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center justify-center gap-2 text-xs sm:text-sm text-white/60">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-white font-medium">FAQ</li>
          </ol>
        </nav>

        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block text-xs uppercase tracking-widest font-bold text-emerald mb-3"
        >
          Frequently Asked Questions
        </motion.span>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4"
        >
          Everything You Need to Know <br className="hidden sm:inline" />
          About XYZ Coaching
        </motion.h1>

        {/* Sub-text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed mb-8"
        >
          Can&apos;t find your answer here? Chat with us on WhatsApp — we respond within 2 hours.
        </motion.p>

        {/* WhatsApp Pill Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            type="button"
            onClick={openGeneralEnquiry}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-emerald hover:bg-emerald-dark text-white text-sm font-semibold transition-all shadow-sm shadow-emerald/30 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>💬 Ask on WhatsApp →</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
