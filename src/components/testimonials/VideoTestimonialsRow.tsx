"use client";

import { motion } from "framer-motion";
import { Play, Video } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export interface VideoTestimonialItem {
  id: string;
  student_name: string;
  current_post?: string;
  video_url?: string | null;
}

interface VideoTestimonialsRowProps {
  testimonials?: VideoTestimonialItem[];
}

function getYouTubeId(url?: string | null): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : null;
}

export function VideoTestimonialsRow({
  testimonials = [],
}: VideoTestimonialsRowProps) {
  const videoTestimonials = testimonials.filter(
    (t) => t.video_url && t.video_url.trim().length > 0
  );

  const hasVideos = videoTestimonials.length > 0;
  const youtubeUrl = SITE_CONFIG.social?.youtube || "https://youtube.com";

  return (
    <section className="bg-white py-16 sm:py-20 border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald">
            Watch
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-navy-dark mt-2 mb-3">
            Video Testimonials
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Hear it directly from our students — now serving as judicial officers.
          </p>
        </div>

        {hasVideos ? (
          /* Real Video Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videoTestimonials.map((item, index) => {
              const videoId = getYouTubeId(item.video_url);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                    {videoId ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                        title={item.student_name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full border-0"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/60">
                        Video Unavailable
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h4 className="font-heading font-bold text-navy-dark text-base sm:text-lg">
                      {item.student_name}
                    </h4>
                    {item.current_post && (
                      <p className="text-xs sm:text-sm text-emerald font-semibold mt-0.5">
                        {item.current_post}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Placeholder UI when no video testimonials are recorded yet */
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  name: "Judge [Selected Candidate 1]",
                  post: "Civil Judge (Junior Division)",
                },
                {
                  name: "Adv. [Selected Candidate 2]",
                  post: "Assistant Public Prosecutor",
                },
              ].map((placeholder, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm"
                >
                  {/* 16:9 Aspect Ratio Gradient Placeholder */}
                  <div className="relative aspect-video w-full bg-gradient-to-br from-navy-dark via-navy-mid to-[#0A1628] flex flex-col items-center justify-center text-center p-6 group cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 fill-white ml-1" />
                    </div>
                    <span className="text-white font-semibold text-sm tracking-wide">
                      Video coming soon
                    </span>
                    <span className="text-white/60 text-xs mt-1">
                      Recorded in our studio
                    </span>
                  </div>

                  <div className="p-5 bg-slate-50 border-t border-slate-100">
                    <h4 className="font-heading font-bold text-navy-dark text-base">
                      {placeholder.name}
                    </h4>
                    <p className="text-xs text-emerald font-semibold mt-0.5">
                      {placeholder.post}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Reassurance & YouTube link */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 text-center max-w-xl mx-auto">
              <p className="text-slate-600 text-sm mb-4">
                We are adding video testimonials soon. Subscribe to our YouTube channel for interview walkthroughs and candidate talks.
              </p>
              {youtubeUrl && (
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span>Subscribe on YouTube</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default VideoTestimonialsRow;
