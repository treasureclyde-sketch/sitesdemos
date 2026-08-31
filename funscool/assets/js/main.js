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
    hero_title:"Međunarodni vrtić FunsCool u Beogradu", hero_tag:"Srećno detinjstvo — svakog dana", hero_sub:"Boutique vrtić za decu 1,5–7 godina u centru Beograda (Dorćol): male grupe, tri jezika svakog dana, nežna adaptacija, Montessori i Waldorf.",
    cta_programs:"Naši programi", addr:"Dorćol, Popovićeva 14A, Beograd", addr_sub:"Mirno centralno mesto, sigurno okruženje",
    rating:"Ocena ustanove na Yandex-u",
    f1_t:"Male grupe", f1_d:"do 15 dece", f2_t:"Blaga adaptacija", f2_d:"bez stresa i suza",
    f3_t:"Višejezično okruženje", f3_d:"ruski, srpski, engleski", f4_t:"Autorski program", f4_d:"zasnovan na Montessori i Waldorf pristupima",
    sreda_eyebrow:"Bezbedan razvoj svakog dana", sreda_title:"Razvojno okruženje vrtića u Beogradu koje raste zajedno sa detetom",
    sreda_text:"Osmišljeni prostori, boje, materijali i zone pomažu deci da rastu samopouzdano, samostalno i srećno.",
    sreda_1:"Boje i junaci po Waldorf sistemu za svaki uzrast", sreda_2:"7–8 razvojnih zona u svakoj grupi u zavisnosti od uzrasta",
    sreda_3:"Bezbedni materijali i prostor za slobodno istraživanje", sreda_4:"Razvoj u svakoj fazi — od senzorike do stvaralaštva i projekata",
    prog_eyebrow:"Uzrasne grupe", prog_title:"Grupe vrtića FunsCool u Beogradu — od 1,5 do 7 godina", prog_sub:"Svaka grupa je važna faza u razvoju vašeg deteta.",
    p1_name:"Bebi-Fan", p1_age:"1,5–2,5 godine", p1_desc:"Prvi koraci ka samostalnosti u atmosferi brige i sigurnosti.",
    p1_l1:"Senzorni zidovi", p1_l2:"Zona vode i peska", p1_l3:"Velike bezbedne igračke", p1_l4:"Ogledala i gimnastika", p1_l5:"Razvoj govora kroz igru",
    p2_name:"Enerdži-Fan", p2_age:"2,5–3,5 godine", p2_desc:"Pokret, red i samostalnost kroz igru.",
    p2_l1:"Zona za pokret", p2_l2:"Konstruktorska", p2_l3:"Crtanje i stvaralaštvo", p2_l4:"Kuća, prodavnica, pospremanje", p2_l5:"Čitanje i mirne igre",
    p3_name:"Diskaveri-Fan", p3_age:"3,5–4,5 godine", p3_desc:"Istražujemo, probamo, stvaramo i razumemo svet.",
    p3_l1:"Zona ogleda i eksperimenata", p3_l2:"Projektna aktivnost", p3_l3:"Beleženje rezultata", p3_l4:"Montessori materijali", p3_l5:"Rad po koracima (4–6 faza)",
    p4_name:"Kreativ-Fan", p4_age:"4,5–6 godina", p4_desc:"Stvaralaštvo, govor i priprema za školu kroz interesovanje.",
    p4_l1:"Pozorišna i scenska zona", p4_l2:"Prezentacije i projekti", p4_l3:"Konstruktori i materijali", p4_l4:"Montessori: matematika i govor", p4_l5:"Geografija i svet oko nas",
    p5_name:"Preskul", p5_age:"5,5–7 godina", p5_desc:"Priprema za školu, projekti, jezici i samopouzdanje.",
    p5_l1:"Priprema za školu", p5_l2:"Projekti i prezentacije", p5_l3:"Jezici: ru / sr / en", p5_l4:"Logika i matematika", p5_l5:"Samopouzdanje i samostalnost",
    learn_more:"Upoznajte se", p_more_t:"Ne znate koja grupa odgovara?", p_more_d:"Dođite na obilazak — pokazaćemo prostor i pronaći grupu za vaše dete.",
    play_eyebrow:"Svež vazduh", play_title:"Sopstveno bezbedno dvorište i vrtić u centru Beograda",
    play_1:"Šetnje dva puta dnevno na sopstvenom igralištu vrtića", play_2:"Ograđeno i potpuno bezbedno",
    play_3:"Puno pokreta, igre i otkrića svakog dana", play_4:"Čist vazduh i zelenilo u mirnom centru Dorćola",
    about_eyebrow:"Kuća sa istorijom", about_title:"Kuća sa istorijom u srcu Beograda",
    about_text:"Funscool je licencirani vrtić koji radi po državnom programu i savremenim pedagoškim pristupima. Cenimo tradiciju, profesionalizam i individualni pristup svakom detetu.",
    about_b1:"Licencirani vrtić", about_b2:"Državni program", about_b3:"Profesionalni tim",
    day_eyebrow:"Kako izgleda dan", day_title:"Kako izgleda dan u međunarodnom vrtiću FunsCool",
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
    team_eyebrow:"Sa ljubavlju i brigom", team_title:"Vaspitači međunarodnog vrtića FunsCool",
    team_sub:"Četiri vaspitača i administrator koji dan deteta drže mirnim, toplim i razumljivim.", team_ask:"Postavite pitanje",
    news_eyebrow:"Novosti i akcije", news_title:"Novosti i akcije", news_sub:"Aktuelni događaji, praznici i posebne ponude našeg vrtića.", news_type_news:"Novost", news_type_promo:"Akcija",
    /* teacher cards are rendered from content/teachers.json */
    mom_eyebrow:"Svaki trenutak je važan", mom_title:"Srećni trenuci svakog dana",
    mom_sub:"Igramo se, stvaramo, istražujemo i rastemo zajedno. Svaki dan u Funscool-u ispunjen je radošću i otkrićima.",
    mom_note:"Bezbedno, brižno i inspirativno okruženje — od jutra do večeri.",
    faq_eyebrow:"Česta pitanja", faq_title:"Česta pitanja o vrtiću FunsCool u Beogradu",
    faq_q1:"Kako izgleda adaptacija?", faq_a1:"Počinjemo kratkim posetama zajedno sa roditeljem i postepeno produžavamo vreme. Tempo prilagođavamo detetu — nežno, bez stresa i suza.",
    faq_q2:"Da li možemo početi sa pola dana?", faq_a2:"Da. Mnoga deca počinju sa pola dana, a zatim postepeno prelaze na ceo dan kada su spremna.",
    faq_q3:"Koji jezici se koriste?", faq_a3:"Ruski, srpski i engleski koriste se svakodnevno. Deca prirodno usvajaju višejezično okruženje — kroz igru, aktivnosti, pesme, čitanje i živu komunikaciju.",
    faq_q4:"Kako je organizovana ishrana?", faq_a4:"Pet obroka dnevno: doručak, voćna užina, ručak, užina i večera. Uravnotežen jelovnik; vodimo računa o posebnostima i alergijama.",
    faq_q5:"Koliko dece ima u grupi?", faq_a5:"Male grupe do 15 dece — tako svako dete dobija dovoljno pažnje vaspitača.",
    faq_q6:"Kako možemo zakazati posetu?", faq_a6:"Ostavite prijavu u formi ispod ili nas pozovite — dogovorićemo termin obilaska.", faq_q7:"Od kog uzrasta primate decu?", faq_a7:"Decu primamo otprilike od 1 godine — kada dete sigurno hoda, jede kašikom i pije iz šolje. Za najmlađe postoji adaptaciona grupa Baby-Fun.", faq_q8:"Da li postoje šetnje i sopstveno dvorište?", faq_a8:"Da. Deca borave napolju dva puta dnevno u sopstvenom, ograđenom dvorištu uz vrtić — bez odlaska na javna igrališta i prelaska ulica.",
    form_title:"Želite da vidite vrtić svojim očima?", form_text:"Ostavite zahtev — pokazaćemo prostor, odgovoriti na pitanja i pronaći grupu za vaše dete. Poslaćemo raspored, događaje i dnevni režim.",
    form_call:"Pozovite nas", form_card_title:"Zakažite obilazak", form_card_sub:"Popunite formu — javićemo vam se u najkraćem roku.",
    cta_rating:"Ocena na Yandexu", cta_c1:"Male grupe do 15", cta_c2:"Licencirani vrtić", intro_skip:"Preskoči →",
    form_name:"Ime roditelja", form_phone:"Telefon", form_age:"Uzrast deteta", form_submit:"Dobijte informacije",
    form_privacy:"Poštujemo vašu privatnost i ne delimo podatke sa trećim licima.", form_ok:"Hvala! Zahtev je primljen — javićemo vam se uskoro.",
    form_group:"Grupa", form_group_ph:"Izaberite grupu", form_age_lbl:"Uzrast", form_child:"Ime deteta", form_wa:"Pošalji na WhatsApp", form_err:"Slanje nije uspelo. Pišite nam na WhatsApp:",
    form_add_child:"Dodaj dete", form_contact_hint:"Ostavite telefon ili e-mail — kako vam odgovara.",
    footer_tagline:"Razvijamo sa ljubavlju i brigom svakog dana.", footer_nav:"Navigacija", footer_programs:"Programi",
    footer_contacts:"Kontakt", footer_rights:"Sva prava zadržana"
  };

  var EN = {
    brand_sub:"preschool", nav_about:"About", nav_programs:"Programs", nav_env:"Environment",
    nav_parents:"For parents", nav_contacts:"Contacts", nav_teachers:"Teachers", cta_book:"Book a Tour", cta_book_short:"Book a Tour",
    hero_title:"FunsCool International Preschool in Belgrade", hero_tag:"A happy childhood — every day", hero_sub:"A boutique preschool for children 1.5–7 in central Belgrade (Dorćol): small groups, three languages every day, gentle adaptation, Montessori &amp; Waldorf.",
    cta_programs:"Our programs", addr:"Dorćol, Popovića 14A, Belgrade", addr_sub:"Quiet central location, safe neighborhood",
    rating:"Rated on Yandex",
    f1_t:"Small groups", f1_d:"up to 15 children", f2_t:"Gentle adaptation", f2_d:"a stress-free start",
    f3_t:"Multilingual environment", f3_d:"Russian, Serbian, English", f4_t:"Exclusive curriculum", f4_d:"based on Montessori and Waldorf approach",
    sreda_eyebrow:"Safe development every day", sreda_title:"A preschool environment in Belgrade designed to grow with your child",
    sreda_text:"Thoughtful spaces, colors, materials and zones help children grow confident, independent and happy.",
    sreda_1:"Colors and characters by the Waldorf system for each age", sreda_2:"7–8 developmental zones in each group depending on age",
    sreda_3:"Safe materials and space for free exploration", sreda_4:"Development at every stage — from sensory play to creativity and projects",
    prog_eyebrow:"Age groups", prog_title:"FunsCool preschool groups in Belgrade — from 1.5 to 7 years", prog_sub:"Each group is an important stage in your child's development.",
    p1_name:"Baby-Fun", p1_age:"1.5–2.5 years", p1_desc:"First steps toward independence in an atmosphere of care and safety.",
    p1_l1:"Sensory walls", p1_l2:"Water and sand area", p1_l3:"Large safe toys", p1_l4:"Mirrors and gymnastics", p1_l5:"Speech development through play",
    p2_name:"Energy-Fun", p2_age:"2.5–3.5 years", p2_desc:"Movement, order and independence through play.",
    p2_l1:"Movement zone", p2_l2:"Construction area", p2_l3:"Drawing and creativity", p2_l4:"Home, shop, tidying up", p2_l5:"Reading and calm games",
    p3_name:"Discovery-Fun", p3_age:"3.5–4.5 years", p3_desc:"We explore, try, create and understand the world.",
    p3_l1:"Experiments zone", p3_l2:"Project activity", p3_l3:"Recording results", p3_l4:"Montessori materials", p3_l5:"Step-by-step work (4–6 stages)",
    p4_name:"Creative-Fun", p4_age:"4.5–6 years", p4_desc:"Creativity, speech and school preparation through interest.",
    p4_l1:"Theater and stage zone", p4_l2:"Presentations and projects", p4_l3:"Building sets and materials", p4_l4:"Montessori: math and speech", p4_l5:"Geography and the world around",
    p5_name:"Pre-school", p5_age:"5,5–7 years", p5_desc:"School preparation, projects, languages and self-confidence.",
    p5_l1:"School preparation", p5_l2:"Projects and presentations", p5_l3:"Languages: ru / sr / en", p5_l4:"Logic and math", p5_l5:"Confidence and independence",
    learn_more:"Learn more", p_more_t:"Not sure which group fits?", p_more_d:"Come for a tour — we'll show the space and find the right group for your child.",
    play_eyebrow:"Fresh air", play_title:"Our own safe playground and a preschool in central Belgrade",
    play_1:"Walks twice a day on the preschool's own playground", play_2:"Fenced and completely safe",
    play_3:"Plenty of movement, play and discovery every day", play_4:"Clean air and greenery in quiet central Dorćol",
    about_eyebrow:"A house with history", about_title:"A house with history in the heart of Belgrade",
    about_text:"Funscool is a licensed preschool operating under the state program and modern pedagogical approaches. We value tradition, professionalism and an individual approach to every child.",
    about_b1:"Licensed preschool", about_b2:"State program", about_b3:"Professional team",
    day_eyebrow:"How the day goes", day_title:"A day at FunsCool International Preschool",
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
    team_eyebrow:"With love and care", team_title:"The team at FunsCool International Preschool",
    team_sub:"Four teachers and an administrator who keep a child's day calm, warm and clear.", team_ask:"Ask a question",
    news_eyebrow:"News & offers", news_title:"News & offers", news_sub:"Latest events, celebrations and special offers from our kindergarten.", news_type_news:"News", news_type_promo:"Offer",
    /* teacher cards are rendered from content/teachers.json */
    mom_eyebrow:"Every moment matters", mom_title:"Happy moments, every single day",
    mom_sub:"We play, create, explore and grow together. Every day at Funscool is filled with joy and new discoveries.",
    mom_note:"A safe, caring and inspiring environment — from morning to evening.",
    faq_eyebrow:"Frequent questions", faq_title:"Frequently asked questions about FunsCool preschool in Belgrade",
    faq_q1:"What does adaptation look like?", faq_a1:"We start with short visits together with a parent and gradually extend the time. We match the pace to the child — gently, without stress or tears.",
    faq_q2:"Can we start with half a day?", faq_a2:"Yes. Many children start with half a day and then smoothly move to a full day when they're ready.",
    faq_q3:"Which languages are used?", faq_a3:"Russian, Serbian and English are used every day. Children absorb the multilingual environment naturally — through play, activities, songs, reading and real conversation.",
    faq_q4:"How are meals organised?", faq_a4:"Five meals a day: breakfast, a fruit snack, lunch, a snack and dinner. A balanced menu; we account for special needs and allergies.",
    faq_q5:"How many children are in a group?", faq_a5:"Small groups of up to 15 children — so each child gets enough of the teacher's attention.",
    faq_q6:"How can we book a visit?", faq_a6:"Leave a request in the form below or give us a call — we'll arrange a convenient time for a tour.", faq_q7:"From what age do you accept children?", faq_a7:"We welcome children from around age 1 — once a child walks confidently, eats with a spoon and drinks from a cup. For the youngest there is the Baby-Fun adaptation group.", faq_q8:"Are there walks and an own playground?", faq_a8:"Yes. Children spend time outdoors twice a day in our own enclosed playground on the preschool grounds — no public playgrounds and no road crossings.",
    form_title:"Want to see the preschool with your own eyes?", form_text:"Leave a request — we'll show the space, answer your questions and find the right group for your child. We'll send the schedule, events and daily routine.",
    form_call:"Call us", form_card_title:"Book a Tour", form_card_sub:"Fill out the form — we'll get back to you shortly.",
    cta_rating:"Rating on Yandex", cta_c1:"Small groups up to 15", cta_c2:"Licensed kindergarten", intro_skip:"Skip →",
    form_name:"Parent's name", form_phone:"Phone number", form_age:"Child's age", form_submit:"Get Information",
    form_privacy:"We value your privacy and never share your data with third parties.", form_ok:"Thank you! Your request has been received — we'll be in touch soon.",
    form_group:"Group", form_group_ph:"Choose a group", form_age_lbl:"Age", form_child:"Child's name", form_wa:"Send via WhatsApp", form_err:"Couldn't send. Message us on WhatsApp:",
    form_add_child:"Add child", form_contact_hint:"Leave a phone or e-mail — whichever suits you.",
    footer_tagline:"Growing with love and care every day.", footer_nav:"Navigation", footer_programs:"Programs",
    footer_contacts:"Contacts", footer_rights:"All rights reserved"
  };

  var DICT = { ru: RU, sr: SR, en: EN };
  var PH = { ru: RU_PH,
    sr: { form_name:"Ime roditelja", form_phone:"Telefon", form_child:"Ime deteta", form_email:"E-mail" },
    en: { form_name:"Parent's name", form_phone:"Phone number", form_child:"Child's name", form_email:"E-mail" } };
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
  function renderFaq(lang) {
    // FAQ accordion rendered from content/faq.json (CMS-editable). The static
    // markup in index.html stays as a no-JS / crawler fallback; this replaces it.
    var list = document.getElementById('faqList');
    if (!list || !CONTENT || !Array.isArray(CONTENT.faq)) return;
    list.textContent = '';
    CONTENT.faq.forEach(function (item) {
      var q = tr(item.q, lang), a = tr(item.a, lang);
      if (!q) return;
      var det = document.createElement('details'); det.className = 'qa';
      var sum = document.createElement('summary');
      var qspan = document.createElement('span'); qspan.textContent = q; sum.appendChild(qspan);
      var ic = document.createElement('span'); ic.className = 'qa-ic';
      ic.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
      sum.appendChild(ic); det.appendChild(sum);
      var ans = document.createElement('div'); ans.className = 'qa-a';
      var p = document.createElement('p'); p.textContent = a; ans.appendChild(p);
      det.appendChild(ans); list.appendChild(det);
    });
  }
  function renderNews(lang) {
    // "Новости и акции" cards from content/news.json (CMS-editable). The whole
    // section stays hidden until at least one item with text exists.
    var sec = document.getElementById('news');
    var list = document.getElementById('newsList');
    if (!sec || !list) return;
    var items = (CONTENT && Array.isArray(CONTENT.news)) ? CONTENT.news : [];
    var visible = items.filter(function (it) { return it && (tr(it.title, lang) || tr(it.text, lang)); });
    list.textContent = '';
    if (!visible.length) { sec.hidden = true; return; }
    var labels = {
      news: (DICT[lang] && DICT[lang].news_type_news) || 'Новость',
      promo: (DICT[lang] && DICT[lang].news_type_promo) || 'Акция'
    };
    visible.forEach(function (it) {
      var ty = (it.type === 'promo') ? 'promo' : 'news';
      var card = document.createElement('article');
      card.className = 'news-card';
      var photo = String(it.photo || '').replace(/^\//, '');
      if (photo) {
        var wrap = document.createElement('div');
        wrap.className = 'news-card-img';
        var img = document.createElement('img');
        img.src = photo; img.alt = tr(it.title, lang); img.loading = 'lazy';
        wrap.appendChild(img);
        var badge = document.createElement('span');
        badge.className = 'news-badge ' + ty; badge.textContent = labels[ty];
        wrap.appendChild(badge);
        card.appendChild(wrap);
      }
      var body = document.createElement('div');
      body.className = 'news-card-body';
      if (!photo) {
        var b2 = document.createElement('span');
        b2.className = 'news-badge news-badge-inline ' + ty; b2.textContent = labels[ty];
        body.appendChild(b2);
      }
      if (it.date) {
        var d = document.createElement('span');
        d.className = 'news-date'; d.textContent = it.date;
        body.appendChild(d);
      }
      var h3 = document.createElement('h3');
      h3.textContent = tr(it.title, lang);
      body.appendChild(h3);
      var txt = tr(it.text, lang);
      if (txt) { var p = document.createElement('p'); p.textContent = txt; body.appendChild(p); }
      card.appendChild(body);
      list.appendChild(card);
    });
    sec.hidden = false;
  }
  function renderDynamic(lang) {
    renderTeachers(lang);
    renderFaq(lang);
    renderNews(lang);
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
  (function loadContent() {
    var files = ['content/teachers.json', 'content/faq.json', 'content/news.json'];
    Promise.all(files.map(function (f) {
      return fetch(f, { cache: 'no-cache' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .catch(function () { return null; });
    })).then(function (parts) {
      CONTENT = CONTENT || {};
      parts.forEach(function (d) {
        if (d && typeof d === 'object') {
          for (var k in d) { if (Object.prototype.hasOwnProperty.call(d, k)) CONTENT[k] = d[k]; }
        }
      });
      renderDynamic(currentLang);
    });
  })();

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
    var inView = false, timer = null, resumeT = null, pos = 0, primed = false;

    function setHand(deg) { if (hand) hand.style.transform = 'rotate(' + deg + 'deg)'; }
    function render() {
      var idx = ((pos % n) + n) % n;
      items.forEach(function (el, j) { el.classList.toggle('on', j === idx); });
      dots.forEach(function (d, j) { d.classList.toggle('pulse', j === idx); });
      setHand(START + pos * 30);
    }
    function tick() { pos++; render(); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function startInterval() { if (!timer) timer = setInterval(tick, STEP); }
    function prime() {
      if (primed) return;
      if (hand) { hand.style.transition = 'none'; }
      render();
      if (hand) { void hand.getBoundingClientRect(); hand.style.transition = 'transform .55s cubic-bezier(.45,.05,.35,1)'; }
      primed = true;
    }
    function loop() { clock.classList.remove('is-static'); prime(); startInterval(); }

    // fully-static fallback (reduced motion): list every step, no ticking
    function showAll() {
      stop();
      clock.classList.add('is-static');
      items.forEach(function (el) { el.classList.add('on'); });
      dots.forEach(function (d) { d.classList.add('pulse'); });
      if (hand) { hand.style.transition = 'none'; }
      setHand(START);
    }

    // click a dot (or card) → the hand sweeps there by the shortest path
    function goTo(j) {
      if (reduce) return;
      clock.classList.remove('is-static');
      prime();
      var idx = ((pos % n) + n) % n;
      var d = (((j - idx) % n) + n) % n;
      if (d > n / 2) d -= n;              // shortest direction (may go back a little)
      pos += d; render();
      stop(); clearTimeout(resumeT);      // hold on the chosen step, then resume drifting
      if (inView) resumeT = setTimeout(startInterval, 5000);
    }
    dots.forEach(function (d, j) { d.addEventListener('click', function () { goTo(j); }); });
    items.forEach(function (el, j) { el.addEventListener('click', function () { goTo(j); }); });

    function apply() {
      if (reduce) { showAll(); return; }
      if (inView) loop(); else { stop(); clearTimeout(resumeT); }
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { inView = e.isIntersecting; });
        apply();
      }, { threshold: 0.2 }).observe(clock);
    } else { inView = true; }

    apply();
  })();

  /* ---------- booking modal (open on any "Записаться"/#contact link) ---------- */
  (function () {
    var modal = document.getElementById('bookModal');
    if (!modal) return;
    var lastFocus = null;
    function open(e) {
      if (e) e.preventDefault();
      lastFocus = document.activeElement;
      modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      var first = modal.querySelector('select, input:not([type=hidden]), button');
      setTimeout(function () { try { first && first.focus(); } catch (_) {} }, 60);
    }
    function close() {
      modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      try { lastFocus && lastFocus.focus(); } catch (_) {}
    }
    document.querySelectorAll('a[href="#contact"]').forEach(function (a) { a.addEventListener('click', open); });
    modal.querySelectorAll('[data-close]').forEach(function (el) { el.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });

    /* ----- children: each child has its own group; "+ Добавить ребёнка" adds more ----- */
    var groupAge = { 'Беби-Фан': '1,5–2,5', 'Энерджи-Фан': '2,5–3,5', 'Дискавери-Фан': '3,5–4,5', 'Креатив-Фан': '4,5–6', 'Прескул': '6–7' };
    var childList = document.getElementById('childList');
    var addChildBtn = document.getElementById('addChild');
    function refreshRemove() {
      var rows = childList.querySelectorAll('.child-row');
      rows.forEach(function (r) { var rm = r.querySelector('.child-remove'); if (rm) rm.hidden = rows.length < 2; });
    }
    function wireRow(row) {
      var g = row.querySelector('.c-group'), age = row.querySelector('.c-age');
      if (g && age) g.addEventListener('change', function () { age.textContent = groupAge[g.value] || ''; });
      var rm = row.querySelector('.child-remove');
      if (rm) rm.addEventListener('click', function () { row.remove(); refreshRemove(); });
    }
    if (childList) childList.querySelectorAll('.child-row').forEach(wireRow);
    if (addChildBtn && childList) addChildBtn.addEventListener('click', function () {
      var clone = childList.querySelector('.child-row').cloneNode(true);
      clone.querySelectorAll('input, select').forEach(function (el) { el.value = ''; el.style.borderColor = ''; });
      var age = clone.querySelector('.c-age'); if (age) age.textContent = '';
      childList.appendChild(clone); wireRow(clone); refreshRemove();
      var nm = clone.querySelector('.c-name'); if (nm) nm.focus();
    });

    /* phone: country selector + length-aware mask */
    var cc = document.getElementById('phoneCC'), pin = document.getElementById('phoneInput'), pfull = document.getElementById('phoneFull');
    function ccOpt() { return cc.options[cc.selectedIndex]; }
    function fmt(digits, country) {
      if (country === 'rs') { // +381 6X XXX XXXX  (8–9 digits)
        var d = digits.slice(0, 9), o = '';
        if (d.length) o = d.slice(0, 2);
        if (d.length > 2) o += ' ' + d.slice(2, 5);
        if (d.length > 5) o += ' ' + d.slice(5, 9);
        return o;
      }
      var r = digits.slice(0, 10), s = ''; // +7 (999) 123-45-67
      if (r.length) s = '(' + r.slice(0, 3);
      if (r.length >= 3) s += ') ' + r.slice(3, 6);
      if (r.length >= 6) s += '-' + r.slice(6, 8);
      if (r.length >= 8) s += '-' + r.slice(8, 10);
      return s;
    }
    function sync() {
      if (!pin) return;
      var country = cc ? cc.value : 'ru';
      pin.value = fmt(pin.value.replace(/\D/g, ''), country);
      if (pfull) pfull.value = pin.value ? (ccOpt().getAttribute('data-dial') + ' ' + pin.value) : '';
    }
    if (pin) pin.addEventListener('input', sync);
    if (cc) cc.addEventListener('change', function () { if (pin) { pin.placeholder = ccOpt().getAttribute('data-ph') || ''; sync(); } });

    /* ----- submit → FormSubmit.co; WhatsApp fallback if it can't send ----- */
    var form = document.getElementById('leadForm');
    if (!form) return;
    var emailInput = document.getElementById('emailInput');
    form.querySelectorAll('input, select').forEach(function (i) { i.addEventListener('input', function () { this.style.borderColor = ''; }); });
    function collectChildren() {
      var out = [];
      childList.querySelectorAll('.child-row').forEach(function (r) {
        var nm = (r.querySelector('.c-name').value || '').trim();
        var g = r.querySelector('.c-group').value || '';
        if (!nm && !g) return;
        out.push({ name: nm, group: g, age: groupAge[g] || '' });
      });
      return out;
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var parent = form.querySelector('[name="parent"]');
      var kids = collectChildren();
      var digits = pin ? pin.value.replace(/\D/g, '') : '';
      var need = (cc && cc.value === 'rs') ? 8 : 10;
      var phoneOk = digits.length >= need;
      var emailVal = emailInput ? emailInput.value.trim() : '';
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
      var firstName = childList.querySelector('.c-name');
      if (!kids.length || !kids[0].name) { if (firstName) { firstName.focus(); firstName.style.borderColor = 'var(--coral)'; } return; }
      if (parent && !parent.value.trim()) { parent.focus(); parent.style.borderColor = 'var(--coral)'; return; }
      if (!phoneOk && !emailOk) {
        if (pin) pin.style.borderColor = 'var(--coral)';
        if (emailInput) emailInput.style.borderColor = 'var(--coral)';
        (emailVal && emailInput ? emailInput : pin).focus();
        return;
      }
      sync();
      var summary = kids.map(function (k, i) {
        return (i + 1) + ') ' + (k.name || '—') + (k.group ? ' — ' + k.group + (k.age ? ' (' + k.age + ')' : '') : '');
      }).join('\n');
      var honey = form.querySelector('[name="_honey"]');
      var payload = {
        children: kids,
        parent: parent ? parent.value.trim() : '',
        phone: phoneOk && pfull ? pfull.value : '',
        email: emailOk ? emailVal : '',
        hp: honey ? honey.value : ''
      };
      var ok = document.getElementById('formSuccess');
      var errBox = document.getElementById('formError');
      var wa = document.getElementById('waFallback');
      var btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      fetch('/.netlify/functions/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        .then(function (r) {
          if (!r.ok) throw new Error('http ' + r.status);
          if (ok) ok.classList.add('show');
          form.reset(); if (pin) pin.value = '';
          var rows = childList.querySelectorAll('.child-row');
          for (var i = rows.length - 1; i > 0; i--) rows[i].remove();
          var f = childList.querySelector('.child-row');
          if (f) { f.querySelectorAll('input, select').forEach(function (el) { el.value = ''; }); var a = f.querySelector('.c-age'); if (a) a.textContent = ''; }
          refreshRemove();
        })
        .catch(function () {
          var text = 'Здравствуйте! Хочу записаться на экскурсию в Funscool.\nДети:\n' + summary + '\n'
            + (parent && parent.value ? 'Родитель: ' + parent.value + '\n' : '')
            + (phoneOk && pfull ? 'Телефон: ' + pfull.value + '\n' : '')
            + (emailOk ? 'E-mail: ' + emailVal : '');
          if (wa) { wa.href = 'https://wa.me/381644445550?text=' + encodeURIComponent(text); wa.hidden = false; }
          if (errBox) errBox.hidden = false;
        })
        .then(function () { if (btn) btn.disabled = false; });
    });
  })();

  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

  /* ---------- horizontal sliders (groups / teachers): swipe + arrows + gentle autoplay ---------- */
  function initSliders() {
    document.querySelectorAll('.slider').forEach(function (s) {
      var track = s.querySelector('.slider-track');
      if (!track) return;
      if (s._sliderReady) { if (s._sliderUpd) s._sliderUpd(); return; } // re-measure only
      s._sliderReady = 1;
      var prev = s.querySelector('.slider-nav.prev'), next = s.querySelector('.slider-nav.next');
      function cardStep() {
        var first = track.children[0];
        var gap = parseFloat(getComputedStyle(track).columnGap) || 22;
        return first ? first.getBoundingClientRect().width + gap : 300;
      }
      function maxScroll() { return track.scrollWidth - track.clientWidth; }
      // move a whole page of cards, then round to the nearest card boundary so
      // the left edge is always flush (no half-cut cards)
      function go(dir) {
        var cw = cardStep();
        var per = Math.max(1, Math.floor((track.clientWidth + 4) / cw));
        var target = Math.round((track.scrollLeft + dir * per * cw) / cw) * cw;
        target = Math.max(0, Math.min(target, maxScroll()));
        track.scrollTo({ left: target, behavior: 'smooth' });
      }
      function atStart() { return track.scrollLeft <= 2; }
      function atEnd() { return track.scrollLeft >= maxScroll() - 2; }
      function update() {
        var scrollable = maxScroll() > 4;
        if (prev) prev.disabled = !scrollable || atStart();
        if (next) next.disabled = !scrollable || atEnd();
      }
      if (prev) prev.addEventListener('click', function () { go(-1); });
      if (next) next.addEventListener('click', function () { go(1); });
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
        else go(1);
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
