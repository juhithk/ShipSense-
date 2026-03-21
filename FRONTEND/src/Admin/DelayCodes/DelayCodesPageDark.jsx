import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbarDark from "../Components/AdminNavbarDark";
import AdminSidebarDark from "../Components/AdminSidebarDark";

const API = "http://localhost:5000/api/delaycodes";
const CATEGORIES = ["All", "Weather", "Customs", "Port", "Carrier", "Documentation", "Other"];
const SEVERITIES = ["All", "Low", "Medium", "High"];

export default function DelayCodesPageDark({ toggleTheme }) {
  const navigate = useNavigate();
  const [hoveredWidth, setHoveredWidth] = useState(0);
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [selectedCode, setSelectedCode] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => { fetchCodes(); }, [search, categoryFilter, severityFilter]);

  const fetchCodes = async () => {
    try {
      setLoading(true);
      let url = `${API}?`;
      if (search) url += `search=${search}&`;
      if (categoryFilter !== "All") url += `Category=${categoryFilter}&`;
      if (severityFilter !== "All") url += `Severity=${severityFilter}`;
      const res = await fetch(url);
      const data = await res.json();
      setCodes(data.data);
    } catch (err) {
      showNotification("error", "Failed to fetch delay codes");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API}/${selectedCode._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedCode(data.data);
        setIsEditing(false);
        fetchCodes();
        showNotification("success", "Delay code updated successfully!");
      }
    } catch (err) {
      showNotification("error", "Failed to update delay code");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API}/${selectedCode._id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setSelectedCode(null);
        setShowDeleteConfirm(false);
        fetchCodes();
        showNotification("success", "Delay code deleted successfully!");
      }
    } catch (err) {
      showNotification("error", "Failed to delete delay code");
    }
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3500);
  };

  const severityConfig = (severity) => {
    switch (severity) {
      case "High":   return { color: "#f87171", border: "rgba(248,113,113,0.25)", bg: "rgba(248,113,113,0.08)", glow: "rgba(248,113,113,0.15)" };
      case "Medium": return { color: "#fbbf24", border: "rgba(251,191,36,0.25)", bg: "rgba(251,191,36,0.08)", glow: "rgba(251,191,36,0.15)" };
      case "Low":    return { color: "#4ade80", border: "rgba(74,222,128,0.25)", bg: "rgba(74,222,128,0.08)", glow: "rgba(74,222,128,0.15)" };
      default:       return { color: "#888", border: "rgba(136,136,136,0.25)", bg: "rgba(136,136,136,0.08)", glow: "transparent" };
    }
  };

  const categoryIcon = (cat) => {
    switch (cat) {
      case "Weather": return "🌩️";
      case "Customs": return "🛃";
      case "Port": return "⚓";
      case "Carrier": return "🚚";
      case "Documentation": return "📄";
      default: return "⚠️";
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#07060a", color: "#e0d8d0", fontFamily: "'Inter', sans-serif", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap');

        @keyframes pulseOrb { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.1);opacity:0.7} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes rowIn { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
        @keyframes gradFlow { 0%{background-position:0%} 100%{background-position:200%} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes slideRight { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(40px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }

        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .fade-up-1 { animation: fadeUp 0.5s 0.05s ease forwards; opacity: 0; }
        .fade-up-2 { animation: fadeUp 0.5s 0.1s ease forwards; opacity: 0; }
        .slide-right { animation: slideRight 0.35s ease forwards; }
        .slide-up-modal { animation: slideUp 0.35s cubic-bezier(0.34,1.2,0.64,1) forwards; }

        .row-item {
          transition: background 0.2s, padding-left 0.2s;
          cursor: pointer; position: relative; overflow: hidden;
        }
        .row-item::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0;
          width: 0; background: linear-gradient(to bottom, #e63232, #f0a030);
          transition: width 0.25s; border-radius: 0 2px 2px 0;
        }
        .row-item:hover::before { width: 3px; }
        .row-item:hover { background: rgba(230,50,50,0.04) !important; padding-left: 24px !important; }
        .row-item:hover .cell-dim { color: #c8b8b0 !important; }
        .row-item:hover .cell-main { color: #ffffff !important; }

        .action-btn { transition: all 0.25s cubic-bezier(0.34,1.2,0.64,1); }
        .action-btn:hover { transform: translateY(-2px); }

        .filter-pill { transition: all 0.2s; cursor: pointer; }
        .filter-pill:hover { color: #c8b8b0 !important; }

        input:focus, select:focus { outline: none !important; }
        input::placeholder { color: #3a3030; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(230,50,50,0.25); border-radius: 4px; }

        .spinner {
          width: 28px; height: 28px;
          border: 2px solid rgba(230,50,50,0.15);
          border-top-color: #e63232; border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
      `}</style>

      <AdminNavbarDark toggleTheme={toggleTheme} pageTitle="DELAY CODES" pageSubtitle="MANAGE & CONFIGURE" />

      <div style={{ display: "flex", flex: 1, overflow: "visible" }}>
        <AdminSidebarDark hoveredWidth={hoveredWidth} setHoveredWidth={setHoveredWidth} />

        <div style={{ marginLeft: `${68 + hoveredWidth}px`, flex: 1, padding: "2rem 2.5rem", transition: "margin-left 0.28s cubic-bezier(0.4,0,0.2,1)", position: "relative", minHeight: "calc(100vh - 64px)" }}>

          {/* AMBIENT ORBS */}
          <div style={{ position: "fixed", top: "-100px", right: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(230,50,50,0.1), transparent 70%)", animation: "pulseOrb 6s ease-in-out infinite", pointerEvents: "none", zIndex: 0 }} />
          <div style={{ position: "fixed", bottom: "-150px", left: "5%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(240,160,48,0.06), transparent 70%)", animation: "pulseOrb 8s ease-in-out infinite reverse", pointerEvents: "none", zIndex: 0 }} />

          {/* NOTIFICATION */}
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
              display: "flex", alignItems: "center", gap: "0.8rem", minWidth: "260px"
            }}>
              <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: notification.type === "success" ? "rgba(74,222,128,0.15)" : "rgba(248,113,113,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", flexShrink: 0 }}>
                {notification.type === "success" ? "✓" : "✕"}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.82rem", marginBottom: "2px" }}>{notification.type === "success" ? "Success" : "Error"}</div>
                <div style={{ opacity: 0.8, fontSize: "0.76rem" }}>{notification.message}</div>
              </div>
            </div>
          )}

          {/* PAGE HEADER */}
          <div className="fade-up" style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", position: "relative", zIndex: 1 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <div style={{ width: "24px", height: "2px", background: "linear-gradient(90deg, #e63232, #f0a030)", borderRadius: "2px" }} />
                <span style={{ fontSize: "0.6rem", letterSpacing: "4px", textTransform: "uppercase", background: "linear-gradient(90deg,#e63232,#f0a030)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 700 }}>Configure</span>
              </div>
              <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.8rem", background: "linear-gradient(135deg, #ffffff 0%, #e0c8c0 50%, #f0a030 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "3px", lineHeight: 1, margin: 0 }}>DELAY CODES</h1>
              <div style={{ fontSize: "0.76rem", color: "#a89888", marginTop: "6px" }}>
                {loading ? "Fetching data..." : `${codes.length} code${codes.length !== 1 ? "s" : ""} · Click any row to view details`}
              </div>
            </div>
            <button onClick={() => navigate("/admin/add-delay-code")}
              style={{ background: "transparent", color: "#e63232", border: "1px solid rgba(230,50,50,0.4)", padding: "12px 28px", borderRadius: "8px", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer", boxShadow: "0 0 16px rgba(230,50,50,0.08)", display: "flex", alignItems: "center", gap: "8px", transition: "all 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(230,50,50,0.08)"; e.currentTarget.style.borderColor = "rgba(230,50,50,0.7)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(230,50,50,0.4)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <span style={{ fontSize: "1.2rem", fontWeight: 300 }}>+</span>
              Add Delay Code
            </button>
          </div>

          {/* FILTERS */}
          <div className="fade-up-1" style={{ display: "flex", gap: "12px", marginBottom: "16px", position: "relative", zIndex: 1, flexWrap: "wrap" }}>
            <div style={{ flex: 1, position: "relative", minWidth: "200px" }}>
              <svg style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", opacity: 0.4 }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#e0d8d0" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input type="text" placeholder="Search by code, reason or category..." value={search} onChange={e => setSearch(e.target.value)}
                style={{ width: "100%", padding: "12px 16px 12px 42px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", color: "#e0d8d0", fontSize: "0.85rem", fontFamily: "'Inter', sans-serif", boxSizing: "border-box", transition: "all 0.25s" }}
                onFocus={e => { e.target.style.borderColor = "rgba(230,50,50,0.4)"; e.target.style.background = "rgba(255,255,255,0.05)"; e.target.style.boxShadow = "0 0 0 4px rgba(230,50,50,0.06)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.07)"; e.target.style.background = "rgba(255,255,255,0.03)"; e.target.style.boxShadow = "none"; }}
              />
            </div>
            <div style={{ display: "flex", gap: "4px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: "4px", borderRadius: "10px" }}>
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setCategoryFilter(c)} className="filter-pill" style={{ padding: "6px 12px", borderRadius: "7px", fontSize: "0.72rem", fontWeight: 500, fontFamily: "'Inter', sans-serif", background: categoryFilter === c ? "linear-gradient(135deg, rgba(230,50,50,0.18), rgba(240,160,48,0.1))" : "transparent", border: categoryFilter === c ? "1px solid rgba(230,50,50,0.35)" : "1px solid transparent", color: categoryFilter === c ? "#f0a030" : "#7a6a60" }}>{c}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "4px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: "4px", borderRadius: "10px" }}>
              {SEVERITIES.map(s => (
                <button key={s} onClick={() => setSeverityFilter(s)} className="filter-pill" style={{ padding: "6px 12px", borderRadius: "7px", fontSize: "0.72rem", fontWeight: 500, fontFamily: "'Inter', sans-serif", background: severityFilter === s ? "linear-gradient(135deg, rgba(230,50,50,0.18), rgba(240,160,48,0.1))" : "transparent", border: severityFilter === s ? "1px solid rgba(230,50,50,0.35)" : "1px solid transparent", color: severityFilter === s ? "#f0a030" : "#7a6a60" }}>{s}</button>
              ))}
            </div>
          </div>

          {/* TABLE */}
          <div className="fade-up-2" style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.025), rgba(230,50,50,0.015))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", overflow: "hidden", position: "relative", zIndex: 1 }}>
            <div style={{ height: "2px", background: "linear-gradient(90deg, #e63232, #f0a030, #e63232)", backgroundSize: "200%", animation: "gradFlow 3s linear infinite" }} />

            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr 120px 120px 120px 100px", padding: "12px 20px", background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              {["Code", "Reason", "Category", "Severity", "Avg Delay", "Status", "Uses"].map(h => (
                <div key={h} style={{ fontSize: "0.6rem", letterSpacing: "2.5px", textTransform: "uppercase", color: "#6a5a50", fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>{h}</div>
              ))}
            </div>

            {loading ? (
              <div style={{ padding: "5rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                <div className="spinner" />
                <div style={{ color: "#7a6a60", fontSize: "0.82rem" }}>Fetching delay codes...</div>
              </div>
            ) : codes.length === 0 ? (
              <div style={{ padding: "5rem", textAlign: "center" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem", opacity: 0.4 }}>⚠️</div>
                <div style={{ color: "#a89888", fontSize: "0.88rem", fontWeight: 500, marginBottom: "4px" }}>No delay codes found</div>
                <div style={{ color: "#6a5a50", fontSize: "0.76rem" }}>Add your first delay code to get started</div>
              </div>
            ) : (
              codes.map((code, i) => {
                const sc = severityConfig(code.Severity);
                const isHov = hoveredRow === i;
                return (
                  <div key={i} className="row-item"
                    onMouseEnter={() => setHoveredRow(i)}
                    onMouseLeave={() => setHoveredRow(null)}
                    onClick={() => { setSelectedCode(code); setEditData({ ...code }); setIsEditing(false); setShowDeleteConfirm(false); }}
                    style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr 120px 120px 120px 100px", padding: "14px 20px", alignItems: "center", borderBottom: i < codes.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none", animation: `rowIn 0.3s ${i * 0.04}s ease forwards`, opacity: 0 }}
                  >
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem", letterSpacing: "1.5px", background: "linear-gradient(135deg, #f0a030, #e63232)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{code.Code}</div>
                    <div className="cell-main" style={{ fontSize: "0.84rem", color: "#d4c4b8", fontFamily: "'Inter', sans-serif", transition: "color 0.15s", fontWeight: 500 }}>{code.Reason}</div>
                    <div style={{ fontSize: "0.84rem", fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>{categoryIcon(code.Category)}</span>
                      <span className="cell-dim" style={{ color: "#b0a098", transition: "color 0.15s" }}>{code.Category}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: "0.7rem", padding: "4px 10px", borderRadius: "999px", fontWeight: 600, fontFamily: "'Inter', sans-serif", background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, display: "inline-flex", alignItems: "center", gap: "5px", boxShadow: isHov ? `0 0 12px ${sc.glow}` : "none", transition: "box-shadow 0.2s" }}>
                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: sc.color }} />
                        {code.Severity}
                      </span>
                    </div>
                    <div className="cell-dim" style={{ fontSize: "0.84rem", color: "#b0a098", fontFamily: "'Inter', sans-serif" }}>{code.AverageDelayHours}h avg</div>
                    <div>
                      <span style={{ fontSize: "0.7rem", padding: "4px 10px", borderRadius: "999px", fontWeight: 600, fontFamily: "'Inter', sans-serif", background: code.IsActive ? "rgba(74,222,128,0.08)" : "rgba(136,136,136,0.08)", color: code.IsActive ? "#4ade80" : "#666", border: `1px solid ${code.IsActive ? "rgba(74,222,128,0.25)" : "rgba(136,136,136,0.25)"}` }}>
                        {code.IsActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="cell-dim" style={{ fontSize: "0.84rem", color: "#b0a098", fontFamily: "'Inter', sans-serif" }}>—</div>
                  </div>
                );
              })
            )}
            {!loading && codes.length > 0 && (
              <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(240,160,48,0.3), transparent)" }} />
            )}
          </div>

          {/* DETAIL CARD */}
          {selectedCode && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}
              onClick={e => { if (e.target === e.currentTarget) { setSelectedCode(null); setIsEditing(false); setShowDeleteConfirm(false); } }}
            >
              <div className="slide-up-modal" style={{ background: "linear-gradient(145deg, #0f0d13, #0a0810)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", width: "520px", maxHeight: "88vh", overflowY: "auto", boxShadow: "0 30px 100px rgba(0,0,0,0.7)" }}>
                <div style={{ height: "2px", background: "linear-gradient(90deg, #e63232, #f0a030, #e63232)", backgroundSize: "200%", animation: "gradFlow 3s linear infinite", borderRadius: "16px 16px 0 0" }} />

                {/* Header */}
                <div style={{ padding: "1.6rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "0.55rem", letterSpacing: "3px", textTransform: "uppercase", color: "#7a5a50", marginBottom: "4px", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Delay Code Details</div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.8rem", background: "linear-gradient(135deg, #fff, #f0a030)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "3px" }}>{selectedCode.Code}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {(() => { const sc = severityConfig(selectedCode.Severity); return (
                      <span style={{ fontSize: "0.72rem", padding: "5px 12px", borderRadius: "999px", fontWeight: 600, fontFamily: "'Inter', sans-serif", background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, display: "inline-flex", alignItems: "center", gap: "5px", boxShadow: `0 0 16px ${sc.glow}` }}>
                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: sc.color }} />{selectedCode.Severity}
                      </span>
                    ); })()}
                    <button onClick={() => { setSelectedCode(null); setIsEditing(false); setShowDeleteConfirm(false); }}
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#7a6a60", width: "34px", height: "34px", borderRadius: "50%", cursor: "pointer", fontSize: "0.9rem", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(248,113,113,0.12)"; e.currentTarget.style.color = "#f87171"; e.currentTarget.style.borderColor = "rgba(248,113,113,0.3)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#7a6a60"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                    >✕</button>
                  </div>
                </div>

                <div style={{ padding: "2rem" }}>
                  {showDeleteConfirm ? (
                    <div style={{ background: "linear-gradient(135deg, rgba(248,113,113,0.07), rgba(248,113,113,0.03))", border: "1px solid rgba(248,113,113,0.2)", borderRadius: "12px", padding: "2.5rem", textAlign: "center" }}>
                      <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚠️</div>
                      <div style={{ fontSize: "1rem", color: "#e0d8d0", marginBottom: "6px", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Delete {selectedCode.Code}?</div>
                      <div style={{ fontSize: "0.82rem", color: "#7a6a60", marginBottom: "2rem", fontFamily: "'Inter', sans-serif" }}>This action is permanent and cannot be undone.</div>
                      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                        <button onClick={() => setShowDeleteConfirm(false)} className="action-btn"
                          style={{ padding: "10px 28px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#a89888", borderRadius: "8px", cursor: "pointer", fontSize: "0.82rem", fontFamily: "'Inter', sans-serif" }}
                          onMouseEnter={e => { e.currentTarget.style.color = "#e0d8d0"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                          onMouseLeave={e => { e.currentTarget.style.color = "#a89888"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                        >Cancel</button>
                        <button onClick={handleDelete} className="action-btn"
                          style={{ padding: "10px 28px", background: "linear-gradient(135deg, rgba(248,113,113,0.2), rgba(248,113,113,0.1))", border: "1px solid rgba(248,113,113,0.4)", color: "#f87171", borderRadius: "8px", cursor: "pointer", fontSize: "0.82rem", fontWeight: 700, fontFamily: "'Inter', sans-serif" }}
                          onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(135deg, rgba(248,113,113,0.3), rgba(248,113,113,0.15))"}
                          onMouseLeave={e => e.currentTarget.style.background = "linear-gradient(135deg, rgba(248,113,113,0.2), rgba(248,113,113,0.1))"}
                        >Yes, Delete</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.5rem" }}>
                        {[
                          { label: "Code", key: "Code", type: "text", full: false },
                          { label: "Reason", key: "Reason", type: "text", full: true },
                          { label: "Category", key: "Category", type: "select", options: ["Weather", "Customs", "Port", "Carrier", "Documentation", "Other"] },
                          { label: "Severity", key: "Severity", type: "select", options: ["Low", "Medium", "High"] },
                          { label: "Avg Delay Hours", key: "AverageDelayHours", type: "number" },
                          { label: "Status", key: "IsActive", type: "select", options: ["true", "false"] },
                        ].map(field => (
                          <div key={field.key} style={{ gridColumn: field.full ? "1/3" : "auto" }}>
                            <div style={{ fontSize: "0.6rem", letterSpacing: "2px", textTransform: "uppercase", color: "#6a5a50", marginBottom: "6px", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>{field.label}</div>
                            {isEditing ? (
                              field.type === "select" ? (
                                <select value={String(editData[field.key]) || ""} onChange={e => setEditData({ ...editData, [field.key]: field.key === "IsActive" ? e.target.value === "true" : e.target.value })}
                                  style={{ width: "100%", padding: "10px 12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#e0d8d0", fontSize: "0.84rem", fontFamily: "'Inter', sans-serif", boxSizing: "border-box" }}>
                                  {field.options.map(o => <option key={o} value={o} style={{ background: "#0f0d13" }}>{field.key === "IsActive" ? (o === "true" ? "Active" : "Inactive") : o}</option>)}
                                </select>
                              ) : (
                                <input type={field.type} value={editData[field.key] || ""} onChange={e => setEditData({ ...editData, [field.key]: e.target.value })}
                                  style={{ width: "100%", padding: "10px 12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#e0d8d0", fontSize: "0.84rem", fontFamily: "'Inter', sans-serif", boxSizing: "border-box" }} />
                              )
                            ) : (
                              <div style={{ fontSize: "0.9rem", color: "#d4c4b8", fontFamily: "'Inter', sans-serif", padding: "8px 12px", background: "rgba(255,255,255,0.025)", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.05)" }}>
                                {field.key === "IsActive" ? (selectedCode[field.key] ? "Active" : "Inactive") : field.key === "AverageDelayHours" ? `${selectedCode[field.key]}h` : selectedCode[field.key] || "—"}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Timestamps */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", padding: "1rem 1.2rem", background: "rgba(255,255,255,0.02)", borderRadius: "8px", marginBottom: "1.5rem", border: "1px solid rgba(255,255,255,0.04)" }}>
                        {[{ label: "Created", val: selectedCode.createdAt }, { label: "Last Updated", val: selectedCode.updatedAt }].map((t, i) => (
                          <div key={i}>
                            <div style={{ fontSize: "0.58rem", letterSpacing: "2px", textTransform: "uppercase", color: "#5a4a45", marginBottom: "4px", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>{t.label}</div>
                            <div style={{ fontSize: "0.78rem", color: "#8a7a70", fontFamily: "'Inter', sans-serif" }}>{new Date(t.val).toLocaleString()}</div>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                        {isEditing ? (
                          <>
                            <button onClick={() => setIsEditing(false)} className="action-btn"
                              style={{ padding: "10px 20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#a89888", borderRadius: "8px", cursor: "pointer", fontSize: "0.82rem", fontFamily: "'Inter', sans-serif" }}
                              onMouseEnter={e => { e.currentTarget.style.color = "#e0d8d0"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                              onMouseLeave={e => { e.currentTarget.style.color = "#a89888"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                            >Cancel</button>
                            <button onClick={handleUpdate} className="action-btn"
                              style={{ padding: "10px 24px", background: "linear-gradient(135deg, #e63232, #f0a030)", border: "none", color: "#fff", borderRadius: "8px", cursor: "pointer", fontSize: "0.82rem", fontWeight: 700, fontFamily: "'Inter', sans-serif", boxShadow: "0 4px 20px rgba(230,50,50,0.25)" }}>Save Changes</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => setShowDeleteConfirm(true)} className="action-btn"
                              style={{ padding: "10px 20px", background: "rgba(248,113,113,0.07)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171", borderRadius: "8px", cursor: "pointer", fontSize: "0.82rem", fontFamily: "'Inter', sans-serif" }}
                              onMouseEnter={e => { e.currentTarget.style.background = "rgba(248,113,113,0.15)"; e.currentTarget.style.borderColor = "rgba(248,113,113,0.4)"; }}
                              onMouseLeave={e => { e.currentTarget.style.background = "rgba(248,113,113,0.07)"; e.currentTarget.style.borderColor = "rgba(248,113,113,0.2)"; }}
                            >Delete</button>
                            <button onClick={() => setIsEditing(true)} className="action-btn"
                              style={{ padding: "10px 24px", background: "linear-gradient(135deg, #e63232, #f0a030)", border: "none", color: "#fff", borderRadius: "8px", cursor: "pointer", fontSize: "0.82rem", fontWeight: 700, fontFamily: "'Inter', sans-serif", boxShadow: "0 4px 20px rgba(230,50,50,0.25)" }}>Edit Code</button>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}