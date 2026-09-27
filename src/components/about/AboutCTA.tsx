"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useWhatsApp } from "@/hooks/useWhatsApp";

export function AboutCTA() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const { openDemoClass } = useWhatsApp();

  return (
    <section
      ref={containerRef}
      className="py-16 relative overflow-hidden text-white text-center"
      style={{
        background: "linear-gradient(135deg, #0F6E56 0%, #1D9E75 100%)",
      }}
      id="about-cta"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* H2 Heading */}
          <h2 className="font-heading font-extrabold text-[26px] sm:text-3xl md:text-[36px] text-white leading-tight tracking-tight mb-4">
            Ready to Start Your Judiciary Journey?
          </h2>

          {/* Sub-text */}
          <p className="font-sans text-base sm:text-[17px] text-white/80 leading-relaxed max-w-[560px] mx-auto mb-8">
            Talk to our faculty. Attend a free demo class. Start your preparation
            with the institute that has produced 25+ Tamil Nadu judicial officers.
          </p>

          {/* Two Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Button 1: Book Free Demo Class */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95 }
              }
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/demo-class"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-emerald font-bold text-sm shadow-lg hover:bg-slate-50 transition-all duration-200"
              >
                <span>Book Free Demo Class</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Button 2: Chat on WhatsApp */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95 }
              }
              transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <button
                type="button"
                onClick={() => openDemoClass()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-transparent border-[1.5px] border-white text-white font-semibold text-sm hover:bg-white/10 transition-all duration-200 shadow-sm"
              >
                <span>Chat on WhatsApp →</span>
              </button>
            </motion.div>
          </div>

          {/* Reassurance line below buttons */}
          <div className="text-white/60 text-[13px] mt-6 font-medium">
            No commitment required · Free counselling available
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutCTA;
