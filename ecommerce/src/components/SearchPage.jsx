// src/components/SearchPage.jsx
import { useState } from "react";
import { CONFIG_FACETTES } from "../data/facettes";
import { PRODUITS } from "../data/produits";
import FacetPanel from "./FacetPanel";
import ProductGrid from "./ProductGrid";

const FILTRES_INITIAUX = {
  categorie: [],
  marque: [],
  condition: [],
  moteur: [],
  couleur: [],
  cabines: 0,
  prix: 2000000,
};

export default function SearchPage({ onAddToCart }) {
  const [filtres, setFiltres] = useState(FILTRES_INITIAUX);

  // Heuristique : filtres actifs visibles (badges)
  const activeTags = [
    ...["categorie", "marque", "condition", "moteur", "couleur"].flatMap((key) =>
      filtres[key].map((val) => ({ key, val, label: val }))
    ),
    ...(filtres.cabines > 0
      ? [{ key: "cabines", val: filtres.cabines, label: `${filtres.cabines}+ cabines` }]
      : []),
    ...(filtres.prix < 2000000
      ? [
          {
            key: "prix",
            val: 2000000,
            label: `Max ${new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(filtres.prix)}`,
          },
        ]
      : []),
  ];

  const toggleCheckbox = (facetteId, valeur) => {
    setFiltres((prev) => {
      const actuel = prev[facetteId];
      const updated = actuel.includes(valeur)
        ? actuel.filter((v) => v !== valeur)
        : [...actuel, valeur];
      return { ...prev, [facetteId]: updated };
    });
  };

  const setRange = (id, val) =>
    setFiltres((prev) => ({ ...prev, [id]: val }));

  const setRadio = (id, val) =>
    setFiltres((prev) => ({ ...prev, [id]: prev[id] === val ? 0 : val }));

  const removeTag = (tag) => {
    if (tag.key === "prix") {
      setFiltres((prev) => ({ ...prev, prix: 2000000 }));
    } else if (tag.key === "cabines") {
      setFiltres((prev) => ({ ...prev, cabines: 0 }));
    } else {
      toggleCheckbox(tag.key, tag.val);
    }
  };

  const clearAll = () => setFiltres(FILTRES_INITIAUX);

  return (
    <div className="search-page">
      <div className="search-header">
        <h2>Catalogue de yachts</h2>
      </div>

      {/* Active filter tags — Heuristique : visibilité + contrôle */}
      {activeTags.length > 0 && (
        <div className="active-tags">
          {activeTags.map((tag, i) => (
            <span className="badge" key={i}>
              {tag.label}
              <button onClick={() => removeTag(tag)}>✕</button>
            </span>
          ))}
        </div>
      )}

      <div className="search-layout">
        <FacetPanel
          config={CONFIG_FACETTES}
          filtres={filtres}
          onToggle={toggleCheckbox}
          onRange={setRange}
          onRadio={setRadio}
          onClear={clearAll}
        />
        <ProductGrid
          produits={PRODUITS}
          filtres={filtres}
          onAddToCart={onAddToCart}
        />
      </div>
    </div>
  );
}
