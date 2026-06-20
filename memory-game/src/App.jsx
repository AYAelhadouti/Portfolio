// Was: the showScreen() function + window.addEventListener('load', boot)
import { useGame } from './hooks/useGame';
import GameConfig from './components/GameConfig';
import GameBoard  from './components/GameBoard';
import GameOver   from './components/GameOver';

export default function App() {
  const game = useGame();

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
     levelIdx={levelIdx} themeIdx={themeIdx} path={path}
     moves={moves} visibleSteps={visibleSteps}
     onCellClick={handleCellClick} phase={screen}
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