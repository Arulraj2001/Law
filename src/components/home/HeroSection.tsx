"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronDown,
  GraduationCap,
  Scale,
  Award,
  BookOpen,
} from "lucide-react";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

import { useWhatsApp } from "@/hooks/useWhatsApp";
import { HeroShowcase } from "@/components/home/HeroShowcase";

export function HeroSection() {
  const { openDemoClass } = useWhatsApp();

  const scrollToNext = () => {
    const trustBar = document.getElementById("trust-bar");
    if (trustBar) {
      trustBar.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#021730]">
      {/* Deep Navy Radial Gradient Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 60% 40%, #185FA5 0%, #0C447C 35%, #042C53 70%, #021730 100%)",
        }}
      />

      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating Ambient Glow Orbs (GPU accelerated via will-change: transform) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Orb 1: Emerald - Top Right */}
        <motion.div
          className="absolute -top-20 -right-20 w-[450px] h-[450px] rounded-full bg-[#1D9E75] opacity-[0.08] blur-[120px]"
          style={{ willChange: "transform" }}
          animate={{
            x: [0, 35, -20, 0],
            y: [0, -45, 25, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* Orb 2: Navy-Light - Center Left */}
        <motion.div
          className="absolute top-1/3 -left-32 w-[550px] h-[550px] rounded-full bg-[#185FA5] opacity-[0.12] blur-[150px]"
          style={{ willChange: "transform" }}
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 35, -30, 0],
          }}
          transition={{
            duration: 8,
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* Orb 3: Gold - Bottom Right */}
        <motion.div
          className="absolute -bottom-24 right-1/4 w-[400px] h-[400px] rounded-full bg-[#C9A84C] opacity-[0.06] blur-[100px]"
          style={{ willChange: "transform" }}
          animate={{
            x: [0, 30, -35, 0],
            y: [0, -30, 35, 0],
          }}
          transition={{
            duration: 6.5,
            delay: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 md:pt-36 md:pb-28 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT COLUMN: Main Copy & CTAs (50% width on desktop) */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            {/* Eyebrow Badge (delay 0) */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0,
              }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D9E75]/15 border border-[#1D9E75]/35 text-[#9FE1CB] text-[13px] font-semibold tracking-wide shadow-sm"
            >
              <span className="text-sm">⚖</span>
              <span>Tamil Nadu&apos;s #1 Judiciary Coaching</span>
            </motion.div>

            {/* H1 Headline (3-line stagger animation, delay 0.2) */}
            <h1
              suppressHydrationWarning
              className="font-serif font-bold text-[38px] sm:text-[48px] lg:text-[64px] text-white tracking-tight leading-[1.12] space-y-1"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="block"
              >
                Civil Judge &amp; APP
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                className="block"
              >
                Exam Coaching in
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                className="block bg-gradient-to-r from-[#1D9E75] via-[#22c55e] to-[#9FE1CB] bg-clip-text text-transparent"
              >
                Tamil Nadu
              </motion.span>
            </h1>

            {/* Sub-headline (delay 0.5) */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.5, ease: "easeOut" }}
              className="font-sans text-base sm:text-[17px] text-white/80 leading-[1.7] max-w-[520px]"
            >
              Expert-led coaching for TNPSC Civil Judge, APP Exam, Patent Agent,
              Trademark Agent, UGC-NET &amp; SET Law. Online and offline.
              Prelims · Mains · Interview.
            </motion.p>

            {/* CTA Buttons Row (delay 0.7) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto"
            >
              {/* Primary Button: Book Free Demo */}
              <motion.button
                type="button"
                onClick={() => openDemoClass()}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#1D9E75] hover:bg-[#0F6E56] text-white text-[15px] font-semibold tracking-wide shadow-lg shadow-[#1D9E75]/30 animate-pulseGlow transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>📞 Book Free Demo Class</span>
              </motion.button>

              {/* Secondary Button: View All Courses */}
              <Link href="/#courses" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-transparent hover:bg-white/10 text-white text-[15px] font-semibold tracking-wide border-[1.5px] border-white/35 hover:border-white/60 transition-colors text-center cursor-pointer"
                >
                  View All Courses &rarr;
                </motion.div>
              </Link>
            </motion.div>

            {/* Social Proof Line (delay 0.9) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="pt-2"
            >
              <p className="font-sans text-[13px] text-white/60 tracking-wide flex items-center gap-1.5">
                <span>⭐</span>
                <span>Trusted by 1,000+ law graduates across Tamil Nadu</span>
              </p>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Auto-Advancing Elite Judicial Showcase (6 cols on desktop) */}
          <div className="lg:col-span-6 w-full">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            >
              <HeroShowcase />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bouncing Scroll Indicator (delay 1.4) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        onClick={scrollToNext}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 cursor-pointer text-white/40 hover:text-white/80 transition-colors select-none"
        aria-label="Scroll to explore"
      >
        <span className="text-[11px] uppercase tracking-wider font-semibold">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="w-5 h-5 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
