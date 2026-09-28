import type { Metadata } from "next";
import { BlogArchiveClient } from "@/components/blog/BlogArchiveClient";
import { BlogPostItem } from "@/components/blog/BlogGrid";
import { ExamUpdateItem } from "@/components/blog/BlogSidebar";
import {
  getPublishedPosts,
  getLatestExamUpdatesSanity,
} from "@/lib/sanity/queries";
import { SITE_CONFIG } from "@/lib/constants";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Law Exam Blog — Civil Judge & Judiciary Resources",
  description:
    "Free guides, exam updates, and expert articles for TNPSC Civil Judge, APP Exam, Patent Agent and UGC-NET Law aspirants in Tamil Nadu. Written by practicing lawyers.",
  keywords: [
    "civil judge exam guide Tamil Nadu",
    "TNPSC civil judge blog",
    "judiciary exam preparation tips",
    "BNS BNSS BSA guide",
    "Tamil Nadu law exam blog",
  ],
  path: "/blog",
});

export const revalidate = 1800;

const placeholderPosts: BlogPostItem[] = [
  {
    _id: "1",
    title:
      "TNPSC Civil Judge Exam Syllabus 2026 — Complete Prelims and Mains Breakdown",
    slug: "tnpsc-civil-judge-syllabus-2026",
    excerpt:
      "A complete breakdown of the TNPSC Civil Judge exam syllabus — including the new BNS, BNSS, and BSA laws that replaced IPC, CrPC and the Evidence Act from July 2024. Know exactly what to study and what to skip.",
    category: "exam-guide",
    publishedAt: "2026-01-15T00:00:00Z",
    readingTime: 8,
    coverImage: null,
    author: {
      name: "Advocate [Founder Name]",
    },
  },
  {
    _id: "2",
    title:
      "BNS, BNSS & BSA — What Every Judiciary Aspirant Must Know Before the 2026 Exam",
    slug: "bns-bnss-bsa-judiciary-exam-guide",
    excerpt:
      "From 1 July 2024, three new criminal laws replaced India's century-old statutes. Every TNPSC Civil Judge and APP exam aspirant must understand these laws completely. Here is your complete guide.",
    category: "legal-update",
    publishedAt: "2026-01-10T00:00:00Z",
    readingTime: 6,
    coverImage: null,
    author: {
      name: "Senior Criminal Law Faculty",
    },
  },
  {
    _id: "3",
    title:
      "Tamil-to-English Legal Translation Words — Compiled from Past TNPSC Papers",
    slug: "tamil-legal-translation-word-list",
    excerpt:
      "The Translation Paper (100 marks in Mains) is where most candidates lose the exam. Here is a curated list of Tamil legal terms and their English equivalents compiled from past TNPSC Civil Judge papers.",
    category: "study-material",
    publishedAt: "2026-01-05T00:00:00Z",
    readingTime: 12,
    coverImage: null,
    author: {
      name: "Judicial Translation Expert",
    },
  },
];

export default async function BlogPage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url || "https://yourdomain.com";

  let posts: BlogPostItem[] = placeholderPosts;
  let examUpdates: ExamUpdateItem[] = [];

  try {
    const sanityPosts = await getPublishedPosts();
    if (Array.isArray(sanityPosts) && sanityPosts.length > 0) {
      posts = sanityPosts.map((p: any, idx: number) => ({
        _id: p._id || String(idx + 1),
        title: p.title,
        slug:
          typeof p.slug === "string"
            ? p.slug
            : p.slug?.current || `post-${idx + 1}`,
        excerpt: p.excerpt,
        category: p.category || "exam-guide",
        publishedAt: p.publishedAt,
        readingTime: p.readingTime || 6,
        coverImage: p.coverImage || null,
        author: p.author || null,
      }));
    }
  } catch {
    posts = placeholderPosts;
  }

  try {
    const updates = await getLatestExamUpdatesSanity(3);
    if (Array.isArray(updates) && updates.length > 0) {
      examUpdates = updates.map((u: any) => ({
        _id: u._id,
        title: u.title,
        examName: u.examName,
        type: u.type,
        notificationDate: u.notificationDate,
      }));
    }
  } catch {
    examUpdates = [];
  }

  // Schema: BreadcrumbList + ItemList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteUrl}/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <BlogArchiveClient posts={posts} examUpdates={examUpdates} />
    </>
  );
}
