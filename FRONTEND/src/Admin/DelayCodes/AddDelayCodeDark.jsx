import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbarDark from "../Components/AdminNavbarDark";
import AdminSidebarDark from "../Components/AdminSidebarDark";

const API = "http://localhost:5000/api/delaycodes";

export default function AddDelayCodeDark({ toggleTheme }) {
  const navigate = useNavigate();
  const [hoveredWidth, setHoveredWidth] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    Code: "", Reason: "", Category: "Weather",
    Severity: "Medium", AverageDelayHours: 0, IsActive: true,
  });

  const handleChange = (e) => {
    const val = e.target.name === "IsActive" ? e.target.value === "true"
      : e.target.name === "AverageDelayHours" ? Number(e.target.value)
      : e.target.value;
    setFormData({ ...formData, [e.target.name]: val });
  };

  const handleSubmit = async () => {
    // Whitespace-only check
    if (!formData.Code.trim() || !formData.Reason.trim()) {
      showNotification("error", "Code and Reason are required!");
      return;
    }
    if (formData.Code.trim().length < 3) {
      showNotification("error", "Code must be at least 3 characters (e.g. WTH-001)!");
      return;
    }
    if (formData.Reason.trim().length < 5) {
      showNotification("error", "Reason must be at least 5 characters!");
      return;
    }
    if (Number(formData.AverageDelayHours) < 0) {
      showNotification("error", "Average delay hours cannot be negative!");
      return;
    }
    if (Number(formData.AverageDelayHours) > 720) {
      showNotification("error", "Average delay hours seems too high — max 720hrs (30 days)!");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...formData,
        Code: formData.Code.trim().toUpperCase(),
        Reason: formData.Reason.trim(),
        AverageDelayHours: Number(formData.AverageDelayHours) || 0,
      };
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        showNotification("success", `${data.data.Code} created successfully!`);
        setFormData({ Code: "", Reason: "", Category: "Weather", Severity: "Medium", AverageDelayHours: 0, IsActive: true });
      } else {
        if (data.message?.includes("duplicate") || data.message?.includes("E11000")) {
          showNotification("error", `Code "${formData.Code.trim().toUpperCase()}" already exists — use a unique code!`);
        } else if (data.message?.includes("validation")) {
          showNotification("error", "Invalid data — please check all fields!");
        } else {
          showNotification("error", data.message || "Failed to create delay code");
        }
      }
    } catch (err) {
      if (err.message?.includes("fetch")) {
        showNotification("error", "Cannot connect to server — is the backend running?");
      } else {
        showNotification("error", "Something went wrong — please try again!");
      }
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), type === "error" ? 4000 : 3000);
  };

  // Trim check for submit button too
  const filled = formData.Code.trim() && formData.Reason.trim();

  const severityColor = (s) => {
    if (s === "High") return "#f87171";
    if (s === "Medium") return "#fbbf24";
    return "#4ade80";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#07060a", color: "#e0d8d0", fontFamily: "'Inter', sans-serif", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap');
        @keyframes pulseOrb { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.1);opacity:0.7} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideRight { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes gradFlow { 0%{background-position:0%} 100%{background-position:200%} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes glowPulse { 0%,100%{box-shadow:0 4px 24px rgba(230,50,50,0.25)} 50%{box-shadow:0 4px 40px rgba(230,50,50,0.45)} }

        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .fade-up-1 { animation: fadeUp 0.5s 0.05s ease forwards; opacity: 0; }
        .slide-right { animation: slideRight 0.35s ease forwards; }

        .form-input {
          width: 100%; padding: 12px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px; color: #e0d8d0;
          font-size: 0.88rem; font-family: 'Inter', sans-serif;
          box-sizing: border-box; transition: all 0.2s;
        }
        .form-input:focus {
          outline: none; border-color: rgba(230,50,50,0.5);
          background: rgba(255,255,255,0.06);
          box-shadow: 0 0 0 3px rgba(230,50,50,0.07);
        }
        .form-input::placeholder { color: #3a2a25; }
        .form-input:not(:placeholder-shown) { border-color: rgba(230,50,50,0.2); }
        select.form-input option { background: #0f0d13; color: #e0d8d0; }

        .back-btn {
          background: transparent; border: 1px solid rgba(255,255,255,0.08);
          color: #7a6a60; padding: 10px 20px; border-radius: 8px;
          cursor: pointer; font-size: 0.78rem; font-family: 'Inter', sans-serif;
          transition: all 0.2s;
        }
        .back-btn:hover { color: #e0d8d0; border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.03); }

        .submit-ready {
          width: 100%; padding: 15px;
          background: linear-gradient(135deg, #e63232, #f0a030);
          border: none; border-radius: 10px; color: #fff;
          font-size: 0.88rem; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; cursor: pointer; font-family: 'Inter', sans-serif;
          animation: glowPulse 3s ease infinite; transition: all 0.3s;
          position: relative; overflow: hidden;
        }
        .submit-ready:hover { transform: translateY(-2px); }
        .submit-ready::after {
          content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          transition: left 0.5s;
        }
        .submit-ready:hover::after { left: 150%; }

        .submit-disabled {
          width: 100%; padding: 15px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px; color: #3a2a25;
          font-size: 0.88rem; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; cursor: not-allowed; font-family: 'Inter', sans-serif;
        }

        .spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff; border-radius: 50%;
          animation: spin 0.8s linear infinite; display: inline-block;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(230,50,50,0.25); border-radius: 4px; }
      `}</style>

      <AdminNavbarDark toggleTheme={toggleTheme} pageTitle="ADD DELAY CODE" pageSubtitle="CREATE NEW" />

      <div style={{ display: "flex", flex: 1, overflow: "visible" }}>
        <AdminSidebarDark hoveredWidth={hoveredWidth} setHoveredWidth={setHoveredWidth} />

        <div style={{ marginLeft: `${68 + hoveredWidth}px`, flex: 1, padding: "2rem 2.5rem", transition: "margin-left 0.28s cubic-bezier(0.4,0,0.2,1)", position: "relative" }}>

          <div style={{ position: "fixed", top: "-100px", right: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(230,50,50,0.1), transparent 70%)", animation: "pulseOrb 6s ease-in-out infinite", pointerEvents: "none", zIndex: 0 }} />
          <div style={{ position: "fixed", bottom: "-150px", left: "5%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(240,160,48,0.06), transparent 70%)", animation: "pulseOrb 8s ease-in-out infinite reverse", pointerEvents: "none", zIndex: 0 }} />

          {notification && (
            <div className="slide-right" style={{
              position: "fixed", top: "80px", right: "2rem", zIndex: 1000,
              padding: "1rem 1.4rem", borderRadius: "10px",
              background: notification.type === "success"
                ? "linear-gradient(135deg, rgba(74,222,128,0.12), rgba(74,222,128,0.06))"
                : "linear-gradient(135deg, rgba(248,113,113,0.12), rgba(248,113,113,0.06))",
              border: `1px solid ${notification.type === "success" ? "rgba(74,222,128,0.3)" : "rgba(248,113,113,0.3)"}`,
              color: notification.type === "success" ? "#4ade80" : "#f87171",
              backdropFilter: "blur(16px)",
              boxShadow: `0 8px 32px ${notification.type === "success" ? "rgba(74,222,128,0.12)" : "rgba(248,113,113,0.12)"}`,
              display: "flex", alignItems: "center", gap: "0.8rem", minWidth: "280px", maxWidth: "400px"
            }}>
              <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: notification.type === "success" ? "rgba(74,222,128,0.15)" : "rgba(248,113,113,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", flexShrink: 0 }}>
                {notification.type === "success" ? "✓" : "✕"}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.82rem", marginBottom: "2px" }}>{notification.type === "success" ? "Delay Code Created!" : "Error"}</div>
                <div style={{ opacity: 0.8, fontSize: "0.76rem", lineHeight: 1.4 }}>{notification.message}</div>
              </div>
            </div>
          )}

          <div className="fade-up" style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", position: "relative", zIndex: 1 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <div style={{ width: "24px", height: "2px", background: "linear-gradient(90deg,#e63232,#f0a030)", borderRadius: "2px" }} />
                <span style={{ fontSize: "0.6rem", letterSpacing: "4px", textTransform: "uppercase", background: "linear-gradient(90deg,#e63232,#f0a030)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 700 }}>Create</span>
              </div>
              <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.8rem", background: "linear-gradient(135deg,#ffffff 0%,#e0c8c0 50%,#f0a030 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "3px", lineHeight: 1, margin: 0 }}>NEW DELAY CODE</h1>
              <div style={{ fontSize: "0.76rem", color: "#a89888", marginTop: "6px" }}>Fill in the details — required fields marked with *</div>
            </div>
            <button className="back-btn" onClick={() => navigate("/admin/delay-codes")}>← Back to Delay Codes</button>
          </div>

          <div className="fade-up-1" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "24px", position: "relative", zIndex: 1 }}>

            <div style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.025), rgba(230,50,50,0.015))", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden" }}>
              <div style={{ height: "2px", background: "linear-gradient(90deg,#e63232,#f0a030,#e63232)", backgroundSize: "200%", animation: "gradFlow 3s linear infinite" }} />
              <div style={{ padding: "2rem" }}>

                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.2rem" }}>
                  <div style={{ width: "3px", height: "16px", background: "linear-gradient(to bottom,#e63232,#f0a030)", borderRadius: "2px" }} />
                  <span style={{ fontSize: "0.62rem", letterSpacing: "3px", textTransform: "uppercase", color: "#a89888", fontWeight: 700 }}>Code Info</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "12px", marginBottom: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", color: "#8a7a70", marginBottom: "6px", display: "block", fontWeight: 600 }}>Code <span style={{ color: "#e63232" }}>*</span></label>
                    <input className="form-input" type="text" name="Code" placeholder="e.g. WTH-001" value={formData.Code} onChange={handleChange} style={{ textTransform: "uppercase" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", color: "#8a7a70", marginBottom: "6px", display: "block", fontWeight: 600 }}>Reason <span style={{ color: "#e63232" }}>*</span></label>
                    <input className="form-input" type="text" name="Reason" placeholder="e.g. Severe Weather Conditions" value={formData.Reason} onChange={handleChange} />
                  </div>
                </div>

                <div style={{ height: "1px", background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)", margin: "1.5rem 0" }} />

                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.2rem" }}>
                  <div style={{ width: "3px", height: "16px", background: "linear-gradient(to bottom,#e63232,#f0a030)", borderRadius: "2px" }} />
                  <span style={{ fontSize: "0.62rem", letterSpacing: "3px", textTransform: "uppercase", color: "#a89888", fontWeight: 700 }}>Classification</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", color: "#8a7a70", marginBottom: "6px", display: "block", fontWeight: 600 }}>Category</label>
                    <select className="form-input" name="Category" value={formData.Category} onChange={handleChange}>
                      {["Weather","Customs","Port","Carrier","Documentation","Other"].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", color: "#8a7a70", marginBottom: "6px", display: "block", fontWeight: 600 }}>Severity</label>
                    <select className="form-input" name="Severity" value={formData.Severity} onChange={handleChange}>
                      {["Low","Medium","High"].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ height: "1px", background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)", margin: "1.5rem 0" }} />

                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.2rem" }}>
                  <div style={{ width: "3px", height: "16px", background: "linear-gradient(to bottom,#f87171,#fbbf24)", borderRadius: "2px" }} />
                  <span style={{ fontSize: "0.62rem", letterSpacing: "3px", textTransform: "uppercase", color: "#a89888", fontWeight: 700 }}>Additional Info</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", color: "#8a7a70", marginBottom: "6px", display: "block", fontWeight: 600 }}>Avg Delay (hrs)</label>
                    <input className="form-input" type="number" name="AverageDelayHours" placeholder="0" min="0" max="720" value={formData.AverageDelayHours} onChange={handleChange} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", color: "#8a7a70", marginBottom: "6px", display: "block", fontWeight: 600 }}>Status</label>
                    <select className="form-input" name="IsActive" value={String(formData.IsActive)} onChange={handleChange}>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ background: "linear-gradient(145deg, rgba(230,50,50,0.05), rgba(240,160,48,0.02))", border: "1px solid rgba(230,50,50,0.15)", borderRadius: "14px", overflow: "hidden" }}>
                <div style={{ height: "2px", background: "linear-gradient(90deg,#e63232,#f0a030,#e63232)", backgroundSize: "200%", animation: "gradFlow 3s linear infinite" }} />
                <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#e63232", animation: "pulseOrb 2s ease-in-out infinite" }} />
                  <span style={{ fontSize: "0.62rem", letterSpacing: "3px", textTransform: "uppercase", color: "#a89888", fontWeight: 700 }}>Live Preview</span>
                </div>
                <div style={{ padding: "16px 18px" }}>
                  {[
                    { label: "Code",     val: formData.Code ? formData.Code.trim().toUpperCase() : "" },
                    { label: "Reason",   val: formData.Reason },
                    { label: "Category", val: formData.Category },
                    { label: "Severity", val: formData.Severity, color: severityColor(formData.Severity) },
                    { label: "Avg Delay",val: formData.AverageDelayHours > 0 ? `${formData.AverageDelayHours}h` : "" },
                    { label: "Status",   val: formData.IsActive ? "Active" : "Inactive", color: formData.IsActive ? "#4ade80" : "#888" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < 5 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                      <span style={{ fontSize: "0.65rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#5a4a45" }}>{item.label}</span>
                      <span style={{ fontSize: "0.82rem", color: item.val ? (item.color || "#d4c4b8") : "#3a2a25", fontWeight: item.val ? 500 : 400 }}>{item.val || "—"}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className={filled && !loading ? "submit-ready" : "submit-disabled"} onClick={handleSubmit} disabled={loading || !filled}>
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                    <span className="spinner" /> Creating...
                  </span>
                ) : filled ? "Create Delay Code →" : "Fill required fields first"}
              </button>

              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "14px", padding: "16px 18px" }}>
                <div style={{ fontSize: "0.6rem", letterSpacing: "2px", textTransform: "uppercase", color: "#5a4a45", marginBottom: "12px", fontWeight: 700 }}>Quick Tips</div>
                {[
                  "Code auto-converts to uppercase (e.g. wth-001 → WTH-001)",
                  "Code must be unique — duplicates will be rejected",
                  "Severity affects how the system prioritizes alerts",
                  "Max average delay is 720hrs (30 days)",
                  "Inactive codes won't appear in shipment dropdowns",
                ].map((tip, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: i < 4 ? "10px" : "0" }}>
                    <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "linear-gradient(135deg,#e63232,#f0a030)", marginTop: "6px", flexShrink: 0 }} />
                    <div style={{ fontSize: "0.76rem", color: "#7a6a60", lineHeight: 1.5 }}>{tip}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}