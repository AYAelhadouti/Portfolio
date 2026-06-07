import React from 'react';

const NAV_MAP = { p1: 'n1', p2: 'n3', p3: 'n3', p4: 'n3', p5: 'n2' };

export default function Nav({ page, go, reserver }) {
  const active = NAV_MAP[page];
  return (
    <nav className="nav">
      <span className="nav-logo" onClick={() => go('p1')}>ÉLARA</span>
      <ul className="nav-links">
        <li><a id="n1" className={active === 'n1' ? 'act' : ''} onClick={() => go('p1')}>Découverte</a></li>
        <li><a id="n2" className={active === 'n2' ? 'act' : ''} onClick={() => go('p5')}>Thérapeutes</a></li>
        <li><a id="n3" className={active === 'n3' ? 'act' : ''} onClick={() => go('p2')}>Services</a></li>
      </ul>
      <button className="nav-cta" onClick={() => reserver(null, null)}>RÉSERVER</button>
    </nav>
  );
}