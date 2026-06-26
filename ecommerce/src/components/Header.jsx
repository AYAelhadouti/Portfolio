// src/components/Header.jsx
export default function Header({ page, onNavigate, cartCount }) {
  return (
    <nav className="navbar">
      <div className="brand" onClick={() => onNavigate("home")}>
        ⚓ AZUR YACHTS
      </div>
      <ul className="nav-links">
        <li>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("home"); }}
             className={page === "home" ? "active" : ""}>
            Accueil
          </a>
        </li>
        <li>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("search"); }}
             className={page === "search" ? "active" : ""}>
            Catalogue
          </a>
        </li>
        <li>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("survey"); }}
             className={page === "survey" ? "active" : ""}>
            Votre Avis
          </a>
        </li>
      </ul>
      <button className="cart-btn" onClick={onCartOpen}>
        🛒 Panier
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </button>
    </nav>
  );
}
