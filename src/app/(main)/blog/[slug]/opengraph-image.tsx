import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/sanity/queries";

export const runtime = "edge";
export const alt = "Blog post";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const fallbackPosts: Record<string, { title: string; category: string }> = {
  "tnpsc-civil-judge-syllabus-2026": {
    title:
      "TNPSC Civil Judge Exam Syllabus 2026 — Complete Prelims and Mains Breakdown",
    category: "exam-guide",
  },
  "bns-bnss-bsa-judiciary-exam-guide": {
    title:
      "BNS, BNSS & BSA — What Every Judiciary Aspirant Must Know Before the 2026 Exam",
    category: "legal-update",
  },
  "tamil-legal-translation-word-list": {
    title:
      "Tamil-to-English Legal Translation Words — Compiled from Past TNPSC Papers",
    category: "study-material",
  },
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "";

  let post: any = null;
  try {
    post = await getPostBySlug(slug);
  } catch {
    post = null;
  }

  const fallback = fallbackPosts[slug];
  const title = post?.title || fallback?.title || "Law Exam Guide";
  const category = post?.category || fallback?.category || "exam-guide";

  const categoryColors: Record<string, string> = {
    "exam-guide": "#0C447C",
    "legal-update": "#0F6E56",
    "study-material": "#854F0B",
    "success-story": "#1D9E75",
    "career-advice": "#042C53",
  };

  const bgColor = categoryColors[category] || "#042C53";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: bgColor,
          padding: "60px 80px",
          justifyContent: "space-between",
        }}
      >
        {/* Category badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "white",
              padding: "6px 16px",
              borderRadius: "100px",
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {category.replace("-", " ")}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "52px",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.2,
            maxWidth: "900px",
            flex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          {title.length > 80 ? title.slice(0, 80) + "..." : title}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                color: "#1D9E75",
              }}
            >
              ⚖
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              XYZ Law Coaching · Tamil Nadu
            </div>
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.50)",
              fontSize: "14px",
            }}
          >
            Civil Judge &amp; APP Exam Experts
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
