import React, { useState, useEffect } from "react";

interface ExamUpdate {
  id: string;
  title: string;
  type: "notification" | "result" | "admit_card" | "syllabus" | "news";
  last_date: string | null;
  is_active: boolean;
}

export function ExamUpdatesWidget() {
  const [updates, setUpdates] = useState<ExamUpdate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/exam-updates")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load updates");
        return res.json();
      })
      .then((data) => {
        setUpdates(data.updates || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load exam notifications");
        setLoading(false);
      });
  }, []);

  const getTypeEmoji = (type: ExamUpdate["type"]) => {
    switch (type) {
      case "notification":
        return "🔔";
      case "result":
        return "📊";
      case "admit_card":
        return "🪪";
      case "syllabus":
        return "📋";
      case "news":
      default:
        return "📰";
    }
  };

  const getLastDateStyle = (lastDateStr: string | null) => {
    if (!lastDateStr) return null;
    try {
      const target = new Date(lastDateStr).getTime();
      const now = Date.now();
      const diffDays = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
      const formatted = new Date(lastDateStr).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
      });

      if (diffDays <= 7 && diffDays >= 0) {
        return {
          text: `Last date: ${formatted} (${diffDays}d left)`,
          color: "#DC2626",
          bg: "#FEE2E2",
        };
      }
      return {
        text: `Last date: ${formatted}`,
        color: "#4B5563",
        bg: "#F3F4F6",
      };
    } catch {
      return null;
    }
  };

  const truncate = (str: string, len: number = 40) => {
    if (!str) return "";
    return str.length > len ? `${str.slice(0, len)}…` : str;
  };

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
          📢 Live Exam Notifications
        </h3>
        <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#64748b" }}>
          Current alerts appearing on homepage ticker and banners
        </p>
      </div>

      {error ? (
        <div style={{ fontSize: "12px", color: "#DC2626", padding: "12px" }}>
          {error}
        </div>
      ) : loading ? (
        <div style={{ fontSize: "12px", color: "#64748b", padding: "20px", textAlign: "center" }}>
          Loading updates...
        </div>
      ) : updates.length === 0 ? (
        <div
          style={{
            padding: "24px 16px",
            textAlign: "center",
            background: "#F9FAFB",
            borderRadius: "8px",
            fontSize: "12px",
            color: "#6B7280",
          }}
        >
          No active exam notifications. Add one below to alert visitors.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {updates.map((update) => {
            const dateBadge = getLastDateStyle(update.last_date);

            return (
              <div
                key={update.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 12px",
                  background: "#F9FAFB",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  gap: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
                  <span style={{ fontSize: "16px", flexShrink: 0 }}>
                    {getTypeEmoji(update.type)}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#1F2937",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      title={update.title}
                    >
                      {truncate(update.title, 36)}
                    </div>
                    {dateBadge && (
                      <span
                        style={{
                          display: "inline-block",
                          marginTop: "2px",
                          fontSize: "11px",
                          fontWeight: "600",
                          color: dateBadge.color,
                          background: dateBadge.bg,
                          padding: "1px 6px",
                          borderRadius: "4px",
                        }}
                      >
                        {dateBadge.text}
                      </span>
                    )}
                  </div>
                </div>

                <a
                  href={`/studio/intent/edit/id=${update.id};type=examUpdate/`}
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#2563EB",
                    textDecoration: "none",
                    flexShrink: 0,
                    padding: "4px 8px",
                    borderRadius: "4px",
                    background: "#EFF6FF",
                  }}
                >
                  Edit
                </a>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Notification button */}
      <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid #E5E7EB" }}>
        <a
          href="/studio/intent/create/template=examUpdate;type=examUpdate/"
          style={{
            display: "block",
            width: "100%",
            textAlign: "center",
            padding: "8px 12px",
            background: "#042C53",
            color: "#ffffff",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "600",
            textDecoration: "none",
            boxSizing: "border-box",
          }}
        >
          + Add New Notification
        </a>
      </div>
    </div>
  );
}

export const examUpdatesWidget = {
  name: "exam-updates",
  component: ExamUpdatesWidget,
  layout: { width: "medium" as const },
};
