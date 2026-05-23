/* ──  Aya El Hadouti -  Portfolio - Devoir 1 - SEG3525 ── */

/* ── Dark Mode ── */
const darkBtn  = document.getElementById('darkBtn');
const darkIcon = document.getElementById('darkIcon');

function setDark(on) {
  document.body.classList.toggle('dark', on);
  darkIcon.className = on ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
  localStorage.setItem('darkMode', on ? '1' : '0');
}

darkBtn.addEventListener('click', () => setDark(!document.body.classList.contains('dark')));
if (localStorage.getItem('darkMode') === '1') setDark(true);


/* ── Language Toggle ── */
const langBtn = document.getElementById('langBtn');
let currentLang = localStorage.getItem('lang') || 'en';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  langBtn.textContent = lang === 'en' ? 'FR' : 'EN';
  document.documentElement.lang = lang === 'en' ? 'en' : 'fr';

  document.querySelectorAll('[data-en]').forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (val !== null) el.innerHTML = val;
  });

  document.querySelectorAll('[data-en-placeholder]').forEach(el => {
    el.placeholder = el.getAttribute('data-' + lang + '-placeholder') || el.placeholder;
  });
}

langBtn.addEventListener('click', () => applyLang(currentLang === 'en' ? 'fr' : 'en'));
if (currentLang === 'fr') applyLang('fr');


/* ── Mobile Navbar ── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});


/* ── Skill Accord ── */
window.toggleSkill = function(header) {
  header.closest('.skill-group').classList.toggle('open');
};


/* ── Qualifications Tabs ── */
window.switchTab = function(id, el) {
  document.querySelectorAll('.tl-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tl-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  el.classList.add('active');
};


/* ── Scroll Reveal ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ── Active Nav Link ── */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 80) current = s.id; });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});