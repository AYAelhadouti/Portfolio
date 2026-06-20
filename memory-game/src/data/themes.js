// ── LEVELS ────────────────────────────────────────────────────────────────
export const LEVELS = {
  facile:    { label: 'Facile',    grid: 4, pathLen: 4,  timeLimit: 60,  maxWrong: 3 },
  moyen:     { label: 'Moyen',     grid: 5, pathLen: 7,  timeLimit: 90,  maxWrong: 2 },
  difficile: { label: 'Difficile', grid: 6, pathLen: 10, timeLimit: 120, maxWrong: 1 },
};

// ── THEMES ────────────────────────────────────────────────────────────────
// All images are placed flat in public/images/
// Shared characters: persoprincipal.png (hero), witchnormal.png (neutral), crane.png (angry)
export const THEMES = {
  foret: {
    label:        'Forêt',
    icon:         '/images/foret.png',
    bg:           '/images/backgroundofficiel.png',
    tile:         '/images/foret.png',
    tilePath:     '/images/greencube.png',
    witchNeutral: '/images/witchnormal.png',
    witchAngry:   '/images/crane.png',
    hero:         '/images/persoprincipal.png',
    fallback:     '#2d6a4f',
  },
  fantastique: {
    label:        'Fantastique',
    icon:         '/images/chateau.png',
    bg:           '/images/backgroundtonnere.png',
    tile:         '/images/chateau.png',
    tilePath:     '/images/greencube.png',
    witchNeutral: '/images/witchnormal.png',
    witchAngry:   '/images/crane.png',
    hero:         '/images/persoprincipal.png',
    fallback:     '#6b21a8',
  },
  ocean: {
    label:        'Océan',
    icon:         '/images/donjon.png',
    bg:           '/images/backgroundtonnere.png',
    tile:         '/images/donjon.png',
    tilePath:     '/images/greencube.png',
    witchNeutral: '/images/witchnormal.png',
    witchAngry:   '/images/crane.png',
    hero:         '/images/persoprincipal.png',
    fallback:     '#0c4a6e',
  },
};