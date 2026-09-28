"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

export interface MissionSectionProps {
  mission?: string;
  vision?: string;
  values?: string;
}

export function MissionSection({ mission, vision, values }: MissionSectionProps = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  const defaultMission =
    "To prepare every serious judicial aspirant in Tamil Nadu with expert legal coaching, real courtroom insight, and personal mentorship — so they walk into the judiciary examination hall with complete confidence.";

  const defaultVision =
    "To be Tamil Nadu's most trusted name in judiciary and law exam coaching — known not just for results, but for the quality of legal thinkers we produce.";

  const defaultValuesList = [
    "Courtroom-first teaching",
    "Individual student attention",
    "Honest, result-oriented guidance",
    "Continuous improvement of material",
    "Accessibility — online and offline",
  ];

  const parsedValuesList = values
    ? values.split("\n").map((v) => v.trim()).filter(Boolean)
    : defaultValuesList;

  const cards = [
    {
      type: "mission",
      title: "Our Mission",
      icon: Target,
      iconColor: "text-emerald",
      iconBg: "bg-emerald-tint",
      content: (
        <p className="font-sans text-sm leading-[1.7] text-charcoal">
          {mission || defaultMission}
        </p>
      ),
    },
    {
      type: "vision",
      title: "Our Vision",
      icon: Eye,
      iconColor: "text-navy-mid",
      iconBg: "bg-navy-tint",
      content: (
        <p className="font-sans text-sm leading-[1.7] text-charcoal">
          {vision || defaultVision}
        </p>
      ),
    },
    {
      type: "values",
      title: "Our Values",
      icon: Heart,
      iconColor: "text-[#854F0B]",
      iconBg: "bg-gold-light",
      content: (
        <ul className="space-y-2.5 font-sans text-sm leading-[1.6] text-charcoal">
          {parsedValuesList.map((val, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="text-emerald font-bold">✅</span>
              <span>{val}</span>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <section
      ref={containerRef}
      className="py-14 md:py-20 bg-[#F5F5F0] overflow-hidden"
      id="mission"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Our Purpose"
          title="Mission, Vision & Values"
          align="center"
          eyebrowColor="emerald"
        />

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.type}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1, y: 0 }
                    : { opacity: 0, scale: 0.9, y: 20 }
                }
                transition={{
                  duration: 0.5,
                  delay: idx * 0.15,
                  ease: "easeOut",
                }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-7 border border-black/[0.08] hover:border-navy-light/30 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* 56px Icon Circle */}
                <div
                  className={`w-14 h-14 rounded-full ${card.iconBg} flex items-center justify-center shrink-0 mb-5`}
                >
                  <Icon className={`w-8 h-8 ${card.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-xl text-navy-dark mb-3">
                  {card.title}
                </h3>

                {/* Content */}
                <div className="flex-1">{card.content}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default MissionSection;
