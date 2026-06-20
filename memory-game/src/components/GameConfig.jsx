// Was: <div id="screen-title"> in the original HTML
import { useState } from 'react';
import { LEVELS, THEMES } from '../data/themes';

export default function GameConfig({ levelKey, setLevelKey, themeKey, setThemeKey, onStart }) {
  const theme = THEMES[themeKey];

  return (
    <div style={{
      width: '100vw', height: '100vh', background: '#0d1b3e',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Characters — were <div class="title-chars"> + .char-hero + .char-witch */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        pointerEvents: 'none',
      }}>
        <Sprite src={theme.hero}         style={{ marginLeft: 40, animationDelay: '0s' }} />
        <Sprite src={theme.witchNeutral} style={{ marginRight: 40, animationDelay: '1.5s' }} />
      </div>

      {/* Config panel — was <div class="panel title-panel"> */}
      <div style={{
        background: 'rgba(10,20,50,0.90)', border: '2px solid rgba(80,120,220,0.5)',
        borderRadius: 16, backdropFilter: 'blur(6px)',
        boxShadow: '0 0 40px rgba(30,60,160,0.6), inset 0 0 20px rgba(0,0,20,0.4)',
        padding: '36px 48px', textAlign: 'center', minWidth: 560,
        position: 'relative', zIndex: 1,
      }}>
        {/* Title (was: <div class="gtitle"> + <div class="gsub">) */}
        <div style={{
          fontFamily: "'Press Start 2P'", fontSize: 22, color: '#f5c518',
          textShadow: '0 0 20px rgba(245,197,24,.8), 3px 3px 0 #3a2a00',
          marginBottom: 8, lineHeight: 1.5,
        }}>
          Le Chemin du Souvenir
        </div>
        <div style={{ fontSize: 18, color: '#8ba4d0', marginBottom: 32, letterSpacing: 2 }}>
          Mémorise le chemin !
        </div>

        {/* Level picker (was: .choice-grp + .level-grid) */}
        <Section label="NIVEAU">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
            {Object.entries(LEVELS).map(([key, cfg]) => (
              <ChoiceBtn key={key} selected={levelKey === key} onClick={() => setLevelKey(key)}>
                <strong style={{ display: 'block' }}>{cfg.label}</strong>
                <span style={{ fontSize: 16, color: '#8ba4d0' }}>
                  {cfg.grid}×{cfg.grid} · {cfg.pathLen} cases
                </span>
              </ChoiceBtn>
            ))}
          </div>
        </Section>

        {/* Theme picker (was: .choice-grp + .theme-grid) */}
        <Section label="THÈME">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
            {Object.entries(THEMES).map(([key, t]) => (
              <ChoiceBtn key={key} selected={themeKey === key} onClick={() => setThemeKey(key)}>
                <span style={{ fontSize: 36 }}>{t.icon}</span>
                <span style={{ display: 'block', marginTop: 4 }}>{t.label}</span>
              </ChoiceBtn>
            ))}
          </div>
        </Section>

        {/* Start button (was: <button class="start-btn">) */}
        <StartButton onClick={onStart}>▶ JOUER</StartButton>
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────

function Sprite({ src, style }) {
  return (
    <div style={{
      width: 160, height: 220,
      backgroundImage: `url(${src})`,
      backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom',
      filter: 'drop-shadow(0 0 10px rgba(60,80,255,0.4))',
      animation: 'float 3s ease-in-out infinite',
      ...style,
    }} />
  );
}

// Was: <div class="choice-grp"> with a .sec-lbl label
function Section({ label, children }) {
  return (
    <div style={{
      background: 'rgba(0,10,40,0.5)', border: '1px solid rgba(80,120,220,0.5)',
      borderRadius: 12, padding: 16, marginBottom: 20,
    }}>
      <p style={{
        fontFamily: "'Press Start 2P'", fontSize: 10, color: '#8ba4d0',
        letterSpacing: 3, textTransform: 'uppercase',
        marginBottom: 12, paddingBottom: 8,
        borderBottom: '1px solid rgba(80,120,220,0.5)',
      }}>
        {label}
      </p>
      {children}
    </div>
  );
}

// Was: <button class="cbtn [sel]">
function ChoiceBtn({ selected, onClick, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: selected ? 'rgba(20,60,160,0.9)' : hovered ? 'rgba(40,80,180,0.7)' : 'rgba(20,40,100,0.7)',
        border: `2px solid ${selected ? '#22c55e' : hovered ? '#3b82f6' : 'rgba(60,100,200,0.4)'}`,
        boxShadow: selected ? '0 0 12px rgba(34,197,94,0.5)' : 'none',
        borderRadius: 10, color: '#e8f4ff', fontFamily: "'VT323'", fontSize: 20,
        cursor: 'pointer', padding: '12px 8px', textAlign: 'center', width: '100%',
        transition: 'all .15s',
        transform: hovered ? 'scale(1.04)' : 'scale(1)',
      }}
    >
      {children}
    </button>
  );
}

// Was: <button class="start-btn">
function StartButton({ onClick, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'linear-gradient(135deg,#1d4ed8,#2563eb)',
        border: '2px solid #60a5fa', borderRadius: 10,
        color: 'white', fontFamily: "'Press Start 2P'", fontSize: 13,
        padding: '14px 40px', cursor: 'pointer', letterSpacing: 2,
        boxShadow: hovered ? '0 6px 28px rgba(37,99,235,.7)' : '0 4px 20px rgba(37,99,235,.5)',
        marginTop: 8, width: '100%', transition: 'all .15s',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      {children}
    </button>
  );
}