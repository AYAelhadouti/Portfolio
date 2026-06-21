import { useState, useEffect, useRef, useCallback } from 'react';
import { LEVELS } from '../data/themes';

function buildPath(size, len) {
  const pool = Array.from({ length: size * size }, (_, i) => i);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, len);
}

export function useGame() {
  const [screen, setScreen]     = useState('config'); 

  const [levelKey, setLevelKey] = useState('facile');
  const [themeKey, setThemeKey] = useState('foret');

  const [path,        setPath]        = useState([]);
  const [playerPath,  setPlayerPath]  = useState([]);
  const [phase,       setPhase]       = useState('idle');  
  const [showIndex,   setShowIndex]   = useState(-1);      
  const [wrongCount,  setWrongCount]  = useState(0);
  const [timeLeft,    setTimeLeft]    = useState(60);
  const [elapsed,     setElapsed]     = useState(0);

  const [bubble,      setBubble]      = useState({ icon: '?', text: 'Prêt ?' });
  const [witchAngry,  setWitchAngry]  = useState(false);
  const [badTile,     setBadTile]     = useState(null);   
  const [okTile,      setOkTile]      = useState(null);   

  const [gameResult,  setGameResult]  = useState(null);   

  const timerRef = useRef(null);
  const cfg = LEVELS[levelKey];

  useEffect(() => {
    if (phase !== 'show' || showIndex < 0) return;

    if (showIndex >= path.length) {
      const t = setTimeout(() => {
        setPhase('play');
        setShowIndex(-1);
        setBubble({ icon: '/images/mouse.png', text: 'À toi ! Reproduis le chemin.' });
      }, 600);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setShowIndex(i => i + 1), 700);
    return () => clearTimeout(t);
  }, [phase, showIndex, path.length]);

  useEffect(() => {
    if (phase !== 'play') return;

    timerRef.current = setInterval(() => {
      setElapsed(e => e + 1);
      setTimeLeft(t => Math.max(0, t - 1));
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'play' || timeLeft > 0) return;
    clearInterval(timerRef.current);
    setPhase('done');
    setBubble({ icon: '/images/clocklogo.png', text: "Temps écoulé ! La sorcière t'a eu !" });
    setWitchAngry(true);
    setGameResult('gameover');
  }, [timeLeft, phase]);

  useEffect(() => {
    if (gameResult !== 'gameover' || screen !== 'game') return;
    const t = setTimeout(() => setScreen('gameover'), 5000);
    return () => clearTimeout(t);
  }, [gameResult, screen]);

  const startGame = useCallback(() => {
    clearInterval(timerRef.current);
    const newPath = buildPath(cfg.grid, cfg.pathLen);
    setPath(newPath);
    setPlayerPath([]);
    setWrongCount(0);
    setElapsed(0);
    setTimeLeft(cfg.timeLimit);
    setBubble({ icon: '👁', text: 'Mémorise le chemin !' });
    setWitchAngry(false);
    setBadTile(null);
    setOkTile(null);
    setGameResult(null);
    setPhase('show');
    setShowIndex(0);
    setScreen('game');
  }, [cfg]);

  const handleTileClick = useCallback((tileIndex) => {
    if (phase !== 'play') return;

    const expected = path[playerPath.length];

    if (tileIndex === expected) {
      const newPlayer = [...playerPath, tileIndex];
      setPlayerPath(newPlayer);
      setOkTile(tileIndex);
      setTimeout(() => setOkTile(null), 400);

      if (newPlayer.length === path.length) {
        clearInterval(timerRef.current);
        setPhase('done');
        setBubble({ icon: '/images/trophee.png', text: 'Bravo ! Tu as trouvé le chemin !' });
        setGameResult('victory');
        setTimeout(() => setScreen('gameover'), 1000);
      } else {
        setBubble({ icon: '/images/flechecorrect.png', text: `Continue ! (${newPlayer.length}/${path.length})` });
      }
    } else {
      const newWrong = wrongCount + 1;
      setWrongCount(newWrong);
      setBadTile(tileIndex);
      setTimeout(() => setBadTile(null), 650);

      const left = cfg.maxWrong - newWrong;
      if (left <= 0) {
        clearInterval(timerRef.current);
        setPhase('done');
        setBubble({ icon: '/images/brokenheart.png', text: "La sorcière t'a rattrapé !" });
        setWitchAngry(true);
        setGameResult('gameover');
        setTimeout(() => setScreen('gameover'), 1200);
      } else {
        setBubble({
          icon: '/images/crane.png',
          text: `Mauvais chemin ! (${left} chance${left > 1 ? 's' : ''} restante${left > 1 ? 's' : ''})`,
        });
        setWitchAngry(true);
        setTimeout(() => setWitchAngry(false), 1600);
      }
    }
  }, [phase, path, playerPath, wrongCount, cfg]);

  const score = gameResult === 'victory'
    ? Math.max(0, Math.floor((cfg.timeLimit - elapsed) * 10 - wrongCount * 50))
    : 0;

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return {
    screen, setScreen,
    levelKey, setLevelKey,
    themeKey, setThemeKey,
    cfg,
    path, playerPath,
    phase, showIndex,
    wrongCount,
    timeLeft, elapsed,
    bubble, witchAngry,
    badTile, okTile,
    gameResult, score,
    startGame,
    handleTileClick,
    formatTime,
  };
}