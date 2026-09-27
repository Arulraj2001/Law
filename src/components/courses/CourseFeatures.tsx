"use client";

import { motion } from "framer-motion";
import {
  Languages,
  ClipboardList,
  PenTool,
  RefreshCw,
  UserCheck,
  Monitor,
  Mic,
  Bell,
  CheckCircle2,
  Scale,
  BookOpen,
  FileText,
  Globe,
  Award,
  MapPin,
  Users,
  Shield,
  LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface CourseFeaturesProps {
  features: FeatureItem[];
  courseTitle: string;
}

export function CourseFeatures({
  features,
  courseTitle,
}: CourseFeaturesProps) {
  const iconMap: Record<string, LucideIcon> = {
    language: Languages,
    "clipboard-list": ClipboardList,
    "pen-tool": PenTool,
    "refresh-cw": RefreshCw,
    "user-check": UserCheck,
    monitor: Monitor,
    mic: Mic,
    bell: Bell,
    scale: Scale,
    "book-open": BookOpen,
    "file-text": FileText,
    globe: Globe,
    award: Award,
    "map-pin": MapPin,
    users: Users,
    shield: Shield,
    registered: Award,
  };

  return (
    <section className="py-20 bg-white" id="features">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="What You Get"
          title={`Everything Included in ${courseTitle}`}
          subtitle="A complete, end-to-end learning ecosystem designed to turn law graduates into successful judicial officers."
          align="center"
          eyebrowColor="emerald"
        />

        {/* 4-Column Grid on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, idx) => {
            const Icon = iconMap[feature.icon] || CheckCircle2;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-white border border-black/[0.08] rounded-2xl p-6 hover:shadow-lg hover:border-navy-light/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Container: 44px, navy-tint bg, navy icon */}
                  <div className="w-11 h-11 rounded-xl bg-navy-tint flex items-center justify-center mb-4 text-navy-dark shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-base text-navy-dark mb-2 leading-snug">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-[13px] leading-[1.6] text-slate-600">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CourseFeatures;
