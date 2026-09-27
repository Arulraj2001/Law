import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Calendar, Clock, User } from "lucide-react";
import { BlogPostLayout, SinglePostData } from "@/components/blog/BlogPostLayout";
import { BlogPostItem } from "@/components/blog/BlogGrid";
import {
  getPostBySlug,
  getAllPostSlugs,
  getPublishedPosts,
  getLatestExamUpdatesSanity,
} from "@/lib/sanity/queries";
import { SITE_CONFIG } from "@/lib/constants";
import { generateBlogMetadata } from "@/lib/seo/metadata";

export const revalidate = 1800; // 30 minutes ISR

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const placeholderFullPosts: Record<string, SinglePostData> = {
  "tnpsc-civil-judge-syllabus-2026": {
    _id: "1",
    title:
      "TNPSC Civil Judge Exam Syllabus 2026 — Complete Prelims and Mains Breakdown",
    slug: "tnpsc-civil-judge-syllabus-2026",
    excerpt:
      "A complete breakdown of the TNPSC Civil Judge exam syllabus — including the new BNS, BNSS, and BSA laws that replaced IPC, CrPC and the Evidence Act from July 2024. Know exactly what to study and what to skip.",
    category: "exam-guide",
    publishedAt: "2026-01-15T00:00:00Z",
    readingTime: 8,
    author: {
      name: "Advocate [Founder Name]",
      designation: "Founder & Chief Faculty",
      photo: null,
    },
    relatedCourse: {
      title: "Civil Judge Exam Coaching",
      slug: "civil-judge",
    },
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "The Tamil Nadu Judicial Service Civil Judge examination is one of the most competitive state legal exams in India. For 2026, the single most critical structural change is the transition to the new criminal law triumvirate: Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), and Bharatiya Sakshya Adhiniyam (BSA).",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "Preliminary Examination Pattern & Structure",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "The Preliminary Examination consists of a single objective paper with 100 multiple choice questions (100 marks, 3 hours). The paper evaluates three distinct domains:",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "1. Part A: Civil Law (Code of Civil Procedure, Contract Act, Transfer of Property, Specific Relief Act, Tamil Nadu Buildings Lease and Rent Control Act).",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "2. Part B: Criminal Law (BNS 2023, BNSS 2023, BSA 2023, along with essential comparative questions contrasting IPC, CrPC, and Evidence Act).",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "3. Part C: General Knowledge, Current Affairs, and Aptitude.",
          },
        ],
      },
      {
        _type: "block",
        style: "blockquote",
        children: [
          {
            _type: "span",
            text: "Judicial Aspirant Tip: Preliminary marks are strictly qualifying. However, with the competitive ratio narrowing each year, consistent MCQ practice using negative marking rules is vital to securing a Mains slot.",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "Mains Examination — 4 Descriptive Papers",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "The written Mains examination comprises four papers, each carrying 100 marks, conducted over multiple sessions:",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [
          {
            _type: "span",
            text: "Paper I: Translation & Language Mastery",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Paper I tests translation from Tamil to English and English to Tamil (depositions, judgments, orders, and plaints). It also tests precise legal vocabulary used in Tamil Nadu subordinate courts.",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [
          {
            _type: "span",
            text: "Paper II & III: Substantive Civil and Criminal Law",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "These papers assess analytical depth, application of landmark Supreme Court and Madras High Court judgments, framing of issues, and evidence appreciation.",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [
          {
            _type: "span",
            text: "Paper IV: Judgment Writing & Framing of Charges",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "This paper separates successful candidates from the rest. You are provided with a hypothetical case dossier to draft a formal Civil or Criminal Judgment with proper operative decrees and legal reasoning.",
          },
        ],
      },
    ],
  },
  "bns-bnss-bsa-judiciary-exam-guide": {
    _id: "2",
    title:
      "BNS, BNSS & BSA — What Every Judiciary Aspirant Must Know Before the 2026 Exam",
    slug: "bns-bnss-bsa-judiciary-exam-guide",
    excerpt:
      "From 1 July 2024, three new criminal laws replaced India's century-old statutes. Every TNPSC Civil Judge and APP exam aspirant must understand these laws completely. Here is your complete guide.",
    category: "legal-update",
    publishedAt: "2026-01-10T00:00:00Z",
    readingTime: 6,
    author: {
      name: "Senior Criminal Law Faculty",
      designation: "Head of Criminal Law Mentorship",
      photo: null,
    },
    relatedCourse: {
      title: "APP Exam Coaching",
      slug: "app-exam",
    },
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "The transition from the Indian Penal Code 1860, Code of Criminal Procedure 1973, and Indian Evidence Act 1872 to the Bharatiya Nyaya Sanhita, Bharatiya Nagarik Suraksha Sanhita, and Bharatiya Sakshya Adhiniyam is the most significant statutory reform in Indian history.",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "Key Structural Changes in Criminal Prosecution",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Aspirants preparing for TNPSC Civil Judge and APP Grade II must master both the new section numbers and the conceptual additions such as community service penalties, zero FIR codification, electronic evidence safeguards, and forensic mandates.",
          },
        ],
      },
    ],
  },
  "tamil-legal-translation-word-list": {
    _id: "3",
    title:
      "Tamil-to-English Legal Translation Words — Compiled from Past TNPSC Papers",
    slug: "tamil-legal-translation-word-list",
    excerpt:
      "The Translation Paper (100 marks in Mains) is where most candidates lose the exam. Here is a curated list of Tamil legal terms and their English equivalents compiled from past TNPSC Civil Judge papers.",
    category: "study-material",
    publishedAt: "2026-01-05T00:00:00Z",
    readingTime: 12,
    author: {
      name: "Judicial Translation Expert",
      designation: "Legal Vernacular Specialist",
      photo: null,
    },
    relatedCourse: {
      title: "Civil Judge Exam Coaching",
      slug: "civil-judge",
    },
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "In the TNPSC Civil Judge Mains Examination, Paper I (Translation) is often the decisive factor. Candidates from English-medium backgrounds struggle with Tamil legal terminologies, while Tamil-medium aspirants find legal English drafting demanding.",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "Essential Legal Vocabulary for TNPSC Mains",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Mastering standard legal expressions used in deposition recordings and High Court appellate judgments guarantees higher scoring margins.",
          },
        ],
      },
    ],
  },
};

const fallbackRelatedPosts: BlogPostItem[] = [
  {
    _id: "1",
    title:
      "TNPSC Civil Judge Exam Syllabus 2026 — Complete Prelims and Mains Breakdown",
    slug: "tnpsc-civil-judge-syllabus-2026",
    excerpt:
      "A complete breakdown of the TNPSC Civil Judge exam syllabus — including the new BNS, BNSS, and BSA laws.",
    category: "exam-guide",
    publishedAt: "2026-01-15T00:00:00Z",
    readingTime: 8,
  },
  {
    _id: "2",
    title:
      "BNS, BNSS & BSA — What Every Judiciary Aspirant Must Know Before the 2026 Exam",
    slug: "bns-bnss-bsa-judiciary-exam-guide",
    excerpt:
      "From 1 July 2024, three new criminal laws replaced India's century-old statutes.",
    category: "legal-update",
    publishedAt: "2026-01-10T00:00:00Z",
    readingTime: 6,
  },
  {
    _id: "3",
    title:
      "Tamil-to-English Legal Translation Words — Compiled from Past TNPSC Papers",
    slug: "tamil-legal-translation-word-list",
    excerpt:
      "The Translation Paper (100 marks in Mains) is where most candidates lose the exam.",
    category: "study-material",
    publishedAt: "2026-01-05T00:00:00Z",
    readingTime: 12,
  },
];

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    if (Array.isArray(slugs) && slugs.length > 0) {
      return slugs.map((s: any) => ({
        slug: typeof s === "string" ? s : s.slug,
      }));
    }
  } catch {
    // Fall back to placeholder slugs
  }

  return Object.keys(placeholderFullPosts).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  let post: any = null;

  try {
    post = await getPostBySlug(slug);
  } catch {
    post = null;
  }

  if (!post) {
    post = placeholderFullPosts[slug];
  }

  if (!post) {
    return {
      title: "Article Not Found | XYZ Law Coaching",
    };
  }

  return generateBlogMetadata({
    title: post.title,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    excerpt: post.excerpt,
    slug: post.slug,
    tags: post.tags,
    publishedAt: post.publishedAt,
    coverImage: post.coverImage,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url || "https://yourdomain.com";

  let post: any = null;
  try {
    post = await getPostBySlug(slug);
  } catch {
    post = null;
  }

  if (!post) {
    post = placeholderFullPosts[slug];
  }

  if (!post) {
    notFound();
  }

  // Related posts from same category or fallback
  let relatedPosts: BlogPostItem[] = fallbackRelatedPosts.filter(
    (p) => p.slug !== slug
  );

  try {
    const allPosts = await getPublishedPosts();
    if (Array.isArray(allPosts) && allPosts.length > 0) {
      const formatted = allPosts.map((p: any) => ({
        _id: p._id,
        title: p.title,
        slug: typeof p.slug === "string" ? p.slug : p.slug?.current,
        excerpt: p.excerpt,
        category: p.category || "exam-guide",
        publishedAt: p.publishedAt,
        readingTime: p.readingTime || 6,
        coverImage: p.coverImage,
      }));
      relatedPosts = formatted.filter((p: any) => p.slug !== slug);
    }
  } catch {
    // Keep fallback
  }

  // Exam updates for sidebar
  let examUpdates: any[] = [];
  try {
    const updates = await getLatestExamUpdatesSanity(3);
    if (Array.isArray(updates) && updates.length > 0) {
      examUpdates = updates;
    }
  } catch {
    examUpdates = [];
  }

  // Schema: BreadcrumbList + BlogPosting
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
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteUrl}/blog/${post.slug}`,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt || new Date().toISOString(),
    author: {
      "@type": "Person",
      name: post.author?.name || "XYZ Law Coaching Faculty",
    },
    publisher: {
      "@type": "EducationalOrganization",
      name: SITE_CONFIG.name || "XYZ Law Coaching",
      url: siteUrl,
    },
    image: post.coverImage?.asset?.url || undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Section 1: Post Hero (Deep Navy Gradient Header Zone) */}
      <header className="relative bg-gradient-to-b from-[#0A1628] via-[#042C53] to-[#0A1628] text-white pt-32 pb-16 min-h-[360px] flex flex-col justify-center">
        {/* Ambient lighting */}
        <div className="absolute inset-0 pointer-events-none opacity-15 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400 via-transparent to-transparent" />
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-[780px] text-center">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-xs sm:text-sm text-white/70 mb-5"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/50" />
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/50" />
            <span className="text-white font-medium capitalize">
              {post.category?.replace("-", " ") || "Articles"}
            </span>
          </nav>

          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald text-white text-xs font-bold uppercase tracking-wider shadow-sm">
              {post.category?.replace("-", " ")}
            </span>
          </div>

          {/* H1 Heading */}
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-[42px] text-white leading-tight tracking-tight mb-4">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="font-sans text-sm sm:text-[17px] text-white/80 leading-relaxed max-w-2xl mx-auto mb-6">
            {post.excerpt}
          </p>

          {/* Meta Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-white/70 pt-4 border-t border-white/15">
            <span className="flex items-center gap-1.5 font-medium text-white">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span>{post.author?.name || "XYZ Legal Faculty"}</span>
            </span>
            <span>·</span>
            {post.publishedAt && (
              <>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-white/60" />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </span>
                <span>·</span>
              </>
            )}
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-white/60" />
              <span>{post.readingTime || 8} min read</span>
            </span>
          </div>
        </div>

        {/* Cover Image (Overlapping transition if image exists) */}
        {post.coverImage?.asset?.url && (
          <div className="container mx-auto px-4 max-w-[780px] mt-8 relative z-20">
            <div className="relative w-full h-[260px] sm:h-[380px] rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              <Image
                src={post.coverImage.asset.url}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        )}
      </header>

      {/* Section 2: Article Body + Table of Contents + Sticky Sidebar + Related Posts */}
      <BlogPostLayout
        post={post}
        relatedPosts={relatedPosts}
        examUpdates={examUpdates}
      />
    </>
  );
}
