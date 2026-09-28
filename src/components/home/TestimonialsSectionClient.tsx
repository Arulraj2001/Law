"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Star, Play, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TestimonialCard } from "@/components/shared/TestimonialCard";

function YouTubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export interface TestimonialItem {
  id: string;
  student_name: string;
  current_post: string;
  course_name: string;
  college?: string | null;
  batch_year?: string | null;
  quote: string;
  video_url?: string | null;
  photo_url?: string | null;
  type?: string;
  rating?: number;
  is_featured?: boolean;
  sort_order?: number;
}

export interface TestimonialsSectionClientProps {
  testimonials: TestimonialItem[];
  youtubeUrl?: string;
}

function getCourseBadge(courseName?: string, currentPost?: string): string {
  const combined = `${courseName || ""} ${currentPost || ""}`.toLowerCase();
  if (combined.includes("app") || combined.includes("prosecutor")) {
    return "⭐ APP";
  }
  if (combined.includes("civil judge") || combined.includes("judge")) {
    return "⭐ Civil Judge";
  }
  return "⭐ Alumni";
}

function getYouTubeId(url?: string | null): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : null;
}

export function TestimonialsSectionClient({
  testimonials,
  youtubeUrl: youtubeUrlProp,
}: TestimonialsSectionClientProps) {
  const youtubeUrl = youtubeUrlProp || SITE_CONFIG.social?.youtube || "";
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  // Separate video testimonials if any have a valid video_url
  const videoTestimonials = testimonials.filter(
    (t) => t.video_url && t.video_url.trim().length > 0
  );

  const hasVideos = videoTestimonials.length > 0;
  const hasYouTubeLink = Boolean(youtubeUrl);

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="py-14 md:py-20 bg-[#F5F5F0] relative overflow-hidden"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Student Testimonials"
          title="Words from Those Who Are Now Serving as Judges"
          subtitle="These are not reviews from students. These are words from judicial officers who trained here — and sit in courtrooms today."
          align="center"
        />

        {/* Rating Summary Row (Above Testimonial Cards) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-10 text-center"
        >
          {/* 5 Stars */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-6 h-6 fill-[#1D9E75] text-[#1D9E75]"
              />
            ))}
          </div>

          {/* Rating Score */}
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-extrabold text-[28px] text-[#042C53] leading-none">
              5.0 / 5.0
            </span>
            <span className="text-sm text-slate-500 font-medium">
              Based on 50+ student reviews
            </span>
          </div>

          {/* Divider */}
          <span className="hidden sm:inline text-slate-300">|</span>

          {/* Verified Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-tint/50 border border-emerald/20 text-[#1D9E75] text-xs font-semibold shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified Reviews</span>
          </div>
        </motion.div>

        {/* PART 1 — Video Testimonials Row */}
        {hasVideos ? (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto"
          >
            {videoTestimonials.slice(0, 2).map((video) => {
              const videoId = getYouTubeId(video.video_url);
              const thumbnail = videoId
                ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                : video.photo_url || "/images/placeholder-video.jpg";

              return (
                <a
                  key={video.id}
                  href={video.video_url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-[#042C53]">
                    <Image
                      src={thumbnail}
                      alt={video.student_name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/95 text-[#042C53] group-hover:bg-[#1D9E75] group-hover:text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-heading font-bold text-base text-[#042C53] group-hover:text-[#1D9E75] transition-colors">
                      {video.student_name}
                    </h4>
                    <p className="text-xs text-[#1D9E75] font-semibold mt-0.5">
                      {video.current_post}
                    </p>
                  </div>
                </a>
              );
            })}
          </motion.div>
        ) : (
          /* Video Placeholder when no video URLs are published yet */
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="mb-10 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs text-xs text-slate-600">
              <YouTubeIcon className="w-4 h-4 text-[#FF0000]" />
              <span>
                Video testimonials coming soon —{" "}
                {hasYouTubeLink ? (
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#042C53] underline hover:text-[#1D9E75] transition-colors"
                  >
                    check our YouTube channel
                  </a>
                ) : (
                  "check back soon"
                )}
              </span>
            </div>
          </motion.div>
        )}

        {/* PART 2 — Text Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.slice(0, 4).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.55,
                delay: 0.4 + index * 0.12,
                ease: "easeOut",
              }}
              className="relative h-full"
            >
              {/* Decorative Top-Right Corner Course Badge */}
              <div className="absolute top-5 right-5 z-20 pointer-events-none">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-tint/60 text-[#1D9E75] border border-[#1D9E75]/25 text-[11px] font-bold tracking-tight shadow-xs">
                  {getCourseBadge(
                    testimonial.course_name,
                    testimonial.current_post
                  )}
                </span>
              </div>

              {/* Shared TestimonialCard (text variant) */}
              <TestimonialCard testimonial={testimonial} variant="text" />
            </motion.div>
          ))}
        </div>

        {/* "Watch More" CTA Below Testimonials */}
        {hasYouTubeLink && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center mt-12 pt-2"
          >
            <span className="font-heading font-semibold text-sm text-[#042C53]">
              Watch student testimonials on our YouTube channel
            </span>

            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF0000] hover:bg-[#CC0000] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <YouTubeIcon className="w-4 h-4 fill-white" />
              <span>Watch on YouTube</span>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default TestimonialsSectionClient;
