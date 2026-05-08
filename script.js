// ===== PRELOADER =====
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 1200);
  }
});

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

// ===== PARTICLE BACKGROUND =====
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  const PARTICLE_COUNT = 50;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 2 + 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(26, 115, 232, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(26, 115, 232, ${0.08 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animate);
  }
  animate();
})();

// ===== COUNTDOWN TIMER (May 10, 2026 7:00 PM PKT) =====
(function initCountdown() {
  // May 10, 2026 at 7:00 PM PKT (UTC+5) = 14:00 UTC
  const endDate = new Date('2026-05-10T19:00:00+05:00');

  function update() {
    const now = new Date();
    const diff = endDate - now;
    
    const pad = n => String(n).padStart(2, '0');
    const el = (id) => document.getElementById(id);

    if (diff <= 0) {
      ['cdDays','cdHours','cdMins','cdSecs','popDays','popHours','popMins','popSecs'].forEach(id => {
        if (el(id)) el(id).textContent = '00';
      });
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    // Update hero countdown
    if (el('cdDays')) el('cdDays').textContent = pad(days);
    if (el('cdHours')) el('cdHours').textContent = pad(hours);
    if (el('cdMins')) el('cdMins').textContent = pad(mins);
    if (el('cdSecs')) el('cdSecs').textContent = pad(secs);

    // Update popup countdown
    if (el('popDays')) el('popDays').textContent = pad(days);
    if (el('popHours')) el('popHours').textContent = pad(hours);
    if (el('popMins')) el('popMins').textContent = pad(mins);
    if (el('popSecs')) el('popSecs').textContent = pad(secs);
  }

  update();
  setInterval(update, 1000);
})();

// ===== URGENCY POPUP =====
(function initUrgencyPopup() {
  const overlay = document.getElementById('urgencyOverlay');
  const closeBtn = document.getElementById('urgencyClose');
  if (!overlay || !closeBtn) return;

  // Show popup 2 seconds after page loads
  setTimeout(() => {
    overlay.classList.add('active');
  }, 2000);

  // Close popup on X button
  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
  });

  // Close on overlay click (outside popup)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      overlay.classList.remove('active');
    }
  });
})();

// ===== SCROLL PROGRESS BAR =====
(function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = (scrollTop / docHeight) * 100;
    bar.style.width = percent + '%';
  });
})();

// ===== BACK TO TOP BUTTON =====
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ===== TEXT TYPING EFFECT ON HERO BADGE =====
(function initTyping() {
  const badge = document.querySelector('.hero-badge');
  if (!badge) return;
  const text = badge.textContent;
  badge.textContent = '';
  badge.style.visibility = 'visible';
  let i = 0;
  function type() {
    if (i < text.length) {
      badge.textContent += text.charAt(i);
      i++;
      setTimeout(type, 40);
    }
  }
  setTimeout(type, 1500);
})();
