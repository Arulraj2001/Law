import React, { useState, useEffect } from "react";

interface StatsData {
  totalLeads: number;
  newLeadsToday: number;
  leadsThisWeek: number;
  leadsLastWeek: number;
  publishedPosts: number;
  activeBatches: number;
  totalToppers: number;
}

export function StatsWidget() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = () => {
    setLoading(true);
    setError(null);
    fetch("/api/admin/stats")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch stats");
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Could not load stats. Refresh to try again.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const calculateTrend = () => {
    if (!stats) return null;
    const { leadsThisWeek, leadsLastWeek } = stats;
    if (leadsLastWeek === 0) return { change: "+100%", isUp: true };
    const diff = leadsThisWeek - leadsLastWeek;
    const percent = Math.round((diff / leadsLastWeek) * 100);
    return {
      change: `${percent >= 0 ? "+" : ""}${percent}% vs last week`,
      isUp: percent >= 0,
    };
  };

  const trend = calculateTrend();

  const cards = [
    {
      title: "Total Leads",
      value: stats?.totalLeads ?? 0,
      icon: "👥",
      badge: "All time",
      badgeColor: "#64748b",
      bgColor: "#E6F1FB",
    },
    {
      title: "New Leads Today",
      value: stats?.newLeadsToday ?? 0,
      icon: "⚡",
      badge: "Today",
      badgeColor: "#d97706",
      bgColor: "#FEF3C7",
    },
    {
      title: "Leads This Week",
      value: stats?.leadsThisWeek ?? 0,
      icon: "📈",
      badge: trend?.change || "Weekly",
      badgeColor: trend?.isUp ? "#16a34a" : "#dc2626",
      bgColor: "#DCFCE7",
    },
    {
      title: "Published Blog Posts",
      value: stats?.publishedPosts ?? 0,
      icon: "📰",
      badge: "Live articles",
      badgeColor: "#2563eb",
      bgColor: "#E6F1FB",
    },
    {
      title: "Active Batches",
      value: stats?.activeBatches ?? 0,
      icon: "📅",
      badge: "In progress",
      badgeColor: "#0284c7",
      bgColor: "#F0F9FF",
    },
    {
      title: "Total Toppers Listed",
      value: stats?.totalToppers ?? 0,
      icon: "🏆",
      badge: "Verified judges",
      badgeColor: "#ca8a04",
      bgColor: "#FEF9C3",
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
      {/* Header with refresh button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: "16px",
              fontWeight: "700",
              color: "#042C53",
            }}
          >
            📊 Performance &amp; Activity Overview
          </h3>
          <p
            style={{
              margin: "2px 0 0 0",
              fontSize: "12px",
              color: "#64748b",
            }}
          >
            Real-time numbers from your website forms and Sanity content
          </p>
        </div>

        <button
          type="button"
          onClick={fetchStats}
          disabled={loading}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
            fontSize: "12px",
            fontWeight: "600",
            color: "#042C53",
            background: "#F5F5F0",
            border: "1px solid #D1D5DB",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Refreshing..." : "↻ Refresh"}
        </button>
      </div>

      {error ? (
        <div
          style={{
            padding: "16px",
            background: "#FEF2F2",
            border: "1px solid #FCA5A5",
            borderRadius: "8px",
            color: "#991B1B",
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>{error}</span>
          <button
            type="button"
            onClick={fetchStats}
            style={{
              padding: "4px 10px",
              background: "#991B1B",
              color: "#ffffff",
              border: "none",
              borderRadius: "4px",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      ) : loading ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              style={{
                background: "#F3F4F6",
                borderRadius: "12px",
                padding: "20px 24px",
                height: "100px",
                animation: "pulse 1.5s infinite ease-in-out",
                opacity: 0.7,
              }}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          {cards.map((card, idx) => (
            <div
              key={idx}
              style={{
                background: card.bgColor,
                borderRadius: "12px",
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.03)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>
                  {card.title}
                </span>
                <span style={{ fontSize: "18px" }}>{card.icon}</span>
              </div>

              <div
                style={{
                  fontSize: "36px",
                  fontWeight: "800",
                  color: "#042C53",
                  lineHeight: "1.1",
                  letterSpacing: "-0.02em",
                }}
              >
                {card.value}
              </div>

              <div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    color: card.badgeColor,
                  }}
                >
                  {card.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export const statsWidget = {
  name: "stats",
  component: StatsWidget,
  layout: { width: "full" as const },
};
