import React from 'react';
import { LEVELS, THEMES } from '../data/themes';

export default function GameConfig({ levelIdx, themeIdx, onSelectLevel, onSelectTheme, onStart }) {
  const theme = THEMES[themeIdx];

  return (
    <div style={s.wrapper}>
      <img src={theme.bgImg} alt="" style={s.bg} />
      <img src={theme.heroImg} alt="" style={s.heroLeft} />
      <img src={theme.witchNeutral} alt="" style={s.witchRight} />

      <div style={s.panel}>
        <div style={s.titleRow}>
          <img src="/images/2.png" alt="" style={s.titleIcon} />
          <div>
            <div style={s.title}>GRILLE FANTOME</div>
            <div style={s.subtitle}>LA FUITE DE LA SORCIERE</div>
          </div>
          <img src="/images/7.png" alt="" style={{ ...s.titleIcon, width: 30 }} />
        </div>

        <div style={s.sectionTitle}>CHOISIS TON AVENTURE</div>

        <div style={s.rowLabel}>NIVEAU</div>
        <div style={s.cardRow}>
          {LEVELS.map((lvl, i) => (
            <button key={lvl.id} style={s.levelBtn(levelIdx === i)} onClick={() => onSelectLevel(i)}>
              <span style={s.lvlName}>{lvl.name.split(' ')[0].toUpperCase()}</span>
              <span style={s.lvlSize}>{lvl.label}</span>
              <span style={s.lvlCases}>{lvl.cases}</span>
            </button>
          ))}
        </div>

        <div style={s.rowLabel}>THEME</div>
        <div style={s.cardRow}>
          {THEMES.map((th, i) => (
            <button key={th.id} style={s.themeBtn(themeIdx === i)} onClick={() => onSelectTheme(i)}>
              <img src={th.icon} alt={th.name} style={s.themeIcon} />
              <span>{th.name.toUpperCase()}</span>
            </button>
          ))}
        </div>

        <button style={s.startBtn} onClick={onStart}>COMMENCER</button>

        <div style={s.hint}>
          <img src="/images/6.png" alt="" style={s.hintIcon} />
          <span style={s.hintText}>Choisis ton niveau et ton theme pour commencer.</span>
        </div>
      </div>
    </div>
  );
}

const s = {
  wrapper: { position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', fontFamily: "'Press Start 2P', monospace" },
  bg: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', imageRendering: 'pixelated', zIndex: 0 },
  heroLeft: { position: 'absolute', left: 0, bottom: 0, height: '42%', imageRendering: 'pixelated', zIndex: 2, objectFit: 'contain' },
  witchRight: { position: 'absolute', right: 0, bottom: 0, height: '50%', imageRendering: 'pixelated', zIndex: 2, objectFit: 'contain' },
  panel: { position: 'relative', zIndex: 4, background: 'rgba(8,8,20,0.93)', border: '3px solid #3d4570', borderRadius: 6, padding: '20px 22px 18px', width: 340, maxWidth: '88vw', boxShadow: '0 10px 40px rgba(0,0,0,0.8)' },
  titleRow: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #2d3561', paddingBottom: 12 },
  titleIcon: { width: 36, height: 36, objectFit: 'contain', imageRendering: 'pixelated' },
  title: { fontSize: 11, fontWeight: 700, color: '#f5c842', textShadow: '2px 2px 0 #7a5c00', letterSpacing: 1, lineHeight: 1.4 },
  subtitle: { fontSize: 6, color: '#8a8a9a', marginTop: 3 },
  sectionTitle: { textAlign: 'center', fontSize: 7, color: '#f5c842', marginBottom: 10, letterSpacing: 1 },
  rowLabel: { textAlign: 'center', fontSize: 6, color: '#8a8a9a', marginBottom: 6, letterSpacing: 1 },
  cardRow: { display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 14 },
  levelBtn: (sel) => ({ flex: 1, cursor: 'pointer', textAlign: 'center', lineHeight: 1.8, background: sel ? 'rgba(76,175,80,0.15)' : 'rgba(10,10,30,0.8)', border: `2px solid ${sel ? '#4caf50' : '#2d3561'}`, borderRadius: 4, color: sel ? '#7eff7e' : '#c8c8d8', fontFamily: "'Press Start 2P', monospace", fontSize: 6, padding: '10px 6px' }),
  lvlName: { fontSize: 6, color: '#f5c842', display: 'block', marginBottom: 3 },
  lvlSize: { fontSize: 10, display: 'block' },
  lvlCases: { fontSize: 5.5, color: '#8a8a9a', display: 'block', marginTop: 2 },
  themeBtn: (sel) => ({ flex: 1, cursor: 'pointer', padding: '8px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, background: sel ? 'rgba(79,195,247,0.12)' : 'rgba(10,10,30,0.8)', border: `2px solid ${sel ? '#4fc3f7' : '#2d3561'}`, borderRadius: 4, color: sel ? '#4fc3f7' : '#c8c8d8', fontFamily: "'Press Start 2P', monospace", fontSize: 6 }),
  themeIcon: { width: 36, height: 36, objectFit: 'contain', imageRendering: 'pixelated' },
  startBtn: { width: '100%', background: 'linear-gradient(180deg,#4caf50,#388e3c)', border: '0', borderBottom: '4px solid #1b5e20', borderRadius: 4, color: '#fff', fontFamily: "'Press Start 2P', monospace", fontSize: 9, padding: '12px', cursor: 'pointer', letterSpacing: 2, marginBottom: 10 },
  hint: { display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' },
  hintIcon: { width: 14, height: 14, imageRendering: 'pixelated', objectFit: 'contain' },
  hintText: { fontSize: 5.5, color: '#8a8a9a', lineHeight: 1.6 },
};