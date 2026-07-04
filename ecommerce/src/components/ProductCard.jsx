import { useState } from "react";

export default function ProductCard({ produit, onAddToCart, images }) {
  const imgs = images && images.length ? images : [produit.image];
  const [imgIdx, setImgIdx] = useState(0);

  const prix = produit.prix.toLocaleString("fr-CA", {
    style: "currency", currency: "CAD", maximumFractionDigits: 0,
  });

  const prev = (e) => {
    e.stopPropagation();
    setImgIdx((i) => (i === 0 ? imgs.length - 1 : i - 1));
  };
  const next = (e) => {
    e.stopPropagation();
    setImgIdx((i) => (i === imgs.length - 1 ? 0 : i + 1));
  };

  return (
    // Use feat-card so it inherits ALL the gallery CSS already defined
    <div className="feat-card catalogue-card">
      <div className="feat-img-wrap">
        <img src={imgs[imgIdx]} alt={produit.nom} className="feat-img" />

        <button className="feat-arrow feat-arrow-left" onClick={prev} aria-label="Image précédente">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <button className="feat-arrow feat-arrow-right" onClick={next} aria-label="Image suivante">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>

        <div className="feat-counter">
          <span className="feat-counter-cur">{imgIdx + 1}</span>
          <span className="feat-counter-sep">/</span>
          <span className="feat-counter-tot">{imgs.length}</span>
        </div>

        <div className="feat-thumbs">
          {imgs.map((src, i) => (
            <button
              key={i}
              className={`feat-thumb${i === imgIdx ? " active" : ""}`}
              onClick={(e) => { e.stopPropagation(); setImgIdx(i); }}
              aria-label={`Image ${i + 1}`}
            >
              <img src={src} alt={`${produit.nom} ${i + 1}`} />
            </button>
          ))}
        </div>
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
        <button className="btn btn-dark" onClick={() => onAddToCart(produit, imgs[imgIdx])}>
          <i className="bi bi-bag-plus"></i> Ajouter au panier
        </button>
      </div>
    </div>
  );
}