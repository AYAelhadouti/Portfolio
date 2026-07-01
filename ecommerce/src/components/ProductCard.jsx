export default function ProductCard({ produit, onAddToCart }) {
  const prix = produit.prix.toLocaleString("fr-CA", {
    style: "currency", currency: "CAD", maximumFractionDigits: 0,
  });
  return (
    <div className="card">
      <div className="card-img-wrap">
        <img src={produit.image} alt={produit.nom} className="card-img" />
      </div>
      <div className="card-body">
        <span className="card-tag">{produit.categorie}</span>
        <h4>{produit.nom}</h4>
        <p className="card-price">{prix}</p>
        <p className="card-meta">
          <i className="bi bi-arrows-expand"></i> {produit.longueur} &nbsp;·&nbsp;
          <i className="bi bi-calendar3"></i> {produit.annee} &nbsp;·&nbsp;
          <i className="bi bi-door-closed"></i> {produit.cabines} cabine{produit.cabines > 1 ? "s" : ""} &nbsp;·&nbsp;
          {produit.condition}
        </p>
        <button className="btn btn-dark" onClick={() => onAddToCart(produit)}>
          <i className="bi bi-bag-plus"></i> Ajouter au panier
        </button>
      </div>
    </div>
  );
}