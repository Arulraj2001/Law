"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, Scale, FileText, Briefcase, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

export interface BlogPostItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category?: string;
  publishedAt?: string;
  readingTime?: number;
  coverImage?: any;
  author?: any;
}

interface BlogPreviewSectionClientProps {
  posts: BlogPostItem[];
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "Recent";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  } catch {
    return dateStr;
  }
}

function getCategoryConfig(category?: string) {
  switch (category) {
    case "exam-guide":
      return {
        label: "Exam Guide",
        gradient: "bg-gradient-to-br from-[#042C53] to-[#185FA5]",
        badgeBg: "bg-navy-tint text-navy-dark",
        Icon: BookOpen,
      };
    case "legal-update":
      return {
        label: "Legal Update",
        gradient: "bg-gradient-to-br from-[#0F6E56] to-[#1D9E75]",
        badgeBg: "bg-emerald-tint text-emerald-dark",
        Icon: Scale,
      };
    case "study-material":
      return {
        label: "Study Material",
        gradient: "bg-gradient-to-br from-[#854F0B] to-[#C9A84C]",
        badgeBg: "bg-gold-light text-amber-800",
        Icon: FileText,
      };
    case "career-advice":
      return {
        label: "Career Advice",
        gradient: "bg-gradient-to-br from-[#1E1B4B] to-[#3B82F6]",
        badgeBg: "bg-navy-tint text-navy-dark",
        Icon: Briefcase,
      };
    default:
      return {
        label: "Article",
        gradient: "bg-gradient-to-br from-[#042C53] to-[#185FA5]",
        badgeBg: "bg-navy-tint text-navy-dark",
        Icon: BookOpen,
      };
  }
}

export function BlogPreviewSectionClient({ posts }: BlogPreviewSectionClientProps) {
  return (
    <section className="py-14 lg:py-20 bg-white" id="blog">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Free Resources"
          title="Guides & Articles for Judicial Exam Aspirants"
          subtitle="Expert guidance written for Tamil Nadu law exam preparation — by faculty who have trained 25+ successful judges."
          align="center"
          eyebrowColor="emerald"
        />

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => {
            const config = getCategoryConfig(post.category);
            const Icon = config.Icon;
            const coverImageUrl =
              typeof post.coverImage === "string"
                ? post.coverImage
                : post.coverImage?.asset?.url || null;

            return (
              <motion.div
                key={post._id || post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                  ease: "easeOut",
                }}
                whileHover={{ y: -4 }}
                className={`group flex flex-col bg-white rounded-2xl overflow-hidden border border-black/[0.08] hover:border-navy-light/30 hover:shadow-xl transition-all duration-300 ${
                  index === 2 ? "md:max-lg:col-span-2 md:max-lg:max-w-md md:max-lg:mx-auto md:max-lg:w-full" : ""
                }`}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex flex-col flex-1"
                  aria-label={`Read article: ${post.title}`}
                >
                  {/* Card Image Area (top) */}
                  <div className="relative h-[160px] md:h-[180px] w-full overflow-hidden shrink-0">
                    {coverImageUrl ? (
                      <Image
                        src={coverImageUrl}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className={`w-full h-full ${config.gradient} flex flex-col items-center justify-center text-white p-4 transition-transform duration-500 group-hover:scale-105`}
                      >
                        <Icon className="w-10 h-10 text-white drop-shadow-sm mb-2" />
                        <span className="text-xs uppercase tracking-widest text-white/95 font-semibold">
                          {config.label}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Category Badge */}
                      <span
                        className={`inline-block text-[10px] font-semibold uppercase tracking-wider rounded-full px-2.5 py-0.5 ${config.badgeBg}`}
                      >
                        {config.label}
                      </span>

                      {/* Article Title */}
                      <h3 className="font-heading font-bold text-[17px] text-charcoal line-clamp-2 mt-2 group-hover:text-navy-mid transition-colors duration-200 leading-snug">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="font-sans text-[13px] leading-[1.6] text-slate-600 line-clamp-3 mt-2">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Meta Row */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-black/[0.06] text-slate-500 text-xs">
                      <span>📅 {formatDate(post.publishedAt)}</span>
                      <span>🕐 {post.readingTime || 5} min read</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Below Grid: Explore All Articles CTA */}
        <div className="mt-10 lg:mt-12 text-center">
          <p className="text-sm sm:text-base text-slate-600 mb-4 max-w-xl mx-auto">
            We publish weekly guides on exam strategy, legal updates, and preparation tips.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-navy-mid text-navy-mid font-semibold text-sm hover:bg-navy-dark hover:border-navy-dark hover:text-white transition-all duration-300 shadow-sm"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* SEO Note Strip with Anchor Keywords */}
          <div className="text-xs text-slate-500 mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span>Latest updates:</span>
            <Link
              href="/blog/tnpsc-civil-judge-syllabus-2026"
              className="text-slate-600 hover:text-navy-mid hover:underline"
            >
              TNPSC Civil Judge Exam 2026
            </Link>
            <span>·</span>
            <Link
              href="/blog"
              className="text-slate-600 hover:text-navy-mid hover:underline"
            >
              APP Exam Notification
            </Link>
            <span>·</span>
            <Link
              href="/blog/bns-bnss-bsa-judiciary-exam-guide"
              className="text-slate-600 hover:text-navy-mid hover:underline"
            >
              BNS &amp; BNSS Coverage
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogPreviewSectionClient;
