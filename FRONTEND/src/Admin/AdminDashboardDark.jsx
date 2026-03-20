import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebarDark from "./Components/AdminSidebarDark";
import AdminNavbarDark from "./Components/AdminNavbarDark";

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
  { label: "Add New Shipment", icon: "⊕", path: "/admin/add-shipment" },
  { label: "Manage Users", icon: "⬟", path: "/admin/users" },
  { label: "View Delay Codes", icon: "◈", path: "/admin/delay-codes" },
  { label: "Generate Report", icon: "◉", path: "/admin/reports" },
];

export default function AdminDashboardDark({ toggleTheme }) {
  const navigate = useNavigate();
  const [hoveredWidth, setHoveredWidth] = useState(0);

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      minHeight: "100vh", background: "#07060a",
      color: "#e0d8d0", fontFamily: "'Inter', sans-serif"
    }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap');
        @keyframes pulseR { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px);} to{opacity:1;transform:translateY(0);} }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
      `}</style>

      {/* NAVBAR */}
      <AdminNavbarDark
        toggleTheme={toggleTheme}
        pageTitle="DASHBOARD"
        pageSubtitle="OVERVIEW"
      />

      {/* BODY */}
      <div style={{ display: "flex", flex: 1, overflow: "visible" }}>

        {/* SIDEBAR */}
        <AdminSidebarDark
          hoveredWidth={hoveredWidth}
          setHoveredWidth={setHoveredWidth}
        />

        {/* MAIN */}
        <div style={{
          marginLeft: `${68 + hoveredWidth}px`,
          flex: 1, padding: "2rem 2.5rem",
          transition: "margin-left 0.28s cubic-bezier(0.4,0,0.2,1)",
          overflow: "visible"
        }}>

        {/* PAGE HEADER */}
        <div className="fade-up" style={{ marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(230,50,50,0.08)" }}>
        <div style={{
            fontSize: "0.58rem", letterSpacing: "4px", textTransform: "uppercase",
            background: "linear-gradient(90deg,#e63232,#f0a030)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            marginBottom: "0.4rem", fontFamily: "'Inter', sans-serif"
        }}>Welcome back, Arnab</div>
        <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.5rem",
            background: "linear-gradient(135deg, #ffffff, #c8b0a8)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            letterSpacing: "2px", lineHeight: 1
        }}>ADMIN DASHBOARD</h1>
        </div>

          {/* STAT CARDS */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4,1fr)",
            gap: "1rem", marginBottom: "1.5rem"
          }}>
            {stats.map((s, i) => (
              <div key={i} className="fade-up" style={{
                animationDelay: `${i * 0.08}s`, opacity: 0,
                background: "rgba(230,50,50,0.04)",
                border: "1px solid rgba(230,50,50,0.12)",
                borderRadius: "8px", padding: "1.4rem",
                transition: "all 0.3s", position: "relative", overflow: "hidden"
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(230,50,50,0.35)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(230,50,50,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(230,50,50,0.12)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{
                  position: "absolute", top: "-30px", right: "-30px",
                  width: "80px", height: "80px", borderRadius: "50%",
                  background: s.up
                    ? "radial-gradient(circle, rgba(240,160,48,0.1), transparent)"
                    : "radial-gradient(circle, rgba(230,50,50,0.1), transparent)",
                  pointerEvents: "none"
                }} />
                <div style={{ fontSize: "0.6rem", letterSpacing: "2px", textTransform: "uppercase", color: "#884040", marginBottom: "0.8rem", fontFamily: "'Inter', sans-serif" }}>{s.label}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.2rem", background: "linear-gradient(135deg, #ffffff, #f0c080)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "2px", lineHeight: 1, marginBottom: "0.4rem" }}>{s.val}</div>
                <div style={{ fontSize: "0.68rem", color: s.up ? "#5ab05a" : "#e63232", fontFamily: "'Inter', sans-serif" }}>{s.change}</div>
              </div>
            ))}
          </div>

          {/* RECENT SHIPMENTS */}
          <div className="fade-up" style={{
            animationDelay: "0.35s", opacity: 0,
            background: "rgba(230,50,50,0.03)",
            border: "1px solid rgba(230,50,50,0.1)",
            borderRadius: "8px", padding: "1.8rem", marginBottom: "1.5rem"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div>
                <div style={{ fontSize: "0.6rem", letterSpacing: "3px", textTransform: "uppercase", background: "linear-gradient(90deg,#e63232,#f0a030)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "0.3rem" }}>Overview</div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", color: "#e0d8d0", letterSpacing: "2px" }}>RECENT SHIPMENTS</h2>
              </div>
              <button onClick={() => navigate("/admin/shipments")} style={{
                fontSize: "0.72rem", color: "#f0a030", background: "transparent",
                border: "1px solid rgba(240,160,48,0.3)", padding: "0.4rem 1rem",
                borderRadius: "4px", cursor: "pointer", letterSpacing: "1px",
                textTransform: "uppercase", transition: "all 0.2s", fontFamily: "'Inter', sans-serif"
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(240,160,48,0.08)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >View All →</button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Shipment ID", "Supplier", "Route", "ETA", "Status", "Delay Reason"].map(h => (
                    <th key={h} style={{ fontSize: "0.58rem", letterSpacing: "2px", textTransform: "uppercase", color: "#884040", padding: "0 0 1rem", textAlign: "left", fontWeight: 400, fontFamily: "'Inter', sans-serif" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shipments.map((s, i) => (
                  <tr key={i} style={{ transition: "background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(230,50,50,0.04)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <td style={{ fontSize: "0.75rem", padding: "0.8rem 0.5rem 0.8rem 0", borderBottom: "1px solid rgba(230,50,50,0.06)", color: "#f0a030", fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>{s.id}</td>
                    <td style={{ fontSize: "0.75rem", padding: "0.8rem 0.5rem", borderBottom: "1px solid rgba(230,50,50,0.06)", color: "#c8b8b0", fontFamily: "'Inter', sans-serif" }}>{s.supplier}</td>
                    <td style={{ fontSize: "0.75rem", padding: "0.8rem 0.5rem", borderBottom: "1px solid rgba(230,50,50,0.06)", color: "#c8b8b0", fontFamily: "'Inter', sans-serif" }}>{s.origin} → {s.dest}</td>
                    <td style={{ fontSize: "0.75rem", padding: "0.8rem 0.5rem", borderBottom: "1px solid rgba(230,50,50,0.06)", color: "#c8b8b0", fontFamily: "'Inter', sans-serif" }}>{s.eta}</td>
                    <td style={{ fontSize: "0.75rem", padding: "0.8rem 0.5rem", borderBottom: "1px solid rgba(230,50,50,0.06)" }}>
                      <span style={{
                        fontSize: "0.6rem", padding: "0.2rem 0.6rem", borderRadius: "2px",
                        fontWeight: 500, letterSpacing: "0.5px", fontFamily: "'Inter', sans-serif",
                        background: s.status === "On Time" ? "rgba(240,160,48,0.12)" : "rgba(230,50,50,0.12)",
                        color: s.status === "On Time" ? "#f0a030" : "#e63232",
                        border: `1px solid ${s.status === "On Time" ? "rgba(240,160,48,0.3)" : "rgba(230,50,50,0.3)"}`
                      }}>{s.status}</span>
                    </td>
                    <td style={{ fontSize: "0.75rem", padding: "0.8rem 0 0.8rem 0.5rem", borderBottom: "1px solid rgba(230,50,50,0.06)", color: s.delay === "—" ? "#444" : "#e08080", fontFamily: "'Inter', sans-serif" }}>{s.delay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* BOTTOM ROW */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>

            <div className="fade-up" style={{
              animationDelay: "0.45s", opacity: 0,
              background: "rgba(230,50,50,0.03)",
              border: "1px solid rgba(230,50,50,0.1)",
              borderRadius: "8px", padding: "1.8rem"
            }}>
              <div style={{ fontSize: "0.6rem", letterSpacing: "3px", textTransform: "uppercase", background: "linear-gradient(90deg,#e63232,#f0a030)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "0.3rem" }}>Analytics</div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", color: "#e0d8d0", letterSpacing: "2px", marginBottom: "1.5rem" }}>DELAY BREAKDOWN</h2>
              {delays.map((d, i) => (
                <div key={i} style={{ marginBottom: "1.2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <span style={{ fontSize: "0.75rem", color: "#c8b8b0", fontFamily: "'Inter', sans-serif" }}>{d.label}</span>
                    <span style={{ fontSize: "0.7rem", color: "#884040", fontFamily: "'Inter', sans-serif" }}>{d.count} shipments</span>
                  </div>
                  <div style={{ height: "4px", background: "rgba(230,50,50,0.08)", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${d.pct}%`, background: "linear-gradient(90deg, #e63232, #f0a030)", borderRadius: "2px" }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="fade-up" style={{
              animationDelay: "0.5s", opacity: 0,
              background: "rgba(230,50,50,0.03)",
              border: "1px solid rgba(230,50,50,0.1)",
              borderRadius: "8px", padding: "1.8rem"
            }}>
              <div style={{ fontSize: "0.6rem", letterSpacing: "3px", textTransform: "uppercase", background: "linear-gradient(90deg,#e63232,#f0a030)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "0.3rem" }}>Actions</div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", color: "#e0d8d0", letterSpacing: "2px", marginBottom: "1.5rem" }}>QUICK ACTIONS</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {actions.map((a, i) => (
                  <div key={i} onClick={() => navigate(a.path)} style={{
                    display: "flex", alignItems: "center", gap: "1rem",
                    padding: "0.8rem 1rem",
                    background: "rgba(230,50,50,0.04)",
                    border: "1px solid rgba(230,50,50,0.1)",
                    borderRadius: "6px", cursor: "pointer", transition: "all 0.2s"
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(230,50,50,0.35)"; e.currentTarget.style.background = "rgba(230,50,50,0.08)"; e.currentTarget.style.paddingLeft = "1.3rem"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(230,50,50,0.1)"; e.currentTarget.style.background = "rgba(230,50,50,0.04)"; e.currentTarget.style.paddingLeft = "1rem"; }}
                  >
                    <span style={{ fontSize: "1rem", flexShrink: 0, background: "linear-gradient(135deg,#e63232,#f0a030)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{a.icon}</span>
                    <span style={{ fontSize: "0.8rem", color: "#c8b8b0", fontFamily: "'Inter', sans-serif" }}>{a.label}</span>
                    <span style={{ marginLeft: "auto", fontSize: "0.75rem", background: "linear-gradient(135deg,#e63232,#f0a030)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>→</span>
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