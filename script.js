// ========================
// Scroll progress bar
// ========================
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = max > 0 ? (window.scrollY / max * 100) + '%' : '0%';
}, { passive: true });

// ========================
// Header: add .scrolled on scroll
// ========================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ========================
// Mobile hamburger menu
// ========================
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

mobileMenu.querySelectorAll('.nav-mobile-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('click', (e) => {
  if (!header.contains(e.target)) closeMenu();
});

// ========================
// Scroll reveal with stagger
// ========================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const el = entry.target;

    // If the element has stagger children (bento/skills), stagger them
    const children = el.querySelectorAll('.stat-box, .skill-card');
    if (children.length > 0) {
      el.classList.add('visible');
      children.forEach((child, i) => {
        setTimeout(() => {
          child.style.transitionDelay = '0s';
          child.style.opacity = '1';
          child.style.transform = 'translateY(0)';
        }, i * 55);
      });
    } else {
      el.classList.add('visible');
    }

    revealObserver.unobserve(el);
  });
}, { threshold: 0.06 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ========================
// Active nav link on scroll
// ========================
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.getAttribute('id');
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  });
}, { threshold: 0.3 });

sections.forEach(s => sectionObserver.observe(s));

// ========================
// Testimonials swipe dots
// ========================
const testimonialsTrack = document.getElementById('testimonialsTrack');
const testimonialsDots  = document.querySelectorAll('#testimonialsDots .dot');

if (testimonialsTrack && testimonialsDots.length) {
  testimonialsTrack.addEventListener('scroll', () => {
    const card      = testimonialsTrack.querySelector('.testimonial-card');
    const cardWidth = card.offsetWidth + 14; // 14 = gap
    const index     = Math.min(
      Math.round(testimonialsTrack.scrollLeft / cardWidth),
      testimonialsDots.length - 1
    );
    testimonialsDots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }, { passive: true });
}

// ========================
// Stat counter animation
// ========================
function animateCount(el) {
  const raw   = el.textContent.trim();
  const match = raw.match(/^([\d.]+)(.*)$/);
  if (!match) return;

  const end    = parseFloat(match[1]);
  const suffix = match[2];          // e.g. "M", "K", "%", ""
  const dur    = 1400;
  const steps  = 60;
  let   step   = 0;

  const timer = setInterval(() => {
    step++;
    const progress = step / steps;
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current  = end * eased;

    // Format based on size
    const formatted = end >= 10 ? Math.round(current) : current.toFixed(1);
    el.textContent = formatted + suffix;

    if (step >= steps) {
      el.textContent = raw; // restore exact original
      clearInterval(timer);
    }
  }, dur / steps);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.stat-val').forEach(animateCount);
    counterObserver.unobserve(entry.target);
  });
}, { threshold: 0.2 });

document.querySelectorAll('.bento-grid').forEach(g => counterObserver.observe(g));
