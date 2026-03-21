import { useState, useEffect, useRef } from "react";
import AdminNavbarLight from "../Components/AdminNavbarLight";
import AdminSidebarLight from "../Components/AdminSidebarLight";

const API = "http://localhost:5000/api/reports";

const C = {
  bg: "#faf6f0", bgDeep: "#f3ede4", bgCard: "rgba(255,250,245,0.85)",
  rose: "#c9848a", gold: "#c4a35a",
  ink: "#2e2218", inkMid: "#6b5744", inkLight: "#a8917a", inkFaint: "#d6c9bc",
  border: "rgba(196,163,90,0.2)", borderRose: "rgba(201,132,138,0.25)",
  roseLight: "rgba(201,132,138,0.12)", goldLight: "rgba(196,163,90,0.12)",
  roseDark: "#a86870", goldDark: "#a0834a",
};
const font = { heading: "'Cormorant Garamond', serif", body: "'DM Sans', sans-serif" };

const STATUS_CFG = {
  "On Time":    { color: "#a0834a", glow: "rgba(160,131,74,0.3)",  track: "rgba(196,163,90,0.15)"  },
  "Delayed":    { color: "#a86870", glow: "rgba(168,104,112,0.3)", track: "rgba(201,132,138,0.15)" },
  "In Transit": { color: "#8a7060", glow: "rgba(138,112,96,0.3)",  track: "rgba(138,112,96,0.12)"  },
  "Delivered":  { color: "#6b8a6a", glow: "rgba(107,138,106,0.3)", track: "rgba(107,138,106,0.12)" },
};

function RingChart({ pct, color, glow, size = 80, stroke = 8 }) {
  const r    = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(196,163,90,0.15)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 5px ${glow})`, transition: "stroke-dasharray 1.2s cubic-bezier(0.34,1.2,0.64,1)" }}
      />
    </svg>
  );
}

export default function ReportsPageLight({ toggleTheme }) {
  const [hoveredWidth, setHoveredWidth] = useState(0);
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [animated, setAnimated] = useState(false);
  const barRef = useRef(null);

  useEffect(() => { fetchReports(); }, []);

  const fetchReports = async () => {
    setAnimated(false);
    try {
      setLoading(true);
      const res  = await fetch(API);
      const json = await res.json();
      if (json.success) {
        setData(json.data);
        setTimeout(() => setAnimated(true), 150);
      } else setError("Failed to load reports");
    } catch { setError("Cannot connect to server"); }
    finally { setLoading(false); }
  };

  // Bar chart
  useEffect(() => {
    if (!data || !barRef.current) return;
    const canvas = barRef.current;
    const ctx    = canvas.getContext("2d");
    const dpr    = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth || 400;
    const H = 160;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = W + "px";
    canvas.style.height = H + "px";
    ctx.scale(dpr, dpr);

    const pad    = { top: 20, bottom: 30, left: 28, right: 10 };
    const chartW = W - pad.left - pad.right;
    const chartH = H - pad.top - pad.bottom;
    const trend  = data.monthlyTrend;
    const maxVal = Math.max(...trend.map(t => t.count), 1);
    const slotW  = chartW / trend.length;
    const barW   = slotW * 0.42;
    const maxBar = Math.max(...trend.map(t => t.count));

    ctx.clearRect(0, 0, W, H);

    // Grid
    for (let i = 0; i <= 3; i++) {
      const y = pad.top + chartH - (i / 3) * chartH;
      ctx.beginPath();
      ctx.strokeStyle = i === 0 ? "rgba(196,163,90,0.2)" : "rgba(196,163,90,0.08)";
      ctx.lineWidth = 1;
      ctx.moveTo(pad.left, y);
      ctx.lineTo(W - pad.right, y);
      ctx.stroke();
      if (i > 0) {
        ctx.fillStyle = C.inkFaint;
        ctx.font = "8px DM Sans";
        ctx.textAlign = "right";
        ctx.fillText(Math.round((i / 3) * maxVal), pad.left - 4, y + 3);
      }
    }

    trend.forEach((t, i) => {
      const cx    = pad.left + i * slotW + slotW / 2;
      const x     = cx - barW / 2;
      const barH  = t.count > 0 ? Math.max((t.count / maxVal) * chartH, 6) : 0;
      const y     = pad.top + chartH - barH;
      const rad   = 3;
      const isPeak = t.count === maxBar && t.count > 0;

      if (t.count > 0) {
        const grad = ctx.createLinearGradient(x, y, x, pad.top + chartH);
        grad.addColorStop(0, isPeak ? C.rose : C.gold);
        grad.addColorStop(0.5, isPeak ? C.roseDark : C.goldDark);
        grad.addColorStop(1, "rgba(196,163,90,0.2)");

        ctx.beginPath();
        ctx.moveTo(x + rad, y);
        ctx.lineTo(x + barW - rad, y);
        ctx.quadraticCurveTo(x + barW, y, x + barW, y + rad);
        ctx.lineTo(x + barW, pad.top + chartH);
        ctx.lineTo(x, pad.top + chartH);
        ctx.lineTo(x, y + rad);
        ctx.quadraticCurveTo(x, y, x + rad, y);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.shadowColor = isPeak ? "rgba(201,132,138,0.3)" : "rgba(196,163,90,0.3)";
        ctx.shadowBlur  = 8;
        ctx.fill();
        ctx.shadowBlur  = 0;

        ctx.fillStyle = isPeak ? C.rose : C.inkLight;
        ctx.font = isPeak ? "bold 9px DM Sans" : "9px DM Sans";
        ctx.textAlign = "center";
        ctx.fillText(t.count, cx, y - 5);
      } else {
        ctx.beginPath();
        ctx.rect(x, pad.top + chartH - 2, barW, 2);
        ctx.fillStyle = "rgba(196,163,90,0.1)";
        ctx.fill();
      }

      ctx.fillStyle = C.inkFaint;
      ctx.font = "8px DM Sans";
      ctx.textAlign = "center";
      ctx.shadowBlur = 0;
      ctx.fillText(t.shortLabel, cx, H - pad.bottom + 12);
    });
  }, [data]);

  const total       = data?.statusBreakdown.reduce((s, i) => s + i.count, 0) || 0;
  const maxSupplier = data ? Math.max(...data.topSuppliers.map(s => s.total), 1) : 1;
  const maxDelay    = data ? Math.max(...data.delayReasons.map(d => d.count), 1) : 1;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: C.bg, color: C.ink, fontFamily: font.body }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=DM+Sans:wght@300;400;500;600&family=Dancing+Script:wght@600&display=swap');

        @keyframes pulseOrb  { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.1);opacity:0.7} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes gradFlow  { 0%{background-position:0%} 100%{background-position:200%} }
        @keyframes spin      { to{transform:rotate(360deg)} }
        @keyframes shimmer   { 0%{background-position:200% center} 100%{background-position:-200% center} }

        .fade-up-rl   { animation: fadeUp 0.5s ease forwards; }
        .fade-up-rl-1 { animation: fadeUp 0.5s 0.06s ease forwards; opacity:0; }
        .fade-up-rl-2 { animation: fadeUp 0.5s 0.12s ease forwards; opacity:0; }
        .fade-up-rl-3 { animation: fadeUp 0.5s 0.18s ease forwards; opacity:0; }
        .fade-up-rl-4 { animation: fadeUp 0.5s 0.24s ease forwards; opacity:0; }

        .bento-l {
          background: ${C.bgCard};
          border: 1px solid ${C.border};
          border-radius: 16px; overflow: hidden; position: relative;
          box-shadow: 0 4px 20px rgba(196,163,90,0.08);
          transition: transform 0.25s cubic-bezier(0.34,1.2,0.64,1),
                      box-shadow 0.25s, border-color 0.25s;
        }
        .bento-l:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(201,132,138,0.12);
          border-color: ${C.borderRose};
        }
        .bento-top-l {
          height: 2px;
          background: linear-gradient(90deg,${C.rose},${C.gold},${C.rose});
          background-size: 200%;
          animation: gradFlow 3s linear infinite;
        }

        .stat-hero-l {
          background: linear-gradient(135deg, rgba(201,132,138,0.1), rgba(196,163,90,0.06));
          border: 1px solid ${C.borderRose};
          border-radius: 16px; padding: 1.6rem;
          position: relative; overflow: hidden;
          box-shadow: 0 6px 28px rgba(201,132,138,0.1);
          transition: transform 0.25s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.25s;
        }
        .stat-hero-l:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(201,132,138,0.18);
        }

        .stat-accent-l {
          background: ${C.bgCard};
          border: 1px solid ${C.border};
          border-radius: 16px; padding: 1.4rem 1.6rem;
          position: relative; overflow: hidden;
          box-shadow: 0 3px 14px rgba(196,163,90,0.07);
          transition: transform 0.25s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.25s;
        }
        .stat-accent-l:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 32px rgba(201,132,138,0.12);
          border-color: ${C.borderRose};
        }

        .bar-fill-l {
          height: 100%; border-radius: 999px;
          transition: width 1.2s cubic-bezier(0.34,1.2,0.64,1);
          position: relative; overflow: hidden;
        }
        .bar-fill-l::after {
          content: ''; position: absolute; top:0; left:-100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shimmer 2.5s ease infinite;
        }

        .trow-l { transition: background 0.2s, padding-left 0.2s; border-radius: 8px; }
        .trow-l:hover { background: ${C.roseLight}; padding-left: 6px; }

        .refresh-btn-l {
          background: transparent; color: ${C.rose};
          border: 1px solid rgba(201,132,138,0.4);
          padding: 10px 22px; border-radius: 8px;
          font-size: 0.78rem; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; cursor: pointer;
          transition: all 0.25s; display: flex; align-items: center; gap: 8px;
          font-family: ${font.body};
        }
        .refresh-btn-l:hover {
          background: ${C.roseLight};
          border-color: ${C.borderRose};
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(201,132,138,0.2);
        }

        .spinner-rl {
          width: 32px; height: 32px;
          border: 2px solid rgba(201,132,138,0.2);
          border-top-color: ${C.rose}; border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,132,138,0.3); border-radius: 4px; }
      `}</style>

      <AdminNavbarLight toggleTheme={toggleTheme} pageTitle="Reports" pageSubtitle="Analytics & Insights" />

      <div style={{ display: "flex", flex: 1 }}>
        <AdminSidebarLight hoveredWidth={hoveredWidth} setHoveredWidth={setHoveredWidth} />

        <div style={{ marginLeft: `${68 + hoveredWidth}px`, flex: 1, padding: "2rem 2.5rem", transition: "margin-left 0.28s cubic-bezier(0.4,0,0.2,1)", position: "relative", minHeight: "calc(100vh - 64px)" }}>

          {/* ORBS */}
          <div style={{ position: "fixed", top: "-100px", right: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: `radial-gradient(circle,rgba(201,132,138,0.12),transparent 70%)`, animation: "pulseOrb 6s ease-in-out infinite", pointerEvents: "none", zIndex: 0 }} />
          <div style={{ position: "fixed", bottom: "-150px", left: "5%", width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(circle,rgba(196,163,90,0.08),transparent 70%)`, animation: "pulseOrb 8s ease-in-out infinite reverse", pointerEvents: "none", zIndex: 0 }} />

          {/* PAGE HEADER */}
          <div className="fade-up-rl" style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", position: "relative", zIndex: 1 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <div style={{ width: "24px", height: "2px", background: `linear-gradient(90deg,${C.rose},${C.gold})`, borderRadius: "2px" }} />
                <span style={{ fontSize: "0.6rem", letterSpacing: "4px", textTransform: "uppercase", background: `linear-gradient(90deg,${C.rose},${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 700, fontFamily: font.body }}>Analytics</span>
              </div>
              <h1 style={{ fontFamily: font.heading, fontSize: "2.8rem", fontWeight: 600, color: C.ink, letterSpacing: "1px", lineHeight: 1, margin: 0 }}>Reports</h1>
              <div style={{ fontSize: "0.76rem", color: C.inkLight, marginTop: "6px", fontFamily: font.body }}>
                Live data · {data ? `${total} shipments tracked` : "Fetching..."}
              </div>
            </div>
            <button className="refresh-btn-l" onClick={fetchReports}>↻ Refresh</button>
          </div>

          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "50vh", gap: "1.2rem", position: "relative", zIndex: 1 }}>
              <div className="spinner-rl" />
              <div style={{ color: C.inkLight, fontSize: "0.84rem", fontFamily: font.body }}>Loading analytics...</div>
            </div>
          ) : error ? (
            <div style={{ textAlign: "center", padding: "5rem", position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚠️</div>
              <div style={{ color: C.rose, fontSize: "0.88rem", marginBottom: "1.2rem", fontFamily: font.body }}>{error}</div>
              <button className="refresh-btn-l" style={{ margin: "0 auto" }} onClick={fetchReports}>Try Again</button>
            </div>
          ) : data && (
            <>
              {/* ══ ROW 1 — Hero + 3 accent cards ══ */}
              <div className="fade-up-rl-1" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1fr", gap: "14px", marginBottom: "14px", position: "relative", zIndex: 1 }}>

                {/* HERO */}
                <div className="stat-hero-l">
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg,${C.rose},${C.gold},${C.rose})`, backgroundSize: "200%", animation: "gradFlow 3s linear infinite" }} />
                  <div style={{ position: "absolute", bottom: "-20px", right: "-20px", width: "120px", height: "120px", borderRadius: "50%", background: `radial-gradient(circle,rgba(201,132,138,0.15),transparent 70%)`, pointerEvents: "none" }} />
                  <div style={{ fontSize: "0.6rem", letterSpacing: "3px", textTransform: "uppercase", color: C.inkLight, marginBottom: "12px", fontWeight: 700, fontFamily: font.body }}>Total Shipments</div>
                  <div style={{ fontFamily: font.heading, fontSize: "4rem", fontWeight: 600, background: `linear-gradient(135deg,${C.ink},${C.rose})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1, marginBottom: "8px" }}>{data.summary.totalShipments}</div>
                  <div style={{ fontSize: "0.72rem", color: C.inkLight, fontFamily: font.body }}>all time</div>
                  <div style={{ marginTop: "16px", height: "1px", background: `linear-gradient(90deg,${C.borderRose},transparent)` }} />
                  <div style={{ marginTop: "12px", display: "flex", gap: "16px" }}>
                    {[
                      { label: "On Time",    value: data.summary.totalOnTime,    color: C.gold },
                      { label: "Delayed",    value: data.summary.totalDelayed,   color: C.rose },
                      { label: "In Transit", value: data.statusBreakdown.find(s => s._id === "In Transit")?.count || 0, color: C.inkMid },
                    ].map((item, i) => (
                      <div key={i}>
                        <div style={{ fontSize: "0.56rem", letterSpacing: "1.5px", textTransform: "uppercase", color: C.inkFaint, marginBottom: "3px", fontFamily: font.body }}>{item.label}</div>
                        <div style={{ fontFamily: font.heading, fontSize: "1.4rem", fontWeight: 600, color: item.color }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* On Time Rate */}
                <div className="stat-accent-l">
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg,${C.rose},${C.gold},${C.rose})`, backgroundSize: "200%", animation: "gradFlow 3s linear infinite" }} />
                  <div style={{ fontSize: "0.6rem", letterSpacing: "2.5px", textTransform: "uppercase", color: C.inkFaint, marginBottom: "12px", fontWeight: 700, fontFamily: font.body }}>On Time Rate</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      <RingChart pct={animated ? data.summary.onTimeRate : 0} color={C.gold} glow="rgba(196,163,90,0.4)" size={72} stroke={7} />
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: C.goldDark, fontFamily: font.body }}>{data.summary.onTimeRate}%</span>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontFamily: font.heading, fontSize: "2rem", fontWeight: 600, color: C.goldDark, lineHeight: 1 }}>{data.summary.onTimeRate}%</div>
                      <div style={{ fontSize: "0.68rem", color: C.inkLight, marginTop: "4px", fontFamily: font.body }}>{data.summary.totalOnTime} on time</div>
                    </div>
                  </div>
                </div>

                {/* Delays */}
                <div className="stat-accent-l">
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg,${C.rose},${C.gold},${C.rose})`, backgroundSize: "200%", animation: "gradFlow 3s linear infinite" }} />
                  <div style={{ fontSize: "0.6rem", letterSpacing: "2.5px", textTransform: "uppercase", color: C.inkFaint, marginBottom: "12px", fontWeight: 700, fontFamily: font.body }}>Total Delays</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      <RingChart pct={animated ? (total > 0 ? (data.summary.totalDelayed / total) * 100 : 0) : 0} color={C.rose} glow="rgba(201,132,138,0.4)" size={72} stroke={7} />
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: C.roseDark, fontFamily: font.body }}>{total > 0 ? Math.round((data.summary.totalDelayed / total) * 100) : 0}%</span>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontFamily: font.heading, fontSize: "2rem", fontWeight: 600, color: C.roseDark, lineHeight: 1 }}>{data.summary.totalDelayed}</div>
                      <div style={{ fontSize: "0.68rem", color: C.inkLight, marginTop: "4px", fontFamily: font.body }}>delayed shipments</div>
                    </div>
                  </div>
                </div>

                {/* Active Users */}
                <div className="stat-accent-l">
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg,${C.rose},${C.gold},${C.rose})`, backgroundSize: "200%", animation: "gradFlow 3s linear infinite" }} />
                  <div style={{ fontSize: "0.6rem", letterSpacing: "2.5px", textTransform: "uppercase", color: C.inkFaint, marginBottom: "12px", fontWeight: 700, fontFamily: font.body }}>Active Users</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      <RingChart pct={animated ? (data.summary.totalUsers > 0 ? (data.summary.activeUsers / data.summary.totalUsers) * 100 : 0) : 0} color={C.inkMid} glow="rgba(107,87,68,0.3)" size={72} stroke={7} />
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: C.inkMid, fontFamily: font.body }}>{data.summary.activeUsers}</span>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontFamily: font.heading, fontSize: "2rem", fontWeight: 600, color: C.inkMid, lineHeight: 1 }}>{data.summary.activeUsers}</div>
                      <div style={{ fontSize: "0.68rem", color: C.inkLight, marginTop: "4px", fontFamily: font.body }}>of {data.summary.totalUsers} total</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ══ ROW 2 — Status rings + Bar chart ══ */}
              <div className="fade-up-rl-2" style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: "14px", marginBottom: "14px", position: "relative", zIndex: 1 }}>

                {/* Status Breakdown */}
                <div className="bento-l">
                  <div className="bento-top-l" />
                  <div style={{ padding: "1.4rem 1.6rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <div style={{ width: "3px", height: "14px", background: `linear-gradient(to bottom,${C.rose},${C.gold})`, borderRadius: "2px" }} />
                      <div style={{ fontSize: "0.62rem", letterSpacing: "2.5px", textTransform: "uppercase", color: C.inkFaint, fontWeight: 700, fontFamily: font.body }}>Status Breakdown</div>
                    </div>
                    <div style={{ fontSize: "0.72rem", color: C.inkLight, marginBottom: "1.4rem", fontFamily: font.body }}>Shipment distribution by status</div>

                    {/* Big center number */}
                    <div style={{ textAlign: "center", marginBottom: "1.4rem", padding: "1rem", background: C.bgDeep, borderRadius: "10px", border: `1px solid ${C.border}` }}>
                      <div style={{ fontFamily: font.heading, fontSize: "3.5rem", fontWeight: 600, background: `linear-gradient(135deg,${C.ink},${C.rose})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>{total}</div>
                      <div style={{ fontSize: "0.62rem", color: C.inkFaint, letterSpacing: "2px", textTransform: "uppercase", marginTop: "4px", fontFamily: font.body }}>Total Shipments</div>
                    </div>

                    {/* Rings grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      {(() => {
                        const order = ["On Time","Delayed","In Transit","Delivered"];
                        const allStatuses = [...data.statusBreakdown];
                        order.forEach(s => { if (!allStatuses.find(x => x._id === s)) allStatuses.push({ _id: s, count: 0 }); });
                        return order.map(name => {
                          const item = allStatuses.find(x => x._id === name) || { _id: name, count: 0 };
                          const pct  = total > 0 ? (item.count / total) * 100 : 0;
                          const cfg  = STATUS_CFG[name] || { color: C.inkLight, glow: "transparent" };
                          return (
                            <div key={name} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 10px", background: C.bgDeep, borderRadius: "10px", border: `1px solid ${C.border}` }}>
                              <div style={{ position: "relative", flexShrink: 0 }}>
                                <RingChart pct={animated ? pct : 0} color={cfg.color} glow={cfg.glow} size={48} stroke={5} />
                                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <span style={{ fontSize: "0.62rem", fontWeight: 700, color: cfg.color, fontFamily: font.body }}>{item.count}</span>
                                </div>
                              </div>
                              <div>
                                <div style={{ fontSize: "0.74rem", color: C.inkMid, fontWeight: 600, marginBottom: "2px", fontFamily: font.body }}>{name}</div>
                                <div style={{ fontSize: "0.62rem", color: C.inkFaint, fontFamily: font.body }}>{Math.round(pct)}%</div>
                              </div>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>
                </div>

                {/* Bar Chart */}
                <div className="bento-l">
                  <div className="bento-top-l" />
                  <div style={{ padding: "1.4rem 1.6rem 0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                          <div style={{ width: "3px", height: "14px", background: `linear-gradient(to bottom,${C.rose},${C.gold})`, borderRadius: "2px" }} />
                          <div style={{ fontSize: "0.62rem", letterSpacing: "2.5px", textTransform: "uppercase", color: C.inkFaint, fontWeight: 700, fontFamily: font.body }}>Monthly Trend</div>
                        </div>
                        <div style={{ fontSize: "0.72rem", color: C.inkLight, fontFamily: font.body }}>Shipments created — last 6 months</div>
                      </div>
                      {(() => {
                        const peak = data.monthlyTrend.reduce((a, b) => b.count > a.count ? b : a, { count: 0, shortLabel: "—" });
                        return peak.count > 0 ? (
                          <div style={{ padding: "4px 10px", borderRadius: "6px", background: C.roseLight, border: `1px solid ${C.borderRose}`, fontSize: "0.62rem", color: C.rose, fontWeight: 700, letterSpacing: "1px", fontFamily: font.body }}>
                            PEAK · {peak.shortLabel} · {peak.count}
                          </div>
                        ) : null;
                      })()}
                    </div>
                  </div>
                  <div style={{ padding: "0.5rem 1rem 0.5rem" }}>
                    <canvas ref={barRef} style={{ width: "100%", display: "block" }} />
                  </div>
                  <div style={{ padding: "0 1.6rem 1.2rem", display: "flex", gap: "16px", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{ width: "14px", height: "4px", borderRadius: "2px", background: `linear-gradient(90deg,${C.rose},${C.gold})` }} />
                      <span style={{ fontSize: "0.66rem", color: C.inkFaint, fontFamily: font.body }}>Shipments</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: C.rose, boxShadow: `0 0 5px rgba(201,132,138,0.5)` }} />
                      <span style={{ fontSize: "0.66rem", color: C.inkFaint, fontFamily: font.body }}>Peak month</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ══ ROW 3 — Suppliers + Delays + Mini stats ══ */}
              <div className="fade-up-rl-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 240px", gap: "14px", position: "relative", zIndex: 1 }}>

                {/* Top Suppliers */}
                <div className="bento-l">
                  <div className="bento-top-l" />
                  <div style={{ padding: "1.4rem 1.6rem 0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <div style={{ width: "3px", height: "14px", background: `linear-gradient(to bottom,${C.rose},${C.gold})`, borderRadius: "2px" }} />
                      <div style={{ fontSize: "0.62rem", letterSpacing: "2.5px", textTransform: "uppercase", color: C.inkFaint, fontWeight: 700, fontFamily: font.body }}>Top Suppliers</div>
                    </div>
                    <div style={{ fontSize: "0.72rem", color: C.inkLight, marginBottom: "1rem", fontFamily: font.body }}>Ranked by shipment volume</div>
                  </div>
                  <div style={{ padding: "0 1.6rem 1.4rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 48px 52px 52px", padding: "5px 8px", background: C.bgDeep, borderRadius: "6px", marginBottom: "4px" }}>
                      {["Supplier","Vol","✓","✕"].map((h,j) => (
                        <div key={j} style={{ fontSize: "0.56rem", letterSpacing: "1.5px", textTransform: "uppercase", color: C.inkFaint, fontWeight: 700, textAlign: j === 0 ? "left" : "center", fontFamily: font.body }}>{h}</div>
                      ))}
                    </div>
                    {data.topSuppliers.length === 0 ? (
                      <div style={{ color: C.inkLight, fontSize: "0.78rem", padding: "1.5rem 0", textAlign: "center", fontFamily: font.body }}>No data yet</div>
                    ) : data.topSuppliers.map((s, i) => {
                      const pct = (s.total / maxSupplier) * 100;
                      return (
                        <div key={i} className="trow-l" style={{ padding: "9px 8px", borderBottom: i < data.topSuppliers.length - 1 ? `1px solid ${C.border}` : "none" }}>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 48px 52px 52px", alignItems: "center", marginBottom: "5px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <div style={{ width: "16px", height: "16px", borderRadius: "4px", background: i === 0 ? `linear-gradient(135deg,${C.rose},${C.gold})` : C.bgDeep, border: i === 0 ? "none" : `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.58rem", color: i === 0 ? "#fff" : C.inkFaint, fontWeight: 800, flexShrink: 0, fontFamily: font.body }}>
                                {i + 1}
                              </div>
                              <span style={{ fontSize: "0.8rem", color: C.inkMid, fontWeight: 500, fontFamily: font.body }}>{s._id}</span>
                            </div>
                            <div style={{ fontSize: "0.88rem", color: C.roseDark, fontWeight: 700, textAlign: "center", fontFamily: font.heading, fontStyle: "italic" }}>{s.total}</div>
                            <div style={{ fontSize: "0.8rem", color: C.goldDark, fontWeight: 600, textAlign: "center", fontFamily: font.body }}>{s.onTime}</div>
                            <div style={{ fontSize: "0.8rem", color: C.roseDark, fontWeight: 600, textAlign: "center", fontFamily: font.body }}>{s.delayed}</div>
                          </div>
                          <div style={{ height: "3px", background: C.bgDeep, borderRadius: "999px", overflow: "hidden", marginLeft: "24px", border: `1px solid ${C.border}` }}>
                            <div className="bar-fill-l" style={{ width: animated ? `${pct}%` : "0%", background: i === 0 ? `linear-gradient(90deg,${C.rose},${C.gold})` : `linear-gradient(90deg,rgba(201,132,138,0.6),rgba(196,163,90,0.4))`, transition: `width 1s cubic-bezier(0.34,1.2,0.64,1) ${i * 0.08}s` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Delay Reasons */}
                <div className="bento-l">
                  <div className="bento-top-l" />
                  <div style={{ padding: "1.4rem 1.6rem 0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <div style={{ width: "3px", height: "14px", background: `linear-gradient(to bottom,${C.rose},${C.roseDark})`, borderRadius: "2px" }} />
                      <div style={{ fontSize: "0.62rem", letterSpacing: "2.5px", textTransform: "uppercase", color: C.inkFaint, fontWeight: 700, fontFamily: font.body }}>Delay Reasons</div>
                    </div>
                    <div style={{ fontSize: "0.72rem", color: C.inkLight, marginBottom: "1rem", fontFamily: font.body }}>Root causes of shipment delays</div>
                  </div>
                  <div style={{ padding: "0 1.6rem 1.4rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 48px 76px", padding: "5px 8px", background: C.bgDeep, borderRadius: "6px", marginBottom: "4px" }}>
                      {["Reason","Count","Avg Time"].map((h,j) => (
                        <div key={j} style={{ fontSize: "0.56rem", letterSpacing: "1.5px", textTransform: "uppercase", color: C.inkFaint, fontWeight: 700, textAlign: j === 0 ? "left" : "center", fontFamily: font.body }}>{h}</div>
                      ))}
                    </div>
                    {data.delayReasons.length === 0 ? (
                      <div style={{ color: C.inkLight, fontSize: "0.78rem", padding: "1.5rem 0", textAlign: "center", fontFamily: font.body }}>🎉 No delays recorded!</div>
                    ) : data.delayReasons.map((d, i) => {
                      const pct = (d.count / maxDelay) * 100;
                      return (
                        <div key={i} className="trow-l" style={{ padding: "9px 8px", borderBottom: i < data.delayReasons.length - 1 ? `1px solid ${C.border}` : "none" }}>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 48px 76px", alignItems: "center", marginBottom: "5px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.rose, boxShadow: `0 0 5px rgba(201,132,138,0.4)`, flexShrink: 0 }} />
                              <span style={{ fontSize: "0.8rem", color: C.inkMid, fontWeight: 500, fontFamily: font.body }}>{d._id}</span>
                            </div>
                            <div style={{ fontSize: "0.88rem", color: C.roseDark, fontWeight: 700, textAlign: "center", fontFamily: font.heading, fontStyle: "italic" }}>{d.count}</div>
                            <div style={{ fontSize: "0.76rem", color: C.goldDark, fontWeight: 600, textAlign: "center", fontFamily: font.body }}>{Math.round(d.avgHours)}h avg</div>
                          </div>
                          <div style={{ height: "3px", background: C.bgDeep, borderRadius: "999px", overflow: "hidden", marginLeft: "14px", border: `1px solid ${C.border}` }}>
                            <div className="bar-fill-l" style={{ width: animated ? `${pct}%` : "0%", background: `linear-gradient(90deg,${C.rose},${C.gold})`, transition: `width 1s cubic-bezier(0.34,1.2,0.64,1) ${i * 0.08}s` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Mini stat stack */}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {[
                    { label: "Delay Codes",    value: data.summary.totalDelayCodes,  sub: `${data.summary.activeDelayCodes} active`, color: C.goldDark, icon: "🏷️" },
                    { label: "Delivered",       value: data.statusBreakdown.find(s => s._id === "Delivered")?.count || 0, sub: "completed", color: "#6b8a6a", icon: "✅" },
                    { label: "Inactive Users",  value: data.summary.totalUsers - data.summary.activeUsers, sub: "accounts paused", color: C.roseDark, icon: "🔒" },
                  ].map((card, i) => (
                    <div key={i} className="stat-accent-l" style={{ flex: 1 }}>
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg,${C.rose},${C.gold},${C.rose})`, backgroundSize: "200%", animation: "gradFlow 3s linear infinite" }} />
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontSize: "0.58rem", letterSpacing: "2px", textTransform: "uppercase", color: C.inkFaint, marginBottom: "6px", fontWeight: 700, fontFamily: font.body }}>{card.label}</div>
                          <div style={{ fontFamily: font.heading, fontSize: "2rem", fontWeight: 600, color: card.color, lineHeight: 1 }}>{card.value}</div>
                          <div style={{ fontSize: "0.64rem", color: C.inkLight, marginTop: "3px", fontFamily: font.body }}>{card.sub}</div>
                        </div>
                        <div style={{ fontSize: "1.4rem" }}>{card.icon}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}