import { useNavigate } from "react-router-dom";

export default function AdminNavbarDark({ toggleTheme, pageTitle = "DASHBOARD", pageSubtitle = "OVERVIEW" }) {
  const navigate = useNavigate();

  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "1.2rem 4rem",
      background: "rgba(7,6,10,0.98)",
      borderBottom: "1px solid rgba(230,50,50,0.12)",
      position: "sticky", top: 0, zIndex: 100, flexShrink: 0
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap');
        @keyframes pulseR { 0%,100%{opacity:1;box-shadow:0 0 6px rgba(230,50,50,0.4);} 50%{opacity:0.4;box-shadow:none;} }
        @keyframes pulseG { 0%,100%{opacity:1;box-shadow:0 0 6px rgba(74,186,74,0.4);} 50%{opacity:0.4;box-shadow:none;} }
      `}</style>

      {/* LEFT — Logo */}
      <div
        onClick={() => navigate("/")}
        style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
      >
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "1.6rem", letterSpacing: "4px",
          background: "linear-gradient(90deg, #e63232, #f0a030)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          transition: "opacity 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >SHIPSENSE</div>
      </div>

      {/* CENTER */}
      <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem",
          letterSpacing: "4px",
          background: "linear-gradient(135deg, #ffffff, #c8b0a8)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
        }}>{pageTitle}</div>
        <div style={{
          fontSize: "0.52rem", letterSpacing: "3px",
          textTransform: "uppercase", color: "#6a3030",
          fontFamily: "'Inter', sans-serif", marginTop: "1px"
        }}>{pageSubtitle}</div>
      </div>

      {/* RIGHT */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

        {/* LIVE */}
        <div style={{
          display: "flex", alignItems: "center", gap: "6px",
          padding: "5px 12px",
          border: "1px solid rgba(230,50,50,0.2)",
          borderRadius: "999px",
          background: "rgba(230,50,50,0.05)"
        }}>
          <span style={{
            width: "7px", height: "7px", borderRadius: "50%",
            background: "#e63232", display: "inline-block",
            animation: "pulseR 2s infinite"
          }} />
          <span style={{
            fontSize: "0.65rem", color: "#e63232",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700, letterSpacing: "2px"
          }}>LIVE</span>
        </div>

        {/* DATE */}
        <div style={{
          display: "flex", alignItems: "center", gap: "6px",
          padding: "5px 12px",
          border: "1px solid rgba(240,160,48,0.15)",
          borderRadius: "6px",
          background: "rgba(240,160,48,0.04)",
          fontSize: "0.68rem", color: "#b89050",
          fontFamily: "'Inter', sans-serif", fontWeight: 500
        }}>
          📅 {new Date().toDateString()}
        </div>

        {/* THEME TOGGLE */}
        <div
          onClick={toggleTheme}
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: "5px 10px",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "6px",
            background: "rgba(255,255,255,0.02)",
            cursor: "pointer", transition: "all 0.2s"
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(230,50,50,0.3)"; e.currentTarget.style.background = "rgba(230,50,50,0.05)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
        >
          <span style={{ fontSize: "0.9rem" }}>🌙</span>
          <div style={{
            width: "30px", height: "17px", borderRadius: "999px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.1)",
            position: "relative"
          }}>
            <div style={{
              position: "absolute", top: "2px", left: "2px",
              width: "13px", height: "13px", borderRadius: "50%",
              background: "linear-gradient(135deg, #e63232, #f0a030)",
              transition: "transform 0.3s"
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
            background: "rgba(230,50,50,0.07)",
            border: "1px solid rgba(230,50,50,0.2)",
            borderRadius: "999px", cursor: "pointer",
            transition: "all 0.25s"
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(230,50,50,0.14)"; e.currentTarget.style.borderColor = "rgba(230,50,50,0.4)"; e.currentTarget.style.transform = "scale(1.02)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(230,50,50,0.07)"; e.currentTarget.style.borderColor = "rgba(230,50,50,0.2)"; e.currentTarget.style.transform = "scale(1)"; }}
        >
          <div style={{
            width: "32px", height: "32px", borderRadius: "50%",
            background: "linear-gradient(135deg, #e63232, #f0a030)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.72rem", fontWeight: 700, color: "#fff",
            fontFamily: "'Inter', sans-serif", flexShrink: 0,
            boxShadow: "0 2px 8px rgba(230,50,50,0.3)"
          }}>AR</div>
          <span style={{
            fontSize: "0.82rem", fontWeight: 600,
            color: "#e0d8d0", fontFamily: "'Inter', sans-serif"
          }}>Arnab</span>
          <div style={{
            width: "7px", height: "7px", borderRadius: "50%",
            background: "#4aba4a",
            animation: "pulseG 2s infinite"
          }} />
        </div>
      </div>
    </nav>
  );
}