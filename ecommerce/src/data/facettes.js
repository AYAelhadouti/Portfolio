// src/data/facettes.js
export const CONFIG_FACETTES = [
  {
    id: "categorie",
    label: "Catégorie",
    type: "checkbox",
    options: ["Voilier", "Yacht à moteur", "Catamaran", "Superyacht"],
  },
  {
    id: "marque",
    label: "Marque",
    type: "checkbox",
    options: ["Bénéteau", "Sunseeker", "Lagoon", "Jeanneau", "Bavaria", "Ferretti", "Riviera", "Leopard", "Prestige", "Fountaine Pajot"],
  },
  {
    id: "condition",
    label: "Condition",
    type: "checkbox",
    options: ["Neuf", "Occasion"],
  },
  {
    id: "moteur",
    label: "Motorisation",
    type: "checkbox",
    options: ["Inboard", "Hors-bord"],
  },
  {
    id: "couleur",
    label: "Couleur",
    type: "checkbox",
    options: ["Blanc", "Bleu", "Noir"],
  },
  {
    id: "cabines",
    label: "Cabines minimum",
    type: "radio",
    options: [0, 2, 3, 4, 5],
  },
  {
    id: "prix",
    label: "Prix maximum",
    type: "range",
    min: 0,
    max: 2000000,
    step: 50000,
  },
];
