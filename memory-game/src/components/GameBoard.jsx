// Was: <div id="screen-game"> + HUD markup + game-area in the original HTML
import Card from './Card';
import { THEMES, LEVELS } from '../data/themes';

const TILE_SIZE = { 4: 80, 5: 68, 6: 58 };

export default function GameBoard({
  levelKey, themeKey, cfg,
  path, playerPath, phase, showIndex,
  wrongCount, timeLeft,
  bubble, witchAngry,
  badTile, okTile,
  onTileClick, formatTime,
}) {
  const theme    = THEMES[themeKey];
  const tileSize = TILE_SIZE[cfg.grid];
  const total    = cfg.grid * cfg.grid;

  return (
    <div style={{
      width: '100vw', height: '100vh', position: 'relative',
      backgroundImage: `url(${theme.bg})`,
      backgroundSize: 'cover', backgroundPosition: 'center',
    }}>
      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,10,30,0.48)' }} />

      {/* ── HUD ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 24px', zIndex: 10,
        background: 'rgba(5,12,35,0.75)', backdropFilter: 'blur(4px)',
        borderBottom: '1px solid rgba(80,120,220,0.5)',
      }}>
        <span style={{ fontFamily: "'Press Start 2P'", fontSize: 11, color: '#f5c518' }}>
          NIVEAU : {LEVELS[levelKey].label}
        </span>

        <div style={{ display: 'flex', gap: 20 }}>
          {/* Timer — uses clocklogo.png instead of emoji */}
          <HudStat
            icon={<img src="/images/clocklogo.png" alt="timer" style={{ width: 18, height: 18, objectFit: 'contain', verticalAlign: 'middle' }} />}
            value={formatTime(timeLeft)}
          />
          <HudStat icon="🎯" value={`${playerPath.length}/${path.length}`} />
          <HudStat icon="✗"  value={`${wrongCount}/${cfg.maxWrong}`} />
        </div>
      </div>

      {/* ── Game area ── */}
      <div style={{
        position: 'absolute', top: 56, left: 0, right: 0, bottom: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 28, zIndex: 5,
      }}>
        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cfg.grid}, 1fr)`,
          gap: 4,
        }}>
          {Array.from({ length: total }, (_, i) => {
            const isShowing = phase === 'show' && showIndex < path.length && path[showIndex] === i;
            return (
              <Card
                key={i}
                tileIndex={i}
                themeKey={themeKey}
                isShowing={isShowing}
                isOk={okTile === i}
                isBad={badTile === i}
                size={tileSize}
                onClick={onTileClick}
              />
            );
          })}
        </div>

        {/* Side panel — witch + speech bubble */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 14, minWidth: 270, maxWidth: 290,
        }}>
          {/* Speech bubble */}
          <div style={{
            background: 'rgba(10,20,50,0.90)',
            border: '2px solid rgba(80,120,220,0.5)',
            borderRadius: 12, padding: '14px 16px',
            fontSize: 20, lineHeight: 1.45,
            width: '100%', minHeight: 84, color: '#e8f4ff',
          }}>
            <span>{bubble.icon}</span>
            <span style={{ marginLeft: 8 }}>{bubble.text}</span>
          </div>

          {/* Witch sprite — switches between neutral and angry PNG */}
          <div style={{
            width: 180, height: 270,
            backgroundImage: `url(${witchAngry ? theme.witchAngry : theme.witchNeutral})`,
            backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom',
            filter: 'drop-shadow(0 0 12px rgba(120,0,200,.5))',
            animation: 'float 3s ease-in-out infinite',
            transition: 'background-image .25s',
          }} />
        </div>
      </div>
    </div>
  );
}

function HudStat({ icon, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Press Start 2P'", fontSize: 10 }}>
      <span style={{ color: '#8ba4d0' }}>{icon}</span>
      <span style={{ color: '#f5c518' }}>{value}</span>
    </div>
  );
}