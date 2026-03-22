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

export default function TeamPageLight({ toggleTheme }) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500;600&family=Dancing+Script:wght@600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    setTimeout(() => setVisible(true), 100);
  }, []);

  const hover = { transition: "transform 0.25s, box-shadow 0.25s" };

  const navLinks = [
    { label: "About", path: "/about" },
    { label: "Partners", path: "/partners" },
    { label: "Features", path: "/features" },
    { label: "Team", path: "/team" },
    { label: "Contact", path: "/contact" },
  ];

  const teamMembers = [
    {
      initials: "JT",
      name: "Juhi Thakur",
      role: "Full Stack Developer",
      lead: "Frontend Lead",
      gradient: `linear-gradient(135deg, ${C.rose}, ${C.gold})`,
      education: [
        { icon: "🏫", label: "Class 10", school: "Maharishi Vidya Mandir" },
        { icon: "🏫", label: "Class 12", school: "Hirendra Leela Patra Navis" },
        { icon: "🎓", label: "B.Tech CSE", school: "Future Institute of Technology, Kolkata (Pursuing)" },
      ],
      about: "Juhi leads the frontend architecture of ShipSense — responsible for the dual-theme design system, React component structure, page routing, and the overall visual identity of the platform. She designed both the dark and light themes and built every client-facing page from the ground up.",
      responsibilities: [
        "Dual theme system (Dark + Light)",
        "Frontend pages and routing",
        "UI design language and brand identity",
        "React component architecture",
      ],
      quote: "Enterprise software doesn't have to look like it was built in 2003.",
      tagColor: C.rose,
      borderColor: C.borderRose,
      bgColor: `linear-gradient(135deg, rgba(201,132,138,0.08), rgba(196,163,90,0.05))`,
    },
    {
      initials: "AR",
      name: "Arnab Roy",
      role: "Full Stack Developer",
      lead: "Backend Lead",
      gradient: `linear-gradient(135deg, ${C.gold}, ${C.rose})`,
      education: [
        { icon: "🏫", label: "Schooling", school: "Kendriya Vidyalaya Ballygunge, Kolkata" },
        { icon: "🎓", label: "B.Tech CSE", school: "Future Institute of Technology, Kolkata (Pursuing)" },
      ],
      about: "Arnab leads the backend development of ShipSense — responsible for the server architecture, database design, authentication system, and the machine learning pipeline for ETA prediction and delay code suggestion. He designed the three-tier role-based access control model that governs the entire platform.",
      responsibilities: [
        "Backend API (Node.js + Express)",
        "Database design (MongoDB + Mongoose)",
        "Role-based access control",
        "JWT authentication",
        "ML pipeline for ETA prediction",
      ],
      quote: "Once you can classify why something went wrong, you can start predicting when it will go wrong next.",
      tagColor: C.gold,
      borderColor: C.border,
      bgColor: `linear-gradient(135deg, rgba(196,163,90,0.08), rgba(201,132,138,0.05))`,
    },
  ];

  const roadmap = [
    { phase: "Frontend", desc: "All pages, dual theme, routing", status: "Complete", color: "#8a9e7a" },
    { phase: "Backend API", desc: "Node.js, Express, REST endpoints", status: "In Progress", color: C.gold },
    { phase: "Authentication", desc: "JWT, bcrypt, role-based access", status: "In Progress", color: C.gold },
    { phase: "AI — ETA Prediction", desc: "ML model for shipment ETA", status: "Planned", color: C.inkFaint },
    { phase: "AI — Delay Codes", desc: "Automated D01–D06 classification", status: "Planned", color: C.inkFaint },
    { phase: "Dashboards", desc: "Admin, Supplier, Customer views", status: "Planned", color: C.inkFaint },
    { phase: "Deployment", desc: "Full cloud production deployment", status: "Planned", color: C.inkFaint },
  ];

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
        .hover-row { transition: all 0.25s; }
        .hover-row:hover { transform: translateX(6px) !important; border-color: ${C.rose} !important; box-shadow: 0 4px 20px rgba(201,132,138,0.1) !important; }
        .member-card { transition: all 0.25s; }
        .member-card:hover { transform: translateY(-4px) !important; box-shadow: 0 12px 40px rgba(201,132,138,0.12) !important; }
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
                className={`light-nav-link${l.label === "Team" ? " active" : ""}`}
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
      <section style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10rem 4rem 6rem", position: "relative", overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(circle, rgba(201,132,138,0.14) 0%, transparent 70%)`, top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 0, animation: "pulseOrb 5s ease-in-out infinite" }} />
        <div style={{ position: "absolute", fontSize: "16vw", fontFamily: font.cursive, fontWeight: 600, color: "transparent", WebkitTextStroke: `1px rgba(201,132,138,0.07)`, userSelect: "none", top: "50%", left: "50%", transform: "translate(-50%,-50%)", whiteSpace: "nowrap", zIndex: 0, animation: "floatBg 8s ease-in-out infinite" }}>Team</div>

        <div style={{ position: "relative", zIndex: 2, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.9s ease, transform 0.9s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.8rem", marginBottom: "2rem", padding: "0.4rem 1.2rem", border: `1px solid ${C.borderRose}`, borderRadius: "999px", background: C.roseLight }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.rose, display: "inline-block", animation: "pulseR 2s infinite" }} />
            <span style={{ fontSize: "0.7rem", letterSpacing: "3px", textTransform: "uppercase", color: C.rose, fontFamily: font.body, fontWeight: 500 }}>The Team</span>
          </div>
          <h1 style={{ fontFamily: font.heading, fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 1, marginBottom: "1.5rem", fontWeight: 600, color: C.ink }}>
            The Minds Behind<br />
            <span style={{ fontStyle: "italic", background: `linear-gradient(135deg, ${C.rose}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ShipSense.</span>
          </h1>
          <p style={{ fontSize: "1rem", color: C.inkMid, lineHeight: 1.9, maxWidth: "650px", margin: "0 auto", fontWeight: 300 }}>
            ShipSense is built by two B.Tech students from Future Institute of Technology, Kolkata — driven by a shared belief that supply chain intelligence should be accessible, intelligent, and beautifully designed.
          </p>
        </div>
      </section>

      {/* TEAM MEMBERS */}
      <section style={{ padding: "6rem 4rem", background: C.bgDeep }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "4px", textTransform: "uppercase", background: `linear-gradient(90deg,${C.rose},${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "1rem", fontFamily: font.body, fontWeight: 600 }}>Who We Are</div>
            <h2 style={{ fontFamily: font.heading, fontSize: "3rem", fontWeight: 600, color: C.ink }}>
              Meet the <span style={{ fontStyle: "italic", color: C.rose }}>Developers.</span>
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {teamMembers.map((m, idx) => (
              <div key={idx} className="member-card" style={{ background: m.bgColor, border: `1px solid ${m.borderColor}`, borderRadius: "12px", padding: "2.5rem", boxShadow: "0 2px 20px rgba(201,132,138,0.06)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "3rem", alignItems: "start" }}>

                  {/* LEFT — Identity */}
                  <div>
                    <div style={{ width: "80px", height: "80px", borderRadius: "12px", background: m.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.heading, fontSize: "2rem", fontWeight: 600, color: "#fff", marginBottom: "1.2rem", boxShadow: `0 8px 24px rgba(201,132,138,0.25)` }}>{m.initials}</div>
                    <div style={{ fontFamily: font.heading, fontSize: "1.8rem", fontWeight: 600, color: C.ink, marginBottom: "0.3rem" }}>{m.name}</div>
                    <div style={{ fontSize: "0.72rem", color: C.inkLight, marginBottom: "0.4rem", letterSpacing: "1px", fontFamily: font.body }}>{m.role}</div>
                    <div style={{ fontSize: "0.65rem", padding: "0.2rem 0.8rem", background: `${m.tagColor}20`, border: `1px solid ${m.tagColor}50`, color: m.tagColor, display: "inline-block", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1.5rem", fontFamily: font.body, borderRadius: "2px" }}>{m.lead}</div>

                    {/* Education */}
                    <div style={{ fontSize: "0.6rem", letterSpacing: "2px", textTransform: "uppercase", color: C.inkFaint, marginBottom: "0.8rem", fontFamily: font.body }}>Education</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                      {m.education.map((e, i) => (
                        <div key={i} style={{ display: "flex", gap: "0.8rem", alignItems: "flex-start" }}>
                          <span style={{ fontSize: "0.9rem", marginTop: "1px" }}>{e.icon}</span>
                          <div>
                            <div style={{ fontSize: "0.6rem", color: C.gold, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1px", fontFamily: font.body, fontWeight: 600 }}>{e.label}</div>
                            <div style={{ fontSize: "0.72rem", color: C.inkMid, lineHeight: 1.4, fontFamily: font.body }}>{e.school}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT — Details */}
                  <div>
                    <p style={{ fontSize: "0.88rem", color: C.inkMid, lineHeight: 1.9, fontWeight: 300, marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: `1px solid ${C.border}` }}>{m.about}</p>

                    <div style={{ marginBottom: "2rem" }}>
                      <div style={{ fontSize: "0.6rem", letterSpacing: "2px", textTransform: "uppercase", color: C.inkFaint, marginBottom: "1rem", fontFamily: font.body }}>Responsibilities</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {m.responsibilities.map((r, i) => (
                          <span key={i} style={{ fontSize: "0.65rem", padding: "0.3rem 0.8rem", background: C.roseLight, border: `1px solid ${C.borderRose}`, color: C.rose, borderRadius: "999px", letterSpacing: "0.5px", fontFamily: font.body }}>{r}</span>
                        ))}
                      </div>
                    </div>

                    <div style={{ padding: "1.2rem 1.5rem", background: C.bgCard, borderLeft: `3px solid ${m.tagColor}`, borderRadius: "0 4px 4px 0", boxShadow: "0 2px 10px rgba(196,163,90,0.05)" }}>
                      <div style={{ fontSize: "0.6rem", letterSpacing: "2px", textTransform: "uppercase", color: C.inkFaint, marginBottom: "0.5rem", fontFamily: font.body }}>In Their Words</div>
                      <div style={{ fontSize: "0.82rem", color: C.inkMid, fontStyle: "italic", lineHeight: 1.7, fontFamily: font.heading, fontWeight: 400 }}>"{m.quote}"</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTITUTION */}
      <section style={{ padding: "6rem 4rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "4px", textTransform: "uppercase", background: `linear-gradient(90deg,${C.rose},${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "1rem", fontFamily: font.body, fontWeight: 600 }}>Where We Study</div>
            <h2 style={{ fontFamily: font.heading, fontSize: "3rem", fontWeight: 600, color: C.ink }}>
              Future Institute of <span style={{ fontStyle: "italic", color: C.rose }}>Technology.</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            <div style={{ background: `linear-gradient(135deg, rgba(201,132,138,0.08), rgba(196,163,90,0.05))`, border: `1px solid ${C.borderRose}`, borderRadius: "12px", padding: "2.5rem", boxShadow: "0 2px 20px rgba(201,132,138,0.06)" }}>
              <div style={{ fontSize: "0.6rem", letterSpacing: "2px", textTransform: "uppercase", color: C.rose, marginBottom: "1rem", fontFamily: font.body, fontWeight: 600 }}>About the Institution</div>
              <p style={{ fontSize: "0.88rem", color: C.inkMid, lineHeight: 1.9, fontWeight: 300, fontFamily: font.body }}>
                Future Institute of Technology is an engineering college in Kolkata, West Bengal, affiliated with Makaut University. Both Juhi and Arnab are pursuing their B.Tech in Computer Science & Engineering — and it is here that ShipSense went from a shared idea to a live, deployed platform.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { icon: "📍", label: "Location", value: "Boral, Kolkata, West Bengal" },
                { icon: "🎓", label: "Affiliation", value: "Makaut University" },
                { icon: "💻", label: "Department", value: "Computer Science & Engineering" },
              ].map((d, i) => (
                <div key={i} className="hover-row" style={{ display: "flex", alignItems: "center", gap: "1.2rem", padding: "1.2rem 1.5rem", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "8px", boxShadow: "0 2px 10px rgba(196,163,90,0.04)" }}>
                  <div style={{ fontSize: "1.5rem" }}>{d.icon}</div>
                  <div>
                    <div style={{ fontSize: "0.58rem", color: C.inkFaint, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "2px", fontFamily: font.body }}>{d.label}</div>
                    <div style={{ fontSize: "0.78rem", color: C.inkMid, fontFamily: font.body }}>{d.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* STATS */}
      <div style={{ background: C.bgDeep, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
        {[
          { val: "2", unit: "", label: "Developers" },
          { val: "6", unit: "+", label: "Months" },
          { val: "10", unit: "+", label: "Pages Built" },
          { val: "1", unit: "", label: "Platform" },
        ].map((s, i) => (
          <div key={i} style={{ padding: "3rem", textAlign: "center", borderRight: i < 3 ? `1px solid ${C.border}` : "none" }}>
            <div style={{ fontFamily: font.heading, fontSize: "4rem", fontWeight: 600, letterSpacing: "1px", lineHeight: 1 }}>
              <span style={{ color: C.ink }}>{s.val}</span>
              <span style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.unit}</span>
            </div>
            <div style={{ fontSize: "0.65rem", letterSpacing: "3px", textTransform: "uppercase", color: C.inkFaint, marginTop: "0.5rem", fontFamily: font.body }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section style={{ padding: "7rem 4rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", background: `radial-gradient(circle, rgba(201,132,138,0.1) 0%, transparent 70%)`, top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 0 }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ fontSize: "0.65rem", letterSpacing: "4px", textTransform: "uppercase", background: `linear-gradient(90deg,${C.rose},${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "1rem", fontFamily: font.body, fontWeight: 600 }}>Get In Touch</div>
          <h2 style={{ fontFamily: font.heading, fontSize: "3.5rem", fontWeight: 600, color: C.ink, marginBottom: "1.2rem" }}>
            Want to <span style={{ fontStyle: "italic", color: C.rose }}>Connect?</span>
          </h2>
          <p style={{ fontSize: "0.95rem", color: C.inkMid, lineHeight: 1.9, maxWidth: "520px", margin: "0 auto 2.5rem", fontWeight: 300, fontFamily: font.body }}>
            Open to feedback, collaboration, and conversation. ShipSense is being built in the open — reach out to the team or explore the codebase on GitHub.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <button style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.gold})`, color: "#fff", border: "none", padding: "1rem 2.5rem", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px", fontFamily: font.body, transition: "all 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05) translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 30px rgba(201,132,138,0.35)`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >Contact Us</button>
            <button style={{ background: "transparent", color: C.inkLight, border: `1px solid ${C.border}`, padding: "1rem 2rem", fontSize: "0.82rem", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px", fontFamily: font.body, transition: "all 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.rose; e.currentTarget.style.color = C.rose; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.inkLight; }}
            >View on GitHub</button>
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