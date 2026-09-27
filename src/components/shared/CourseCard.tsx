"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Gavel,
  Briefcase,
  FileText,
  BadgeCheck,
  GraduationCap,
  Award,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import type { Course as SupabaseCourse } from "@/lib/supabase/types";

// Extended course interface to support both Supabase Course row and local COURSES array
export interface CourseCardData {
  id?: string;
  slug: string;
  title: string;
  short_description?: string | null;
  description?: string;
  badge?: string | null;
  badge_color?: string | null;
  badgeColor?: string;
  icon?: string | null;
  highlights?: string[];
  href?: string | null;
  mode?: string | null;
  duration?: string | null;
}

export interface CourseCardProps {
  course: SupabaseCourse | CourseCardData;
  index?: number;
  variant?: "home" | "grid";
}

export function CourseCard({
  course,
  index = 0,
  variant = "home",
}: CourseCardProps) {
  const badgeColor =
    (course as CourseCardData).badge_color ||
    (course as CourseCardData).badgeColor ||
    "navy";

  const description =
    course.short_description ||
    (course as CourseCardData).description ||
    "";

  const href = course.href || `/courses/${course.slug}`;
  const highlights = (course.highlights || []).slice(0, 4);

  // Icon mapping
  const renderIcon = (iconName?: string | null) => {
    switch (iconName?.toLowerCase()) {
      case "gavel":
        return <Gavel className="w-5 h-5 text-navy-mid" />;
      case "briefcase":
        return <Briefcase className="w-5 h-5 text-navy-mid" />;
      case "certificate":
        return <FileText className="w-5 h-5 text-emerald" />;
      case "registered":
        return <BadgeCheck className="w-5 h-5 text-emerald" />;
      case "school":
        return <GraduationCap className="w-5 h-5 text-amber-700" />;
      case "award":
        return <Award className="w-5 h-5 text-amber-700" />;
      default:
        return <Gavel className="w-5 h-5 text-navy-mid" />;
    }
  };

  // Badge theme mapping
  const badgeClasses = {
    navy: "bg-navy-tint text-navy-dark border-navy-light/40",
    emerald: "bg-emerald-tint text-emerald-dark border-emerald/40",
    gold: "bg-gold-light text-amber-800 border-gold/40",
  }[badgeColor] || "bg-navy-tint text-navy-dark border-navy-light/40";

  // Icon container theme mapping
  const iconContainerClasses = {
    navy: "bg-navy-tint/80 border-navy-mid/20",
    emerald: "bg-emerald-tint/80 border-emerald/25",
    gold: "bg-gold-light/80 border-gold/30",
  }[badgeColor] || "bg-navy-tint/80 border-navy-mid/20";

  // Card border styling based on badge color
  const borderClasses = {
    navy: "border-[#E6F1FB] hover:border-navy-mid/40",
    emerald: "border-[#E1F5EE] hover:border-emerald/40",
    gold: "border-[#F5EDD0] hover:border-gold/50",
  }[badgeColor] || "border-slate-200 hover:border-navy-mid/40";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Link
        href={href}
        className={`group flex flex-col justify-between h-full bg-white rounded-2xl p-6 sm:p-7 border ${borderClasses} shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
      >
        <div>
          {/* Top: Icon Circle & Badge Pill */}
          <div className="flex items-center justify-between gap-3 mb-5">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-sm group-hover:scale-105 transition-transform ${iconContainerClasses}`}
            >
              {renderIcon(course.icon)}
            </div>

            {course.badge && (
              <span
                className={`text-xs px-2.5 py-1 rounded-full border font-semibold tracking-wide ${badgeClasses}`}
              >
                {course.badge}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-heading font-bold text-lg text-navy-dark mb-2 group-hover:text-emerald transition-colors line-clamp-1">
            {course.title}
          </h3>

          {/* Description */}
          <p className="font-sans text-sm text-slate-600 leading-relaxed mb-6 line-clamp-2">
            {description}
          </p>

          {/* Highlights List */}
          {highlights.length > 0 && (
            <ul className="space-y-2.5 mb-6 pt-4 border-t border-slate-100">
              {highlights.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-xs text-slate-600"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Bottom Link Action */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-navy-mid group-hover:text-emerald transition-colors">
          <span>Enquire Now</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
        </div>
      </Link>
    </motion.div>
  );
}

export default CourseCard;
