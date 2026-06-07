import React from 'react';
import useReveal from '../hooks/useReveal';

const SOINS = [
  "Massage Relaxant Antique 60'",
  "Sérénité Essentielle",
  "Massage Intensité Profonde",
  "Escape Together 60'",
  "Bains Évasion Couple",
  "Rituel au Sel de l'Himalaya",
  "Rituel Hydratant au Miel",
];

const THERAPEUTES = [
  "Dr. Cinthya Molina (Massage Thérapeutique)",
  "Dr. Guillermo Torre (Massothérapie)",
  "Dr. Barbara Dalbos (Spécialiste Musculaire)",
];

const HEURES = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','15:30','16:00','17:00','18:00','19:00','20:00'];

function matchDr(dr) {
  if (!dr) return '';
  return THERAPEUTES.find(t => t.startsWith(dr)) || dr;
}

function matchSoin(soin) {
  if (!soin) return SOINS[0];
  return SOINS.find(s => s === soin) || soin;
}

export default function PageReservation({ go, reservation, setReservation, confirmer }) {
  const ref = useReveal();
  const soinValue = matchSoin(reservation.soin);
  const drValue = matchDr(reservation.dr);
  const update = (field) => (e) => setReservation(prev => ({ ...prev, [field]: e.target.value }));

  const handleConfirmer = () => {
    const date = reservation.date;
    let ds = 'Vendredi, 24 Mai  ' + (reservation.heure || '15:30');
    if (date) {
      const d = new Date(date + 'T12:00:00');
      ds = d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }) + '  ' + (reservation.heure || '15:30');
    }
    confirmer({ ...reservation, dateStr: ds });
  };

  return (
    <div ref={ref}>
      <div className="p3-wrap">
        <div className="rv">
          <h1 className="loc-h1">Votre Sanctuaire à Ottawa</h1>
          <p className="loc-desc">Une immersion souterraine au cœur de la ville. L'équilibre parfait entre la pierre brutale et la chaleur ambrée.</p>
          <ul className="info-list">
            <li className="info-row">
              <div className="info-ico"><i className="bi bi-geo-alt" style={{ fontSize: '11px', lineHeight: 1 }}></i></div>
              <div>
                <div className="info-lbl">Adresse</div>
                <div className="info-val">128 Distillery Lane,<br />Ottawa, ON M5A 3C4</div>
              </div>
            </li>
            <li className="info-row">
              <div className="info-ico"><i className="bi bi-clock" style={{ fontSize: '11px', lineHeight: 1 }}></i></div>
              <div>
                <div className="info-lbl">Horaires</div>
                <div className="info-val">Lundi au Vendredi : 08:00 - 22:00<br />Samedi au Dimanche : 09:00 - 23:00</div>
              </div>
            </li>
            <li className="info-row">
              <div className="info-ico"><i className="bi bi-telephone" style={{ fontSize: '11px', lineHeight: 1 }}></i></div>
              <div>
                <div className="info-lbl">Contact</div>
                <div className="info-val">
                  <a href="tel:+14165550198">+1 (416) 555-0198</a><br />
                  <a href="mailto:reserve@elara-wellness.ca">reserve@elara-wellness.ca</a>
                </div>
              </div>
            </li>
          </ul>
          <div className="map-box">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.5!2d-79.3579!3d43.6503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb2eda02ced7%3A0x2!2sDistillery+District%2C+Ottawa!5e0!3m2!1sfr!2sca!4v1"
              loading="lazy" title="ÉLARA Ottawa" allowFullScreen
            ></iframe>
            <div className="map-dot"></div>
          </div>
        </div>

        <div className="form-box rv" style={{ transitionDelay: '.18s' }}>
          <div className="form-ttl">Finaliser la Réservation</div>
          <div className="form-sub">Élaborons votre moment de quiétude.</div>
          <div className="frow">
            <div className="fg">
              <label className="fl">Type de Soin</label>
              <select className="fi" value={soinValue} onChange={update('soin')}>
                {SOINS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="fg">
              <label className="fl">Thérapeute</label>
              <select className="fi" value={drValue} onChange={update('dr')}>
                {THERAPEUTES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="frow">
            <div className="fg">
              <label className="fl">Date Souhaitée</label>
              <input type="date" className="fi" value={reservation.date || ''} onChange={update('date')} />
            </div>
            <div className="fg">
              <label className="fl">Heure</label>
              <select className="fi" value={reservation.heure || '15:30'} onChange={update('heure')}>
                {HEURES.map(h => <option key={h}>{h}</option>)}
              </select>
            </div>
          </div>
          <div className="frow">
            <div className="fg">
              <label className="fl">Nom Complet</label>
              <input type="text" className="fi" value={reservation.nom || ''} onChange={update('nom')} placeholder="ex: Jean Dupont" />
            </div>
            <div className="fg">
              <label className="fl">Téléphone</label>
              <input type="tel" className="fi" value={reservation.tel || ''} onChange={update('tel')} placeholder="+1 (___) ___-____" />
            </div>
          </div>
          <div className="frow one">
            <div className="fg">
              <label className="fl">Email</label>
              <input type="email" className="fi" value={reservation.email || ''} onChange={update('email')} placeholder="votre@adresse.com" />
            </div>
          </div>
          <div className="form-ft">
            <div className="secure">
              <i className="bi bi-lock" style={{ fontSize: '13px', lineHeight: 1, opacity: .6 }}></i>
              Paiement Sécurisé sur Place
            </div>
            <button className="btn-confirm" onClick={handleConfirmer}>Confirmer la Réservation</button>
          </div>
        </div>
      </div>
    </div>
  );
}