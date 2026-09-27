import React, { useState, useEffect } from "react";

export function WelcomeWidget() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [newLeadsToday, setNewLeadsToday] = useState<number | null>(null);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(
        now.toLocaleDateString("en-IN", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
      setCurrentTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.newLeadsToday === "number") {
          setNewLeadsToday(data.newLeadsToday);
        }
      })
      .catch(() => {
        // Fallback
        setNewLeadsToday(0);
      });
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #042C53 0%, #0D1B2A 60%, #1B263B 100%)",
        color: "#ffffff",
        borderRadius: "12px",
        padding: "24px 28px",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "700", color: "#ffffff", letterSpacing: "-0.01em" }}>
            Welcome to XYZ Law Coaching Admin
          </h2>
          <p style={{ margin: "6px 0 0 0", fontSize: "14px", color: "rgba(255, 255, 255, 0.82)", maxWidth: "580px" }}>
            Manage your courses, results, blog posts, and student enquiries from here.
          </p>
        </div>

        <div style={{ textAlign: "right", background: "rgba(255, 255, 255, 0.08)", padding: "8px 14px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
          <div style={{ fontSize: "13px", fontWeight: "600", color: "#ffffff" }}>
            {currentDate}
          </div>
          <div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.7)", marginTop: "2px" }}>
            {currentTime}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", paddingTop: "4px" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(34, 197, 94, 0.18)",
            color: "#4ade80",
            border: "1px solid rgba(34, 197, 94, 0.35)",
            padding: "4px 12px",
            borderRadius: "9999px",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          <span>●</span> Site Live
        </span>

        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(34, 197, 94, 0.18)",
            color: "#4ade80",
            border: "1px solid rgba(34, 197, 94, 0.35)",
            padding: "4px 12px",
            borderRadius: "9999px",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          <span>●</span> Sanity Connected
        </span>

        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background:
              newLeadsToday && newLeadsToday > 0
                ? "rgba(245, 158, 11, 0.2)"
                : "rgba(34, 197, 94, 0.18)",
            color: newLeadsToday && newLeadsToday > 0 ? "#fbbf24" : "#4ade80",
            border:
              newLeadsToday && newLeadsToday > 0
                ? "1px solid rgba(245, 158, 11, 0.4)"
                : "1px solid rgba(34, 197, 94, 0.35)",
            padding: "4px 12px",
            borderRadius: "9999px",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          <span>●</span> {newLeadsToday !== null ? `${newLeadsToday} New Leads Today` : "Loading Leads..."}
        </span>
      </div>
    </div>
  );
}

export const welcomeWidget = {
  name: "welcome",
  component: WelcomeWidget,
  layout: { width: "full" as const },
};
