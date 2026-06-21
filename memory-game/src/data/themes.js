// ── LEVELS ────────────────────────────────────────────────────────────────
export const LEVELS = {
  facile:    { label: 'Facile',    grid: 4, pathLen: 4,  timeLimit: 60,  maxWrong: 3 },
  moyen:     { label: 'Moyen',     grid: 5, pathLen: 7,  timeLimit: 90,  maxWrong: 2 },
  difficile: { label: 'Difficile', grid: 6, pathLen: 10, timeLimit: 120, maxWrong: 1 },
};

// ── THEMES ────────────────────────────────────────────────────────────────
// All images are placed flat in public/images/
// Shared characters: persoprincipal.png (hero), witchnormal.png (neutral), sorciereencolere.png (angry)
export const THEMES = {
  foret: {
    label:        'Forêt',
    icon:         '/images/foret.png',
    bg:           '/images/backgroundofficiel.png',
    tile:         '/images/caseforet.png',
    tilePath:     '/images/casejauneamemoriser.png',
    tileError:    '/images/caserougeerreur.png',
    witchNeutral: '/images/witchnormal.png',
    witchAngry:   '/images/sorciereencolere.png',
    hero:         '/images/persoprincipal.png',
  },
  chateau: {
    label:        'Château',
    icon:         '/images/chateau.png',
    bg:           '/images/chateaubackground.png',
    tile:         '/images/chateau.png',
    tilePath:     '/images/casejauneamemoriser.png',
    tileError:    '/images/caserougeerreur.png',
    witchNeutral: '/images/witchnormal.png',
    witchAngry:   '/images/sorciereencolere.png',
    hero:         '/images/persoprincipal.png',
  },
  donjon: {
    label:        'Donjon',
    icon:         '/images/donjon.png',
    bg:           '/images/donjonbackground.png',
    tile:         '/images/donjon.png',
    tilePath:     '/images/casejauneamemoriser.png',
    tileError:    '/images/caserougeerreur.png',
    witchNeutral: '/images/witchnormal.png',
    witchAngry:   '/images/sorciereencolere.png',
    hero:         '/images/persoprincipal.png',
  },
};