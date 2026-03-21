import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbarLight from "../Components/AdminNavbarLight";
import AdminSidebarLight from "../Components/AdminSidebarLight";

const API = "http://localhost:5000/api/delaycodes";

const C = {
  bg: "#faf6f0", bgDeep: "#f3ede4", bgCard: "rgba(255,250,245,0.85)",
  rose: "#c9848a", gold: "#c4a35a",
  ink: "#2e2218", inkMid: "#6b5744", inkLight: "#a8917a", inkFaint: "#d6c9bc",
  border: "rgba(196,163,90,0.2)", borderRose: "rgba(201,132,138,0.25)",
  roseLight: "rgba(201,132,138,0.12)", goldLight: "rgba(196,163,90,0.12)",
};
const font = { heading: "'Cormorant Garamond', serif", body: "'DM Sans', sans-serif" };

export default function AddDelayCodeLight({ toggleTheme }) {
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
    if (s === "High")   return "#b85c5c";
    if (s === "Medium") return C.gold;
    return "#5a9e5a";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: C.bg, color: C.ink, fontFamily: font.body }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=DM+Sans:wght@300;400;500;600&family=Dancing+Script:wght@600&display=swap');

        @keyframes pulseOrb  { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.1);opacity:0.7} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideRight{ from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes gradFlow  { 0%{background-position:0%} 100%{background-position:200%} }
        @keyframes spin      { to{transform:rotate(360deg)} }
        @keyframes glowPulse { 0%,100%{box-shadow:0 4px 24px rgba(201,132,138,0.2)} 50%{box-shadow:0 4px 40px rgba(201,132,138,0.4)} }

        .fade-up-adcl   { animation: fadeUp 0.5s ease forwards; }
        .fade-up-adcl-1 { animation: fadeUp 0.5s 0.05s ease forwards; opacity: 0; }
        .slide-right-adcl { animation: slideRight 0.35s ease forwards; }

        .form-input-adcl {
          width: 100%; padding: 12px 16px;
          background: ${C.bgDeep}; border: 1px solid ${C.border};
          border-radius: 8px; color: ${C.ink};
          font-size: 0.88rem; font-family: ${font.body};
          box-sizing: border-box; transition: all 0.2s;
        }
        .form-input-adcl:focus {
          outline: none; border-color: ${C.borderRose};
          background: ${C.bgCard};
          box-shadow: 0 0 0 3px rgba(201,132,138,0.08);
        }
        .form-input-adcl::placeholder { color: ${C.inkFaint}; }
        select.form-input-adcl option { background: ${C.bgCard}; color: ${C.ink}; }

        .back-btn-adcl {
          background: transparent; border: 1px solid ${C.border};
          color: ${C.inkLight}; padding: 10px 20px; border-radius: 8px;
          cursor: pointer; font-size: 0.78rem; font-family: ${font.body}; transition: all 0.2s;
        }
        .back-btn-adcl:hover { color: ${C.ink}; border-color: ${C.borderRose}; background: ${C.roseLight}; }

        .submit-ready-adcl {
          width: 100%; padding: 15px;
          background: linear-gradient(135deg, ${C.rose}, ${C.gold});
          border: none; border-radius: 10px; color: #fff;
          font-size: 0.88rem; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; cursor: pointer; font-family: ${font.body};
          animation: glowPulse 3s ease infinite; transition: all 0.3s;
          position: relative; overflow: hidden;
        }
        .submit-ready-adcl:hover { transform: translateY(-2px); }
        .submit-ready-adcl::after {
          content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s;
        }
        .submit-ready-adcl:hover::after { left: 150%; }

        .submit-disabled-adcl {
          width: 100%; padding: 15px;
          background: ${C.bgDeep}; border: 1px solid ${C.border};
          border-radius: 10px; color: ${C.inkFaint};
          font-size: 0.88rem; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; cursor: not-allowed; font-family: ${font.body};
        }

        .spinner-adcl {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: #fff; border-radius: 50%;
          animation: spin 0.8s linear infinite; display: inline-block;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,132,138,0.3); border-radius: 4px; }
      `}</style>

      <AdminNavbarLight toggleTheme={toggleTheme} pageTitle="Add Delay Code" pageSubtitle="Create New" />

      <div style={{ display: "flex", flex: 1, overflow: "visible" }}>
        <AdminSidebarLight hoveredWidth={hoveredWidth} setHoveredWidth={setHoveredWidth} />

        <div style={{ marginLeft: `${68 + hoveredWidth}px`, flex: 1, padding: "2rem 2.5rem", transition: "margin-left 0.28s cubic-bezier(0.4,0,0.2,1)", position: "relative" }}>

          <div style={{ position: "fixed", top: "-100px", right: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: `radial-gradient(circle, rgba(201,132,138,0.1), transparent 70%)`, animation: "pulseOrb 6s ease-in-out infinite", pointerEvents: "none", zIndex: 0 }} />
          <div style={{ position: "fixed", bottom: "-150px", left: "5%", width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(circle, rgba(196,163,90,0.07), transparent 70%)`, animation: "pulseOrb 8s ease-in-out infinite reverse", pointerEvents: "none", zIndex: 0 }} />

          {notification && (
            <div className="slide-right-adcl" style={{
              position: "fixed", top: "80px", right: "2rem", zIndex: 1000,
              padding: "1rem 1.4rem", borderRadius: "10px",
              background: notification.type === "success"
                ? "linear-gradient(135deg, rgba(90,158,90,0.12), rgba(90,158,90,0.06))"
                : `linear-gradient(135deg, ${C.roseLight}, rgba(201,132,138,0.06))`,
              border: `1px solid ${notification.type === "success" ? "rgba(90,158,90,0.3)" : C.borderRose}`,
              color: notification.type === "success" ? "#5a9e5a" : C.rose,
              backdropFilter: "blur(16px)",
              boxShadow: `0 8px 32px rgba(201,132,138,0.1)`,
              display: "flex", alignItems: "center", gap: "0.8rem", minWidth: "280px", maxWidth: "400px"
            }}>
              <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: notification.type === "success" ? "rgba(90,158,90,0.15)" : C.roseLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", flexShrink: 0 }}>
                {notification.type === "success" ? "✓" : "✕"}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.82rem", marginBottom: "2px", fontFamily: font.body }}>{notification.type === "success" ? "Delay Code Created!" : "Error"}</div>
                <div style={{ opacity: 0.8, fontSize: "0.76rem", fontFamily: font.body, lineHeight: 1.4 }}>{notification.message}</div>
              </div>
            </div>
          )}

          <div className="fade-up-adcl" style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", position: "relative", zIndex: 1 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <div style={{ width: "24px", height: "2px", background: `linear-gradient(90deg,${C.rose},${C.gold})`, borderRadius: "2px" }} />
                <span style={{ fontSize: "0.6rem", letterSpacing: "4px", textTransform: "uppercase", background: `linear-gradient(90deg,${C.rose},${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 700, fontFamily: font.body }}>Create</span>
              </div>
              <h1 style={{ fontFamily: font.heading, fontSize: "2.8rem", fontWeight: 600, color: C.ink, letterSpacing: "1px", lineHeight: 1, margin: 0 }}>New Delay Code</h1>
              <div style={{ fontSize: "0.76rem", color: C.inkLight, marginTop: "6px", fontFamily: font.body }}>Fill in the details — required fields marked with *</div>
            </div>
            <button className="back-btn-adcl" onClick={() => navigate("/admin/delay-codes")}>← Back to Delay Codes</button>
          </div>

          <div className="fade-up-adcl-1" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "24px", position: "relative", zIndex: 1 }}>

            <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 24px rgba(201,132,138,0.07)" }}>
              <div style={{ height: "2px", background: `linear-gradient(90deg,${C.rose},${C.gold},${C.rose})`, backgroundSize: "200%", animation: "gradFlow 3s linear infinite" }} />
              <div style={{ padding: "2rem" }}>

                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.2rem" }}>
                  <div style={{ width: "3px", height: "16px", background: `linear-gradient(to bottom,${C.rose},${C.gold})`, borderRadius: "2px" }} />
                  <span style={{ fontSize: "0.62rem", letterSpacing: "3px", textTransform: "uppercase", color: C.inkLight, fontWeight: 700, fontFamily: font.body }}>Code Info</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "12px", marginBottom: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", color: C.inkLight, marginBottom: "6px", display: "block", fontWeight: 600, fontFamily: font.body }}>Code <span style={{ color: C.rose }}>*</span></label>
                    <input className="form-input-adcl" type="text" name="Code" placeholder="e.g. WTH-001" value={formData.Code} onChange={handleChange} style={{ textTransform: "uppercase" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", color: C.inkLight, marginBottom: "6px", display: "block", fontWeight: 600, fontFamily: font.body }}>Reason <span style={{ color: C.rose }}>*</span></label>
                    <input className="form-input-adcl" type="text" name="Reason" placeholder="e.g. Severe Weather Conditions" value={formData.Reason} onChange={handleChange} />
                  </div>
                </div>

                <div style={{ height: "1px", background: `linear-gradient(90deg,transparent,${C.border},transparent)`, margin: "1.5rem 0" }} />

                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.2rem" }}>
                  <div style={{ width: "3px", height: "16px", background: `linear-gradient(to bottom,${C.rose},${C.gold})`, borderRadius: "2px" }} />
                  <span style={{ fontSize: "0.62rem", letterSpacing: "3px", textTransform: "uppercase", color: C.inkLight, fontWeight: 700, fontFamily: font.body }}>Classification</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", color: C.inkLight, marginBottom: "6px", display: "block", fontWeight: 600, fontFamily: font.body }}>Category</label>
                    <select className="form-input-adcl" name="Category" value={formData.Category} onChange={handleChange}>
                      {["Weather","Customs","Port","Carrier","Documentation","Other"].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", color: C.inkLight, marginBottom: "6px", display: "block", fontWeight: 600, fontFamily: font.body }}>Severity</label>
                    <select className="form-input-adcl" name="Severity" value={formData.Severity} onChange={handleChange}>
                      {["Low","Medium","High"].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ height: "1px", background: `linear-gradient(90deg,transparent,${C.border},transparent)`, margin: "1.5rem 0" }} />

                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.2rem" }}>
                  <div style={{ width: "3px", height: "16px", background: `linear-gradient(to bottom,${C.rose},${C.gold})`, borderRadius: "2px" }} />
                  <span style={{ fontSize: "0.62rem", letterSpacing: "3px", textTransform: "uppercase", color: C.inkLight, fontWeight: 700, fontFamily: font.body }}>Additional Info</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", color: C.inkLight, marginBottom: "6px", display: "block", fontWeight: 600, fontFamily: font.body }}>Avg Delay (hrs)</label>
                    <input className="form-input-adcl" type="number" name="AverageDelayHours" placeholder="0" min="0" max="720" value={formData.AverageDelayHours} onChange={handleChange} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", color: C.inkLight, marginBottom: "6px", display: "block", fontWeight: 600, fontFamily: font.body }}>Status</label>
                    <select className="form-input-adcl" name="IsActive" value={String(formData.IsActive)} onChange={handleChange}>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </div>

              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ background: `linear-gradient(145deg,${C.roseLight},${C.goldLight})`, border: `1px solid ${C.borderRose}`, borderRadius: "14px", overflow: "hidden", boxShadow: "0 4px 20px rgba(201,132,138,0.1)" }}>
                <div style={{ height: "2px", background: `linear-gradient(90deg,${C.rose},${C.gold},${C.rose})`, backgroundSize: "200%", animation: "gradFlow 3s linear infinite" }} />
                <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: C.rose, animation: "pulseOrb 2s ease-in-out infinite" }} />
                  <span style={{ fontSize: "0.62rem", letterSpacing: "3px", textTransform: "uppercase", color: C.inkLight, fontWeight: 700, fontFamily: font.body }}>Live Preview</span>
                </div>
                <div style={{ padding: "16px 18px" }}>
                  {[
                    { label: "Code",     val: formData.Code ? formData.Code.trim().toUpperCase() : "" },
                    { label: "Reason",   val: formData.Reason },
                    { label: "Category", val: formData.Category },
                    { label: "Severity", val: formData.Severity, color: severityColor(formData.Severity) },
                    { label: "Avg Delay",val: formData.AverageDelayHours > 0 ? `${formData.AverageDelayHours}h` : "" },
                    { label: "Status",   val: formData.IsActive ? "Active" : "Inactive", color: formData.IsActive ? "#5a9e5a" : C.inkFaint },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < 5 ? `1px solid ${C.border}` : "none" }}>
                      <span style={{ fontSize: "0.65rem", letterSpacing: "1.5px", textTransform: "uppercase", color: C.inkFaint, fontFamily: font.body }}>{item.label}</span>
                      <span style={{ fontSize: "0.82rem", color: item.val ? (item.color || C.inkMid) : C.inkFaint, fontWeight: item.val ? 500 : 400, fontFamily: font.body }}>{item.val || "—"}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className={filled && !loading ? "submit-ready-adcl" : "submit-disabled-adcl"} onClick={handleSubmit} disabled={loading || !filled}>
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                    <span className="spinner-adcl" /> Creating...
                  </span>
                ) : filled ? "Create Delay Code →" : "Fill required fields first"}
              </button>

              <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "14px", padding: "16px 18px", boxShadow: "0 2px 12px rgba(201,132,138,0.06)" }}>
                <div style={{ fontSize: "0.6rem", letterSpacing: "2px", textTransform: "uppercase", color: C.inkFaint, marginBottom: "12px", fontWeight: 700, fontFamily: font.body }}>Quick Tips</div>
                {[
                  "Code auto-converts to uppercase (e.g. wth-001 → WTH-001)",
                  "Code must be unique — duplicates will be rejected",
                  "Severity affects how the system prioritizes alerts",
                  "Max average delay is 720hrs (30 days)",
                  "Inactive codes won't appear in shipment dropdowns",
                ].map((tip, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: i < 4 ? "10px" : "0" }}>
                    <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: `linear-gradient(135deg,${C.rose},${C.gold})`, marginTop: "6px", flexShrink: 0 }} />
                    <div style={{ fontSize: "0.76rem", color: C.inkLight, lineHeight: 1.5, fontFamily: font.body }}>{tip}</div>
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