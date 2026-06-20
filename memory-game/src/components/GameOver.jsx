import React from 'react';
import { THEMES } from '../data/themes';

export default function GameOver({ resultData, themeIdx, onReplay, onChangeTheme }) {
  if (!resultData) return null;
  const { won, levelName, pathCorrect, pathTotal, time, score } = resultData;
  const theme = THEMES[themeIdx];

  return (
    <div style={s.wrapper}>
      <img src={theme.bgImg} alt="" style={s.bg} />
      {won
        ? <img src={theme.heroWin} alt="" style={s.heroWin} />
        : <img src={theme.witchAngry} alt="" style={s.witchWin} />
      }
      <div style={s.panel}>
        <div style={{ ...s.title, color: won ? '#f5c842' : '#e74c3c' }}>
          {won ? 'FELICITATIONS !' : 'PERDU !'}
        </div>
        <div style={s.subtitle}>
          {won ? "Tu as reussi ! Le heros est en securite..." : "La sorciere t'a rattrape ! Reessaie !"}
        </div>
        <div style={s.statsBox}>
          {[
            ['NIVEAU ATTEINT', levelName.toUpperCase()],
            ['CHEMIN TROUVE', `${pathCorrect} / ${pathTotal}`],
            ['TEMPS', time],
          ].map(([label, val]) => (
            <div key={label} style={s.row}>
              <span style={s.rowLabel}>{label}</span>
              <span style={s.rowVal}>{val}</span>
            </div>
          ))}
          <div style={{ ...s.row, borderBottom: 'none', alignItems: 'center' }}>
            <span style={s.rowLabel}>SCORE</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={s.scoreVal}>{score}</span>
              <img src="/images/6.png" alt="" style={{ width: 16, height: 16, imageRendering: 'pixelated' }} />
            </div>
          </div>
        </div>
        <div style={s.btnRow}>
          <button style={s.btn} onClick={onReplay}>REJOUER</button>
          <button style={{ ...s.btn, ...s.btnPrimary }} onClick={onChangeTheme}>CHANGER</button>
        </div>
      </div>
    </div>
  );
}

const s = {
  wrapper: { position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', fontFamily: "'Press Start 2P', monospace" },
  bg: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', imageRendering: 'pixelated', zIndex: 0 },
  heroWin: { position: 'absolute', left: 0, bottom: 0, height: '45%', imageRendering: 'pixelated', zIndex: 2, objectFit: 'contain' },
  witchWin: { position: 'absolute', right: 0, bottom: 0, height: '50%', imageRendering: 'pixelated', zIndex: 2, objectFit: 'contain' },
  panel: { position: 'relative', zIndex: 3, background: 'rgba(8,8,20,0.93)', border: '3px solid #3d4570', borderRadius: 6, padding: '20px 22px', width: 330, maxWidth: '88vw', textAlign: 'center' },
  title: { fontSize: 13, textShadow: '2px 2px 0 #000', marginBottom: 10 },
  subtitle: { fontSize: 6, color: '#8a8a9a', lineHeight: 1.8, marginBottom: 14 },
  statsBox: { background: 'rgba(0,0,0,0.4)', border: '1px solid #2d3561', borderRadius: 4, padding: '8px 12px', marginBottom: 14 },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #2d3561' },
  rowLabel: { fontSize: 6, color: '#8a8a9a' },
  rowVal: { fontSize: 6, color: '#e8e0d0' },
  scoreVal: { fontSize: 14, color: '#f5c842' },
  btnRow: { display: 'flex', gap: 8 },
  btn: { flex: 1, background: 'rgba(10,10,30,0.8)', border: '2px solid #2d3561', color: '#e8e0d0', fontFamily: "'Press Start 2P', monospace", fontSize: 6, padding: '10px 6px', cursor: 'pointer', borderRadius: 3, lineHeight: 1.6 },
  btnPrimary: { background: 'rgba(124,58,237,0.35)', borderColor: '#5b21b6', color: '#fff' },
};