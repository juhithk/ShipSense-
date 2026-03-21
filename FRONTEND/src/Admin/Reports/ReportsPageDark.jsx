import { useState, useEffect, useRef } from "react";
import AdminNavbarDark from "../Components/AdminNavbarDark";
import AdminSidebarDark from "../Components/AdminSidebarDark";

const API = "http://localhost:5000/api/reports";

const STATUS_CFG = {
  "On Time":    { color: "#f0a030", glow: "rgba(240,160,48,0.3)",  track: "rgba(240,160,48,0.1)"  },
  "Delayed":    { color: "#e63232", glow: "rgba(230,50,50,0.3)",   track: "rgba(230,50,50,0.1)"   },
  "In Transit": { color: "#c8803a", glow: "rgba(200,128,58,0.3)",  track: "rgba(200,128,58,0.1)"  },
  "Delivered":  { color: "#e8c090", glow: "rgba(232,192,144,0.3)", track: "rgba(232,192,144,0.1)" },
};

function RingChart({ pct, color, glow, size = 80, stroke = 8 }) {
  const r   = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 6px ${glow})`, transition: "stroke-dasharray 1.2s cubic-bezier(0.34,1.2,0.64,1)" }}
      />
    </svg>
  );
}

export default function ReportsPageDark({ toggleTheme }) {
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

    const pad   = { top: 20, bottom: 30, left: 28, right: 10 };
    const chartW = W - pad.left - pad.right;
    const chartH = H - pad.top - pad.bottom;
    const trend  = data.monthlyTrend;
    const maxVal = Math.max(...trend.map(t => t.count), 1);
    const slotW  = chartW / trend.length;
    const barW   = slotW * 0.42;

    ctx.clearRect(0, 0, W, H);

    // Grid
    for (let i = 0; i <= 3; i++) {
      const y = pad.top + chartH - (i / 3) * chartH;
      ctx.beginPath();
      ctx.strokeStyle = i === 0 ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)";
      ctx.lineWidth = 1;
      ctx.moveTo(pad.left, y);
      ctx.lineTo(W - pad.right, y);
      ctx.stroke();
      if (i > 0) {
        ctx.fillStyle = "#4a3830";
        ctx.font = "8px Inter";
        ctx.textAlign = "right";
        ctx.fillText(Math.round((i / 3) * maxVal), pad.left - 4, y + 3);
      }
    }

    const maxBar = Math.max(...trend.map(t => t.count));

    trend.forEach((t, i) => {
      const cx   = pad.left + i * slotW + slotW / 2;
      const x    = cx - barW / 2;
      const barH = t.count > 0 ? Math.max((t.count / maxVal) * chartH, 6) : 0;
      const y    = pad.top + chartH - barH;
      const rad  = 3;
      const isPeak = t.count === maxBar && t.count > 0;

      if (t.count > 0) {
        const grad = ctx.createLinearGradient(x, y, x, pad.top + chartH);
        grad.addColorStop(0, isPeak ? "#ffffff" : "#e63232");
        grad.addColorStop(0.4, isPeak ? "#f0a030" : "#c82820");
        grad.addColorStop(1, "rgba(240,160,48,0.3)");

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
        ctx.shadowColor = isPeak ? "rgba(255,255,255,0.4)" : "rgba(230,50,50,0.4)";
        ctx.shadowBlur  = isPeak ? 14 : 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = isPeak ? "#fff" : "#a89888";
        ctx.font = isPeak ? "bold 9px Inter" : "9px Inter";
        ctx.textAlign = "center";
        ctx.fillText(t.count, cx, y - 5);
      } else {
        ctx.beginPath();
        ctx.rect(x, pad.top + chartH - 2, barW, 2);
        ctx.fillStyle = "rgba(255,255,255,0.03)";
        ctx.fill();
      }

      ctx.fillStyle = "#5a4840";
      ctx.font = "8px Inter";
      ctx.textAlign = "center";
      ctx.shadowBlur = 0;
      ctx.fillText(t.shortLabel, cx, H - pad.bottom + 12);
    });
  }, [data]);

  const total = data?.statusBreakdown.reduce((s, i) => s + i.count, 0) || 0;
  const maxSupplier = data ? Math.max(...data.topSuppliers.map(s => s.total), 1) : 1;
  const maxDelay    = data ? Math.max(...data.delayReasons.map(d => d.count), 1) : 1;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#07060a", color: "#e0d8d0", fontFamily: "'Inter',sans-serif", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap');

        @keyframes pulseOrb  { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.1);opacity:0.7} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes gradFlow  { 0%{background-position:0%} 100%{background-position:200%} }
        @keyframes spin      { to{transform:rotate(360deg)} }
        @keyframes shimmer   { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes floatUp   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes borderPulse { 0%,100%{border-color:rgba(230,50,50,0.15)} 50%{border-color:rgba(230,50,50,0.35)} }

        .fade-up-r   { animation: fadeUp 0.5s ease forwards; }
        .fade-up-r-1 { animation: fadeUp 0.5s 0.06s ease forwards; opacity:0; }
        .fade-up-r-2 { animation: fadeUp 0.5s 0.12s ease forwards; opacity:0; }
        .fade-up-r-3 { animation: fadeUp 0.5s 0.18s ease forwards; opacity:0; }
        .fade-up-r-4 { animation: fadeUp 0.5s 0.24s ease forwards; opacity:0; }

        /* ── Bento card base ── */
        .bento {
          background: linear-gradient(145deg, rgba(255,255,255,0.025), rgba(230,50,50,0.012));
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px; overflow: hidden; position: relative;
          transition: transform 0.25s cubic-bezier(0.34,1.2,0.64,1),
                      box-shadow 0.25s, border-color 0.25s;
        }
        .bento:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(230,50,50,0.15);
          border-color: rgba(230,50,50,0.2);
        }
        .bento-top {
          height: 2px;
          background: linear-gradient(90deg,#e63232,#f0a030,#e63232);
          background-size: 200%;
          animation: gradFlow 3s linear infinite;
        }

        /* ── Stat hero card ── */
        .stat-hero {
          background: linear-gradient(135deg, rgba(230,50,50,0.08), rgba(240,160,48,0.04));
          border: 1px solid rgba(230,50,50,0.18);
          border-radius: 16px; padding: 1.6rem;
          position: relative; overflow: hidden;
          transition: transform 0.25s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.25s;
        }
        .stat-hero:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(230,50,50,0.15);
        }
        .stat-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.03), transparent);
          pointer-events: none;
        }

        /* ── Accent card ── */
        .stat-accent {
          background: linear-gradient(145deg, rgba(255,255,255,0.022), rgba(255,255,255,0.008));
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 1.4rem 1.6rem;
          position: relative; overflow: hidden;
          transition: transform 0.25s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.25s;
        }
        .stat-accent:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 32px rgba(0,0,0,0.3);
          border-color: rgba(240,160,48,0.2);
        }

        /* ── Progress bar ── */
        .bar-fill {
          height: 100%; border-radius: 999px;
          transition: width 1.2s cubic-bezier(0.34,1.2,0.64,1);
          position: relative; overflow: hidden;
        }
        .bar-fill::after {
          content: ''; position: absolute; top:0; left:-100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: shimmer 2.5s ease infinite;
        }

        /* ── Table rows ── */
        .trow { transition: background 0.2s, padding-left 0.2s; border-radius: 8px; }
        .trow:hover { background: rgba(230,50,50,0.04); padding-left: 6px; }

        /* ── Refresh button ── */
        .refresh-btn {
          background: transparent; color: #e63232;
          border: 1px solid rgba(230,50,50,0.4);
          padding: 10px 22px; border-radius: 8px;
          font-size: 0.78rem; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; cursor: pointer;
          transition: all 0.25s; display: flex; align-items: center; gap: 8px;
          font-family: 'Inter', sans-serif;
        }
        .refresh-btn:hover {
          background: rgba(230,50,50,0.08);
          border-color: rgba(230,50,50,0.7);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(230,50,50,0.15);
        }

        .spinner-r {
          width: 32px; height: 32px;
          border: 2px solid rgba(230,50,50,0.15);
          border-top-color: #e63232; border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(230,50,50,0.25); border-radius: 4px; }
      `}</style>

      <AdminNavbarDark toggleTheme={toggleTheme} pageTitle="REPORTS" pageSubtitle="ANALYTICS & INSIGHTS" />

      <div style={{ display: "flex", flex: 1 }}>
        <AdminSidebarDark hoveredWidth={hoveredWidth} setHoveredWidth={setHoveredWidth} />

        <div style={{ marginLeft: `${68 + hoveredWidth}px`, flex: 1, padding: "2rem 2.5rem", transition: "margin-left 0.28s cubic-bezier(0.4,0,0.2,1)", position: "relative", minHeight: "calc(100vh - 64px)" }}>

          {/* ORBS */}
          <div style={{ position: "fixed", top: "-100px", right: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(230,50,50,0.1),transparent 70%)", animation: "pulseOrb 6s ease-in-out infinite", pointerEvents: "none", zIndex: 0 }} />
          <div style={{ position: "fixed", bottom: "-150px", left: "5%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle,rgba(240,160,48,0.06),transparent 70%)", animation: "pulseOrb 8s ease-in-out infinite reverse", pointerEvents: "none", zIndex: 0 }} />

          {/* PAGE HEADER */}
          <div className="fade-up-r" style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", position: "relative", zIndex: 1 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <div style={{ width: "24px", height: "2px", background: "linear-gradient(90deg,#e63232,#f0a030)", borderRadius: "2px" }} />
                <span style={{ fontSize: "0.6rem", letterSpacing: "4px", textTransform: "uppercase", background: "linear-gradient(90deg,#e63232,#f0a030)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 700 }}>Analytics</span>
              </div>
              <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.8rem", background: "linear-gradient(135deg,#ffffff 0%,#e0c8c0 50%,#f0a030 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "3px", lineHeight: 1, margin: 0 }}>REPORTS</h1>
              <div style={{ fontSize: "0.76rem", color: "#a89888", marginTop: "6px" }}>
                Live data · {data ? `${total} shipments tracked` : "Fetching..."}
              </div>
            </div>
            <button className="refresh-btn" onClick={fetchReports}>↻ Refresh</button>
          </div>

          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "50vh", gap: "1.2rem", position: "relative", zIndex: 1 }}>
              <div className="spinner-r" />
              <div style={{ color: "#7a6a60", fontSize: "0.84rem" }}>Loading analytics...</div>
            </div>
          ) : error ? (
            <div style={{ textAlign: "center", padding: "5rem", position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚠️</div>
              <div style={{ color: "#f87171", fontSize: "0.88rem", marginBottom: "1.2rem" }}>{error}</div>
              <button className="refresh-btn" style={{ margin: "0 auto" }} onClick={fetchReports}>Try Again</button>
            </div>
          ) : data && (
            <>
              {/* ══════════════════════════════════════════
                  BENTO ROW 1 — Hero stat + 3 accent cards
              ══════════════════════════════════════════ */}
              <div className="fade-up-r-1" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1fr", gap: "14px", marginBottom: "14px", position: "relative", zIndex: 1 }}>

                {/* HERO — Total Shipments */}
                <div className="stat-hero">
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,#e63232,#f0a030,#e63232)", backgroundSize: "200%", animation: "gradFlow 3s linear infinite" }} />
                  <div style={{ position: "absolute", bottom: "-20px", right: "-20px", width: "120px", height: "120px", borderRadius: "50%", background: "radial-gradient(circle,rgba(230,50,50,0.15),transparent 70%)", pointerEvents: "none" }} />
                  <div style={{ fontSize: "0.6rem", letterSpacing: "3px", textTransform: "uppercase", color: "#a87a60", marginBottom: "12px", fontWeight: 700 }}>Total Shipments</div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "4rem", background: "linear-gradient(135deg,#fff,#f0a030)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "4px", lineHeight: 1, marginBottom: "8px" }}>{data.summary.totalShipments}</div>
                  <div style={{ fontSize: "0.72rem", color: "#8a6a50" }}>all time</div>
                  <div style={{ marginTop: "16px", height: "1px", background: "linear-gradient(90deg,rgba(230,50,50,0.3),transparent)" }} />
                  <div style={{ marginTop: "12px", display: "flex", gap: "16px" }}>
                    <div>
                      <div style={{ fontSize: "0.58rem", letterSpacing: "2px", textTransform: "uppercase", color: "#6a4a3a", marginBottom: "3px" }}>On Time</div>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.4rem", color: "#f0a030", letterSpacing: "2px" }}>{data.summary.totalOnTime}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.58rem", letterSpacing: "2px", textTransform: "uppercase", color: "#6a4a3a", marginBottom: "3px" }}>Delayed</div>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.4rem", color: "#e63232", letterSpacing: "2px" }}>{data.summary.totalDelayed}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.58rem", letterSpacing: "2px", textTransform: "uppercase", color: "#6a4a3a", marginBottom: "3px" }}>In Transit</div>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.4rem", color: "#c8803a", letterSpacing: "2px" }}>{data.statusBreakdown.find(s => s._id === "In Transit")?.count || 0}</div>
                    </div>
                  </div>
                </div>

                {/* On Time Rate */}
                <div className="stat-accent">
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,#e63232,#f0a030,#e63232)", backgroundSize: "200%", animation: "gradFlow 3s linear infinite" }} />
                  <div style={{ fontSize: "0.6rem", letterSpacing: "2.5px", textTransform: "uppercase", color: "#6a5a50", marginBottom: "12px", fontWeight: 700 }}>On Time Rate</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      <RingChart pct={animated ? data.summary.onTimeRate : 0} color="#f0a030" glow="rgba(240,160,48,0.4)" size={72} stroke={7} />
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#f0a030", fontFamily: "'Bebas Neue',sans-serif", letterSpacing: "1px" }}>{data.summary.onTimeRate}%</span>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2rem", color: "#f0a030", letterSpacing: "2px", lineHeight: 1 }}>{data.summary.onTimeRate}%</div>
                      <div style={{ fontSize: "0.68rem", color: "#7a6a60", marginTop: "4px" }}>{data.summary.totalOnTime} on time</div>
                    </div>
                  </div>
                </div>

                {/* Delays */}
                <div className="stat-accent">
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,#e63232,#f0a030,#e63232)", backgroundSize: "200%", animation: "gradFlow 3s linear infinite" }} />
                  <div style={{ fontSize: "0.6rem", letterSpacing: "2.5px", textTransform: "uppercase", color: "#6a5a50", marginBottom: "12px", fontWeight: 700 }}>Total Delays</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      <RingChart pct={animated ? (total > 0 ? (data.summary.totalDelayed / total) * 100 : 0) : 0} color="#e63232" glow="rgba(230,50,50,0.4)" size={72} stroke={7} />
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#e63232", fontFamily: "'Bebas Neue',sans-serif", letterSpacing: "1px" }}>{total > 0 ? Math.round((data.summary.totalDelayed / total) * 100) : 0}%</span>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2rem", color: "#e63232", letterSpacing: "2px", lineHeight: 1 }}>{data.summary.totalDelayed}</div>
                      <div style={{ fontSize: "0.68rem", color: "#7a6a60", marginTop: "4px" }}>delayed shipments</div>
                    </div>
                  </div>
                </div>

                {/* Active Users */}
                <div className="stat-accent">
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,#e63232,#f0a030,#e63232)", backgroundSize: "200%", animation: "gradFlow 3s linear infinite" }} />
                  <div style={{ fontSize: "0.6rem", letterSpacing: "2.5px", textTransform: "uppercase", color: "#6a5a50", marginBottom: "12px", fontWeight: 700 }}>Active Users</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      <RingChart pct={animated ? (data.summary.totalUsers > 0 ? (data.summary.activeUsers / data.summary.totalUsers) * 100 : 0) : 0} color="#c8803a" glow="rgba(200,128,58,0.4)" size={72} stroke={7} />
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#c8803a", fontFamily: "'Bebas Neue',sans-serif", letterSpacing: "1px" }}>{data.summary.activeUsers}</span>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2rem", color: "#c8803a", letterSpacing: "2px", lineHeight: 1 }}>{data.summary.activeUsers}</div>
                      <div style={{ fontSize: "0.68rem", color: "#7a6a60", marginTop: "4px" }}>of {data.summary.totalUsers} total</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ══════════════════════════════════════════
                  BENTO ROW 2 — Status rings + Bar chart
              ══════════════════════════════════════════ */}
              <div className="fade-up-r-2" style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: "14px", marginBottom: "14px", position: "relative", zIndex: 1 }}>

                {/* Status breakdown — rings */}
                <div className="bento">
                  <div className="bento-top" />
                  <div style={{ padding: "1.4rem 1.6rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <div style={{ width: "3px", height: "14px", background: "linear-gradient(to bottom,#e63232,#f0a030)", borderRadius: "2px" }} />
                      <div style={{ fontSize: "0.62rem", letterSpacing: "2.5px", textTransform: "uppercase", color: "#6a5a50", fontWeight: 700 }}>Status Breakdown</div>
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#6a5a50", marginBottom: "1.4rem" }}>Shipment distribution by status</div>

                    {/* Rings grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      {(() => {
                        const order = ["On Time","Delayed","In Transit","Delivered"];
                        const allStatuses = [...data.statusBreakdown];
                        order.forEach(s => { if (!allStatuses.find(x => x._id === s)) allStatuses.push({ _id: s, count: 0 }); });
                        return order.map(name => {
                          const item = allStatuses.find(x => x._id === name) || { _id: name, count: 0 };
                          const pct  = total > 0 ? (item.count / total) * 100 : 0;
                          const cfg  = STATUS_CFG[name] || { color: "#888", glow: "transparent", track: "rgba(136,136,136,0.1)" };
                          return (
                            <div key={name} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", background: "rgba(255,255,255,0.02)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.04)" }}>
                              <div style={{ position: "relative", flexShrink: 0 }}>
                                <RingChart pct={animated ? pct : 0} color={cfg.color} glow={cfg.glow} size={52} stroke={5} />
                                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <span style={{ fontSize: "0.65rem", fontWeight: 700, color: cfg.color }}>{item.count}</span>
                                </div>
                              </div>
                              <div>
                                <div style={{ fontSize: "0.76rem", color: "#c8b8b0", fontWeight: 600, marginBottom: "2px" }}>{name}</div>
                                <div style={{ fontSize: "0.66rem", color: "#6a5a50" }}>{Math.round(pct)}% of total</div>
                              </div>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>
                </div>

                {/* Monthly Bar Chart */}
                <div className="bento">
                  <div className="bento-top" />
                  <div style={{ padding: "1.4rem 1.6rem 0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                          <div style={{ width: "3px", height: "14px", background: "linear-gradient(to bottom,#e63232,#f0a030)", borderRadius: "2px" }} />
                          <div style={{ fontSize: "0.62rem", letterSpacing: "2.5px", textTransform: "uppercase", color: "#6a5a50", fontWeight: 700 }}>Monthly Trend</div>
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "#6a5a50" }}>Shipments created — last 6 months</div>
                      </div>
                      {/* Peak badge */}
                      {(() => {
                        const peak = data.monthlyTrend.reduce((a, b) => b.count > a.count ? b : a, { count: 0, shortLabel: "—" });
                        return peak.count > 0 ? (
                          <div style={{ padding: "4px 10px", borderRadius: "6px", background: "linear-gradient(135deg,rgba(230,50,50,0.15),rgba(240,160,48,0.1))", border: "1px solid rgba(230,50,50,0.25)", fontSize: "0.62rem", color: "#f0a030", fontWeight: 700, letterSpacing: "1px" }}>
                            PEAK · {peak.shortLabel} · {peak.count}
                          </div>
                        ) : null;
                      })()}
                    </div>
                  </div>
                  <div style={{ padding: "0.5rem 1rem 0.5rem" }}>
                    <canvas ref={barRef} style={{ width: "100%", display: "block" }} />
                  </div>
                  {/* Legend */}
                  <div style={{ padding: "0 1.6rem 1.2rem", display: "flex", gap: "16px", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{ width: "14px", height: "4px", borderRadius: "2px", background: "linear-gradient(90deg,#e63232,#f0a030)" }} />
                      <span style={{ fontSize: "0.66rem", color: "#5a4a45" }}>Shipments</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#fff", boxShadow: "0 0 6px rgba(255,255,255,0.5)" }} />
                      <span style={{ fontSize: "0.66rem", color: "#5a4a45" }}>Peak month</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ══════════════════════════════════════════
                  BENTO ROW 3 — Suppliers + Delay reasons + Mini stats
              ══════════════════════════════════════════ */}
              <div className="fade-up-r-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 240px", gap: "14px", marginBottom: "14px", position: "relative", zIndex: 1 }}>

                {/* Top Suppliers */}
                <div className="bento">
                  <div className="bento-top" />
                  <div style={{ padding: "1.4rem 1.6rem 0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <div style={{ width: "3px", height: "14px", background: "linear-gradient(to bottom,#e63232,#f0a030)", borderRadius: "2px" }} />
                      <div style={{ fontSize: "0.62rem", letterSpacing: "2.5px", textTransform: "uppercase", color: "#6a5a50", fontWeight: 700 }}>Top Suppliers</div>
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#6a5a50", marginBottom: "1rem" }}>Ranked by shipment volume</div>
                  </div>
                  <div style={{ padding: "0 1.6rem 1.4rem" }}>
                    {/* Header */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 48px 52px 52px", padding: "5px 8px", background: "rgba(255,255,255,0.02)", borderRadius: "6px", marginBottom: "4px" }}>
                      {["Supplier","Vol","✓","✕"].map((h,j) => (
                        <div key={j} style={{ fontSize: "0.56rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#4a3830", fontWeight: 700, textAlign: j === 0 ? "left" : "center" }}>{h}</div>
                      ))}
                    </div>
                    {data.topSuppliers.length === 0 ? (
                      <div style={{ color: "#6a5a50", fontSize: "0.78rem", padding: "1.5rem 0", textAlign: "center" }}>No data yet</div>
                    ) : data.topSuppliers.map((s, i) => {
                      const pct = (s.total / maxSupplier) * 100;
                      return (
                        <div key={i} className="trow" style={{ padding: "9px 8px", borderBottom: i < data.topSuppliers.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 48px 52px 52px", alignItems: "center", marginBottom: "5px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <div style={{ width: "16px", height: "16px", borderRadius: "4px", background: i === 0 ? "linear-gradient(135deg,#e63232,#f0a030)" : "rgba(255,255,255,0.05)", border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.58rem", color: i === 0 ? "#07060a" : "#7a6a60", fontWeight: 800, flexShrink: 0 }}>
                                {i + 1}
                              </div>
                              <span style={{ fontSize: "0.8rem", color: "#d4c4b8", fontWeight: 500 }}>{s._id}</span>
                            </div>
                            <div style={{ fontSize: "0.88rem", color: "#e63232", fontWeight: 700, textAlign: "center", fontFamily: "'Bebas Neue',sans-serif", letterSpacing: "1px" }}>{s.total}</div>
                            <div style={{ fontSize: "0.8rem", color: "#f0a030", fontWeight: 600, textAlign: "center" }}>{s.onTime}</div>
                            <div style={{ fontSize: "0.8rem", color: "#c83a3a", fontWeight: 600, textAlign: "center" }}>{s.delayed}</div>
                          </div>
                          <div style={{ height: "3px", background: "rgba(255,255,255,0.04)", borderRadius: "999px", overflow: "hidden", marginLeft: "24px" }}>
                            <div className="bar-fill" style={{ width: animated ? `${pct}%` : "0%", background: i === 0 ? "linear-gradient(90deg,#e63232,#f0a030)" : "linear-gradient(90deg,rgba(230,50,50,0.6),rgba(240,160,48,0.4))", transition: `width 1s cubic-bezier(0.34,1.2,0.64,1) ${i * 0.08}s` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Delay Reasons */}
                <div className="bento">
                  <div className="bento-top" />
                  <div style={{ padding: "1.4rem 1.6rem 0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <div style={{ width: "3px", height: "14px", background: "linear-gradient(to bottom,#e63232,#c83a3a)", borderRadius: "2px" }} />
                      <div style={{ fontSize: "0.62rem", letterSpacing: "2.5px", textTransform: "uppercase", color: "#6a5a50", fontWeight: 700 }}>Delay Reasons</div>
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#6a5a50", marginBottom: "1rem" }}>Root causes of shipment delays</div>
                  </div>
                  <div style={{ padding: "0 1.6rem 1.4rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 48px 76px", padding: "5px 8px", background: "rgba(255,255,255,0.02)", borderRadius: "6px", marginBottom: "4px" }}>
                      {["Reason","Count","Avg Time"].map((h,j) => (
                        <div key={j} style={{ fontSize: "0.56rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#4a3830", fontWeight: 700, textAlign: j === 0 ? "left" : "center" }}>{h}</div>
                      ))}
                    </div>
                    {data.delayReasons.length === 0 ? (
                      <div style={{ color: "#6a5a50", fontSize: "0.78rem", padding: "1.5rem 0", textAlign: "center" }}>🎉 No delays recorded!</div>
                    ) : data.delayReasons.map((d, i) => {
                      const pct = (d.count / maxDelay) * 100;
                      return (
                        <div key={i} className="trow" style={{ padding: "9px 8px", borderBottom: i < data.delayReasons.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 48px 76px", alignItems: "center", marginBottom: "5px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#e63232", boxShadow: "0 0 6px rgba(230,50,50,0.5)", flexShrink: 0 }} />
                              <span style={{ fontSize: "0.8rem", color: "#d4c4b8", fontWeight: 500 }}>{d._id}</span>
                            </div>
                            <div style={{ fontSize: "0.88rem", color: "#e63232", fontWeight: 700, textAlign: "center", fontFamily: "'Bebas Neue',sans-serif", letterSpacing: "1px" }}>{d.count}</div>
                            <div style={{ fontSize: "0.76rem", color: "#f0a030", fontWeight: 600, textAlign: "center" }}>{Math.round(d.avgHours)}h avg</div>
                          </div>
                          <div style={{ height: "3px", background: "rgba(255,255,255,0.04)", borderRadius: "999px", overflow: "hidden", marginLeft: "14px" }}>
                            <div className="bar-fill" style={{ width: animated ? `${pct}%` : "0%", background: "linear-gradient(90deg,#e63232,#f0a030)", transition: `width 1s cubic-bezier(0.34,1.2,0.64,1) ${i * 0.08}s` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Mini stat stack */}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {[
                    { label: "Delay Codes", value: data.summary.totalDelayCodes, sub: `${data.summary.activeDelayCodes} active`, color: "#f0a030", icon: "🏷️" },
                    { label: "Delivered",   value: data.statusBreakdown.find(s => s._id === "Delivered")?.count || 0, sub: "completed", color: "#e8c090", icon: "✅" },
                    { label: "Inactive Users", value: data.summary.totalUsers - data.summary.activeUsers, sub: "accounts paused", color: "#c86a6a", icon: "🔒" },
                  ].map((card, i) => (
                    <div key={i} className="stat-accent" style={{ flex: 1 }}>
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,#e63232,#f0a030,#e63232)", backgroundSize: "200%", animation: "gradFlow 3s linear infinite" }} />
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontSize: "0.58rem", letterSpacing: "2px", textTransform: "uppercase", color: "#5a4a45", marginBottom: "6px", fontWeight: 700 }}>{card.label}</div>
                          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2rem", color: card.color, letterSpacing: "2px", lineHeight: 1 }}>{card.value}</div>
                          <div style={{ fontSize: "0.64rem", color: "#6a5a50", marginTop: "3px" }}>{card.sub}</div>
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