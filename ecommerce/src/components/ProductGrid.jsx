import { filtrerProduits } from "../utils/filtrage";
import ProductCard from "./ProductCard";

export default function ProductGrid({ produits, filtres, onAddToCart }) {
  const resultats = filtrerProduits(produits, filtres);

  return (
    <main className="product-grid">
      <p className="result-count">
        {resultats.length} yacht{resultats.length !== 1 ? "s" : ""} trouvé{resultats.length !== 1 ? "s" : ""}
      </p>

      {resultats.length === 0 ? (
        <p className="no-result">
          Aucun yacht ne correspond à vos critères. Essayez d'élargir vos filtres.
        </p>
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