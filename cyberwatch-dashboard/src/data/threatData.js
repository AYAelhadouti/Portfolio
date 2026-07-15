// ============================================================
// DATA — Synthetic cybersecurity threat intelligence data
// NOTE: All data is synthetic, generated for SEG3525 Devoir 5.
// ============================================================

export const BASE = {
  critIncidents:   1247,
  alertsProcessed: 38492,
  detected: [142,189,203,178,215,267,312,289,245,198,176,234,291,318,276,243,267,289,312,298,245,267,289,312],
  blocked:  [118,156,179,151,188,231,278,254,212,168,147,201,258,284,243,208,234,252,278,265,212,234,251,278],
};

export const REGIONS = {
  all:  { label_en: 'All Regions',      label_fr: 'Toutes les régions',    multiplier: 1.00 },
  na:   { label_en: 'North America',    label_fr: 'Amérique du Nord',      multiplier: 0.42 },
  eu:   { label_en: 'Europe',           label_fr: 'Europe',                multiplier: 0.31 },
  apac: { label_en: 'Asia-Pacific',     label_fr: 'Asie-Pacifique',        multiplier: 0.19 },
  other:{ label_en: 'Other',            label_fr: 'Autres',                multiplier: 0.08 },
};

export const TIME_MULTIPLIERS = {
  '24h': 0.08,
  '7d':  0.48,
  '30d': 1.00,
  'mtd': 0.72,
};

export const HOURS = ['00','01','02','03','04','05','06','07','08','09','10','11',
                      '12','13','14','15','16','17','18','19','20','21','22','23'];

export const THREAT_FEED_EN = [
  { s: 'CR', cls: 'cr', t: 'Emotet campaign targeting EU financial sector — 2,400 new IOCs added' },
  { s: 'HI', cls: 'hi', t: 'LockBit 3.0 variant detected — new encryption schema observed' },
  { s: 'MD', cls: 'md', t: 'Phishing kit mimicking Microsoft 365 circulating on dark web forums' },
  { s: 'CR', cls: 'cr', t: 'Zero-day in Apache Struts actively exploited — patch immediately' },
  { s: 'LO', cls: 'lo', t: 'CISA adds 4 new CVEs to Known Exploited Vulnerabilities catalog' },
  { s: 'HI', cls: 'hi', t: 'North Korean APT38 infrastructure identified — 14 C2 nodes blocked' },
  { s: 'MD', cls: 'md', t: 'Credential stuffing surge — 8.3M combo list posted on breach forum' },
  { s: 'CR', cls: 'cr', t: 'Supply chain attack via npm package — remove immediately' },
];

export const THREAT_FEED_FR = [
  { s: 'CR', cls: 'cr', t: 'Campagne Emotet ciblant le secteur financier EU — 2 400 nouveaux IOC' },
  { s: 'EL', cls: 'hi', t: 'Variante LockBit 3.0 détectée — nouveau schéma de chiffrement' },
  { s: 'MY', cls: 'md', t: 'Kit hameçonnage imitant Microsoft 365 en circulation sur le dark web' },
  { s: 'CR', cls: 'cr', t: 'Zero-day Apache Struts activement exploité — appliquer le correctif' },
  { s: 'FA', cls: 'lo', t: 'CISA ajoute 4 nouveaux CVE au catalogue des vulnérabilités exploitées' },
  { s: 'EL', cls: 'hi', t: 'Infrastructure APT38 nord-coréen identifiée — 14 noeuds C2 bloqués' },
  { s: 'MY', cls: 'md', t: 'Pic credential stuffing — liste 8,3M comptes sur un forum de fuite' },
  { s: 'CR', cls: 'cr', t: 'Attaque chaîne approvisionnement via npm — supprimer immédiatement' },
];

export const GLOBE_CITIES = [
  { city:'New York',    country:'United States', lat: 40.71, lng: -74.01, score: 87, level: 'HIGH',     color: '#FF3355' },
  { city:'London',      country:'United Kingdom',lat: 51.51, lng: -0.13,  score: 72, level: 'HIGH',     color: '#FF3355' },
  { city:'Beijing',     country:'China',         lat: 39.90, lng: 116.41, score: 95, level: 'CRITICAL', color: '#dc267f' },
  { city:'Moscow',      country:'Russia',        lat: 55.75, lng: 37.62,  score: 91, level: 'CRITICAL', color: '#dc267f' },
  { city:'São Paulo',   country:'Brazil',        lat:-23.55, lng: -46.63, score: 53, level: 'MEDIUM',   color: '#FFB800' },
  { city:'Tokyo',       country:'Japan',         lat: 35.69, lng: 139.69, score: 61, level: 'MEDIUM',   color: '#FFB800' },
  { city:'Sydney',      country:'Australia',     lat:-33.87, lng: 151.21, score: 38, level: 'LOW',      color: '#00FF99' },
  { city:'Mumbai',      country:'India',         lat: 19.08, lng: 72.88,  score: 77, level: 'HIGH',     color: '#FF3355' },
  { city:'Frankfurt',   country:'Germany',       lat: 50.11, lng:  8.68,  score: 45, level: 'MEDIUM',   color: '#FFB800' },
  { city:'Toronto',     country:'Canada',        lat: 43.65, lng: -79.38, score: 42, level: 'LOW',      color: '#00FF99' },
];