import React, { useState } from 'react';
import useReveal from '../hooks/useReveal';

const SERVICES = {
  solo: [
    { name: "Massage Relaxant Antique 60'", desc: "60 min de massage relaxant corps entier et bains thermaux à différentes températures, dans notre bâtiment historique à la lumière des chandelles.", price: '275$', per: 'par personne', img: 'image/solo1.png' },
    { name: 'Sérénité Essentielle', desc: "30 min de massage avec notre huile Signature Orange Garden, aromathérapie et bains thermaux. Du lundi au jeudi.", price: '60$', per: 'par personne', img: 'image/solo2.png', badge: 'Offre Spéciale', badgeCls: 'svc-tag-promo' },
    { name: 'Massage Intensité Profonde', desc: "60 min de massage profond avec des techniques intensives focalisées sur les zones de tension pour soulager et libérer les muscles.", price: '300$', per: 'par personne', img: 'image/image17.png' },
  ],
  duo: [
    { name: "Escape Together 60'", desc: "60 min de massage relaxant corps entier en salle privée pour deux, bains thermaux et jus de fruits ensemble.", price: '580$', per: 'par couple', img: 'image/duo2.png', badge: 'En Duo', badgeCls: 'svc-tag-couple', delay: '.0s' },
    { name: 'Bains Évasion Couple', desc: "90 min de bains thermaux à différentes températures conçus pour deux, avec deux jus rafraîchissants pour une relaxation totale à deux.", price: '330$', per: 'par couple', img: 'image/duo1.png', badge: 'En Duo', badgeCls: 'svc-tag-couple', delay: '.14s' },
  ],
  ritual: [
    { name: "Rituel au Sel de l'Himalaya", desc: "Rituel régénérant 80 min : enveloppement aux cristaux de sel de l'Himalaya, massage corps entier 60 min aux pierres de sel chaudes, bains thermaux et jus.", price: '290$', per: 'par personne', img: 'image/ritual.png', badge: 'Rituel' },
  ],
};

function SvcCard({ svc, reserver }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="svc-card rv" style={svc.delay ? { transitionDelay: svc.delay } : {}}>
      <div className="svc-card-img">
        {imgError ? (
          <div className="svc-card-img-placeholder">
            <div className="svc-card-img-placeholder-ico">
              <i className="bi bi-image" style={{ fontSize: '14px', lineHeight: 1 }}></i>
            </div>
            <span className="svc-card-img-placeholder-lbl">Image à venir</span>
          </div>
        ) : (
          <img src={svc.img} alt={svc.name} onError={() => setImgError(true)} />
        )}
      </div>
      <div className="svc-card-body">
        {svc.badge && <div className={`svc-badge ${svc.badgeCls || ''}`}>{svc.badge}</div>}
        <div className="svc-card-name">{svc.name}</div>
        <p className="svc-card-desc">{svc.desc}</p>
        <div className="svc-card-footer">
          <div><div className="svc-price">{svc.price}</div><div className="svc-per">{svc.per}</div></div>
          <button className="svc-book" onClick={() => reserver(svc.name, null)}>Réserver</button>
        </div>
      </div>
    </div>
  );
}

export default function PageServices({ go, reserver }) {
  const ref = useReveal();
  const [activeFilter, setActiveFilter] = useState('all');

  const scrollTo = (cat) => {
    setActiveFilter(cat);
    if (cat === 'all') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const el = document.getElementById('sec-' + cat);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div ref={ref}>
      <section className="svc-hero rv">
        <p className="svc-hero-eye">Bains &amp; Massages</p>
        <h1 className="svc-hero-h1">Nos Expériences</h1>
        <p className="svc-hero-sub">Un voyage sensoriel dans un bâtiment historique illuminé aux chandelles. Bains thermaux, massages et rituels pour le corps et l'esprit.</p>
        <div className="svc-filters">
          {['all', 'solo', 'duo', 'ritual'].map(f => (
            <button key={f} className={`svc-filter${activeFilter === f ? ' active' : ''}`} onClick={() => scrollTo(f)}>
              {f === 'all' ? 'Tout' : f === 'duo' ? 'En Duo' : f === 'ritual' ? 'Rituels' : 'Solo'}
            </button>
          ))}
        </div>
      </section>

      <div id="sec-solo" className="svc-section">
        <div className="svc-section-hd">
          <h2 className="svc-section-title">Solo</h2>
          <div className="svc-section-rule"></div>
          <span className="svc-section-count">3 expériences</span>
        </div>
        <div className="svc-grid">
          {SERVICES.solo.map(s => <SvcCard key={s.name} svc={s} reserver={reserver} />)}
        </div>
      </div>

      <div id="sec-duo" className="svc-section">
        <div className="svc-section-hd">
          <h2 className="svc-section-title">En Duo</h2>
          <div className="svc-section-rule"></div>
          <span className="svc-section-count">2 expériences</span>
        </div>
        <div className="svc-grid">
          {SERVICES.duo.map(s => <SvcCard key={s.name} svc={s} reserver={reserver} />)}
        </div>
      </div>

      <div id="sec-ritual" className="svc-section" style={{ paddingBottom: '80px' }}>
        <div className="svc-section-hd">
          <h2 className="svc-section-title">Rituels</h2>
          <div className="svc-section-rule"></div>
          <span className="svc-section-count">1 expérience</span>
        </div>
        <div className="svc-grid">
          {SERVICES.ritual.map(s => <SvcCard key={s.name} svc={s} reserver={reserver} />)}
        </div>
      </div>
    </div>
  );
}