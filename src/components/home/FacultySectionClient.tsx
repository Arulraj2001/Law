"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Scale, Award, Users, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { useWhatsApp } from "@/hooks/useWhatsApp";

export interface FounderData {
  name: string;
  designation: string;
  qualification: string;
  specialization: string;
  experienceYears: number;
  shortBio: string;
  credentials: string[];
  isFounder: boolean;
  photoUrl?: string | null;
}

export interface FacultySectionClientProps {
  founder: FounderData;
}

export function FacultySectionClient({ founder }: FacultySectionClientProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const { openDemoClass } = useWhatsApp();

  // Get initials for fallback
  const initials = founder.name
    .replace(/[\[\]]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase() || "FN";

  const differentiatorPoints = [
    {
      icon: <Scale className="w-5 h-5 text-navy-mid" />,
      title: "Courtroom Experience",
      subtext: "Teaches law the way courts apply it, not the way textbooks explain it",
    },
    {
      icon: <Award className="w-5 h-5 text-navy-mid" />,
      title: "Proven Track Record",
      subtext: "25+ students selected as Civil Judges and APPs across Tamil Nadu",
    },
    {
      icon: <Users className="w-5 h-5 text-navy-mid" />,
      title: "Personal Mentorship",
      subtext: "Every student gets individual attention, progress tracking, and targeted doubt sessions",
    },
  ];

  return (
    <section
      id="faculty"
      ref={containerRef}
      className="py-14 md:py-20 bg-white relative overflow-hidden"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN: Photo & Badges (45% on desktop -> col-span-5) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full lg:col-span-5 flex flex-col items-center lg:items-start"
          >
            {/* Portrait Photo Container */}
            <div className="relative w-full max-w-[360px] sm:max-w-[380px] aspect-[4/5] rounded-[20px] overflow-hidden shadow-2xl border border-slate-100 bg-[#042C53]">
              {founder.photoUrl ? (
                <Image
                  src={founder.photoUrl}
                  alt={founder.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 380px"
                  priority
                />
              ) : (
                /* Placeholder with Navy Gradient, Initials & Pattern */
                <div
                  className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative"
                  style={{
                    background:
                      "linear-gradient(135deg, #042C53 0%, #185FA5 100%)",
                  }}
                >
                  {/* Subtle Diagonal Lines Pattern */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-25"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.04) 0px, rgba(255, 255, 255, 0.04) 2px, transparent 2px, transparent 8px)",
                    }}
                  />

                  {/* Centered Initials */}
                  <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center mb-4 shadow-inner">
                    <span className="font-heading font-extrabold text-white text-4xl tracking-widest">
                      {initials}
                    </span>
                  </div>

                  <p className="font-heading font-bold text-white text-lg tracking-wide">
                    {founder.name}
                  </p>
                  <p className="text-xs text-emerald-light font-medium mt-1">
                    {founder.designation}
                  </p>

                  {/* Dev note */}
                  {process.env.NODE_ENV === "development" && (
                    <span className="absolute bottom-4 inset-x-4 text-[10px] text-white/50 bg-black/30 py-1 px-2 rounded">
                      [Upload faculty photo in Sanity Studio admin]
                    </span>
                  )}
                </div>
              )}

              {/* Element 2 — Students Badge (Top-Left) */}
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -25 }
                }
                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                className="absolute top-6 left-6 rounded-[12px] bg-[#1D9E75] p-[10px_14px] shadow-xl text-white pointer-events-none"
              >
                <div className="font-heading font-extrabold text-[22px] leading-tight">
                  1000+
                </div>
                <div className="text-[11px] font-medium leading-none text-white/90">
                  Students
                </div>
              </motion.div>

              {/* Element 1 — Experience Badge (Bottom-Right) */}
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 25 }
                }
                transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                className="absolute bottom-6 right-6 rounded-[12px] bg-white p-[12px_16px] shadow-lg border border-slate-100 text-left pointer-events-none"
              >
                <div className="font-heading font-extrabold text-[28px] text-[#1D9E75] leading-none mb-1">
                  {founder.experienceYears || 10}+
                </div>
                <div className="text-[12px] text-[#444441] font-semibold leading-tight">
                  Years of
                  <br />
                  Mentoring
                </div>
              </motion.div>
            </div>

            {/* Credential Pills Below Photo (Max 5) */}
            <div className="w-full max-w-[380px] flex flex-wrap gap-2 pt-6 justify-center lg:justify-start">
              {founder.credentials.slice(0, 5).map((cred, idx) => (
                <motion.span
                  key={idx}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.7 + idx * 0.05,
                  }}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-navy-tint text-navy-dark border border-navy-light/25 text-xs font-semibold tracking-wide shadow-sm"
                >
                  {cred}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Content Side (55% on desktop -> col-span-7) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full lg:col-span-7 flex flex-col space-y-6 text-left"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="h-[1.5px] w-6 bg-emerald/50 rounded-full" />
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald">
                EXPERT FACULTY
              </span>
            </div>

            {/* Main Heading H2 */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="font-heading font-extrabold text-[28px] sm:text-4xl lg:text-[38px] text-navy-dark leading-[1.2] tracking-tight max-w-2xl"
            >
              Trained by a Practicing Lawyer — Not Just a Teacher
            </motion.h2>

            {/* Bio Paragraph */}
            <p className="font-sans text-base sm:text-[17px] text-[#444441] leading-[1.8] max-w-2xl">
              {founder.shortBio}
            </p>

            {/* 3 Key Differentiator Points */}
            <div className="space-y-4 pt-2">
              {differentiatorPoints.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{
                    duration: 0.45,
                    delay: 0.35 + idx * 0.15,
                    ease: "easeOut",
                  }}
                  className="flex items-start gap-3.5"
                >
                  <div className="w-10 h-10 rounded-full bg-navy-tint flex items-center justify-center shrink-0 border border-navy-mid/15 shadow-sm mt-0.5">
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-navy-dark">
                      {point.title}
                    </h3>
                    <p className="font-sans text-sm text-slate-600 leading-normal mt-0.5">
                      {point.subtext}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Row */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link href="/faculty">
                <button
                  type="button"
                  className="px-6 py-3 rounded-full bg-navy-dark hover:bg-navy-mid text-white text-sm font-semibold tracking-wide transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Meet Our Faculty</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <button
                type="button"
                onClick={() => openDemoClass("Civil Judge & APP Coaching")}
                className="px-6 py-3 rounded-full bg-emerald hover:bg-emerald-dark text-white text-sm font-semibold tracking-wide transition-colors shadow-md cursor-pointer"
              >
                Book Free Counselling
              </button>
            </div>

            {/* Quote Block at Bottom */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              className="relative rounded-[12px] bg-[#042C53] text-white p-[20px_24px] shadow-xl overflow-hidden mt-6"
            >
              {/* Large decorative quotation mark */}
              <span className="absolute -top-3 left-4 text-[60px] font-serif font-black text-[#1D9E75] opacity-30 select-none pointer-events-none">
                &ldquo;
              </span>

              <p className="font-sans text-[16px] italic text-white leading-[1.7] relative z-10 pt-2">
                &ldquo;I don&apos;t teach students how to pass exams. I teach them
                how to think like a judge.&rdquo;
              </p>

              <span className="block text-[13px] font-semibold text-emerald-light tracking-wide mt-3 relative z-10">
                — {founder.name}, Founder, {SITE_CONFIG.name}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default FacultySectionClient;
