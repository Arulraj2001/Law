import React, { useState, useEffect, useMemo } from "react";
import { definePlugin } from "sanity";

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

function LeadsManagementTool() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Notes Modal state
  const [editingNoteLead, setEditingNoteLead] = useState<Lead | null>(null);
  const [noteText, setNoteText] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchAllLeads = () => {
    setLoading(true);
    setError(null);
    fetch("/api/admin/leads?limit=200")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load leads");
        return res.json();
      })
      .then((data) => {
        setLeads(data.leads || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load leads");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAllLeads();
  }, []);

  // Filter leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        search === "" ||
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone.includes(search) ||
        (lead.email && lead.email.toLowerCase().includes(search.toLowerCase()));

      const matchesStatus =
        selectedStatus === "all" || lead.status === selectedStatus;

      const matchesCourse =
        selectedCourse === "all" ||
        (lead.course_interest &&
          lead.course_interest.toLowerCase().includes(selectedCourse.toLowerCase()));

      return matchesSearch && matchesStatus && matchesCourse;
    });
  }, [leads, search, selectedStatus, selectedCourse]);

  // Summary counts
  const counts = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter((l) => l.status === "new").length;
    const contacted = leads.filter((l) => l.status === "contacted").length;
    const enrolled = leads.filter((l) => l.status === "enrolled").length;
    return { total, newCount, contacted, enrolled };
  }, [leads]);

  // Update lead status
  const handleStatusChange = async (id: string, newStatus: Lead["status"]) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
    showToast(`Status updated to ${newStatus}`);

    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch {
      fetchAllLeads();
    }
  };

  // Bulk mark as contacted
  const handleBulkMarkContacted = async () => {
    if (selectedIds.length === 0) return;
    setLeads((prev) =>
      prev.map((l) =>
        selectedIds.includes(l.id) ? { ...l, status: "contacted" } : l
      )
    );
    showToast(`Marked ${selectedIds.length} leads as contacted`);

    const idsToUpdate = [...selectedIds];
    setSelectedIds([]);

    for (const id of idsToUpdate) {
      try {
        await fetch(`/api/admin/leads/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "contacted" }),
        });
      } catch {
        // Continue
      }
    }
  };

  // Copy phone
  const handleCopyPhone = (id: string, phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    showToast("Phone number copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  // WhatsApp click
  const openWhatsApp = (lead: Lead) => {
    const cleanPhone = (lead.phone || "").replace(/\D/g, "");
    const formattedPhone = cleanPhone.startsWith("91")
      ? cleanPhone
      : `91${cleanPhone}`;
    const message = encodeURIComponent(
      `Hi ${lead.name}, following up on your enquiry about ${
        lead.course_interest || "our coaching programmes"
      } at XYZ Law Coaching. How can we assist you today?`
    );
    window.open(`https://wa.me/${formattedPhone}?text=${message}`, "_blank");
  };

  // Save notes
  const handleSaveNotes = async () => {
    if (!editingNoteLead) return;
    const id = editingNoteLead.id;
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, notes: noteText } : l))
    );
    setEditingNoteLead(null);
    showToast("Note saved successfully");

    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: noteText }),
      });
    } catch {
      // Revert if error
      fetchAllLeads();
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (leads.length === 0) {
      showToast("No leads to export");
      return;
    }

    const headers = [
      "Name",
      "Phone",
      "Email",
      "Course Interest",
      "Form Type",
      "Status",
      "Date",
      "Notes",
    ];

    const rows = filteredLeads.map((l) => [
      `"${(l.name || "").replace(/"/g, '""')}"`,
      `"${l.phone || ""}"`,
      `"${l.email || ""}"`,
      `"${(l.course_interest || "").replace(/"/g, '""')}"`,
      `"${l.form_type || ""}"`,
      `"${l.status || ""}"`,
      `"${l.created_at || ""}"`,
      `"${(l.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const dateStr = new Date().toISOString().split("T")[0];
    link.setAttribute("download", `leads-${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("CSV export initiated");
  };

  const getStatusColor = (status: Lead["status"]) => {
    switch (status) {
      case "new":
        return { bg: "#FEF3C7", color: "#92400E" };
      case "contacted":
        return { bg: "#DBEAFE", color: "#1E40AF" };
      case "enrolled":
        return { bg: "#DCFCE7", color: "#166534" };
      case "follow_up":
        return { bg: "#FFEDD5", color: "#C2410C" };
      case "not_interested":
      default:
        return { bg: "#F3F4F6", color: "#4B5563" };
    }
  };

  return (
    <div
      style={{
        padding: "32px",
        background: "#F5F5F0",
        minHeight: "100vh",
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            background: "#042C53",
            color: "#ffffff",
            padding: "12px 20px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            fontSize: "13px",
            fontWeight: "600",
            zIndex: 1000,
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* Page Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "26px",
              fontWeight: "800",
              color: "#042C53",
              letterSpacing: "-0.01em",
            }}
          >
            🎯 Student Leads &amp; Enquiries Manager
          </h1>
          <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#64748b" }}>
            Track, contact, update status, and manage all incoming aspirant submissions
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            onClick={handleExportCSV}
            style={{
              padding: "10px 18px",
              background: "#1D9E75",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            📥 Export All Leads → CSV
          </button>

          <button
            type="button"
            onClick={fetchAllLeads}
            style={{
              padding: "10px 16px",
              background: "#ffffff",
              color: "#042C53",
              border: "1px solid #D1D5DB",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            ↻ Refresh
          </button>
        </div>
      </div>

      {/* Summary Count Pills */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <div style={{ background: "#ffffff", border: "1px solid #E0E0E0", padding: "10px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: "600", color: "#042C53" }}>
          Total Leads: <span style={{ color: "#042C53", fontWeight: "800" }}>{counts.total}</span>
        </div>
        <div style={{ background: "#FEF3C7", border: "1px solid #FCD34D", padding: "10px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: "600", color: "#92400E" }}>
          New: <span style={{ fontWeight: "800" }}>{counts.newCount}</span>
        </div>
        <div style={{ background: "#DBEAFE", border: "1px solid #BFDBFE", padding: "10px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: "600", color: "#1E40AF" }}>
          Contacted: <span style={{ fontWeight: "800" }}>{counts.contacted}</span>
        </div>
        <div style={{ background: "#DCFCE7", border: "1px solid #BBF7D0", padding: "10px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: "600", color: "#166534" }}>
          Enrolled: <span style={{ fontWeight: "800" }}>{counts.enrolled}</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          padding: "16px 20px",
          border: "1px solid #E0E0E0",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search by name, phone or email..."
          style={{
            flex: "1 1 240px",
            padding: "9px 14px",
            borderRadius: "8px",
            border: "1px solid #D1D5DB",
            fontSize: "13px",
            outline: "none",
          }}
        />

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          style={{
            padding: "9px 14px",
            borderRadius: "8px",
            border: "1px solid #D1D5DB",
            fontSize: "13px",
            background: "#ffffff",
          }}
        >
          <option value="all">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="enrolled">Enrolled</option>
          <option value="follow_up">Follow Up</option>
          <option value="not_interested">Not Interested</option>
        </select>

        {/* Course Filter */}
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          style={{
            padding: "9px 14px",
            borderRadius: "8px",
            border: "1px solid #D1D5DB",
            fontSize: "13px",
            background: "#ffffff",
          }}
        >
          <option value="all">All Courses</option>
          <option value="civil judge">Civil Judge</option>
          <option value="app exam">APP Exam</option>
          <option value="patent">Patent Agent</option>
          <option value="trademark">Trademark Agent</option>
          <option value="ugc">UGC-NET</option>
          <option value="set">SET Law</option>
        </select>

        {/* Bulk Action */}
        {selectedIds.length > 0 && (
          <button
            type="button"
            onClick={handleBulkMarkContacted}
            style={{
              padding: "9px 16px",
              background: "#042C53",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Mark Selected ({selectedIds.length}) as Contacted
          </button>
        )}
      </div>

      {/* Main Table */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #E0E0E0",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
            Loading all student leads...
          </div>
        ) : error ? (
          <div style={{ padding: "20px", color: "#DC2626" }}>{error}</div>
        ) : filteredLeads.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
            No leads matching current search or filters.
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
                  <th style={{ padding: "12px 14px", width: "40px" }}>
                    <input
                      type="checkbox"
                      checked={
                        selectedIds.length === filteredLeads.length &&
                        filteredLeads.length > 0
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedIds(filteredLeads.map((l) => l.id));
                        } else {
                          setSelectedIds([]);
                        }
                      }}
                    />
                  </th>
                  <th style={{ padding: "12px 14px" }}>#</th>
                  <th style={{ padding: "12px 14px" }}>Name</th>
                  <th style={{ padding: "12px 14px" }}>Phone</th>
                  <th style={{ padding: "12px 14px" }}>Email</th>
                  <th style={{ padding: "12px 14px" }}>Course</th>
                  <th style={{ padding: "12px 14px" }}>Type</th>
                  <th style={{ padding: "12px 14px" }}>Status</th>
                  <th style={{ padding: "12px 14px" }}>Date</th>
                  <th style={{ padding: "12px 14px" }}>Notes</th>
                  <th style={{ padding: "12px 14px", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead, idx) => {
                  const statusColors = getStatusColor(lead.status);
                  const isChecked = selectedIds.includes(lead.id);

                  return (
                    <tr
                      key={lead.id}
                      style={{
                        background: isChecked
                          ? "#EFF6FF"
                          : idx % 2 === 0
                          ? "#ffffff"
                          : "#F9FAFB",
                        borderBottom: "1px solid #E5E7EB",
                      }}
                    >
                      <td style={{ padding: "12px 14px" }}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedIds((prev) => [...prev, lead.id]);
                            } else {
                              setSelectedIds((prev) =>
                                prev.filter((id) => id !== lead.id)
                              );
                            }
                          }}
                        />
                      </td>
                      <td style={{ padding: "12px 14px", color: "#9CA3AF" }}>
                        {idx + 1}
                      </td>
                      <td style={{ padding: "12px 14px", fontWeight: "600", color: "#111827" }}>
                        {lead.name}
                      </td>
                      <td style={{ padding: "12px 14px", color: "#374151" }}>
                        <span>{lead.phone}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyPhone(lead.id, lead.phone)}
                          title="Copy phone"
                          style={{
                            marginLeft: "6px",
                            padding: "2px 5px",
                            background: copiedId === lead.id ? "#DCFCE7" : "#F3F4F6",
                            color: copiedId === lead.id ? "#166534" : "#4B5563",
                            border: "1px solid #D1D5DB",
                            borderRadius: "4px",
                            fontSize: "10px",
                            cursor: "pointer",
                          }}
                        >
                          {copiedId === lead.id ? "Copied!" : "Copy"}
                        </button>
                      </td>
                      <td style={{ padding: "12px 14px", color: "#6B7280" }}>
                        {lead.email || "—"}
                      </td>
                      <td style={{ padding: "12px 14px", color: "#4B5563" }}>
                        {lead.course_interest || "General"}
                      </td>
                      <td style={{ padding: "12px 14px", color: "#6B7280", textTransform: "capitalize" }}>
                        {lead.form_type ? lead.form_type.replace(/_/g, " ") : "Website"}
                      </td>
                      <td style={{ padding: "12px 14px" }}>
                        {/* Status Dropdown */}
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            handleStatusChange(
                              lead.id,
                              e.target.value as Lead["status"]
                            )
                          }
                          style={{
                            padding: "4px 8px",
                            borderRadius: "9999px",
                            fontSize: "11px",
                            fontWeight: "600",
                            background: statusColors.bg,
                            color: statusColors.color,
                            border: "1px solid rgba(0, 0, 0, 0.1)",
                            cursor: "pointer",
                          }}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="enrolled">Enrolled</option>
                          <option value="follow_up">Follow Up</option>
                          <option value="not_interested">Not Interested</option>
                        </select>
                      </td>
                      <td style={{ padding: "12px 14px", color: "#6B7280", fontSize: "12px", whiteSpace: "nowrap" }}>
                        {new Date(lead.created_at).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td style={{ padding: "12px 14px" }}>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingNoteLead(lead);
                            setNoteText(lead.notes || "");
                          }}
                          style={{
                            padding: "4px 8px",
                            background: lead.notes ? "#FEF3C7" : "#F3F4F6",
                            color: lead.notes ? "#92400E" : "#4B5563",
                            border: "1px solid #D1D5DB",
                            borderRadius: "4px",
                            fontSize: "11px",
                            cursor: "pointer",
                            maxWidth: "110px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {lead.notes ? `📝 ${lead.notes}` : "+ Add Note"}
                        </button>
                      </td>
                      <td style={{ padding: "12px 14px", textAlign: "right", whiteSpace: "nowrap" }}>
                        <button
                          type="button"
                          onClick={() => openWhatsApp(lead)}
                          style={{
                            padding: "6px 12px",
                            background: "#25D366",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "11px",
                            fontWeight: "600",
                            cursor: "pointer",
                          }}
                        >
                          WhatsApp
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Notes Modal */}
      {editingNoteLead && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "12px",
              padding: "24px",
              width: "100%",
              maxWidth: "480px",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: "700", color: "#042C53" }}>
              Notes for {editingNoteLead.name}
            </h3>
            <p style={{ margin: "0 0 16px 0", fontSize: "12px", color: "#64748b" }}>
              Add internal counselor remarks, batch preference, or follow-up notes.
            </p>

            <textarea
              rows={4}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="e.g. Attended free demo class. Prefers weekend offline batch. Follow up on Monday."
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #D1D5DB",
                fontSize: "13px",
                boxSizing: "border-box",
                marginBottom: "16px",
                outline: "none",
              }}
            />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setEditingNoteLead(null)}
                style={{
                  padding: "8px 16px",
                  background: "#F3F4F6",
                  color: "#4B5563",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNotes}
                style={{
                  padding: "8px 16px",
                  background: "#042C53",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const leadsPlugin = definePlugin({
  name: "leads-management-plugin",
  tools: [
    {
      name: "leads",
      title: "Leads & Enquiries",
      icon: () => "🎯",
      component: LeadsManagementTool,
    },
  ],
});
