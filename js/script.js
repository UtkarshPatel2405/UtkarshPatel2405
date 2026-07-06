// ===== UTILITIES =====
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ===== NAV HIDE ON SCROLL =====
(() => {
  const nav = $('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const cur = window.scrollY;
    if (cur > lastScroll && cur > 100) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }
    lastScroll = cur;
  }, { passive: true });
})();

// ===== MOBILE NAV TOGGLE =====
(() => {
  const toggle = $('.nav-toggle');
  const mobile = $('.nav-mobile');

  if (!toggle || !mobile) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    mobile.classList.toggle('open');
  });

  $$('.nav-mobile a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobile.classList.remove('open');
    });
  });
})();

// ===== ACTIVE NAV LINK =====
(() => {
  const navLinks = $$('nav a[href^="#"]');
  const sections = $$('section[id]');

  if (!navLinks.length || !sections.length) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;

    let current = '';
    sections.forEach(s => {
      if (scrollY >= s.offsetTop) current = s.id;
    });

    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });
})();

// ===== SCROLL REVEAL =====
(() => {
  const els = $$('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach(el => observer.observe(el));
})();

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
(() => {
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

// ===== CONTACT FORM =====
(() => {
  const form = $('#contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn');
    if (!btn) return;

    const origText = btn.innerHTML;
    btn.innerHTML = 'Sent!';
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.7';

    setTimeout(() => {
      btn.innerHTML = origText;
      btn.style.pointerEvents = '';
      btn.style.opacity = '1';
    }, 2500);

    form.reset();
  });
})();

// ===== PARALLAX FLOATING ICONS =====
(() => {
  const icons = $$('.float-icon');
  if (!icons.length) return;

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    icons.forEach((icon, i) => {
      const speed = 4 + i * 2;
      icon.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  }, { passive: true });
})();

// ===== LOG =====
console.log('%c Utkarsh Patel Portfolio ', 'background:#4ade80;color:#000;font-size:1rem;font-weight:bold;padding:8px 12px;border-radius:4px;');
console.log('%c Built with ❤️ for drug discovery ', 'color:#a0a0a0;font-size:0.85rem;');
