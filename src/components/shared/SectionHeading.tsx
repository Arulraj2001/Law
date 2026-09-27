"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export interface SectionHeadingProps {
  eyebrow?: string;
  badge?: string; // backward-compatibility alias for eyebrow
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  eyebrowColor?: "emerald" | "navy" | "gold";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  badge,
  title,
  subtitle,
  align = "center",
  eyebrowColor = "emerald",
  className = "",
}: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const labelText = eyebrow || badge;

  // Eyebrow color mapping
  const eyebrowColors = {
    emerald: "text-emerald",
    navy: "text-navy-mid",
    gold: "text-gold",
  };

  const lineColors = {
    emerald: "bg-emerald/30",
    navy: "bg-navy-mid/30",
    gold: "bg-gold/40",
  };

  // Alignment classes
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col mb-12 sm:mb-16 ${alignmentClasses[align]} ${className}`}
    >
      {/* Eyebrow Label */}
      {labelText && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
          transition={{ duration: 0.4, delay: 0, ease: "easeOut" }}
          className={`inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest mb-3 ${eyebrowColors[eyebrowColor]}`}
        >
          {align === "center" && (
            <span
              className={`h-[1.5px] w-6 sm:w-8 rounded-full ${lineColors[eyebrowColor]}`}
            />
          )}
          <span>{labelText}</span>
          {align === "center" && (
            <span
              className={`h-[1.5px] w-6 sm:w-8 rounded-full ${lineColors[eyebrowColor]}`}
            />
          )}
        </motion.div>
      )}

      {/* Main Title H2 */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="font-heading font-bold text-[28px] md:text-4xl text-navy-dark leading-[1.2] tracking-tight max-w-3xl"
      >
        {title}
      </motion.h2>

      {/* Subtitle Description */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
          className={`font-sans text-base text-slate-600 mt-3.5 leading-relaxed max-w-[600px] ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

export default SectionHeading;
