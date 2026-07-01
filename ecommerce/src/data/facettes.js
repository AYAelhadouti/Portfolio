export const CONFIG_FACETTES = [
  {
    id: "categorie",
    label: "Catégorie",
    type: "checkbox",
    options: ["Voilier", "Motoryacht", "Catamaran", "Mega-Yacht"],
  },
  {
    id: "marque",
    label: "Marque",
    type: "checkbox",
    options: ["Beneteau", "Prestige", "Jeanneau", "Sea Ray", "Sessa",
              "Leopard", "Bavaria", "Sunseeker", "Lexus", "F. Pajot",
              "H-Rassy", "Azimut"],
  },
  {
    id: "condition",
    label: "État",
    type: "checkbox",
    options: ["Neuf", "Occasion"],
  },
  {
    id: "moteur",
    label: "Propulsion",
    type: "checkbox",
    options: ["Inbord", "Hors-bord", "Hybride"],
  },
  {
    id: "couleur",
    label: "Couleur",
    type: "checkbox",
    options: ["Blanc", "Bleu", "Gris", "Noir"],
  },
  {
    id: "cabines",
    label: "Cabines minimum",
    type: "radio",
    options: [2, 3, 4, 5],
  },
  {
    id: "prix",
    label: "Prix maximum ($)",
    type: "range",
    min: 0,
    max: 4000000,
    step: 50000,
  },
];