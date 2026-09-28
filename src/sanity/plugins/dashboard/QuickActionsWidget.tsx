import React, { useState } from "react";

export function QuickActionsWidget() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const actions = [
    {
      title: "Add New Topper",
      icon: "🏆",
      href: "/studio#/intent/create/template=topper;type=topper/",
      target: "_self",
    },
    {
      title: "Add New Batch",
      icon: "📅",
      href: "/studio#/intent/create/template=batch;type=batch/",
      target: "_self",
    },
    {
      title: "Write Blog Post",
      icon: "✍️",
      href: "/studio#/intent/create/template=blogPost;type=blogPost/",
      target: "_self",
    },
    {
      title: "Add Exam Update",
      icon: "🔔",
      href: "/studio#/intent/create/template=examUpdate;type=examUpdate/",
      target: "_self",
    },
    {
      title: "View Live Site",
      icon: "👁",
      href: "/",
      target: "_blank",
    },
    {
      title: "View Leads Report",
      icon: "📊",
      href: "/studio#/leads",
      target: "_self",
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
      <div style={{ marginBottom: "16px" }}>
        <h3
          style={{
            margin: 0,
            fontSize: "16px",
            fontWeight: "700",
            color: "#042C53",
          }}
        >
          ⚡ Quick Actions
        </h3>
        <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#64748b" }}>
          One-click shortcuts to common content publishing and review tasks
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
        }}
      >
        {actions.map((action, idx) => {
          const isHovered = hoveredIdx === idx;

          return (
            <a
              key={idx}
              href={action.href}
              target={action.target}
              rel={action.target === "_blank" ? "noopener noreferrer" : undefined}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "8px",
                padding: "16px 12px",
                background: isHovered ? "#E6F1FB" : "#F5F5F0",
                borderRadius: "12px",
                border: isHovered ? "1px solid #93C5FD" : "1px solid #E0E0E0",
                cursor: "pointer",
                fontSize: "13px",
                color: "#042C53",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.2s ease-in-out",
                transform: isHovered ? "translateY(-1px)" : "none",
              }}
            >
              <span style={{ fontSize: "22px" }}>{action.icon}</span>
              <span style={{ lineHeight: "1.3" }}>{action.title}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export const quickActionsWidget = {
  name: "quick-actions",
  component: QuickActionsWidget,
  layout: { width: "medium" as const },
};
