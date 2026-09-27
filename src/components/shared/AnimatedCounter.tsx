"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCounter } from "@/hooks/useCounter";

export interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
}: AnimatedCounterProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const { count, isComplete, trigger } = useCounter(value, duration, 0);

  useEffect(() => {
    if (isInView) {
      trigger();
    }
  }, [isInView, trigger]);

  return (
    <motion.span
      ref={containerRef}
      className={`inline-flex items-baseline font-sans font-bold ${className}`}
      animate={isComplete ? { scale: [1, 1.05, 1] } : { scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {prefix && (
        <span className="text-[0.8em] font-semibold mr-0.5 select-none opacity-90">
          {prefix}
        </span>
      )}
      <span className="tabular-nums tracking-tight">
        {count.toLocaleString("en-IN")}
      </span>
      {suffix && (
        <span className="text-[0.8em] font-semibold ml-0.5 select-none opacity-90">
          {suffix}
        </span>
      )}
    </motion.span>
  );
}

export default AnimatedCounter;
