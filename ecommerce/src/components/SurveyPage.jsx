// src/components/SurveyPage.jsx
import { useState } from "react";

function StarRow({ group, value, onChange }) {
  return (
    <div className="star-row">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`star ${i <= value ? "active" : ""}`}
          onClick={() => onChange(group, i)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function SurveyPage({ onNavigate }) {
  const [ratings, setRatings] = useState({ global: 0, recommend: 0 });
  const [submitted, setSubmitted] = useState(false);

  const setStar = (group, val) =>
    setRatings((prev) => ({ ...prev, [group]: val }));

  if (submitted) {
    return (
      <div className="survey-page">
        <div className="survey-thanks">
          <div className="icon">🙏</div>
          <h3>Merci pour votre avis !</h3>
          <p>
            Votre retour nous aide à améliorer l'expérience Azur Yachts. Nous
            lisons chaque commentaire avec attention.
          </p>
          <button className="btn btn-primary" onClick={() => onNavigate("home")}>
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="survey-page">
      <h2>Votre avis compte</h2>
      <p className="intro">
        Aidez-nous à améliorer votre expérience sur Azur Yachts. Ce sondage ne
        prend que 2 minutes.
      </p>

      <div className="survey-card">
        <h3>Satisfaction globale</h3>
        <StarRow group="global" value={ratings.global} onChange={setStar} />
      </div>

      <div className="survey-card">
        <h3>Recommanderiez-vous Azur Yachts ?</h3>
        <StarRow group="recommend" value={ratings.recommend} onChange={setStar} />
      </div>

      <div className="survey-card">
        <h3>Comment avez-vous trouvé notre catalogue ?</h3>
        <div className="radio-group">
          {["Très facile à utiliser", "Facile", "Neutre", "Difficile", "Très difficile"].map(
            (opt) => (
              <label key={opt}>
                <input type="radio" name="catalogue" value={opt} />
                {opt}
              </label>
            )
          )}
        </div>
      </div>

      <div className="survey-card">
        <h3>Commentaires libres</h3>
        <textarea
          className="survey-text"
          placeholder="Partagez vos impressions, suggestions ou remarques..."
        />
      </div>

      <button className="btn btn-primary" onClick={() => setSubmitted(true)}>
        Soumettre mon avis
      </button>
    </div>
  );
}
