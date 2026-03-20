import { useNavigate } from "react-router-dom";

const C = {
  bg: "#faf6f0", bgDeep: "#f3ede4",
  rose: "#c9848a", gold: "#c4a35a",
  ink: "#2e2218", inkMid: "#6b5744", inkLight: "#a8917a", inkFaint: "#d6c9bc",
  border: "rgba(196,163,90,0.2)", borderRose: "rgba(201,132,138,0.25)",
  roseLight: "rgba(201,132,138,0.15)",
};
const font = { heading: "'Cormorant Garamond', serif", cursive: "'Dancing Script', cursive", body: "'DM Sans', sans-serif" };

export default function AdminNavbarLight({ toggleTheme, pageTitle = "Dashboard", pageSubtitle = "Overview" }) {
  const navigate = useNavigate();

  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "1.2rem 4rem",
      background: "rgba(250,246,240,0.95)", backdropFilter: "blur(20px)",
      borderBottom: `1px solid ${C.border}`,
      position: "sticky", top: 0, zIndex: 100, flexShrink: 0
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=DM+Sans:wght@300;400;500;600&family=Dancing+Script:wght@600&display=swap');
        @keyframes pulseR { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
        @keyframes pulseG { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
      `}</style>

      {/* LEFT — Logo */}
      <div
        onClick={() => navigate("/")}
        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
      >
        <div style={{
          fontFamily: font.cursive,
          fontSize: "2.2rem", fontWeight: 600,
          background: `linear-gradient(90deg, ${C.rose}, ${C.gold})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          letterSpacing: "1px", transition: "opacity 0.2s"
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >ShipSense</div>
      </div>

      {/* CENTER */}
      <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <div style={{
          fontFamily: font.heading, fontSize: "1.2rem", fontWeight: 600,
          letterSpacing: "2px", color: C.ink
        }}>{pageTitle}</div>
        <div style={{
          fontSize: "0.52rem", letterSpacing: "3px",
          textTransform: "uppercase", color: C.inkFaint,
          fontFamily: font.body, marginTop: "1px"
        }}>{pageSubtitle}</div>
      </div>

      {/* RIGHT */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

        {/* LIVE */}
        <div style={{
          display: "flex", alignItems: "center", gap: "6px",
          padding: "5px 12px",
          border: `1px solid ${C.borderRose}`,
          borderRadius: "999px",
          background: C.roseLight
        }}>
          <span style={{
            width: "7px", height: "7px", borderRadius: "50%",
            background: C.rose, display: "inline-block",
            animation: "pulseR 2s infinite"
          }} />
          <span style={{
            fontSize: "0.65rem", color: C.rose,
            fontFamily: font.body, fontWeight: 700, letterSpacing: "2px"
          }}>LIVE</span>
        </div>

        {/* DATE */}
        <div style={{
          display: "flex", alignItems: "center", gap: "6px",
          padding: "5px 12px",
          border: `1px solid rgba(196,163,90,0.25)`,
          borderRadius: "6px",
          background: "rgba(196,163,90,0.08)",
          fontSize: "0.68rem", color: C.gold,
          fontFamily: font.body, fontWeight: 500
        }}>
          📅 {new Date().toDateString()}
        </div>

        {/* THEME TOGGLE */}
        <div
          onClick={toggleTheme}
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: "5px 10px",
            border: `1px solid ${C.border}`,
            borderRadius: "6px",
            background: C.bgDeep,
            cursor: "pointer", transition: "all 0.2s"
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.rose; e.currentTarget.style.background = C.roseLight; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bgDeep; }}
        >
          <span style={{ fontSize: "0.9rem" }}>🌙</span>
          <div style={{
            width: "30px", height: "17px", borderRadius: "999px",
            background: "rgba(201,132,138,0.15)",
            border: `1px solid rgba(196,163,90,0.3)`,
            position: "relative"
          }}>
            <div style={{
              position: "absolute", top: "2px", left: "15px",
              width: "13px", height: "13px", borderRadius: "50%",
              background: `linear-gradient(135deg, ${C.rose}, ${C.gold})`
            }} />
          </div>
          <span style={{ fontSize: "0.9rem" }}>☀️</span>
        </div>

        {/* USER CHIP */}
        <div
          onClick={() => navigate("/admin/profile")}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "4px 14px 4px 4px",
            background: C.roseLight,
            border: `1px solid ${C.borderRose}`,
            borderRadius: "999px", cursor: "pointer",
            transition: "all 0.25s"
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,132,138,0.25)"; e.currentTarget.style.borderColor = C.rose; e.currentTarget.style.transform = "scale(1.02)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = C.roseLight; e.currentTarget.style.borderColor = C.borderRose; e.currentTarget.style.transform = "scale(1)"; }}
        >
          <div style={{
            width: "32px", height: "32px", borderRadius: "50%",
            background: `linear-gradient(135deg, ${C.rose}, ${C.gold})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.72rem", fontWeight: 700, color: "#fff",
            fontFamily: font.body, flexShrink: 0,
            boxShadow: `0 2px 8px rgba(201,132,138,0.3)`
          }}>JT</div>
          <span style={{
            fontSize: "0.82rem", fontWeight: 600,
            color: C.inkMid, fontFamily: font.body
          }}>Juii</span>
          <div style={{
            width: "7px", height: "7px", borderRadius: "50%",
            background: "#5aba5a", animation: "pulseG 2s infinite"
          }} />
        </div>
      </div>
    </nav>
  );
}