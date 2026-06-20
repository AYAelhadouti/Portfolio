// ── LEVELS ────────────────────────────────────────────────────────────────
// Was: var LEVELS = { ... } in the original HTML
export const LEVELS = {
  facile:    { label: 'Facile',    grid: 4, pathLen: 4,  timeLimit: 60,  maxWrong: 3 },
  moyen:     { label: 'Moyen',     grid: 5, pathLen: 7,  timeLimit: 90,  maxWrong: 2 },
  difficile: { label: 'Difficile', grid: 6, pathLen: 10, timeLimit: 120, maxWrong: 1 },
};

// ── THEMES ────────────────────────────────────────────────────────────────
// Was: var THEMES = { ... } in the original HTML
// Images must be placed in public/images/<theme>/
// witch_neutral.png, witch_angry.png, hero.png are shared across themes
export const THEMES = {
  foret: {
    label: 'Forêt',
    icon: '🌲',
    bg:           '/images/foret/bg.jpg',
    tile:         '/images/foret/tile.jpg',
    tilePath:     '/images/foret/tile_path.jpg', // highlighted tile during path reveal
    witchNeutral: '/images/witch_neutral.png',
    witchAngry:   '/images/witch_angry.png',
    hero:         '/images/hero.png',
    fallback:     '#2d6a4f', // background color if image missing
  },
  fantastique: {
    label: 'Fantastique',
    icon: '✨',
    bg:           '/images/fantastique/bg.jpg',
    tile:         '/images/fantastique/tile.jpg',
    tilePath:     '/images/fantastique/tile_path.jpg',
    witchNeutral: '/images/witch_neutral.png',
    witchAngry:   '/images/witch_angry.png',
    hero:         '/images/hero.png',
    fallback:     '#6b21a8',
  },
  ocean: {
    label: 'Océan',
    icon: '🌊',
    bg:           '/images/ocean/bg.jpg',
    tile:         '/images/ocean/tile.jpg',
    tilePath:     '/images/ocean/tile_path.jpg',
    witchNeutral: '/images/witch_neutral.png',
    witchAngry:   '/images/witch_angry.png',
    hero:         '/images/hero.png',
    fallback:     '#0c4a6e',
  },
};