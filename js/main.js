// ========== Mobile nav toggle ==========
const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Close nav on link click (mobile)
document.querySelectorAll('.site-nav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (nav && nav.classList.contains('open')) {
      nav.classList.remove('open');
      navToggle && navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// ========== Active link highlight ==========
const here = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(a => {
  const target = a.getAttribute('href');
  if ((here === '' && target === 'index.html') || here === target) {
    a.classList.add('active');
  }
});

// ========== Theme toggle (persisted) ==========
const root = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');

function applyTheme(t) {
  root.setAttribute('data-theme', t);
  if (themeBtn) themeBtn.setAttribute('aria-pressed', String(t === 'dark'));
}
const saved = localStorage.getItem('theme');
applyTheme(saved || 'light');

themeBtn?.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

// ========== Reveal on scroll ==========
const toReveal = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  toReveal.forEach(el => io.observe(el));
} else {
  // Fallback if IO isn't supported
  toReveal.forEach(el => el.classList.add('in-view'));
}

// ========== Footer year ==========
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();

// ========== Contact form validation & fake submit ==========
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

form?.addEventListener('submit', (e) => {
  if (!form.checkValidity()) {
    statusEl && (statusEl.textContent = '');
    return; // browser will show validation messages
  }
  e.preventDefault(); // simulate send
  statusEl && (statusEl.textContent = 'Sending…');
  setTimeout(() => {
    statusEl && (statusEl.textContent = '✅ Thanks! Your message was sent.');
    form.reset();
  }, 600);
});
