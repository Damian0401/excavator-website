'use strict';

/* ==========================================================
   HEADER – shadow on scroll
   ========================================================== */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 20);
}, { passive: true });

/* ==========================================================
   HERO – subtle zoom-in on load
   ========================================================== */
const hero = document.getElementById('hero');
if (hero) requestAnimationFrame(() => hero.classList.add('loaded'));

/* ==========================================================
   MOBILE NAV
   ========================================================== */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

function closeNav() {
  navMenu.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Otwórz menu nawigacji');
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Zamknij menu nawigacji' : 'Otwórz menu nawigacji');
  document.body.style.overflow = open ? 'hidden' : '';
});

navMenu.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', closeNav);
});

document.addEventListener('click', e => {
  if (!header.contains(e.target)) closeNav();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeNav();
});

/* ==========================================================
   ACTIVE NAV LINK – highlight current section
   ========================================================== */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link[data-section]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link =>
        link.classList.toggle('active', link.dataset.section === entry.target.id)
      );
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

sections.forEach(s => sectionObserver.observe(s));

/* ==========================================================
   SCROLL ANIMATIONS – fade-up on enter viewport
   ========================================================== */
const animatedEls = document.querySelectorAll('.animate-fade-up');

// Hero elements animate immediately on load
document.querySelectorAll('.hero .animate-fade-up').forEach(el => {
  el.classList.add('is-visible');
});

const animObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

animatedEls.forEach(el => {
  if (!el.closest('.hero')) animObserver.observe(el);
});

/* ==========================================================
   BACK TO TOP
   ========================================================== */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('is-visible', window.scrollY > 500);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ==========================================================
   FOOTER – current year
   ========================================================== */
const yearEl = document.getElementById('currentYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();
