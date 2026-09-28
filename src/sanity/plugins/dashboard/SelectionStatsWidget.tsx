import React, { useState, useEffect } from "react";

interface YearStatRow {
  year: string;
  civilJudge: number;
  appExam: number;
  total: number;
}

export function SelectionStatsWidget() {
  const [stats, setStats] = useState<YearStatRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = () => {
    setLoading(true);
    setError(null);
    fetch("/api/admin/selection-stats")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch selection stats");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setStats(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Could not load stats.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleUpdate = async (year: string, examName: "Civil Judge" | "APP Exam", count: number) => {
    const key = `${year}-${examName}`;
    setSavingKey(key);
    setStatusMessage("Saving...");

    // Optimistically update local state
    setStats((prev) =>
      prev.map((row) => {
        if (row.year === year) {
          const updated = {
            ...row,
            civilJudge: examName === "Civil Judge" ? count : row.civilJudge,
            appExam: examName === "APP Exam" ? count : row.appExam,
          };
          updated.total = updated.civilJudge + updated.appExam;
          return updated;
        }
        return row;
      })
    );

    try {
      const res = await fetch("/api/admin/selection-stats", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year,
          exam_name: examName,
          count,
        }),
      });

      if (!res.ok) throw new Error("Save failed");
      setStatusMessage("Saved successfully");
      setTimeout(() => setStatusMessage(null), 2500);
    } catch {
      setStatusMessage("Error saving changes");
      setTimeout(() => setStatusMessage(null), 3500);
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        border: "1px solid #E2E8F0",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          borderBottom: "1px solid #F1F5F9",
          paddingBottom: "12px",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: 700,
              color: "#0F172A",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>🏆</span> Selection Stats (Judges &amp; APPs by Year)
          </h2>
          <p
            style={{
              margin: "4px 0 0 0",
              fontSize: "12px",
              color: "#64748B",
            }}
          >
            Directly edits Supabase selection_stats table. Reflects immediately on /results page.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {statusMessage && (
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: statusMessage.includes("Error") ? "#EF4444" : "#10B981",
                backgroundColor: statusMessage.includes("Error") ? "#FEE2E2" : "#D1FAE5",
                padding: "3px 8px",
                borderRadius: "6px",
              }}
            >
              {statusMessage}
            </span>
          )}
          <button
            type="button"
            onClick={fetchStats}
            style={{
              background: "#F8FAFC",
              border: "1px solid #CBD5E1",
              borderRadius: "6px",
              padding: "6px 12px",
              fontSize: "12px",
              fontWeight: 600,
              color: "#334155",
              cursor: "pointer",
            }}
          >
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: "24px", textAlign: "center", color: "#64748B", fontSize: "14px" }}>
          Loading stats...
        </div>
      ) : error ? (
        <div style={{ padding: "16px", backgroundColor: "#FEF2F2", color: "#DC2626", borderRadius: "8px" }}>
          {error}
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
              fontSize: "13px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#F8FAFC", borderBottom: "2px solid #E2E8F0" }}>
                <th style={{ padding: "10px 14px", fontWeight: 700, color: "#334155" }}>Year</th>
                <th style={{ padding: "10px 14px", fontWeight: 700, color: "#0F172A" }}>Civil Judge</th>
                <th style={{ padding: "10px 14px", fontWeight: 700, color: "#059669" }}>APP Exam</th>
                <th style={{ padding: "10px 14px", fontWeight: 700, color: "#334155" }}>Total Selections</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((row) => (
                <tr key={row.year} style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <td style={{ padding: "10px 14px", fontWeight: 700, color: "#1E293B" }}>
                    {row.year}
                  </td>
                  <td style={{ padding: "8px 14px" }}>
                    <input
                      type="number"
                      min={0}
                      value={row.civilJudge}
                      disabled={savingKey === `${row.year}-Civil Judge`}
                      onChange={(e) =>
                        handleUpdate(row.year, "Civil Judge", parseInt(e.target.value, 10) || 0)
                      }
                      style={{
                        width: "80px",
                        padding: "6px 8px",
                        borderRadius: "6px",
                        border: "1px solid #CBD5E1",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#0F172A",
                        backgroundColor: "#FFFFFF",
                      }}
                    />
                  </td>
                  <td style={{ padding: "8px 14px" }}>
                    <input
                      type="number"
                      min={0}
                      value={row.appExam}
                      disabled={savingKey === `${row.year}-APP Exam`}
                      onChange={(e) =>
                        handleUpdate(row.year, "APP Exam", parseInt(e.target.value, 10) || 0)
                      }
                      style={{
                        width: "80px",
                        padding: "6px 8px",
                        borderRadius: "6px",
                        border: "1px solid #CBD5E1",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#059669",
                        backgroundColor: "#FFFFFF",
                      }}
                    />
                  </td>
                  <td style={{ padding: "10px 14px", fontWeight: 800, color: "#0F172A" }}>
                    {row.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export const selectionStatsWidget = {
  name: "selection-stats",
  component: SelectionStatsWidget,
  layout: { width: "full" as const },
};

export default SelectionStatsWidget;
