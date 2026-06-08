/* ============================================
   FairDebt Solutions - Complete Redesign JS
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ==========================================
  // NAVBAR SCROLL EFFECT
  // ==========================================
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // ==========================================
  // MOBILE NAV TOGGLE
  // ==========================================
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      document.body.classList.toggle('nav-open');
    });

    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        document.body.classList.remove('nav-open');
      }
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        document.body.classList.remove('nav-open');
      });
    });
  }

  // ==========================================
  // STATS COUNTER ANIMATION
  // ==========================================
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;
    const stats = document.querySelectorAll('.stat-number');
    if (!stats.length) return;

    const triggerSection = stats[0].closest('.stats-section');
    if (!triggerSection) return;

    const rect = triggerSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      statsAnimated = true;
      stats.forEach(function (el) {
        const target = parseInt(el.getAttribute('data-target'));
        if (isNaN(target)) return;
        const suffix = el.querySelector('.suffix');
        const numEl = el.childNodes[0];
        let current = 0;
        const step = Math.max(1, Math.floor(target / 80));
        const interval = setInterval(function () {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          el.firstChild.textContent = current;
        }, 20);
      });
    }
  }

  window.addEventListener('scroll', animateStats);
  window.addEventListener('load', animateStats);

  // ==========================================
  // BACK TO TOP
  // ==========================================
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // FAQ ACCORDION
  // ==========================================
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const isActive = btn.classList.contains('active');
      document.querySelectorAll('.faq-question').forEach(function (q) {
        q.classList.remove('active');
        q.nextElementSibling.style.maxHeight = null;
      });
      if (!isActive) {
        btn.classList.add('active');
        btn.nextElementSibling.style.maxHeight = btn.nextElementSibling.scrollHeight + 'px';
      }
    });
  });

  // ==========================================
  // TABS
  // ==========================================
  document.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const parent = btn.closest('.tabs-nav');
      parent.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      const target = btn.getAttribute('data-tab');
      const container = btn.closest('.container') || btn.closest('div');
      container.querySelectorAll('.tab-content').forEach(function (t) { t.classList.remove('active'); });
      var targetEl = document.getElementById(target);
      if (targetEl) targetEl.classList.add('active');
    });
  });

  // ==========================================
  // MODALS
  // ==========================================
  window.openModal = function (modalId) {
    document.querySelectorAll('.modal-overlay.show, .success-modal.show').forEach(function (m) {
      m.classList.remove('show');
    });
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('show');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.modal-overlay').forEach(function (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.show').forEach(function (m) {
        m.classList.remove('show');
      });
      document.body.style.overflow = '';
    }
  });

  // ==========================================
  // DROPDOWNS (corporate page)
  // ==========================================
  document.querySelectorAll('.dropdown-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      const menu = trigger.nextElementSibling;
      document.querySelectorAll('.dropdown-menu-custom.show').forEach(function (m) {
        if (m !== menu) m.classList.remove('show');
        const otherIcon = m.previousElementSibling.querySelector('.fa-chevron-down');
        if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
      });
      menu.classList.toggle('show');
      const icon = trigger.querySelector('.fa-chevron-down');
      if (icon) {
        icon.style.transform = menu.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    });
  });

  document.addEventListener('click', function () {
    document.querySelectorAll('.dropdown-menu-custom.show').forEach(function (m) {
      m.classList.remove('show');
    });
  });

  // ==========================================
  // EMAILJS INIT
  // ==========================================
  if (typeof emailjs !== 'undefined') {
    emailjs.init('YHPpA8WKsdQMlZF0u');
  }

  // ==========================================
  // CONTACT FORM (EmailJS)
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm && typeof emailjs !== 'undefined') {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const mobile = document.getElementById('mobile');
      const message = document.getElementById('message');

      document.querySelectorAll('.form-control').forEach(function (el) {
        el.classList.remove('error');
      });

      let valid = true;
      if (!name.value.trim()) { name.classList.add('error'); valid = false; }
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { email.classList.add('error'); valid = false; }
      if (!mobile.value.trim() || !/^\d{10}$/.test(mobile.value)) { mobile.classList.add('error'); valid = false; }
      if (!message.value.trim()) { message.classList.add('error'); valid = false; }
      if (!valid) return;

      const submitBtn = contactForm.querySelector('.btn-submit');
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';

      emailjs.send('service_i15deir', 'template_knn971z', {
        from_name: name.value.trim(),
        email: email.value.trim(),
        mobile: mobile.value.trim(),
        message: message.value.trim()
      }).then(function () {
        openModal('successModal');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <i class="fas fa-arrow-right"></i>';
      }, function (err) {
        console.error('EmailJS Error:', err);
        alert('There was an error submitting your details. Please try again. (' + (err.text || err.message || 'check console') + ')');
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <i class="fas fa-arrow-right"></i>';
      });
    });
  }

  // ==========================================
  // CAREER FORM (EmailJS)
  // ==========================================
  const careerForm = document.getElementById('careerForm');
  if (careerForm && typeof emailjs !== 'undefined') {
    careerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('careerName');
      var email = document.getElementById('careerEmail');
      var phone = document.getElementById('careerPhone');
      var position = document.getElementById('careerPosition');
      var cv = document.getElementById('careerCv');

      if (!name.value.trim() || !email.value.trim() || !phone.value.trim() || !position.value.trim()) {
        alert('Please fill all fields.');
        return;
      }
      if (!cv.files[0]) { alert('Please upload a CV.'); return; }

      var reader = new FileReader();
      reader.onload = function () {
        var base64CV = reader.result.split(',')[1];
        emailjs.send('service_i15deir', 'template_6tlwy4z', {
          to_email: 'fairdebt2@gmail.com',
          from_name: name.value.trim(),
          from_email: email.value.trim(),
          phone: phone.value.trim(),
          position: position.value.trim(),
          cv_filename: cv.files[0].name,
          cv_data: 'data:' + cv.files[0].type + ';base64,' + base64CV
        }).then(function () {
          openModal('successModal');
          careerForm.reset();
        }, function (err) {
          console.error('EmailJS Career Error:', err);
          alert('There was an error submitting your application. Please try again. (' + (err.text || err.message || 'check console') + ')');
        });
      };
      reader.readAsDataURL(cv.files[0]);
    });
  }

  // ==========================================
  // SOCIAL LINKS
  // ==========================================
  window.visitInstagram = function () { window.open('https://www.instagram.com/', '_blank'); };
  window.sendEmail = function () { window.open('mailto:superadmin@fairdebt.in'); };
  window.visitTwitter = function () { window.open('https://twitter.com/', '_blank'); };
  window.visitLinkedIn = function () { window.open('https://www.linkedin.com/', '_blank'); };

  // ==========================================
  // AUTO-YEAR IN FOOTER
  // ==========================================
  var yearEl = document.querySelector('.copyright-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ==========================================
  // CLIENT LOGO CENTER HIGHLIGHT
  // ==========================================
  var track = document.querySelector('.client-logo-track');
  var clientLogos = document.querySelectorAll('.client-logos img');
  if (track && clientLogos.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('center-active');
        } else {
          entry.target.classList.remove('center-active');
        }
      });
    }, { root: track, rootMargin: '0px -25% 0px -25%', threshold: 0.2 });
    clientLogos.forEach(function (img) { observer.observe(img); });
  }
});
