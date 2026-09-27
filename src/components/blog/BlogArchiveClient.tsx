"use client";

import { useState } from "react";
import { BlogHero } from "./BlogHero";
import { BlogGrid, BlogPostItem } from "./BlogGrid";
import { BlogSidebar, ExamUpdateItem } from "./BlogSidebar";

interface BlogArchiveClientProps {
  posts: BlogPostItem[];
  examUpdates?: ExamUpdateItem[];
}

export function BlogArchiveClient({
  posts,
  examUpdates,
}: BlogArchiveClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* Hero with Search Bar */}
      <BlogHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area: 70% Grid + 30% Sidebar */}
      <section className="py-16 sm:py-20 bg-slate-50 relative">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
            {/* Left 70%: Blog Grid */}
            <div className="w-full lg:w-[68%]">
              <BlogGrid posts={posts} searchQuery={searchQuery} />
            </div>

            {/* Right 30%: Sticky Sidebar */}
            <div className="w-full lg:w-[32%]">
              <BlogSidebar examUpdates={examUpdates} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogArchiveClient;
