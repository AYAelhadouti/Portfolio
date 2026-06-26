// src/components/HomePage.jsx
import { PRODUITS } from "../data/produits";
import { formatPrix } from "../utils/filtrage";

const FEATURED_IDS = [2, 3, 6];
const IMAGE_URLS = {
  yacht1: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=400&q=80",
  yacht2: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=400&q=80",
  yacht3: "https://images.unsplash.com/photo-1520854221256-17d7dc783f55?w=400&q=80",
  yacht6: "https://images.unsplash.com/photo-1577644659649-1a2ca57baf2b?w=400&q=80",
};

export default function HomePage({ onNavigate, onAddToCart }) {
  const featured = PRODUITS.filter((p) => FEATURED_IDS.includes(p.id));

  return (
    <div className="home-page">
      {/* Promo banner */}
      <div className="promo-banner">
        🌊 Offre estivale — 5 % de remise sur toute réservation avant le 31 juillet ! Code{" "}
        <strong>AZUR2026</strong>
      </div>

      {/* Hero */}
      <section className="hero">
        <div
          className="hero-bg"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1400&q=80)",
          }}
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">Yachts de luxe à vendre</p>
          <h1>Votre yacht de rêve vous attend</h1>
          <p>
            Découvrez notre sélection exclusive de voiliers, yachts à moteur et
            catamarans de prestige.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => onNavigate("search")}>
              Explorer le catalogue
            </button>
            <button className="btn btn-outline" onClick={() => onNavigate("survey")}>
              Partagez votre avis
            </button>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="featured-section">
        <div className="section-header">
          <p className="eyebrow">Sélection du moment</p>
          <h2>Yachts en vedette</h2>
          <p>Une sélection triée sur le volet par nos experts nautiques.</p>
        </div>
        <div className="featured-grid">
          {featured.map((p) => (
            <div className="feat-card" key={p.id} onClick={() => onNavigate("search")}>
              <img
                src={IMAGE_URLS[p.image] || IMAGE_URLS.yacht1}
                alt={p.nom}
              />
              <div className="feat-card-body">
                <span className="tag">{p.categorie}</span>
                <h3>{p.nom}</h3>
                <div className="price">{formatPrix(p.prix)}</div>
                <p className="meta">
                  {p.longueur} · {p.annee} · {p.cabines} cabines
                </p>
                <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); onAddToCart(p); }}>
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button className="btn btn-navy" onClick={() => onNavigate("search")}>
            Voir tout le catalogue →
          </button>
        </div>
      </section>

      {/* About strip */}
      <section className="about-strip">
        <img
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80"
          alt="Yacht en mer"
        />
        <div className="about-text">
          <p className="eyebrow">À propos d'Azur Yachts</p>
          <h2>L'excellence nautique depuis 1998</h2>
          <p>
            Azur Yachts est votre partenaire de confiance pour l'achat et la vente
            de yachts de prestige. Notre équipe d'experts vous accompagne à chaque
            étape de votre projet nautique.
          </p>
          <div className="stats-row">
            <div className="stat">
              <div className="num">25+</div>
              <div className="lbl">Années d'expérience</div>
            </div>
            <div className="stat">
              <div className="num">500+</div>
              <div className="lbl">Yachts vendus</div>
            </div>
            <div className="stat">
              <div className="num">98%</div>
              <div className="lbl">Clients satisfaits</div>
            </div>
          </div>
          <button className="btn btn-outline" onClick={() => onNavigate("search")}>
            Parcourir le catalogue
          </button>
        </div>
      </section>
    </div>
  );
}
