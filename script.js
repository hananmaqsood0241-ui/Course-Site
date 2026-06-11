// ===== PRELOADER =====
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('hidden');
  }
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
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
}

// ===== ACTIVE NAV LINK HIGHLIGHT (Multi-page) =====
(function highlightActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-links a');

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http') && !link.classList.contains('nav-cta')) {
      if (href === currentPage) {
        link.classList.add('active');
      }
    }
  });
})();

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

if (stats.length > 0) {
  let hasCounted = false;

  function countUp(el) {
    const target = parseFloat(el.getAttribute('data-target'));
    const isFloat = target % 1 !== 0;
    let count = 0;
    const speed = 60;
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
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== TOP BANNER =====
const topBannerClose = document.getElementById('topBannerClose');
const topBanner = document.getElementById('topBanner');

if (topBannerClose && topBanner) {
  topBannerClose.addEventListener('click', () => {
    topBanner.classList.add('hidden');
    document.body.classList.remove('has-banner');
  });
}

// ===== EID TIMER =====
(function initEidTimer() {
  const timerElement = document.getElementById('eidTimer');
  if (!timerElement) return;

  // June 5th, 2026
  const targetDate = new Date('June 5, 2026 23:59:59').getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      timerElement.innerHTML = "EXPIRED";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
})();

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
  if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  const PARTICLE_COUNT = window.innerWidth < 768 ? 18 : 36;

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

  let observerActive = true;
  const particleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      observerActive = entry.isIntersecting;
    });
  });
  particleObserver.observe(canvas);

  function animate() {
    if (!observerActive || document.hidden) {
      requestAnimationFrame(animate);
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animate);
  }
  animate();
})();

// ===== SMART CONVERSION URGENCY POPUP (Scroll & Exit Intent) =====
(function initUrgencyPopup() {
  const overlay = document.getElementById('urgencyOverlay');
  const closeBtn = document.getElementById('urgencyClose');
  if (!overlay || !closeBtn) return;
  const storageKey = 'hananEnrollmentPopupJune15Seen';

  function triggerPopup() {
    if (!sessionStorage.getItem(storageKey)) {
      overlay.classList.add('active');
      sessionStorage.setItem(storageKey, 'true');
    }
  }

  // Close popup
  closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('active'); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') overlay.classList.remove('active'); });

  // Trigger popup shortly after page load
  setTimeout(triggerPopup, 1000);

  // 1. Scroll depth trigger (50%)
  window.addEventListener('scroll', function scrollTrigger() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0 && (scrollTop / docHeight) >= 0.5) {
      triggerPopup();
      window.removeEventListener('scroll', scrollTrigger);
    }
  });

  // 2. Exit Intent trigger
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 20) {
      triggerPopup();
    }
  });
})();

// ===== PREMIUM 3D TILT =====
(function initTiltCards() {
  if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateY(${x * 10 - 10}deg) rotateX(${-y * 8 + 6}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
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

// ===== INTERACTIVE PRICING TOGGLE SWITCHER =====
(function initPricingSwitcher() {
  const pricingSwitch = document.getElementById('pricingSwitch');
  const labelPKR = document.getElementById('labelPKR');
  const labelUSD = document.getElementById('labelUSD');
  
  const priceCurrency = document.getElementById('priceCurrency');
  const priceValue = document.getElementById('priceValue');
  const pricePeriod = document.getElementById('pricePeriod');
  const modalPriceText = document.getElementById('modalPriceText');

  if (!pricingSwitch) return;

  let currentCurrency = 'PKR';

  function updatePricing() {
    if (currentCurrency === 'PKR') {
      pricingSwitch.classList.remove('active');
      labelPKR.classList.add('active');
      labelUSD.classList.remove('active');
      
      priceCurrency.innerText = 'Rs.';
      priceValue.innerText = '10,000';
      pricePeriod.innerText = 'PKR / one-time';
      if (modalPriceText) modalPriceText.innerText = 'Rs. 10,000 PKR';
    } else {
      pricingSwitch.classList.add('active');
      labelPKR.classList.remove('active');
      labelUSD.classList.add('active');
      
      priceCurrency.innerText = '$';
      priceValue.innerText = '50';
      pricePeriod.innerText = 'USD / one-time';
      if (modalPriceText) modalPriceText.innerText = '$50 USD';
    }

    // Add scale/fade pop animation for values
    const amountEl = document.getElementById('pricingAmount');
    if (amountEl) {
      amountEl.style.transform = 'scale(0.95)';
      amountEl.style.opacity = '0.5';
      setTimeout(() => {
        amountEl.style.transform = 'scale(1)';
        amountEl.style.opacity = '1';
        amountEl.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s';
      }, 50);
    }
  }

  pricingSwitch.addEventListener('click', () => {
    currentCurrency = currentCurrency === 'PKR' ? 'USD' : 'PKR';
    updatePricing();
  });

  labelPKR.addEventListener('click', () => {
    currentCurrency = 'PKR';
    updatePricing();
  });

  labelUSD.addEventListener('click', () => {
    currentCurrency = 'USD';
    updatePricing();
  });
})();

// ===== DRAGGABLE / TOUCH TESTIMONIAL CAROUSEL =====
(function initTestimonialsCarousel() {
  const track = document.getElementById('testimonialsTrack');
  if (!track) return;
  const cards = track.querySelectorAll('.testimonial-card');
  if (cards.length === 0) return;

  let dotsContainer = null;
  let activeIndex = 0;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let isDragging = false;
  let autoplayInterval = null;

  function getCardsPerView() {
    return window.innerWidth <= 768 ? 1 : 2;
  }

  function setupCarousel() {
    const cardsPerView = getCardsPerView();
    const totalSlides = Math.ceil(cards.length / cardsPerView);

    // Style slides dynamically for swipe behavior
    track.style.display = 'flex';
    track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    track.style.gap = '24px';
    
    // Ensure parent hides overflow
    track.parentNode.style.overflow = 'hidden';
    track.parentNode.style.padding = '10px 0';

    cards.forEach(card => {
      // Calculate width accounting for gap: (100% - totalGap) / cardsPerView
      const gapOffset = (cardsPerView - 1) * 24 / cardsPerView;
      card.style.flex = `0 0 calc((100% / ${cardsPerView}) - ${gapOffset}px)`;
      card.style.maxWidth = `calc((100% / ${cardsPerView}) - ${gapOffset}px)`;
    });

    // Create dots indicators if they don't exist
    if (!dotsContainer) {
      dotsContainer = document.createElement('div');
      dotsContainer.className = 'carousel-dots';
      dotsContainer.style.display = 'flex';
      dotsContainer.style.justifyContent = 'center';
      dotsContainer.style.gap = '8px';
      dotsContainer.style.marginTop = '32px';

      track.parentNode.appendChild(dotsContainer);

      // Inject dynamic style for dot indicators if not present in style.css
      if (!document.getElementById('carousel-dots-style')) {
        const style = document.createElement('style');
        style.id = 'carousel-dots-style';
        style.innerHTML = `
          .carousel-dot {
            width: 8px; height: 8px; border-radius: 50%; border: none; background: #CBD5E1; cursor: pointer; transition: 0.3s; padding: 0;
          }
          .carousel-dot.active {
            background: #1A73E8; width: 24px; border-radius: 4px;
          }
        `;
        document.head.appendChild(style);
      }
    }

    // Refresh dots
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
      dot.ariaLabel = `Go to slide ${i + 1}`;
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
    
    if (activeIndex >= totalSlides) activeIndex = totalSlides - 1;
    
    goToSlide(activeIndex);
    startAutoplay();
  }

  function goToSlide(index) {
    const cardsPerView = getCardsPerView();
    const totalSlides = Math.ceil(cards.length / cardsPerView);
    
    activeIndex = (index + totalSlides) % totalSlides;
    
    // Calculate translate taking gap into account
    const cardWidth = track.firstElementChild.getBoundingClientRect().width;
    const scrollAmount = activeIndex * cardsPerView * (cardWidth + 24);
    
    currentTranslate = -scrollAmount;
    prevTranslate = currentTranslate;
    track.style.transform = `translateX(${currentTranslate}px)`;

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, idx) => {
        if (idx === activeIndex) dot.classList.add('active');
        else dot.classList.remove('active');
      });
    }
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(() => {
      goToSlide(activeIndex + 1);
    }, 4000);
  }

  function stopAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
  }

  // Gesture hooks
  track.addEventListener('touchstart', touchStart, {passive: true});
  track.addEventListener('touchend', touchEnd);
  track.addEventListener('touchmove', touchMove, {passive: true});
  track.addEventListener('mousedown', touchStart);
  track.addEventListener('mouseup', touchEnd);
  track.addEventListener('mouseleave', touchEnd);
  track.addEventListener('mousemove', touchMove);

  function touchStart(e) {
    stopAutoplay();
    isDragging = true;
    startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    track.style.transition = 'none';
  }

  function touchMove(e) {
    if (!isDragging) return;
    const currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const diff = currentX - startX;
    currentTranslate = prevTranslate + diff;
    track.style.transform = `translateX(${currentTranslate}px)`;
  }

  function touchEnd() {
    if (!isDragging) return;
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;
    track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';

    if (movedBy < -50) {
      goToSlide(activeIndex + 1);
    } else if (movedBy > 50) {
      goToSlide(activeIndex - 1);
    } else {
      goToSlide(activeIndex);
    }
    startAutoplay();
  }

  setupCarousel();
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setupCarousel, 250);
  });
})();

// ===== PREMIUM ON-SITE CHECKOUT / ENROLLMENT FLOW =====
(function initCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  const step1 = document.getElementById('checkoutStep1');
  const step2 = document.getElementById('checkoutStep2');
  const indicator1 = document.getElementById('stepIndicator1');
  const indicator2 = document.getElementById('stepIndicator2');
  const progressLine = document.querySelector('.progress-line');

  const form1 = document.getElementById('checkoutForm1');
  const nameInput = document.getElementById('studentName');
  const phoneInput = document.getElementById('studentPhone');
  const nameError = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');

  const btnBack = document.getElementById('checkoutBack');
  const btnSubmit = document.getElementById('checkoutSubmit');
  const closeBtn = document.getElementById('checkoutClose');

  const tabNayaPay = document.getElementById('tabNayaPay');
  const tabBank = document.getElementById('tabBank');
  const contentNayaPay = document.getElementById('contentNayaPay');
  const contentBank = document.getElementById('contentBank');

  if (!modal) return;

  let formData = { name: '', phone: '' };

  // Setup copyable triggers
  document.querySelectorAll('.copyable').forEach(el => {
    el.addEventListener('click', () => {
      const text = el.getAttribute('data-copy');
      navigator.clipboard.writeText(text).then(() => {
        const originalHtml = el.innerHTML;
        el.innerHTML = 'Copied! <i class="fas fa-check" style="color: #32d583;"></i>';
        setTimeout(() => {
          el.innerHTML = originalHtml;
        }, 1500);
      });
    });
  });

  // Tab switching
  if (tabNayaPay && tabBank) {
    tabNayaPay.addEventListener('click', () => {
      tabNayaPay.classList.add('active');
      tabBank.classList.remove('active');
      contentNayaPay.classList.add('active');
      contentBank.classList.remove('active');
    });

    tabBank.addEventListener('click', () => {
      tabBank.classList.add('active');
      tabNayaPay.classList.remove('active');
      contentBank.classList.add('active');
      contentNayaPay.classList.remove('active');
    });
  }

  // Trigger modal open
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.trigger-checkout, .nav-cta, .hero-cta, .urgency-cta, .pricing-cta');
    if (trigger) {
      e.preventDefault();
      // Ensure target attribute doesn't cause page escape
      openModal();
    }
  });

  function openModal() {
    modal.classList.add('active');
    resetModal();
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  function resetModal() {
    step1.classList.add('active');
    step2.classList.remove('active');
    indicator1.classList.add('active');
    indicator2.classList.remove('active');
    if (progressLine) progressLine.classList.remove('active');
    
    if (form1) form1.reset();
    if (nameError) nameError.innerText = '';
    if (phoneError) phoneError.innerText = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // Handle Form 1 navigation
  if (form1) {
    form1.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      if (nameInput.value.trim().length < 3) {
        nameError.innerText = 'Please enter your full name (at least 3 characters)';
        valid = false;
      } else {
        nameError.innerText = '';
      }

      const phonePattern = /^[0-9+\-\s()]{8,18}$/;
      if (!phonePattern.test(phoneInput.value.trim())) {
        phoneError.innerText = 'Please enter a valid WhatsApp phone number';
        valid = false;
      } else {
        phoneError.innerText = '';
      }

      if (valid) {
        formData.name = nameInput.value.trim();
        formData.phone = phoneInput.value.trim();

        // Switch screen to step 2
        step1.classList.remove('active');
        step2.classList.add('active');
        indicator2.classList.add('active');
        if (progressLine) progressLine.classList.add('active');
      }
    });
  }

  // Handle back button on step 2
  if (btnBack) {
    btnBack.addEventListener('click', () => {
      step2.classList.remove('active');
      step1.classList.add('active');
      indicator2.classList.remove('active');
      if (progressLine) progressLine.classList.remove('active');
    });
  }

  // Form Submission -> WhatsApp redirect
  if (btnSubmit) {
    btnSubmit.addEventListener('click', () => {
      // Determine what pricing value they saw
      let priceText = 'Rs. 10,000';
      const pricingSwitch = document.getElementById('pricingSwitch');
      if (pricingSwitch && pricingSwitch.classList.contains('active')) {
        priceText = '$50 USD';
      }

      const rawMsg = `Hi Hanan, I have transferred the fees of ${priceText} for the Email Marketing & Freelancing Course. Here are my details:\n\n- Name: ${formData.name}\n- WhatsApp: ${formData.phone}\n\nPlease confirm my enrollment and share the schedule!`;
      const encodedMsg = encodeURIComponent(rawMsg);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=923443069241&text=${encodedMsg}`;

      // Open in new window/tab
      window.open(whatsappUrl, '_blank');
      closeModal();
    });
  }
})();
