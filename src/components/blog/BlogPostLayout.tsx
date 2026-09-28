"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  List,
  ChevronDown,
  ChevronUp,
  Eye,
  Calendar,
  Clock,
  User,
  ArrowRight,
} from "lucide-react";
import { PortableTextRenderer } from "./PortableTextRenderer";
import { BlogPostCTA } from "./BlogPostCTA";
import { BlogSidebar, ExamUpdateItem } from "./BlogSidebar";
import { BlogPostItem } from "./BlogGrid";
import { track } from "@/lib/analytics";

export interface SinglePostData {
  _id: string;
  title: string;
  slug: string;
  body?: any;
  excerpt: string;
  category: string;
  tags?: string[];
  publishedAt?: string;
  readingTime?: number;
  coverImage?: any;
  author?: {
    name?: string;
    designation?: string;
    photo?: { asset?: { url?: string } } | null;
  } | null;
  relatedCourse?: {
    title: string;
    slug: string;
  } | null;
}

interface BlogPostLayoutProps {
  post: SinglePostData;
  relatedPosts: BlogPostItem[];
  examUpdates?: ExamUpdateItem[];
}

function extractHeadings(body: any[]) {
  if (!Array.isArray(body)) return [];
  return body
    .filter(
      (b) =>
        b._type === "block" && (b.style === "h2" || b.style === "h3")
    )
    .map((b) => {
      const text = b.children?.map((c: any) => c.text).join("") || "";
      const id = text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      return {
        level: b.style === "h2" ? 2 : 3,
        text,
        id,
      };
    });
}

export function BlogPostLayout({
  post,
  relatedPosts,
  examUpdates,
}: BlogPostLayoutProps) {
  const [viewCount, setViewCount] = useState<number | null>(null);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const articleRef = useRef<HTMLElement | null>(null);

  // Scroll Progress
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start start", "end end"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Track & Fetch Views
  useEffect(() => {
    if (!post?.slug) return;

    // GA4 Analytics event
    track.blogRead(post.title, post.category);

    // Increment View
    fetch("/api/blog-views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: post.slug }),
    }).catch(() => {});

    // Fetch Current Count
    fetch(`/api/blog-views?slug=${encodeURIComponent(post.slug)}`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.count === "number") {
          setViewCount(data.count);
        }
      })
      .catch(() => {});
  }, [post?.slug]);

  const headings = extractHeadings(post.body);

  return (
    <>
      {/* 1. Fixed Reading Progress Bar at very top of viewport */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald via-emerald-light to-gold origin-left z-[100]"
      />

      {/* 2. Main Article + Sticky Sidebar Section */}
      <section ref={articleRef} className="py-12 sm:py-16 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left Column: Article Content (Max 720px) */}
            <article className="w-full lg:w-[68%] max-w-[740px]">
              {/* Table of Contents (if body has headings) */}
              {headings.length > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-8">
                  <button
                    type="button"
                    onClick={() => setIsTocOpen(!isTocOpen)}
                    className="flex items-center justify-between w-full text-left font-heading font-bold text-navy-dark text-sm sm:text-base"
                  >
                    <span className="flex items-center gap-2">
                      <List className="w-4 h-4 text-emerald" />
                      Table of Contents ({headings.length} sections)
                    </span>
                    {isTocOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </button>

                  {/* Expandable Links */}
                  <div
                    className={`${
                      isTocOpen ? "block" : "hidden sm:block"
                    } mt-4 pt-3 border-t border-slate-200 space-y-2`}
                  >
                    {headings.map((h, i) => (
                      <a
                        key={i}
                        href={`#${h.id}`}
                        className={`block text-xs sm:text-sm text-slate-600 hover:text-emerald transition-colors ${
                          h.level === 3 ? "pl-4 text-slate-500" : "font-medium"
                        }`}
                      >
                        {h.text}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* View Count Badge in Article Body Meta */}
              <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-500 pb-6 mb-6 border-b border-slate-100">
                <span className="flex items-center gap-1.5 font-medium text-navy-dark">
                  <Eye className="w-4 h-4 text-emerald" />
                  <span>
                    {viewCount !== null ? `${viewCount} views` : "Reading now"}
                  </span>
                </span>
                <span>·</span>
                <span>Category: <strong className="text-navy-dark capitalize">{post.category?.replace("-", " ")}</strong></span>
              </div>

              {/* PortableText Rendered Body */}
              <PortableTextRenderer content={post.body} />

              {/* BlogPostCTA (Targeted course preparation) */}
              <BlogPostCTA
                relatedCourseTitle={post.relatedCourse?.title}
                relatedCourseSlug={post.relatedCourse?.slug}
              />
            </article>

            {/* Right Column: Sticky Sidebar (260px - 32%) */}
            <div className="w-full lg:w-[32%]">
              <BlogSidebar examUpdates={examUpdates} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="bg-[#F5F5F0] py-16 sm:py-20 border-t border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <div className="mb-10 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald">
                Recommended Reading
              </span>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy-dark mt-1">
                More Articles You Might Like
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {relatedPosts.slice(0, 3).map((item) => (
                <article
                  key={item._id || item.slug}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <Link href={`/blog/${item.slug}`} className="block flex-1">
                    <div className="relative w-full h-[180px] bg-gradient-to-br from-navy-mid to-navy-dark overflow-hidden">
                      {item.coverImage?.asset?.url ? (
                        <Image
                          src={item.coverImage.asset.url}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-4 text-center">
                          <span className="font-heading font-bold text-white text-sm line-clamp-3">
                            {item.title}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-5 flex flex-col justify-between flex-1">
                      <div>
                        <span className="text-[11px] font-semibold text-emerald uppercase tracking-wider block mb-2">
                          {item.category?.replace("-", " ")}
                        </span>
                        <h4 className="font-heading font-bold text-base text-navy-dark group-hover:text-emerald transition-colors line-clamp-2 leading-snug mb-2">
                          {item.title}
                        </h4>
                        <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                          {item.excerpt}
                        </p>
                      </div>

                      <span className="inline-flex items-center text-xs font-bold text-emerald group-hover:text-emerald-dark mt-auto pt-2">
                        <span>Read guide</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default BlogPostLayout;
