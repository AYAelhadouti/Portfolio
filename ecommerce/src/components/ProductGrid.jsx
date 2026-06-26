// src/components/ProductGrid.jsx
import { filtrerProduits } from "../utils/filtrage";
import ProductCard from "./ProductCard";

export default function ProductGrid({ produits, filtres, onAddToCart }) {
  const resultats = filtrerProduits(produits, filtres);

  return (
    <main className="product-grid-area">
      {/* Heuristique Nielsen : visibilité de l'état du système */}
      <p className="result-count">
        {resultats.length} yacht{resultats.length !== 1 ? "s" : ""} trouvé
        {resultats.length !== 1 ? "s" : ""}
      </p>

      {resultats.length === 0 ? (
        <div className="no-results">
          <h3>Aucun yacht ne correspond à vos critères.</h3>
          <p>Essayez de retirer certains filtres pour élargir votre recherche.</p>
        </div>
      ) : (
        <div className="grid">
          {resultats.map((p) => (
            <ProductCard key={p.id} produit={p} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </main>
  );
}
