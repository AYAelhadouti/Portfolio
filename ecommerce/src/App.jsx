import { useState, useEffect } from "react";
import { PRODUITS } from "./data/produits";
import Header from "./components/Header";
import SearchPage from "./components/SearchPage";
import CheckoutFlow from "./components/CheckoutFlow";
import SurveyPage from "./components/SurveyPage";
import ContactPage from "./components/ContactPage";

// Image galleries per featured yacht
const GALLERIES = {
  1: ["./img/bo1.png","./img/bo2.png","./img/bo3.png","./img/bo4.png","./img/bo5.png"],
  2: ["./img/win1.png","./img/win2.png","./img/win3.png","./img/win4.png","./img/win5.png"],
  3: ["./img/ser1.png","./img/ser2.png","./img/ser3.png","./img/ser4.png","./img/ser5.png"],
  4: ["./img/so1.png","./img/so2.png","./img/so3.png","./img/so4.png","./img/so5.png"],
  5: ["./img/opa1.png","./img/opa2.png","./img/opa3.png","./img/opa4.png","./img/opa5.png"],
  6: ["./img/fra1.png","./img/fra2.png","./img/fra3.png","./img/fra4.png","./img/fra5.png"],
};

function FeaturedCard({ p, onNavigate, onAddToCart }) {
  const [imgIdx, setImgIdx] = useState(0);
  const images = GALLERIES[p.id] || [p.image];
  const fmt = (n) => n.toLocaleString("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });

  const prev = (e) => {
    e.stopPropagation();
    setImgIdx((i) => (i === 0 ? images.length - 1 : i - 1));
  };
  const next = (e) => {
    e.stopPropagation();
    setImgIdx((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="feat-card">
      <div className="feat-img-wrap">
        <img src={images[imgIdx]} alt={p.nom} className="feat-img" />
        {/* Arrows */}
        <button className="feat-arrow feat-arrow-left" onClick={prev} aria-label="Image précédente">
          <i className="bi bi-chevron-left"></i>
        </button>
        <button className="feat-arrow feat-arrow-right" onClick={next} aria-label="Image suivante">
          <i className="bi bi-chevron-right"></i>
        </button>
        {/* Dots */}
        <div className="feat-dots">
          {images.map((_, i) => (
            <span
              key={i}
              className={`feat-dot${i === imgIdx ? " active" : ""}`}
              onClick={(e) => { e.stopPropagation(); setImgIdx(i); }}
            />
          ))}
        </div>
        {/* Counter */}
        <div className="feat-counter">{imgIdx + 1} / {images.length}</div>
      </div>
      <div className="feat-card-body">
        <div className="feat-tag">{p.categorie}</div>
        <h3>{p.nom}</h3>
        <div className="feat-price">{fmt(p.prix)}</div>
        <p className="feat-meta">{p.longueur} · {p.annee} · {p.condition} · {p.cabines} cabines</p>
        <div style={{display:"flex", gap:".5rem", flexWrap:"wrap"}}>
          <button className="btn btn-dark" onClick={() => onNavigate("search")}>
            <i className="bi bi-arrow-right"></i> Voir le catalogue
          </button>
          <button className="btn btn-primary" onClick={() => onAddToCart(p)}>
            <i className="bi bi-bag-plus"></i> Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}

function HomePage({ onNavigate, onAddToCart }) {
  const featured = PRODUITS.slice(0, 6);

  return (
    <div className="home-page">
      <div className="promo-banner">
        <i className="bi bi-stars"></i>&nbsp;
        Offre estivale — 5 % de remise avant le 31 juillet · Code : AZUR2026
      </div>

      <section className="hero">
        <video className="hero-img" autoPlay muted loop playsInline>
          <source src="./img/video.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="eyebrow">Collection Prestige 2026</div>
          <h1>Premier choix en yachts de luxe</h1>
          <p>Découvrez notre sélection exclusive de yachts d'exception — voiliers, motoryachts et mega-yachts. Chaque embarcation, une promesse d'élégance.</p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => onNavigate("search")}>
              <i className="bi bi-compass"></i> Explorer le catalogue
            </button>
            <button className="btn btn-outline" onClick={() => onNavigate("contact")}>
              <i className="bi bi-chat-square-text"></i> Nous contacter
            </button>
          </div>
        </div>
        <div className="hero-scroll">Défiler</div>
      </section>

      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-num">180+</div>
          <div className="stat-lbl">Yachts vendus</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">26</div>
          <div className="stat-lbl">Ans d'expertise</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">98%</div>
          <div className="stat-lbl">Clients satisfaits</div>
        </div>
      </div>

      <section className="featured">
        <div className="section-header">
          <div className="eyebrow">Sélection du mois</div>
          <h2>Yachts en vedette</h2>
          <p>Une curation d'embarcations d'exception pour les marins les plus exigeants.</p>
        </div>
        <div className="featured-grid">
          {featured.map((p) => (
            <FeaturedCard
              key={p.id}
              p={p}
              onNavigate={onNavigate}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
        <div className="featured-cta">
          <button className="btn btn-outline-dark" onClick={() => onNavigate("search")}>
            Voir tout le catalogue <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </section>

      <div className="about-split">
        <div className="about-img">
          <video autoPlay muted loop playsInline style={{width:"100%", height:"100%", objectFit:"cover", display:"block"}}>
            <source src="./img/video2.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="about-text">
          <div className="eyebrow">Notre promesse</div>
          <h2>L'excellence nautique depuis 1998</h2>
          <p>Azur Yachts sélectionne pour vous les meilleurs chantiers navals européens et américains. Chaque yacht est rigoureusement inspecté et certifié.</p>
          <p>Nos conseillers vous accompagnent de l'exploration à la livraison, en passant par le financement et l'immatriculation.</p>
          <button className="btn btn-ghost" onClick={() => onNavigate("search")}>
            <i className="bi bi-grid"></i> Parcourir le catalogue
          </button>
        </div>
      </div>
    </div>
  );
}

function CartSidebar({ cart, onClose, onRemove, onCheckout }) {
  const total = cart.reduce((s, c) => s + c.prix * c.qty, 0);
  const fmt = (n) => n.toLocaleString("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
  return (
    <div className="cart-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cart-panel">
        <div className="cart-panel-header">
          <h3><i className="bi bi-bag"></i> Votre Panier</h3>
          <button className="cart-close" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        {cart.length === 0
          ? <p className="cart-empty">
              <i className="bi bi-bag" style={{fontSize:"2rem", display:"block", marginBottom:".5rem", opacity:.3}}></i>
              Votre panier est vide.
            </p>
          : <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.nom} />
                    <div className="cart-item-info">
                      <h4>{item.nom}</h4>
                      <p className="cart-item-price">{fmt(item.prix)}</p>
                      <button className="cart-remove" onClick={() => onRemove(item.id)}>
                        <i className="bi bi-trash3"></i> Retirer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-footer">
                <div className="cart-total-bar"><span>Total estimé</span><span>{fmt(total)}</span></div>
                <button className="btn btn-primary cart-checkout-btn" onClick={onCheckout}>
                  Procéder au paiement <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </>
        }
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage]         = useState("home");
  const [cart, setCart]         = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (target) => {
    if (target === "cart") { setCartOpen(true); return; }
    setPage(target);
    setCartOpen(false);
    window.scrollTo(0, 0);
  };

  const addToCart = (produit) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === produit.id);
      if (existing) return prev.map((c) => c.id === produit.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...produit, qty: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((c) => c.id !== id));
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <>
      <Header page={page} onNavigate={navigate} cartCount={cartCount} scrolled={scrolled} />

      {cartOpen && (
        <CartSidebar
          cart={cart}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onCheckout={() => { setCartOpen(false); setPage("checkout"); }}
        />
      )}

      {page === "home"     && <HomePage onNavigate={navigate} onAddToCart={addToCart} />}
      {page === "search"   && <SearchPage onAddToCart={addToCart} />}
      {page === "checkout" && (
        <div className="checkout-page">
          <h2>Finaliser votre commande</h2>
          <p>Veuillez vérifier votre sélection et compléter vos informations.</p>
          <CheckoutFlow cart={cart} onNavigate={navigate} />
        </div>
      )}
      {page === "survey"  && <SurveyPage onNavigate={navigate} />}
      {page === "contact" && <ContactPage onNavigate={navigate} />}

      <footer className="footer">
        <div className="footer-brand">
          <img src="./img/logo.png" alt="Azur Yachts" style={{height:"28px", width:"auto", opacity:.85}} />
          Azur Yachts
        </div>
        <div className="footer-links">
          <a href="#" onClick={(e) => { e.preventDefault(); navigate("home"); }}>Accueil</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate("search"); }}>Catalogue</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate("contact"); }}>Nous Contacter</a>
        </div>
        <span>© 2026 Azur Yachts — SEG3525</span>
      </footer>
    </>
  );
}