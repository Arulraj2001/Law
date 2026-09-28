import type { Metadata } from "next";

export function generatePageMetadata({
  title,
  description,
  keywords = [],
  path,
  ogImage,
  noIndex = false,
}: {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const url = `${siteUrl}${path}`;

  const metadata: Metadata = {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      ...(ogImage
        ? {
            images: [
              {
                url: ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`,
                width: 1200,
                height: 630,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: process.env.NEXT_PUBLIC_TWITTER_HANDLE || "@xyzlawcoaching",
      creator: process.env.NEXT_PUBLIC_TWITTER_HANDLE || "@xyzlawcoaching",
      ...(ogImage
        ? {
            images: [ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`],
          }
        : {}),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };

  return metadata;
}

export function generateBlogMetadata(post: {
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  excerpt?: string;
  slug: string;
  tags?: string[];
  publishedAt?: string;
  coverImage?: { asset?: { url?: string } };
}): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt || "";
  const coverUrl = post.coverImage?.asset?.url;
  const url = `${siteUrl}/blog/${post.slug}`;

  return {
    title,
    description,
    keywords: post.tags || [],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      publishedTime: post.publishedAt,
      ...(coverUrl ? { images: [{ url: coverUrl }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: process.env.NEXT_PUBLIC_TWITTER_HANDLE || "@xyzlawcoaching",
      creator: process.env.NEXT_PUBLIC_TWITTER_HANDLE || "@xyzlawcoaching",
      ...(coverUrl ? { images: [coverUrl] } : {}),
    },
  };
}

