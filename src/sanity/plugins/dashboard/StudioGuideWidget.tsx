import React from "react";

export function StudioGuideWidget() {
  const tips = [
    {
      title: "Add a Topper",
      text: "Click Toppers & Results → New → fill in student name, rank, exam & year → Publish",
      href: "/studio/intent/create/template=topper;type=topper/",
    },
    {
      title: "Add an Upcoming Batch",
      text: "Click Batches → New → set target course, start date, mode & timing → Publish",
      href: "/studio/intent/create/template=batch;type=batch/",
    },
    {
      title: "Write a Blog Post",
      text: "Click Blog Posts → New → write content & title → set status to Published → Publish",
      href: "/studio/intent/create/template=blogPost;type=blogPost/",
    },
  ];

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        padding: "20px 24px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        border: "1px solid #E0E0E0",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div style={{ marginBottom: "14px" }}>
        <h3
          style={{
            margin: 0,
            fontSize: "16px",
            fontWeight: "700",
            color: "#042C53",
          }}
        >
          📖 How to use this Studio
        </h3>
        <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#64748b" }}>
          Quick publishing tips and workflow reminders for content editors
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {tips.map((tip, i) => (
          <div
            key={i}
            style={{
              padding: "10px 12px",
              background: "#F9FAFB",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              fontSize: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "3px",
              }}
            >
              <span style={{ fontWeight: "700", color: "#042C53" }}>
                {i + 1}. {tip.title}
              </span>
              <a
                href={tip.href}
                style={{
                  color: "#1D9E75",
                  fontWeight: "600",
                  textDecoration: "none",
                  fontSize: "11px",
                }}
              >
                Start →
              </a>
            </div>
            <p style={{ margin: 0, color: "#4B5563", lineHeight: "1.4" }}>
              {tip.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export const studioGuideWidget = {
  name: "studioGuide",
  component: StudioGuideWidget,
  layout: { width: "medium" as const },
};
