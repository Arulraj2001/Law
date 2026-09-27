"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Play, Video } from "lucide-react";
import type { Testimonial } from "@/lib/supabase/types";

export interface TestimonialCardProps {
  testimonial: Testimonial | any;
  variant?: "text" | "video" | "auto";
}

// Helper to extract YouTube video ID
function getYouTubeId(url?: string | null): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : null;
}

export function TestimonialCard({
  testimonial,
  variant = "auto",
}: TestimonialCardProps) {
  const type = testimonial.type || "text";

  // Determine which presentation to render
  const renderMode =
    variant === "auto"
      ? type === "video"
        ? "video"
        : type === "both"
        ? "both"
        : "text"
      : variant;

  const videoId = getYouTubeId(testimonial.video_url);
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : testimonial.photo_url || "/images/placeholder-video.jpg";

  // Initials for avatar fallback
  const initials = (testimonial.student_name || testimonial.name || "TN")
    .replace(/[\[\]]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p: string) => p[0])
    .join("")
    .toUpperCase();

  // Video Card Presentation
  if (renderMode === "video") {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="h-full"
      >
        <a
          href={testimonial.video_url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="group block h-full bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all"
        >
          {/* Video Thumbnail with Play Button */}
          <div className="relative aspect-video w-full overflow-hidden bg-navy-dark">
            <Image
              src={thumbnailUrl}
              alt={testimonial.student_name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            />
            {/* Navy gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/30 to-transparent group-hover:from-navy-dark/95 transition-colors" />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white/95 text-navy-dark group-hover:bg-emerald group-hover:text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300">
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </div>
            </div>
          </div>

          {/* Student Info */}
          <div className="p-5 space-y-1">
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < (testimonial.rating || 5)
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-200"
                  }`}
                />
              ))}
            </div>

            <h4 className="font-heading font-bold text-base text-navy-dark group-hover:text-emerald transition-colors line-clamp-1">
              {testimonial.student_name}
            </h4>

            {testimonial.current_post && (
              <p className="text-xs font-semibold text-emerald line-clamp-1">
                {testimonial.current_post}
              </p>
            )}

            {(testimonial.course_name || testimonial.batch_year) && (
              <p className="text-xs text-slate-500">
                {[testimonial.course_name, testimonial.batch_year]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
          </div>
        </a>
      </motion.div>
    );
  }

  // Text Card & "Both" Card Presentation
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <div className="relative h-full bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 border-l-4 border-l-navy-mid shadow-sm hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden">
        {/* Large Decorative Quotation Mark */}
        <span className="absolute top-2 left-4 text-7xl font-serif font-black text-navy-mid/10 leading-none select-none pointer-events-none">
          &ldquo;
        </span>

        <div className="relative z-10 space-y-4">
          {/* Star Rating */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < (testimonial.rating || 5)
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-200"
                }`}
              />
            ))}
          </div>

          {/* Quote Text */}
          <p className="font-sans text-sm sm:text-[15px] italic text-slate-600 leading-[1.7] min-h-[4.5rem]">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        </div>

        {/* Bottom Student Info & Optional Watch Video Button */}
        <div className="relative z-10 pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {testimonial.photo_url ? (
              <Image
                src={testimonial.photo_url}
                alt={testimonial.student_name}
                width={44}
                height={44}
                className="w-11 h-11 rounded-full object-cover shrink-0 border border-slate-200"
              />
            ) : (
              <div className="w-11 h-11 rounded-full bg-navy-tint text-navy-dark font-heading font-bold flex items-center justify-center shrink-0 border border-navy-mid/20 text-xs">
                {initials}
              </div>
            )}

            <div className="min-w-0">
              <h4 className="font-heading font-bold text-sm text-navy-dark line-clamp-1">
                {testimonial.student_name}
              </h4>
              {testimonial.current_post && (
                <p className="text-xs font-semibold text-emerald line-clamp-1">
                  {testimonial.current_post}
                </p>
              )}
              {(testimonial.course_name || testimonial.batch_year) && (
                <p className="text-[11px] text-slate-400 line-clamp-1">
                  {[testimonial.course_name, testimonial.batch_year]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              )}
            </div>
          </div>

          {/* "Both" variant Watch Video Button */}
          {renderMode === "both" && testimonial.video_url && (
            <a
              href={testimonial.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald hover:text-emerald-dark bg-emerald-tint/60 px-3 py-1.5 rounded-full border border-emerald/20 shrink-0 transition-colors"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Watch</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default TestimonialCard;
