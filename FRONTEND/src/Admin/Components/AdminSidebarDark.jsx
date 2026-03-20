import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const links = [
  {
    label: "Dashboard", path: "/admin",
    icon: (active, hov) => (
      <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1.5" fill={active ? "#e63232" : hov ? "#f0a030" : "#6a2828"}/>
        <rect x="9" y="1" width="6" height="6" rx="1.5" fill={active ? "#f0a030" : hov ? "#e63232" : "#6a2828"}/>
        <rect x="1" y="9" width="6" height="6" rx="1.5" fill={active ? "#f0a030" : hov ? "#e63232" : "#6a2828"}/>
        <rect x="9" y="9" width="6" height="6" rx="1.5" fill={active ? "#e63232" : hov ? "#f0a030" : "#6a2828"}/>
      </svg>
    )
  },
  {
    label: "Shipments", path: "/admin/shipments",
    icon: (active, hov) => (
      <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
        <defs><linearGradient id="gs" x1="0" y1="0" x2="16" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#e63232"/><stop offset="100%" stopColor="#f0a030"/></linearGradient></defs>
        <rect x="2" y="4" width="12" height="9" rx="1.5" stroke={active || hov ? "url(#gs)" : "#6a2828"} strokeWidth="1.5"/>
        <path d="M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1" stroke={active || hov ? "url(#gs)" : "#6a2828"} strokeWidth="1.5"/>
        <line x1="5" y1="8" x2="11" y2="8" stroke={active || hov ? "url(#gs)" : "#6a2828"} strokeWidth="1.2"/>
        <line x1="5" y1="10.5" x2="9" y2="10.5" stroke={active || hov ? "url(#gs)" : "#6a2828"} strokeWidth="1.2"/>
      </svg>
    )
  },
  {
    label: "Add Shipment", path: "/admin/add-shipment",
    icon: (active, hov) => (
      <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
        <defs><linearGradient id="ga" x1="0" y1="0" x2="16" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#e63232"/><stop offset="100%" stopColor="#f0a030"/></linearGradient></defs>
        <circle cx="8" cy="8" r="6.5" stroke={active || hov ? "url(#ga)" : "#6a2828"} strokeWidth="1.5"/>
        <line x1="8" y1="5" x2="8" y2="11" stroke={active || hov ? "url(#ga)" : "#6a2828"} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="5" y1="8" x2="11" y2="8" stroke={active || hov ? "url(#ga)" : "#6a2828"} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    label: "Delay Codes", path: "/admin/delay-codes",
    icon: (active, hov) => (
      <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
        <defs><linearGradient id="gd" x1="0" y1="0" x2="16" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#e63232"/><stop offset="100%" stopColor="#f0a030"/></linearGradient></defs>
        <path d="M8 2L9.5 6H14L10.5 8.5L12 13L8 10.5L4 13L5.5 8.5L2 6H6.5L8 2Z" stroke={active || hov ? "url(#gd)" : "#6a2828"} strokeWidth="1.3" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    label: "User Management", path: "/admin/users",
    icon: (active, hov) => (
      <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
        <defs><linearGradient id="gu" x1="0" y1="0" x2="16" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#e63232"/><stop offset="100%" stopColor="#f0a030"/></linearGradient></defs>
        <circle cx="6" cy="5" r="2.5" stroke={active || hov ? "url(#gu)" : "#6a2828"} strokeWidth="1.4"/>
        <circle cx="11" cy="5" r="2" stroke={active || hov ? "url(#gu)" : "#6a2828"} strokeWidth="1.3"/>
        <path d="M1 13c0-2.8 2.2-4 5-4s5 1.2 5 4" stroke={active || hov ? "url(#gu)" : "#6a2828"} strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M12 9c1.5.3 3 1.2 3 3" stroke={active || hov ? "url(#gu)" : "#6a2828"} strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    label: "Reports", path: "/admin/reports",
    icon: (active, hov) => (
      <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
        <defs><linearGradient id="gr" x1="0" y1="0" x2="16" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#e63232"/><stop offset="100%" stopColor="#f0a030"/></linearGradient></defs>
        <polyline points="2,11 5,7 8,9 11,4 14,6" stroke={active || hov ? "url(#gr)" : "#6a2828"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
];

export default function AdminSidebarDark({ hoveredWidth, setHoveredWidth }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{
      width: "68px", minWidth: "68px",
      background: "transparent",
      display: "flex", flexDirection: "column",
      alignItems: "center",
      position: "fixed", top: "70px", left: 0,
      bottom: 0, zIndex: 50,
      paddingTop: "12px",
      overflow: "visible"
    }}>

      <style>{`
        @keyframes fadeLabel {
          from { opacity: 0; transform: translateX(8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes iconPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .fade-label { animation: fadeLabel 0.2s ease forwards; }
        .icon-pop { animation: iconPop 0.3s ease; }
      `}</style>

      {/* NAV */}
      <nav
        onMouseLeave={() => { setHovered(null); setHoveredWidth(0); }}
        style={{
          display: "flex", flexDirection: "column",
          gap: "8px", padding: "0 12px",
          width: "100%", boxSizing: "border-box",
          flex: 1, justifyContent: "center",
          alignItems: "center",
          overflow: "visible"
        }}
      >
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          const isHov = hovered === link.label;

          return (
            <div key={link.label} style={{ width: "44px", height: "44px", position: "relative", flexShrink: 0 }}>
              <div
                onClick={() => navigate(link.path)}
                onMouseEnter={() => { setHovered(link.label); setHoveredWidth(126); }}
                style={{
                  display: "flex", alignItems: "center",
                  height: "44px", borderRadius: "999px",
                  cursor: "pointer",
                  width: isHov ? "170px" : "44px",
                  position: "absolute", left: 0, top: 0,
                  zIndex: 200, overflow: "hidden",
                  transition: "width 0.35s cubic-bezier(0.34,1.4,0.64,1), background 0.25s, border-color 0.25s, box-shadow 0.35s",
                  border: isActive
                    ? "1px solid rgba(240,160,48,0.6)"
                    : isHov
                    ? "1px solid rgba(230,50,50,0.5)"
                    : "1px solid rgba(150,40,40,0.25)",
                  background: isActive
                    ? "linear-gradient(135deg, rgba(230,50,50,0.25), rgba(240,160,48,0.15))"
                    : isHov
                    ? "linear-gradient(135deg, rgba(230,50,50,0.15), rgba(240,160,48,0.08))"
                    : "rgba(150,40,40,0.08)",
                  boxShadow: isActive
                    ? "0 0 20px rgba(230,50,50,0.3), 0 2px 8px rgba(0,0,0,0.3)"
                    : isHov
                    ? "0 0 16px rgba(230,50,50,0.25), 0 2px 8px rgba(0,0,0,0.2)"
                    : "none"
                }}
              >
                <div className={isHov ? "icon-pop" : ""} style={{
                  width: "44px", minWidth: "44px", height: "44px",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", flexShrink: 0
                }}>
                  {link.icon(isActive, isHov)}
                </div>
                {isHov && (
                  <span className="fade-label" style={{
                    fontSize: "0.82rem", fontFamily: "'Inter', sans-serif",
                    fontWeight: 500, letterSpacing: "0.5px",
                    whiteSpace: "nowrap", paddingRight: "16px",
                    background: "linear-gradient(135deg, #ffffff, #f0c080)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                  }}>{link.label}</span>
                )}
              </div>
            </div>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div style={{ padding: "0 12px 16px", width: "100%", display: "flex", justifyContent: "center", overflow: "visible" }}>
        <div style={{ width: "44px", height: "44px", position: "relative" }}>
          <div
            onClick={() => { localStorage.clear(); navigate("/"); }}
            onMouseEnter={() => setHovered("logout")}
            onMouseLeave={() => setHovered(null)}
            title="Logout"
            style={{
              display: "flex", alignItems: "center",
              height: "44px", borderRadius: "999px",
              cursor: "pointer",
              width: hovered === "logout" ? "130px" : "44px",
              position: "absolute", left: 0, top: 0,
              zIndex: 200, overflow: "hidden",
              transition: "width 0.35s cubic-bezier(0.34,1.4,0.64,1), background 0.25s, box-shadow 0.35s",
              border: hovered === "logout"
                ? "1px solid rgba(220,40,40,0.5)"
                : "1px solid rgba(160,20,20,0.25)",
              background: hovered === "logout"
                ? "rgba(180,20,20,0.18)"
                : "rgba(150,20,20,0.08)",
              boxShadow: hovered === "logout"
                ? "0 0 16px rgba(200,20,20,0.3)"
                : "none"
            }}
          >
            <div style={{ width: "44px", minWidth: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
                <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3" stroke={hovered === "logout" ? "#e63232" : "#7a1818"} strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M10 11l3-3-3-3" stroke={hovered === "logout" ? "#e63232" : "#7a1818"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="13" y1="8" x2="6" y2="8" stroke={hovered === "logout" ? "#e63232" : "#7a1818"} strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            {hovered === "logout" && (
              <span className="fade-label" style={{
                fontSize: "0.82rem", color: "#e63232",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500, whiteSpace: "nowrap", paddingRight: "16px"
              }}>Logout</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}