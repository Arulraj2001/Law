"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Award, MapPin, Calendar, Building } from "lucide-react";
import type { Topper } from "@/lib/supabase/types";

export interface TopperCardProps {
  topper: Topper | any;
  index?: number;
  variant?: "featured" | "grid";
}

export function TopperCard({
  topper,
  index = 0,
  variant = "featured",
}: TopperCardProps) {
  // Get initials for fallback avatar
  const initials = (topper.name || "TN")
    .replace(/[\[\]]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part: string) => part[0])
    .join("")
    .toUpperCase();

  const isFeatured = variant === "featured";
  const avatarSize = isFeatured ? 80 : 60;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      className="h-full"
    >
      <div className="group h-full bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-emerald transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between relative overflow-hidden">
        <div>
          {/* Avatar and Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative shrink-0 overflow-hidden rounded-full border-2 border-emerald/30 group-hover:border-emerald transition-colors">
              {topper.photo_url ? (
                <div
                  className="relative group-hover:scale-105 transition-transform duration-300"
                  style={{ width: avatarSize, height: avatarSize }}
                >
                  <Image
                    src={topper.photo_url}
                    alt={topper.name}
                    width={avatarSize}
                    height={avatarSize}
                    className="object-cover w-full h-full rounded-full"
                  />
                  {/* Subtle quote icon overlay on hover */}
                  <div className="absolute inset-0 bg-navy-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
                    <Quote className="w-5 h-5 text-white fill-white" />
                  </div>
                </div>
              ) : (
                <div
                  style={{ width: avatarSize, height: avatarSize }}
                  className="bg-navy-dark text-white font-heading font-bold flex items-center justify-center text-lg tracking-wider group-hover:scale-105 transition-transform"
                >
                  {initials}
                </div>
              )}
            </div>

            {/* Name, Post, Rank */}
            <div className="min-w-0 flex-1 space-y-1">
              <h3 className="font-heading font-bold text-base text-navy-dark tracking-tight line-clamp-1">
                {topper.name}
              </h3>
              <p className="text-[13px] font-semibold text-emerald line-clamp-1">
                {topper.post}
              </p>
              {topper.rank && (
                <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                  <Award className="w-3 h-3 text-amber-700" />
                  <span>{topper.rank}</span>
                </div>
              )}
            </div>
          </div>

          {/* College */}
          {topper.college && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
              <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="line-clamp-1">{topper.college}</span>
            </div>
          )}

          {/* Badges for Batch Year & District */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {topper.batch_year && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>Batch {topper.batch_year}</span>
              </span>
            )}

            {topper.district && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{topper.district}</span>
              </span>
            )}
          </div>

          {/* Quote (Featured variant only) */}
          {isFeatured && topper.quote && (
            <div className="relative pt-3 border-t border-slate-100">
              <p className="text-xs italic text-slate-600 leading-relaxed line-clamp-3">
                &ldquo;{topper.quote}&rdquo;
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default TopperCard;
