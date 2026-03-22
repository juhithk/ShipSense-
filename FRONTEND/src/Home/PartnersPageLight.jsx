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
  sageLight: "rgba(138,158,122,0.15)",
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

export default function PartnersPageLight({ toggleTheme }) {
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

  const carriers = [
    { icon: "🚢", name: "Maersk Line", type: "Ocean Freight", route: "Asia ↔ Europe ↔ Americas" },
    { icon: "✈️", name: "DHL Express", type: "Air Freight", route: "Global — 220+ Countries" },
    { icon: "🚛", name: "DB Schenker", type: "Road & Rail", route: "Europe ↔ Asia Landbridge" },
    { icon: "🚢", name: "MSC", type: "Ocean Freight", route: "Mediterranean ↔ Global" },
    { icon: "✈️", name: "FedEx Freight", type: "Air & Ground", route: "Americas ↔ Asia Pacific" },
  ];

  const ports = [
    { icon: "🏗️", name: "Port of Singapore", country: "Singapore", teu: "37M TEU" },
    { icon: "🏗️", name: "Port of Rotterdam", country: "Netherlands", teu: "15M TEU" },
    { icon: "🏗️", name: "Jawaharlal Nehru Port", country: "India", teu: "6M TEU" },
    { icon: "🏗️", name: "Dubai Ports World", country: "UAE", teu: "10M TEU" },
    { icon: "🏗️", name: "Port of Felixstowe", country: "United Kingdom", teu: "4M TEU" },
  ];

  const techPartners = [
    { icon: "☁️", name: "MongoDB Atlas", function: "Cloud Database", type: "Core Infrastructure" },
    { icon: "🌦️", name: "Tomorrow.io", function: "Weather Intelligence", type: "ETA Prediction Input" },
    { icon: "🗺️", name: "Google Maps Platform", function: "Route Mapping", type: "Live Tracking Layer" },
    { icon: "📊", name: "Recharts", function: "Data Visualisation", type: "Dashboard Layer" },
    { icon: "🔐", name: "Auth0", function: "Identity & Access", type: "Authentication Layer" },
  ];

  const ecosystem = [
    { icon: "🏭", name: "SAP Logistics", category: "ERP", useCase: "Shipment data sync" },
    { icon: "🔗", name: "Oracle SCM", category: "Supply Chain", useCase: "Order management" },
    { icon: "📦", name: "Flexport", category: "Digital Freight", useCase: "Freight forwarding data" },
    { icon: "🌐", name: "Project44", category: "Visibility Platform", useCase: "Multi-modal tracking" },
    { icon: "📋", name: "Descartes", category: "Compliance", useCase: "Customs documentation" },
  ];

  const tradeLanes = [
    { icon: "🌏", route: "Asia → Europe", via: "Via Suez Canal", distance: "22,000km", days: "Avg 28 days" },
    { icon: "🌎", route: "Asia → North America", via: "Trans-Pacific", distance: "18,000km", days: "Avg 20 days" },
    { icon: "🌍", route: "Middle East → Europe", via: "Via Red Sea", distance: "8,000km", days: "Avg 12 days" },
    { icon: "🌏", route: "India → Southeast Asia", via: "Bay of Bengal", distance: "4,500km", days: "Avg 8 days" },
    { icon: "🌎", route: "Europe → Americas", via: "Trans-Atlantic", distance: "9,000km", days: "Avg 14 days" },
  ];

  const partnerReasons = [
    { num: "01", title: "Data Integration", desc: "Connect your systems to ShipSense and give your clients real-time visibility into every shipment you handle. Our open API makes integration straightforward for carriers and tech platforms alike." },
    { num: "02", title: "Shared Intelligence", desc: "Partners gain access to ShipSense's aggregated delay intelligence — anonymised route performance data, seasonal delay patterns, and carrier benchmarking — helping everyone in the network improve." },
    { num: "03", title: "Brand Visibility", desc: "ShipSense partners are featured across our platform, documentation, and customer-facing materials — putting your brand in front of supply chain decision-makers across 50+ countries." },
  ];

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: font.body, overflowX: "hidden" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500;600&family=Dancing+Script:wght@600&display=swap');
        @keyframes pulseR { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
        @keyframes pulseOrb { 0%, 100% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -50%) scale(1.15); } }
        @keyframes floatBg { 0%, 100% { transform: translate(-50%, -50%) translateY(0px); } 50% { transform: translate(-50%, -50%) translateY(-20px); } }
        @keyframes scrollX { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .light-nav-link { color: ${C.inkLight}; text-decoration: none; font-size: 0.78rem; letter-spacing: 1.5px; text-transform: uppercase; transition: color 0.2s; font-family: ${font.body}; font-weight: 500; }
        .light-nav-link:hover { color: ${C.rose}; }
        .light-nav-link.active { color: ${C.rose}; border-bottom: 1px solid ${C.rose}; padding-bottom: 2px; }
        .light-footer-link { font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase; color: ${C.inkFaint}; text-decoration: none; transition: color 0.2s; font-family: ${font.body}; }
        .light-footer-link:hover { color: ${C.rose}; }
        .hover-row { transition: all 0.25s; }
        .hover-row:hover { transform: translateX(6px) !important; border-color: ${C.rose} !important; box-shadow: 0 4px 20px rgba(201,132,138,0.1) !important; }
        .hover-card { transition: all 0.25s; }
        .hover-card:hover { transform: translateY(-4px) !important; box-shadow: 0 12px 40px rgba(201,132,138,0.12) !important; border-color: ${C.rose} !important; }
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
                className={`light-nav-link${l.label === "Partners" ? " active" : ""}`}
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
        <div style={{ position: "absolute", fontSize: "16vw", fontFamily: font.cursive, fontWeight: 600, color: "transparent", WebkitTextStroke: `1px rgba(201,132,138,0.07)`, userSelect: "none", top: "50%", left: "50%", transform: "translate(-50%,-50%)", whiteSpace: "nowrap", zIndex: 0, animation: "floatBg 8s ease-in-out infinite" }}>Partners</div>

        <div style={{ position: "relative", zIndex: 2, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.9s ease, transform 0.9s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.8rem", marginBottom: "2rem", padding: "0.4rem 1.2rem", border: `1px solid ${C.borderRose}`, borderRadius: "999px", background: C.roseLight }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.rose, display: "inline-block", animation: "pulseR 2s infinite" }} />
            <span style={{ fontSize: "0.7rem", letterSpacing: "3px", textTransform: "uppercase", color: C.rose, fontFamily: font.body, fontWeight: 500 }}>Our Partners</span>
          </div>
          <h1 style={{ fontFamily: font.heading, fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 1, marginBottom: "1.5rem", fontWeight: 600, color: C.ink }}>
            Built on Trust.<br />
            <span style={{ fontStyle: "italic", background: `linear-gradient(135deg, ${C.rose}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Powered by Collaboration.</span>
          </h1>
          <p style={{ fontSize: "1rem", color: C.inkMid, lineHeight: 1.9, maxWidth: "650px", margin: "0 auto", fontWeight: 300 }}>
            ShipSense works with a curated network of carriers, logistics providers, port authorities, and technology platforms — bringing together the right partnerships to deliver precision, reliability, and transparency across every shipment.
          </p>
        </div>
      </section>

      {/* WHO WE WORK WITH TAG */}
      <div style={{ textAlign: "center", padding: "2rem 4rem 0" }}>
        <div style={{ fontSize: "0.65rem", letterSpacing: "4px", textTransform: "uppercase", background: `linear-gradient(90deg,${C.rose},${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "1rem", fontFamily: font.body, fontWeight: 600 }}>Who We Work With</div>
        <h2 style={{ fontFamily: font.heading, fontSize: "3rem", fontWeight: 600, color: C.ink }}>
          The Network Behind <span style={{ fontStyle: "italic", color: C.rose }}>Every Delivery.</span>
        </h2>
      </div>

      {/* CARRIER PARTNERS */}
      <section style={{ padding: "4rem 4rem 6rem", background: C.bgDeep }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "3px", textTransform: "uppercase", color: C.gold, marginBottom: "0.8rem", fontFamily: font.body, fontWeight: 600 }}>Category 01</div>
            <h3 style={{ fontFamily: font.heading, fontSize: "2rem", fontWeight: 600, color: C.ink, marginBottom: "0.8rem" }}>Carrier Partners</h3>
            <p style={{ fontSize: "0.88rem", color: C.inkMid, lineHeight: 1.9, maxWidth: "700px", fontWeight: 300 }}>The transport backbone of ShipSense. Our carrier partners span sea, air, and road — providing real-time vessel, flight, and fleet data that powers our live tracking and ETA prediction engine.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "3rem" }}>
            {carriers.map((c, i) => (
              <div key={i} className="hover-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.2rem 1.8rem", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "8px", boxShadow: "0 2px 10px rgba(201,132,138,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                  <div style={{ fontSize: "1.8rem", width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", background: C.roseLight, borderRadius: "8px", border: `1px solid ${C.borderRose}` }}>{c.icon}</div>
                  <div>
                    <div style={{ fontFamily: font.heading, fontSize: "1.2rem", fontWeight: 600, color: C.ink }}>{c.name}</div>
                    <div style={{ fontSize: "0.72rem", color: C.inkLight, marginTop: "2px", fontFamily: font.body }}>{c.type}</div>
                  </div>
                </div>
                <div style={{ fontSize: "0.75rem", color: C.inkMid, letterSpacing: "0.5px", fontFamily: font.body }}>{c.route}</div>
                <div style={{ fontSize: "0.6rem", padding: "0.3rem 0.8rem", background: C.goldLight, border: `1px solid rgba(196,163,90,0.3)`, color: C.gold, letterSpacing: "1px", textTransform: "uppercase", fontFamily: font.body }}>Active</div>
              </div>
            ))}
          </div>

          {/* Featured Carrier */}
          <div style={{ background: `linear-gradient(135deg, rgba(201,132,138,0.08), rgba(196,163,90,0.05))`, border: `1px solid ${C.borderRose}`, borderRadius: "12px", padding: "2.5rem", boxShadow: "0 2px 20px rgba(201,132,138,0.07)" }}>
            <div style={{ fontSize: "0.6rem", letterSpacing: "3px", textTransform: "uppercase", color: C.rose, marginBottom: "0.8rem", fontFamily: font.body, fontWeight: 600 }}>Featured Carrier</div>
            <h4 style={{ fontFamily: font.heading, fontSize: "1.8rem", fontWeight: 600, color: C.ink, marginBottom: "1rem" }}>🚢 Maersk Line</h4>
            <p style={{ fontSize: "0.88rem", color: C.inkMid, lineHeight: 1.9, fontWeight: 300 }}>Maersk is the world's largest container shipping company, operating over 700 vessels across 130+ countries. Through our Maersk integration, ShipSense pulls live AIS vessel tracking data, port ETAs, and container status updates directly into the platform — giving suppliers and customers a single source of truth for ocean freight.</p>
          </div>
        </div>
      </section>

      {/* PORT & CUSTOMS AUTHORITIES */}
      <section style={{ padding: "6rem 4rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "3px", textTransform: "uppercase", color: C.gold, marginBottom: "0.8rem", fontFamily: font.body, fontWeight: 600 }}>Category 02</div>
            <h3 style={{ fontFamily: font.heading, fontSize: "2rem", fontWeight: 600, color: C.ink, marginBottom: "0.8rem" }}>Port & Customs Authorities</h3>
            <p style={{ fontSize: "0.88rem", color: C.inkMid, lineHeight: 1.9, maxWidth: "700px", fontWeight: 300 }}>Direct integrations with port authorities and customs bodies enable ShipSense to detect congestion, flag customs holds, and assign accurate delay reason codes before disruption escalates.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "1rem", marginBottom: "3rem" }}>
            {ports.map((p, i) => (
              <div key={i} className="hover-card" style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "1.5rem 1rem", textAlign: "center", boxShadow: "0 2px 10px rgba(196,163,90,0.04)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>{p.icon}</div>
                <div style={{ fontFamily: font.heading, fontSize: "0.9rem", fontWeight: 600, color: C.ink, marginBottom: "0.4rem" }}>{p.name}</div>
                <div style={{ fontSize: "0.65rem", color: C.inkLight, marginBottom: "0.6rem", fontFamily: font.body }}>{p.country}</div>
                <div style={{ fontSize: "0.6rem", padding: "0.2rem 0.5rem", background: C.goldLight, border: `1px solid rgba(196,163,90,0.3)`, color: C.gold, display: "inline-block", fontFamily: font.body }}>{p.teu}</div>
              </div>
            ))}
          </div>

          {/* Featured Port */}
          <div style={{ background: `linear-gradient(135deg, rgba(201,132,138,0.08), rgba(196,163,90,0.05))`, border: `1px solid ${C.borderRose}`, borderRadius: "12px", padding: "2.5rem", boxShadow: "0 2px 20px rgba(201,132,138,0.07)" }}>
            <div style={{ fontSize: "0.6rem", letterSpacing: "3px", textTransform: "uppercase", color: C.rose, marginBottom: "0.8rem", fontFamily: font.body, fontWeight: 600 }}>Featured Port</div>
            <h4 style={{ fontFamily: font.heading, fontSize: "1.8rem", fontWeight: 600, color: C.ink, marginBottom: "1rem" }}>🏗️ Port of Singapore</h4>
            <p style={{ fontSize: "0.88rem", color: C.inkMid, lineHeight: 1.9, fontWeight: 300 }}>The Port of Singapore is the world's second busiest port by container throughput, handling cargo from over 600 ports in 120 countries. ShipSense integrates directly with MPA Singapore's vessel traffic data to detect berth congestion in real time — automatically triggering D02 Port Congestion delay codes and updating affected ETAs before suppliers even need to ask.</p>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY PARTNERS */}
      <section style={{ padding: "6rem 4rem", background: C.bgDeep }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "3px", textTransform: "uppercase", color: C.gold, marginBottom: "0.8rem", fontFamily: font.body, fontWeight: 600 }}>Category 03</div>
            <h3 style={{ fontFamily: font.heading, fontSize: "2rem", fontWeight: 600, color: C.ink, marginBottom: "0.8rem" }}>Technology Partners</h3>
            <p style={{ fontSize: "0.88rem", color: C.inkMid, lineHeight: 1.9, maxWidth: "700px", fontWeight: 300 }}>ShipSense integrates with best-in-class technology providers for data enrichment, weather intelligence, mapping, and analytics — ensuring our platform stays ahead of every disruption.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", marginBottom: "3rem" }}>
            {techPartners.map((t, i) => (
              <div key={i} className="hover-card" style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "1.8rem", boxShadow: "0 2px 10px rgba(196,163,90,0.04)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div style={{ fontSize: "2rem" }}>{t.icon}</div>
                  <div style={{ fontSize: "0.58rem", padding: "0.2rem 0.6rem", background: C.goldLight, border: `1px solid rgba(196,163,90,0.3)`, color: C.gold, letterSpacing: "1px", textTransform: "uppercase", fontFamily: font.body }}>{t.type}</div>
                </div>
                <div style={{ fontFamily: font.heading, fontSize: "1.2rem", fontWeight: 600, color: C.ink, marginBottom: "0.4rem" }}>{t.name}</div>
                <div style={{ fontSize: "0.72rem", color: C.inkLight, fontFamily: font.body }}>{t.function}</div>
              </div>
            ))}
          </div>

          {/* Featured Tech */}
          <div style={{ background: `linear-gradient(135deg, rgba(201,132,138,0.08), rgba(196,163,90,0.05))`, border: `1px solid ${C.borderRose}`, borderRadius: "12px", padding: "2.5rem", boxShadow: "0 2px 20px rgba(201,132,138,0.07)" }}>
            <div style={{ fontSize: "0.6rem", letterSpacing: "3px", textTransform: "uppercase", color: C.rose, marginBottom: "0.8rem", fontFamily: font.body, fontWeight: 600 }}>Featured Tech Partner</div>
            <h4 style={{ fontFamily: font.heading, fontSize: "1.8rem", fontWeight: 600, color: C.ink, marginBottom: "1rem" }}>🌦️ Tomorrow.io</h4>
            <p style={{ fontSize: "0.88rem", color: C.inkMid, lineHeight: 1.9, fontWeight: 300 }}>Tomorrow.io is the world's leading weather intelligence platform, providing hyper-local, real-time weather forecasts with up to 96-hour accuracy windows. ShipSense feeds Tomorrow.io data directly into our ML prediction engine — allowing us to anticipate weather-related delays (D01) up to four days before they impact a shipment, and proactively update ETAs before carriers report any disruption.</p>
          </div>
        </div>
      </section>

      {/* SUPPLY CHAIN ECOSYSTEM */}
      <section style={{ padding: "6rem 4rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "3px", textTransform: "uppercase", color: C.gold, marginBottom: "0.8rem", fontFamily: font.body, fontWeight: 600 }}>Category 04</div>
            <h3 style={{ fontFamily: font.heading, fontSize: "2rem", fontWeight: 600, color: C.ink, marginBottom: "0.8rem" }}>Supply Chain Ecosystem</h3>
            <p style={{ fontSize: "0.88rem", color: C.inkMid, lineHeight: 1.9, maxWidth: "700px", fontWeight: 300 }}>Strategic alliances with supply chain platforms and ERP providers allow ShipSense to plug directly into existing enterprise workflows — no rip-and-replace required.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "3rem" }}>
            {ecosystem.map((e, i) => (
              <div key={i} className="hover-row" style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr 1fr", alignItems: "center", gap: "1.5rem", padding: "1.2rem 1.8rem", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "8px", boxShadow: "0 2px 10px rgba(201,132,138,0.04)" }}>
                <div style={{ fontSize: "1.8rem", textAlign: "center" }}>{e.icon}</div>
                <div style={{ fontFamily: font.heading, fontSize: "1.1rem", fontWeight: 600, color: C.ink }}>{e.name}</div>
                <div style={{ fontSize: "0.72rem", color: C.inkLight, fontFamily: font.body }}>{e.category}</div>
                <div style={{ fontSize: "0.72rem", color: C.inkMid, fontFamily: font.body }}>{e.useCase}</div>
              </div>
            ))}
          </div>

          {/* Featured Ecosystem */}
          <div style={{ background: `linear-gradient(135deg, rgba(201,132,138,0.08), rgba(196,163,90,0.05))`, border: `1px solid ${C.borderRose}`, borderRadius: "12px", padding: "2.5rem", boxShadow: "0 2px 20px rgba(201,132,138,0.07)" }}>
            <div style={{ fontSize: "0.6rem", letterSpacing: "3px", textTransform: "uppercase", color: C.rose, marginBottom: "0.8rem", fontFamily: font.body, fontWeight: 600 }}>Featured Ecosystem Partner</div>
            <h4 style={{ fontFamily: font.heading, fontSize: "1.8rem", fontWeight: 600, color: C.ink, marginBottom: "1rem" }}>📦 Flexport</h4>
            <p style={{ fontSize: "0.88rem", color: C.inkMid, lineHeight: 1.9, fontWeight: 300 }}>Flexport is a modern digital freight forwarder managing over $10 billion in annual cargo. Through our Flexport integration, ShipSense automatically ingests shipment bookings, customs documentation status, and carrier assignments — eliminating manual data entry for suppliers and ensuring every Flexport-managed shipment is tracked with full delay code intelligence from day one.</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ background: C.bgDeep, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
        {[
          { val: "20", unit: "+", label: "Carrier Partners" },
          { val: "15", unit: "+", label: "Port Integrations" },
          { val: "10", unit: "+", label: "Tech Partners" },
          { val: "50", unit: "+", label: "Countries Covered" },
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

      {/* GLOBAL REACH */}
      <section style={{ padding: "6rem 4rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "4px", textTransform: "uppercase", background: `linear-gradient(90deg,${C.rose},${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "1rem", fontFamily: font.body, fontWeight: 600 }}>Global Reach</div>
            <h2 style={{ fontFamily: font.heading, fontSize: "3rem", fontWeight: 600, color: C.ink, marginBottom: "1rem" }}>
              Spanning <span style={{ fontStyle: "italic", color: C.rose }}>Every Major Trade Route.</span>
            </h2>
            <p style={{ fontSize: "0.88rem", color: C.inkMid, lineHeight: 1.9, maxWidth: "600px", margin: "0 auto", fontWeight: 300 }}>
              From the ports of Mumbai to the terminals of Rotterdam, ShipSense's partner network covers every major global trade lane — giving your supply chain intelligence across land, sea, and air.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {tradeLanes.map((t, i) => (
              <div key={i} className="hover-row" style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr 1fr 1fr", alignItems: "center", gap: "1.5rem", padding: "1.2rem 1.8rem", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "8px", boxShadow: "0 2px 10px rgba(196,163,90,0.04)" }}>
                <div style={{ fontSize: "1.8rem", textAlign: "center" }}>{t.icon}</div>
                <div style={{ fontFamily: font.heading, fontSize: "1rem", fontWeight: 600, color: C.ink }}>{t.route}</div>
                <div style={{ fontSize: "0.72rem", color: C.inkLight, fontFamily: font.body }}>{t.via}</div>
                <div style={{ fontSize: "0.72rem", color: C.inkMid, fontFamily: font.body }}>{t.distance}</div>
                <div style={{ fontSize: "0.65rem", padding: "0.2rem 0.7rem", background: C.goldLight, border: `1px solid rgba(196,163,90,0.3)`, color: C.gold, display: "inline-block", textAlign: "center", fontFamily: font.body }}>{t.days}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BECOME A PARTNER */}
      <section style={{ padding: "6rem 4rem", background: C.bgDeep }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "4px", textTransform: "uppercase", background: `linear-gradient(90deg,${C.rose},${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "1rem", fontFamily: font.body, fontWeight: 600 }}>Partner With Us</div>
            <h2 style={{ fontFamily: font.heading, fontSize: "3rem", fontWeight: 600, color: C.ink, marginBottom: "1rem" }}>
              Want to Join the <span style={{ fontStyle: "italic", color: C.rose }}>ShipSense Network?</span>
            </h2>
            <p style={{ fontSize: "0.88rem", color: C.inkMid, lineHeight: 1.9, maxWidth: "600px", margin: "0 auto", fontWeight: 300 }}>
              Whether you're a carrier, port authority, technology provider, or logistics platform — we're always looking to expand our partner ecosystem. If your organisation values transparency, precision, and data-driven supply chain intelligence, we'd love to talk.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem", marginBottom: "4rem" }}>
            {partnerReasons.map((r, i) => (
              <div key={i} className="hover-card" style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "2rem", boxShadow: "0 2px 20px rgba(196,163,90,0.05)" }}>
                <div style={{ fontFamily: font.heading, fontSize: "3rem", fontWeight: 300, fontStyle: "italic", background: `linear-gradient(135deg, ${C.rose}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1, marginBottom: "1rem" }}>{r.num}</div>
                <h4 style={{ fontFamily: font.heading, fontSize: "1.3rem", fontWeight: 600, color: C.ink, marginBottom: "0.8rem" }}>{r.title}</h4>
                <p style={{ fontSize: "0.82rem", color: C.inkMid, lineHeight: 1.8, fontWeight: 300 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "7rem 4rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", background: `radial-gradient(circle, rgba(201,132,138,0.1) 0%, transparent 70%)`, top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 0 }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ fontSize: "0.65rem", letterSpacing: "4px", textTransform: "uppercase", background: `linear-gradient(90deg,${C.rose},${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "1rem", fontFamily: font.body, fontWeight: 600 }}>Get In Touch</div>
          <h2 style={{ fontFamily: font.heading, fontSize: "3.5rem", fontWeight: 600, color: C.ink, marginBottom: "1.2rem" }}>
            Ready to Build Something <span style={{ fontStyle: "italic", color: C.rose }}>Together?</span>
          </h2>
          <p style={{ fontSize: "0.95rem", color: C.inkMid, lineHeight: 1.9, maxWidth: "520px", margin: "0 auto 2.5rem", fontWeight: 300 }}>
            Every great supply chain is built on great partnerships. Join the ShipSense network and help us deliver certainty — every shipment, every route, every time.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <button style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.gold})`, color: "#fff", border: "none", padding: "1rem 2.5rem", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px", fontFamily: font.body, transition: "all 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05) translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 30px rgba(201,132,138,0.35)`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >Apply to Partner</button>
            <button style={{ background: "transparent", color: C.inkLight, border: `1px solid ${C.border}`, padding: "1rem 2rem", fontSize: "0.82rem", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px", fontFamily: font.body, transition: "all 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.rose; e.currentTarget.style.color = C.rose; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.inkLight; }}
            >Contact Us</button>
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