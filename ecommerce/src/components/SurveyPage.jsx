import { useState } from "react";

function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="star-row">
      {[1, 2, 3, 4, 5].map((n) => (
        <i
          key={n}
          className={`bi bi-star${n <= (hovered || value) ? "-fill" : ""} star ${n <= (hovered || value) ? "active" : ""}`}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          role="button"
          aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
        />
      ))}
    </div>
  );
}

export default function SurveyPage({ onNavigate }) {
  const [submitted, setSubmitted] = useState(false);
  const [ratings, setRatings]     = useState({ global: 0, recommend: 0 });
  const [facetHelpful, setFacetHelpful] = useState("");
  const [comments, setComments]   = useState("");

  const setRating = (key, val) => setRatings((prev) => ({ ...prev, [key]: val }));

  if (submitted) {
    return (
      <div className="survey-page">
        <div className="survey-thanks">
          <div className="confirm-icon">
            <i className="bi bi-envelope-check" style={{fontSize:"3rem", color:"var(--gold)"}}></i>
          </div>
          <h3>Merci pour votre retour !</h3>
          <p>Votre avis a bien été enregistré. Chaque commentaire nous aide à améliorer l'expérience Azur Yachts. À très bientôt en mer !</p>
          <button className="btn btn-dark" onClick={() => onNavigate("home")}>
            <i className="bi bi-house"></i> Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="survey-page">
      <h2>Votre achat, votre avis !</h2>
      <p className="survey-intro">
        <i className="bi bi-patch-check" style={{color:"var(--gold)", marginRight:".4rem"}}></i>
        Félicitations pour votre acquisition ! Prenez 2 minutes pour évaluer votre expérience d'achat chez Azur Yachts. Votre retour nous aide à toujours mieux vous servir.
      </p>

      <div className="survey-card">
        <h3><i className="bi bi-star"></i> Comment évaluez-vous votre expérience d'achat globale ?</h3>
        <StarRating value={ratings.global} onChange={(v) => setRating("global", v)} />
      </div>

      <div className="survey-card">
        <h3><i className="bi bi-funnel"></i> La recherche par filtres vous a-t-elle aidé à trouver votre yacht ?</h3>
        <div className="radio-group">
          {["Oui, très utile", "Partiellement", "Non, pas assez"].map((opt) => (
            <label key={opt}>
              <input type="radio" name="facet-helpful" value={opt}
                checked={facetHelpful === opt} onChange={() => setFacetHelpful(opt)} />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <div className="survey-card">
        <h3><i className="bi bi-people"></i> Recommanderiez-vous Azur Yachts à un proche ?</h3>
        <StarRating value={ratings.recommend} onChange={(v) => setRating("recommend", v)} />
      </div>

      <div className="survey-card">
        <h3><i className="bi bi-pencil-square"></i> Des suggestions pour améliorer notre service ?</h3>
        <textarea className="survey-text" value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Partagez vos idées, nous les lisons tous !" />
      </div>

      <button className="btn btn-primary survey-submit" onClick={() => setSubmitted(true)}>
        Envoyer mon avis <i className="bi bi-send"></i>
      </button>
    </div>
  );
}