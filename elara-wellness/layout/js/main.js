/* ============================================================
   ÉLARA WELLNESS — Application React principale
   SEG3525 Devoir 2 — Prototype haute-fidélité
   Combine les objectifs de Sofia (Persona 1) et Alec (Persona 2)
   Thème : Luxe sombre inspiré d'AIRE Ancient Baths Toronto
   ============================================================ */

const { useState, useEffect, useCallback } = React;

/* ── Données ──────────────────────────────────────────────── */
const SERVICES = [
  {
    id: 1,
    nom: "Massage en Profondeur",
    sousTitre: "Deep Tissue",
    desc: "Technique ciblant les tensions musculaires profondes. Pression ferme et mouvements lents pour atteindre le fascia et rétablir la fluidité du mouvement.",
    duree: "60 / 90 min",
    prix: 120,
    badge: "INTENSITÉ : HAUTE",
    img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=700&q=80",
    pour: ["Récupération athlétique", "Tensions chroniques", "Douleurs dorsales"]
  },
  {
    id: 2,
    nom: "Rituel Aromatique",
    sousTitre: "Huiles essentielles biologiques",
    desc: "Voyage sensoriel utilisant des huiles essentielles biologiques sur mesure pour apaiser le système nerveux et revitaliser l'esprit.",
    duree: "75 min",
    prix: 110,
    badge: "NOUVEAUTÉ",
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=700&q=80",
    pour: ["Stress & anxiété", "Équilibre émotionnel", "Hydratation profonde"]
  },
  {
    id: 3,
    nom: "Pierres Chaudes Volcaniques",
    sousTitre: "Thermothérapie",
    desc: "La chaleur des pierres volcaniques pénètre les tissus profonds pour un lâcher-prise total et une détoxification naturelle du corps.",
    duree: "90 min",
    prix: 145,
    badge: "INTENSITÉ : MOYENNE",
    img: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=700&q=80",
    pour: ["Détoxification", "Circulation sanguine", "Relaxation profonde"]
  },
  {
    id: 4,
    nom: "Massage Suédois",
    sousTitre: "Classique & Accessible",
    desc: "La référence de la relaxation. Effleurages longs et pétrisssages doux pour dissoudre les tensions superficielles et favoriser la détente globale.",
    duree: "60 / 90 min",
    prix: 75,
    badge: "IDÉAL PREMIÈRE VISITE",
    img: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=700&q=80",
    pour: ["Première visite", "Détente générale", "Tarif étudiant disponible"]
  },
  {
    id: 5,
    nom: "Soin du Visage Signature",
    sousTitre: "Luminosité & Éclat",
    desc: "Protocole personnalisé combinant nettoyage en profondeur, exfoliation douce et soins concentrés pour révéler l'éclat naturel de votre peau.",
    duree: "60 min",
    prix: 95,
    badge: "EXCLUSIF",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=700&q=80",
    pour: ["Hydratation", "Anti-âge", "Éclat naturel"]
  },
  {
    id: 6,
    nom: "Enveloppement Corporel",
    sousTitre: "Argile & Algues Marines",
    desc: "Enveloppement purificateur aux argiles et algues marines, suivi d'un modelage corps. Reminéralisation et fermeté retrouvées.",
    duree: "90 min",
    prix: 135,
    badge: "BIEN-ÊTRE",
    img: "https://images.unsplash.com/photo-1531299244174-d247dd4e5a66?w=700&q=80",
    pour: ["Reminéralisation", "Fermeté", "Détox profonde"]
  }
];

const THERAPEUTES = [
  {
    id: 1,
    nom: "Marc Antoine",
    titre: "Massothérapeute Agréé",
    exp: "12+ ans d'expérience",
    tags: ["Massage Profond", "Trigger Points", "Sport"],
    img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80"
  },
  {
    id: 2,
    nom: "Elena Solis",
    titre: "Experte Myofasciale",
    exp: "10+ ans d'expérience",
    tags: ["Deep Tissue", "Sportif", "Fascias"],
    img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80"
  },
  {
    id: 3,
    nom: "Thomas Valmont",
    titre: "Spécialiste Musculaire",
    exp: "15+ ans d'expérience",
    tags: ["Point de Pression", "Drainage", "Aromatique"],
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80"
  }
];

const FAQ = [
  {
    q: "Que dois-je apporter à ma première visite ?",
    r: "Rien de particulier. Nous fournissons des peignoirs de bain, des serviettes en coton biologique et des sandales. Nous recommandons d'arriver 15 minutes avant votre rendez-vous pour compléter votre formulaire de santé et vous installer en toute sérénité."
  },
  {
    q: "À quelle heure dois-je arriver ?",
    r: "Nous vous recommandons d'arriver 15 minutes avant votre séance. Nos espaces de préparation sont disponibles dès votre arrivée : vestiaires privés, salon de détente avec tisanes biologiques et ambiance feutrée."
  },
  {
    q: "Comment choisir l'intensité de mon massage ?",
    r: "Lors de votre première visite, notre thérapeute effectuera une courte consultation avant la séance. Vous pourrez ajuster la pression à tout moment durant le soin. Pour les tensions musculaires profondes, nous recommandons le Deep Tissue ; pour une première expérience, le Massage Suédois est idéal."
  },
  {
    q: "Y a-t-il des tarifs étudiants ?",
    r: "Oui ! Nous offrons des tarifs réduits exclusifs aux étudiants du lundi au jeudi. Présentez votre carte étudiante valide lors de votre visite. La réduction s'applique à nos soins Massage Suédois et Rituel Aromatique."
  },
  {
    q: "Quelle est la politique d'annulation ?",
    r: "Nous acceptons les annulations gratuites jusqu'à 24 heures avant votre rendez-vous. Pour les annulations tardives ou les absences, des frais de 50 % du montant du soin s'appliquent."
  }
];

const MOIS_NOMS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
const JOURS_NOMS = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];
const CRENEAUX = ["09:00","10:30","12:00","13:30","15:00","16:30","18:00","19:30"];

/* ── Composant : Navigation ───────────────────────────────── */
function Navigation({ page, setPage }) {
  return (
    <nav className="nav">
      <button className="nav__logo" onClick={() => setPage("accueil")}>
        ÉL<span>A</span>RA
      </button>
      <div className="nav__liens">
        <button className="nav__lien" onClick={() => setPage("accueil")}>Découverte</button>
        <button className="nav__lien" onClick={() => setPage("services")}>Services</button>
        <button className="nav__lien" onClick={() => setPage("therapeutes")}>Thérapeutes</button>
        <button className="nav__lien" onClick={() => setPage("coordonnees")}>Lieux</button>
        <button className="nav__reserver" onClick={() => setPage("reservation")}>Réserver</button>
      </div>
    </nav>
  );
}

/* ── Composant : Pied de page ─────────────────────────────── */
function PiedDePage({ setPage }) {
  return (
    <footer className="pied-de-page">
      <div className="pied-de-page__grille">
        <div>
          <div className="pied-de-page__logo">ÉLARA</div>
          <p className="pied-de-page__tagline">
            Un sanctuaire de luxe discret dédié à la restauration de votre équilibre intérieur. Thérapeutes certifiés. Soins sur rendez-vous.
          </p>
        </div>
        <div>
          <div className="pied-de-page__col-titre">Navigation</div>
          {["accueil","services","therapeutes","coordonnees","reservation"].map(p => (
            <button key={p} className="pied-de-page__lien" onClick={() => setPage(p)}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
        <div>
          <div className="pied-de-page__col-titre">Légal</div>
          <span className="pied-de-page__lien">Politique de confidentialité</span>
          <span className="pied-de-page__lien">Conditions générales</span>
          <span className="pied-de-page__lien">Mentions légales</span>
        </div>
        <div>
          <div className="pied-de-page__col-titre">Contact</div>
          <span className="pied-de-page__lien">📍 128 Distillery Lane, Toronto, ON</span>
          <a className="pied-de-page__lien" href="tel:+14165550198">📞 +1 (416) 555-0198</a>
          <a className="pied-de-page__lien" href="mailto:concierge@elara-wellness.ca">✉️ concierge@elara-wellness.ca</a>
          <span className="pied-de-page__lien">🕐 Lun–Ven : 08:00–22:00</span>
          <span className="pied-de-page__lien">🕐 Sam–Dim : 09:00–23:00</span>
        </div>
      </div>
      <div className="pied-de-page__bas">
        <span className="pied-de-page__copyright">© 2026 ÉLARA Wellness. Le sanctuaire de la quiétude.</span>
        <span className="pied-de-page__concu">Conçu par <a href="#">[Votre nom] — SEG3525 Devoir 2</a></span>
      </div>
    </footer>
  );
}

/* ── Composant : Accordéon ────────────────────────────────── */
function Accordeon({ items }) {
  const [ouvert, setOuvert] = useState(null);
  return (
    <div className="accordeon__max-largeur">
      {items.map((item, i) => (
        <div key={i} className="accordeon__item">
          <button className="accordeon__bouton" onClick={() => setOuvert(ouvert === i ? null : i)}>
            <span>{item.q}</span>
            <span className={`accordeon__chevron${ouvert === i ? " accordeon__chevron--ouvert" : ""}`}>▾</span>
          </button>
          <div className={`accordeon__contenu${ouvert === i ? " accordeon__contenu--ouvert" : ""}`}>
            <p>{item.r}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Composant : Fil de navigation ────────────────────────── */
function FilNavigation({ items }) {
  return (
    <div className="fil-navigation">
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i < items.length - 1 ? (
            <>
              <button className="fil-navigation__item" onClick={item.action}>{item.label}</button>
              <span className="fil-navigation__sep">›</span>
            </>
          ) : (
            <span className="fil-navigation__actuel">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ── Page : Accueil ───────────────────────────────────────── */
function PageAccueil({ setPage, setServiceChoisi }) {
  function choisirService(service) {
    setServiceChoisi(service);
    setPage("reservation");
  }

  return (
    <>
      {/* Héro */}
      <section className="hero">
        <div className="hero__fond" />
        <div className="hero__contenu">
          <span className="u-label hero__surtitre">L'Expérience Ultime</span>
          <h1 className="hero__titre">
            L'Art du Soin<br /><em>Thérapeutique</em>
          </h1>
          <p className="hero__sous-titre">
            Thérapeutes certifiés. Soins sur mesure. Un sanctuaire de pierre et de silence au cœur de Toronto.
          </p>
          <div className="hero__actions">
            <button className="btn-primaire" onClick={() => setPage("reservation")}>Réserver une séance</button>
            <button className="btn-secondaire" onClick={() => setPage("services")}>Découvrir nos soins</button>
          </div>
        </div>
      </section>

      {/* À propos */}
      <section className="section a-propos">
        <div className="a-propos__grille">
          <img
            className="a-propos__image"
            src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80"
            alt="Intérieur du sanctuaire ÉLARA"
            loading="lazy"
          />
          <div className="a-propos__texte">
            <span className="u-label">Notre Philosophie</span>
            <h2 style={{marginTop:"0.8rem"}}>Reconnectez-vous<br />à l'<em>Essentiel</em></h2>
            <p>
              Niché au cœur de Toronto, ÉLARA Wellness est un sanctuaire de soins thérapeutiques où chaque détail a été pensé pour suspendre le temps. Nos espaces conjuguent la pierre brute, la lumière tamisée et le silence comme matières premières de votre bien-être.
            </p>
            <p>
              Notre équipe de thérapeutes certifiés propose une gamme complète de massages et soins corporels, conçus pour répondre à chaque besoin — de la récupération sportive à la détente profonde.
            </p>
            <div className="banniere-etudiante">
              <span className="banniere-etudiante__icone">🎓</span>
              <p className="banniere-etudiante__texte">
                <strong>Tarif étudiant disponible</strong> — Réduction exclusive du lundi au jeudi. Présentez votre carte étudiante valide lors de votre visite.
              </p>
            </div>
            <div className="a-propos__stats">
              <div>
                <div className="a-propos__stat-chiffre">12+</div>
                <div className="a-propos__stat-label">Années d'expertise</div>
              </div>
              <div>
                <div className="a-propos__stat-chiffre">6</div>
                <div className="a-propos__stat-label">Soins signatures</div>
              </div>
              <div>
                <div className="a-propos__stat-chiffre">3</div>
                <div className="a-propos__stat-label">Thérapeutes certifiés</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services vedettes */}
      <section className="section services" id="services">
        <div className="section__en-tete">
          <span className="u-label">Nos Soins Signatures</span>
          <div className="u-trait-or" />
          <h2 className="section__titre">Choisissez votre <em>rituel</em></h2>
          <p className="section__desc">
            Chaque soin est une invitation au silence. Sélectionnez l'expérience qui correspond à vos besoins et réservez en quelques instants.
          </p>
        </div>
        <div className="services__grille">
          {SERVICES.slice(0, 3).map(s => (
            <CarteService key={s.id} service={s} onReserver={choisirService} />
          ))}
        </div>
        <div style={{textAlign:"center", marginTop:"2.5rem"}}>
          <button className="btn-secondaire" onClick={() => setPage("services")}>
            Voir tous nos soins →
          </button>
        </div>
      </section>

      {/* Section thérapeutes */}
      <section className="section therapeutes">
        <div className="section__en-tete">
          <span className="u-label">Les Gardiens du Silence</span>
          <div className="u-trait-or" />
          <h2 className="section__titre">Nos <em>Experts</em> Thérapeutes</h2>
          <p className="section__desc">
            Chaque praticien est sélectionné pour sa maîtrise technique et sa capacité à créer un espace de confiance et de profonde écoute.
          </p>
        </div>
        <div className="therapeutes__grille" style={{maxWidth:"1100px",margin:"0 auto"}}>
          {THERAPEUTES.map(t => (
            <CarteTherapeuteSimple key={t.id} therapeute={t} onReserver={() => { setPage("reservation"); }} />
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:"2.5rem"}}>
          <button className="btn-secondaire" onClick={() => setPage("therapeutes")}>
            Voir tous les thérapeutes →
          </button>
        </div>
      </section>

      {/* Première visite – FAQ */}
      <section className="section premiere-visite">
        <div className="section__en-tete">
          <span className="u-label">Conseils d'Experts</span>
          <div className="u-trait-or" />
          <h2 className="section__titre">Première visite<br />chez <em>ÉLARA</em> ?</h2>
          <p className="section__desc">
            Tout ce que vous devez savoir avant de franchir les portes de notre sanctuaire.
          </p>
        </div>
        <Accordeon items={FAQ} />
      </section>
    </>
  );
}

/* ── Composant : Carte de service ─────────────────────────── */
function CarteService({ service, onReserver }) {
  return (
    <div className="carte-service" onClick={() => onReserver(service)}>
      <img className="carte-service__image" src={service.img} alt={service.nom} loading="lazy" />
      <div className="carte-service__badge">{service.badge}</div>
      <div className="carte-service__corps">
        <div className="carte-service__nom">{service.nom}</div>
        <div className="carte-service__desc">{service.desc}</div>
        <div className="carte-service__meta">
          <span className="carte-service__duree">⏱ {service.duree}</span>
          <span className="carte-service__prix">À partir de {service.prix}$</span>
        </div>
        <button className="carte-service__btn" onClick={e => { e.stopPropagation(); onReserver(service); }}>
          Réserver ce soin
        </button>
      </div>
    </div>
  );
}

/* ── Composant : Carte thérapeute (simple) ────────────────── */
function CarteTherapeuteSimple({ therapeute, onReserver }) {
  return (
    <div className="carte-therapeute">
      <div className="carte-therapeute__photo-enveloppe">
        <img className="carte-therapeute__photo" src={therapeute.img} alt={therapeute.nom} loading="lazy" />
        <div className="carte-therapeute__overlay" />
      </div>
      <div className="carte-therapeute__nom">{therapeute.nom}</div>
      <div className="carte-therapeute__titre">{therapeute.titre}</div>
      <div className="carte-therapeute__exp">{therapeute.exp}</div>
      <div className="carte-therapeute__tags">
        {therapeute.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
      <button className="carte-therapeute__btn" onClick={onReserver}>
        Réserver avec {therapeute.nom.split(" ")[0]}
      </button>
    </div>
  );
}

/* ── Page : Services ──────────────────────────────────────── */
function PageServices({ setPage, setServiceChoisi }) {
  function choisirService(service) {
    setServiceChoisi(service);
    setPage("reservation");
  }

  return (
    <>
      <FilNavigation items={[
        {label:"Accueil", action:() => setPage("accueil")},
        {label:"Services"}
      ]} />
      <section className="section services" style={{paddingTop:"3rem"}}>
        <div className="section__en-tete">
          <span className="u-label">Catalogue complet</span>
          <div className="u-trait-or" />
          <h2 className="section__titre">Tous nos <em>Soins</em></h2>
          <p className="section__desc">
            Six soins signatures conçus pour cibler chaque besoin. Des massages therapeutiques aux rituels sensuels, trouvez l'expérience qui vous correspond.
          </p>
        </div>
        <div className="banniere-etudiante" style={{maxWidth:"1100px",margin:"0 auto 2.5rem"}}>
          <span className="banniere-etudiante__icone">🎓</span>
          <p className="banniere-etudiante__texte">
            <strong>Tarif étudiant disponible</strong> sur le Massage Suédois et le Rituel Aromatique — du lundi au jeudi. Présentez votre carte étudiante à la réception.
          </p>
        </div>
        <div className="services__grille">
          {SERVICES.map(s => <CarteService key={s.id} service={s} onReserver={choisirService} />)}
        </div>
      </section>

      <section className="section premiere-visite">
        <div className="section__en-tete">
          <span className="u-label">Questions fréquentes</span>
          <div className="u-trait-or" />
          <h2 className="section__titre">Avant votre <em>première visite</em></h2>
        </div>
        <Accordeon items={FAQ} />
      </section>
    </>
  );
}

/* ── Page : Thérapeutes ───────────────────────────────────── */
function PageTherapeu({ setPage, setServiceChoisi }) {
  return (
    <>
      <FilNavigation items={[
        {label:"Accueil", action:() => setPage("accueil")},
        {label:"Thérapeutes"}
      ]} />

      {/* En-tête hero thérapeutes */}
      <div style={{
        position:"relative", height:"320px", display:"flex", alignItems:"flex-end", overflow:"hidden"
      }}>
        <div style={{
          position:"absolute", inset:0,
          background:"linear-gradient(180deg,rgba(13,12,10,0.4)0%,rgba(13,12,10,0.85)100%),url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=80') center/cover"
        }}/>
        <div style={{position:"relative",padding:"0 3rem 3rem"}}>
          <span className="u-label">Les Gardiens du Silence</span>
          <h1 style={{fontFamily:"var(--police-titre)",fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:300,marginTop:"0.5rem",lineHeight:1.1}}>
            Nos Experts <em style={{fontStyle:"italic",color:"var(--or-clair)"}}>Thérapeutes</em>
          </h1>
        </div>
      </div>

      <section className="section therapeutes">
        <p className="section__desc" style={{textAlign:"center",marginBottom:"3rem"}}>
          Chaque praticien est sélectionné pour sa maîtrise technique, ses certifications officielles et sa capacité à créer un espace de confiance et d'écoute profonde.
        </p>
        <div className="therapeutes__grille" style={{maxWidth:"1100px",margin:"0 auto"}}>
          {THERAPEUTES.map(t => (
            <div key={t.id} className="carte-therapeute">
              <div className="carte-therapeute__photo-enveloppe">
                <img className="carte-therapeute__photo" src={t.img} alt={t.nom} loading="lazy" />
                <div className="carte-therapeute__overlay" />
              </div>
              <div className="carte-therapeute__nom">{t.nom}</div>
              <div className="carte-therapeute__titre">{t.titre}</div>
              <div className="carte-therapeute__exp">{t.exp}</div>
              <div className="carte-therapeute__tags">
                {t.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>
              <button className="carte-therapeute__btn" onClick={() => setPage("reservation")}>
                Réserver avec {t.nom.split(" ")[0]}
              </button>
            </div>
          ))}
        </div>

        {/* Stats de qualité */}
        <div style={{
          maxWidth:"1100px",margin:"4rem auto 0",
          background:"var(--noir-carte)",border:"1px solid var(--noir-bord)",
          padding:"2.5rem",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"2rem",textAlign:"center"
        }}>
          {[
            {chiffre:"100%",label:"Thérapeutes certifiés"},
            {chiffre:"4.9/5",label:"Note moyenne clients"},
            {chiffre:"2 800+",label:"Séances réalisées"}
          ].map(s => (
            <div key={s.label}>
              <div style={{fontFamily:"var(--police-titre)",fontSize:"2.5rem",color:"var(--or)",fontWeight:300}}>{s.chiffre}</div>
              <div style={{fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",color:"var(--gris-moyen)",marginTop:"0.3rem"}}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ── Page : Coordonnées ───────────────────────────────────── */
function PageCoordonnees({ setPage }) {
  return (
    <>
      <FilNavigation items={[
        {label:"Accueil", action:() => setPage("accueil")},
        {label:"Lieux & Contact"}
      ]} />
      <section className="section coordonnees">
        <div className="section__en-tete">
          <span className="u-label">Votre Sanctuaire</span>
          <div className="u-trait-or" />
          <h2 className="section__titre">Trouver <em>ÉLARA</em></h2>
          <p className="section__desc">Get ready to immerse your senses. The murmur of water awaits you.</p>
        </div>
        <div className="coordonnees__grille">
          <div className="coordonnees__info">
            <h2>Bienvenue au<br /><em>Sanctuaire de Toronto</em></h2>
            <p style={{color:"var(--gris-clair)",fontSize:"13px",lineHeight:1.9,marginBottom:"2rem"}}>
              Niché dans le quartier historique de Toronto, ÉLARA Wellness vous accueille dans un espace de brique et de bois centenaire, transformé en havre de paix contemporain.
            </p>
            <div className="coordonnees__element">
              <span className="coordonnees__icone">📍</span>
              <div>
                <div className="coordonnees__element-label">Adresse</div>
                <div className="coordonnees__element-valeur">128 Distillery Lane (Unité 100)<br />Toronto, ON M5A 3C4</div>
              </div>
            </div>
            <div className="coordonnees__element">
              <span className="coordonnees__icone">📞</span>
              <div>
                <div className="coordonnees__element-label">Téléphone</div>
                <div className="coordonnees__element-valeur">
                  <a href="tel:+14165550198">+1 (416) 555-0198</a>
                </div>
              </div>
            </div>
            <div className="coordonnees__element">
              <span className="coordonnees__icone">✉️</span>
              <div>
                <div className="coordonnees__element-label">Courriel</div>
                <div className="coordonnees__element-valeur">
                  <a href="mailto:concierge@elara-wellness.ca">concierge@elara-wellness.ca</a>
                </div>
              </div>
            </div>
            <div className="coordonnees__element">
              <span className="coordonnees__icone">🕐</span>
              <div>
                <div className="coordonnees__element-label">Horaires</div>
                <div className="coordonnees__element-valeur">
                  Lundi – Vendredi : 08:00 – 22:00<br />
                  Samedi – Dimanche : 09:00 – 23:00
                </div>
              </div>
            </div>
            <div style={{marginTop:"2rem"}}>
              <button className="btn-primaire" onClick={() => setPage("reservation")}>Réserver une séance</button>
            </div>
          </div>

          {/* Carte Google Maps iframe */}
          <div>
            <iframe
              className="carte-map"
              title="Carte ÉLARA Wellness Toronto"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.3!2d-79.3598!3d43.6501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDM5JzAwLjQiTiA3OcKwMjEnMzUuMyJX!5e0!3m2!1sfr!2sca!4v1620000000000!5m2!1sfr!2sca"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{width:"100%",aspectRatio:"4/3",border:"1px solid var(--noir-bord)"}}
            />
            <div style={{
              background:"var(--noir-carte)",border:"1px solid var(--noir-bord)",
              borderTop:"none",padding:"1.2rem 1.5rem"
            }}>
              <div style={{fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",color:"var(--or)",marginBottom:"0.5rem"}}>
                Comment s'y rendre
              </div>
              <p style={{fontSize:"12px",color:"var(--gris-clair)",lineHeight:1.7}}>
                <strong style={{color:"var(--blanc)"}}>En tramway :</strong> Arrêts King St W à Portland St, ou Spadina Ave à Front St W.<br />
                <strong style={{color:"var(--blanc)"}}>En voiture :</strong> Stationnement disponible au 530 Front St W (tarif réduit de 10$ sur présentation de votre rendez-vous).
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Calendrier interactif ───────────────────────────────── */
function Calendrier({ dateSelectionnee, setDateSelectionnee }) {
  const maintenant = new Date();
  const [annee, setAnnee] = useState(maintenant.getFullYear());
  const [mois, setMois] = useState(maintenant.getMonth());

  function precedent() {
    if (mois === 0) { setMois(11); setAnnee(a => a - 1); }
    else setMois(m => m - 1);
  }

  function suivant() {
    if (mois === 11) { setMois(0); setAnnee(a => a + 1); }
    else setMois(m => m + 1);
  }

  const premierJour = new Date(annee, mois, 1).getDay();
  const decalage = premierJour === 0 ? 6 : premierJour - 1;
  const nbJours = new Date(annee, mois + 1, 0).getDate();
  const cellules = [...Array(decalage).fill(null), ...Array.from({length: nbJours}, (_, i) => i + 1)];

  function estPasse(j) {
    const d = new Date(annee, mois, j);
    d.setHours(0,0,0,0);
    const auj = new Date(); auj.setHours(0,0,0,0);
    return d < auj;
  }

  function formaterDate(j) {
    return `${j.toString().padStart(2,"0")}/${(mois+1).toString().padStart(2,"0")}/${annee}`;
  }

  return (
    <div className="calendrier">
      <div className="calendrier__en-tete">
        <button className="calendrier__nav-btn" onClick={precedent}>‹</button>
        <span className="calendrier__mois">{MOIS_NOMS[mois]} {annee}</span>
        <button className="calendrier__nav-btn" onClick={suivant}>›</button>
      </div>
      <div className="calendrier__jours-semaine">
        {JOURS_NOMS.map(j => <div key={j} className="calendrier__jour-sem">{j}</div>)}
      </div>
      <div className="calendrier__grille">
        {cellules.map((j, i) => {
          if (!j) return <div key={i} className="calendrier__jour calendrier__jour--vide" />;
          const passe = estPasse(j);
          const date = formaterDate(j);
          const selectionne = dateSelectionnee === date;
          return (
            <div
              key={i}
              className={`calendrier__jour${passe ? " calendrier__jour--passe" : ""}${selectionne ? " calendrier__jour--selectionne" : ""}`}
              onClick={() => !passe && setDateSelectionnee(date)}
            >
              {j}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Page : Réservation ───────────────────────────────────── */
function PageReservation({ setPage, serviceChoisi, setDerniereReservation }) {
  const [serviceId, setServiceId]       = useState(serviceChoisi ? serviceChoisi.id : 1);
  const [therapeuteId, setTherapId]     = useState(1);
  const [date, setDate]                 = useState("");
  const [heure, setHeure]               = useState("");
  const [prenom, setPrenom]             = useState("");
  const [nom, setNom]                   = useState("");
  const [email, setEmail]               = useState("");
  const [tel, setTel]                   = useState("");
  const [pref, setPref]                 = useState("");
  const [accepte, setAccepte]           = useState(false);
  const [erreurs, setErreurs]           = useState({});

  const service     = SERVICES.find(s => s.id === serviceId) || SERVICES[0];
  const therapeute  = THERAPEUTES.find(t => t.id === therapeuteId);

  function valider() {
    const e = {};
    if (!date)    e.date    = "Veuillez choisir une date.";
    if (!heure)   e.heure   = "Veuillez choisir un créneau.";
    if (!prenom.trim()) e.prenom = "Prénom requis.";
    if (!nom.trim())    e.nom    = "Nom requis.";
    if (!email.includes("@")) e.email = "Courriel invalide.";
    if (!tel.trim())    e.tel    = "Téléphone requis.";
    if (!accepte)       e.accepte= "Veuillez accepter les conditions.";
    return e;
  }

  function soumettre(e) {
    e.preventDefault();
    const errs = valider();
    if (Object.keys(errs).length > 0) { setErreurs(errs); return; }
    setDerniereReservation({ service, therapeute, date, heure, prenom, nom, email, tel });
    setPage("confirmation");
  }

  return (
    <>
      <FilNavigation items={[
        {label:"Accueil", action:() => setPage("accueil")},
        {label:"Services", action:() => setPage("services")},
        {label:"Réservation"}
      ]} />
      <section className="section reservation">
        <div className="section__en-tete">
          <span className="u-label">Finaliser la réservation</span>
          <div className="u-trait-or" />
          <h2 className="section__titre">Votre <em>Sanctuaire</em> vous attend</h2>
          <p className="section__desc">Élaborons votre moment de quiétude ensemble.</p>
        </div>

        <div className="reservation__grille">
          {/* Récapitulatif */}
          <aside className="reservation__recapitulatif">
            <h3>Récapitulatif</h3>
            <div className="recap__ligne">
              <span className="recap__cle">Soin</span>
              <span className="recap__val">{service.nom}</span>
            </div>
            <div className="recap__ligne">
              <span className="recap__cle">Durée</span>
              <span className="recap__val">{service.duree}</span>
            </div>
            <div className="recap__ligne">
              <span className="recap__cle">Thérapeute</span>
              <span className="recap__val">{therapeute ? therapeute.nom : "—"}</span>
            </div>
            <div className="recap__ligne">
              <span className="recap__cle">Date</span>
              <span className="recap__val">{date || "—"}</span>
            </div>
            <div className="recap__ligne">
              <span className="recap__cle">Heure</span>
              <span className="recap__val">{heure || "—"}</span>
            </div>
            <div className="recap__total">
              <span className="recap__total-label">Total</span>
              <span className="recap__total-montant">{service.prix}$</span>
            </div>
            <p style={{fontSize:"11px",color:"var(--gris-moyen)",marginTop:"1rem",textAlign:"center"}}>
              🔒 Paiement sécurisé sur place
            </p>
          </aside>

          {/* Formulaire */}
          <form onSubmit={soumettre}>

            {/* Étape 1 — Choisir un soin */}
            <div className="formulaire__etape">
              <h3 className="formulaire__etape-titre">
                <span className="formulaire__etape-num">1</span>
                Choisir un soin
              </h3>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.8rem"}}>
                {SERVICES.map(s => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setServiceId(s.id)}
                    style={{
                      background: serviceId === s.id ? "rgba(201,169,110,0.1)" : "var(--noir-carte)",
                      border: `1px solid ${serviceId === s.id ? "var(--or)" : "var(--noir-bord)"}`,
                      color: serviceId === s.id ? "var(--or)" : "var(--gris-clair)",
                      padding:"0.9rem 1rem",textAlign:"left",
                      cursor:"pointer",transition:"all var(--transition)",
                      fontFamily:"var(--police-corps)"
                    }}
                  >
                    <div style={{fontSize:"12px",marginBottom:"0.2rem"}}>{s.nom}</div>
                    <div style={{fontSize:"10px",color:"var(--gris-moyen)"}}>{s.prix}$ · {s.duree}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Étape 2 — Choisir un thérapeute */}
            <div className="formulaire__etape">
              <h3 className="formulaire__etape-titre">
                <span className="formulaire__etape-num">2</span>
                Choisir votre thérapeute
              </h3>
              <div className="select-therapeute">
                {THERAPEUTES.map(t => (
                  <div
                    key={t.id}
                    className={`select-therapeute__option${therapeuteId === t.id ? " select-therapeute__option--selectionne" : ""}`}
                    onClick={() => setTherapId(t.id)}
                  >
                    <div className="select-therapeute__nom">{t.nom}</div>
                    <div className="select-therapeute__spec">{t.titre}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Étape 3 — Choisir une date */}
            <div className="formulaire__etape">
              <h3 className="formulaire__etape-titre">
                <span className="formulaire__etape-num">3</span>
                Choisir une date
              </h3>
              <Calendrier dateSelectionnee={date} setDateSelectionnee={setDate} />
              {erreurs.date && <p style={{color:"#c0392b",fontSize:"12px",marginTop:"0.4rem"}}>{erreurs.date}</p>}

              <h4 style={{fontSize:"12px",letterSpacing:"1.5px",textTransform:"uppercase",color:"var(--or)",margin:"1.2rem 0 0.8rem"}}>
                Sélectionner l'heure
              </h4>
              <div className="creneaux">
                {CRENEAUX.map(c => (
                  <button
                    key={c}
                    type="button"
                    className={`creneau${heure === c ? " creneau--selectionne" : ""}`}
                    onClick={() => setHeure(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
              {erreurs.heure && <p style={{color:"#c0392b",fontSize:"12px"}}>{erreurs.heure}</p>}
            </div>

            {/* Étape 4 — Informations personnelles */}
            <div className="formulaire__etape">
              <h3 className="formulaire__etape-titre">
                <span className="formulaire__etape-num">4</span>
                Vos informations
              </h3>
              <div className="champ-groupe">
                <div className="champ">
                  <label>Prénom</label>
                  <input value={prenom} onChange={e => setPrenom(e.target.value)} placeholder="ex: Sofia" />
                  {erreurs.prenom && <span style={{color:"#c0392b",fontSize:"11px"}}>{erreurs.prenom}</span>}
                </div>
                <div className="champ">
                  <label>Nom</label>
                  <input value={nom} onChange={e => setNom(e.target.value)} placeholder="ex: Mansour" />
                  {erreurs.nom && <span style={{color:"#c0392b",fontSize:"11px"}}>{erreurs.nom}</span>}
                </div>
                <div className="champ">
                  <label>Adresse courriel</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@courriel.com" />
                  {erreurs.email && <span style={{color:"#c0392b",fontSize:"11px"}}>{erreurs.email}</span>}
                </div>
                <div className="champ">
                  <label>Téléphone</label>
                  <input type="tel" value={tel} onChange={e => setTel(e.target.value)} placeholder="+1 (___) ___-____" />
                  {erreurs.tel && <span style={{color:"#c0392b",fontSize:"11px"}}>{erreurs.tel}</span>}
                </div>
                <div className="champ champ--plein">
                  <label>Préférences particulières (optionnel)</label>
                  <textarea value={pref} onChange={e => setPref(e.target.value)} placeholder="Allergies, zones à éviter, pression préférée…" />
                </div>
              </div>

              <div className="checkbox-ligne">
                <input
                  type="checkbox"
                  id="cond"
                  checked={accepte}
                  onChange={e => setAccepte(e.target.checked)}
                />
                <label htmlFor="cond">
                  J'accepte les conditions de réservation et la politique d'annulation d'ÉLARA (annulation gratuite jusqu'à 24h avant le soin).
                </label>
              </div>
              {erreurs.accepte && <p style={{color:"#c0392b",fontSize:"12px",marginBottom:"1rem"}}>{erreurs.accepte}</p>}

              <button type="submit" className="btn-primaire" style={{width:"100%",padding:"1.1rem",fontSize:"11px",letterSpacing:"3px"}}>
                CONFIRMER LA RÉSERVATION
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

/* ── Page : Confirmation ──────────────────────────────────── */
function PageConfirmation({ reservation, setPage, setServiceChoisi }) {
  if (!reservation) {
    return (
      <div style={{minHeight:"60vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"8rem 2rem",textAlign:"center"}}>
        <p style={{color:"var(--gris-clair)",marginBottom:"2rem"}}>Aucune réservation trouvée.</p>
        <button className="btn-primaire" onClick={() => setPage("accueil")}>Retour à l'accueil</button>
      </div>
    );
  }

  const { service, therapeute, date, heure, prenom } = reservation;

  return (
    <div className="confirmation">
      <div className="confirmation__icone">✓</div>
      <h1 className="confirmation__titre">
        Votre moment de <em>sérénité</em><br />est confirmé, {prenom}.
      </h1>
      <p className="confirmation__sous-titre">
        Nous avons hâte de vous accueillir dans l'enceinte sacrée d'ÉLARA. Un courriel de confirmation vous sera envoyé sous peu.
      </p>

      <div className="confirmation__carte">
        <h3>Détails de votre rendez-vous</h3>
        <div className="confirmation__ligne">
          <span className="confirmation__cle">Rituel</span>
          <span className="confirmation__val">{service.nom}</span>
        </div>
        <div className="confirmation__ligne">
          <span className="confirmation__cle">Durée</span>
          <span className="confirmation__val">{service.duree}</span>
        </div>
        <div className="confirmation__ligne">
          <span className="confirmation__cle">Thérapeute</span>
          <span className="confirmation__val">{therapeute ? therapeute.nom : "—"}</span>
        </div>
        <div className="confirmation__ligne">
          <span className="confirmation__cle">Date & Heure</span>
          <span className="confirmation__val">{date} — {heure}</span>
        </div>
        <div className="confirmation__ligne">
          <span className="confirmation__cle">Lieu</span>
          <span className="confirmation__val">128 Distillery Lane, Toronto, ON</span>
        </div>
        <div className="confirmation__ligne">
          <span className="confirmation__cle">Investissement</span>
          <span className="confirmation__val" style={{color:"var(--or)",fontFamily:"var(--police-titre)",fontSize:"1.2rem"}}>{service.prix}$</span>
        </div>
      </div>

      <div className="confirmation__actions">
        <button className="btn-primaire" onClick={() => {
          setServiceChoisi(null);
          setPage("accueil");
        }}>
          Retour à l'accueil
        </button>
        <button className="btn-secondaire" onClick={() => setPage("services")}>
          Découvrir d'autres soins
        </button>
      </div>
    </div>
  );
}

/* ── Application principale ───────────────────────────────── */
function App() {
  const [page, setPage]                         = useState("accueil");
  const [serviceChoisi, setServiceChoisi]       = useState(null);
  const [derniereReservation, setDerniereRes]   = useState(null);

  // Remonter en haut lors du changement de page
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  function setDerniereReservation(r) { setDerniereRes(r); }

  const pageProps = { setPage, serviceChoisi, setServiceChoisi };

  return (
    <>
      <Navigation page={page} setPage={setPage} />

      <main>
        {page === "accueil"      && <PageAccueil      {...pageProps} />}
        {page === "services"     && <PageServices     {...pageProps} />}
        {page === "therapeutes"  && <PageTherapeu     {...pageProps} />}
        {page === "coordonnees"  && <PageCoordonnees  {...pageProps} />}
        {page === "reservation"  && (
          <PageReservation
            setPage={setPage}
            serviceChoisi={serviceChoisi}
            setDerniereReservation={setDerniereReservation}
          />
        )}
        {page === "confirmation" && (
          <PageConfirmation
            reservation={derniereReservation}
            setPage={setPage}
            setServiceChoisi={setServiceChoisi}
          />
        )}
      </main>

      {page !== "confirmation" && <PiedDePage setPage={setPage} />}
    </>
  );
}

/* ── Montage ──────────────────────────────────────────────── */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));