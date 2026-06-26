// src/components/ProductCard.jsx
import { formatPrix } from "../utils/filtrage";

// Placeholder images mapped by key
const IMAGE_URLS = {
  yacht1: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=400&q=80",
  yacht2: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=400&q=80",
  yacht3: "https://images.unsplash.com/photo-1520854221256-17d7dc783f55?w=400&q=80",
  yacht4: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80",
  yacht5: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&q=80",
  yacht6: "https://images.unsplash.com/photo-1577644659649-1a2ca57baf2b?w=400&q=80",
  yacht7: "https://images.unsplash.com/photo-1595351298020-038700609878?w=400&q=80",
  yacht8: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80",
  yacht9: "https://images.unsplash.com/photo-1560908826-6a94fd0dfe06?w=400&q=80",
  interior: "https://images.unsplash.com/photo-1611483015773-e90e2b1b3d28?w=400&q=80",
};

export default function ProductCard({ produit, onAddToCart }) {
  return (
    <div className="card">
      <img
        src={IMAGE_URLS[produit.image] || IMAGE_URLS.yacht1}
        alt={produit.nom}
      />
      <div className="card-body">
        <span className="cat-tag">{produit.categorie}</span>
        <h4>{produit.nom}</h4>
        <div className="price">{formatPrix(produit.prix)}</div>
        <p className="specs">
          {produit.longueur} · {produit.annee} · {produit.cabines} cabine
          {produit.cabines > 1 ? "s" : ""} · {produit.condition}
        </p>
        <button className="btn btn-primary" onClick={() => onAddToCart(produit)}>
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
