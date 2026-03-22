import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ContactPageDark({ toggleTheme }) {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const hover = { transition: "transform 0.2s, box-shadow 0.2s" };

  const navLinks = [
    { label: "About", path: "/about" },
    { label: "Partners", path: "/partners" },
    { label: "Features", path: "/features" },
    { label: "Team", path: "/team" },
    { label: "Contact", path: "/contact" },
  ];

  const quickInfo = [
    { icon: "📧", label: "Juhi Thakur", value: "juhithakur@shipsense.dev" },
    { icon: "📧", label: "Arnab Roy", value: "arnabroy@shipsense.dev" },
    { icon: "📍", label: "Location", value: "Future Institute of Technology, Kolkata" },
    { icon: "🐙", label: "GitHub", value: "github.com/juhithk/ShipSense-" },
  ];

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.9rem 1.2rem",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "4px",
    fontSize: "0.85rem",
    color: "#e0d8d0",
    fontFamily: "'Inter', sans-serif",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{ background: "#07060a", color: "#e0d8d0", fontFamily: "'Inter', sans-serif", overflowX: "hidden" }}>

      <style>{`
        @keyframes pulseR { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
        @keyframes pulseOrb { 0%, 100% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -50%) scale(1.15); } }
        @keyframes floatBg { 0%, 100% { transform: translate(-50%, -50%) translateY(0px); } 50% { transform: translate(-50%, -50%) translateY(-20px); } }
        .contact-input:focus { border-color: rgba(196,30,30,0.5) !important; }
        .contact-input::placeholder { color: #3a3030; }
        .info-card { transition: all 0.25s; }
        .info-card:hover { transform: translateX(6px) !important; border-color: rgba(196,30,30,0.3) !important; box-shadow: 0 4px 20px rgba(196,30,30,0.08) !important; }
        select option { background: #07060a; color: #e0d8d0; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.2rem 4rem", position: "fixed", top: 0, left: 0, right: 0,
        zIndex: 100, background: "rgba(7,6,10,0.85)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div
          onClick={(e) => { e.stopPropagation(); navigate("/"); }}
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.6rem", letterSpacing: "4px", background: "linear-gradient(90deg, #e63232, #f0a030)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", cursor: "pointer" }}
        >
          SHIPSENSE
        </div>
        <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none", margin: 0, padding: 0 }}>
          {navLinks.map(l => (
            <li key={l.label}>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (l.path !== "#") navigate(l.path); }}
                style={{ color: l.label === "Contact" ? "#f0a030" : "#666", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "1.5px", textTransform: "uppercase", transition: "color 0.2s", borderBottom: l.label === "Contact" ? "1px solid #f0a030" : "none", paddingBottom: l.label === "Contact" ? "2px" : "0" }}
                onMouseEnter={e => e.target.style.color = "#f0a030"}
                onMouseLeave={e => e.target.style.color = l.label === "Contact" ? "#f0a030" : "#666"}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div onClick={toggleTheme} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
            <span style={{ fontSize: "0.7rem", color: "#666" }}>🌙</span>
            <div style={{ width: "44px", height: "24px", borderRadius: "999px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", position: "relative" }}>
              <div style={{ position: "absolute", top: "3px", left: "3px", width: "18px", height: "18px", borderRadius: "50%", background: "linear-gradient(135deg, #e63232, #f0a030)" }} />
            </div>
            <span style={{ fontSize: "0.7rem", color: "#444" }}>☀️</span>
          </div>
          <button style={{ background: "linear-gradient(135deg, #e63232, #f0a030)", color: "#fff", border: "none", padding: "0.6rem 1.6rem", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px", ...hover }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(230,50,50,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
          >LOGIN</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "50vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10rem 4rem 5rem", position: "relative", overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(196,30,30,0.2) 0%, rgba(196,30,30,0.06) 40%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 0, animation: "pulseOrb 5s ease-in-out infinite" }} />
        <div style={{ position: "absolute", fontSize: "16vw", fontFamily: "'Bebas Neue', sans-serif", color: "transparent", WebkitTextStroke: "1px rgba(196,30,30,0.06)", userSelect: "none", top: "50%", left: "50%", transform: "translate(-50%,-50%)", whiteSpace: "nowrap", zIndex: 0, animation: "floatBg 8s ease-in-out infinite" }}>CONTACT</div>

        <div style={{ position: "relative", zIndex: 2, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.9s ease, transform 0.9s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.8rem", marginBottom: "2rem", padding: "0.4rem 1.2rem", border: "1px solid rgba(196,30,30,0.3)", borderRadius: "999px", background: "rgba(196,30,30,0.05)" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#e63232", display: "inline-block", animation: "pulseR 2s infinite" }} />
            <span style={{ fontSize: "0.7rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e08080" }}>Contact Us</span>
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.92, marginBottom: "1.5rem", letterSpacing: "1px" }}>
            <span style={{ display: "block", background: "linear-gradient(135deg, #ffffff, #c8b8b0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>LET'S</span>
            <span style={{ display: "block", background: "linear-gradient(135deg, #e63232, #f0a030)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>TALK.</span>
          </h1>
          <p style={{ fontSize: "0.95rem", color: "#6a5e5e", lineHeight: 1.9, maxWidth: "500px", margin: "0 auto", fontWeight: 300 }}>
            Have a question, a suggestion, or want to collaborate? We're always open to a conversation.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ padding: "4rem 4rem 7rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 380px", gap: "3rem", alignItems: "start" }}>

          {/* CONTACT FORM */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "2.5rem", boxShadow: "0 4px 30px rgba(0,0,0,0.2)" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "4px", textTransform: "uppercase", background: "linear-gradient(90deg,#e63232,#f0a030)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "0.8rem" }}>Send a Message</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.2rem", background: "linear-gradient(135deg, #ffffff, #c8b0a8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "2px", marginBottom: "2rem" }}>REACH OUT.</h2>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", background: "linear-gradient(135deg, #ffffff, #c8b0a8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "2px", marginBottom: "0.8rem" }}>MESSAGE SENT.</h3>
                <p style={{ fontSize: "0.88rem", color: "#6a5e5e", lineHeight: 1.8, fontWeight: 300 }}>Thank you for reaching out. We'll get back to you as soon as possible.</p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "", message: "" }); }}
                  style={{ marginTop: "1.5rem", background: "linear-gradient(135deg, #e63232, #f0a030)", color: "#fff", border: "none", padding: "0.8rem 2rem", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px" }}
                >SEND ANOTHER</button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
                  <div>
                    <label style={{ fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", color: "#444", display: "block", marginBottom: "0.5rem" }}>Full Name</label>
                    <input
                      className="contact-input"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "rgba(196,30,30,0.5)"}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", color: "#444", display: "block", marginBottom: "0.5rem" }}>Email Address</label>
                    <input
                      className="contact-input"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "rgba(196,30,30,0.5)"}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", color: "#444", display: "block", marginBottom: "0.5rem" }}>Subject</label>
                  <select
                    className="contact-input"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                    onFocus={e => e.target.style.borderColor = "rgba(196,30,30,0.5)"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Enquiry</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", color: "#444", display: "block", marginBottom: "0.5rem" }}>Message</label>
                  <textarea
                    className="contact-input"
                    placeholder="Write your message here..."
                    rows={6}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
                    onFocus={e => e.target.style.borderColor = "rgba(196,30,30,0.5)"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  style={{ background: "linear-gradient(135deg, #e63232, #f0a030)", color: "#fff", border: "none", padding: "1rem 2.5rem", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px", transition: "all 0.25s", alignSelf: "flex-start", ...hover }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05) translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(230,50,50,0.4)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >SEND MESSAGE</button>
              </div>
            )}
          </div>

          {/* QUICK INFO */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "4px", textTransform: "uppercase", background: "linear-gradient(90deg,#e63232,#f0a030)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "0.5rem" }}>Quick Info</div>
            {quickInfo.map((q, i) => (
              <div key={i} className="info-card" style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.2rem 1.5rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px" }}>
                <div style={{ fontSize: "1.4rem", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(196,30,30,0.08)", borderRadius: "8px", border: "1px solid rgba(196,30,30,0.15)", flexShrink: 0 }}>{q.icon}</div>
                <div>
                  <div style={{ fontSize: "0.58rem", color: "#444", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "2px" }}>{q.label}</div>
                  <div style={{ fontSize: "0.78rem", color: "#6a5e5e", wordBreak: "break-all" }}>{q.value}</div>
                </div>
              </div>
            ))}

            {/* GitHub CTA */}
            <div style={{ marginTop: "1rem", background: "linear-gradient(135deg, rgba(196,30,30,0.1), rgba(240,160,48,0.06))", border: "1px solid rgba(196,30,30,0.2)", borderRadius: "12px", padding: "2rem" }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e63232", marginBottom: "0.8rem" }}>Explore the Codebase</div>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", background: "linear-gradient(135deg, #ffffff, #c8b0a8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "2px", marginBottom: "0.8rem" }}>OR EXPLORE THE CODEBASE.</h3>
              <p style={{ fontSize: "0.78rem", color: "#6a5e5e", lineHeight: 1.7, fontWeight: 300, marginBottom: "1.2rem" }}>
                ShipSense is open source. Browse the code, raise an issue, or fork the repo.
              </p>
              <button
                onClick={() => window.open("https://github.com/juhithk/ShipSense-", "_blank")}
                style={{ background: "linear-gradient(135deg, #e63232, #f0a030)", color: "#fff", border: "none", padding: "0.8rem 1.8rem", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px", transition: "all 0.25s", width: "100%", ...hover }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(230,50,50,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
              >VIEW ON GITHUB</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "2rem 4rem", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", letterSpacing: "4px", background: "linear-gradient(90deg,#e63232,#f0a030)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>SHIPSENSE</div>
        <div style={{ display: "flex", gap: "2.5rem", justifyContent: "center" }}>
          {["Privacy", "Terms", "Help"].map(l => (
            <a key={l} href="#"
              style={{ fontSize: "0.7rem", letterSpacing: "2px", textTransform: "uppercase", color: "#333", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#f0a030"}
              onMouseLeave={e => e.target.style.color = "#333"}
            >
              {l}
            </a>
          ))}
          
        </div>
        <div style={{ fontSize: "0.65rem", color: "#222", letterSpacing: "1px", textAlign: "right" }}>© 2026 SHIPSENSE. ALL RIGHTS RESERVED.</div>
      </footer>

    </div>
  );
}