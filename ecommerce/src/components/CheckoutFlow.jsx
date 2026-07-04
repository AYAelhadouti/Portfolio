import { useState } from "react";

const STEPS = ["Panier", "Informations", "Paiement", "Confirmation"];

function fmt(n) {
  return n.toLocaleString("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
}

function Stepper({ current }) {
  return (
    <div className="stepper">
      {STEPS.map((name, i) => {
        const stepNum = i + 1;
        const isDone = stepNum < current;
        const isActive = stepNum === current;
        return (
          <div key={name} className={`step ${isDone ? "done" : ""} ${isActive ? "active" : ""}`}>
            <div className="step-circle">
              {isDone ? <i className="bi bi-check-lg"></i> : stepNum}
            </div>
            <div className="step-name">{name}</div>
            {i < STEPS.length - 1 && <div className="step-line" />}
          </div>
        );
      })}
    </div>
  );
}

export default function CheckoutFlow({ cart, onNavigate, onOrderComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    prenom: "", nom: "", email: "", telephone: "", adresse: "",
  });
  const [payData, setPayData] = useState({
    carte: "", expiration: "", cvv: "", nomCarte: "",
  });

  const total = cart.reduce((sum, item) => sum + item.prix * item.qty, 0);
  const handleField = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handlePay = (e) => setPayData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validateStep2 = () => {
    if (!formData.prenom || !formData.email) {
      alert("Veuillez remplir au moins votre prénom et courriel.");
      return;
    }
    setPayData({ carte: "", expiration: "", cvv: "", nomCarte: "" });
    setStep(3);
  };

  if (step === 1) return (
    <>
      <Stepper current={1} />
      <div className="checkout-section">
        <h3><i className="bi bi-bag"></i> Récapitulatif du panier</h3>
        {cart.length === 0
          ? <p className="empty-cart">Votre panier est vide.</p>
          : <>
              <ul className="summary-list">
                {cart.map((item) => (
                  <li key={item.id}><span>{item.nom}</span><span>{fmt(item.prix)}</span></li>
                ))}
              </ul>
              <div className="summary-total"><span>Total</span><span>{fmt(total)}</span></div>
            </>
        }
      </div>
      <div className="step-actions">
        <button className="btn btn-outline-dark" onClick={() => onNavigate("search")}>
          <i className="bi bi-arrow-left"></i> Continuer les achats
        </button>
        <button className="btn btn-primary" onClick={() => setStep(2)} disabled={cart.length === 0}>
          Continuer <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </>
  );

  if (step === 2) return (
    <>
      <Stepper current={2} />
      <div className="checkout-section">
        <h3><i className="bi bi-person"></i> Vos informations</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Prénom *</label>
            <input name="prenom" type="text" value={formData.prenom} onChange={handleField} placeholder="Jean" />
          </div>
          <div className="form-group">
            <label>Nom</label>
            <input name="nom" type="text" value={formData.nom} onChange={handleField} placeholder="Dupont" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Courriel *</label>
            <input name="email" type="email" value={formData.email} onChange={handleField} placeholder="jean@exemple.com" />
          </div>
          <div className="form-group">
            <label>Téléphone</label>
            <input name="telephone" type="tel" value={formData.telephone} onChange={handleField} placeholder="+1 (514) 000-0000" />
          </div>
        </div>
        <div className="form-row full">
          <div className="form-group">
            <label>Adresse</label>
            <input name="adresse" type="text" value={formData.adresse} onChange={handleField} placeholder="123 Rue du Port, Montréal, QC" />
          </div>
        </div>
      </div>
      <div className="step-actions">
        <button className="btn btn-outline-dark" onClick={() => setStep(1)}>
          <i className="bi bi-arrow-left"></i> Retour
        </button>
        <button className="btn btn-primary" onClick={validateStep2}>
          Continuer <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </>
  );

  if (step === 3) return (
    <>
      <Stepper current={3} />
      <div className="checkout-section">
        <h3><i className="bi bi-credit-card"></i> Informations de paiement</h3>
        <div className="form-row full">
          <div className="form-group">
            <label>Numéro de carte *</label>
            <input
              name="carte" type="text" value={payData.carte} placeholder="•••• •••• •••• ••••" maxLength={19}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
                const formatted = digits.replace(/(.{4})/g, "$1 ").trim();
                setPayData((prev) => ({ ...prev, carte: formatted }));
              }}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Expiration *</label>
            <input
              name="expiration" type="text" value={payData.expiration} placeholder="MM/AA" maxLength={5}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
                const formatted = digits.length > 2 ? digits.slice(0,2) + "/" + digits.slice(2) : digits;
                setPayData((prev) => ({ ...prev, expiration: formatted }));
              }}
            />
          </div>
          <div className="form-group">
            <label>CVV *</label>
            <input
              name="cvv" type="text" value={payData.cvv} placeholder="•••" maxLength={4}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
                setPayData((prev) => ({ ...prev, cvv: digits }));
              }}
            />
          </div>
        </div>
        <div className="form-row full">
          <div className="form-group">
            <label>Nom sur la carte *</label>
            <input name="nomCarte" type="text" value={payData.nomCarte} onChange={handlePay} placeholder="Nom Prénom" />
          </div>
        </div>
        <div className="ssl-notice">
          <i className="bi bi-shield-lock"></i> Vos informations sont protégées par chiffrement SSL 256-bit.
        </div>
      </div>
      <div className="checkout-section">
        <h3><i className="bi bi-receipt"></i> Récapitulatif</h3>
        <ul className="summary-list">
          {cart.map((item) => (
            <li key={item.id}><span>{item.nom}</span><span>{fmt(item.prix)}</span></li>
          ))}
        </ul>
        <div className="summary-total"><span>Total à payer</span><span>{fmt(total)}</span></div>
      </div>
      <div className="step-actions">
        <button className="btn btn-outline-dark" onClick={() => setStep(2)}>
          <i className="bi bi-arrow-left"></i> Retour
        </button>
        <button className="btn btn-primary" onClick={() => {
          if (!payData.carte || payData.carte.replace(/\s/g,"").length < 16) {
            alert("Veuillez entrer un numéro de carte valide (16 chiffres)."); return;
          }
          if (!payData.expiration || !/^\d{2}\/\d{2}$/.test(payData.expiration)) {
            alert("Veuillez entrer une date d'expiration valide (MM/AA)."); return;
          }
          if (!payData.cvv || payData.cvv.length < 3) {
            alert("Veuillez entrer un CVV valide (3 ou 4 chiffres)."); return;
          }
          if (!payData.nomCarte.trim()) {
            alert("Veuillez entrer le nom tel qu'il apparaît sur la carte."); return;
          }
          setStep(4);
          onOrderComplete();
        }}>
          Confirmer la commande <i className="bi bi-check-lg"></i>
        </button>
      </div>
    </>
  );

  const orderNum = `AZ${Math.floor(Math.random() * 900000 + 100000)}`;
  return (
    <>
      <Stepper current={4} />
      <div className="confirm-box">
        <div className="confirm-icon">
          <i className="bi bi-patch-check" style={{fontSize:"3.5rem", color:"var(--green)"}}></i>
        </div>
        <h3>Commande confirmée !</h3>
        <p>
          Félicitations ! Votre commande <strong>#{orderNum}</strong> a bien été reçue.
          Un conseiller Azur Yachts vous contactera dans les 48 heures pour finaliser votre acquisition.
        </p>
        <div className="confirm-actions">
          <button className="btn btn-primary" onClick={() => onNavigate("survey")}>
            <i className="bi bi-star"></i> Évaluer votre expérience
          </button>
          <button className="btn btn-outline-dark" onClick={() => onNavigate("home")}>
            <i className="bi bi-house"></i> Retour à l'accueil
          </button>
        </div>
      </div>
    </>
  );
}