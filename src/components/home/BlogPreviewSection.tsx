import { getLatestPosts } from "@/lib/sanity/queries";
import {
  BlogPreviewSectionClient,
  BlogPostItem,
} from "./BlogPreviewSectionClient";

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
    author: null,
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
    author: null,
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
    author: null,
  },
];

export async function BlogPreviewSection() {
  let posts: BlogPostItem[] = placeholderPosts;

  try {
    const sanityPosts = await getLatestPosts(3);
    if (Array.isArray(sanityPosts) && sanityPosts.length > 0) {
      posts = sanityPosts.map((p: any, index: number) => ({
        _id: p._id || String(index + 1),
        title: p.title,
        slug: typeof p.slug === "string" ? p.slug : p.slug?.current || `post-${index + 1}`,
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

  return <BlogPreviewSectionClient posts={posts} />;
}

export default BlogPreviewSection;
