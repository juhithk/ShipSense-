export default function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500;600&family=Dancing+Script:wght@600&display=swap');

      * { margin: 0; padding: 0; box-sizing: border-box; }

      /* ── DARK THEME ANIMATIONS ── */
      @keyframes pulseR {
        0%, 100% { opacity: 1; box-shadow: 0 0 6px rgba(230,50,50,0.6); }
        50% { opacity: 0.4; box-shadow: none; }
      }
      @keyframes pulseOrb {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.15); }
      }
      @keyframes floatBg {
        0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
        50% { transform: translate(-50%, -50%) translateY(-20px); }
      }
      @keyframes scrollX {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      @keyframes fadeY {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
      }

      /* ── LIGHT THEME ANIMATIONS (Bridgerton) ── */
      @keyframes pulseRose {
        0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(201,132,138,0.6); }
        50% { opacity: 0.4; box-shadow: none; }
      }
      @keyframes pulseOrbLight {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        50% { transform: translate(-50%, -50%) scale(1.12); opacity: 0.75; }
      }
      @keyframes floatBgLight {
        0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
        50% { transform: translate(-50%, -50%) translateY(-18px); }
      }
      @keyframes blinkGold {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      @keyframes fadeYLight {
        0%, 100% { opacity: 0.25; transform: scaleY(0.85); }
        50% { opacity: 1; transform: scaleY(1); }
      }
      @keyframes shimmerGold {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      @keyframes floatPetal {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
        33% { transform: translateY(-12px) rotate(3deg); opacity: 1; }
        66% { transform: translateY(-6px) rotate(-2deg); opacity: 0.8; }
      }
    `}</style>
  );
}