// src/App.jsx
import { useState } from "react";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";
import CheckoutFlow from "./components/CheckoutFlow";
import SurveyPage from "./components/SurveyPage";


export default function App() {
  // Global state : page courante, panier, panier ouvert
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const navigate = (newPage) => {
    setPage(newPage);
    setCartOpen(false);
    window.scrollTo(0, 0);
  };

  const addToCart = (produit) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === produit.id);
      if (existing) {
        return prev.map((c) => (c.id === produit.id ? { ...c, qty: c.qty + 1 } : c));
      }
      return [...prev, { ...produit, qty: 1 }];
    });
    // Brief flash feedback
    const btn = document.querySelector(".cart-btn");
    if (btn) {
      btn.style.transform = "scale(1.15)";
      setTimeout(() => (btn.style.transform = ""), 200);
    }
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((c) => c.id !== id));
  const clearCart = () => setCart([]);

  const goCheckout = () => {
    if (cart.length === 0) { alert("Votre panier est vide !"); return; }
    setCartOpen(false);
    navigate("checkout");
  };

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <>
      <Header page={page} onNavigate={navigate} cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />


      {/* Pages */}
      {page === "home" && <HomePage onNavigate={navigate} onAddToCart={addToCart} />}
      {page === "search" && <SearchPage onAddToCart={addToCart} />}
      {page === "checkout" && (
        <CheckoutFlow cart={cart} onNavigate={navigate} onClearCart={clearCart} />
      )}
      {page === "survey" && <SurveyPage onNavigate={navigate} />}

      {/* Footer */}
      <footer>
        <div className="brand-footer">⚓ AZUR YACHTS</div>
        <p>© 2026 Azur Yachts — Tous droits réservés</p>
      </footer>
    </>
  );
}
