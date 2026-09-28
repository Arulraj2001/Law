"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { STATS } from "@/lib/constants";

interface SanityStats {
  studentsCount?: number;
  judgesCount?: number;
  experienceYears?: number;
}

interface TrustBarProps {
  stats?: SanityStats;
}

export function TrustBar({ stats }: TrustBarProps = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });

  const trustItems = [
    {
      type: "counter",
      value: stats?.studentsCount ?? STATS[0]?.value ?? 1000,
      suffix: "+",
      label: "Students Trained",
    },
    {
      type: "counter",
      value: stats?.judgesCount ?? STATS[1]?.value ?? 25,
      suffix: "+",
      label: "Judges & APPs Selected",
    },
    {
      type: "counter",
      value: stats?.experienceYears ?? STATS[2]?.value ?? 10,
      suffix: "+",
      label: "Years Experience",
    },
    {
      type: "text",
      text: "Online + Offline",
      label: "Classes Available",
    },
    {
      type: "text",
      text: "📍 Tamil Nadu",
      label: "Coaching Centre",
    },
  ];

  return (
    <section
      id="trust-bar"
      ref={containerRef}
      role="region"
      aria-label="Institute statistics"
      className="bg-[#F1EFE8] border-t border-b border-black/[0.06] py-4 md:py-6 relative z-20"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:flex lg:items-center lg:justify-between gap-6 lg:gap-0">
          {trustItems.map((item, idx) => {
            const isLastMobile = idx === trustItems.length - 1;

            return (
              <div
                key={idx}
                className={`flex items-center justify-between lg:flex-1 ${
                  isLastMobile ? "col-span-2 mx-auto lg:col-span-1" : ""
                }`}
              >
                {/* Stat Content */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.08,
                    ease: "easeOut",
                  }}
                  className="flex flex-col items-center text-center w-full px-2"
                >
                  <div className="font-heading font-extrabold text-2xl text-[#042C53] tracking-tight leading-tight">
                    {item.type === "counter" ? (
                      <AnimatedCounter
                        value={item.value as number}
                        suffix={item.suffix as string}
                        duration={2}
                      />
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </div>
                  <span className="font-sans text-[11px] uppercase tracking-wide font-medium text-[#2C2C2A] mt-1">
                    {item.label}
                  </span>
                </motion.div>

                {/* Vertical Divider (Desktop Only) */}
                {idx < trustItems.length - 1 && (
                  <div
                    className="hidden lg:block h-9 w-[1px] bg-black/10 shrink-0"
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TrustBar;
