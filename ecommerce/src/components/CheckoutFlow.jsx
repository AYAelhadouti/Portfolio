// src/components/CheckoutFlow.jsx
import { useState } from "react";
import { formatPrix } from "../utils/filtrage";

export default function CheckoutFlow({ cart, onNavigate, onClearCart }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ prenom: "", nom: "", email: "", tel: "", adresse: "" });
  const [orderNum] = useState("AZ" + Math.floor(Math.random() * 900000 + 100000));

  const total = cart.reduce((s, c) => s + c.prix * c.qty, 0);

  const steps = [
    { id: 1, label: "Panier" },
    { id: 2, label: "Informations" },
    { id: 3, label: "Paiement" },
    { id: 4, label: "Confirmation" },
  ];

  const handleNext = () => {
    if (step === 2 && (!form.prenom || !form.email)) {
      alert("Veuillez remplir au moins votre prénom et courriel.");
      return;
    }
    if (step === 4) {
      onClearCart();
    }
    setStep((s) => s + 1);
    window.scrollTo(0, 0);
  };

  if (cart.length === 0 && step < 4) {
    return (
      <div className="checkout-page">
        <h2>Votre panier est vide</h2>
        <button className="btn btn-primary" onClick={() => onNavigate("search")}>
          Retourner au catalogue
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2>Commande</h2>

      {/* Stepper */}
      <div className="stepper">
        {steps.map((s) => (
          <div
            key={s.id}
            className={`step ${step > s.id ? "done" : ""} ${step === s.id ? "active" : ""}`}
          >
            <div className="step-circle">{step > s.id ? "✓" : s.id}</div>
            <div className="step-name">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Step 1 — Cart summary */}
      {step === 1 && (
        <div className="checkout-section">
          <h3>🛒 Récapitulatif du panier</h3>
          <ul className="cart-summary-list">
            {cart.map((c) => (
              <li key={c.id}>
                <span>{c.nom}</span>
                <span>{formatPrix(c.prix)}</span>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <span>Total</span>
            <span>{formatPrix(total)}</span>
          </div>
          <div className="step-actions">
            <button className="btn btn-outline" onClick={() => onNavigate("search")}>
              ← Continuer les achats
            </button>
            <button className="btn btn-primary" onClick={handleNext}>
              Continuer →
            </button>
          </div>
        </div>
      )}

      {/* Step 2 — Personal info */}
      {step === 2 && (
        <div className="checkout-section">
          <h3>👤 Vos informations</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Prénom</label>
              <input
                type="text"
                placeholder="Jean"
                value={form.prenom}
                onChange={(e) => setForm({ ...form, prenom: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Nom</label>
              <input
                type="text"
                placeholder="Dupont"
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Courriel</label>
            <input
              type="email"
              placeholder="jean@exemple.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Téléphone</label>
            <input
              type="tel"
              placeholder="+1 (514) 000-0000"
              value={form.tel}
              onChange={(e) => setForm({ ...form, tel: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Adresse</label>
            <input
              type="text"
              placeholder="123 Rue du Port, Montréal, QC"
              value={form.adresse}
              onChange={(e) => setForm({ ...form, adresse: e.target.value })}
            />
          </div>
          <div className="step-actions">
            <button className="btn btn-outline" onClick={() => setStep((s) => s - 1)}>
              ← Retour
            </button>
            <button className="btn btn-primary" onClick={handleNext}>
              Continuer →
            </button>
          </div>
        </div>
      )}

      {/* Step 3 — Payment */}
      {step === 3 && (
        <>
          <div className="checkout-section">
            <h3>💳 Informations de paiement</h3>
            <div className="form-group">
              <label>Numéro de carte</label>
              <input type="text" placeholder="•••• •••• •••• ••••" maxLength={19} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Date d'expiration</label>
                <input type="text" placeholder="MM/AA" maxLength={5} />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input type="text" placeholder="•••" maxLength={4} />
              </div>
            </div>
            <div className="form-group">
              <label>Nom sur la carte</label>
              <input type="text" placeholder="Jean Dupont" />
            </div>
            <div className="ssl-notice">🔒 Vos informations sont protégées par chiffrement SSL 256-bit.</div>
          </div>
          <div className="checkout-section">
            <h3>Récapitulatif</h3>
            <ul className="cart-summary-list">
              {cart.map((c) => (
                <li key={c.id}>
                  <span>{c.nom}</span>
                  <span>{formatPrix(c.prix)}</span>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <span>Total à payer</span>
              <span>{formatPrix(total)}</span>
            </div>
          </div>
          <div className="step-actions">
            <button className="btn btn-outline" onClick={() => setStep((s) => s - 1)}>
              ← Retour
            </button>
            <button className="btn btn-primary" onClick={handleNext}>
              Confirmer la commande ✓
            </button>
          </div>
        </>
      )}

      {/* Step 4 — Confirmation */}
      {step === 4 && (
        <div className="confirm-box">
          <div className="check-icon">✅</div>
          <h3>Commande confirmée !</h3>
          <p>
            Merci pour votre confiance ! Votre commande <strong>#{orderNum}</strong> a bien été
            reçue. Vous recevrez une confirmation par courriel sous peu. Un conseiller Azur Yachts
            vous contactera dans les 48 heures.
          </p>
          <button className="btn btn-primary" onClick={() => onNavigate("survey")}>
            Partagez votre avis 🎯
          </button>
          <button
            className="btn btn-outline"
            style={{ marginLeft: "0.75rem" }}
            onClick={() => onNavigate("home")}
          >
            Retour à l'accueil
          </button>
        </div>
      )}
    </div>
  );
}
