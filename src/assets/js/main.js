/* Ledioni Group — ndërveprimet e faqes (pa librari të jashtme) */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header, progresi dhe paralaksi gjatë scroll-it ---------- */
  var header = $('[data-header]');
  var toTop = $('[data-to-top]');
  var progress = $('[data-progress]');
  var heroMedia = $('.hero__media');
  var parallax = reduceMotion ? [] : $$('.cta__media');
  var ticking = false;
  var update = function () {
    ticking = false;
    var y = window.scrollY, vh = window.innerHeight;
    if (header) header.classList.toggle('is-scrolled', y > 40);
    if (toTop) toTop.classList.toggle('is-visible', y > 700);
    if (progress) {
      var max = document.documentElement.scrollHeight - vh;
      progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
    }
    if (!reduceMotion && heroMedia && y < vh * 1.2) {
      heroMedia.style.transform = 'translate3d(0,' + (y * 0.3).toFixed(1) + 'px,0)';
    }
    parallax.forEach(function (el) {
      var r = el.parentNode.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      var p = (r.top + r.height / 2 - vh / 2) / vh; // -1 … 1
      el.style.transform = 'translate3d(0,' + (p * -60).toFixed(1) + 'px,0)';
    });
  };
  var onScroll = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();

  if (toTop) toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  /* ---------- Menyja në celular (panel nga e djathta) ---------- */
  var toggle = $('[data-nav-toggle]');
  var menu = $('[data-mobile-menu]');
  var lastFocus = null;
  var setMenu = function (open) {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Mbyll menynë' : 'Hap menynë');
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    if (open) menu.removeAttribute('inert'); else menu.setAttribute('inert', '');
    document.body.classList.toggle('no-scroll', open);
    if (open) {
      lastFocus = document.activeElement;
      setTimeout(function () { var c = $('.mobile-menu__close', menu); if (c) c.focus({ preventScroll: true }); }, 350);
    } else if (lastFocus && lastFocus.focus) {
      lastFocus.focus({ preventScroll: true });
    }
  };
  if (toggle && menu) {
    toggle.addEventListener('click', function () { setMenu(!menu.classList.contains('is-open')); });
    $$('[data-menu-close]', menu).forEach(function (el) { el.addEventListener('click', function () { setMenu(false); }); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { lastFocus = null; setMenu(false); }); });
    document.addEventListener('keydown', function (e) {
      if (!menu.classList.contains('is-open')) return;
      if (e.key === 'Escape') { setMenu(false); return; }
      if (e.key === 'Tab') {
        var f = $$('a, button', $('.mobile-menu__panel', menu)), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    // Mbyllet me rrëshqitje djathtas
    var sx = null;
    menu.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    menu.addEventListener('touchend', function (e) {
      if (sx !== null && e.changedTouches[0].clientX - sx > 70) setMenu(false);
      sx = null;
    }, { passive: true });
    window.addEventListener('resize', function () { if (window.innerWidth > 1100 && menu.classList.contains('is-open')) setMenu(false); });
  }

  /* ---------- Titujt ndahen në fjalë për animacion ---------- */
  var splitWords = function (root) {
    var count = 0;
    var walk = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var parts = n.textContent.split(/(\s+)/);
          var frag = document.createDocumentFragment();
          parts.forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var outer = document.createElement('span');
            outer.className = 'w';
            var inner = document.createElement('span');
            inner.textContent = part;
            inner.style.setProperty('--wi', count++);
            outer.appendChild(inner);
            frag.appendChild(outer);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') {
          walk(n);
        }
      });
    };
    walk(root);
  };
  if (!reduceMotion) {
    $$('[data-reveal] .section-title, [data-reveal].cta__inner .cta__title').forEach(function (t) {
      splitWords(t);
      var host = t.closest('[data-reveal]');
      if (host) host.classList.add('has-words');
    });
  }

  /* ---------- Vonesa e shkallëzuar për elementet në rrjeta ---------- */
  [['.services__grid', 3, 1], ['.projects__grid', 3, 1], ['.why__list', 2, 1], ['.values', 2], ['.stats__grid', 4], ['.partners__list', 3]].forEach(function (g) {
    $$(g[0]).forEach(function (grid) {
      $$(':scope > [data-reveal]', grid).forEach(function (el, i) {
        el.style.setProperty('--d', (i % g[1]) * 200 + 'ms');
        if (g[2] && !el.getAttribute('data-reveal')) {
          var col = i % g[1];
          el.setAttribute('data-reveal', g[1] === 2 ? (col ? 'right' : 'left') : (col === 0 ? 'left' : col === g[1] - 1 ? 'right' : ''));
        }
      });
    });
  });

  /* ---------- Shfaqja e elementeve gjatë scroll-it ---------- */
  var revealEls = $$('[data-reveal], [data-animate]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        en.target.classList.toggle('is-in', en.isIntersecting);
      });
    }, { rootMargin: '-6% 0px -10% 0px', threshold: 0 });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Numëruesit e animuar ---------- */
  var counters = $$('[data-count]');
  var runCounter = function (el) {
    var end = parseInt(el.getAttribute('data-count'), 10);
    var plain = el.getAttribute('data-plain') === '1';
    var start = plain ? Math.max(0, end - 25) : 0;
    var dur = 2600, t0 = null;
    var step = function (t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(start + (end - start) * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (counters.length && 'IntersectionObserver' in window && !reduceMotion) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { runCounter(en.target); co.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) {
      var end = parseInt(c.getAttribute('data-count'), 10);
      c.textContent = String(c.getAttribute('data-plain') === '1' ? Math.max(0, end - 25) : 0);
      co.observe(c);
    });
  }

  /* ---------- Theksimi i menysë sipas seksionit aktiv ---------- */
  var navLinks = $$('.nav__link[data-nav], .mobile-menu__list a[data-nav]');
  var sections = $$('.nav__link[data-nav]').map(function (l) { return document.getElementById(l.getAttribute('data-nav')); }).filter(Boolean);
  if (sections.length && 'IntersectionObserver' in window) {
    var setActive = function (id) {
      navLinks.forEach(function (l) {
        var on = l.getAttribute('data-nav') === id;
        l.classList.toggle('is-active', on);
        if (on) l.setAttribute('aria-current', 'location'); else l.removeAttribute('aria-current');
      });
    };
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) setActive(en.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { so.observe(s); });
  }

  /* ---------- Filtri i projekteve ---------- */
  var filterBtns = $$('[data-filter]');
  var cards = $$('[data-projects] .project-card');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      filterBtns.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      cards.forEach(function (c) {
        var show = f === 'all' || c.getAttribute('data-category') === f;
        c.classList.toggle('is-hidden', !show);
        if (show) c.classList.add('is-in');
      });
    });
  });

  /* ---------- Lightbox për galerinë ---------- */
  var lb = $('[data-lightbox-root]');
  var links = $$('[data-lightbox]');
  if (lb && links.length) {
    var img = $('[data-lb-img]', lb), cap = $('[data-lb-caption]', lb);
    var idx = 0, lastFocus = null;
    var show = function (i) {
      idx = (i + links.length) % links.length;
      var a = links[idx];
      img.src = a.getAttribute('href');
      img.alt = a.getAttribute('data-caption') || '';
      var credit = a.getAttribute('data-credit');
      cap.textContent = (a.getAttribute('data-caption') || '') + (credit ? ' — Foto ilustruese: ' + credit + ' / Unsplash' : '') + '  (' + (idx + 1) + ' / ' + links.length + ')';
    };
    var open = function (i) { lastFocus = document.activeElement; show(i); lb.hidden = false; document.body.classList.add('no-scroll'); $('[data-lb-close]', lb).focus(); };
    var close = function () { lb.hidden = true; document.body.classList.remove('no-scroll'); img.removeAttribute('src'); if (lastFocus) lastFocus.focus(); };
    links.forEach(function (a, i) { a.addEventListener('click', function (e) { e.preventDefault(); open(i); }); });
    $('[data-lb-close]', lb).addEventListener('click', close);
    $('[data-lb-prev]', lb).addEventListener('click', function () { show(idx - 1); });
    $('[data-lb-next]', lb).addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(idx - 1);
      else if (e.key === 'ArrowRight') show(idx + 1);
      else if (e.key === 'Tab') {
        var f = $$('button', lb), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---------- Formulari i kontaktit ---------- */
  var form = $('[data-form]');
  if (form) {
    var status = $('[data-form-status]', form);
    var submit = $('[data-submit]', form);
    var submitText = $('.form__submit-text', form);
    var rules = {
      emri: function (v) { return v.trim().length >= 3 ? '' : 'Ju lutemi shkruani emrin dhe mbiemrin.'; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Ju lutemi shkruani një adresë email të vlefshme.'; },
      telefoni: function (v) { return !v.trim() || /^[0-9 +()\-]{6,20}$/.test(v.trim()) ? '' : 'Numri i telefonit nuk është i vlefshëm.'; },
      mesazhi: function (v) { return v.trim().length >= 10 ? '' : 'Mesazhi duhet të ketë të paktën 10 karaktere.'; },
      pelqimi: function (v, el) { return el.checked ? '' : 'Ju lutemi pranoni Politikën e Privatësisë.'; },
    };
    var validateField = function (el) {
      var rule = rules[el.name];
      if (!rule) return true;
      var msg = rule(el.value, el);
      var field = el.closest('.field');
      var err = document.getElementById(el.getAttribute('aria-describedby'));
      field.classList.toggle('has-error', !!msg);
      el.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (err) err.textContent = msg;
      return !msg;
    };
    $$('input, textarea', form).forEach(function (el) {
      el.addEventListener('blur', function () { if (el.value || el.type === 'checkbox') validateField(el); });
      el.addEventListener('input', function () { if (el.closest('.field') && el.closest('.field').classList.contains('has-error')) validateField(el); });
      el.addEventListener('change', function () { if (el.type === 'checkbox') validateField(el); });
    });

    var alertBox = function (ok, title, text) {
      status.innerHTML = '<div class="form__alert form__alert--' + (ok ? 'ok' : 'err') + '"><div><strong></strong><span></span></div></div>';
      $('strong', status).textContent = title;
      $('span', status).textContent = text;
    };
    var setLoading = function (on) {
      submit.disabled = on;
      submit.classList.toggle('is-loading', on);
      submitText.textContent = on ? 'Duke u dërguar…' : 'Dërgo Mesazhin';
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.innerHTML = '';
      var fields = $$('[name="emri"], [name="email"], [name="telefoni"], [name="mesazhi"], [name="pelqimi"]', form);
      var firstBad = null;
      fields.forEach(function (el) { if (!validateField(el) && !firstBad) firstBad = el; });
      if (firstBad) { firstBad.focus(); return; }

      var endpoint = form.getAttribute('data-endpoint');
      var data = new FormData(form);
      if (endpoint === 'whatsapp') {
        var text = 'Përshëndetje, ju shkruaj nga faqja e Ledioni Group.\n\nEmri: ' + data.get('emri') + '\nEmail: ' + data.get('email') + '\nTelefoni: ' + (data.get('telefoni') || '-') + '\n\n' + data.get('mesazhi');
        window.open('https://wa.me/' + form.getAttribute('data-whatsapp') + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
        alertBox(true, 'Po hapet WhatsApp.', 'Mesazhi juaj është i plotësuar — mjafton ta dërgoni. Nëse WhatsApp nuk hapet, na telefononi direkt.');
        return;
      }
      var req;
      if (endpoint === 'netlify') {
        req = fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(data).toString(),
        });
      } else {
        req = fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      }
      setLoading(true);
      req.then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.reset();
        $$('.field', form).forEach(function (f) { f.classList.remove('has-error'); });
        alertBox(true, 'Faleminderit! Mesazhi juaj u dërgua.', 'Do t’ju kontaktojmë sa më shpejt.');
      }).catch(function () {
        alertBox(false, 'Mesazhi nuk u dërgua.', 'Ju lutemi provoni përsëri ose na kontaktoni direkt në telefon ose WhatsApp.');
      }).then(function () { setLoading(false); });
    });
  }
})();
