/* =============================================
   TARA KAPE CALAMBA — Main JavaScript
   ============================================= */

/* ── Sticky Header ── */
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── Mobile Hamburger ── */
const hamburger = document.getElementById('hamburger');
const mainNav   = document.getElementById('main-nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mainNav.classList.toggle('open');
});

// Close nav on link click
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mainNav.classList.remove('open');
  });
});

/* ── Menu Tabs ── */
const tabBtns   = document.querySelectorAll('.tab-btn');
const menuItems = document.querySelectorAll('.menu-item, .menu-subsection');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.dataset.tab;
    menuItems.forEach(item => {
      if (item.dataset.cat === cat) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

/* ── Cart Toast ── */
const toast       = document.getElementById('cart-toast');
const toastMsg    = document.getElementById('toast-message');
let toastTimer;

document.querySelectorAll('.btn-add').forEach(btn => {
  btn.addEventListener('click', () => {
    const card  = btn.closest('.menu-item');
    const name  = card.querySelector('h4').textContent;
    toastMsg.textContent = `"${name}" added to order!`;

    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  });
});

/* ── Newsletter Form ── */
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    if (input.value.trim()) {
      toastMsg.textContent = 'Subscribed! Thanks for joining us.';
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
      input.value = '';
    }
  });
}

/* ── Scroll Reveal ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity    = '1';
      entry.target.style.transform  = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

const revealTargets = document.querySelectorAll(
  '.feature-card, .menu-item, .testimonial-card, .about-text, .about-visual, .loc-item'
);
revealTargets.forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  revealObserver.observe(el);
});

/* ── Active Nav Link Highlight ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.main-nav ul li a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.background = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.background = 'rgba(255,255,255,0.18)';
    }
  });
});
