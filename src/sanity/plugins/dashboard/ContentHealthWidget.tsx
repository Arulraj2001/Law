import React, { useState, useEffect } from "react";

interface HealthData {
  facultyMissingPhotos: number;
  toppersMissingPhotos: number;
  publishedPosts: number;
  settingsComplete: boolean;
  activeBatches: number;
  testimonialsCount: number;
}

export function ContentHealthWidget() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/content-health")
      .then((res) => res.json())
      .then((data) => {
        setHealth(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const checks = [
    {
      id: "faculty",
      title: "Faculty photos uploaded",
      pass: (health?.facultyMissingPhotos ?? 0) === 0,
      warningText: `${health?.facultyMissingPhotos ?? 1} faculty missing photo`,
      fixUrl: "/studio/structure/faculty",
    },
    {
      id: "toppers",
      title: "Toppers photos uploaded",
      pass: (health?.toppersMissingPhotos ?? 0) === 0,
      warningText: `${health?.toppersMissingPhotos ?? 1} toppers missing photo`,
      fixUrl: "/studio/structure/topper",
    },
    {
      id: "posts",
      title: "Blog posts published (> 2 articles)",
      pass: (health?.publishedPosts ?? 0) > 2,
      warningText: `Only ${health?.publishedPosts ?? 0} published posts`,
      fixUrl: "/studio/structure/blogPost",
    },
    {
      id: "settings",
      title: "Contact info & phone complete",
      pass: Boolean(health?.settingsComplete),
      warningText: "Update placeholder phone / email",
      fixUrl: "/studio/structure/siteSettings",
    },
    {
      id: "batches",
      title: "Active batches listed",
      pass: (health?.activeBatches ?? 0) > 0,
      warningText: "No active batches scheduled",
      fixUrl: "/studio/structure/batch",
    },
    {
      id: "testimonials",
      title: "Student testimonials added (> 2)",
      pass: (health?.testimonialsCount ?? 0) > 2,
      warningText: `Only ${health?.testimonialsCount ?? 0} testimonials added`,
      fixUrl: "/studio/structure/testimonial",
    },
  ];

  const passCount = checks.filter((c) => c.pass).length;
  const percentage = Math.round((passCount / checks.length) * 100);

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
      {/* Header */}
      <div style={{ marginBottom: "16px" }}>
        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#042C53" }}>
          🩺 Content Readiness &amp; Health Checklist
        </h3>
        <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#64748b" }}>
          Audit missing assets, empty sections, and placeholder data
        </p>
      </div>

      {loading ? (
        <div style={{ padding: "20px", textAlign: "center", color: "#6B7280", fontSize: "12px" }}>
          Checking content health...
        </div>
      ) : (
        <>
          {/* Health Score & Progress Bar */}
          <div
            style={{
              background: "#F9FAFB",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              padding: "12px 14px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "6px",
              }}
            >
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#042C53" }}>
                Content Health: {passCount} of {checks.length} complete
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  color: percentage >= 80 ? "#16A34A" : percentage >= 50 ? "#D97706" : "#DC2626",
                }}
              >
                {percentage}%
              </span>
            </div>

            <div
              style={{
                width: "100%",
                height: "6px",
                background: "#E5E7EB",
                borderRadius: "9999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${percentage}%`,
                  height: "100%",
                  background: percentage >= 80 ? "#16A34A" : percentage >= 50 ? "#F59E0B" : "#EF4444",
                  borderRadius: "9999px",
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          </div>

          {/* Checks List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {checks.map((check) => (
              <div
                key={check.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  background: check.pass ? "#F0FDF4" : "#FFFBEB",
                  borderRadius: "6px",
                  border: check.pass ? "1px solid #DCFCE7" : "1px solid #FDE68A",
                  fontSize: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>{check.pass ? "✅" : "⚠️"}</span>
                  <span
                    style={{
                      fontWeight: check.pass ? "500" : "600",
                      color: check.pass ? "#166534" : "#92400E",
                    }}
                  >
                    {check.pass ? check.title : check.warningText}
                  </span>
                </div>

                {!check.pass && (
                  <a
                    href={check.fixUrl}
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "#B45309",
                      textDecoration: "underline",
                      padding: "2px 6px",
                    }}
                  >
                    Fix →
                  </a>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export const contentHealthWidget = {
  name: "contentHealth",
  component: ContentHealthWidget,
  layout: { width: "medium" as const },
};
