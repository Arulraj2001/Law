"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useWhatsApp } from "@/hooks/useWhatsApp";

export function ResultsCTA() {
  const { openGeneralEnquiry } = useWhatsApp();

  return (
    <section className="bg-navy-dark text-white py-16 sm:py-20 relative overflow-hidden text-center">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          {/* Heading */}
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white leading-tight mb-4">
            Your Name Could Be on This Page
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-base sm:text-[17px] text-white/70 leading-relaxed max-w-[560px] mx-auto mb-10">
            Every judge you see above made the same decision you are considering right
            now. They chose to prepare seriously. They chose XYZ.
          </p>

          {/* Large WhatsApp Button with pulse glow animation */}
          <div className="max-w-md mx-auto mb-5">
            <button
              type="button"
              onClick={openGeneralEnquiry}
              className="w-full relative group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-base shadow-lg hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-all duration-300"
            >
              <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 group-hover:opacity-75 blur-md transition duration-300 animate-pulse" />
              <MessageCircle className="w-5 h-5 fill-white relative z-10" />
              <span className="relative z-10">
                Start Your Preparation — Chat on WhatsApp
              </span>
            </button>
          </div>

          {/* Link to demo class */}
          <div className="mb-8">
            <Link
              href="/demo-class"
              className="text-white/60 hover:text-white text-sm underline underline-offset-4 transition-colors font-medium"
            >
              or book a free demo class
            </Link>
          </div>

          {/* 3 mini trust points */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-white/60 text-xs sm:text-[13px] font-medium pt-6 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400">✓</span>
              <span>No commitment required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400">✓</span>
              <span>Free counselling session</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400">✓</span>
              <span>Demo class before enrolment</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ResultsCTA;
