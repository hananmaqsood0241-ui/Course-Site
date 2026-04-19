// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// ===== SCROLL-TRIGGERED FADE-IN ANIMATIONS =====
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -60px 0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in, .slide-in-left, .flip-in-bottom, .zoom-in, .slide-in-right').forEach(el => {
  observer.observe(el);
});

// ===== STATS COUNT UP ANIMATION =====
const stats = document.querySelectorAll('.stat-number');
let hasCounted = false;

function countUp(el) {
  const target = parseFloat(el.getAttribute('data-target'));
  const isFloat = target % 1 !== 0;
  let count = 0;
  const speed = 60; // frames
  const inc = target / speed;

  function updateCount() {
    count += inc;
    if (count < target) {
      el.innerText = isFloat ? count.toFixed(1) : Math.floor(count);
      requestAnimationFrame(updateCount);
    } else {
      el.innerText = target;
    }
  }
  updateCount();
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !hasCounted) {
      hasCounted = true;
      stats.forEach(stat => countUp(stat));
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  statsObserver.observe(heroStats);
}

// ===== CUSTOM CURSOR =====
const cursorDot = document.createElement('div');
cursorDot.classList.add('cursor-dot');
document.body.appendChild(cursorDot);

const cursorTrailer = document.createElement('div');
cursorTrailer.classList.add('cursor-trailer');
document.body.appendChild(cursorTrailer);

let mouseX = 0, mouseY = 0, trailerX = 0, trailerY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
});

function animateTrailer() {
  let dx = mouseX - trailerX;
  let dy = mouseY - trailerY;
  trailerX += dx * 0.15;
  trailerY += dy * 0.15;
  cursorTrailer.style.transform = `translate(calc(${trailerX}px - 50%), calc(${trailerY}px - 50%))`;
  requestAnimationFrame(animateTrailer);
}
animateTrailer();

const interactables = document.querySelectorAll('a, button, input, textarea, .faq-question');
interactables.forEach(el => {
  el.addEventListener('mouseenter', () => {
    document.body.classList.add('cursor-hover');
  });
  el.addEventListener('mouseleave', () => {
    document.body.classList.remove('cursor-hover');
  });
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== ACTIVE NAV LINK HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (link && !link.classList.contains('nav-cta')) {
      if (scrollPos >= top && scrollPos < top + height) {
        link.style.color = 'var(--blue-500)';
        link.style.background = 'var(--blue-50)';
      } else {
        link.style.color = '';
        link.style.background = '';
      }
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// ===== TOP BANNER =====
const topBannerClose = document.getElementById('topBannerClose');
const topBanner = document.getElementById('topBanner');

if (topBannerClose && topBanner) {
  topBannerClose.addEventListener('click', () => {
    topBanner.classList.add('hidden');
    document.body.classList.remove('has-banner');
  });
}

// ===== FAQ ACCORDION =====
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentElement;
    const answer = question.nextElementSibling;
    const isActive = item.classList.contains('active');

    // Close all other FAQs
    document.querySelectorAll('.faq-item').forEach(otherItem => {
      otherItem.classList.remove('active');
      otherItem.querySelector('.faq-answer').style.maxHeight = null;
    });

    if (!isActive) {
      item.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});
