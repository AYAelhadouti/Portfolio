import FacetGroup from "./FacetGroup";

export default function FacetPanel({ config, filtres, onToggle, onRange, onRadio, onClear }) {
  const activeTags = [];
  ["categorie", "marque", "condition", "moteur", "couleur"].forEach((key) => {
    filtres[key].forEach((val) => {
      activeTags.push({ key, val, label: val });
    });
  });
  if (filtres.cabines > 0) {
    activeTags.push({ key: "cabines", val: filtres.cabines, label: `${filtres.cabines}+ cabines` });
  }
  if (filtres.prix < 4000000) {
    activeTags.push({
      key: "prix",
      val: filtres.prix,
      label: `Max ${filtres.prix.toLocaleString("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 })}`,
    });
  }

  return (
    <aside className="facet-panel">
      <h2>Filtres</h2>

      {activeTags.length > 0 && (
        <div className="active-tags">
          {activeTags.map(({ key, val, label }) => (
            <span key={`${key}-${val}`} className="tag">
              {label}
              <button
                onClick={() => {
                  if (key === "cabines") onRadio("cabines", 0);
                  else if (key === "prix") onRange("prix", 4000000);
                  else onToggle(key, val);
                }}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}

      {config.map((facette) => (
        <FacetGroup
          key={facette.id}
          facette={facette}
          valeurActive={filtres[facette.id]}
          onToggle={onToggle}
          onRange={onRange}
          onRadio={onRadio}
        />
      ))}

      <button className="btn-clear" onClick={onClear}>
        Effacer tous les filtres
      </button>
    </aside>
  );
}