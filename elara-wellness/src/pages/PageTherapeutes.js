import React from 'react';
import useReveal from '../hooks/useReveal';

const THERAPEUTES = [
  { name: 'Dr. Guillermo Torre', role: 'Massothérapie', exp: "8 ans d'expérience", tags: ['Deep Tissue', 'Sports'], img: 'image/Thera1.png' },
  { name: 'Dr. Cinthya Molina', role: 'Massage Thérapeutique', exp: "12 ans d'expérience", tags: ['Hot Stones', 'Gua Sha', 'Rituels'], img: 'image/Thera2.png', delay: '.1s' },
  { name: 'Dr. Barbara Dalbos', role: 'Spécialiste Musculaire', exp: "6 ans d'expérience", tags: ['Trigger Points', 'Fascia'], img: 'image/Thera3.png', delay: '.2s' },
];

export default function PageTherapeutes({ go, reserver }) {
  const ref = useReveal();

  return (
    <div ref={ref}>
      <section className="th-page-hero">
        <div className="th-page-bg" style={{ backgroundImage: `linear-gradient(to bottom, rgba(15,15,15,.55) 0%, rgba(15,15,15,.75) 55%, rgba(15,15,15,1) 100%), url(${process.env.PUBLIC_URL}/image/image16.png)`, backgroundSize: 'cover', backgroundPosition: 'center 30%' }}></div>
        <div className="th-page-inner rv">
          <p className="th-page-eyebrow">Les Artisans du Bien-Être</p>
          <h1 className="th-page-h1">Nos Experts Thérapeutes</h1>
          <p className="th-page-sub">Thérapeutes certifiés et passionnés, chacun maîtrise l'art de restaurer l'équilibre du corps et de l'esprit.</p>
        </div>
      </section>

      <div className="th-wrap">
        <div className="th-grid">
          {THERAPEUTES.map(t => (
            <div className="th-card rv" key={t.name} style={t.delay ? { transitionDelay: t.delay } : {}}>
              <img className="th-photo" src={t.img} alt={t.name} />
              <div className="th-info">
                <div className="th-name">{t.name}</div>
                <div className="th-meta">
                  <span className="th-role">{t.role}</span>
                  <span className="th-pipe"></span>
                  <span className="th-exp">{t.exp}</span>
                </div>
                <div className="th-tags">
                  {t.tags.map(tag => <span className="th-tag" key={tag}>{tag}</span>)}
                </div>
                <button className="btn-rsv" onClick={() => reserver(null, t.name)}>
                  Réserver avec {t.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="exp-wrap">
        <div className="rv">
          <p className="exp-lbl">Technique Exclusive</p>
          <h2 className="exp-h2">Le soulagement des points de tension (Trigger Points)</h2>
          <p className="exp-body">Les points de déclenchement, ou trigger points, sont des zones hyperirritables dans les muscles squelettiques qui provoquent douleur référée, raideur et faiblesse musculaire. Nos thérapeutes spécialisés utilisent une pression ciblée et soutenue pour libérer ces nœuds de tension, restaurant ainsi la fonction musculaire normale et soulageant les douleurs chroniques.</p>
          <div className="exp-stats">
            <div><div className="stat-n">98%</div><div className="stat-l">Satisfaction Client</div></div>
            <div><div className="stat-n">4.9/5</div><div className="stat-l">Note Moyenne</div></div>
          </div>
        </div>
        <div className="exp-img rv" style={{ transitionDelay: '.15s' }}>
          <img src="image/image17.png" alt="Trigger Points Therapy" loading="lazy" />
        </div>
      </section>

      <section className="cta rv">
        <h2 className="cta-h">Prêt pour vous ressourcer ?</h2>
        <div className="cta-row">
          <button className="btn-fill" onClick={() => reserver(null, null)}>RÉSERVER AVEC NOS THÉRAPEUTES</button>
          <button className="btn-ghost" onClick={() => go('p2')}>Voir tous nos soins</button>
        </div>
      </section>
    </div>
  );
}