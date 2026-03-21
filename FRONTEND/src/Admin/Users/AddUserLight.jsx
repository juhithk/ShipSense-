import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbarLight from "../Components/AdminNavbarLight";
import AdminSidebarLight from "../Components/AdminSidebarLight";

const API = "http://localhost:5000/api/users";

const C = {
  bg: "#faf6f0", bgDeep: "#f3ede4", bgCard: "rgba(255,250,245,0.85)",
  rose: "#c9848a", gold: "#c4a35a",
  ink: "#2e2218", inkMid: "#6b5744", inkLight: "#a8917a", inkFaint: "#d6c9bc",
  border: "rgba(196,163,90,0.2)", borderRose: "rgba(201,132,138,0.25)",
  roseLight: "rgba(201,132,138,0.12)", goldLight: "rgba(196,163,90,0.12)",
};
const font = { heading: "'Cormorant Garamond', serif", body: "'DM Sans', sans-serif" };

export default function AddUserLight({ toggleTheme }) {
  const navigate = useNavigate();
  const [hoveredWidth, setHoveredWidth] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    Name: "", Email: "", Password: "", ConfirmPassword: "",
    Role: "customer", Company: "", IsActive: true,
  });

  const handleChange = (e) => {
    const val = e.target.name === "IsActive" ? e.target.value === "true" : e.target.value;
    setFormData({ ...formData, [e.target.name]: val });
  };

  const handleSubmit = async () => {
    if (!formData.Name.trim() || !formData.Email.trim() || !formData.Password) {
      showNotification("error", "Name, Email and Password are required!");
      return;
    }
    if (formData.Name.trim().length < 2) {
      showNotification("error", "Name must be at least 2 characters!");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.Email.trim())) {
      showNotification("error", "Please enter a valid email address!");
      return;
    }
    if (formData.Password.length < 8) {
      showNotification("error", "Password must be at least 8 characters!");
      return;
    }
    if (formData.Password !== formData.ConfirmPassword) {
      showNotification("error", "Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const { ConfirmPassword, ...payload } = formData;
      const cleanPayload = {
        ...payload,
        Name: payload.Name.trim(),
        Email: payload.Email.trim().toLowerCase(),
        Company: payload.Company.trim() || "",
      };
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanPayload),
      });
      const data = await res.json();
      if (data.success) {
        showNotification("success", `${data.data.Name} added successfully!`);
        setFormData({ Name: "", Email: "", Password: "", ConfirmPassword: "", Role: "customer", Company: "", IsActive: true });
      } else {
        if (data.message?.includes("duplicate") || data.message?.includes("E11000")) {
          showNotification("error", `Email "${formData.Email.trim()}" already exists — use a unique email!`);
        } else if (data.message?.includes("validation")) {
          showNotification("error", "Invalid data — please check all fields!");
        } else {
          showNotification("error", data.message || "Failed to create user");
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

  const filled = formData.Name.trim() && formData.Email.trim() && formData.Password && formData.ConfirmPassword;

  const roleColor = (r) => {
    if (r === "admin")    return "#8a6a2a";
    if (r === "supplier") return "#4a7aaa";
    return "#4a8a5a";
  };

  const EyeIcon = ({ show }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      {show ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
    </svg>
  );

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

        .fade-up-aul   { animation: fadeUp 0.5s ease forwards; }
        .fade-up-aul-1 { animation: fadeUp 0.5s 0.05s ease forwards; opacity: 0; }
        .slide-right-aul { animation: slideRight 0.35s ease forwards; }

        .form-input-aul {
          width: 100%; padding: 12px 16px;
          background: ${C.bgDeep}; border: 1px solid ${C.border};
          border-radius: 8px; color: ${C.ink}; font-size: 0.88rem;
          font-family: ${font.body}; box-sizing: border-box; transition: all 0.2s;
        }
        .form-input-aul:focus {
          outline: none; border-color: ${C.borderRose};
          background: ${C.bgCard}; box-shadow: 0 0 0 3px rgba(201,132,138,0.08);
        }
        .form-input-aul::placeholder { color: ${C.inkFaint}; }
        select.form-input-aul option { background: ${C.bgCard}; color: ${C.ink}; }

        .back-btn-aul {
          background: transparent; border: 1px solid ${C.border};
          color: ${C.inkLight}; padding: 10px 20px; border-radius: 8px;
          cursor: pointer; font-size: 0.78rem; font-family: ${font.body}; transition: all 0.2s;
        }
        .back-btn-aul:hover { color: ${C.ink}; border-color: ${C.borderRose}; background: ${C.roseLight}; }

        .submit-ready-aul {
          width: 100%; padding: 15px; background: linear-gradient(135deg,${C.rose},${C.gold});
          border: none; border-radius: 10px; color: #fff; font-size: 0.88rem;
          font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
          cursor: pointer; font-family: ${font.body};
          animation: glowPulse 3s ease infinite; transition: all 0.3s; position: relative; overflow: hidden;
        }
        .submit-ready-aul:hover { transform: translateY(-2px); }
        .submit-ready-aul::after {
          content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent); transition: left 0.5s;
        }
        .submit-ready-aul:hover::after { left: 150%; }

        .submit-disabled-aul {
          width: 100%; padding: 15px; background: ${C.bgDeep};
          border: 1px solid ${C.border}; border-radius: 10px; color: ${C.inkFaint};
          font-size: 0.88rem; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; cursor: not-allowed; font-family: ${font.body};
        }

        .spinner-aul {
          width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.4);
          border-top-color: #fff; border-radius: 50%;
          animation: spin 0.8s linear infinite; display: inline-block;
        }

        .eye-btn-aul { background: none; border: none; cursor: pointer; color: ${C.inkFaint};
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          display: flex; align-items: center; transition: color 0.2s; padding: 0; }
        .eye-btn-aul:hover { color: ${C.inkMid}; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,132,138,0.3); border-radius: 4px; }
      `}</style>

      <AdminNavbarLight toggleTheme={toggleTheme} pageTitle="Add User" pageSubtitle="Create New" />

      <div style={{ display: "flex", flex: 1, overflow: "visible" }}>
        <AdminSidebarLight hoveredWidth={hoveredWidth} setHoveredWidth={setHoveredWidth} />

        <div style={{ marginLeft: `${68 + hoveredWidth}px`, flex: 1, padding: "2rem 2.5rem", transition: "margin-left 0.28s cubic-bezier(0.4,0,0.2,1)", position: "relative" }}>

          <div style={{ position: "fixed", top: "-100px", right: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: `radial-gradient(circle,rgba(201,132,138,0.1),transparent 70%)`, animation: "pulseOrb 6s ease-in-out infinite", pointerEvents: "none", zIndex: 0 }} />
          <div style={{ position: "fixed", bottom: "-150px", left: "5%", width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(circle,rgba(196,163,90,0.07),transparent 70%)`, animation: "pulseOrb 8s ease-in-out infinite reverse", pointerEvents: "none", zIndex: 0 }} />

          {notification && (
            <div className="slide-right-aul" style={{
              position: "fixed", top: "80px", right: "2rem", zIndex: 1000,
              padding: "1rem 1.4rem", borderRadius: "10px",
              background: notification.type === "success"
                ? "linear-gradient(135deg,rgba(90,158,90,0.12),rgba(90,158,90,0.06))"
                : `linear-gradient(135deg,${C.roseLight},rgba(201,132,138,0.06))`,
              border: `1px solid ${notification.type === "success" ? "rgba(90,158,90,0.3)" : C.borderRose}`,
              color: notification.type === "success" ? "#5a9e5a" : C.rose,
              backdropFilter: "blur(16px)", display: "flex", alignItems: "center", gap: "0.8rem", minWidth: "280px", maxWidth: "400px"
            }}>
              <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: notification.type === "success" ? "rgba(90,158,90,0.15)" : C.roseLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", flexShrink: 0 }}>
                {notification.type === "success" ? "✓" : "✕"}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.82rem", marginBottom: "2px", fontFamily: font.body }}>{notification.type === "success" ? "User Created!" : "Error"}</div>
                <div style={{ opacity: 0.8, fontSize: "0.76rem", fontFamily: font.body, lineHeight: 1.4 }}>{notification.message}</div>
              </div>
            </div>
          )}

          {/* PAGE HEADER */}
          <div className="fade-up-aul" style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", position: "relative", zIndex: 1 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <div style={{ width: "24px", height: "2px", background: `linear-gradient(90deg,${C.rose},${C.gold})`, borderRadius: "2px" }} />
                <span style={{ fontSize: "0.6rem", letterSpacing: "4px", textTransform: "uppercase", background: `linear-gradient(90deg,${C.rose},${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 700, fontFamily: font.body }}>Create</span>
              </div>
              <h1 style={{ fontFamily: font.heading, fontSize: "2.8rem", fontWeight: 600, color: C.ink, letterSpacing: "1px", lineHeight: 1, margin: 0 }}>New User</h1>
              <div style={{ fontSize: "0.76rem", color: C.inkLight, marginTop: "6px", fontFamily: font.body }}>Fill in the details — required fields marked with *</div>
            </div>
            <button className="back-btn-aul" onClick={() => navigate("/admin/user-management")}>← Back to Users</button>
          </div>

          <div className="fade-up-aul-1" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "24px", position: "relative", zIndex: 1 }}>

            {/* FORM CARD */}
            <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 24px rgba(201,132,138,0.07)" }}>
              <div style={{ height: "2px", background: `linear-gradient(90deg,${C.rose},${C.gold},${C.rose})`, backgroundSize: "200%", animation: "gradFlow 3s linear infinite" }} />
              <div style={{ padding: "2rem" }}>

                {/* Account Info */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.2rem" }}>
                  <div style={{ width: "3px", height: "16px", background: `linear-gradient(to bottom,${C.rose},${C.gold})`, borderRadius: "2px" }} />
                  <span style={{ fontSize: "0.62rem", letterSpacing: "3px", textTransform: "uppercase", color: C.inkLight, fontWeight: 700, fontFamily: font.body }}>Account Info</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", color: C.inkLight, marginBottom: "6px", display: "block", fontWeight: 600, fontFamily: font.body }}>Name <span style={{ color: C.rose }}>*</span></label>
                    <input className="form-input-aul" type="text" name="Name" placeholder="e.g. Juhi Thakur" value={formData.Name} onChange={handleChange} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", color: C.inkLight, marginBottom: "6px", display: "block", fontWeight: 600, fontFamily: font.body }}>Email <span style={{ color: C.rose }}>*</span></label>
                    <input className="form-input-aul" type="email" name="Email" placeholder="e.g. juhi@shipsense.com" value={formData.Email} onChange={handleChange} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", color: C.inkLight, marginBottom: "6px", display: "block", fontWeight: 600, fontFamily: font.body }}>Password <span style={{ color: C.rose }}>*</span></label>
                    <div style={{ position: "relative" }}>
                      <input className="form-input-aul" type={showPassword ? "text" : "password"} name="Password" placeholder="Min 8 characters" value={formData.Password} onChange={handleChange} style={{ paddingRight: "42px" }} />
                      <button className="eye-btn-aul" type="button" onClick={() => setShowPassword(!showPassword)}><EyeIcon show={showPassword} /></button>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", color: C.inkLight, marginBottom: "6px", display: "block", fontWeight: 600, fontFamily: font.body }}>Confirm Password <span style={{ color: C.rose }}>*</span></label>
                    <div style={{ position: "relative" }}>
                      <input className="form-input-aul" type={showConfirm ? "text" : "password"} name="ConfirmPassword" placeholder="Repeat password" value={formData.ConfirmPassword} onChange={handleChange} style={{ paddingRight: "42px" }} />
                      <button className="eye-btn-aul" type="button" onClick={() => setShowConfirm(!showConfirm)}><EyeIcon show={showConfirm} /></button>
                    </div>
                  </div>
                </div>

                {/* Password match indicator */}
                {formData.Password && formData.ConfirmPassword && (
                  <div style={{ fontSize: "0.72rem", marginBottom: "0.5rem", color: formData.Password === formData.ConfirmPassword ? "#5a9e5a" : C.rose, display: "flex", alignItems: "center", gap: "6px", fontFamily: font.body }}>
                    <span>{formData.Password === formData.ConfirmPassword ? "✓" : "✕"}</span>
                    {formData.Password === formData.ConfirmPassword ? "Passwords match" : "Passwords do not match"}
                  </div>
                )}

                <div style={{ height: "1px", background: `linear-gradient(90deg,transparent,${C.border},transparent)`, margin: "1.5rem 0" }} />

                {/* Role & Company */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.2rem" }}>
                  <div style={{ width: "3px", height: "16px", background: `linear-gradient(to bottom,${C.rose},${C.gold})`, borderRadius: "2px" }} />
                  <span style={{ fontSize: "0.62rem", letterSpacing: "3px", textTransform: "uppercase", color: C.inkLight, fontWeight: 700, fontFamily: font.body }}>Role & Company</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", color: C.inkLight, marginBottom: "6px", display: "block", fontWeight: 600, fontFamily: font.body }}>Role</label>
                    <select className="form-input-aul" name="Role" value={formData.Role} onChange={handleChange}>
                      <option value="customer">Customer</option>
                      <option value="supplier">Supplier</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", color: C.inkLight, marginBottom: "6px", display: "block", fontWeight: 600, fontFamily: font.body }}>Company <span style={{ color: C.inkFaint, fontWeight: 400 }}>(optional)</span></label>
                    <input className="form-input-aul" type="text" name="Company" placeholder="e.g. Juii Exports" value={formData.Company} onChange={handleChange} />
                  </div>
                </div>

                <div style={{ height: "1px", background: `linear-gradient(90deg,transparent,${C.border},transparent)`, margin: "1.5rem 0" }} />

                {/* Status */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.2rem" }}>
                  <div style={{ width: "3px", height: "16px", background: `linear-gradient(to bottom,${C.rose},${C.gold})`, borderRadius: "2px" }} />
                  <span style={{ fontSize: "0.62rem", letterSpacing: "3px", textTransform: "uppercase", color: C.inkLight, fontWeight: 700, fontFamily: font.body }}>Account Status</span>
                </div>

                <div style={{ maxWidth: "200px" }}>
                  <label style={{ fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", color: C.inkLight, marginBottom: "6px", display: "block", fontWeight: 600, fontFamily: font.body }}>Status</label>
                  <select className="form-input-aul" name="IsActive" value={String(formData.IsActive)} onChange={handleChange}>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>

              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Live Preview */}
              <div style={{ background: `linear-gradient(145deg,${C.roseLight},${C.goldLight})`, border: `1px solid ${C.borderRose}`, borderRadius: "14px", overflow: "hidden", boxShadow: "0 4px 20px rgba(201,132,138,0.1)" }}>
                <div style={{ height: "2px", background: `linear-gradient(90deg,${C.rose},${C.gold},${C.rose})`, backgroundSize: "200%", animation: "gradFlow 3s linear infinite" }} />
                <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: C.rose, animation: "pulseOrb 2s ease-in-out infinite" }} />
                  <span style={{ fontSize: "0.62rem", letterSpacing: "3px", textTransform: "uppercase", color: C.inkLight, fontWeight: 700, fontFamily: font.body }}>Live Preview</span>
                </div>
                {/* Avatar */}
                <div style={{ padding: "16px 18px 8px", display: "flex", justifyContent: "center" }}>
                  <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: `linear-gradient(135deg,${C.roseLight},${C.goldLight})`, border: `1px solid ${C.borderRose}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", fontWeight: 700, color: C.rose, fontFamily: font.heading, fontStyle: "italic" }}>
                    {formData.Name?.trim().charAt(0).toUpperCase() || "?"}
                  </div>
                </div>
                <div style={{ padding: "8px 18px 16px" }}>
                  {[
                    { label: "Name",    val: formData.Name },
                    { label: "Email",   val: formData.Email },
                    { label: "Role",    val: formData.Role, color: roleColor(formData.Role) },
                    { label: "Company", val: formData.Company },
                    { label: "Status",  val: formData.IsActive ? "Active" : "Inactive", color: formData.IsActive ? "#5a9e5a" : C.inkFaint },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: i < 4 ? `1px solid ${C.border}` : "none" }}>
                      <span style={{ fontSize: "0.65rem", letterSpacing: "1.5px", textTransform: "uppercase", color: C.inkFaint, fontFamily: font.body }}>{item.label}</span>
                      <span style={{ fontSize: "0.82rem", color: item.val ? (item.color || C.inkMid) : C.inkFaint, fontWeight: item.val ? 500 : 400, fontFamily: font.body, textTransform: item.label === "Role" ? "capitalize" : "none" }}>{item.val || "—"}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button className={filled && !loading ? "submit-ready-aul" : "submit-disabled-aul"} onClick={handleSubmit} disabled={loading || !filled}>
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                    <span className="spinner-aul" /> Creating...
                  </span>
                ) : filled ? "Create User →" : "Fill required fields first"}
              </button>

              {/* Tips */}
              <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "14px", padding: "16px 18px", boxShadow: "0 2px 12px rgba(201,132,138,0.06)" }}>
                <div style={{ fontSize: "0.6rem", letterSpacing: "2px", textTransform: "uppercase", color: C.inkFaint, marginBottom: "12px", fontWeight: 700, fontFamily: font.body }}>Quick Tips</div>
                {[
                  "Email must be unique — duplicates are rejected",
                  "Password is stored securely (hashed)",
                  "Admins have full access to all features",
                  "Suppliers can only manage their own shipments",
                  "Customers have read-only access",
                  "Inactive users cannot log in",
                ].map((tip, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: i < 5 ? "10px" : "0" }}>
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