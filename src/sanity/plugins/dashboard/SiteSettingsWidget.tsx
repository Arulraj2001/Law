import React, { useState, useEffect } from "react";

interface SettingsState {
  phone: string;
  whatsapp: string;
  email: string;
  students_count: string;
  judges_count: string;
  experience_years: string;
  states_count: string;
  youtube_url: string;
  instagram_url: string;
  facebook_url: string;
  whatsapp_channel: string;
}

export function SiteSettingsWidget() {
  const [formData, setFormData] = useState<SettingsState>({
    phone: "",
    whatsapp: "",
    email: "",
    students_count: "",
    judges_count: "",
    experience_years: "",
    states_count: "",
    youtube_url: "",
    instagram_url: "",
    facebook_url: "",
    whatsapp_channel: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          phone: data.phone || "",
          whatsapp: data.whatsapp || "",
          email: data.email || "",
          students_count: data.students_count || "1000",
          judges_count: data.judges_count || "25",
          experience_years: data.experience_years || "10",
          states_count: data.states_count || "15",
          youtube_url: data.youtube_url || "",
          instagram_url: data.instagram_url || "",
          facebook_url: data.facebook_url || "",
          whatsapp_channel: data.whatsapp_channel || "",
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleChange = (field: keyof SettingsState, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = Object.entries(formData).map(([key, value]) => ({
      key,
      value,
    }));

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Save failed");
      showToast("Settings saved ✓", "success");
    } catch {
      showToast("Save failed — try again", "error");
    } finally {
      setSaving(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #D1D5DB",
    fontSize: "13px",
    boxSizing: "border-box",
    outline: "none",
    background: "#ffffff",
    color: "#1F2937",
    fontFamily: "inherit",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "12px",
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: "4px",
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
        position: "relative",
      }}
    >
      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "24px",
            background: toast.type === "success" ? "#0F766E" : "#DC2626",
            color: "#ffffff",
            padding: "8px 16px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "600",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            zIndex: 10,
          }}
        >
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#042C53" }}>
          ⚙️ Instant Site Settings &amp; Public Info
        </h3>
        <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#64748b" }}>
          Update phone, WhatsApp, homepage stats, and social links instantly across the entire website
        </p>
      </div>

      {loading ? (
        <div style={{ padding: "30px", textAlign: "center", color: "#6B7280", fontSize: "13px" }}>
          Loading current settings...
        </div>
      ) : (
        <form onSubmit={handleSave}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
              marginBottom: "20px",
            }}
          >
            {/* LEFT COLUMN: Contact Details + Stats */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div
                style={{
                  background: "#F9FAFB",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                }}
              >
                <h4 style={{ margin: "0 0 12px 0", fontSize: "13px", fontWeight: "700", color: "#042C53" }}>
                  📞 Contact Information
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div>
                    <label style={labelStyle}>Phone Number (Call Support)</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+91 98765 43210"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>WhatsApp Number (without + symbol)</label>
                    <input
                      type="text"
                      value={formData.whatsapp}
                      onChange={(e) => handleChange("whatsapp", e.target.value)}
                      placeholder="919876543210"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="contact@yourdomain.com"
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "#F9FAFB",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                }}
              >
                <h4 style={{ margin: "0 0 12px 0", fontSize: "13px", fontWeight: "700", color: "#042C53" }}>
                  📊 Homepage Trust Counter Stats
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={labelStyle}>Students Trained</label>
                    <input
                      type="text"
                      value={formData.students_count}
                      onChange={(e) => handleChange("students_count", e.target.value)}
                      placeholder="1000"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Judges Selected</label>
                    <input
                      type="text"
                      value={formData.judges_count}
                      onChange={(e) => handleChange("judges_count", e.target.value)}
                      placeholder="25"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Years Experience</label>
                    <input
                      type="text"
                      value={formData.experience_years}
                      onChange={(e) => handleChange("experience_years", e.target.value)}
                      placeholder="10"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>States Covered</label>
                    <input
                      type="text"
                      value={formData.states_count}
                      onChange={(e) => handleChange("states_count", e.target.value)}
                      placeholder="15"
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Social Links */}
            <div
              style={{
                background: "#F9FAFB",
                padding: "16px",
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <h4 style={{ margin: 0, fontSize: "13px", fontWeight: "700", color: "#042C53" }}>
                🌐 Social Media &amp; Community Channels
              </h4>
              <div>
                <label style={labelStyle}>YouTube Channel URL</label>
                <input
                  type="url"
                  value={formData.youtube_url}
                  onChange={(e) => handleChange("youtube_url", e.target.value)}
                  placeholder="https://youtube.com/@yourchannel"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Instagram Profile URL</label>
                <input
                  type="url"
                  value={formData.instagram_url}
                  onChange={(e) => handleChange("instagram_url", e.target.value)}
                  placeholder="https://instagram.com/yourhandle"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Facebook Page URL</label>
                <input
                  type="url"
                  value={formData.facebook_url}
                  onChange={(e) => handleChange("facebook_url", e.target.value)}
                  placeholder="https://facebook.com/yourpage"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>WhatsApp Channel / Community URL</label>
                <input
                  type="url"
                  value={formData.whatsapp_channel}
                  onChange={(e) => handleChange("whatsapp_channel", e.target.value)}
                  placeholder="https://whatsapp.com/channel/yourlink"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: "10px 24px",
                background: "#1D9E75",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: saving ? "not-allowed" : "pointer",
                opacity: saving ? 0.7 : 1,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export const siteSettingsWidget = {
  name: "siteSettings",
  component: SiteSettingsWidget,
  layout: { width: "full" as const },
};
