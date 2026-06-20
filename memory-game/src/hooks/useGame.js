import { useState, useCallback, useRef } from 'react';
import { LEVELS } from '../data/themes';

function generatePath(size, length) {
  const dirs = [[0,1],[1,0],[0,-1],[-1,0]];
  let path = [];
  let r = 0, c = 0;
  path.push([r, c]);
  let attempts = 0;
  while (path.length < length && attempts < 3000) {
    attempts++;
    const shuffled = dirs.slice().sort(() => Math.random() - 0.5);
    let moved = false;
    for (const [dr, dc] of shuffled) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < size && nc >= 0 && nc < size &&
          !path.some(([pr, pc]) => pr === nr && pc === nc)) {
        r = nr; c = nc;
        path.push([r, c]);
        moved = true;
        break;
      }
    }
    if (!moved) break;
  }
  if (path.length < length) return generatePath(size, length);
  return path;
}

export function useGame() {
  const [screen, setScreen] = useState('config');
  const [levelIdx, setLevelIdx] = useState(0);
  const [themeIdx, setThemeIdx] = useState(0);
  const [path, setPath] = useState([]);
  const [lives, setLives] = useState(3);
  const [moves, setMoves] = useState([]);
  const [memoProgress, setMemoProgress] = useState(1);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [resultData, setResultData] = useState(null);

  const recallStart = useRef(null);
  const memoIntervalRef = useRef(null);
  const stepTimerRef = useRef(null);

  const selectLevel = useCallback((idx) => setLevelIdx(idx), []);
  const selectTheme = useCallback((idx) => setThemeIdx(idx), []);

  const startGame = useCallback(() => {
    const lvl = LEVELS[levelIdx];
    const newPath = generatePath(lvl.grid, lvl.pathLen);
    setPath(newPath);
    setMoves([]);
    setLives(lvl.lives);
    setVisibleSteps(0);
    setMemoProgress(1);
    setScreen('memo');

    const stepDelay = (lvl.memoTime * 1000) / (lvl.pathLen + 2);
    let step = 0;
    const revealNext = () => {
      step++;
      setVisibleSteps(step);
      if (step < lvl.pathLen) stepTimerRef.current = setTimeout(revealNext, stepDelay);
    };
    stepTimerRef.current = setTimeout(revealNext, 400);

    const totalMs = lvl.memoTime * 1000;
    const startTime = Date.now();
    memoIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, totalMs - elapsed);
      setMemoProgress(remaining / totalMs);
      if (remaining <= 0) {
        clearInterval(memoIntervalRef.current);
        clearTimeout(stepTimerRef.current);
        setVisibleSteps(lvl.pathLen);
        setTimeout(() => {
          recallStart.current = Date.now();
          setMoves([]);
          setScreen('recall');
        }, 300);
      }
    }, 100);
  }, [levelIdx]);

  const handleCellClick = useCallback((r, c) => {
    setMoves(prev => {
      const moveIdx = prev.length;
      if (moveIdx >= path.length) return prev;
      const expected = path[moveIdx];
      const correct = expected[0] === r && expected[1] === c;
      const next = [...prev, { r, c, correct }];

      if (correct && next.length === path.length) {
        const elapsed = Math.round((Date.now() - recallStart.current) / 1000);
        const lvl = LEVELS[levelIdx];
        const score = Math.max(0, 1000 + (lives * 200) - elapsed * 2 + lvl.pathLen * 50);
        const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
        const secs = String(elapsed % 60).padStart(2, '0');
        setTimeout(() => {
          setResultData({ won: true, levelName: lvl.name, pathCorrect: next.length, pathTotal: path.length, time: mins+':'+secs, score });
          setScreen('result');
        }, 600);
      } else if (!correct) {
        const newLives = lives - 1;
        setLives(newLives);
        if (newLives <= 0) {
          const elapsed = Math.round((Date.now() - recallStart.current) / 1000);
          const lvl = LEVELS[levelIdx];
          const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
          const secs = String(elapsed % 60).padStart(2, '0');
          const correct2 = next.filter(m => m.correct).length;
          setTimeout(() => {
            setResultData({ won: false, levelName: lvl.name, pathCorrect: correct2, pathTotal: path.length, time: mins+':'+secs, score: Math.max(0, correct2 * 40) });
            setScreen('result');
          }, 600);
          return next;
        }
        setTimeout(() => setMoves(p => p.filter((_, i) => i !== moveIdx)), 700);
      }
      return next;
    });
  }, [path, lives, levelIdx]);

  const goToConfig = useCallback(() => {
    clearInterval(memoIntervalRef.current);
    clearTimeout(stepTimerRef.current);
    setScreen('config');
  }, []);

  return {
    screen, levelIdx, themeIdx, path, lives, moves,
    memoProgress, visibleSteps, resultData,
    selectLevel, selectTheme, startGame,
    handleCellClick, goToConfig, replay: goToConfig,
  };
}