import React from 'react';

export default function Footer({ go }) {
  return (
    <footer className="ft">
      <div className="ft-logo">ÉLARA</div>
      <div className="ft-contact">
        <div className="ft-contact-item">
          <i className="bi bi-telephone"></i>
          <a href="tel:+14165550198">+1 (416) 555-0198</a>
        </div>
        <div className="ft-contact-item">
          <i className="bi bi-envelope"></i>
          <a href="mailto:reserve@elara-wellness.ca">reserve@elara-wellness.ca</a>
        </div>
        <div className="ft-contact-item">
          <i className="bi bi-geo-alt"></i>
          <span>128 Lane, ON M5A 3C4</span>
        </div>
      </div>
      <p className="ft-copy">© 2026 ÉLARA Wellness</p>
      <p className="ft-credit">Conçu par Aya El Hadouti - SEG3525 Devoir 2</p>
    </footer>
  );
}