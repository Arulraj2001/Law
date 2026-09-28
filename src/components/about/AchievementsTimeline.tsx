"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Rocket,
  Trophy,
  Monitor,
  Briefcase,
  Award,
  Star,
  LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SITE_CONFIG } from "@/lib/constants";

export interface Milestone {
  year: string;
  title: string;
  description: string;
  icon?: string;
  color?: "navy" | "emerald" | "gold";
}

export interface AchievementsTimelineProps {
  milestones?: Milestone[];
}

export function AchievementsTimeline({ milestones: customMilestones }: AchievementsTimelineProps = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const startYear =
    SITE_CONFIG.established && SITE_CONFIG.established !== "[Year]"
      ? parseInt(SITE_CONFIG.established, 10) || 2016
      : 2016;

  const defaultMilestones: Milestone[] = [
    {
      year: `${startYear}`,
      title: `${SITE_CONFIG.name || "XYZ Law Coaching"} Founded`,
      description:
        "Started with a small batch of Civil Judge aspirants in Chennai, Tamil Nadu.",
      icon: "rocket",
      color: "navy",
    },
    {
      year: `${startYear + 2}`,
      title: "First Civil Judge Selections",
      description:
        "Our first batch produced successful Civil Judge selections — validating our courtroom-first teaching approach.",
      icon: "trophy",
      color: "emerald",
    },
    {
      year: `${startYear + 4}`,
      title: "Online Classes Launched",
      description:
        "Expanded to online coaching, making our programmes accessible to aspirants across Tamil Nadu and beyond.",
      icon: "monitor",
      color: "navy",
    },
    {
      year: `${startYear + 6}`,
      title: "APP Exam Coaching Added",
      description:
        "Launched dedicated APP exam preparation programme in response to student demand.",
      icon: "briefcase",
      color: "emerald",
    },
    {
      year: `${startYear + 8}`,
      title: "Patent & Trademark Agent Programmes",
      description:
        "Expanded into IP law coaching with Patent Agent and Trademark Agent exam programmes.",
      icon: "certificate",
      color: "gold",
    },
    {
      year: "2026",
      title: "1,000+ Students Milestone",
      description:
        "Crossed 1,000 students trained with 25+ active Civil Judges and APPs across Tamil Nadu.",
      icon: "star",
      color: "emerald",
    },
  ];

  const milestones: Milestone[] = customMilestones?.length
    ? customMilestones.map((m) => ({
        year: m.year,
        title: m.title,
        description: m.description,
        icon: m.icon || "star",
        color: (m.color as "navy" | "emerald" | "gold") || "navy",
      }))
    : defaultMilestones;

  const iconMap: Record<string, LucideIcon> = {
    rocket: Rocket,
    trophy: Trophy,
    monitor: Monitor,
    briefcase: Briefcase,
    certificate: Award,
    star: Star,
  };

  const colorStyles = {
    navy: {
      circle: "bg-navy-dark text-white shadow-navy-mid/30",
      year: "text-navy-mid",
    },
    emerald: {
      circle: "bg-emerald text-white shadow-emerald/30",
      year: "text-emerald",
    },
    gold: {
      circle: "bg-gold text-charcoal shadow-gold/30",
      year: "text-[#854F0B]",
    },
  };

  return (
    <section
      ref={containerRef}
      className="py-14 md:py-20 bg-white overflow-hidden"
      id="timeline"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Our Journey"
          title="Building Tamil Nadu's Judiciary, One Student at a Time"
          align="center"
          eyebrowColor="emerald"
        />

        {/* Timeline Container */}
        <div className="relative mt-12 md:mt-16">
          {/* Central Vertical Line (Desktop: centered; Mobile: left-6) */}
          <div className="absolute top-0 bottom-0 left-6 md:left-1/2 md:-translate-x-1/2 w-[2px] bg-navy-tint overflow-hidden">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{ originY: 0 }}
              className="w-full h-full bg-navy-mid"
            />
          </div>

          {/* Timeline Milestones */}
          <div className="space-y-10 md:space-y-12">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;
              const Icon = (milestone.icon && iconMap[milestone.icon]) || Star;
              const style = colorStyles[milestone.color || "navy"];

              return (
                <div
                  key={index}
                  className="relative flex flex-col md:flex-row items-start md:items-center"
                >
                  {/* Circle on Timeline (48px) */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.15 + index * 0.12,
                    }}
                    className={`absolute left-0 md:left-1/2 -translate-x-0 md:-translate-x-1/2 w-12 h-12 rounded-full ${style.circle} flex items-center justify-center shadow-lg z-20`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>

                  {/* DESKTOP VIEW: Left & Right Alternating */}
                  <div className="w-full hidden md:grid md:grid-cols-2 md:gap-16 items-center">
                    {/* Left Side */}
                    <div
                      className={`flex ${
                        isEven ? "justify-end" : "justify-start pl-8"
                      }`}
                    >
                      {isEven ? (
                        /* Card on LEFT */
                        <motion.div
                          initial={{ opacity: 0, x: -30 }}
                          animate={
                            isInView
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -30 }
                          }
                          transition={{
                            duration: 0.5,
                            delay: 0.2 + index * 0.12,
                            ease: "easeOut",
                          }}
                          className="w-full max-w-[420px] bg-white rounded-xl p-5 sm:px-6 sm:py-5 border border-black/[0.08] shadow-sm hover:shadow-md transition-shadow"
                        >
                          <span
                            className={`font-heading font-bold text-sm ${style.year} block mb-1`}
                          >
                            {milestone.year}
                          </span>
                          <h3 className="font-heading font-bold text-base text-navy-dark mb-1.5">
                            {milestone.title}
                          </h3>
                          <p className="font-sans text-sm text-charcoal leading-[1.6]">
                            {milestone.description}
                          </p>
                        </motion.div>
                      ) : (
                        /* Year label on LEFT (opposite side of card) */
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={
                            isInView
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -20 }
                          }
                          transition={{
                            duration: 0.4,
                            delay: 0.25 + index * 0.12,
                          }}
                          className="text-right pr-4 w-full"
                        >
                          <span
                            className={`font-heading font-extrabold text-2xl ${style.year}`}
                          >
                            {milestone.year}
                          </span>
                        </motion.div>
                      )}
                    </div>

                    {/* Right Side */}
                    <div
                      className={`flex ${
                        !isEven ? "justify-start" : "justify-end pr-8"
                      }`}
                    >
                      {!isEven ? (
                        /* Card on RIGHT */
                        <motion.div
                          initial={{ opacity: 0, x: 30 }}
                          animate={
                            isInView
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: 30 }
                          }
                          transition={{
                            duration: 0.5,
                            delay: 0.2 + index * 0.12,
                            ease: "easeOut",
                          }}
                          className="w-full max-w-[420px] bg-white rounded-xl p-5 sm:px-6 sm:py-5 border border-black/[0.08] shadow-sm hover:shadow-md transition-shadow"
                        >
                          <span
                            className={`font-heading font-bold text-sm ${style.year} block mb-1`}
                          >
                            {milestone.year}
                          </span>
                          <h3 className="font-heading font-bold text-base text-navy-dark mb-1.5">
                            {milestone.title}
                          </h3>
                          <p className="font-sans text-sm text-charcoal leading-[1.6]">
                            {milestone.description}
                          </p>
                        </motion.div>
                      ) : (
                        /* Year label on RIGHT (opposite side of card) */
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={
                            isInView
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: 20 }
                          }
                          transition={{
                            duration: 0.4,
                            delay: 0.25 + index * 0.12,
                          }}
                          className="text-left pl-4 w-full"
                        >
                          <span
                            className={`font-heading font-extrabold text-2xl ${style.year}`}
                          >
                            {milestone.year}
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* MOBILE VIEW: All cards on RIGHT side of timeline */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={
                      isInView
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: 20 }
                    }
                    transition={{
                      duration: 0.45,
                      delay: 0.2 + index * 0.1,
                      ease: "easeOut",
                    }}
                    className="md:hidden pl-16 w-full"
                  >
                    <div className="bg-white rounded-xl p-4 sm:p-5 border border-black/[0.08] shadow-sm">
                      <span
                        className={`font-heading font-bold text-xs ${style.year} block mb-1`}
                      >
                        {milestone.year}
                      </span>
                      <h3 className="font-heading font-bold text-sm sm:text-base text-navy-dark mb-1">
                        {milestone.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-charcoal leading-[1.6]">
                        {milestone.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AchievementsTimeline;
