import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TeamPageDark({ toggleTheme }) {
  const [visible, setVisible] = useState(false);
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

  const teamMembers = [
    {
      initials: "JT",
      name: "Juhi Thakur",
      role: "Full Stack Developer",
      lead: "Frontend Lead",
      gradient: "linear-gradient(135deg, #e63232, #f0a030)",
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
      tagColor: "#e63232",
    },
    {
      initials: "AR",
      name: "Arnab Roy",
      role: "Full Stack Developer",
      lead: "Backend Lead",
      gradient: "linear-gradient(135deg, #f0a030, #e63232)",
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
      tagColor: "#f0a030",
    },
  ];

  const roadmap = [
    { phase: "Frontend", desc: "All pages, dual theme, routing", status: "Complete", color: "#4a9a6a" },
    { phase: "Backend API", desc: "Node.js, Express, REST endpoints", status: "In Progress", color: "#f0a030" },
    { phase: "Authentication", desc: "JWT, bcrypt, role-based access", status: "In Progress", color: "#f0a030" },
    { phase: "AI — ETA Prediction", desc: "ML model for shipment ETA", status: "Planned", color: "#555" },
    { phase: "AI — Delay Codes", desc: "Automated D01–D06 classification", status: "Planned", color: "#555" },
    { phase: "Dashboards", desc: "Admin, Supplier, Customer views", status: "Planned", color: "#555" },
    { phase: "Deployment", desc: "Full cloud production deployment", status: "Planned", color: "#555" },
  ];

  return (
    <div style={{ background: "#07060a", color: "#e0d8d0", fontFamily: "'Inter', sans-serif", overflowX: "hidden" }}>

      <style>{`
        @keyframes pulseR { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
        @keyframes pulseOrb { 0%, 100% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -50%) scale(1.15); } }
        @keyframes floatBg { 0%, 100% { transform: translate(-50%, -50%) translateY(0px); } 50% { transform: translate(-50%, -50%) translateY(-20px); } }
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
                style={{ color: l.label === "Team" ? "#f0a030" : "#666", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "1.5px", textTransform: "uppercase", transition: "color 0.2s", borderBottom: l.label === "Team" ? "1px solid #f0a030" : "none", paddingBottom: l.label === "Team" ? "2px" : "0" }}
                onMouseEnter={e => e.target.style.color = "#f0a030"}
                onMouseLeave={e => e.target.style.color = l.label === "Team" ? "#f0a030" : "#666"}
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
      <section style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10rem 4rem 6rem", position: "relative", overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(196,30,30,0.2) 0%, rgba(196,30,30,0.06) 40%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 0, animation: "pulseOrb 5s ease-in-out infinite" }} />
        <div style={{ position: "absolute", fontSize: "16vw", fontFamily: "'Bebas Neue', sans-serif", color: "transparent", WebkitTextStroke: "1px rgba(196,30,30,0.06)", userSelect: "none", top: "50%", left: "50%", transform: "translate(-50%,-50%)", whiteSpace: "nowrap", zIndex: 0, animation: "floatBg 8s ease-in-out infinite" }}>TEAM</div>

        <div style={{ position: "relative", zIndex: 2, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.9s ease, transform 0.9s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.8rem", marginBottom: "2rem", padding: "0.4rem 1.2rem", border: "1px solid rgba(196,30,30,0.3)", borderRadius: "999px", background: "rgba(196,30,30,0.05)" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#e63232", display: "inline-block", animation: "pulseR 2s infinite" }} />
            <span style={{ fontSize: "0.7rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e08080" }}>The Team</span>
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 0.92, marginBottom: "1.5rem", letterSpacing: "1px" }}>
            <span style={{ display: "block", background: "linear-gradient(135deg, #ffffff, #c8b8b0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>THE MINDS BEHIND</span>
            <span style={{ display: "block", background: "linear-gradient(135deg, #e63232, #f0a030)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>SHIPSENSE.</span>
          </h1>
          <p style={{ fontSize: "0.95rem", color: "#6a5e5e", lineHeight: 1.9, maxWidth: "650px", margin: "0 auto", fontWeight: 300 }}>
            ShipSense is built by two B.Tech students from Future Institute of Technology, Kolkata — driven by a shared belief that supply chain intelligence should be accessible, intelligent, and beautifully designed.
          </p>
        </div>
      </section>

      {/* TEAM MEMBERS */}
      <section style={{ padding: "6rem 4rem", background: "#0a0608" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "4px", textTransform: "uppercase", background: "linear-gradient(90deg,#e63232,#f0a030)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "1rem" }}>Who We Are</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3rem", background: "linear-gradient(135deg, #ffffff, #c8b0a8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "2px" }}>MEET THE DEVELOPERS.</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {teamMembers.map((m, idx) => (
              <div key={idx} style={{ background: idx === 0 ? "linear-gradient(135deg, rgba(196,30,30,0.08), rgba(240,160,48,0.04))" : "linear-gradient(135deg, rgba(240,160,48,0.08), rgba(196,30,30,0.04))", border: `1px solid ${idx === 0 ? "rgba(196,30,30,0.2)" : "rgba(240,160,48,0.2)"}`, borderRadius: "12px", padding: "2.5rem", ...hover }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(196,30,30,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "3rem", alignItems: "start" }}>

                  {/* LEFT — Identity */}
                  <div>
                    <div style={{ width: "80px", height: "80px", borderRadius: "12px", background: m.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", color: "#fff", letterSpacing: "2px", marginBottom: "1.2rem", boxShadow: `0 8px 24px rgba(196,30,30,0.25)` }}>{m.initials}</div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.8rem", background: "linear-gradient(135deg, #ffffff, #c8b0a8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "2px", marginBottom: "0.3rem" }}>{m.name}</div>
                    <div style={{ fontSize: "0.72rem", color: "#6a5e5e", marginBottom: "0.2rem", letterSpacing: "1px" }}>{m.role}</div>
                    <div style={{ fontSize: "0.65rem", padding: "0.2rem 0.8rem", background: `${m.tagColor}18`, border: `1px solid ${m.tagColor}40`, color: m.tagColor, display: "inline-block", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1.5rem" }}>{m.lead}</div>

                    {/* Education */}
                    <div style={{ fontSize: "0.6rem", letterSpacing: "2px", textTransform: "uppercase", color: "#444", marginBottom: "0.8rem" }}>Education</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                      {m.education.map((e, i) => (
                        <div key={i} style={{ display: "flex", gap: "0.8rem", alignItems: "flex-start" }}>
                          <span style={{ fontSize: "0.9rem", marginTop: "1px" }}>{e.icon}</span>
                          <div>
                            <div style={{ fontSize: "0.6rem", color: "#f0a030", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1px" }}>{e.label}</div>
                            <div style={{ fontSize: "0.72rem", color: "#6a5e5e", lineHeight: 1.4 }}>{e.school}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT — Details */}
                  <div>
                    <p style={{ fontSize: "0.88rem", color: "#6a5e5e", lineHeight: 1.9, fontWeight: 300, marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{m.about}</p>

                    <div style={{ marginBottom: "2rem" }}>
                      <div style={{ fontSize: "0.6rem", letterSpacing: "2px", textTransform: "uppercase", color: "#444", marginBottom: "1rem" }}>Responsibilities</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {m.responsibilities.map((r, i) => (
                          <span key={i} style={{ fontSize: "0.65rem", padding: "0.3rem 0.8rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", color: "#8a7a70", borderRadius: "2px", letterSpacing: "0.5px" }}>{r}</span>
                        ))}
                      </div>
                    </div>

                    <div style={{ padding: "1.2rem 1.5rem", background: "rgba(255,255,255,0.02)", borderLeft: `3px solid ${m.tagColor}`, borderRadius: "0 4px 4px 0" }}>
                      <div style={{ fontSize: "0.6rem", letterSpacing: "2px", textTransform: "uppercase", color: "#444", marginBottom: "0.5rem" }}>In Their Words</div>
                      <div style={{ fontSize: "0.82rem", color: "#8a7a70", fontStyle: "italic", lineHeight: 1.7 }}>"{m.quote}"</div>
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
            <div style={{ fontSize: "0.65rem", letterSpacing: "4px", textTransform: "uppercase", background: "linear-gradient(90deg,#e63232,#f0a030)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "1rem" }}>Where We Study</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3rem", background: "linear-gradient(135deg, #ffffff, #c8b0a8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "2px" }}>FUTURE INSTITUTE OF TECHNOLOGY.</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            <div style={{ background: "linear-gradient(135deg, rgba(196,30,30,0.08), rgba(240,160,48,0.04))", border: "1px solid rgba(196,30,30,0.2)", borderRadius: "12px", padding: "2.5rem" }}>
              <div style={{ fontSize: "0.6rem", letterSpacing: "2px", textTransform: "uppercase", color: "#f0a030", marginBottom: "1rem" }}>About the Institution</div>
              <p style={{ fontSize: "0.88rem", color: "#6a5e5e", lineHeight: 1.9, fontWeight: 300 }}>
                Future Institute of Technology is an engineering college in Kolkata, West Bengal, affiliated with Makaut University. Both Juhi and Arnab are pursuing their B.Tech in Computer Science & Engineering — and it is here that ShipSense went from a shared idea to a live, deployed platform.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { icon: "📍", label: "Location", value: "Boral, Kolkata, West Bengal" },
                { icon: "🎓", label: "Affiliation", value: "Makaut University" },
                { icon: "💻", label: "Department", value: "Computer Science & Engineering" },
              ].map((d, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "1.2rem", padding: "1.2rem 1.5rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px" }}>
                  <div style={{ fontSize: "1.5rem" }}>{d.icon}</div>
                  <div>
                    <div style={{ fontSize: "0.58rem", color: "#444", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "2px" }}>{d.label}</div>
                    <div style={{ fontSize: "0.78rem", color: "#6a5e5e" }}>{d.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* STATS */}
      <div style={{ background: "#050408", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
        {[
          { val: "2", unit: "", label: "Developers" },
          { val: "6", unit: "+", label: "Months" },
          { val: "10", unit: "+", label: "Pages Built" },
          { val: "1", unit: "", label: "Platform" },
        ].map((s, i) => (
          <div key={i} style={{ padding: "3rem", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "4rem", letterSpacing: "2px", lineHeight: 1 }}>
              <span style={{ background: "linear-gradient(135deg, #ffffff, #c8b0a8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.val}</span>
              <span style={{ background: "linear-gradient(135deg, #e63232, #f0a030)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.unit}</span>
            </div>
            <div style={{ fontSize: "0.65rem", letterSpacing: "3px", textTransform: "uppercase", color: "#444", marginTop: "0.5rem" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section style={{ padding: "7rem 4rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(196,30,30,0.15) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 0, animation: "pulseOrb 5s ease-in-out infinite" }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ fontSize: "0.65rem", letterSpacing: "4px", textTransform: "uppercase", background: "linear-gradient(90deg,#e63232,#f0a030)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "1rem" }}>Get In Touch</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3.5rem", background: "linear-gradient(135deg, #ffffff, #c8b0a8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "2px", marginBottom: "1.2rem" }}>
            WANT TO CONNECT?
          </h2>
          <p style={{ fontSize: "0.95rem", color: "#6a5e5e", lineHeight: 1.9, maxWidth: "520px", margin: "0 auto 2.5rem", fontWeight: 300 }}>
            Open to feedback, collaboration, and conversation. ShipSense is being built in the open — reach out to the team or explore the codebase on GitHub.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <button style={{ background: "linear-gradient(135deg, #e63232, #f0a030)", color: "#fff", border: "none", padding: "1rem 2.5rem", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px", ...hover }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05) translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(230,50,50,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >CONTACT US</button>
            <button style={{ background: "transparent", color: "#6a5e5e", border: "1px solid rgba(255,255,255,0.08)", padding: "1rem 2rem", fontSize: "0.82rem", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px", ...hover }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(240,160,48,0.4)"; e.currentTarget.style.color = "#f0a030"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#6a5e5e"; }}
            >VIEW ON GITHUB</button>
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