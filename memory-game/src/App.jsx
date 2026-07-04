import { useState } from 'react';
import { useGame } from './hooks/useGame';
import Intro      from './components/Intro';
import GameConfig from './components/GameConfig';
import GameBoard  from './components/GameBoard';
import GameOver   from './components/GameOver';

export default function App() {
  const game = useGame();
  const [introShown, setIntroShown] = useState(false);

  if (!introShown) {
    return <Intro onDone={() => setIntroShown(true)} />;
  }

  if (game.screen === 'config') {
    return (
      <GameConfig
        levelKey={game.levelKey}   setLevelKey={game.setLevelKey}
        themeKey={game.themeKey}   setThemeKey={game.setThemeKey}
        onStart={game.startGame}
      />
    );
  }

  if (game.screen === 'game') {
    return (
      <GameBoard
        levelKey={game.levelKey}
        themeKey={game.themeKey}
        cfg={game.cfg}
        path={game.path}
        playerPath={game.playerPath}
        phase={game.phase}
        showIndex={game.showIndex}
        wrongCount={game.wrongCount}
        timeLeft={game.timeLeft}
        bubble={game.bubble}
        witchAngry={game.witchAngry}
        badTile={game.badTile}
        okTile={game.okTile}
        onTileClick={game.handleTileClick}
        formatTime={game.formatTime}
      />
    );
  }

  if (game.screen === 'gameover') {
    return (
      <GameOver
        levelKey={game.levelKey}
        themeKey={game.themeKey}
        gameResult={game.gameResult}
        score={game.score}
        elapsed={game.elapsed}
        wrongCount={game.wrongCount}
        onReplay={game.startGame}
        onMenu={() => game.setScreen('config')}
        formatTime={game.formatTime}
      />
    );
  }

  return null;
}