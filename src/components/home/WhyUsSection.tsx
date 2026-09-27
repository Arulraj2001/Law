"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  UserCheck,
  ClipboardCheck,
  Languages,
  Heart,
  RefreshCw,
  Trophy,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { WHY_US } from "@/lib/constants";
import { staggerContainer } from "@/hooks/useScrollAnimation";

// Icon mapping for WHY_US items
function getFeatureIcon(iconKey: string) {
  switch (iconKey) {
    case "user-check":
      return <UserCheck className="w-6 h-6 text-navy-mid" />;
    case "clipboard-check":
      return <ClipboardCheck className="w-6 h-6 text-navy-mid" />;
    case "language":
      return <Languages className="w-6 h-6 text-navy-mid" />;
    case "user-heart":
      return <Heart className="w-6 h-6 text-navy-mid" />;
    case "refresh":
      return <RefreshCw className="w-6 h-6 text-navy-mid" />;
    case "trophy":
      return <Trophy className="w-6 h-6 text-navy-mid" />;
    default:
      return <Trophy className="w-6 h-6 text-navy-mid" />;
  }
}

export function WhyUsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  const proofPoints = [
    { text: "BNS, BNSS & BSA — New Criminal Laws Covered", color: "emerald" },
    { text: "Exclusive Tamil-to-English Translation Classes", color: "emerald" },
    { text: "Weekly TNPSC-Pattern Mock Tests", color: "emerald" },
    { text: "25+ Students Now Serving as Judges", color: "navy" },
    { text: "Personal 1-on-1 Mentorship", color: "navy" },
    { text: "Online + Offline Classes Available", color: "navy" },
  ];

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-24 bg-[#F5F5F0] relative overflow-hidden"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Why XYZ"
          title="What Makes Us Different from Every Other Coaching Institute"
          subtitle="Specific. Proven. Results-focused. Here is exactly why 25+ of our students are now serving as Tamil Nadu's judicial officers."
          align="center"
          eyebrowColor="emerald"
        />

        {/* Feature Grid with Stagger Animation */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {WHY_US.map((item, idx) => {
            const formattedIndex = String(idx + 1).padStart(2, "0");

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{ y: -4 }}
                className="group relative bg-white rounded-2xl p-7 sm:p-8 border border-black/[0.06] hover:border-emerald/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Icon + Number Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <motion.div
                      initial={{ rotate: -5 }}
                      animate={isInView ? { rotate: 0 } : { rotate: -5 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="w-12 h-12 rounded-xl bg-navy-tint flex items-center justify-center shadow-sm"
                    >
                      {getFeatureIcon(item.icon)}
                    </motion.div>

                    <span className="px-2.5 py-1 rounded-full bg-navy-tint text-navy-dark font-heading text-xs font-bold tracking-wider">
                      {formattedIndex}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-lg text-navy-dark mb-2.5 group-hover:text-emerald transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-sm text-slate-600 leading-[1.7]">
                    {item.description}
                  </p>
                </div>

                {/* Animated Bottom Underline on Card Hover (width: 0 -> 40px) */}
                <div className="w-0 group-hover:w-10 h-0.5 bg-emerald rounded-full transition-all duration-300 ease-out mt-5" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Social Proof Pills Row */}
        <div className="mt-14 pt-8 border-t border-black/[0.06] flex flex-wrap items-center justify-center gap-3">
          {proofPoints.map((proof, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 20,
                delay: 0.3 + idx * 0.06,
              }}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium tracking-wide shadow-sm border ${
                proof.color === "emerald"
                  ? "bg-emerald-tint text-emerald-dark border-emerald/25"
                  : "bg-navy-tint text-navy-dark border-navy-light/20"
              }`}
            >
              <span className="text-emerald font-bold">✅</span>
              <span>{proof.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyUsSection;
