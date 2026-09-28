"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { Phone, Mail, MessageSquare } from "lucide-react";

export function ContactHero() {
  const { openGeneralEnquiry } = useWhatsApp();

  return (
    <section className="relative overflow-hidden min-h-[360px] pt-32 pb-16 text-white flex items-center justify-center bg-[linear-gradient(135deg,#0D1B2A_0%,#1B263B_60%,#274060_100%)]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald/10 rounded-full blur-[100px] pointer-events-none" />

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
            <li className="text-white font-medium">Contact</li>
          </ol>
        </nav>

        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block text-xs uppercase tracking-widest font-bold text-emerald mb-3"
        >
          Get in Touch
        </motion.span>

        {/* H1 */}
        <motion.h1
          suppressHydrationWarning
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-[54px] font-bold text-white leading-tight tracking-tight mb-4"
        >
          We Are Here to Help You <br className="hidden sm:inline" />
          Start Your Judicial Career
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed mb-8"
        >
          Have questions about our courses, batches, or fees? Our faculty is available to guide you.
          Reach out via WhatsApp, call, or visit us at our Tamil Nadu centre.
        </motion.p>

        {/* 3 Contact Quick Action Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <button
            type="button"
            onClick={openGeneralEnquiry}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald hover:bg-emerald-dark text-white text-sm font-semibold transition-all shadow-sm shadow-emerald/30 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>📱 WhatsApp</span>
          </button>

          <a
            href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald hover:bg-emerald-dark text-white text-sm font-semibold transition-all shadow-sm shadow-emerald/30 cursor-pointer"
          >
            <Phone className="w-4 h-4" />
            <span>📞 Call Us</span>
          </a>

          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald hover:bg-emerald-dark text-white text-sm font-semibold transition-all shadow-sm shadow-emerald/30 cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>📧 Email</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
