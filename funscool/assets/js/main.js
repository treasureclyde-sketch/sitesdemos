/* FUNSCOOL — interactions + i18n (RU inline default, SR/EN dictionaries) */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CONTENT = null;      // data loaded from content/*.json (CMS-editable)
  var currentLang = 'ru';  // language the page is currently showing

  /* ---------- capture RU (inline) as the base language ---------- */
  var RU = {};
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    RU[el.getAttribute('data-i18n')] = el.innerHTML;
  });
  var RU_PH = {};
  document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
    RU_PH[el.getAttribute('data-i18n-ph')] = el.getAttribute('placeholder');
  });

  var SR = {
    brand_sub:"predškolska ustanova", nav_about:"O nama", nav_programs:"Programi", nav_env:"Okruženje",
    nav_parents:"Za roditelje", nav_contacts:"Kontakt", nav_teachers:"Vaspitači", cta_book:"Zakažite obilazak", cta_book_short:"Zakažite",
    hero_title:"Srećno detinjstvo svakog dana", hero_sub:"Boutique vrtić za decu od 1,5 do 7 godina u srcu Dorćola",
    cta_programs:"Naši programi", addr:"Dorćol, Popovićeva 14A, Beograd", addr_sub:"Mirno centralno mesto, sigurno okruženje",
    rating:"Ocena ustanove na Yandex-u",
    f1_t:"Male grupe", f1_d:"do 15 dece", f2_t:"Blaga adaptacija", f2_d:"bez stresa i suza",
    f3_t:"Višejezično okruženje", f3_d:"ruski, srpski, engleski", f4_t:"Autorski program", f4_d:"zasnovan na Montessori i Waldorf pristupima",
    sreda_eyebrow:"Bezbedan razvoj svakog dana", sreda_title:"Okruženje u kome dete raste nežno i sa radošću",
    sreda_text:"Osmišljeni prostori, boje, materijali i zone pomažu deci da rastu samopouzdano, samostalno i srećno.",
    sreda_1:"Boje i junaci po Waldorf sistemu za svaki uzrast", sreda_2:"7–8 razvojnih zona u svakoj grupi u zavisnosti od uzrasta",
    sreda_3:"Bezbedni materijali i prostor za slobodno istraživanje", sreda_4:"Razvoj u svakoj fazi — od senzorike do stvaralaštva i projekata",
    prog_eyebrow:"Uzrasne grupe", prog_title:"Prostori koji rastu zajedno sa detetom", prog_sub:"Svaka grupa je važna faza u razvoju vašeg deteta.",
    p1_name:"Bebi-Fan", p1_age:"1,5–2,5 godine", p1_desc:"Prvi koraci ka samostalnosti u atmosferi brige i sigurnosti.",
    p1_l1:"Senzorni zidovi", p1_l2:"Zona vode i peska", p1_l3:"Velike bezbedne igračke", p1_l4:"Ogledala i gimnastika", p1_l5:"Razvoj govora kroz igru",
    p2_name:"Enerdži-Fan", p2_age:"2,5–3,5 godine", p2_desc:"Pokret, red i samostalnost kroz igru.",
    p2_l1:"Zona za pokret", p2_l2:"Konstruktorska", p2_l3:"Crtanje i stvaralaštvo", p2_l4:"Kuća, prodavnica, pospremanje", p2_l5:"Čitanje i mirne igre",
    p3_name:"Diskaveri-Fan", p3_age:"3,5–4,5 godine", p3_desc:"Istražujemo, probamo, stvaramo i razumemo svet.",
    p3_l1:"Zona ogleda i eksperimenata", p3_l2:"Projektna aktivnost", p3_l3:"Beleženje rezultata", p3_l4:"Montessori materijali", p3_l5:"Rad po koracima (4–6 faza)",
    p4_name:"Kreativ-Fan", p4_age:"4,5–6 godina", p4_desc:"Stvaralaštvo, govor i priprema za školu kroz interesovanje.",
    p4_l1:"Pozorišna i scenska zona", p4_l2:"Prezentacije i projekti", p4_l3:"Konstruktori i materijali", p4_l4:"Montessori: matematika i govor", p4_l5:"Geografija i svet oko nas",
    p5_name:"Preskul", p5_age:"6–7 godina", p5_desc:"Priprema za školu, projekti, jezici i samopouzdanje.",
    p5_l1:"Priprema za školu", p5_l2:"Projekti i prezentacije", p5_l3:"Jezici: ru / sr / en", p5_l4:"Logika i matematika", p5_l5:"Samopouzdanje i samostalnost",
    learn_more:"Upoznajte se", p_more_t:"Ne znate koja grupa odgovara?", p_more_d:"Dođite na obilazak — pokazaćemo prostor i pronaći grupu za vaše dete.",
    play_eyebrow:"Svež vazduh", play_title:"Sopstveno bezbedno igralište",
    play_1:"Šetnje dva puta dnevno na sopstvenom igralištu vrtića", play_2:"Ograđeno i potpuno bezbedno",
    play_3:"Puno pokreta, igre i otkrića svakog dana", play_4:"Čist vazduh i zelenilo u mirnom centru Dorćola",
    about_eyebrow:"Kuća sa istorijom", about_title:"Kuća sa istorijom u srcu Beograda",
    about_text:"Funscool je licencirani vrtić koji radi po državnom programu i savremenim pedagoškim pristupima. Cenimo tradiciju, profesionalizam i individualni pristup svakom detetu.",
    about_b1:"Licencirani vrtić", about_b2:"Državni program", about_b3:"Profesionalni tim",
    day_eyebrow:"Kako izgleda dan", day_title:"360° razvoj — svaki dan sa interesovanjem",
    day_text:"Osmislili smo svaki sat dana da se dete razvija skladno, sa zadovoljstvom i svojim tempom.",
    day_quote_t:"Svaki trenutak je važan", day_quote_d:"Briga, pažnja i podrška — osnova srećnog detinjstva.",
    day_hours:"07:00 – 18:00", day_meals:"5 obroka dnevno",
    clk1:"Jutarnji prijem, pozdrav i vežbanje", clk2:"Ukusan doručak", clk3:"Aktivnosti po višejezičnom programu",
    clk4:"Voćna užina", clk5:"Zanimljiva šetnja", clk6:"Zdrav ručak", clk7:"Dnevni odmor i relaksacija",
    clk8:"Hranljiv snek", clk9:"Časovi po Montesori / Valdorf metodi", clk10:"Obilna večera",
    clk11:"Šetnja, sekcije i radionice", clk12:"Ispraćaj",
    joy_eyebrow:"Svaki trenutak je važan", joy_title:"Radost — svakog dana",
    joy_sub:"Punimo svaki dan deteta događajima u kojima je srećno, inspirisano i ponosno na sebe.",
    joy1_t:"Živo interesovanje za novo", joy1_d:"Budimo radoznalost i uključujemo u aktivnosti kroz igru i komunikaciju.",
    joy2_t:"Šareni dani — bez šablona", joy2_d:"Tematski dani, stvaralaštvo i eksperimenti — svaki dan donosi nešto posebno.",
    joy3_t:"Događaji koji se pamte", joy3_d:"Kvizovi, proslave i prave avanture — ono što deca čekaju i rado prepričavaju.",
    joy4_t:"Samopouzdanje i radost pobeda", joy4_d:"Vaspitači podržavaju i primećuju uspehe deteta, pomažući mu da veruje u sebe.",
    team_eyebrow:"Sa ljubavlju i brigom", team_title:"Naši vaspitači",
    team_sub:"Četiri vaspitača i administrator koji dan deteta drže mirnim, toplim i razumljivim.", team_ask:"Postavite pitanje",
    /* teacher cards are rendered from content/teachers.json */
    mom_eyebrow:"Svaki trenutak je važan", mom_title:"Srećni trenuci svakog dana",
    mom_sub:"Igramo se, stvaramo, istražujemo i rastemo zajedno. Svaki dan u Funscool-u ispunjen je radošću i otkrićima.",
    mom_note:"Bezbedno, brižno i inspirativno okruženje — od jutra do večeri.",
    faq_eyebrow:"Česta pitanja", faq_title:"Odgovaramo na pitanja roditelja",
    faq_q1:"Kako izgleda adaptacija?", faq_a1:"Počinjemo kratkim posetama zajedno sa roditeljem i postepeno produžavamo vreme. Tempo prilagođavamo detetu — nežno, bez stresa i suza.",
    faq_q2:"Da li možemo početi sa pola dana?", faq_a2:"Da. Mnoga deca počinju sa pola dana, a zatim postepeno prelaze na ceo dan kada su spremna.",
    faq_q3:"Koji jezici se koriste?", faq_a3:"Ruski, srpski i engleski. Deca prirodno uranjaju u jezičko okruženje — kroz igru, pesmu i živu komunikaciju.",
    faq_q4:"Kako je organizovana ishrana?", faq_a4:"Pet obroka dnevno: doručak, voćna užina, ručak, užina i večera. Uravnotežen jelovnik; vodimo računa o posebnostima i alergijama.",
    faq_q5:"Koliko dece ima u grupi?", faq_a5:"Male grupe do 15 dece — tako svako dete dobija dovoljno pažnje vaspitača.",
    faq_q6:"Kako možemo zakazati posetu?", faq_a6:"Ostavite prijavu u formi ispod ili nas pozovite — dogovorićemo termin obilaska.",
    form_title:"Želite da vidite vrtić svojim očima?", form_text:"Ostavite zahtev — pokazaćemo prostor, odgovoriti na pitanja i pronaći grupu za vaše dete. Poslaćemo raspored, događaje i dnevni režim.",
    form_call:"Pozovite nas", form_card_title:"Zakažite obilazak", form_card_sub:"Popunite formu — javićemo vam se u najkraćem roku.",
    cta_rating:"Ocena na Yandexu", cta_c1:"Male grupe do 15", cta_c2:"Licencirani vrtić", intro_skip:"Preskoči →",
    form_name:"Ime roditelja", form_phone:"Telefon", form_age:"Uzrast deteta", form_submit:"Dobijte informacije",
    form_privacy:"Poštujemo vašu privatnost i ne delimo podatke sa trećim licima.", form_ok:"Hvala! Zahtev je primljen — javićemo vam se uskoro.",
    footer_tagline:"Razvijamo sa ljubavlju i brigom svakog dana.", footer_nav:"Navigacija", footer_programs:"Programi",
    footer_contacts:"Kontakt", footer_rights:"Sva prava zadržana"
  };

  var EN = {
    brand_sub:"preschool", nav_about:"About", nav_programs:"Programs", nav_env:"Environment",
    nav_parents:"For parents", nav_contacts:"Contacts", nav_teachers:"Teachers", cta_book:"Book a Tour", cta_book_short:"Book a Tour",
    hero_title:"Happy childhood every day", hero_sub:"Boutique preschool for children 1.5 to 7 years old in the heart of Dorćol",
    cta_programs:"Our programs", addr:"Dorćol, Popovića 14A, Belgrade", addr_sub:"Quiet central location, safe neighborhood",
    rating:"Rated on Yandex",
    f1_t:"Small groups", f1_d:"up to 15 children", f2_t:"Gentle adaptation", f2_d:"a stress-free start",
    f3_t:"Multilingual environment", f3_d:"Russian, Serbian, English", f4_t:"Exclusive curriculum", f4_d:"based on Montessori and Waldorf approach",
    sreda_eyebrow:"Safe development every day", sreda_title:"An environment where a child grows gently and joyfully",
    sreda_text:"Thoughtful spaces, colors, materials and zones help children grow confident, independent and happy.",
    sreda_1:"Colors and characters by the Waldorf system for each age", sreda_2:"7–8 developmental zones in each group depending on age",
    sreda_3:"Safe materials and space for free exploration", sreda_4:"Development at every stage — from sensory play to creativity and projects",
    prog_eyebrow:"Age groups", prog_title:"Spaces that grow together with your child", prog_sub:"Each group is an important stage in your child's development.",
    p1_name:"Baby-Fun", p1_age:"1.5–2.5 years", p1_desc:"First steps toward independence in an atmosphere of care and safety.",
    p1_l1:"Sensory walls", p1_l2:"Water and sand area", p1_l3:"Large safe toys", p1_l4:"Mirrors and gymnastics", p1_l5:"Speech development through play",
    p2_name:"Energy-Fun", p2_age:"2.5–3.5 years", p2_desc:"Movement, order and independence through play.",
    p2_l1:"Movement zone", p2_l2:"Construction area", p2_l3:"Drawing and creativity", p2_l4:"Home, shop, tidying up", p2_l5:"Reading and calm games",
    p3_name:"Discovery-Fun", p3_age:"3.5–4.5 years", p3_desc:"We explore, try, create and understand the world.",
    p3_l1:"Experiments zone", p3_l2:"Project activity", p3_l3:"Recording results", p3_l4:"Montessori materials", p3_l5:"Step-by-step work (4–6 stages)",
    p4_name:"Creative-Fun", p4_age:"4.5–6 years", p4_desc:"Creativity, speech and school preparation through interest.",
    p4_l1:"Theater and stage zone", p4_l2:"Presentations and projects", p4_l3:"Building sets and materials", p4_l4:"Montessori: math and speech", p4_l5:"Geography and the world around",
    p5_name:"Pre-school", p5_age:"6–7 years", p5_desc:"School preparation, projects, languages and self-confidence.",
    p5_l1:"School preparation", p5_l2:"Projects and presentations", p5_l3:"Languages: ru / sr / en", p5_l4:"Logic and math", p5_l5:"Confidence and independence",
    learn_more:"Learn more", p_more_t:"Not sure which group fits?", p_more_d:"Come for a tour — we'll show the space and find the right group for your child.",
    play_eyebrow:"Fresh air", play_title:"Our own safe playground",
    play_1:"Walks twice a day on the preschool's own playground", play_2:"Fenced and completely safe",
    play_3:"Plenty of movement, play and discovery every day", play_4:"Clean air and greenery in quiet central Dorćol",
    about_eyebrow:"A house with history", about_title:"A house with history in the heart of Belgrade",
    about_text:"Funscool is a licensed preschool operating under the state program and modern pedagogical approaches. We value tradition, professionalism and an individual approach to every child.",
    about_b1:"Licensed preschool", about_b2:"State program", about_b3:"Professional team",
    day_eyebrow:"How the day goes", day_title:"360° development — every day with curiosity",
    day_text:"We've thought through every hour of the day so that a child develops harmoniously, with joy and at their own pace.",
    day_quote_t:"Every moment matters", day_quote_d:"Care, attention and support — the foundation of a happy childhood.",
    day_hours:"07:00 – 18:00", day_meals:"5 meals a day",
    clk1:"Morning welcome, greeting and exercise", clk2:"Tasty breakfast", clk3:"Activities in the multilingual program",
    clk4:"Fruit snack", clk5:"An engaging walk", clk6:"Healthy lunch", clk7:"Daytime rest and relaxation",
    clk8:"Nourishing snack", clk9:"Montessori / Waldorf method classes", clk10:"Hearty dinner",
    clk11:"Walk, clubs and activities", clk12:"Farewell",
    joy_eyebrow:"Every moment matters", joy_title:"Joy — every single day",
    joy_sub:"We fill each child's day with moments that make them happy, inspired and proud of themselves.",
    joy1_t:"A love for learning", joy1_d:"We spark curiosity and engage children through play and warm communication.",
    joy2_t:"Bright days — never routine", joy2_d:"Themed days, creativity and experiments — every day brings something special.",
    joy3_t:"Memorable events", joy3_d:"Quests, celebrations and real adventures — what children look forward to and love to share.",
    joy4_t:"Confidence and the joy of wins", joy4_d:"Teachers support and notice each child's progress, helping them believe in themselves.",
    team_eyebrow:"With love and care", team_title:"Our teachers",
    team_sub:"Four teachers and an administrator who keep a child's day calm, warm and clear.", team_ask:"Ask a question",
    /* teacher cards are rendered from content/teachers.json */
    mom_eyebrow:"Every moment matters", mom_title:"Happy moments, every single day",
    mom_sub:"We play, create, explore and grow together. Every day at Funscool is filled with joy and new discoveries.",
    mom_note:"A safe, caring and inspiring environment — from morning to evening.",
    faq_eyebrow:"Frequent questions", faq_title:"Answering parents' questions",
    faq_q1:"What does adaptation look like?", faq_a1:"We start with short visits together with a parent and gradually extend the time. We match the pace to the child — gently, without stress or tears.",
    faq_q2:"Can we start with half a day?", faq_a2:"Yes. Many children start with half a day and then smoothly move to a full day when they're ready.",
    faq_q3:"Which languages are used?", faq_a3:"Russian, Serbian and English. Children immerse in the language environment naturally — through play, songs and real conversation.",
    faq_q4:"How are meals organised?", faq_a4:"Five meals a day: breakfast, a fruit snack, lunch, a snack and dinner. A balanced menu; we account for special needs and allergies.",
    faq_q5:"How many children are in a group?", faq_a5:"Small groups of up to 15 children — so each child gets enough of the teacher's attention.",
    faq_q6:"How can we book a visit?", faq_a6:"Leave a request in the form below or give us a call — we'll arrange a convenient time for a tour.",
    form_title:"Want to see the preschool with your own eyes?", form_text:"Leave a request — we'll show the space, answer your questions and find the right group for your child. We'll send the schedule, events and daily routine.",
    form_call:"Call us", form_card_title:"Book a Tour", form_card_sub:"Fill out the form — we'll get back to you shortly.",
    cta_rating:"Rating on Yandex", cta_c1:"Small groups up to 15", cta_c2:"Licensed kindergarten", intro_skip:"Skip →",
    form_name:"Parent's name", form_phone:"Phone number", form_age:"Child's age", form_submit:"Get Information",
    form_privacy:"We value your privacy and never share your data with third parties.", form_ok:"Thank you! Your request has been received — we'll be in touch soon.",
    footer_tagline:"Growing with love and care every day.", footer_nav:"Navigation", footer_programs:"Programs",
    footer_contacts:"Contacts", footer_rights:"All rights reserved"
  };

  var DICT = { ru: RU, sr: SR, en: EN };
  var PH = { ru: RU_PH,
    sr: { form_name:"Ime roditelja", form_phone:"Telefon" },
    en: { form_name:"Parent's name", form_phone:"Phone number" } };
  var PHONE = { ru:["+7 (499) 283-46-28","+74992834628"], en:["+7 (499) 283-46-28","+74992834628"], sr:["+381 (69) 283-46-28","+381692834628"] };

  /* ---------- content rendered from data (editable in the CMS) ---------- */
  function tr(obj, lang) {
    // pick a localized string, falling back to RU then to any value present
    if (!obj) return '';
    return (obj[lang] != null && obj[lang] !== '') ? obj[lang]
         : (obj.ru != null ? obj.ru : (obj.en || obj.sr || ''));
  }
  function renderTeachers(lang) {
    var grid = document.getElementById('teamGrid');
    if (!grid || !CONTENT || !Array.isArray(CONTENT.teachers)) return;
    var askTxt = (DICT[lang] && DICT[lang].team_ask) || 'Задать вопрос';
    grid.textContent = '';
    CONTENT.teachers.forEach(function (t) {
      var art = document.createElement('article');
      art.className = 'tcard c-' + (t.color || 'purple');

      var photoWrap = document.createElement('div');
      photoWrap.className = 'tcard-photo';
      var img = document.createElement('img');
      img.src = String(t.photo || '').replace(/^\//, ''); // keep paths relative to the site root
      img.alt = tr(t.name, lang);
      img.loading = 'lazy';
      photoWrap.appendChild(img);

      var body = document.createElement('div');
      body.className = 'tcard-body';

      var h3 = document.createElement('h3');
      h3.textContent = tr(t.name, lang);
      body.appendChild(h3);

      var tags = document.createElement('div');
      tags.className = 'tags';
      (t.tags || []).forEach(function (tg) {
        var txt = tr(tg, lang);
        if (!txt) return;
        var span = document.createElement('span');
        span.className = 'tag';
        span.textContent = txt;
        tags.appendChild(span);
      });
      body.appendChild(tags);

      var p = document.createElement('p');
      p.textContent = tr(t.bio, lang);
      body.appendChild(p);

      var a = document.createElement('a');
      a.className = 'btn btn-ghost tcard-ask';
      a.href = '#contact';
      a.textContent = askTxt;
      body.appendChild(a);

      art.appendChild(photoWrap);
      art.appendChild(body);
      grid.appendChild(art);
    });
    try { document.dispatchEvent(new Event('fs:teachers-rendered')); } catch (e) {}
  }
  function renderDynamic(lang) {
    renderTeachers(lang);
  }

  function setLang(lang) {
    if (!DICT[lang]) lang = 'ru';
    currentLang = lang;
    var d = DICT[lang];
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (d[k] != null) el.innerHTML = d[k];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-ph');
      if (PH[lang] && PH[lang][k] != null) el.setAttribute('placeholder', PH[lang][k]);
    });
    // phone
    var ph = PHONE[lang] || PHONE.ru;
    document.querySelectorAll('[data-phone]').forEach(function (el) { el.textContent = ph[0]; el.setAttribute('href', 'tel:' + ph[1]); });
    var pt = document.querySelector('[data-phone-text]'); if (pt) pt.textContent = ph[0];
    var pp = document.querySelector('[data-phone-pill]'); if (pp) pp.setAttribute('href', 'tel:' + ph[1]);
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('.lang button').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-lang') === lang); });
    try { localStorage.setItem('fs-lang', lang); } catch (e) {}
    renderDynamic(lang);
  }
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });
  var saved; try { saved = localStorage.getItem('fs-lang'); } catch (e) {}
  if (saved && saved !== 'ru') setLang(saved);

  /* load editable content, then render the data-driven sections in the current language */
  fetch('content/teachers.json', { cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) { if (data) { CONTENT = data; renderDynamic(currentLang); } })
    .catch(function () {});

  /* ---------- nav ---------- */
  var nav = document.querySelector('.nav');
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 24); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var burger = document.querySelector('.burger'), menu = document.querySelector('.mobile-menu');
  function toggle(f) { var o = f !== undefined ? f : !menu.classList.contains('open'); menu.classList.toggle('open', o); burger.classList.toggle('open', o); document.body.style.overflow = o ? 'hidden' : ''; }
  burger.addEventListener('click', function () { toggle(); });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { toggle(false); }); });

  /* ---------- reveal ---------- */
  var rev = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    rev.forEach(function (el) { io.observe(el); });
    setTimeout(function () { rev.forEach(function (el) { var r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add('in'); }); }, 2400);
  } else { rev.forEach(function (el) { el.classList.add('in'); }); }

  /* ---------- radial day clock — one hand, one event at a time ---------- */
  (function () {
    var clock = document.getElementById('dayClock');
    if (!clock) return;
    var items = Array.prototype.slice.call(clock.querySelectorAll('.ev.clk-item'));
    var dots = Array.prototype.slice.call(clock.querySelectorAll('.cd'));
    var hand = clock.querySelector('.clk-hand');
    var n = items.length;
    if (!n) return;

    var START = 210;     // 07:00 — the hand points at the 7 (morning arrival)
    var STEP = 1650;     // ms each event stays lit — brisk but readable
    var inView = false, timer = null, i = 0, primed = false;

    function setHand(deg) { if (hand) hand.style.transform = 'rotate(' + deg + 'deg)'; }

    // The hand arrives → the matching card appears and its dot pulses; the hand
    // moves on → that card fades and the next one shows. One activity at a time,
    // on both desktop and mobile (on phones the card sits in a slot below the clock).
    function tick() {
      var idx = ((i % n) + n) % n;
      items.forEach(function (el, j) { el.classList.toggle('on', j === idx); });
      dots.forEach(function (d, j) { d.classList.toggle('pulse', j === idx); });
      setHand(START + i * 30);   // i only grows → the hand always advances clockwise
      i++;
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function loop() {
      if (timer) return;
      clock.classList.remove('is-static');
      if (!primed) {
        // place the hand at 07:00 with no transition, so it never whips around
        if (hand) { hand.style.transition = 'none'; }
        tick();
        if (hand) {
          void hand.getBoundingClientRect();
          hand.style.transition = 'transform .55s cubic-bezier(.45,.05,.35,1)';
        }
        primed = true;
      }
      timer = setInterval(tick, STEP);
    }

    // fully-static fallback (reduced motion): list every step, no ticking
    function showAll() {
      stop();
      clock.classList.add('is-static');
      items.forEach(function (el) { el.classList.add('on'); });
      dots.forEach(function (d) { d.classList.add('pulse'); });
      if (hand) { hand.style.transition = 'none'; }
      setHand(START);
    }

    function apply() {
      if (reduce) { showAll(); return; }
      if (inView) loop(); else stop();
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { inView = e.isIntersecting; });
        apply();
      }, { threshold: 0.2 }).observe(clock);
    } else { inView = true; }

    apply();
  })();

  /* ---------- phone mask ---------- */
  var phone = document.getElementById('phoneInput');
  if (phone) {
    phone.addEventListener('input', function () {
      var d = this.value.replace(/\D/g, '').slice(0, 15);
      this.value = d ? '+' + d : '';
    });
  }

  /* ---------- form ---------- */
  var form = document.getElementById('leadForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('[name="name"]'), tel = form.querySelector('[name="phone"]');
      if (!name.value.trim()) { name.focus(); name.style.borderColor = 'var(--coral)'; return; }
      if (tel.value.replace(/\D/g, '').length < 6) { tel.focus(); tel.style.borderColor = 'var(--coral)'; return; }
      form.reset();
      var ok = document.getElementById('formSuccess');
      if (ok) { ok.classList.add('show'); setTimeout(function () { ok.classList.remove('show'); }, 6000); }
    });
    form.querySelectorAll('input').forEach(function (i) { i.addEventListener('input', function () { this.style.borderColor = ''; }); });
  }

  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

  /* ---------- horizontal sliders (groups / teachers): swipe + arrows + gentle autoplay ---------- */
  function initSliders() {
    document.querySelectorAll('.slider').forEach(function (s) {
      var track = s.querySelector('.slider-track');
      if (!track) return;
      if (s._sliderReady) { if (s._sliderUpd) s._sliderUpd(); return; } // re-measure only
      s._sliderReady = 1;
      var prev = s.querySelector('.slider-nav.prev'), next = s.querySelector('.slider-nav.next');
      function page() { return Math.max(track.clientWidth * 0.86, 240); }
      function atStart() { return track.scrollLeft <= 2; }
      function atEnd() { return track.scrollLeft >= track.scrollWidth - track.clientWidth - 2; }
      function update() {
        var scrollable = track.scrollWidth - track.clientWidth > 4;
        if (prev) prev.disabled = !scrollable || atStart();
        if (next) next.disabled = !scrollable || atEnd();
      }
      if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -page(), behavior: 'smooth' }); });
      if (next) next.addEventListener('click', function () { track.scrollBy({ left: page(), behavior: 'smooth' }); });
      track.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      s._sliderUpd = update;
      update();

      if (reduce) return;
      /* gentle auto-advance: pauses on hover / touch / manual scroll, only while visible */
      var paused = false, inView = false, timer = null, resumeT = null;
      function bump() { paused = true; clearTimeout(resumeT); resumeT = setTimeout(function () { paused = false; }, 4000); }
      function autoTick() {
        if (paused || !inView) return;
        if (atEnd()) track.scrollTo({ left: 0, behavior: 'smooth' });
        else track.scrollBy({ left: page(), behavior: 'smooth' });
      }
      s.addEventListener('mouseenter', function () { paused = true; });
      s.addEventListener('mouseleave', function () { paused = false; });
      track.addEventListener('touchstart', bump, { passive: true });
      track.addEventListener('scroll', bump, { passive: true });
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (es) { es.forEach(function (e) { inView = e.isIntersecting; }); }, { threshold: 0.35 }).observe(s);
      } else { inView = true; }
      timer = setInterval(autoTick, 4800);
    });
  }
  initSliders();
  // teacher cards render asynchronously → re-scan once content is in
  document.addEventListener('fs:teachers-rendered', initSliders);
})();
