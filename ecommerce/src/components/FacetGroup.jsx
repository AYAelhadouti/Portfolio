export default function FacetGroup({ facette, valeurActive, onToggle, onRange, onRadio }) {
  return (
    <div className="facet-group">
      <h3 className="facet-group-label">{facette.label}</h3>

      {facette.type === "checkbox" && (
        <ul className="facet-options">
          {facette.options.map((opt) => (
            <li key={opt}>
              <label>
                <input
                  type="checkbox"
                  checked={valeurActive.includes(opt)}
                  onChange={() => onToggle(facette.id, opt)}
                />
                {opt}
              </label>
            </li>
          ))}
        </ul>
      )}

      {facette.type === "radio" && (
        <ul className="facet-options">
          {facette.options.map((opt) => (
            <li key={opt}>
              <label>
                <input
                  type="radio"
                  name={`facet_${facette.id}`}
                  checked={valeurActive === opt}
                  onChange={() => onRadio(facette.id, opt)}
                />
                {opt}+
              </label>
            </li>
          ))}
        </ul>
      )}

      {facette.type === "range" && (
        <div className="range-group">
          <input
            type="range"
            min={facette.min}
            max={facette.max}
            step={facette.step}
            value={valeurActive}
            onChange={(e) => onRange(facette.id, Number(e.target.value))}
          />
          <span className="range-value">
            Max : {Number(valeurActive).toLocaleString("fr-CA", {
              style: "currency", currency: "CAD", maximumFractionDigits: 0,
            })}
          </span>
        </div>
      )}
    </div>
  );
}