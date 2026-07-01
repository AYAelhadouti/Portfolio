import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nom: "", email: "", telephone: "", sujet: "", message: "",
  });

  const handleField = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (!form.nom || !form.email || !form.message) {
      alert("Veuillez remplir votre nom, courriel et message.");
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="contact-page">
        <div className="survey-thanks">
          <div className="confirm-icon">
            <i className="bi bi-envelope-check" style={{fontSize:"3rem", color:"var(--gold)"}}></i>
          </div>
          <h3>Message envoyé !</h3>
          <p>Merci de nous avoir contactés. Un conseiller Azur Yachts vous répondra dans les 24 heures.</p>
          <button className="btn btn-dark" onClick={() => setSubmitted(false)}>
            <i className="bi bi-arrow-left"></i> Retour au formulaire
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page">
      {/* Hero */}
      <div className="contact-hero">
        <div className="eyebrow">Nous Contacter</div>
        <h2>Parlons de votre prochain yacht</h2>
        <p>Notre équipe de conseillers experts est disponible pour répondre à toutes vos questions.</p>
      </div>

      <div className="contact-layout">
        {/* Info cards */}
        <div className="contact-info">
          <div className="contact-info-card">
            <i className="bi bi-geo-alt"></i>
            <h4>Notre bureau</h4>
            <p>1200 Rue du Port<br/>Montréal, QC H3K 1G7<br/>Canada</p>
          </div>
          <div className="contact-info-card">
            <i className="bi bi-telephone"></i>
            <h4>Téléphone</h4>
            <p>+1 (514) 800-9000<br/>Lun–Ven, 9h–18h</p>
          </div>
          <div className="contact-info-card">
            <i className="bi bi-envelope"></i>
            <h4>Courriel</h4>
            <p>info@azuryachts.ca<br/>Réponse sous 24h</p>
          </div>
          <div className="contact-info-card">
            <i className="bi bi-compass"></i>
            <h4>Marina</h4>
            <p>Vieux-Port de Montréal<br/>Quai King-Edward</p>
          </div>
        </div>

        {/* Contact form */}
        <div className="contact-form-wrap">
          <h3>Envoyez-nous un message</h3>

          <div className="form-row">
            <div className="form-group">
              <label>Nom complet *</label>
              <input name="nom" type="text" value={form.nom}
                onChange={handleField} placeholder="Jean Dupont" />
            </div>
            <div className="form-group">
              <label>Courriel *</label>
              <input name="email" type="email" value={form.email}
                onChange={handleField} placeholder="jean@exemple.com" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Téléphone</label>
              <input name="telephone" type="tel" value={form.telephone}
                onChange={handleField} placeholder="+1 (514) 000-0000" />
            </div>
            <div className="form-group">
              <label>Sujet</label>
              <select name="sujet" value={form.sujet} onChange={handleField}>
                <option value="">Sélectionnez un sujet</option>
                <option value="achat">Achat d'un yacht</option>
                <option value="info">Demande d'information</option>
                <option value="visite">Planifier une visite</option>
                <option value="financement">Financement</option>
                <option value="autre">Autre</option>
              </select>
            </div>
          </div>

          <div className="form-row full">
            <div className="form-group">
              <label>Message *</label>
              <textarea
                name="message"
                className="survey-text"
                value={form.message}
                onChange={handleField}
                placeholder="Décrivez votre projet ou posez votre question..."
                style={{minHeight:"140px"}}
              />
            </div>
          </div>

          <button className="btn btn-primary" style={{marginTop:"1rem"}} onClick={handleSubmit}>
            <i className="bi bi-send"></i> Envoyer le message
          </button>
        </div>
      </div>
    </div>
  );
}