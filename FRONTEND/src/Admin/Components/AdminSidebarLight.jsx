import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const C = {
  rose: "#c9848a", gold: "#c4a35a",
  ink: "#2e2218", inkLight: "#a8917a",
  border: "rgba(196,163,90,0.2)", borderRose: "rgba(201,132,138,0.25)",
  roseLight: "rgba(201,132,138,0.12)", goldLight: "rgba(196,163,90,0.12)",
};
const font = { body: "'DM Sans', sans-serif", heading: "'Cormorant Garamond', serif" };

const links = [
  {
    label: "Dashboard", path: "/admin",
    icon: (active, hov) => (
      <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1.5" fill={active ? C.rose : hov ? C.gold : "rgba(201,132,138,0.3)"}/>
        <rect x="9" y="1" width="6" height="6" rx="1.5" fill={active ? C.gold : hov ? C.rose : "rgba(201,132,138,0.3)"}/>
        <rect x="1" y="9" width="6" height="6" rx="1.5" fill={active ? C.gold : hov ? C.rose : "rgba(201,132,138,0.3)"}/>
        <rect x="9" y="9" width="6" height="6" rx="1.5" fill={active ? C.rose : hov ? C.gold : "rgba(201,132,138,0.3)"}/>
      </svg>
    )
  },
  {
    label: "Shipments", path: "/admin/shipments",
    icon: (active, hov) => (
      <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
        <defs><linearGradient id="lgs" x1="0" y1="0" x2="16" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor={C.rose}/><stop offset="100%" stopColor={C.gold}/></linearGradient></defs>
        <rect x="2" y="4" width="12" height="9" rx="1.5" stroke={active || hov ? "url(#lgs)" : "rgba(201,132,138,0.35)"} strokeWidth="1.5"/>
        <path d="M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1" stroke={active || hov ? "url(#lgs)" : "rgba(201,132,138,0.35)"} strokeWidth="1.5"/>
        <line x1="5" y1="8" x2="11" y2="8" stroke={active || hov ? "url(#lgs)" : "rgba(201,132,138,0.35)"} strokeWidth="1.2"/>
        <line x1="5" y1="10.5" x2="9" y2="10.5" stroke={active || hov ? "url(#lgs)" : "rgba(201,132,138,0.35)"} strokeWidth="1.2"/>
      </svg>
    )
  },
  {
    label: "Add Shipment", path: "/admin/add-shipment",
    icon: (active, hov) => (
      <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
        <defs><linearGradient id="lga" x1="0" y1="0" x2="16" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor={C.rose}/><stop offset="100%" stopColor={C.gold}/></linearGradient></defs>
        <circle cx="8" cy="8" r="6.5" stroke={active || hov ? "url(#lga)" : "rgba(201,132,138,0.35)"} strokeWidth="1.5"/>
        <line x1="8" y1="5" x2="8" y2="11" stroke={active || hov ? "url(#lga)" : "rgba(201,132,138,0.35)"} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="5" y1="8" x2="11" y2="8" stroke={active || hov ? "url(#lga)" : "rgba(201,132,138,0.35)"} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    label: "Delay Codes", path: "/admin/delay-codes",
    icon: (active, hov) => (
      <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
        <defs><linearGradient id="lgd" x1="0" y1="0" x2="16" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor={C.rose}/><stop offset="100%" stopColor={C.gold}/></linearGradient></defs>
        <path d="M8 2L9.5 6H14L10.5 8.5L12 13L8 10.5L4 13L5.5 8.5L2 6H6.5L8 2Z" stroke={active || hov ? "url(#lgd)" : "rgba(201,132,138,0.35)"} strokeWidth="1.3" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    label: "User Management", path: "/admin/users",
    icon: (active, hov) => (
      <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
        <defs><linearGradient id="lgu" x1="0" y1="0" x2="16" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor={C.rose}/><stop offset="100%" stopColor={C.gold}/></linearGradient></defs>
        <circle cx="6" cy="5" r="2.5" stroke={active || hov ? "url(#lgu)" : "rgba(201,132,138,0.35)"} strokeWidth="1.4"/>
        <circle cx="11" cy="5" r="2" stroke={active || hov ? "url(#lgu)" : "rgba(201,132,138,0.35)"} strokeWidth="1.3"/>
        <path d="M1 13c0-2.8 2.2-4 5-4s5 1.2 5 4" stroke={active || hov ? "url(#lgu)" : "rgba(201,132,138,0.35)"} strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M12 9c1.5.3 3 1.2 3 3" stroke={active || hov ? "url(#lgu)" : "rgba(201,132,138,0.35)"} strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    label: "Reports", path: "/admin/reports",
    icon: (active, hov) => (
      <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
        <defs><linearGradient id="lgr" x1="0" y1="0" x2="16" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor={C.rose}/><stop offset="100%" stopColor={C.gold}/></linearGradient></defs>
        <polyline points="2,11 5,7 8,9 11,4 14,6" stroke={active || hov ? "url(#lgr)" : "rgba(201,132,138,0.35)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
];

export default function AdminSidebarLight({ hoveredWidth, setHoveredWidth }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{
      width: "68px", minWidth: "68px",
      background: "transparent",
      display: "flex", flexDirection: "column",
      alignItems: "center",
      position: "fixed", top: "58px", left: 0,
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
        .fade-label-l { animation: fadeLabel 0.2s ease forwards; }
        .icon-pop-l { animation: iconPop 0.3s ease; }
      `}</style>

      <nav
        onMouseLeave={() => { setHovered(null); setHoveredWidth(0); }}
        style={{
          display: "flex", flexDirection: "column",
          gap: "8px", padding: "0 12px",
          width: "100%", boxSizing: "border-box",
          flex: 1, justifyContent: "center",
          alignItems: "center", overflow: "visible"
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
                    ? `1px solid rgba(196,163,90,0.5)`
                    : isHov
                    ? `1px solid ${C.borderRose}`
                    : `1px solid rgba(201,132,138,0.2)`,
                  background: isActive
                    ? `linear-gradient(135deg, rgba(201,132,138,0.2), rgba(196,163,90,0.12))`
                    : isHov
                    ? `linear-gradient(135deg, rgba(201,132,138,0.12), rgba(196,163,90,0.06))`
                    : "rgba(201,132,138,0.06)",
                  boxShadow: isActive
                    ? "0 2px 16px rgba(201,132,138,0.2)"
                    : isHov
                    ? "0 2px 12px rgba(201,132,138,0.15)"
                    : "none"
                }}
              >
                <div className={isHov ? "icon-pop-l" : ""} style={{
                  width: "44px", minWidth: "44px", height: "44px",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", flexShrink: 0
                }}>
                  {link.icon(isActive, isHov)}
                </div>
                {isHov && (
                  <span className="fade-label-l" style={{
                    fontSize: "0.82rem", fontFamily: font.body,
                    fontWeight: 500, letterSpacing: "0.5px",
                    whiteSpace: "nowrap", paddingRight: "16px",
                    background: `linear-gradient(135deg, ${C.ink}, ${C.inkLight})`,
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
                ? `1px solid rgba(201,132,138,0.5)`
                : `1px solid rgba(201,132,138,0.2)`,
              background: hovered === "logout"
                ? "rgba(201,132,138,0.15)"
                : "rgba(201,132,138,0.06)",
              boxShadow: hovered === "logout" ? "0 2px 12px rgba(201,132,138,0.2)" : "none"
            }}
          >
            <div style={{ width: "44px", minWidth: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
                <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3" stroke={hovered === "logout" ? C.rose : "rgba(201,132,138,0.4)"} strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M10 11l3-3-3-3" stroke={hovered === "logout" ? C.rose : "rgba(201,132,138,0.4)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="13" y1="8" x2="6" y2="8" stroke={hovered === "logout" ? C.rose : "rgba(201,132,138,0.4)"} strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            {hovered === "logout" && (
              <span className="fade-label-l" style={{
                fontSize: "0.82rem", color: C.rose,
                fontFamily: font.body, fontWeight: 500,
                whiteSpace: "nowrap", paddingRight: "16px"
              }}>Logout</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}