export default function Header({ page, onNavigate, cartCount, scrolled }) {
  return (
    <nav className={`header${scrolled ? " scrolled" : ""}`}>
      <div className="header-brand" onClick={() => onNavigate("home")}>
        <img src="./img/logo.png" alt="Azur Yachts" style={{height:"58px", width:"auto"}} />
        AZUR <span>YACHTS</span>
      </div>

      <ul className="header-nav">
        <li>
          <a href="#" className={page === "home" ? "active" : ""}
            onClick={(e) => { e.preventDefault(); onNavigate("home"); }}>
            Accueil
          </a>
        </li>
        <li>
          <a href="#" className={page === "search" ? "active" : ""}
            onClick={(e) => { e.preventDefault(); onNavigate("search"); }}>
            Catalogue
          </a>
        </li>
        <li>
          <a href="#" className={page === "contact" ? "active" : ""}
            onClick={(e) => { e.preventDefault(); onNavigate("contact"); }}>
            Nous Contacter
          </a>
        </li>
      </ul>

      <button className="cart-btn" onClick={() => onNavigate("cart")}>
        <i className="bi bi-cart3"></i> Panier
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </button>
    </nav>
  );
}