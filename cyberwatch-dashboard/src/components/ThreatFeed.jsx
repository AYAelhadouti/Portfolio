import { useEffect, useRef } from 'react';
import { THREAT_FEED_EN, THREAT_FEED_FR } from '../data/threatData';
import { T } from '../i18n/translations';

export default function ThreatFeed({ lang }) {
  const trackRef = useRef(null);
  const t = T[lang];
  const items = lang === 'fr' ? THREAT_FEED_FR : THREAT_FEED_EN;
  const doubled = [...items, ...items];

  return (
    <div style={{ borderTop: '1px solid rgba(0,210,255,0.18)', padding: '4px 10px', background: 'rgba(0,0,0,0.3)', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.6rem', marginBottom: 3 }}>
        <span style={{ color: '#C8E8FF', fontWeight: 700, letterSpacing: '0.06em' }}>{t.tfLabel}</span>
        <span style={{ color: '#dc267f', fontWeight: 700, fontSize: '0.52rem', border: '1px solid #dc267f', padding: '1px 4px', borderRadius: 2 }}>{t.tfLive}</span>
      </div>
      <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div ref={trackRef} style={{ display: 'inline-block', animation: 'tfscroll 40s linear infinite' }}>
          {doubled.map((f, i) => (
            <span key={i} style={{ fontSize: '0.58rem', color: '#8BB8D4', marginRight: 32 }}>
              <span style={{
                color: f.cls === 'cr' ? '#dc267f' : f.cls === 'hi' ? '#FF3355' : f.cls === 'md' ? '#FFB800' : '#00FF99',
                fontWeight: 700,
                marginRight: 4,
              }}>[{f.s}]</span>
              {f.t}
              <span style={{ color: '#2A4A6A', marginLeft: 16 }}>///</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}