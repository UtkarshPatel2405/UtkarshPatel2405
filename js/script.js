const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

(() => {
  const btn = $('#menu-btn');
  const links = $('#nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });

  $$('#nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

(() => {
  const sections = $$('section[id], header[id]');
  const links = $$('.nav-links a');
  if (!sections.length || !links.length) return;

  const setActive = () => {
    const y = window.scrollY + 120;
    let active = '';
    sections.forEach(s => {
      if (y >= s.offsetTop) active = s.id;
    });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${active}`));
  };

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();

(() => {
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = $(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

(() => {
  const els = $$('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  els.forEach(el => observer.observe(el));
})();
