import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebarLight from "./Components/AdminSidebarLight";
import AdminNavbarLight from "./Components/AdminNavbarLight";

const C = {
  bg: "#faf6f0", bgDeep: "#f3ede4", bgCard: "rgba(255,250,245,0.85)",
  rose: "#c9848a", gold: "#c4a35a",
  ink: "#2e2218", inkMid: "#6b5744", inkLight: "#a8917a", inkFaint: "#d6c9bc",
  border: "rgba(196,163,90,0.2)", borderRose: "rgba(201,132,138,0.25)",
  roseLight: "rgba(201,132,138,0.12)", goldLight: "rgba(196,163,90,0.12)",
};
const font = { heading: "'Cormorant Garamond', serif", cursive: "'Dancing Script', cursive", body: "'DM Sans', sans-serif" };

const stats = [
  { label: "Total Shipments", val: "1,284", change: "+12 today", up: true },
  { label: "Delayed", val: "43", change: "+3 today", up: false },
  { label: "On Time %", val: "94%", change: "+1.2%", up: true },
  { label: "Total Users", val: "218", change: "+5 today", up: true },
];

const shipments = [
  { id: "SHP-4821", supplier: "Arnab Logistics", origin: "Mumbai", dest: "Dubai", eta: "Mar 22", status: "On Time", delay: "—" },
  { id: "SHP-3309", supplier: "FastFreight Co.", origin: "Delhi", dest: "New York", eta: "Mar 24", status: "Delayed", delay: "Weather" },
  { id: "SHP-5102", supplier: "Arnab Logistics", origin: "Chennai", dest: "London", eta: "Mar 23", status: "On Time", delay: "—" },
  { id: "SHP-6074", supplier: "QuickShip Ltd.", origin: "Kolkata", dest: "Singapore", eta: "Mar 25", status: "Delayed", delay: "Customs" },
  { id: "SHP-7741", supplier: "FastFreight Co.", origin: "Hyderabad", dest: "Frankfurt", eta: "Mar 26", status: "On Time", delay: "—" },
];

const delays = [
  { label: "Weather", count: 18, pct: 42 },
  { label: "Customs", count: 12, pct: 28 },
  { label: "Port Congestion", count: 8, pct: 19 },
  { label: "Carrier Issue", count: 5, pct: 11 },
];

const actions = [
  { label: "Add New Shipment", path: "/admin/add-shipment" },
  { label: "Manage Users", path: "/admin/users" },
  { label: "View Delay Codes", path: "/admin/delay-codes" },
  { label: "Generate Report", path: "/admin/reports" },
];

export default function AdminDashboardLight({ toggleTheme }) {
  const navigate = useNavigate();
  const [hoveredWidth, setHoveredWidth] = useState(0);

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      minHeight: "100vh", background: C.bg,
      color: C.ink, fontFamily: font.body
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=DM+Sans:wght@300;400;500;600&family=Dancing+Script:wght@600&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px);} to{opacity:1;transform:translateY(0);} }
        @keyframes pulseR { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
        .fade-up-l { animation: fadeUp 0.5s ease forwards; }
      `}</style>

      <AdminNavbarLight toggleTheme={toggleTheme} pageTitle="Dashboard" pageSubtitle="Overview" />

      <div style={{ display: "flex", flex: 1, overflow: "visible" }}>
        <AdminSidebarLight hoveredWidth={hoveredWidth} setHoveredWidth={setHoveredWidth} />

        <div style={{
          marginLeft: `${68 + hoveredWidth}px`,
          flex: 1, padding: "2rem 2.5rem",
          transition: "margin-left 0.28s cubic-bezier(0.4,0,0.2,1)",
          overflow: "visible"
        }}>

          {/* PAGE HEADER */}
          <div className="fade-up-l" style={{ marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ fontSize: "0.58rem", letterSpacing: "4px", textTransform: "uppercase", background: `linear-gradient(90deg,${C.rose},${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "0.4rem", fontFamily: font.body, fontWeight: 600 }}>Welcome back, Juii</div>
            <h1 style={{ fontFamily: font.heading, fontSize: "2.5rem", fontWeight: 600, color: C.ink, letterSpacing: "1px", lineHeight: 1 }}>Admin Dashboard</h1>
          </div>

          {/* STAT CARDS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
            {stats.map((s, i) => (
              <div key={i} className="fade-up-l" style={{
                animationDelay: `${i * 0.08}s`, opacity: 0,
                background: C.bgCard,
                border: `1px solid ${C.border}`,
                borderRadius: "8px", padding: "1.4rem",
                transition: "all 0.3s", position: "relative", overflow: "hidden",
                boxShadow: "0 2px 12px rgba(201,132,138,0.06)"
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderRose; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 30px rgba(201,132,138,0.12)`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(201,132,138,0.06)"; }}
              >
                <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "80px", height: "80px", borderRadius: "50%", background: s.up ? `radial-gradient(circle, rgba(196,163,90,0.12), transparent)` : `radial-gradient(circle, rgba(201,132,138,0.12), transparent)`, pointerEvents: "none" }} />
                <div style={{ fontSize: "0.6rem", letterSpacing: "2px", textTransform: "uppercase", color: C.inkFaint, marginBottom: "0.8rem", fontFamily: font.body, fontWeight: 600 }}>{s.label}</div>
                <div style={{ fontFamily: font.heading, fontSize: "2.2rem", fontWeight: 600, background: `linear-gradient(135deg, ${C.ink}, ${C.inkMid})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "1px", lineHeight: 1, marginBottom: "0.4rem" }}>{s.val}</div>
                <div style={{ fontSize: "0.68rem", color: s.up ? "#5a9e5a" : C.rose, fontFamily: font.body }}>{s.change}</div>
              </div>
            ))}
          </div>

          {/* RECENT SHIPMENTS */}
          <div className="fade-up-l" style={{
            animationDelay: "0.35s", opacity: 0,
            background: C.bgCard, border: `1px solid ${C.border}`,
            borderRadius: "8px", padding: "1.8rem", marginBottom: "1.5rem",
            boxShadow: "0 2px 12px rgba(201,132,138,0.06)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div>
                <div style={{ fontSize: "0.6rem", letterSpacing: "3px", textTransform: "uppercase", background: `linear-gradient(90deg,${C.rose},${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "0.3rem", fontFamily: font.body, fontWeight: 600 }}>Overview</div>
                <h2 style={{ fontFamily: font.heading, fontSize: "1.6rem", fontWeight: 600, color: C.ink, letterSpacing: "1px" }}>Recent Shipments</h2>
              </div>
              <button onClick={() => navigate("/admin/shipments")} style={{
                fontSize: "0.72rem", color: C.gold, background: "transparent",
                border: `1px solid rgba(196,163,90,0.35)`, padding: "0.4rem 1rem",
                borderRadius: "4px", cursor: "pointer", letterSpacing: "1px",
                textTransform: "uppercase", transition: "all 0.2s", fontFamily: font.body
              }}
                onMouseEnter={e => e.currentTarget.style.background = C.goldLight}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >View All →</button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Shipment ID", "Supplier", "Route", "ETA", "Status", "Delay Reason"].map(h => (
                    <th key={h} style={{ fontSize: "0.58rem", letterSpacing: "2px", textTransform: "uppercase", color: C.inkFaint, padding: "0 0 1rem", textAlign: "left", fontWeight: 600, fontFamily: font.body }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shipments.map((s, i) => (
                  <tr key={i} style={{ transition: "background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = C.roseLight}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <td style={{ fontSize: "0.75rem", padding: "0.8rem 0.5rem 0.8rem 0", borderBottom: `1px solid ${C.border}`, color: C.rose, fontWeight: 600, fontFamily: font.body }}>{s.id}</td>
                    <td style={{ fontSize: "0.75rem", padding: "0.8rem 0.5rem", borderBottom: `1px solid ${C.border}`, color: C.inkMid, fontFamily: font.body }}>{s.supplier}</td>
                    <td style={{ fontSize: "0.75rem", padding: "0.8rem 0.5rem", borderBottom: `1px solid ${C.border}`, color: C.inkMid, fontFamily: font.body }}>{s.origin} → {s.dest}</td>
                    <td style={{ fontSize: "0.75rem", padding: "0.8rem 0.5rem", borderBottom: `1px solid ${C.border}`, color: C.inkMid, fontFamily: font.body }}>{s.eta}</td>
                    <td style={{ fontSize: "0.75rem", padding: "0.8rem 0.5rem", borderBottom: `1px solid ${C.border}` }}>
                      <span style={{
                        fontSize: "0.6rem", padding: "0.2rem 0.6rem", borderRadius: "999px",
                        fontWeight: 500, letterSpacing: "0.5px", fontFamily: font.body,
                        background: s.status === "On Time" ? C.goldLight : C.roseLight,
                        color: s.status === "On Time" ? C.gold : C.rose,
                        border: `1px solid ${s.status === "On Time" ? "rgba(196,163,90,0.35)" : "rgba(201,132,138,0.35)"}`
                      }}>{s.status}</span>
                    </td>
                    <td style={{ fontSize: "0.75rem", padding: "0.8rem 0 0.8rem 0.5rem", borderBottom: `1px solid ${C.border}`, color: s.delay === "—" ? C.inkFaint : C.rose, fontFamily: font.body }}>{s.delay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* BOTTOM ROW */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>

            {/* DELAY BREAKDOWN */}
            <div className="fade-up-l" style={{
              animationDelay: "0.45s", opacity: 0,
              background: C.bgCard, border: `1px solid ${C.border}`,
              borderRadius: "8px", padding: "1.8rem",
              boxShadow: "0 2px 12px rgba(201,132,138,0.06)"
            }}>
              <div style={{ fontSize: "0.6rem", letterSpacing: "3px", textTransform: "uppercase", background: `linear-gradient(90deg,${C.rose},${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "0.3rem", fontFamily: font.body, fontWeight: 600 }}>Analytics</div>
              <h2 style={{ fontFamily: font.heading, fontSize: "1.6rem", fontWeight: 600, color: C.ink, letterSpacing: "1px", marginBottom: "1.5rem" }}>Delay Breakdown</h2>
              {delays.map((d, i) => (
                <div key={i} style={{ marginBottom: "1.2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <span style={{ fontSize: "0.75rem", color: C.inkMid, fontFamily: font.body }}>{d.label}</span>
                    <span style={{ fontSize: "0.7rem", color: C.inkFaint, fontFamily: font.body }}>{d.count} shipments</span>
                  </div>
                  <div style={{ height: "4px", background: C.roseLight, borderRadius: "999px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${d.pct}%`, background: `linear-gradient(90deg, ${C.rose}, ${C.gold})`, borderRadius: "999px" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* QUICK ACTIONS */}
            <div className="fade-up-l" style={{
              animationDelay: "0.5s", opacity: 0,
              background: C.bgCard, border: `1px solid ${C.border}`,
              borderRadius: "8px", padding: "1.8rem",
              boxShadow: "0 2px 12px rgba(201,132,138,0.06)"
            }}>
              <div style={{ fontSize: "0.6rem", letterSpacing: "3px", textTransform: "uppercase", background: `linear-gradient(90deg,${C.rose},${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "0.3rem", fontFamily: font.body, fontWeight: 600 }}>Actions</div>
              <h2 style={{ fontFamily: font.heading, fontSize: "1.6rem", fontWeight: 600, color: C.ink, letterSpacing: "1px", marginBottom: "1.5rem" }}>Quick Actions</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {actions.map((a, i) => (
                  <div key={i} onClick={() => navigate(a.path)} style={{
                    display: "flex", alignItems: "center", gap: "1rem",
                    padding: "0.8rem 1rem",
                    background: C.bgDeep,
                    border: `1px solid ${C.border}`,
                    borderRadius: "6px", cursor: "pointer", transition: "all 0.2s"
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderRose; e.currentTarget.style.background = C.roseLight; e.currentTarget.style.paddingLeft = "1.3rem"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bgDeep; e.currentTarget.style.paddingLeft = "1rem"; }}
                  >
                    <span style={{ fontSize: "0.8rem", color: C.inkMid, fontFamily: font.body, flex: 1 }}>{a.label}</span>
                    <span style={{ background: `linear-gradient(135deg,${C.rose},${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: "0.9rem" }}>→</span>
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