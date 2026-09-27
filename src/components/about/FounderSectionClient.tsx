"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Trophy, ArrowRight } from "lucide-react";

export interface FounderData {
  name: string;
  designation: string;
  qualification: string;
  specialization: string;
  experienceYears: number;
  shortBio?: string;
  fullBio?: string;
  credentials: string[];
  photoUrl?: string | null;
}

interface FounderSectionClientProps {
  founder: FounderData;
}

export function FounderSectionClient({ founder }: FounderSectionClientProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  const founderName = founder.name || "[Founder Name]";
  const qualification = founder.qualification || "BA.BL / LLM";
  const experienceYears = founder.experienceYears || 10;

  // Initials for avatar fallback
  const initials = founderName
    .replace(/[\[\]]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase() || "FN";

  const credentialsList = [
    { icon: "⚖", text: "Practicing Advocate" },
    { icon: "🎓", text: qualification },
    { icon: "📍", text: "Chennai, Tamil Nadu" },
    { icon: "⭐", text: `${experienceYears}+ Years Mentoring` },
    { icon: "🏆", text: "25+ Judges Trained" },
    { icon: "🌐", text: "15+ States Covered" },
  ];

  return (
    <section ref={containerRef} className="py-20 bg-white overflow-hidden" id="founder">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN — Photo and credentials */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start"
          >
            {/* Outer Frame with offset emerald border decoration */}
            <div className="relative w-full max-w-[420px] mb-8">
              {/* Emerald Border Frame Decoration */}
              <div className="absolute inset-0 translate-x-2 translate-y-2 sm:translate-x-3 sm:translate-y-3 rounded-[24px] border-2 border-emerald pointer-events-none z-0" />

              {/* Photo Container */}
              <div className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden shadow-2xl bg-navy-dark z-10">
                {founder.photoUrl ? (
                  <Image
                    src={founder.photoUrl}
                    alt={founderName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 420px"
                    priority
                  />
                ) : (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative"
                    style={{
                      background:
                        "linear-gradient(135deg, #042C53 0%, #185FA5 100%)",
                    }}
                  >
                    {/* Subtle grid pattern */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-20"
                      style={{
                        backgroundImage:
                          "radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)",
                        backgroundSize: "16px 16px",
                      }}
                    />
                    <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-3xl font-heading font-extrabold text-white mb-4 shadow-lg backdrop-blur-sm">
                      {initials}
                    </div>
                    <span className="font-heading font-bold text-xl text-white">
                      {founderName}
                    </span>
                    <span className="text-sm text-emerald-light font-medium mt-1">
                      {founder.designation}
                    </span>
                  </div>
                )}

                {/* Top-Right Badge: "Chief Faculty" */}
                <div className="absolute top-4 right-4 z-20 bg-navy-dark text-white rounded-md px-3 py-1 text-xs font-semibold shadow-md">
                  Chief Faculty
                </div>
              </div>

              {/* Floating Achievement Card (Bottom-left of photo) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                className="absolute -bottom-6 -left-2 sm:-left-6 z-30 bg-white border border-slate-100 shadow-xl rounded-2xl p-4 sm:px-5 sm:py-4 flex items-center gap-3.5"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-tint flex items-center justify-center shrink-0">
                  <Trophy className="w-6 h-6 text-emerald" />
                </div>
                <div>
                  <div className="font-heading font-extrabold text-[28px] sm:text-[32px] text-emerald leading-none">
                    25+
                  </div>
                  <div className="text-xs text-charcoal font-medium leading-tight mt-0.5 max-w-[120px]">
                    Successful Judicial Selections
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Credentials Grid Below Photo (2x3) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-[420px] mt-4">
              {credentialsList.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.9 }
                  }
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + idx * 0.08,
                    ease: "easeOut",
                  }}
                  className="bg-white border border-black/[0.08] rounded-xl p-3 flex items-center gap-2.5 shadow-sm hover:border-navy-light/40 transition-colors"
                >
                  <span className="text-lg shrink-0">{item.icon}</span>
                  <span className="text-xs font-semibold text-charcoal leading-snug">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN — Bio and story */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col"
          >
            {/* Eyebrow */}
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald mb-2">
              About the Founder
            </span>

            {/* H2 Founder Name */}
            <h2 className="font-heading text-3xl sm:text-[36px] font-extrabold text-navy-dark leading-tight mb-1">
              {founderName}
            </h2>

            {/* Designation */}
            <p className="text-emerald font-medium text-base mb-4">
              {founder.designation || "Founder & Chief Faculty, XYZ Law Coaching"}
            </p>

            {/* Qualification tags row */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(founder.credentials && founder.credentials.length > 0
                ? founder.credentials
                : ["Practicing Advocate", "BA.BL / LLM", "Madras High Court"]
              ).map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-navy-tint text-navy-dark text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Full Bio Paragraphs */}
            <div className="font-sans text-base leading-[1.8] text-charcoal space-y-4">
              <p>
                {founderName} is a practicing advocate and the founder of XYZ Law
                Coaching. With a {qualification} degree and over {experienceYears}{" "}
                years of experience mentoring judicial aspirants, faculty brings real
                courtroom knowledge into every classroom session.
              </p>
              <p>
                What sets XYZ apart is a simple but powerful philosophy: law should
                be taught the way courts apply it, not the way textbooks explain
                it. Every session is grounded in practical legal reasoning — the
                exact skill that distinguishes successful judicial candidates from the
                rest.
              </p>
              <p>
                Under faculty guidance, students from diverse backgrounds — fresh
                law graduates, practising advocates, government employees — have
                cleared the TNPSC Civil Judge and APP exams. Each one received
                individual attention, a personalised preparation plan, and
                mentorship that continued right through the viva-voce stage.
              </p>
            </div>

            {/* Founder Quote Pull-Out */}
            <div className="relative bg-navy-dark rounded-xl p-6 text-white my-6 shadow-md overflow-hidden">
              <span className="absolute -top-3 -left-1 text-[72px] font-serif text-emerald opacity-30 select-none leading-none pointer-events-none">
                &ldquo;
              </span>
              <p className="relative z-10 italic text-white/95 text-base sm:text-lg leading-relaxed pl-4">
                &ldquo;My students don&apos;t just pass the exam. They walk into
                the courtroom ready.&rdquo;
              </p>
              <div className="relative z-10 text-emerald-light font-semibold text-sm mt-3 pl-4">
                — {founderName}
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <Link
                href="/demo-class"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald hover:bg-emerald-dark text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <span>Book a Free Session with {founderName.replace(/[\[\]]/g, "")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default FounderSectionClient;
