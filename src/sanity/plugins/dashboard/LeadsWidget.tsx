import React, { useState, useEffect } from "react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  course_interest: string | null;
  form_type: string;
  status: "new" | "contacted" | "enrolled" | "not_interested" | "follow_up";
  created_at: string;
  notes?: string | null;
}

export function LeadsWidget() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = () => {
    setLoading(true);
    setError(null);
    fetch("/api/admin/leads?limit=10")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch leads");
        return res.json();
      })
      .then((data) => {
        setLeads(data.leads || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load recent leads");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleMarkContacted = async (leadId: string) => {
    // Optimistic UI update
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId ? { ...lead, status: "contacted" } : lead
      )
    );

    try {
      await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "contacted" }),
      });
    } catch {
      // Revert if error
      fetchLeads();
    }
  };

  const openWhatsApp = (lead: Lead) => {
    const cleanPhone = (lead.phone || "").replace(/\D/g, "");
    const formattedPhone = cleanPhone.startsWith("91")
      ? cleanPhone
      : `91${cleanPhone}`;
    const message = encodeURIComponent(
      `Hi ${lead.name}, following up on your enquiry about ${
        lead.course_interest || "our coaching programmes"
      } at XYZ Law Coaching. How can we assist you with the upcoming batch details?`
    );
    window.open(`https://wa.me/${formattedPhone}?text=${message}`, "_blank");
  };

  const getStatusBadge = (status: Lead["status"]) => {
    switch (status) {
      case "new":
        return {
          bg: "#FEF3C7",
          color: "#92400E",
          label: "New",
        };
      case "contacted":
        return {
          bg: "#DBEAFE",
          color: "#1E40AF",
          label: "Contacted",
        };
      case "enrolled":
        return {
          bg: "#DCFCE7",
          color: "#166534",
          label: "Enrolled",
        };
      case "follow_up":
        return {
          bg: "#FFEDD5",
          color: "#C2410C",
          label: "Follow Up",
        };
      case "not_interested":
      default:
        return {
          bg: "#F3F4F6",
          color: "#4B5563",
          label: "Not Interested",
        };
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
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
            🎯 Recent Form Enquiries &amp; Leads (Latest 10)
          </h3>
          <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#64748b" }}>
            Direct submissions from Demo Class, Contact, and Course lead forms
          </p>
        </div>

        <button
          type="button"
          onClick={fetchLeads}
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
          }}
        >
          {error}
        </div>
      ) : loading ? (
        <div style={{ padding: "30px", textAlign: "center", color: "#64748b", fontSize: "13px" }}>
          Loading recent student enquiries...
        </div>
      ) : leads.length === 0 ? (
        <div
          style={{
            padding: "40px 20px",
            textAlign: "center",
            background: "#F9FAFB",
            borderRadius: "8px",
            border: "1px dashed #D1D5DB",
          }}
        >
          <div style={{ fontSize: "28px", marginBottom: "8px" }}>✅</div>
          <p style={{ margin: 0, fontSize: "14px", fontWeight: "600", color: "#1F2937" }}>
            No leads yet.
          </p>
          <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#6B7280" }}>
            Leads from the website form will appear here automatically.
          </p>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "13px",
              textAlign: "left",
            }}
          >
            <thead>
              <tr style={{ background: "#042C53", color: "#ffffff" }}>
                <th style={{ padding: "10px 14px", borderRadius: "6px 0 0 0" }}>Name</th>
                <th style={{ padding: "10px 14px" }}>Phone</th>
                <th style={{ padding: "10px 14px" }}>Course</th>
                <th style={{ padding: "10px 14px" }}>Form Type</th>
                <th style={{ padding: "10px 14px" }}>Status</th>
                <th style={{ padding: "10px 14px" }}>Date</th>
                <th style={{ padding: "10px 14px", borderRadius: "0 6px 0 0", textAlign: "right" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, idx) => {
                const badge = getStatusBadge(lead.status);
                const isEven = idx % 2 === 0;

                return (
                  <tr
                    key={lead.id}
                    style={{
                      background: isEven ? "#ffffff" : "#F9FAFB",
                      borderBottom: "1px solid #E5E7EB",
                    }}
                  >
                    <td style={{ padding: "12px 14px", fontWeight: "600", color: "#111827" }}>
                      {lead.name}
                    </td>
                    <td style={{ padding: "12px 14px", color: "#374151" }}>
                      {lead.phone}
                    </td>
                    <td style={{ padding: "12px 14px", color: "#4B5563" }}>
                      {lead.course_interest || "General Enquiry"}
                    </td>
                    <td style={{ padding: "12px 14px", color: "#6B7280", textTransform: "capitalize" }}>
                      {lead.form_type ? lead.form_type.replace(/_/g, " ") : "Website"}
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "3px 8px",
                          borderRadius: "9999px",
                          fontSize: "11px",
                          fontWeight: "600",
                          background: badge.bg,
                          color: badge.color,
                        }}
                      >
                        {badge.label}
                      </span>
                    </td>
                    <td style={{ padding: "12px 14px", color: "#6B7280", fontSize: "12px", whiteSpace: "nowrap" }}>
                      {formatDate(lead.created_at)}
                    </td>
                    <td style={{ padding: "12px 14px", textAlign: "right", whiteSpace: "nowrap" }}>
                      <button
                        type="button"
                        onClick={() => openWhatsApp(lead)}
                        title="Chat on WhatsApp"
                        style={{
                          padding: "5px 10px",
                          marginRight: "6px",
                          background: "#25D366",
                          color: "#ffffff",
                          border: "none",
                          borderRadius: "4px",
                          fontSize: "11px",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                      >
                        WhatsApp
                      </button>

                      {lead.status !== "contacted" && lead.status !== "enrolled" && (
                        <button
                          type="button"
                          onClick={() => handleMarkContacted(lead.id)}
                          style={{
                            padding: "5px 10px",
                            background: "#2563EB",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "4px",
                            fontSize: "11px",
                            fontWeight: "600",
                            cursor: "pointer",
                          }}
                        >
                          Mark Contacted
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer Link to All Leads */}
      <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid #E5E7EB", textAlign: "right" }}>
        <a
          href="/studio/leads"
          style={{
            fontSize: "13px",
            fontWeight: "600",
            color: "#042C53",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          View All Leads in Management Studio →
        </a>
      </div>
    </div>
  );
}

export const leadsWidget = {
  name: "leads",
  component: LeadsWidget,
  layout: { width: "full" as const },
};
