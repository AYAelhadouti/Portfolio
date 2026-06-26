// src/components/FacetPanel.jsx
import FacetGroup from "./FacetGroup";

export default function FacetPanel({ config, filtres, onToggle, onRange, onRadio, onClear }) {
  return (
    <aside className="facet-panel">
      <div className="facet-panel-header">
        <h2>Filtres</h2>
        <button className="btn-clear" onClick={onClear}>
          Effacer tout
        </button>
      </div>
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
    </aside>
  );
}
