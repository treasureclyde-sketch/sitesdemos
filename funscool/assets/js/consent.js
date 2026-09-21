/* FUNSCOOL — cookie consent + Meta Pixel, GDPR-friendly.
   The pixel loads only after the visitor accepts cookies.
   FB_PIXEL_ID — Meta (Facebook) Pixel id, a number like "123456789012345".      */
(function () {
  'use strict';
  var FB_PIXEL_ID = '4490692144582887';    // Meta (Facebook) Pixel

  var STORE = 'fs-consent';
  function get() { try { return localStorage.getItem(STORE); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(STORE, v); } catch (e) {} }
  function lang() { try { return localStorage.getItem('fs-lang') || 'ru'; } catch (e) { return 'ru'; } }

  var T = {
    ru: { text: 'Мы используем файлы cookie для аналитики и улучшения сайта. Вы можете принять их или отказаться.',
          more: 'Подробнее', ok: 'Принять', no: 'Отклонить' },
    sr: { text: 'Koristimo kolačiće za analitiku i poboljšanje sajta. Možete ih prihvatiti ili odbiti.',
          more: 'Više', ok: 'Prihvatam', no: 'Odbijam' },
    en: { text: 'We use cookies for analytics and to improve the site. You can accept or decline.',
          more: 'Learn more', ok: 'Accept', no: 'Decline' }
  };

  /* ---- Meta Pixel loader (only runs after consent AND if an id is set) ---- */
  var loaded = false;
  function loadAnalytics() {
    if (loaded) return; loaded = true;
    if (FB_PIXEL_ID) {
      /* Meta Pixel base code */
      !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
        t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
      }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', FB_PIXEL_ID);
      window.fbq('track', 'PageView');
    }
  }

  /* Called by the lead form on a successful submit (see main.js). Safe no-op
     until analytics is loaded, so every form counts as a trackable event. */
  window.fsTrackLead = function () {
    try { if (window.fbq) window.fbq('track', 'Lead'); } catch (e) {}
  };

  /* ---- consent banner ---- */
  function banner() {
    var t = T[lang()] || T.ru;
    var el = document.createElement('div');
    el.className = 'cookie-banner'; el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Cookie');
    el.innerHTML =
      '<p class="cookie-text"></p>' +
      '<div class="cookie-actions">' +
        '<button type="button" class="btn btn-ghost cookie-no"></button>' +
        '<button type="button" class="btn btn-yellow cookie-ok"></button>' +
      '</div>';
    var textEl = el.querySelector('.cookie-text');
    textEl.textContent = t.text + ' ';
    var more = document.createElement('a');
    more.href = 'privacy.html'; more.className = 'cookie-more'; more.textContent = t.more;
    textEl.appendChild(more);
    el.querySelector('.cookie-ok').textContent = t.ok;
    el.querySelector('.cookie-no').textContent = t.no;
    document.body.appendChild(el);
    requestAnimationFrame(function () { el.classList.add('show'); });
    el.querySelector('.cookie-ok').addEventListener('click', function () { set('granted'); el.remove(); loadAnalytics(); });
    el.querySelector('.cookie-no').addEventListener('click', function () { set('denied'); el.remove(); });
  }

  function init() {
    var c = get();
    if (c === 'granted') { loadAnalytics(); return; }
    if (c === 'denied') { return; }
    banner();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
