// Was: both #screen-victory and #screen-gameover collapsed into one component
import { useState } from 'react';
import { LEVELS, THEMES } from '../data/themes';

export default function GameOver({
  levelKey, themeKey,
  gameResult, score, elapsed, wrongCount,
  onReplay, onMenu, formatTime,
}) {
  const cfg     = LEVELS[levelKey];
  const theme   = THEMES[themeKey];
  const victory = gameResult === 'victory';

  return (
    <div style={{
      width: '100vw', height: '100vh', background: '#0d1b3e',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>
      {/* Victory: bouncing hero (was: <div class="hero-win">) */}
      {victory && (
        <div style={{
          position: 'absolute', left: 60, bottom: 20,
          width: 150, height: 200,
          backgroundImage: `url(${theme.hero})`,
          backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
          filter: 'drop-shadow(0 0 14px rgba(255,200,0,.5))',
          animation: 'bounce 0.8s ease infinite',
          zIndex: 2,
        }} />
      )}

      {/* Game over: floating angry witch (was: <div class="witch-go">) */}
      {!victory && (
        <div style={{
          position: 'absolute', right: 60, bottom: 20,
          width: 160, height: 220,
          backgroundImage: `url(${theme.witchAngry})`,
          backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
          animation: 'float 2s ease-in-out infinite',
          zIndex: 2,
        }} />
      )}

      {/* Result panel (was: <div class="vpanel"> or <div class="gopanel">) */}
      <div style={{
        background: 'rgba(10,20,50,0.90)', border: '2px solid rgba(80,120,220,0.5)',
        borderRadius: 16, backdropFilter: 'blur(6px)',
        boxShadow: '0 0 40px rgba(30,60,160,0.6)',
        padding: '32px 48px', textAlign: 'center', minWidth: 460,
        position: 'relative', zIndex: 3,
      }}>
        {victory ? (
          // Was: <div class="felic-img"> with pglow animation
          <div style={{
            fontFamily: "'Press Start 2P'", fontSize: 18, color: '#f5c518',
            textShadow: '0 0 20px rgba(245,197,24,.8)',
            marginBottom: 22, animation: 'pglow 1.5s ease infinite',
          }}>
            ★ FÉLICITATIONS ★
          </div>
        ) : (
          // Was: <div class="gotitle">
          <>
            <div style={{
              fontFamily: "'Press Start 2P'", fontSize: 18, color: '#ef4444',
              textShadow: '0 0 20px rgba(239,68,68,.8), 3px 3px 0 #3a0000',
              marginBottom: 12, lineHeight: 1.6,
            }}>
              GAME OVER
            </div>
            <p style={{ fontSize: 22, color: '#8ba4d0', marginBottom: 24 }}>
              La sorcière t'a rattrapé !
            </p>
          </>
        )}

        {/* Stats (was: <div class="vstat"> rows) */}
        <Stat label="Niveau"  value={cfg.label} />
        <Stat label="Temps"   value={formatTime(elapsed)} />
        <Stat label="Erreurs" value={`${wrongCount} / ${cfg.maxWrong}`} />
        {victory && <Stat label="Score" value={`${score} pts`} highlight />}

        {/* Action buttons (was: <div class="act-btns"> + .abtn) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 20 }}>
          <ActionBtn onClick={onReplay}>🔄 REJOUER</ActionBtn>
          <ActionBtn onClick={onMenu} secondary>🏠 MENU</ActionBtn>
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────

function Stat({ label, value, highlight }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '10px 0', borderBottom: '1px solid rgba(80,120,220,0.5)',
      fontFamily: "'Press Start 2P'", fontSize: 12,
    }}>
      <span style={{ color: '#8ba4d0' }}>{label}</span>
      <span style={{ color: highlight ? '#22c55e' : '#f5c518' }}>{value}</span>
    </div>
  );
}

function ActionBtn({ onClick, children, secondary }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: secondary
          ? 'linear-gradient(135deg,#374151,#4b5563)'
          : 'linear-gradient(135deg,#1d4ed8,#2563eb)',
        border: `2px solid ${secondary ? '#6b7280' : '#60a5fa'}`,
        borderRadius: 10, color: 'white',
        fontFamily: "'Press Start 2P'", fontSize: 9,
        padding: 12, cursor: 'pointer', letterSpacing: 1, width: '100%',
        transition: 'all .15s',
        transform: hovered ? 'translateY(-2px)' : 'none',
        filter: hovered ? 'brightness(1.2)' : 'none',
      }}
    >
      {children}
    </button>
  );
}