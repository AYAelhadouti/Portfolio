// Was: each <div class="tile"> in #game-grid + its click handler
import { THEMES } from '../data/themes';

export default function Card({ tileIndex, themeKey, isShowing, isOk, isBad, size, onClick }) {
  const theme = THEMES[themeKey];

  // Visual state — mirrors the .path / .ok / .bad CSS classes from the original
  let border    = '2px solid rgba(60,80,120,0.5)';
  let boxShadow = 'none';
  let animation = undefined;
  let bgImage   = theme.tile;

  if (isShowing) {
    border    = '2px solid #f5c518';
    boxShadow = '0 0 12px rgba(245,197,24,.7)';
    bgImage   = theme.tilePath || theme.tile; // highlighted tile during reveal
  }
  if (isOk) {
  bgImage   = '/images/greencube.png';
  border    = '2px solid #22c55e';
  boxShadow = '0 0 14px rgba(34,197,94,.8)';
  }
  if (isBad) {
  bgImage   = '/images/caserougeerreur.png';
  border    = '2px solid #ef4444';
  boxShadow = '0 0 14px rgba(239,68,68,.9)';
  animation = 'shake 0.3s ease';
  }

  return (
    <div
      role="button"
      aria-label={`Tuile ${tileIndex}`}
      onClick={() => onClick(tileIndex)}
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${bgImage})`,
        backgroundColor: theme.fallback, // shown if image fails to load
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: 6,
        cursor: 'pointer',
        border,
        boxShadow,
        animation,
        transition: 'box-shadow .12s',
      }}
    />
  );
}