"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function DemoHero() {
  const scrollToForm = () => {
    const el = document.getElementById("demo-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden min-h-[420px] pt-32 pb-16 text-white flex items-center justify-center bg-[linear-gradient(135deg,#0F6E56_0%,#1D9E75_60%,#22c55e_100%)]">
      {/* Decorative floating orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 25, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-white opacity-5 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-white opacity-5 blur-3xl"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-4xl text-center">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center justify-center gap-2 text-xs sm:text-sm text-white/60">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-white font-medium">Free Demo Class</li>
          </ol>
        </nav>

        {/* Large Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold tracking-wide mb-6 border border-white/10 shadow-sm"
        >
          <span>🎓 Completely Free · No Payment Required</span>
        </motion.div>

        {/* H1 Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-extrabold text-white leading-tight tracking-tight mb-5"
        >
          Experience Our Teaching <br className="hidden sm:inline" />
          Before You Enrol
        </motion.h1>

        {/* Sub-text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-[18px] text-white/80 max-w-[560px] mx-auto leading-relaxed mb-8"
        >
          One class. No commitment. No fee. See if XYZ is the right fit for you — before you decide to join.
        </motion.p>

        {/* 3 Promise Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-[13px] font-medium border border-white/10">
            ✓ Free — zero cost
          </span>
          <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-[13px] font-medium border border-white/10">
            ✓ No commitment required
          </span>
          <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-[13px] font-medium border border-white/10">
            ✓ Online or offline — your choice
          </span>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          type="button"
          onClick={scrollToForm}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="inline-flex flex-col items-center gap-1.5 text-white/60 hover:text-white transition-colors text-[13px] font-medium cursor-pointer group"
        >
          <span>Register below ↓</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-white/80 group-hover:text-white" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
