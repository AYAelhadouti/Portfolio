import { useState } from "react";
import { PRODUITS } from "../data/produits";
import { GALLERIES } from "../data/galleries";
import { CONFIG_FACETTES } from "../data/facettes";
import FacetPanel from "./FacetPanel";
import ProductGrid from "./ProductGrid";

const INITIAL_FILTRES = {
  categorie: [], marque: [], condition: [], moteur: [], couleur: [],
  cabines: 0, prix: 4000000,
};

export default function SearchPage({ onAddToCart }) {
  const [filtres, setFiltres] = useState(INITIAL_FILTRES);

  const toggleCheckbox = (facetteId, valeur) => {
    setFiltres((prev) => {
      const actuel = prev[facetteId];
      const updated = actuel.includes(valeur)
        ? actuel.filter((v) => v !== valeur)
        : [...actuel, valeur];
      return { ...prev, [facetteId]: updated };
    });
  };

  const setRange = (id, val) => setFiltres((prev) => ({ ...prev, [id]: val }));
  const setRadio = (id, val) => setFiltres((prev) => ({ ...prev, [id]: prev[id] === val ? 0 : val }));
  const clearFilters = () => setFiltres(INITIAL_FILTRES);

  return (
    <div className="search-page">
      <div className="search-hero">
        <h2>Catalogue de Yachts</h2>
        <p>Affinez votre recherche grâce aux filtres pour trouver le yacht idéal.</p>
      </div>
      <div className="app-layout">
        <FacetPanel
          config={CONFIG_FACETTES}
          filtres={filtres}
          onToggle={toggleCheckbox}
          onRange={setRange}
          onRadio={setRadio}
          onClear={clearFilters}
        />
        <ProductGrid
          produits={PRODUITS}
          filtres={filtres}
          onAddToCart={onAddToCart}
          galleries={GALLERIES}
        />
      </div>
    </div>
  );
}