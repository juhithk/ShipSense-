import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbarLight from "../Components/AdminNavbarLight";
import AdminSidebarLight from "../Components/AdminSidebarLight";

const API = "http://localhost:5000/api/delaycodes";
const CATEGORIES = ["All", "Weather", "Customs", "Port", "Carrier", "Documentation", "Other"];
const SEVERITIES = ["All", "Low", "Medium", "High"];

const C = {
  bg: "#faf6f0", bgDeep: "#f3ede4", bgCard: "rgba(255,250,245,0.85)",
  rose: "#c9848a", gold: "#c4a35a",
  ink: "#2e2218", inkMid: "#6b5744", inkLight: "#a8917a", inkFaint: "#d6c9bc",
  border: "rgba(196,163,90,0.2)", borderRose: "rgba(201,132,138,0.25)",
  roseLight: "rgba(201,132,138,0.12)", goldLight: "rgba(196,163,90,0.12)",
};
const font = { heading: "'Cormorant Garamond', serif", body: "'DM Sans', sans-serif" };

export default function DelayCodesPageLight({ toggleTheme }) {
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
      case "High":   return { color: "#b85c5c", border: "rgba(184,92,92,0.3)",  bg: "rgba(184,92,92,0.09)",  glow: "rgba(184,92,92,0.15)" };
      case "Medium": return { color: C.gold,    border: "rgba(196,163,90,0.3)", bg: C.goldLight,             glow: "rgba(196,163,90,0.2)" };
      case "Low":    return { color: "#5a9e5a", border: "rgba(90,158,90,0.3)",  bg: "rgba(90,158,90,0.09)",  glow: "rgba(90,158,90,0.15)" };
      default:       return { color: C.inkMid,  border: C.border,               bg: C.bgDeep,                glow: "transparent" };
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
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: C.bg, color: C.ink, fontFamily: font.body }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=DM+Sans:wght@300;400;500;600&family=Dancing+Script:wght@600&display=swap');

        @keyframes pulseOrb   { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.1);opacity:0.7} }
        @keyframes fadeUp     { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes rowIn      { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
        @keyframes gradFlow   { 0%{background-position:0%} 100%{background-position:200%} }
        @keyframes spin       { to{transform:rotate(360deg)} }
        @keyframes slideRight { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideUp    { from{opacity:0;transform:translateY(40px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }

        .fade-up-dcl   { animation: fadeUp 0.5s ease forwards; }
        .fade-up-dcl-1 { animation: fadeUp 0.5s 0.05s ease forwards; opacity: 0; }
        .fade-up-dcl-2 { animation: fadeUp 0.5s 0.1s ease forwards; opacity: 0; }
        .slide-right-dcl    { animation: slideRight 0.35s ease forwards; }
        .slide-up-modal-dcl { animation: slideUp 0.35s cubic-bezier(0.34,1.2,0.64,1) forwards; }

        .row-item-dcl {
          transition: background 0.2s, padding-left 0.2s;
          cursor: pointer; position: relative; overflow: hidden;
        }
        .row-item-dcl::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0;
          width: 0; background: linear-gradient(to bottom, ${C.rose}, ${C.gold});
          transition: width 0.25s; border-radius: 0 2px 2px 0;
        }
        .row-item-dcl:hover::before { width: 3px; }
        .row-item-dcl:hover { background: rgba(201,132,138,0.05) !important; padding-left: 24px !important; }
        .row-item-dcl:hover .cell-dim-dcl  { color: ${C.inkMid} !important; }
        .row-item-dcl:hover .cell-main-dcl { color: ${C.ink} !important; }

        .action-btn-dcl { transition: all 0.25s cubic-bezier(0.34,1.2,0.64,1); }
        .action-btn-dcl:hover { transform: translateY(-2px); }

        .filter-pill-dcl { transition: all 0.2s; cursor: pointer; }
        .filter-pill-dcl:hover { color: ${C.inkMid} !important; }

        input:focus, select:focus { outline: none !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,132,138,0.3); border-radius: 4px; }

        .spinner-dcl {
          width: 28px; height: 28px;
          border: 2px solid rgba(201,132,138,0.2);
          border-top-color: ${C.rose}; border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
      `}</style>

      <AdminNavbarLight toggleTheme={toggleTheme} pageTitle="Delay Codes" pageSubtitle="Manage & Configure" />

      <div style={{ display: "flex", flex: 1, overflow: "visible" }}>
        <AdminSidebarLight hoveredWidth={hoveredWidth} setHoveredWidth={setHoveredWidth} />

        <div style={{ marginLeft: `${68 + hoveredWidth}px`, flex: 1, padding: "2rem 2.5rem", transition: "margin-left 0.28s cubic-bezier(0.4,0,0.2,1)", position: "relative", minHeight: "calc(100vh - 64px)" }}>

          {/* AMBIENT ORBS */}
          <div style={{ position: "fixed", top: "-100px", right: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: `radial-gradient(circle, rgba(201,132,138,0.12), transparent 70%)`, animation: "pulseOrb 6s ease-in-out infinite", pointerEvents: "none", zIndex: 0 }} />
          <div style={{ position: "fixed", bottom: "-150px", left: "5%", width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(circle, rgba(196,163,90,0.08), transparent 70%)`, animation: "pulseOrb 8s ease-in-out infinite reverse", pointerEvents: "none", zIndex: 0 }} />

          {/* NOTIFICATION */}
          {notification && (
            <div className="slide-right-dcl" style={{
              position: "fixed", top: "80px", right: "2rem", zIndex: 1000,
              padding: "1rem 1.4rem", borderRadius: "10px",
              background: notification.type === "success"
                ? "linear-gradient(135deg, rgba(90,158,90,0.12), rgba(90,158,90,0.06))"
                : `linear-gradient(135deg, ${C.roseLight}, rgba(201,132,138,0.06))`,
              border: `1px solid ${notification.type === "success" ? "rgba(90,158,90,0.3)" : C.borderRose}`,
              color: notification.type === "success" ? "#5a9e5a" : C.rose,
              backdropFilter: "blur(16px)",
              boxShadow: `0 8px 32px rgba(201,132,138,0.1)`,
              display: "flex", alignItems: "center", gap: "0.8rem", minWidth: "260px"
            }}>
              <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: notification.type === "success" ? "rgba(90,158,90,0.15)" : C.roseLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", flexShrink: 0 }}>
                {notification.type === "success" ? "✓" : "✕"}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.82rem", marginBottom: "2px", fontFamily: font.body }}>{notification.type === "success" ? "Success" : "Error"}</div>
                <div style={{ opacity: 0.8, fontSize: "0.76rem", fontFamily: font.body }}>{notification.message}</div>
              </div>
            </div>
          )}

          {/* PAGE HEADER */}
          <div className="fade-up-dcl" style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", position: "relative", zIndex: 1 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <div style={{ width: "24px", height: "2px", background: `linear-gradient(90deg,${C.rose},${C.gold})`, borderRadius: "2px" }} />
                <span style={{ fontSize: "0.6rem", letterSpacing: "4px", textTransform: "uppercase", background: `linear-gradient(90deg,${C.rose},${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 700, fontFamily: font.body }}>Configure</span>
              </div>
              <h1 style={{ fontFamily: font.heading, fontSize: "2.8rem", fontWeight: 600, color: C.ink, letterSpacing: "1px", lineHeight: 1, margin: 0 }}>Delay Codes</h1>
              <div style={{ fontSize: "0.76rem", color: C.inkLight, marginTop: "6px", fontFamily: font.body }}>
                {loading ? "Fetching data..." : `${codes.length} code${codes.length !== 1 ? "s" : ""} · Click any row to view details`}
              </div>
            </div>
            <button
              onClick={() => navigate("/admin/add-delay-code")}
              style={{ background: "transparent", color: C.rose, border: `1px solid rgba(201,132,138,0.4)`, padding: "12px 28px", borderRadius: "8px", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer", fontFamily: font.body, display: "flex", alignItems: "center", gap: "8px", transition: "all 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.background = C.roseLight; e.currentTarget.style.borderColor = C.borderRose; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(201,132,138,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(201,132,138,0.4)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <span style={{ fontSize: "1.2rem", fontWeight: 300 }}>+</span>
              Add Delay Code
            </button>
          </div>

          {/* FILTERS */}
          <div className="fade-up-dcl-1" style={{ display: "flex", gap: "12px", marginBottom: "16px", position: "relative", zIndex: 1, flexWrap: "wrap" }}>
            <div style={{ flex: 1, position: "relative", minWidth: "200px" }}>
              <svg style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", opacity: 0.4 }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.inkMid} strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input
                type="text" placeholder="Search by code, reason or category..."
                value={search} onChange={e => setSearch(e.target.value)}
                style={{ width: "100%", padding: "12px 16px 12px 42px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "10px", color: C.ink, fontSize: "0.85rem", fontFamily: font.body, boxSizing: "border-box", transition: "all 0.25s" }}
                onFocus={e => { e.target.style.borderColor = C.borderRose; e.target.style.boxShadow = `0 0 0 4px rgba(201,132,138,0.08)`; }}
                onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }}
              />
            </div>
            <div style={{ display: "flex", gap: "4px", background: C.bgDeep, border: `1px solid ${C.border}`, padding: "4px", borderRadius: "10px" }}>
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setCategoryFilter(c)} className="filter-pill-dcl"
                  style={{ padding: "6px 12px", borderRadius: "7px", fontSize: "0.72rem", fontWeight: 500, fontFamily: font.body, background: categoryFilter === c ? `linear-gradient(135deg,${C.roseLight},${C.goldLight})` : "transparent", border: categoryFilter === c ? `1px solid ${C.borderRose}` : "1px solid transparent", color: categoryFilter === c ? C.rose : C.inkLight }}>{c}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "4px", background: C.bgDeep, border: `1px solid ${C.border}`, padding: "4px", borderRadius: "10px" }}>
              {SEVERITIES.map(s => (
                <button key={s} onClick={() => setSeverityFilter(s)} className="filter-pill-dcl"
                  style={{ padding: "6px 12px", borderRadius: "7px", fontSize: "0.72rem", fontWeight: 500, fontFamily: font.body, background: severityFilter === s ? `linear-gradient(135deg,${C.roseLight},${C.goldLight})` : "transparent", border: severityFilter === s ? `1px solid ${C.borderRose}` : "1px solid transparent", color: severityFilter === s ? C.rose : C.inkLight }}>{s}</button>
              ))}
            </div>
          </div>

          {/* TABLE */}
          <div className="fade-up-dcl-2" style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "14px", overflow: "hidden", position: "relative", zIndex: 1, boxShadow: "0 4px 24px rgba(201,132,138,0.07)" }}>
            <div style={{ height: "2px", background: `linear-gradient(90deg,${C.rose},${C.gold},${C.rose})`, backgroundSize: "200%", animation: "gradFlow 3s linear infinite" }} />

            <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr 120px 120px 120px 100px", padding: "12px 20px", background: C.bgDeep, borderBottom: `1px solid ${C.border}` }}>
              {["Code", "Reason", "Category", "Severity", "Avg Delay", "Status", "Uses"].map(h => (
                <div key={h} style={{ fontSize: "0.6rem", letterSpacing: "2.5px", textTransform: "uppercase", color: C.inkFaint, fontFamily: font.body, fontWeight: 700 }}>{h}</div>
              ))}
            </div>

            {loading ? (
              <div style={{ padding: "5rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                <div className="spinner-dcl" />
                <div style={{ color: C.inkLight, fontSize: "0.82rem", fontFamily: font.body }}>Fetching delay codes...</div>
              </div>
            ) : codes.length === 0 ? (
              <div style={{ padding: "5rem", textAlign: "center" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem", opacity: 0.4 }}>⚠️</div>
                <div style={{ color: C.inkMid, fontSize: "0.88rem", fontWeight: 500, marginBottom: "4px", fontFamily: font.body }}>No delay codes found</div>
                <div style={{ color: C.inkLight, fontSize: "0.76rem", fontFamily: font.body }}>Add your first delay code to get started</div>
              </div>
            ) : (
              codes.map((code, i) => {
                const sc = severityConfig(code.Severity);
                const isHov = hoveredRow === i;
                return (
                  <div key={i} className="row-item-dcl"
                    onMouseEnter={() => setHoveredRow(i)}
                    onMouseLeave={() => setHoveredRow(null)}
                    onClick={() => { setSelectedCode(code); setEditData({ ...code }); setIsEditing(false); setShowDeleteConfirm(false); }}
                    style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr 120px 120px 120px 100px", padding: "14px 20px", alignItems: "center", borderBottom: i < codes.length - 1 ? `1px solid ${C.border}` : "none", animation: `rowIn 0.3s ${i * 0.04}s ease forwards`, opacity: 0 }}
                  >
                    <div style={{ fontFamily: font.heading, fontSize: "1rem", fontWeight: 600, fontStyle: "italic", background: `linear-gradient(135deg,${C.rose},${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{code.Code}</div>
                    <div className="cell-main-dcl" style={{ fontSize: "0.84rem", color: C.inkMid, fontFamily: font.body, transition: "color 0.15s", fontWeight: 500 }}>{code.Reason}</div>
                    <div style={{ fontSize: "0.84rem", fontFamily: font.body, display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>{categoryIcon(code.Category)}</span>
                      <span className="cell-dim-dcl" style={{ color: C.inkLight, transition: "color 0.15s" }}>{code.Category}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: "0.7rem", padding: "4px 10px", borderRadius: "999px", fontWeight: 600, fontFamily: font.body, background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, display: "inline-flex", alignItems: "center", gap: "5px", boxShadow: isHov ? `0 0 12px ${sc.glow}` : "none", transition: "box-shadow 0.2s" }}>
                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: sc.color }} />
                        {code.Severity}
                      </span>
                    </div>
                    <div className="cell-dim-dcl" style={{ fontSize: "0.84rem", color: C.inkLight, fontFamily: font.body }}>{code.AverageDelayHours}h avg</div>
                    <div>
                      <span style={{ fontSize: "0.7rem", padding: "4px 10px", borderRadius: "999px", fontWeight: 600, fontFamily: font.body, background: code.IsActive ? "rgba(90,158,90,0.09)" : C.bgDeep, color: code.IsActive ? "#5a9e5a" : C.inkFaint, border: `1px solid ${code.IsActive ? "rgba(90,158,90,0.3)" : C.border}` }}>
                        {code.IsActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="cell-dim-dcl" style={{ fontSize: "0.84rem", color: C.inkFaint, fontFamily: font.body }}>—</div>
                  </div>
                );
              })
            )}
            {!loading && codes.length > 0 && (
              <div style={{ height: "1px", background: `linear-gradient(90deg,transparent,rgba(196,163,90,0.3),transparent)` }} />
            )}
          </div>

          {/* DETAIL CARD */}
          {selectedCode && (
            <div
              style={{ position: "fixed", inset: 0, background: "rgba(46,34,24,0.4)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}
              onClick={e => { if (e.target === e.currentTarget) { setSelectedCode(null); setIsEditing(false); setShowDeleteConfirm(false); } }}
            >
              <div className="slide-up-modal-dcl" style={{ background: C.bgCard, border: `1px solid ${C.borderRose}`, borderRadius: "16px", width: "520px", maxHeight: "88vh", overflowY: "auto", boxShadow: "0 30px 100px rgba(46,34,24,0.2)" }}>
                <div style={{ height: "2px", background: `linear-gradient(90deg,${C.rose},${C.gold},${C.rose})`, backgroundSize: "200%", animation: "gradFlow 3s linear infinite", borderRadius: "16px 16px 0 0" }} />

                <div style={{ padding: "1.6rem 2rem", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "0.55rem", letterSpacing: "3px", textTransform: "uppercase", color: C.inkFaint, marginBottom: "4px", fontFamily: font.body, fontWeight: 600 }}>Delay Code Details</div>
                    <div style={{ fontFamily: font.heading, fontSize: "1.8rem", fontWeight: 600, fontStyle: "italic", background: `linear-gradient(135deg,${C.ink},${C.rose})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{selectedCode.Code}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {(() => { const sc = severityConfig(selectedCode.Severity); return (
                      <span style={{ fontSize: "0.72rem", padding: "5px 12px", borderRadius: "999px", fontWeight: 600, fontFamily: font.body, background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, display: "inline-flex", alignItems: "center", gap: "5px", boxShadow: `0 0 16px ${sc.glow}` }}>
                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: sc.color }} />{selectedCode.Severity}
                      </span>
                    ); })()}
                    <button
                      onClick={() => { setSelectedCode(null); setIsEditing(false); setShowDeleteConfirm(false); }}
                      style={{ background: C.bgDeep, border: `1px solid ${C.border}`, color: C.inkLight, width: "34px", height: "34px", borderRadius: "50%", cursor: "pointer", fontSize: "0.9rem", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = C.roseLight; e.currentTarget.style.color = C.rose; e.currentTarget.style.borderColor = C.borderRose; }}
                      onMouseLeave={e => { e.currentTarget.style.background = C.bgDeep; e.currentTarget.style.color = C.inkLight; e.currentTarget.style.borderColor = C.border; }}
                    >✕</button>
                  </div>
                </div>

                <div style={{ padding: "2rem" }}>
                  {showDeleteConfirm ? (
                    <div style={{ background: C.roseLight, border: `1px solid ${C.borderRose}`, borderRadius: "12px", padding: "2.5rem", textAlign: "center" }}>
                      <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚠️</div>
                      <div style={{ fontSize: "1rem", color: C.ink, marginBottom: "6px", fontFamily: font.body, fontWeight: 600 }}>Delete {selectedCode.Code}?</div>
                      <div style={{ fontSize: "0.82rem", color: C.inkMid, marginBottom: "2rem", fontFamily: font.body }}>This action is permanent and cannot be undone.</div>
                      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                        <button onClick={() => setShowDeleteConfirm(false)} className="action-btn-dcl"
                          style={{ padding: "10px 28px", background: C.bgDeep, border: `1px solid ${C.border}`, color: C.inkMid, borderRadius: "8px", cursor: "pointer", fontSize: "0.82rem", fontFamily: font.body }}
                          onMouseEnter={e => { e.currentTarget.style.color = C.ink; e.currentTarget.style.borderColor = C.borderRose; }}
                          onMouseLeave={e => { e.currentTarget.style.color = C.inkMid; e.currentTarget.style.borderColor = C.border; }}
                        >Cancel</button>
                        <button onClick={handleDelete} className="action-btn-dcl"
                          style={{ padding: "10px 28px", background: C.roseLight, border: `1px solid ${C.borderRose}`, color: C.rose, borderRadius: "8px", cursor: "pointer", fontSize: "0.82rem", fontWeight: 700, fontFamily: font.body }}
                          onMouseEnter={e => e.currentTarget.style.background = "rgba(201,132,138,0.25)"}
                          onMouseLeave={e => e.currentTarget.style.background = C.roseLight}
                        >Yes, Delete</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.5rem" }}>
                        {[
                          { label: "Code",            key: "Code",              type: "text",   full: false },
                          { label: "Reason",          key: "Reason",            type: "text",   full: true  },
                          { label: "Category",        key: "Category",          type: "select", options: ["Weather","Customs","Port","Carrier","Documentation","Other"] },
                          { label: "Severity",        key: "Severity",          type: "select", options: ["Low","Medium","High"] },
                          { label: "Avg Delay Hours", key: "AverageDelayHours", type: "number" },
                          { label: "Status",          key: "IsActive",          type: "select", options: ["true","false"] },
                        ].map(field => (
                          <div key={field.key} style={{ gridColumn: field.full ? "1/3" : "auto" }}>
                            <div style={{ fontSize: "0.6rem", letterSpacing: "2px", textTransform: "uppercase", color: C.inkFaint, marginBottom: "6px", fontFamily: font.body, fontWeight: 600 }}>{field.label}</div>
                            {isEditing ? (
                              field.type === "select" ? (
                                <select
                                  value={String(editData[field.key]) || ""}
                                  onChange={e => setEditData({ ...editData, [field.key]: field.key === "IsActive" ? e.target.value === "true" : e.target.value })}
                                  style={{ width: "100%", padding: "10px 12px", background: C.bgDeep, border: `1px solid ${C.border}`, borderRadius: "8px", color: C.ink, fontSize: "0.84rem", fontFamily: font.body, boxSizing: "border-box" }}
                                >
                                  {field.options.map(o => <option key={o} value={o} style={{ background: C.bgCard }}>{field.key === "IsActive" ? (o === "true" ? "Active" : "Inactive") : o}</option>)}
                                </select>
                              ) : (
                                <input type={field.type} value={editData[field.key] || ""}
                                  onChange={e => setEditData({ ...editData, [field.key]: e.target.value })}
                                  style={{ width: "100%", padding: "10px 12px", background: C.bgDeep, border: `1px solid ${C.border}`, borderRadius: "8px", color: C.ink, fontSize: "0.84rem", fontFamily: font.body, boxSizing: "border-box" }}
                                />
                              )
                            ) : (
                              <div style={{ fontSize: "0.9rem", color: C.inkMid, fontFamily: font.body, padding: "8px 12px", background: C.bgDeep, borderRadius: "6px", border: `1px solid ${C.border}` }}>
                                {field.key === "IsActive" ? (selectedCode[field.key] ? "Active" : "Inactive") : field.key === "AverageDelayHours" ? `${selectedCode[field.key]}h` : selectedCode[field.key] || "—"}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", padding: "1rem 1.2rem", background: C.bgDeep, borderRadius: "8px", marginBottom: "1.5rem", border: `1px solid ${C.border}` }}>
                        {[{ label: "Created", val: selectedCode.createdAt }, { label: "Last Updated", val: selectedCode.updatedAt }].map((t, i) => (
                          <div key={i}>
                            <div style={{ fontSize: "0.58rem", letterSpacing: "2px", textTransform: "uppercase", color: C.inkFaint, marginBottom: "4px", fontFamily: font.body, fontWeight: 600 }}>{t.label}</div>
                            <div style={{ fontSize: "0.78rem", color: C.inkLight, fontFamily: font.body }}>{new Date(t.val).toLocaleString()}</div>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                        {isEditing ? (
                          <>
                            <button onClick={() => setIsEditing(false)} className="action-btn-dcl"
                              style={{ padding: "10px 20px", background: C.bgDeep, border: `1px solid ${C.border}`, color: C.inkMid, borderRadius: "8px", cursor: "pointer", fontSize: "0.82rem", fontFamily: font.body }}
                              onMouseEnter={e => e.currentTarget.style.color = C.ink}
                              onMouseLeave={e => e.currentTarget.style.color = C.inkMid}
                            >Cancel</button>
                            <button onClick={handleUpdate} className="action-btn-dcl"
                              style={{ padding: "10px 24px", background: `linear-gradient(135deg,${C.rose},${C.gold})`, border: "none", color: "#fff", borderRadius: "8px", cursor: "pointer", fontSize: "0.82rem", fontWeight: 700, fontFamily: font.body, boxShadow: `0 4px 20px rgba(201,132,138,0.25)` }}>Save Changes</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => setShowDeleteConfirm(true)} className="action-btn-dcl"
                              style={{ padding: "10px 20px", background: C.roseLight, border: `1px solid ${C.borderRose}`, color: C.rose, borderRadius: "8px", cursor: "pointer", fontSize: "0.82rem", fontFamily: font.body }}
                              onMouseEnter={e => e.currentTarget.style.background = "rgba(201,132,138,0.25)"}
                              onMouseLeave={e => e.currentTarget.style.background = C.roseLight}
                            >Delete</button>
                            <button onClick={() => setIsEditing(true)} className="action-btn-dcl"
                              style={{ padding: "10px 24px", background: `linear-gradient(135deg,${C.rose},${C.gold})`, border: "none", color: "#fff", borderRadius: "8px", cursor: "pointer", fontSize: "0.82rem", fontWeight: 700, fontFamily: font.body, boxShadow: `0 4px 20px rgba(201,132,138,0.25)` }}>Edit Code</button>
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