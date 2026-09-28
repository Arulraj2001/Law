"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award,
  Scale,
  Users,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { useWhatsApp } from "@/hooks/useWhatsApp";

interface SlideData {
  id: string;
  tag: string;
  tagIcon: typeof Award;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  image: string;
  accentColor: string;
  statLabel: string;
  statValue: string;
}

const SLIDES: SlideData[] = [
  {
    id: "topper",
    tag: "CIVIL JUDGE & APP SELECTIONS",
    tagIcon: Award,
    title: "Tamil Nadu Judicial Service Success",
    subtitle: "Proven Track Record of District & High Court Appointments",
    badge: "⭐ Rank 1 & 45+ Selections",
    description:
      "Structured guidance for Prelims, Mains answer-writing, and High Court judge mock interviews with Tamil & English medium support.",
    image: "/images/hero/slide-topper.jpg",
    accentColor: "#1D9E75",
    statLabel: "Mains Pass Rate",
    statValue: "89%",
  },
  {
    id: "moot-court",
    tag: "COURTROOM SIMULATION",
    tagIcon: Scale,
    title: "Moot Court & Judgment Writing Drills",
    subtitle: "Real-World Judicial Simulation Hall",
    badge: "⚖ 100+ Hours Practical Drills",
    description:
      "Tiered courtroom benches for drafting real civil & criminal judgments, framing charges, and evidence appreciation under judicial standards.",
    image: "/images/hero/slide-moot-court.jpg",
    accentColor: "#38bdf8",
    statLabel: "Live Practice",
    statValue: "100+ Hrs",
  },
  {
    id: "study-notes",
    tag: "2024–2026 UPDATED SYLLABUS",
    tagIcon: BookOpen,
    title: "BNS, BNSS & BSA Bare Act Mastery",
    subtitle: "New Criminal Laws + Tamil Translation Workbooks",
    badge: "📚 New Criminal Laws Ready",
    description:
      "Comparative section-by-section charts for IPC vs BNS, CrPC vs BNSS, IEA vs BSA with legal translation workbooks for Paper I.",
    image: "/images/hero/slide-study-notes.jpg",
    accentColor: "#f59e0b",
    statLabel: "Translation Focus",
    statValue: "100%",
  },
  {
    id: "mentorship",
    tag: "EXCLUSIVE SMALL BATCH",
    tagIcon: Users,
    title: "Personal 1-on-1 Judicial Mentorship",
    subtitle: "Guided by Practicing Advocates & Judicial Experts",
    badge: "👥 Max 35 Candidates / Batch",
    description:
      "No 500-student mass halls. Individual daily answer-sheet corrections, personalized strategy reviews, and direct mentor access.",
    image: "/images/hero/slide-mentorship.jpg",
    accentColor: "#22c55e",
    statLabel: "Max Batch Size",
    statValue: "35 Seats",
  },
];

const SLIDE_DURATION = 5500; // 5.5 seconds per slide

export function HeroShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const elapsedBeforePauseRef = useRef<number>(0);
  const { openDemoClass } = useWhatsApp();

  const activeSlide = SLIDES[currentIndex];

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setProgress(0);
    elapsedBeforePauseRef.current = 0;
    startTimeRef.current = Date.now();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
    elapsedBeforePauseRef.current = 0;
    startTimeRef.current = Date.now();
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
    elapsedBeforePauseRef.current = 0;
    startTimeRef.current = Date.now();
  }, []);

  // Smooth progress ticker
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    startTimeRef.current = Date.now() - elapsedBeforePauseRef.current;

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);

      if (elapsed >= SLIDE_DURATION) {
        nextSlide();
      }
    }, 50);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isPaused, nextSlide]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    elapsedBeforePauseRef.current = Date.now() - startTimeRef.current;
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    startTimeRef.current = Date.now() - elapsedBeforePauseRef.current;
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ========================================================= */}
      {/* FLOATING GLASS BADGE: Bottom Right (Civil Judges Selected) */}
      {/* ========================================================= */}
      <motion.div
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="hidden sm:flex absolute -bottom-5 -right-4 sm:-right-6 z-30 items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#042C53]/90 backdrop-blur-xl border border-white/20 shadow-2xl text-white select-none pointer-events-none"
      >
        <div className="w-8 h-8 rounded-xl bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center shrink-0">
          <Scale className="w-4 h-4 text-[#E5C368]" />
        </div>
        <div>
          <div className="text-[12px] font-bold text-white tracking-wide">
            45+ Judges &amp; APPs Appointed
          </div>
          <div className="text-[10px] text-white/60 font-medium">
            Across Tamil Nadu Courts
          </div>
        </div>
      </motion.div>

      {/* ========================================================= */}
      {/* MAIN SHOWCASE CONTAINER                                   */}
      {/* ========================================================= */}
      <div className="relative rounded-[22px] overflow-hidden bg-gradient-to-b from-white/[0.12] to-white/[0.04] backdrop-blur-2xl border border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
        {/* Story Progress Indicators (Instagram / LinkedIn style) */}
        <div className="absolute top-3 left-4 right-4 z-20 flex items-center gap-2">
          {SLIDES.map((slide, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                className="flex-1 h-1 rounded-full bg-white/25 overflow-hidden transition-all duration-200 cursor-pointer hover:h-1.5 focus:outline-none"
                aria-label={`Jump to slide ${idx + 1}: ${slide.title}`}
              >
                <div
                  className="h-full bg-white transition-all duration-75"
                  style={{
                    width: isCompleted
                      ? "100%"
                      : isCurrent
                      ? `${progress}%`
                      : "0%",
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Visual Media Canvas (widescreen aspect ratio container) */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.8] overflow-hidden bg-[#021730]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={activeSlide.image}
                alt={activeSlide.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 650px"
                className="object-cover object-center"
              />

              {/* Light subtle vignettes - dark shadows reduced */}
              <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-black/35 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#031D3B]/40 to-transparent pointer-events-none" />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows (visible on desktop hover) */}
          <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none z-20">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-md border border-white/15 flex items-center justify-center pointer-events-auto transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-md border border-white/15 flex items-center justify-center pointer-events-auto transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Top Tag Pill on Visual */}
          <div className="absolute top-8 left-4 z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold tracking-wider uppercase shadow-md"
              >
                <activeSlide.tagIcon className="w-3.5 h-3.5 text-emerald-light" />
                <span>{activeSlide.tag}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Live Stat Stamp (Top Right) */}
          <div className="absolute top-8 right-4 z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.35 }}
                className="text-right px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-white"
              >
                <span className="block text-[15px] font-heading font-bold text-emerald-light leading-none">
                  {activeSlide.statValue}
                </span>
                <span className="block text-[9px] uppercase tracking-wider text-white/70 font-medium">
                  {activeSlide.statLabel}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Content Details Block (Bottom Half - streamlined, description removed) */}
        <div className="px-5 py-3.5 sm:px-6 sm:py-4 bg-[#031D3B]/95 backdrop-blur-xl border-t border-white/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="space-y-1.5"
            >
              {/* Highlight Badge & Slide Counter */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1D9E75]/20 text-[#9FE1CB] border border-[#1D9E75]/40 text-xs font-semibold">
                  <Sparkles className="w-3 h-3 text-[#9FE1CB]" />
                  <span>{activeSlide.badge}</span>
                </span>

                <span className="text-[11px] text-white/50 font-mono">
                  0{currentIndex + 1} / 0{SLIDES.length}
                </span>
              </div>

              {/* Title & Subtitle only - Description removed */}
              <div>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-white tracking-tight leading-snug">
                  {activeSlide.title}
                </h3>
                <p className="text-[12px] text-white/70 font-medium line-clamp-1">
                  {activeSlide.subtitle}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Interactive Card Action Footer */}
          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => openDemoClass()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-light hover:text-white transition-colors group cursor-pointer"
            >
              <span>Book Demo Class For This Batch</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Micro thumbnail strip */}
            <div className="flex items-center gap-1.5">
              {SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className={`relative w-6 h-6 rounded-md overflow-hidden border transition-all duration-200 cursor-pointer ${
                    idx === currentIndex
                      ? "border-emerald ring-2 ring-emerald/40 scale-110"
                      : "border-white/20 opacity-50 hover:opacity-100"
                  }`}
                  aria-label={`Select ${slide.title}`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroShowcase;
