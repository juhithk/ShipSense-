import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const C = {
  bg: "#faf6f0",
  bgDeep: "#f3ede4",
  bgCard: "rgba(255,250,245,0.85)",
  rose: "#c9848a",
  roseDark: "#a85f65",
  roseLight: "rgba(201,132,138,0.15)",
  gold: "#c4a35a",
  goldLight: "rgba(196,163,90,0.15)",
  sage: "#8a9e7a",
  ink: "#2e2218",
  inkMid: "#6b5744",
  inkLight: "#a8917a",
  inkFaint: "#d6c9bc",
  border: "rgba(196,163,90,0.2)",
  borderRose: "rgba(201,132,138,0.25)",
};

const font = {
  heading: "'Cormorant Garamond', serif",
  cursive: "'Dancing Script', cursive",
  body: "'DM Sans', sans-serif",
};

export default function ContactPageLight({ toggleTheme }) {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500;600&family=Dancing+Script:wght@600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    setTimeout(() => setVisible(true), 100);
  }, []);

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
    background: C.bg,
    border: `1px solid ${C.border}`,
    borderRadius: "4px",
    fontSize: "0.85rem",
    color: C.ink,
    fontFamily: font.body,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: font.body, overflowX: "hidden" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500;600&family=Dancing+Script:wght@600&display=swap');
        @keyframes pulseR { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
        @keyframes pulseOrb { 0%, 100% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -50%) scale(1.15); } }
        @keyframes floatBg { 0%, 100% { transform: translate(-50%, -50%) translateY(0px); } 50% { transform: translate(-50%, -50%) translateY(-20px); } }
        .light-nav-link { color: ${C.inkLight}; text-decoration: none; font-size: 0.78rem; letter-spacing: 1.5px; text-transform: uppercase; transition: color 0.2s; font-family: ${font.body}; font-weight: 500; }
        .light-nav-link:hover { color: ${C.rose}; }
        .light-nav-link.active { color: ${C.rose}; border-bottom: 1px solid ${C.rose}; padding-bottom: 2px; }
        .light-footer-link { font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase; color: ${C.inkFaint}; text-decoration: none; transition: color 0.2s; font-family: ${font.body}; }
        .light-footer-link:hover { color: ${C.rose}; }
        .contact-input:focus { border-color: ${C.rose} !important; }
        .contact-input::placeholder { color: ${C.inkFaint}; }
        .info-card { transition: all 0.25s; }
        .info-card:hover { transform: translateX(6px) !important; border-color: ${C.rose} !important; box-shadow: 0 4px 20px rgba(201,132,138,0.1) !important; }
        select option { background: ${C.bg}; color: ${C.ink}; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.2rem 4rem", position: "fixed", top: 0, left: 0, right: 0,
        zIndex: 100, background: "rgba(250,246,240,0.88)", backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div
          onClick={(e) => { e.stopPropagation(); navigate("/"); }}
          style={{ fontFamily: font.cursive, fontSize: "2.2rem", fontWeight: 600, background: `linear-gradient(90deg, ${C.rose}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "1px", cursor: "pointer" }}
        >
          ShipSense
        </div>
        <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none", margin: 0, padding: 0 }}>
          {navLinks.map(l => (
            <li key={l.label}>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (l.path !== "#") navigate(l.path); }}
                className={`light-nav-link${l.label === "Contact" ? " active" : ""}`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div onClick={toggleTheme} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
            <span style={{ fontSize: "0.85rem" }}>🌙</span>
            <div style={{ width: "44px", height: "24px", borderRadius: "999px", background: "rgba(201,132,138,0.15)", border: `1px solid rgba(196,163,90,0.3)`, position: "relative", cursor: "pointer" }}>
              <div style={{ position: "absolute", top: "3px", left: "22px", width: "18px", height: "18px", borderRadius: "50%", background: `linear-gradient(135deg, ${C.rose}, ${C.gold})` }} />
            </div>
            <span style={{ fontSize: "0.85rem" }}>☀️</span>
          </div>
          <button style={{
            background: `linear-gradient(135deg, ${C.rose}, ${C.gold})`,
            color: "#fff", border: "none", padding: "0.65rem 1.8rem",
            fontSize: "0.75rem", fontWeight: 600, letterSpacing: "2px",
            textTransform: "uppercase", cursor: "pointer", borderRadius: "2px",
            fontFamily: font.body, transition: "all 0.25s"
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = `0 0 20px rgba(201,132,138,0.35)`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
          >Login</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "50vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10rem 4rem 5rem", position: "relative", overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(circle, rgba(201,132,138,0.14) 0%, transparent 70%)`, top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 0, animation: "pulseOrb 5s ease-in-out infinite" }} />
        <div style={{ position: "absolute", fontSize: "16vw", fontFamily: font.cursive, fontWeight: 600, color: "transparent", WebkitTextStroke: `1px rgba(201,132,138,0.07)`, userSelect: "none", top: "50%", left: "50%", transform: "translate(-50%,-50%)", whiteSpace: "nowrap", zIndex: 0, animation: "floatBg 8s ease-in-out infinite" }}>Contact</div>

        <div style={{ position: "relative", zIndex: 2, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.9s ease, transform 0.9s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.8rem", marginBottom: "2rem", padding: "0.4rem 1.2rem", border: `1px solid ${C.borderRose}`, borderRadius: "999px", background: C.roseLight }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.rose, display: "inline-block", animation: "pulseR 2s infinite" }} />
            <span style={{ fontSize: "0.7rem", letterSpacing: "3px", textTransform: "uppercase", color: C.rose, fontFamily: font.body, fontWeight: 500 }}>Contact Us</span>
          </div>
          <h1 style={{ fontFamily: font.heading, fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 1, marginBottom: "1.5rem", fontWeight: 600, color: C.ink }}>
            Let's<br />
            <span style={{ fontStyle: "italic", background: `linear-gradient(135deg, ${C.rose}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Talk.</span>
          </h1>
          <p style={{ fontSize: "1rem", color: C.inkMid, lineHeight: 1.9, maxWidth: "500px", margin: "0 auto", fontWeight: 300 }}>
            Have a question, a suggestion, or want to collaborate? We're always open to a conversation.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ padding: "4rem 4rem 7rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 380px", gap: "3rem", alignItems: "start" }}>

          {/* CONTACT FORM */}
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "2.5rem", boxShadow: "0 4px 30px rgba(201,132,138,0.07)" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "4px", textTransform: "uppercase", background: `linear-gradient(90deg,${C.rose},${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "0.8rem", fontFamily: font.body, fontWeight: 600 }}>Send a Message</div>
            <h2 style={{ fontFamily: font.heading, fontSize: "2.2rem", fontWeight: 600, color: C.ink, marginBottom: "2rem" }}>
              Reach <span style={{ fontStyle: "italic", color: C.rose }}>Out.</span>
            </h2>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                <h3 style={{ fontFamily: font.heading, fontSize: "1.8rem", fontWeight: 600, color: C.ink, marginBottom: "0.8rem" }}>Message Sent.</h3>
                <p style={{ fontSize: "0.88rem", color: C.inkMid, lineHeight: 1.8, fontWeight: 300 }}>Thank you for reaching out. We'll get back to you as soon as possible.</p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "", message: "" }); }}
                  style={{ marginTop: "1.5rem", background: `linear-gradient(135deg, ${C.rose}, ${C.gold})`, color: "#fff", border: "none", padding: "0.8rem 2rem", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px", fontFamily: font.body }}
                >Send Another</button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
                  <div>
                    <label style={{ fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", color: C.inkFaint, fontFamily: font.body, display: "block", marginBottom: "0.5rem" }}>Full Name</label>
                    <input
                      className="contact-input"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = C.rose}
                      onBlur={e => e.target.style.borderColor = C.border}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", color: C.inkFaint, fontFamily: font.body, display: "block", marginBottom: "0.5rem" }}>Email Address</label>
                    <input
                      className="contact-input"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = C.rose}
                      onBlur={e => e.target.style.borderColor = C.border}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", color: C.inkFaint, fontFamily: font.body, display: "block", marginBottom: "0.5rem" }}>Subject</label>
                  <select
                    className="contact-input"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                    onFocus={e => e.target.style.borderColor = C.rose}
                    onBlur={e => e.target.style.borderColor = C.border}
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
                  <label style={{ fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", color: C.inkFaint, fontFamily: font.body, display: "block", marginBottom: "0.5rem" }}>Message</label>
                  <textarea
                    className="contact-input"
                    placeholder="Write your message here..."
                    rows={6}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
                    onFocus={e => e.target.style.borderColor = C.rose}
                    onBlur={e => e.target.style.borderColor = C.border}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.gold})`, color: "#fff", border: "none", padding: "1rem 2.5rem", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px", fontFamily: font.body, transition: "all 0.25s", alignSelf: "flex-start" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05) translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 30px rgba(201,132,138,0.35)`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >Send Message</button>
              </div>
            )}
          </div>

          {/* QUICK INFO */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "4px", textTransform: "uppercase", background: `linear-gradient(90deg,${C.rose},${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "0.5rem", fontFamily: font.body, fontWeight: 600 }}>Quick Info</div>
            {quickInfo.map((q, i) => (
              <div key={i} className="info-card" style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.2rem 1.5rem", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "8px", boxShadow: "0 2px 10px rgba(196,163,90,0.04)" }}>
                <div style={{ fontSize: "1.4rem", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", background: C.roseLight, borderRadius: "8px", border: `1px solid ${C.borderRose}`, flexShrink: 0 }}>{q.icon}</div>
                <div>
                  <div style={{ fontSize: "0.58rem", color: C.inkFaint, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "2px", fontFamily: font.body }}>{q.label}</div>
                  <div style={{ fontSize: "0.78rem", color: C.inkMid, fontFamily: font.body, wordBreak: "break-all" }}>{q.value}</div>
                </div>
              </div>
            ))}

            {/* GitHub CTA */}
            <div style={{ marginTop: "1rem", background: `linear-gradient(135deg, rgba(201,132,138,0.08), rgba(196,163,90,0.05))`, border: `1px solid ${C.borderRose}`, borderRadius: "12px", padding: "2rem", boxShadow: "0 2px 20px rgba(201,132,138,0.07)" }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "3px", textTransform: "uppercase", color: C.rose, marginBottom: "0.8rem", fontFamily: font.body, fontWeight: 600 }}>Explore the Codebase</div>
              <h3 style={{ fontFamily: font.heading, fontSize: "1.4rem", fontWeight: 600, color: C.ink, marginBottom: "0.8rem" }}>
                Or explore the <span style={{ fontStyle: "italic", color: C.rose }}>codebase.</span>
              </h3>
              <p style={{ fontSize: "0.78rem", color: C.inkMid, lineHeight: 1.7, fontWeight: 300, marginBottom: "1.2rem", fontFamily: font.body }}>
                ShipSense is open source. Browse the code, raise an issue, or fork the repo.
              </p>
              <button
                onClick={() => window.open("https://github.com/juhithk/ShipSense-", "_blank")}
                style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.gold})`, color: "#fff", border: "none", padding: "0.8rem 1.8rem", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px", fontFamily: font.body, transition: "all 0.25s", width: "100%" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = `0 6px 20px rgba(201,132,138,0.3)`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
              >View on GitHub</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "2rem 4rem", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", alignItems: "center", borderTop: `1px solid ${C.border}`, background: C.bg }}>
        <div style={{ fontFamily: font.cursive, fontSize: "2rem", fontWeight: 600, letterSpacing: "1px", background: `linear-gradient(90deg,${C.rose},${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ShipSense</div>
        <div style={{ display: "flex", gap: "2.5rem", justifyContent: "center" }}>
          {["Privacy", "Terms", "Help"].map(l => (
            <a key={l} href="#" className="light-footer-link">{l}</a>
          ))}
        </div>
        <div style={{ fontSize: "0.65rem", color: C.inkFaint, letterSpacing: "1px", fontFamily: font.body, textAlign: "right" }}>© 2026 SHIPSENSE. ALL RIGHTS RESERVED.</div>
      </footer>

    </div>
  );
}