/* ================================================
   LITERARY FESTIVAL — JAVASCRIPT
   ================================================ */

// ─── 1. LANGUAGE TOGGLE ──────────────────────────
const langBtns = document.querySelectorAll('[data-lang-btn]');
const html      = document.documentElement;

// All elements that carry translations
const translatables = document.querySelectorAll(
  '[data-ka][data-en]:not([data-lang-btn])'
);

// Nav links carry translations too (data-ka / data-en set on them)
const navLinks = document.querySelectorAll('.main-nav a[data-ka]');

function setLanguage(lang) {
  html.setAttribute('data-lang', lang);
  html.setAttribute('lang', lang);

  // Update text content of all translated elements
  translatables.forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) el.textContent = text;
  });

  // Nav links
  navLinks.forEach(a => {
    const text = a.getAttribute(`data-${lang}`);
    if (text) a.textContent = text;
  });

  // Form placeholders (handled separately)
  const fname   = document.getElementById('f-name');
  const femail  = document.getElementById('f-email');
  const fmsg    = document.getElementById('f-msg');
  const sendBtn = document.getElementById('send-btn');

  if (lang === 'ka') {
    fname  && (fname.placeholder  = 'თქვენი სახელი');
    femail && (femail.placeholder = 'mail@example.com');
    fmsg   && (fmsg.placeholder   = 'თქვენი შეტყობინება...');
    sendBtn && (sendBtn.textContent = 'გაგზავნა');
  } else {
    fname  && (fname.placeholder  = 'Your name');
    femail && (femail.placeholder = 'mail@example.com');
    fmsg   && (fmsg.placeholder   = 'Your message...');
    sendBtn && (sendBtn.textContent = 'Send');
  }

  // Toggle active button style
  langBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang-btn') === lang);
  });
}

langBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    setLanguage(btn.getAttribute('data-lang-btn'));
  });
});

// ─── 2. SCROLL REVEAL ─────────────────────────────
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children cards inside a grid
        const delay = entry.target.closest('.events-grid, .gallery-grid')
          ? Array.from(entry.target.parentNode.children).indexOf(entry.target) * 80
          : 0;

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

reveals.forEach(el => revealObserver.observe(el));

// ─── 3. STICKY HEADER COLOUR SHIFT ───────────────
const siteHeader = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    siteHeader.style.background = 'rgba(20, 15, 10, 0.97)';
  } else {
    siteHeader.style.background = 'rgba(28, 24, 20, 0.92)';
  }
});

// ─── 4. SMOOTH SCROLL (nav links) ─────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80; // header height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ─── 5. GALLERY LIGHTBOX ──────────────────────────
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(item) {
  const src = item.querySelector('img').src;
  lightboxImg.src = src;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxImg.src = '';
  document.body.style.overflow = '';
}

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// Expose to HTML onclick attributes
window.openLightbox  = openLightbox;
window.closeLightbox = closeLightbox;

// ─── 6. CONTACT FORM ──────────────────────────────
const sendBtn    = document.getElementById('send-btn');
const formSuccess = document.getElementById('form-success');

sendBtn && sendBtn.addEventListener('click', () => {
  const name  = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const msg   = document.getElementById('f-msg').value.trim();
  const lang  = html.getAttribute('data-lang');

  if (!name || !email || !msg) {
    const alert = lang === 'ka'
      ? 'გთხოვთ შეავსოთ ყველა ველი.'
      : 'Please fill in all fields.';
    window.alert(alert);
    return;
  }

  // Simulate send
  sendBtn.disabled = true;
  sendBtn.style.opacity = '0.6';
  sendBtn.textContent = lang === 'ka' ? 'იგზავნება...' : 'Sending...';

  setTimeout(() => {
    document.getElementById('f-name').value  = '';
    document.getElementById('f-email').value = '';
    document.getElementById('f-msg').value   = '';
    sendBtn.style.display = 'none';
    formSuccess.classList.remove('hidden');

    // Reset after 4s
    setTimeout(() => {
      sendBtn.style.display   = '';
      sendBtn.style.opacity   = '1';
      sendBtn.disabled        = false;
      sendBtn.textContent     = lang === 'ka' ? 'გაგზავნა' : 'Send';
      formSuccess.classList.add('hidden');
    }, 4000);
  }, 1200);
});

// ─── 7. HERO PARALLAX (subtle) ────────────────────
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  if (!heroBg) return;
  const y = window.scrollY * 0.3;
  heroBg.style.transform = `translateY(${y}px)`;
});

// ─── INIT ─────────────────────────────────────────
// Start in Georgian
setLanguage('ka');