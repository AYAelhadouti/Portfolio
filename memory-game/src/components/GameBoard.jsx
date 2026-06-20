import React from 'react';
import Card from './Card';
import { LEVELS, THEMES } from '../data/themes';

export default function GameBoard({
  levelIdx, themeIdx, path, moves, visibleSteps,
  onCellClick, phase, // 'memo' | 'recall'
}) {
  const lvl = LEVELS[levelIdx];
  const theme = THEMES[themeIdx];
  const size = lvl.grid;

  const getCellState = (r, c) => {
    const pathIdx = path.findIndex(([pr, pc]) => pr === r && pc === c);
    const isOnPath = pathIdx !== -1;

    if (phase === 'memo') {
      if (isOnPath && pathIdx < visibleSteps) return 'path';
      return 'idle';
    }

    // recall phase
    const move = moves.find(m => m.r === r && m.c === c);
    if (move) return move.correct ? 'good' : 'bad';
    return 'idle';
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${size}, 1fr)`,
    gap: 3,
    background: '#0a0a14',
    padding: 4,
    border: '2px solid #2d3561',
    borderRadius: 4,
    width: '100%',
    maxWidth: size === 4 ? 260 : size === 5 ? 290 : 300,
    margin: '0 auto',
  };

  return (
    <div style={gridStyle}>
      {Array.from({ length: size }, (_, r) =>
        Array.from({ length: size }, (_, c) => {
          const isHero = r === path[0]?.[0] && c === path[0]?.[1];
          const isExit = r === path[path.length - 1]?.[0] && c === path[path.length - 1]?.[1];
          return (
            <Card
              key={`${r}-${c}`}
              state={getCellState(r, c)}
              isHero={isHero}
              isExit={isExit}
              floorEmoji={theme.floorEmoji}
              onClick={() => onCellClick(r, c)}
            />
          );
        })
      )}
    </div>
  );
}
