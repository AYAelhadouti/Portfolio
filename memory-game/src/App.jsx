import React from 'react';
import GameConfig from './components/GameConfig';
import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';
import { useGame } from './hooks/useGame';
import { LEVELS, THEMES } from './data/themes';

export default function App() {
  const {
    screen, levelIdx, themeIdx, path, lives, moves,
    memoProgress, visibleSteps, resultData,
    selectLevel, selectTheme, startGame,
    handleCellClick, goToConfig, replay,
  } = useGame();

  const lvl = LEVELS[levelIdx];
  const theme = THEMES[themeIdx];
  const correctMoves = moves.filter(m => m.correct).length;

  if (screen === 'config') return (
    <GameConfig levelIdx={levelIdx} themeIdx={themeIdx}
      onSelectLevel={selectLevel} onSelectTheme={selectTheme} onStart={startGame} />
  );

  if (screen === 'result') return (
    <GameOver resultData={resultData} themeIdx={themeIdx}
      onReplay={replay} onChangeTheme={goToConfig} />
  );

  const isMemo = screen === 'memo';
  const pct = Math.round(memoProgress * 100);
  const timeLeft = (memoProgress * lvl.memoTime).toFixed(1);
  const timerColor = pct > 40 ? '#4caf50' : pct > 20 ? '#f5c842' : '#e74c3c';

  const witchImg = isMemo
    ? theme.witchNeutral
    : lives >= lvl.lives ? theme.witchNeutral
    : lives <= 1 ? theme.witchAngry
    : theme.witchSurprised;

  return (
    <div style={s.wrapper}>
      <img src={theme.bgImg} alt="" style={s.bg} />
      <img src={witchImg} alt="" style={s.witch} />
      <img src={theme.heroImg} alt="" style={s.hero} />

      <div style={s.panel}>
        <div style={s.hud}>
          <span style={s.hudLabel}>NIVEAU : <span style={s.hudVal}>{lvl.name.toUpperCase()}</span></span>
          {isMemo ? (
            <span style={s.hudLabel}>
              TEMPS : <span style={{ ...s.hudVal, color: timerColor }}>{timeLeft}</span>
              <img src="/images/6.png" alt="" style={s.timerIcon} />
            </span>
          ) : (
            <span style={s.hudLabel}>COUPS : <span style={s.hudVal}>{correctMoves}/{lvl.pathLen}</span></span>
          )}
        </div>

        {!isMemo && (
          <div style={s.lives}>
            {Array.from({ length: lvl.lives }, (_, i) => (
              <span key={i} style={s.heart}>{i < lives ? 'heart' : 'empty'}</span>
            ))}
          </div>
        )}

        {isMemo && (
          <div style={s.timerBar}>
            <div style={{ ...s.timerFill, width: pct + '%', background: timerColor }} />
          </div>
        )}

        {!isMemo && (
          <div style={s.dots}>
            {path.map((_, i) => {
              const mv = moves[i];
              const bg = mv ? (mv.correct ? '#4caf50' : '#e74c3c') : i === moves.length ? '#f5c842' : '#2d3561';
              return <div key={i} style={{ ...s.dot, background: bg }} />;
            })}
          </div>
        )}

        <GameBoard
          levelIdx={levelIdx} theme={theme} path={path}
          moves={moves} visibleSteps={visibleSteps}
          onCellClick={handleCellClick} phase={screen}
        />

        <div style={s.status}>
          {isMemo
            ? 'Regarde bien le chemin... Memorise-le !'
            : 'Clique sur les cases dans le bon ordre.'}
        </div>

        <button style={s.backBtn} onClick={goToConfig}>Menu</button>
      </div>
    </div>
  );
}

const s = {
  wrapper: { position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', fontFamily: "'Press Start 2P', monospace" },
  bg: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', imageRendering: 'pixelated', zIndex: 0 },
  witch: { position: 'absolute', right: 0, bottom: 0, height: '48%', imageRendering: 'pixelated', zIndex: 2, objectFit: 'contain' },
  hero: { position: 'absolute', left: 0, bottom: 0, height: '38%', imageRendering: 'pixelated', zIndex: 2, objectFit: 'contain' },
  panel: { position: 'relative', zIndex: 3, background: 'rgba(8,8,20,0.92)', border: '3px solid #3d4570', borderRadius: 6, padding: '14px 16px 12px', maxWidth: '92vw' },
  hud: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  hudLabel: { fontSize: 7, color: '#8a8a9a', display: 'flex', alignItems: 'center', gap: 4 },
  hudVal: { color: '#f5c842', fontSize: 9, marginLeft: 2 },
  timerIcon: { width: 14, height: 14, imageRendering: 'pixelated', objectFit: 'contain', marginLeft: 4 },
  lives: { display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 6 },
  heart: { fontSize: 16 },
  timerBar: { height: 6, background: '#111', border: '1px solid #2d3561', borderRadius: 3, marginBottom: 8, overflow: 'hidden' },
  timerFill: { height: '100%', transition: 'width 0.1s linear, background 0.1s', borderRadius: 3 },
  dots: { display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center', marginBottom: 8 },
  dot: { width: 8, height: 8, borderRadius: 1, border: '1px solid #444' },
  status: { marginTop: 10, padding: 8, background: 'rgba(0,0,0,0.5)', border: '1px solid #2d3561', borderRadius: 3, fontSize: 6.5, color: '#e8e0d0', lineHeight: 1.8, textAlign: 'center' },
  backBtn: { marginTop: 8, background: 'transparent', border: '1px solid #2d3561', color: '#8a8a9a', fontFamily: "'Press Start 2P', monospace", fontSize: 6, padding: '5px 10px', cursor: 'pointer', borderRadius: 2 },
};