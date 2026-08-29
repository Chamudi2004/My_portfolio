// ==========================================
// Chamudi Disanayaka - Portfolio JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initMobileMenu();
  initAnchorNavigation();
  initScrollSpy();
  initProjectFilters();
  initCopyEmail();
  initScrollReveal();
  initBackToTop();
  initContactForm();
});

// ------------------------------------------
// 1. Dynamic Typewriter Effect for Hero
// ------------------------------------------
function initTypewriter() {
  const typewriterElement = document.getElementById('typewriter');
  if (!typewriterElement) return;

  const roles = [
    'Mobile (Flutter) App Developer',
    'Frontend Developer',
    'Data Analysis Enthusiast',
    'Cross-Platform Problem Solver'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 85;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 1800; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 350; // Pause before next word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// ------------------------------------------
// 2. Mobile Menu Toggle & Navigation
// ------------------------------------------
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');

  if (!menuToggle || !mobileMenu) return;

  menuToggle.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      menuIcon.classList.replace('fa-bars', 'fa-xmark');
    } else {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.replace('fa-xmark', 'fa-bars');
    }
  });

  // Close drawer on link click
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      if (menuIcon) menuIcon.classList.replace('fa-xmark', 'fa-bars');
    });
  });

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.add('hidden');
      if (menuIcon) menuIcon.classList.replace('fa-xmark', 'fa-bars');
    }
  });
}

// ------------------------------------------
// 3. Smooth Anchor Navigation
// ------------------------------------------
function initAnchorNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();

      const mobileMenu = document.getElementById('mobileMenu');
      const menuIcon = document.getElementById('menuIcon');
      if (mobileMenu) mobileMenu.classList.add('hidden');
      if (menuIcon) menuIcon.classList.replace('fa-xmark', 'fa-bars');
      target.classList.add('is-visible');

      requestAnimationFrame(() => {
        const headerHeight = document.querySelector('header')?.getBoundingClientRect().height || 0;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 6;

        history.pushState(null, '', targetId);
        window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });

        setTimeout(() => {
          const currentHeaderHeight = document.querySelector('header')?.getBoundingClientRect().height || 0;
          const clearance = currentHeaderHeight + 6;
          const correction = target.getBoundingClientRect().top - clearance;
          if (correction < 0) {
            const root = document.documentElement;
            const previousScrollBehavior = root.style.scrollBehavior;
            root.style.scrollBehavior = 'auto';
            window.scrollTo({ top: window.scrollY + correction, behavior: 'auto' });
            root.style.scrollBehavior = previousScrollBehavior;
          }
        }, 1400);
      });
    });
  });
}

// ------------------------------------------
// 4. Scroll-Spy & Active Navbar Highlight
// ------------------------------------------
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('header nav .nav-link');

  function updateActiveLink() {
    let scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}

// ------------------------------------------
// 4. Project Category Filtering
// ------------------------------------------
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterButtons.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update button styles
      filterButtons.forEach(b => {
        b.classList.remove('bg-cyan-600', 'text-white');
        b.classList.add('glass-card', 'text-slate-300');
      });
      btn.classList.add('bg-cyan-600', 'text-white');
      btn.classList.remove('glass-card', 'text-slate-300');

      // Filter cards
      projectCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

// ------------------------------------------
// 5. Copy Email to Clipboard
// ------------------------------------------
function initCopyEmail() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const emailTextElem = document.getElementById('emailText');

  if (!copyBtn || !emailTextElem) return;

  copyBtn.addEventListener('click', async () => {
    const email = emailTextElem.textContent.trim();
    try {
      await navigator.clipboard.writeText(email);
      showToast('Email copied to clipboard!', 'success');

      // Temporarily change icon
      const icon = copyBtn.querySelector('i');
      if (icon) {
        icon.className = 'fas fa-check text-emerald-400 text-sm';
        setTimeout(() => {
          icon.className = 'far fa-copy text-sm';
        }, 2000);
      }
    } catch (err) {
      // Fallback
      showToast(`Email: ${email}`, 'info');
    }
  });
}

// ------------------------------------------
// 6. Scroll Reveal Observer
// ------------------------------------------
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// ------------------------------------------
// 7. Back-to-Top Button
// ------------------------------------------
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.add('opacity-100', 'translate-y-0');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ------------------------------------------
// 8. Contact Form Handling & Toast Feedback
// ------------------------------------------
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin text-sm"></i> <span>Sending...</span>';
    }

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: {
          Accept: 'application/json'
        }
      });

      if (!response.ok) throw new Error('Message service rejected the request');

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane text-sm"></i> <span>Send Message</span>';
      }

      showToast('Thank you! Your message has been sent successfully.', 'success');
      contactForm.reset();
    } catch (error) {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane text-sm"></i> <span>Send Message</span>';
      }

      showToast('Unable to send your message. Please email me directly.', 'error');
    }
  });
}

// ------------------------------------------
// Toast Notification Utility
// ------------------------------------------
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  const toastIcon = document.getElementById('toastIcon');

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;

  if (toastIcon) {
    if (type === 'success') {
      toastIcon.className = 'fas fa-check-circle text-emerald-400';
    } else if (type === 'error') {
      toastIcon.className = 'fas fa-exclamation-circle text-rose-400';
    } else {
      toastIcon.className = 'fas fa-info-circle text-cyan-400';
    }
  }

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

