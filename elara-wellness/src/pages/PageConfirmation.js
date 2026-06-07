import React from 'react';
import useReveal from '../hooks/useReveal';

export default function PageConfirmation({ go, reservation }) {
  const ref = useReveal();
  const drName = reservation.dr ? reservation.dr.split('(')[0].trim() : '—';
  const soin = reservation.soin || '—';
  const dateStr = reservation.dateStr || '—';

  return (
    <div ref={ref}>
      <div className="p4-wrap">
        <p className="cf-eye">Réservation Confirmée</p>
        <h1 className="cf-h1">Votre sanctuaire vous attend</h1>
        <p className="cf-sub">L'invitation au calme a été scellée. Préparez-vous pour un voyage sensoriel hors du temps.</p>
        <div className="cf-img rv">
          <img src="image/confirmation.png" alt="Votre sanctuaire vous attend" />
        </div>
        <div className="sum-card rv">
          <h3 className="sum-h">Récapitulatif de votre séance</h3>
          <div className="sum-grid">
            <div><div className="sum-lbl">Soin Réservé</div><div className="sum-val">{soin}</div></div>
            <div><div className="sum-lbl">Thérapeute</div><div className="sum-val">{drName}</div></div>
            <div><div className="sum-lbl">Date &amp; Heure</div><div className="sum-val">{dateStr}</div></div>
            <div><div className="sum-lbl">Lieu</div><div className="sum-val">128 Distillery Lane, Ottawa ON</div></div>
          </div>
        </div>
        <div className="cf-cards rv" style={{ transitionDelay: '.14s' }}>
          <div className="cf-card">
            <div className="cf-card-hd">
              <span className="cf-card-ico"><i className="bi bi-info-circle" style={{ fontSize: '13px', lineHeight: 1 }}></i></span>
              <span className="cf-card-ttl">Instructions d'arrivée</span>
            </div>
            <p className="cf-card-body">Nous vous invitons à arriver 15 minutes avant le début de votre soin pour une transition en douceur. Des vestiaires privés et des linges en coton biologique vous seront fournis.</p>
          </div>
          <div className="cf-card">
            <div className="cf-card-hd">
              <span className="cf-card-ico"><i className="bi bi-geo-alt" style={{ fontSize: '13px', lineHeight: 1 }}></i></span>
              <span className="cf-card-ttl">Localisation</span>
            </div>
            <p className="cf-card-addr">128 Distillery Lane,<br />Ottawa, ON M5A 3C4</p>
          </div>
        </div>
        <div className="cf-acts rv" style={{ transitionDelay: '.24s' }}>
          <button className="btn-fill">Ajouter à mon Calendrier</button>
          <button className="btn-ghost" onClick={() => go('p3')}>Modifier ma réservation</button>
        </div>
      </div>
    </div>
  );
}