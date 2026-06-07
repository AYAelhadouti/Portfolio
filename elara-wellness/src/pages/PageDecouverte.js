import React, { useEffect, useRef } from 'react';
import useReveal from '../hooks/useReveal';

export default function PageDecouverte({ go, reserver }) {
  const ref = useReveal();

  return (
    <div ref={ref}>
      {/* HERO */}
      <section className="p1-hero">
        <div className="p1-hero-bg" style={{ backgroundImage: `linear-gradient(to bottom, rgba(19,19,19,.15) 0%, rgba(19,19,19,.45) 65%, rgba(19,19,19,1) 100%), url(${process.env.PUBLIC_URL}/image/image10.png)` }}></div>
        <div className="p1-hero-inner">
          <h1 className="p1-h1">L'Art du Soin<br />Thérapeutique</h1>
          <p className="hero-sub">Un sanctuaire souterrain où chaque soin<br />est une cérémonie sensorielle hors du temps.</p>
        </div>
        <div className="hero-vline"></div>
      </section>

      {/* BÂTIMENT */}
      <section className="bldg">
        <div className="bldg-text rv">
          <p className="sec-lbl">Un Bâtiment Tissé d'Histoire</p>
          <h2 className="bldg-h2">Architecture, Histoire&nbsp;&amp;<br />Art de Vivre</h2>
          <p className="bldg-body">ÉLARA Wellness prend vie dans un bâtiment historique d'architecture Classicisme édouardien, anciennement bureau et entrepôt de la maison d'édition Copp Clark, construit en 1912. Aujourd'hui, cet espace unique de 23&nbsp;000 pieds carrés entièrement consacré à l'art de la relaxation invite les visiteurs à s'immerger dans une expérience de bains thermaux.</p>
          <p className="bldg-body">Huit bains à différentes températures conçus pour soulager les tensions, améliorer la circulation et guider le corps et l'esprit vers une relaxation profonde, sauna sec, salle de vapeur, massages apaisants et rituels exclusifs soigneusement élaborés pour restaurer l'équilibre et élever le bien-être global, corps et âme.</p>
          <button className="bldg-link btn-ol" onClick={() => go('p2')}>Voir les Expériences</button>
        </div>
        <div className="bldg-video rv" style={{ transitionDelay: '.18s' }}>
          <div className="bldg-video-wrap">
            <video autoPlay muted loop playsInline>
              <source src="image/video.mp4" type="video/mp4" />
            </video>
            <div className="bldg-video-overlay"></div>
          </div>
        </div>
      </section>
      <div className="bldg-divider"></div>

      {/* DEEP TISSUE FOCUS */}
      <section className="dt">
        <div className="dt-text rv">
          <p className="sec-lbl">Focus Thérapeutique</p>
          <h2 className="dt-h2">Massage en Profondeur<br />(Deep Tissue)</h2>
          <p className="dt-body">Une technique rigoureuse ciblant les tensions musculaires profondes pour une régénération totale. Nos praticiens utilisent une pression ferme et des mouvements lents pour atteindre les couches de fascia et de muscles les plus ancrées.</p>
          <ul className="dt-list">
            <li>Récupération Athlétique</li>
            <li>Libération des Fascias</li>
            <li>Soulagement des Douleurs Chroniques</li>
          </ul>
          <button className="btn-ol" onClick={() => go('p5')}>Découvrir nos Thérapeutes</button>
        </div>
        <div className="dt-img rv" style={{ transitionDelay: '.2s' }}>
          <img src="image/image7.png" alt="Massage en Profondeur" loading="lazy" />
        </div>
      </section>

      {/* L'APPROCHE ÉLARA */}
      <section className="ap">
        <div className="ap-head rv">
          <div className="ap-head-line left"></div>
          <h2 className="ap-h2">L'Approche <span className="ap-h2-accent">ÉLARA</span></h2>
          <div className="ap-head-line"></div>
        </div>
        <div className="ap-mosaic rv" style={{ transitionDelay: '.08s' }}>
          <div className="ap-pillar">
            <div className="ap-pillar-num">01</div>
            <div className="ap-pillar-icon">
              <i className="bi bi-person-arms-up" style={{ fontSize: '14px', lineHeight: 1 }}></i>
            </div>
            <h3 className="ap-pillar-h">Architecture<br />Sensorielle</h3>
            <p className="ap-pillar-p">Chaque espace est conçu pour stimuler la déconnexion nerveuse, de la température de l'air aux fréquences sonores hertziennes. Un environnement pensé jusque dans ses moindres détails pour libérer corps et esprit.</p>
            <span className="ap-pillar-tag">Expérience Immersive</span>
          </div>
          <div className="ap-img-cell">
            <img src="image/approche.png" alt="Le Sanctuaire" loading="lazy" />
            <span className="ap-img-label">Le Sanctuaire</span>
          </div>
          <div className="ap-mini">
            <div className="ap-mini-ico">
              <i className="bi bi-volume-mute" style={{ fontSize: '13px', lineHeight: 1 }}></i>
            </div>
            <h3 className="ap-mini-h">Silence Absolu</h3>
            <p className="ap-mini-p">Une immersion dans le vide pour permettre à l'esprit de retrouver sa clarté naturelle.</p>
            <span className="ap-mini-more">Découvrir</span>
          </div>
          <div className="ap-mini">
            <div className="ap-mini-ico">
              <i className="bi bi-activity" style={{ fontSize: '13px', lineHeight: 1 }}></i>
            </div>
            <h3 className="ap-mini-h">Diagnostics Précis</h3>
            <p className="ap-mini-p">Chaque séance débute par une analyse posturale pour identifier les déséquilibres structurels de votre corps.</p>
            <span className="ap-mini-more" onClick={() => go('p5')}>Nos thérapeutes</span>
          </div>
        </div>
        <div className="ap-strip rv" style={{ transitionDelay: '.2s' }}>
          <div className="ap-stat">
            <div className="ap-stat-n">23 000</div>
            <div className="ap-stat-l">Pieds carrés dédiés au bien-être</div>
          </div>
          <div className="ap-stat">
            <div className="ap-stat-n">8</div>
            <div className="ap-stat-l">Bains thermaux à différentes températures</div>
          </div>
          <div className="ap-stat">
            <div className="ap-stat-n">1912</div>
            <div className="ap-stat-l">Bâtiment historique classicisme édouardien</div>
          </div>
        </div>
      </section>
    </div>
  );
}