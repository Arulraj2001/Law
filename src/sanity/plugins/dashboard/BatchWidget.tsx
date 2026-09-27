import React, { useState, useEffect } from "react";

interface BatchItem {
  id: string;
  course_name: string;
  start_date: string | null;
  mode: string | null;
  total_seats: number;
  seats_filled: number;
  status: "open" | "filling" | "full" | "completed";
}

export function BatchWidget() {
  const [batches, setBatches] = useState<BatchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBatches = () => {
    setLoading(true);
    fetch("/api/admin/batches")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load batches");
        return res.json();
      })
      .then((data) => {
        setBatches(data.batches || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load batches");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  // Update seats filled with optimistic UI
  const handleSeatChange = async (batchId: string, delta: number) => {
    const targetBatch = batches.find((b) => b.id === batchId);
    if (!targetBatch) return;

    const newFilled = Math.max(
      0,
      Math.min(targetBatch.total_seats, targetBatch.seats_filled + delta)
    );
    if (newFilled === targetBatch.seats_filled) return;

    // Determine status automatically if full
    let autoStatus = targetBatch.status;
    if (newFilled >= targetBatch.total_seats) {
      autoStatus = "full";
    } else if (newFilled > targetBatch.total_seats * 0.7 && autoStatus === "open") {
      autoStatus = "filling";
    }

    setBatches((prev) =>
      prev.map((b) =>
        b.id === batchId
          ? { ...b, seats_filled: newFilled, status: autoStatus }
          : b
      )
    );

    try {
      await fetch(`/api/admin/batches/${batchId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seats_filled: newFilled, status: autoStatus }),
      });
    } catch {
      fetchBatches();
    }
  };

  // Cycle status: open -> filling -> full -> open
  const handleCycleStatus = async (batchId: string) => {
    const targetBatch = batches.find((b) => b.id === batchId);
    if (!targetBatch) return;

    const statusCycle: Record<string, "open" | "filling" | "full"> = {
      open: "filling",
      filling: "full",
      full: "open",
      completed: "open",
    };

    const nextStatus = statusCycle[targetBatch.status] || "open";

    setBatches((prev) =>
      prev.map((b) => (b.id === batchId ? { ...b, status: nextStatus } : b))
    );

    try {
      await fetch(`/api/admin/batches/${batchId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
    } catch {
      fetchBatches();
    }
  };

  const getStatusBadge = (status: BatchItem["status"]) => {
    switch (status) {
      case "open":
        return { bg: "#DCFCE7", color: "#15803D", label: "Open (Click)" };
      case "filling":
        return { bg: "#FEF3C7", color: "#B45309", label: "Filling (Click)" };
      case "full":
        return { bg: "#FEE2E2", color: "#B91C1C", label: "Full (Click)" };
      default:
        return { bg: "#F3F4F6", color: "#4B5563", label: status };
    }
  };

  const getBarColor = (pct: number) => {
    if (pct >= 90) return "#EF4444"; // Red
    if (pct >= 60) return "#F59E0B"; // Amber
    return "#10B981"; // Green
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
      {/* Header */}
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
            📅 Batches &amp; Live Seat Counter
          </h3>
          <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#64748b" }}>
            Adjust seat fill counters with +/- buttons or cycle batch status
          </p>
        </div>

        <a
          href="/studio/intent/create/template=batch;type=batch/"
          style={{
            fontSize: "12px",
            fontWeight: "600",
            color: "#1D9E75",
            textDecoration: "none",
            padding: "6px 12px",
            background: "#ECFDF5",
            borderRadius: "6px",
            border: "1px solid #A7F3D0",
          }}
        >
          + Add New Batch →
        </a>
      </div>

      {loading ? (
        <div style={{ padding: "30px", textAlign: "center", color: "#6B7280", fontSize: "12px" }}>
          Loading batches...
        </div>
      ) : error ? (
        <div style={{ padding: "16px", color: "#DC2626", fontSize: "12px" }}>
          {error}
        </div>
      ) : batches.length === 0 ? (
        <div style={{ padding: "20px", textAlign: "center", color: "#6B7280", fontSize: "12px" }}>
          No active batches found.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {batches.map((batch) => {
            const pct = Math.round(
              (batch.seats_filled / (batch.total_seats || 1)) * 100
            );
            const statusInfo = getStatusBadge(batch.status);
            const barColor = getBarColor(pct);

            return (
              <div
                key={batch.id}
                style={{
                  background: "#F9FAFB",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  padding: "12px 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <h4
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        fontWeight: "700",
                        color: "#1F2937",
                      }}
                    >
                      {batch.course_name}
                    </h4>
                    <span style={{ fontSize: "11px", color: "#6B7280" }}>
                      {batch.start_date ? `Starts: ${batch.start_date}` : "Upcoming"} · {batch.mode || "Online + Offline"}
                    </span>
                  </div>

                  {/* Status Badge (Click to Cycle) */}
                  <button
                    type="button"
                    onClick={() => handleCycleStatus(batch.id)}
                    title="Click to change status"
                    style={{
                      border: "none",
                      padding: "3px 8px",
                      borderRadius: "9999px",
                      fontSize: "11px",
                      fontWeight: "700",
                      background: statusInfo.bg,
                      color: statusInfo.color,
                      cursor: "pointer",
                    }}
                  >
                    {statusInfo.label}
                  </button>
                </div>

                {/* Progress Bar & Seat Text */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "11px",
                      fontWeight: "600",
                      color: "#4B5563",
                      marginBottom: "4px",
                    }}
                  >
                    <span>
                      {batch.seats_filled} / {batch.total_seats} seats filled ({pct}%)
                    </span>
                    <span style={{ color: barColor }}>
                      {batch.total_seats - batch.seats_filled} seats left
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
                        width: `${Math.min(pct, 100)}%`,
                        height: "100%",
                        background: barColor,
                        borderRadius: "9999px",
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                </div>

                {/* Quick Edit Buttons */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "6px",
                    paddingTop: "2px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#6B7280" }}>
                    Quick adjust seats:
                  </span>

                  <button
                    type="button"
                    onClick={() => handleSeatChange(batch.id, -1)}
                    disabled={batch.seats_filled <= 0}
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "4px",
                      border: "1px solid #D1D5DB",
                      background: "#ffffff",
                      color: "#1F2937",
                      fontWeight: "bold",
                      fontSize: "13px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: batch.seats_filled <= 0 ? "not-allowed" : "pointer",
                      opacity: batch.seats_filled <= 0 ? 0.5 : 1,
                    }}
                  >
                    −
                  </button>

                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      color: "#042C53",
                      minWidth: "20px",
                      textAlign: "center",
                    }}
                  >
                    {batch.seats_filled}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleSeatChange(batch.id, 1)}
                    disabled={batch.seats_filled >= batch.total_seats}
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "4px",
                      border: "1px solid #D1D5DB",
                      background: "#ffffff",
                      color: "#1F2937",
                      fontWeight: "bold",
                      fontSize: "13px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor:
                        batch.seats_filled >= batch.total_seats
                          ? "not-allowed"
                          : "pointer",
                      opacity: batch.seats_filled >= batch.total_seats ? 0.5 : 1,
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export const batchWidget = {
  name: "batch",
  component: BatchWidget,
  layout: { width: "medium" as const },
};
