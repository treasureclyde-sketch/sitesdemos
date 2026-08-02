/* FREE FLY — interactions (vanilla, no deps) */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Navbar scrolled state ---------- */
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var burger = document.querySelector('.nav-burger');
  var mobileMenu = document.querySelector('.mobile-menu');
  function toggleMenu(force) {
    var open = force !== undefined ? force : !mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (burger) burger.addEventListener('click', function () { toggleMenu(); });
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { toggleMenu(false); });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
    // safety net: never leave content hidden if the observer misses something
    setTimeout(function () {
      reveals.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('in');
      });
    }, 2600);
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Hero headline reveal ---------- */
  window.requestAnimationFrame(function () {
    document.querySelectorAll('.hero h1 .line > span').forEach(function (s, i) {
      s.style.transition = 'transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s';
      s.style.transform = 'translateY(105%)';
      s.style.opacity = '0';
      setTimeout(function () {
        s.style.transform = 'none';
        s.style.opacity = '1';
      }, 120 + i * 130);
    });
  });

  /* ---------- Wind particles ---------- */
  var wind = document.querySelector('.wind');
  if (wind && !reduceMotion) {
    var count = window.innerWidth < 640 ? 16 : 30;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < count; i++) {
      var p = document.createElement('i');
      var dur = 3 + Math.random() * 4;
      p.style.left = Math.random() * 100 + '%';
      p.style.height = (50 + Math.random() * 90) + 'px';
      p.style.animationDuration = dur + 's';
      p.style.animationDelay = (-Math.random() * dur) + 's';
      p.style.opacity = (0.4 + Math.random() * 0.5).toFixed(2);
      frag.appendChild(p);
    }
    wind.appendChild(frag);
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Animated stat counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = (el.getAttribute('data-decimals') || '0') | 0;
    var dur = 1400, start = null;
    function tick(ts) {
      if (!start) start = ts;
      var prog = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - prog, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (prog < 1) requestAnimationFrame(tick);
      else el.textContent = target.toFixed(decimals);
    }
    requestAnimationFrame(tick);
  }
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent = parseFloat(el.getAttribute('data-count')).toFixed((el.getAttribute('data-decimals') || '0') | 0);
    });
  }

  /* ---------- Phone mask ---------- */
  var phone = document.getElementById('phoneInput');
  function maskPhone(input) {
    var digits = input.value.replace(/\D/g, '');
    if (digits[0] === '7' || digits[0] === '8') digits = digits.slice(1);
    digits = digits.slice(0, 10);
    var r = '+7';
    if (digits.length > 0) {
      r += ' (' + digits.slice(0, 3);
      if (digits.length >= 3) r += ')';
      if (digits.length > 3) {
        r += ' ' + digits.slice(3, 6);
        if (digits.length > 6) {
          r += '-' + digits.slice(6, 8);
          if (digits.length > 8) r += '-' + digits.slice(8, 10);
        }
      }
    }
    input.value = r;
  }
  if (phone) {
    phone.addEventListener('input', function () { maskPhone(this); });
    phone.addEventListener('focus', function () { if (!this.value) this.value = '+7 '; });
    phone.addEventListener('blur', function () { if (this.value === '+7 ' || this.value === '+7') this.value = ''; });
  }

  /* ---------- Form submit (demo) ---------- */
  var form = document.getElementById('flyForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = document.getElementById('formSuccess');
      var name = form.querySelector('[name="name"]');
      var ph = form.querySelector('[name="phone"]');
      if (!name.value.trim()) { name.focus(); name.style.borderColor = 'var(--danger)'; return; }
      if (!ph.value.trim() || ph.value.replace(/\D/g, '').length < 11) { ph.focus(); ph.style.borderColor = 'var(--danger)'; return; }
      form.reset();
      if (success) {
        success.classList.add('show');
        setTimeout(function () { success.classList.remove('show'); }, 6000);
      }
    });
    form.querySelectorAll('input').forEach(function (i) {
      i.addEventListener('input', function () { this.style.borderColor = ''; });
    });
  }

  /* ---------- 3D model: activate only if the .glb actually exists ---------- */
  var pilot = document.getElementById('pilotModel');
  if (pilot && pilot.dataset.src) {
    fetch(pilot.dataset.src, { method: 'HEAD' })
      .then(function (r) {
        if (r.ok) {
          pilot.setAttribute('src', pilot.dataset.src);
          var stage = pilot.closest('.mv-stage');
          if (stage) stage.classList.add('has3d');
        }
      })
      .catch(function () { /* no model yet — poster/photo stays */ });
  }

  /* ---------- Footer year ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
