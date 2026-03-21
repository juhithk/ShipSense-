import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api/users";

export default function AdminNavbarDark({ toggleTheme, pageTitle = "DASHBOARD", pageSubtitle = "OVERVIEW" }) {
  const navigate = useNavigate();
  const [spelling, setSpelling] = useState(false);
  const [displayText, setDisplayText] = useState("SHIPSENSE");
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileUser, setProfileUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const full = "SHIPSENSE";
    const interval = setInterval(() => {
      setSpelling(true);
      let i = 0;
      setDisplayText("");
      const spell = setInterval(() => {
        i++;
        setDisplayText(full.slice(0, i));
        if (i >= full.length) {
          clearInterval(spell);
          setTimeout(() => setSpelling(false), 800);
        }
      }, 80);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const openProfile = async () => {
    try {
      const res = await fetch(`${API}?search=Arnab Roy`);
      const data = await res.json();
      const user = data.data?.find(u => u.Name === "Arnab Roy" && u.Role === "admin");
      if (user) {
        setProfileUser(user);
        setEditData({ ...user });
        setIsEditing(false);
        setProfileOpen(true);
      }
    } catch (err) {
      console.error("Failed to fetch profile", err);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API}/${profileUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      const data = await res.json();
      if (data.success) {
        setProfileUser(data.data);
        setIsEditing(false);
        showNotification("success", "Profile updated successfully!");
      }
    } catch (err) {
      showNotification("error", "Failed to update profile");
    }
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3500);
  };

  const roleConfig = (role) => {
    switch (role) {
      case "admin":    return { color: "#f0a030", border: "rgba(240,160,48,0.3)",  bg: "rgba(240,160,48,0.08)"  };
      case "supplier": return { color: "#60a5fa", border: "rgba(96,165,250,0.3)",  bg: "rgba(96,165,250,0.08)"  };
      case "customer": return { color: "#4ade80", border: "rgba(74,222,128,0.3)",  bg: "rgba(74,222,128,0.08)"  };
      default:         return { color: "#888",    border: "rgba(136,136,136,0.3)", bg: "rgba(136,136,136,0.08)" };
    }
  };

  const roleIcon = (role) => {
    switch (role) {
      case "admin":    return "👑";
      case "supplier": return "🚢";
      case "customer": return "📦";
      default:         return "👤";
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap');

        @keyframes pulseR       { 0%,100%{opacity:1;box-shadow:0 0 6px rgba(230,50,50,0.4);} 50%{opacity:0.4;box-shadow:none;} }
        @keyframes pulseG       { 0%,100%{opacity:1;box-shadow:0 0 6px rgba(74,186,74,0.4);} 50%{opacity:0.4;box-shadow:none;} }
        @keyframes gradFlow     { 0%{background-position:0%} 100%{background-position:200%} }
        @keyframes logoSpin     { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes logoPulse    { 0%,100%{box-shadow:0 0 10px rgba(230,50,50,0.4),0 0 20px rgba(240,160,48,0.15)} 50%{box-shadow:0 0 18px rgba(230,50,50,0.6),0 0 36px rgba(240,160,48,0.25)} }
        @keyframes textShift    { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes cursorBlink  { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes slideUp      { from{opacity:0;transform:translateY(40px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes slideRight   { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }

        @keyframes rootTextShift    { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes rootBadgeShimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes rootAvatarSpin   { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes rootAvatarPulse  { 0%,100%{box-shadow:0 0 10px rgba(240,160,48,0.5),0 0 20px rgba(230,50,50,0.2)} 50%{box-shadow:0 0 22px rgba(240,160,48,0.8),0 0 44px rgba(230,50,50,0.4)} }

        .logo-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.6rem; letter-spacing: 4px;
          background: linear-gradient(90deg, #e63232, #f0a030, #fff, #f0a030, #e63232);
          background-size: 300% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          animation: textShift 12s ease infinite;
          transition: opacity 0.2s;
        }
        .logo-text:hover { opacity: 0.8; }

        .cursor {
          display: inline-block; width: 2px; height: 1.2rem;
          background: #f0a030; margin-left: 2px; vertical-align: middle;
          animation: cursorBlink 0.6s ease infinite;
        }

        .page-title {
          font-family: 'Bebas Neue', sans-serif; font-size: 1.1rem; letter-spacing: 4px;
          background: linear-gradient(90deg, #e63232, #f0a030, #e63232);
          background-size: 200%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          animation: gradFlow 3s linear infinite;
        }
        .page-subtitle {
          font-size: 0.52rem; letter-spacing: 3px; text-transform: uppercase;
          color: #a89888; font-family: 'Inter', sans-serif; margin-top: 2px; font-weight: 600;
        }

        .root-avatar-wrapper-lg {
          position: relative; width: 48px; height: 48px; flex-shrink: 0;
        }
        .root-avatar-wrapper-lg::before {
          content: ''; position: absolute; inset: -2px; border-radius: 50%;
          background: conic-gradient(#f0a030, #e63232, #ffffff, #e63232, #f0a030);
          animation: rootAvatarSpin 2s linear infinite; z-index: 0;
        }
        .root-avatar-inner-lg {
          position: absolute; inset: 2px; border-radius: 50%;
          background: linear-gradient(135deg, #2a1a08, #1a0808);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem; font-weight: 800; color: #f0a030;
          font-family: 'Bebas Neue', sans-serif; z-index: 1;
          animation: rootAvatarPulse 2s ease-in-out infinite;
        }

        .root-name-lg {
          font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem; letter-spacing: 2px;
          background: linear-gradient(90deg, #f0a030, #fff, #e63232, #f0a030, #fff, #e63232);
          background-size: 300% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          animation: rootTextShift 3s ease infinite;
        }
        .root-badge {
          font-size: 0.55rem; padding: 2px 7px; border-radius: 4px;
          background: linear-gradient(90deg, rgba(240,160,48,0.35), rgba(230,50,50,0.25), rgba(240,160,48,0.35));
          background-size: 200% auto;
          border: 1px solid rgba(240,160,48,0.7);
          color: #f0a030; font-weight: 800; letter-spacing: 2px;
          font-family: 'Inter', sans-serif; text-transform: uppercase;
          animation: rootBadgeShimmer 2s linear infinite;
          box-shadow: 0 0 8px rgba(240,160,48,0.3), 0 0 16px rgba(230,50,50,0.1);
        }

        .slide-up-modal-nav { animation: slideUp 0.35s cubic-bezier(0.34,1.2,0.64,1) forwards; }
        .slide-right-nav    { animation: slideRight 0.35s ease forwards; }

        .action-btn-nav { transition: all 0.25s cubic-bezier(0.34,1.2,0.64,1); }
        .action-btn-nav:hover { transform: translateY(-2px); }

        input:focus, select:focus { outline: none !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(230,50,50,0.25); border-radius: 4px; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.2rem 4rem",
        background: "rgba(7,6,10,0.98)",
        borderBottom: "1px solid rgba(230,50,50,0.12)",
        position: "sticky", top: 0, zIndex: 100, flexShrink: 0
      }}>
        {/* LEFT — Logo */}
        <div onClick={() => navigate("/admin")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
          <div className="logo-text">
            {displayText}
            {spelling && <span className="cursor" />}
          </div>
        </div>

        {/* CENTER — Page title */}
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
          <div className="page-title">{pageTitle}</div>
          <div className="page-subtitle">{pageSubtitle}</div>
        </div>

        {/* RIGHT */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

          {/* LIVE */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "5px 12px", border: "1px solid rgba(230,50,50,0.2)", borderRadius: "999px", background: "rgba(230,50,50,0.05)" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#e63232", display: "inline-block", animation: "pulseR 2s infinite" }} />
            <span style={{ fontSize: "0.65rem", color: "#e63232", fontFamily: "'Inter',sans-serif", fontWeight: 700, letterSpacing: "2px" }}>LIVE</span>
          </div>

          {/* DATE */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "5px 12px", border: "1px solid rgba(240,160,48,0.15)", borderRadius: "6px", background: "rgba(240,160,48,0.04)", fontSize: "0.68rem", color: "#b89050", fontFamily: "'Inter',sans-serif", fontWeight: 500 }}>
            📅 {new Date().toDateString()}
          </div>

          {/* THEME TOGGLE */}
          <div onClick={toggleTheme}
            style={{ display: "flex", alignItems: "center", gap: "6px", padding: "5px 10px", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "6px", background: "rgba(255,255,255,0.02)", cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(230,50,50,0.3)"; e.currentTarget.style.background = "rgba(230,50,50,0.05)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
          >
            <span style={{ fontSize: "0.9rem" }}>🌙</span>
            <div style={{ width: "30px", height: "17px", borderRadius: "999px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", position: "relative" }}>
              <div style={{ position: "absolute", top: "2px", left: "2px", width: "13px", height: "13px", borderRadius: "50%", background: "linear-gradient(135deg,#e63232,#f0a030)", transition: "transform 0.3s" }} />
            </div>
            <span style={{ fontSize: "0.9rem" }}>☀️</span>
          </div>

          {/* USER CHIP */}
          <div onClick={openProfile}
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 14px 4px 4px", background: "rgba(230,50,50,0.07)", border: "1px solid rgba(230,50,50,0.2)", borderRadius: "999px", cursor: "pointer", transition: "all 0.25s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(230,50,50,0.14)"; e.currentTarget.style.borderColor = "rgba(230,50,50,0.4)"; e.currentTarget.style.transform = "scale(1.02)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(230,50,50,0.07)"; e.currentTarget.style.borderColor = "rgba(230,50,50,0.2)"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg,#e63232,#f0a030)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 700, color: "#fff", fontFamily: "'Inter',sans-serif", flexShrink: 0, boxShadow: "0 2px 8px rgba(230,50,50,0.3)" }}>AR</div>
            <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#e0d8d0", fontFamily: "'Inter',sans-serif" }}>Arnab</span>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4aba4a", animation: "pulseG 2s infinite" }} />
          </div>
        </div>
      </nav>

      {/* NOTIFICATION */}
      {notification && (
        <div className="slide-right-nav" style={{
          position: "fixed", top: "80px", right: "2rem", zIndex: 1001,
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

      {/* PROFILE MODAL */}
      {profileOpen && profileUser && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}
          onClick={e => { if (e.target === e.currentTarget) { setProfileOpen(false); setIsEditing(false); } }}
        >
          <div className="slide-up-modal-nav" style={{
            background: "linear-gradient(145deg,#0f0d13,#0a0810)",
            border: "1px solid rgba(240,160,48,0.35)",
            borderRadius: "16px", width: "520px", maxHeight: "88vh", overflowY: "auto",
            boxShadow: "0 30px 100px rgba(0,0,0,0.7), 0 0 60px rgba(240,160,48,0.08)"
          }}>
            <div style={{ height: "2px", background: "linear-gradient(90deg,#f0a030,#e63232,#fff,#e63232,#f0a030)", backgroundSize: "200%", animation: "gradFlow 3s linear infinite", borderRadius: "16px 16px 0 0" }} />

            {/* HEADER */}
            <div style={{ padding: "1.6rem 2rem", borderBottom: "1px solid rgba(240,160,48,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div className="root-avatar-wrapper-lg">
                  <div className="root-avatar-inner-lg">
                    {profileUser.Name?.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "0.55rem", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "4px", fontFamily: "'Inter',sans-serif", fontWeight: 600, color: "#f0a030" }}>
                    👑 Root Administrator
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span className="root-name-lg">{profileUser.Name}</span>
                    <span className="root-badge">ROOT</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {(() => { const rc = roleConfig(profileUser.Role); return (
                  <span style={{ fontSize: "0.72rem", padding: "5px 12px", borderRadius: "999px", fontWeight: 600, fontFamily: "'Inter',sans-serif", background: rc.bg, color: rc.color, border: `1px solid ${rc.border}`, display: "inline-flex", alignItems: "center", gap: "5px", textTransform: "capitalize" }}>
                    {roleIcon(profileUser.Role)} {profileUser.Role}
                  </span>
                ); })()}
                <button onClick={() => { setProfileOpen(false); setIsEditing(false); }}
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#7a6a60", width: "34px", height: "34px", borderRadius: "50%", cursor: "pointer", fontSize: "0.9rem", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(248,113,113,0.12)"; e.currentTarget.style.color = "#f87171"; e.currentTarget.style.borderColor = "rgba(248,113,113,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#7a6a60"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                >✕</button>
              </div>
            </div>

            <div style={{ padding: "2rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.5rem" }}>
                {[
                  { label: "Name",    key: "Name",     type: "text"   },
                  { label: "Email",   key: "Email",    type: "email"  },
                  { label: "Company", key: "Company",  type: "text"   },
                  { label: "Role",    key: "Role",     type: "select", options: ["admin","supplier","customer"] },
                  { label: "Status",  key: "IsActive", type: "select", options: ["true","false"] },
                ].map(field => (
                  <div key={field.key}>
                    <div style={{ fontSize: "0.6rem", letterSpacing: "2px", textTransform: "uppercase", color: "#6a5a50", marginBottom: "6px", fontFamily: "'Inter',sans-serif", fontWeight: 600 }}>{field.label}</div>
                    {isEditing ? (
                      field.type === "select" ? (
                        <select value={String(editData[field.key]) || ""} onChange={e => setEditData({ ...editData, [field.key]: field.key === "IsActive" ? e.target.value === "true" : e.target.value })}
                          style={{ width: "100%", padding: "10px 12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#e0d8d0", fontSize: "0.84rem", fontFamily: "'Inter',sans-serif", boxSizing: "border-box" }}>
                          {field.options.map(o => <option key={o} value={o} style={{ background: "#0f0d13" }}>{field.key === "IsActive" ? (o === "true" ? "Active" : "Inactive") : o}</option>)}
                        </select>
                      ) : (
                        <input type={field.type} value={editData[field.key] || ""} onChange={e => setEditData({ ...editData, [field.key]: e.target.value })}
                          style={{ width: "100%", padding: "10px 12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#e0d8d0", fontSize: "0.84rem", fontFamily: "'Inter',sans-serif", boxSizing: "border-box" }} />
                      )
                    ) : (
                      <div style={{ fontSize: "0.9rem", color: "#d4c4b8", fontFamily: "'Inter',sans-serif", padding: "8px 12px", background: "rgba(255,255,255,0.025)", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.05)" }}>
                        {field.key === "IsActive" ? (profileUser[field.key] ? "Active" : "Inactive") : profileUser[field.key] || "—"}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* TIMESTAMPS */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", padding: "1rem 1.2rem", background: "rgba(255,255,255,0.02)", borderRadius: "8px", marginBottom: "1.5rem", border: "1px solid rgba(255,255,255,0.04)" }}>
                {[{ label: "Joined", val: profileUser.createdAt }, { label: "Last Updated", val: profileUser.updatedAt }].map((t, i) => (
                  <div key={i}>
                    <div style={{ fontSize: "0.58rem", letterSpacing: "2px", textTransform: "uppercase", color: "#5a4a45", marginBottom: "4px", fontFamily: "'Inter',sans-serif", fontWeight: 600 }}>{t.label}</div>
                    <div style={{ fontSize: "0.78rem", color: "#8a7a70", fontFamily: "'Inter',sans-serif" }}>{new Date(t.val).toLocaleString()}</div>
                  </div>
                ))}
              </div>

              {/* ACTIONS — Edit only, no Delete/Deactivate */}
              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                {isEditing ? (
                  <>
                    <button onClick={() => setIsEditing(false)} className="action-btn-nav"
                      style={{ padding: "10px 20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#a89888", borderRadius: "8px", cursor: "pointer", fontSize: "0.82rem", fontFamily: "'Inter',sans-serif" }}
                      onMouseEnter={e => { e.currentTarget.style.color = "#e0d8d0"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "#a89888"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                    >Cancel</button>
                    <button onClick={handleUpdate} className="action-btn-nav"
                      style={{ padding: "10px 24px", background: "linear-gradient(135deg,#e63232,#f0a030)", border: "none", color: "#fff", borderRadius: "8px", cursor: "pointer", fontSize: "0.82rem", fontWeight: 700, fontFamily: "'Inter',sans-serif", boxShadow: "0 4px 20px rgba(230,50,50,0.25)" }}>Save Changes</button>
                  </>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="action-btn-nav"
                    style={{ padding: "10px 24px", background: "linear-gradient(135deg,#e63232,#f0a030)", border: "none", color: "#fff", borderRadius: "8px", cursor: "pointer", fontSize: "0.82rem", fontWeight: 700, fontFamily: "'Inter',sans-serif", boxShadow: "0 4px 20px rgba(230,50,50,0.25)" }}>Edit Profile</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}