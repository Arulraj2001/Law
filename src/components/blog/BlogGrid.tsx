"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Calendar, Search, ArrowRight, User } from "lucide-react";
import { getBlurDataUrl } from "@/lib/image-config";

export interface BlogPostItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt?: string;
  readingTime?: number;
  coverImage?: any;
  author?: {
    name?: string;
    photo?: { asset?: { url?: string } };
  } | null;
}

interface BlogGridProps {
  posts: BlogPostItem[];
  searchQuery?: string;
}

const CATEGORIES = [
  "All",
  "Exam Guide",
  "Legal Update",
  "Study Material",
  "Success Story",
  "Career Advice",
];

const categoryColorMap: Record<string, string> = {
  "exam-guide": "bg-navy-dark text-white",
  "legal-update": "bg-emerald text-white",
  "study-material": "bg-gold-light text-amber-900 border border-gold",
  "success-story": "bg-purple-100 text-purple-900 border border-purple-200",
  "career-advice": "bg-sky-100 text-sky-900 border border-sky-200",
};

export function BlogGrid({ posts, searchQuery = "" }: BlogGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Filter logic: category + search query
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Category Filter
      if (selectedCategory !== "All") {
        const catSlug = selectedCategory.toLowerCase().replace(/\s+/g, "-");
        const postCatSlug = post.category?.toLowerCase().replace(/\s+/g, "-");
        if (postCatSlug !== catSlug) {
          return false;
        }
      }

      // Search Query Filter
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = post.title?.toLowerCase().includes(query);
        const matchesExcerpt = post.excerpt?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesExcerpt) {
          return false;
        }
      }

      return true;
    });
  }, [posts, selectedCategory, searchQuery]);

  const displayedPosts = filteredPosts.slice(0, visibleCount);
  const featuredPost = displayedPosts.length > 0 ? displayedPosts[0] : null;
  const remainingPosts = displayedPosts.slice(1);

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-navy-dark text-white shadow-sm"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Post count display */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 mb-6">
        <span>
          Showing{" "}
          <strong className="text-navy-dark">{displayedPosts.length}</strong> of{" "}
          <strong className="text-navy-dark">{filteredPosts.length}</strong>{" "}
          articles
        </span>
        {(selectedCategory !== "All" || searchQuery) && (
          <button
            type="button"
            onClick={() => setSelectedCategory("All")}
            className="text-xs text-emerald font-semibold hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Grid or Empty State */}
      {displayedPosts.length > 0 ? (
        <div className="space-y-8">
          {/* Featured Post (spans full width) */}
          {featuredPost && (
            <motion.article
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg transition-all group"
            >
              <Link href={`/blog/${featuredPost.slug}`} className="block">
                {/* Large Featured Image */}
                <div className="relative w-full h-[240px] sm:h-[300px] bg-gradient-to-br from-navy-dark via-navy-mid to-[#185FA5] overflow-hidden">
                  {featuredPost.coverImage?.asset?.url ? (
                    <Image
                      src={featuredPost.coverImage.asset.url}
                      alt={featuredPost.title}
                      fill
                      placeholder="blur"
                      blurDataURL={getBlurDataUrl(800, 400)}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-6 text-center">
                      <div className="max-w-md">
                        <span className="text-white/60 text-xs uppercase tracking-widest block mb-2 font-semibold">
                          {featuredPost.category || "Exam Guide"}
                        </span>
                        <h3 className="font-heading font-bold text-white text-xl sm:text-2xl line-clamp-2">
                          {featuredPost.title}
                        </h3>
                      </div>
                    </div>
                  )}

                  {/* Badges on image */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-400 text-navy-dark font-extrabold text-xs shadow-md">
                      ⭐ Featured
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                        categoryColorMap[featuredPost.category] ||
                        "bg-white/90 text-navy-dark"
                      }`}
                    >
                      {featuredPost.category?.replace("-", " ")}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                    {featuredPost.publishedAt && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(featuredPost.publishedAt).toLocaleDateString(
                          "en-IN",
                          { month: "short", day: "numeric", year: "numeric" }
                        )}
                      </span>
                    )}
                    {featuredPost.readingTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredPost.readingTime} min read
                      </span>
                    )}
                    {featuredPost.author?.name && (
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {featuredPost.author.name}
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-bold text-xl sm:text-[22px] text-navy-dark group-hover:text-emerald transition-colors leading-snug mb-3">
                    {featuredPost.title}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-5 mb-4">
                    {featuredPost.excerpt}
                  </p>

                  <span className="inline-flex items-center text-sm font-bold text-emerald group-hover:text-emerald-dark">
                    <span>Read complete guide</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.article>
          )}

          {/* Remaining Posts in 2-Column Grid */}
          {remainingPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {remainingPosts.map((post, index) => (
                <motion.article
                  key={post._id || post.slug}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <Link href={`/blog/${post.slug}`} className="block flex-1">
                    {/* Image */}
                    <div className="relative w-full h-[220px] bg-gradient-to-br from-navy-mid to-navy-dark overflow-hidden">
                      {post.coverImage?.asset?.url ? (
                        <Image
                          src={post.coverImage.asset.url}
                          alt={post.title}
                          fill
                          placeholder="blur"
                          blurDataURL={getBlurDataUrl(600, 300)}
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-4 text-center">
                          <span className="font-heading font-bold text-white text-base line-clamp-3">
                            {post.title}
                          </span>
                        </div>
                      )}
                      <span
                        className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                          categoryColorMap[post.category] ||
                          "bg-navy-dark text-white"
                        }`}
                      >
                        {post.category?.replace("-", " ")}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-5 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mb-2.5">
                          {post.publishedAt && (
                            <span>
                              {new Date(post.publishedAt).toLocaleDateString(
                                "en-IN",
                                { month: "short", day: "numeric", year: "numeric" }
                              )}
                            </span>
                          )}
                          {post.readingTime && (
                            <span>· {post.readingTime} min read</span>
                          )}
                          {post.author?.name && (
                            <span>· {post.author.name}</span>
                          )}
                        </div>

                        <h4 className="font-heading font-bold text-base sm:text-[17px] text-navy-dark group-hover:text-emerald transition-colors line-clamp-2 leading-snug mb-2.5">
                          {post.title}
                        </h4>

                        <p className="text-slate-600 text-xs sm:text-sm line-clamp-4 leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                      </div>

                      <span className="inline-flex items-center text-xs sm:text-sm font-bold text-emerald group-hover:text-emerald-dark mt-auto pt-2">
                        <span>Read article</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}

          {/* Pagination / Load More */}
          {filteredPosts.length > visibleCount && (
            <div className="text-center pt-6">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="px-8 py-3 rounded-full border border-navy-dark text-navy-dark font-semibold text-sm hover:bg-navy-dark hover:text-white transition-all shadow-xs"
              >
                Load More Articles
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h4 className="font-heading font-bold text-lg text-navy-dark mb-1">
            No articles found for this category.
          </h4>
          <p className="text-slate-500 text-sm mb-6">
            We are adding content regularly. Check back soon or join our WhatsApp channel for updates.
          </p>
          <button
            type="button"
            onClick={() => setSelectedCategory("All")}
            className="px-6 py-2.5 rounded-full bg-navy-dark text-white text-xs font-semibold hover:bg-navy-mid transition-colors"
          >
            View All Articles
          </button>
        </div>
      )}
    </div>
  );
}

export default BlogGrid;
