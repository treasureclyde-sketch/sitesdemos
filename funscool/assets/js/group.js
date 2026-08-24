/* Funscool — group landing pages (data-driven, RU/SR/EN).
   One template renders any group by ?g=<slug>. Baby-Fun filled in first. */
(function () {
  var ICON = {
    kids:'<circle cx="9" cy="8" r="3"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.2"/><path d="M15 20a5 5 0 0 1 6.5-4.8"/>',
    adults:'<circle cx="8" cy="7" r="3"/><circle cx="16" cy="7" r="3"/><path d="M2 20a6 6 0 0 1 12 0M10 20a6 6 0 0 1 12 0"/>',
    heart:'<path d="M12 21s-7-4.5-9.3-9.2C1 8.4 3 5 6.6 5 9 5 12 8 12 8s3-3 5.4-3C21 5 23 8.4 21.3 11.8 19 16.5 12 21 12 21Z"/>',
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
    chat:'<path d="M21 12a8 8 0 0 1-11.5 7.2L3 21l1.8-6.5A8 8 0 1 1 21 12Z"/>',
    shield:'<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z"/><path d="m9 12 2 2 4-4"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/>',
    bowl:'<path d="M3 11h18a9 9 0 0 1-18 0Z"/><path d="M8 7c0-1.5 1-2.5 1-4M12 7c0-1.5 1-2.5 1-4M16 7c0-1.5 1-2.5 1-4"/>',
    star:'<path d="M12 3l2.5 5.5L20 9.3l-4 4 1 5.7L12 16l-5 3 1-5.7-4-4 5.5-.8Z"/>',
    cup:'<path d="M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z"/><path d="M17 9h2.5a2.5 2.5 0 0 1 0 5H17"/><path d="M6 3c0 1-1 1.5-1 2.5M10 3c0 1-1 1.5-1 2.5"/>',
    tree:'<path d="M12 3l5 7h-3l4 6H6l4-6H7l5-7Z"/><path d="M12 16v5"/>',
    plate:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/>',
    moon:'<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/>',
    apple:'<path d="M12 7c1-2 3-3 5-2 0 2-1 3-2 3M12 7c-1-2-4-3-6-1-2 3-1 8 1 11 1.2 1.7 2.5 2 3.5 1.4M12 7c1 0 4 1 5 3 1.5 3 0 8-2 10-1 1-2.3.9-3.3.3"/>',
    palette:'<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2 0-1.5-1.2-1.7-1.2-3 0-1 .8-1.8 2-1.8H17a4 4 0 0 0 4-4c0-4-4-7.2-9-7.2Z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7.5" r="1"/><circle cx="14.5" cy="7.5" r="1"/>',
    book:'<path d="M4 4h6a3 3 0 0 1 2 1 3 3 0 0 1 2-1h6v14h-6a3 3 0 0 0-2 1 3 3 0 0 0-2-1H4z"/>',
    run:'<circle cx="15" cy="5" r="2"/><path d="M13 8l-3 3 3 2 1 5M10 11l-4 1M13 13l-2 5"/>',
    puzzle:'<path d="M10 4a2 2 0 0 1 4 0c0 1 .5 1.5 1.5 1.5H18v3c0 1 .5 1.5 1.5 1.5a2 2 0 0 1 0 4C18.5 14 18 14.5 18 15.5V19h-3.5c-1 0-1.5-.5-1.5-1.5a2 2 0 0 0-4 0c0 1-.5 1.5-1.5 1.5H4v-3.5C4 14.5 4.5 14 5.5 14a2 2 0 0 0 0-4C4.5 10 4 9.5 4 8.5V5h4c1 0 1.5-.5 1.5-1.5Z"/>',
    teacher:'<circle cx="12" cy="7" r="3"/><path d="M5 21a7 7 0 0 1 14 0"/><path d="M12 10v4"/>',
    check:'<path d="M20 6 9 17l-5-5"/>',
    home:'<path d="M4 11 12 4l8 7"/><path d="M6 10v9h12v-9"/>'
  };
  function svg(name, cls) {
    return '<svg class="' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + (ICON[name] || '') + '</svg>';
  }

  var GROUPS = {
    baby: {
      accent: '#E8709F', accentSoft: '#FBE6EE', accentDark: '#d1567f',
      name: 'Baby-Fun',
      photo: 'assets/img/interiors/baby.jpg',
      ctaPhoto: 'assets/img/kids/k1.jpg',
      badge: { ru: 'от 1 года', sr: 'od 1 godine', en: 'from age 1' },
      subtitle: { ru: 'Мягкая адаптация\nв русскоязычной среде', sr: 'Nežna adaptacija\nu okruženju na ruskom jeziku', en: 'Gentle adaptation\nin a Russian-speaking environment' },
      intro: {
        ru: 'Адаптационная группа для малышей от 1 года. Мы создаём безопасную и тёплую среду, где ваш ребёнок спокойно привыкает к детскому саду, развивается и делает первые шаги в английском языке.',
        sr: 'Adaptaciona grupa za mališane od 1 godine. Stvaramo sigurno i toplo okruženje u kome se vaše dete mirno navikava na vrtić, razvija se i pravi prve korake u engleskom jeziku.',
        en: 'An adaptation group for little ones from age 1. We create a safe, warm environment where your child calmly settles into preschool, develops and takes their first steps in English.'
      },
      stats: [
        { icon: 'kids', v: { ru: 'до 12 детей', sr: 'do 12 dece', en: 'up to 12 children' }, l: { ru: 'в группе', sr: 'u grupi', en: 'in a group' } },
        { icon: 'adults', v: { ru: '2 взрослых', sr: '2 odrasla', en: '2 adults' }, l: { ru: 'в группе', sr: 'u grupi', en: 'in a group' } },
        { icon: 'heart', v: { ru: '1 новый ребёнок', sr: '1 novo dete', en: '1 new child' }, l: { ru: 'на адаптации в неделю', sr: 'na adaptaciji nedeljno', en: 'adapting per week' } },
        { icon: 'globe', v: { ru: 'English', sr: 'English', en: 'English' }, l: { ru: '3 раза в неделю', sr: '3 puta nedeljno', en: '3 times a week' } }
      ],
      reasonsTitle: { ru: 'Почему Baby-Fun — лучший старт?', sr: 'Zašto je Baby-Fun najbolji početak?', en: 'Why Baby-Fun is the best start' },
      reasons: [
        { icon: 'heart', t: { ru: 'Мягкая адаптация', sr: 'Nežna adaptacija', en: 'Gentle adaptation' }, d: { ru: 'Наша собственная программа адаптации: в течение недели в группу приходит только один новый ребёнок. Мы бережно поддерживаем малыша и родителей на каждом шаге.', sr: 'Naš sopstveni program adaptacije: tokom nedelje u grupu dolazi samo jedno novo dete. Pažljivo podržavamo i dete i roditelje na svakom koraku.', en: 'Our own adaptation program: only one new child joins the group each week. We gently support the child and the parents at every step.' } },
        { icon: 'chat', t: { ru: 'Развитие речи каждый день', sr: 'Razvoj govora svaki dan', en: 'Speech development every day' }, d: { ru: 'Речь включена во все виды деятельности: игру, движение, творчество, чтение, музыку, общение и познание мира.', sr: 'Govor je uključen u sve aktivnosti: igru, pokret, stvaralaštvo, čitanje, muziku, komunikaciju i upoznavanje sveta.', en: 'Speech is woven into every activity: play, movement, art, reading, music, communication and exploring the world.' } },
        { icon: 'shield', t: { ru: 'Стабильность и забота', sr: 'Stabilnost i briga', en: 'Stability and care' }, d: { ru: 'Привычный режим, 5-разовое питание, дневной сон и две прогулки в день на охраняемой территории дарят ребёнку чувство безопасности.', sr: 'Poznat ritam, pet obroka dnevno, dnevni san i dve šetnje na obezbeđenoj teritoriji daju detetu osećaj sigurnosti.', en: 'A familiar routine, five meals a day, a nap and two walks a day in a secured area give the child a sense of safety.' } }
      ],
      scheduleTitle: { ru: 'Наш режим дня', sr: 'Naš raspored dana', en: 'Our daily routine' },
      schedule: [
        { time: '07:30 – 08:30', icon: 'sun', l: { ru: 'Приём, свободная игра', sr: 'Prijem, slobodna igra', en: 'Arrival, free play' } },
        { time: '08:30 – 09:00', icon: 'bowl', l: { ru: 'Завтрак', sr: 'Doručak', en: 'Breakfast' } },
        { time: '09:00 – 10:00', icon: 'star', l: { ru: 'Занятия и активности', sr: 'Aktivnosti i časovi', en: 'Activities' } },
        { time: '10:00 – 10:30', icon: 'cup', l: { ru: 'Второй завтрак', sr: 'Užina', en: 'Morning snack' } },
        { time: '10:30 – 11:30', icon: 'tree', l: { ru: 'Прогулка', sr: 'Šetnja', en: 'Walk' } },
        { time: '11:30 – 12:00', icon: 'plate', l: { ru: 'Обед', sr: 'Ručak', en: 'Lunch' } },
        { time: '12:00 – 15:00', icon: 'moon', l: { ru: 'Дневной сон', sr: 'Dnevni san', en: 'Nap time' } },
        { time: '15:00 – 15:30', icon: 'apple', l: { ru: 'Полдник', sr: 'Užina', en: 'Afternoon snack' } },
        { time: '15:30 – 17:00', icon: 'palette', l: { ru: 'Игры и творчество', sr: 'Igra i stvaralaštvo', en: 'Play and art' } },
        { time: '17:00 – 18:00', icon: 'home', l: { ru: 'Прогулка, уход домой', sr: 'Šetnja, odlazak kući', en: 'Walk, going home' } }
      ],
      scheduleNote: { ru: 'Режим может меняться с учётом потребностей детей.', sr: 'Raspored se može prilagoditi potrebama dece.', en: "The routine may adapt to the children's needs." },
      programTitle: { ru: 'Программа адаптации Funscool', sr: 'Program adaptacije Funscool', en: 'The Funscool adaptation program' },
      program: [
        { ru: 'Совместная работа педагогов и родителей', sr: 'Zajednički rad vaspitača i roditelja', en: 'Teachers and parents working together' },
        { ru: 'Ежедневные наблюдения и рекомендации', sr: 'Svakodnevna zapažanja i preporuke', en: 'Daily observations and guidance' },
        { ru: 'Поддержка по всем важным направлениям: эмоции, сон, питание, общение, игра и речь', sr: 'Podrška u svim važnim oblastima: emocije, san, ishrana, komunikacija, igra i govor', en: 'Support across all key areas: emotions, sleep, meals, communication, play and speech' },
        { ru: 'Индивидуальный подход к каждому малышу', sr: 'Individualni pristup svakom detetu', en: 'An individual approach to every child' }
      ],
      diaryNote: { ru: '«Дневник адаптации» — наш общий план первой недели. Вместе с родителями отмечаем успехи, обсуждаем важные моменты и радуемся первым достижениям.', sr: '„Dnevnik adaptacije“ — naš zajednički plan prve nedelje. Zajedno sa roditeljima beležimo napredak, razgovaramo o važnim trenucima i radujemo se prvim uspesima.', en: "The 'Adaptation Diary' is our shared plan for the first week. Together with parents we note progress, discuss what matters and celebrate the first wins." },
      actsTitle: { ru: 'Чем мы занимаемся', sr: 'Čime se bavimo', en: 'What we do' },
      acts: [
        { icon: 'run', t: { ru: 'Движение и гимнастика', sr: 'Pokret i gimnastika', en: 'Movement & gymnastics' }, d: { ru: 'Крупная моторика, танцы, активные игры', sr: 'Krupna motorika, ples, aktivne igre', en: 'Gross motor skills, dancing, active play' } },
        { icon: 'puzzle', t: { ru: 'Моторика и игры', sr: 'Motorika i igre', en: 'Fine motor & play' }, d: { ru: 'Конструкторы, пазлы, сортеры, мелкая моторика', sr: 'Kocke, slagalice, sorteri, fina motorika', en: 'Blocks, puzzles, sorters, fine motor skills' } },
        { icon: 'palette', t: { ru: 'Творчество', sr: 'Stvaralaštvo', en: 'Art & craft' }, d: { ru: 'Рисование, лепка, пальчиковые краски, безопасные материалы', sr: 'Crtanje, vajanje, prstne boje, bezbedni materijali', en: 'Drawing, modelling, finger paints, safe materials' } },
        { icon: 'book', t: { ru: 'Чтение и речь', sr: 'Čitanje i govor', en: 'Reading & speech' }, d: { ru: 'Книги на русском, сербском и английском. Сказки и театрализация.', sr: 'Knjige na ruskom, srpskom i engleskom. Bajke i lutkarske predstave.', en: 'Books in Russian, Serbian and English. Fairy tales and puppet theatre.' } },
        { icon: 'globe', t: { ru: 'Английский язык', sr: 'Engleski jezik', en: 'English' }, d: { ru: '3 занятия в неделю с носителем языка в игровой форме', sr: '3 časa nedeljno sa izvornim govornikom, kroz igru', en: '3 sessions a week with a native speaker, through play' } }
      ],
      advTitle: { ru: 'Преимущества Baby-Fun', sr: 'Prednosti Baby-Fun', en: 'Baby-Fun advantages' },
      adv: [
        { icon: 'heart', t: { ru: 'Принимаем детей от 1 года', sr: 'Primamo decu od 1 godine', en: 'Children from age 1' } },
        { icon: 'kids', t: { ru: 'Малочисленная группа: до 12 детей', sr: 'Mala grupa: do 12 dece', en: 'A small group: up to 12 children' } },
        { icon: 'teacher', t: { ru: 'Воспитатель и ассистент в группе', sr: 'Vaspitač i asistent u grupi', en: 'A teacher and an assistant' } },
        { icon: 'shield', t: { ru: 'Охраняемая территория и безопасная среда', sr: 'Obezbeđena teritorija i sigurno okruženje', en: 'A secured, safe environment' } },
        { icon: 'apple', t: { ru: '5-разовое питание, сбалансированное меню', sr: 'Pet obroka dnevno, uravnotežen meni', en: 'Five meals a day, a balanced menu' } }
      ],
      ctaTitle: { ru: 'Лучшее начало\nдля счастливого детства!', sr: 'Najbolji početak\nza srećno detinjstvo!', en: 'The best start\nfor a happy childhood!' },
      ctaText: { ru: 'Запишитесь на экскурсию и познакомьтесь с нашей Baby-Fun-группой.', sr: 'Zakažite obilazak i upoznajte našu Baby-Fun grupu.', en: 'Book a tour and meet our Baby-Fun group.' }
    }
  };

  var UI = {
    home: { ru: 'Главная', sr: 'Početna', en: 'Home' },
    groups: { ru: 'Возрастные группы', sr: 'Uzrasne grupe', en: 'Age groups' },
    book: { ru: 'Записаться на экскурсию', sr: 'Zakažite obilazak', en: 'Book a tour' },
    ask: { ru: 'Задать вопрос', sr: 'Postavite pitanje', en: 'Ask a question' }
  };

  var root = document.getElementById('gp');
  if (!root) return;
  var params = new URLSearchParams(location.search);
  var slug = params.get('g') || 'baby';
  var g = GROUPS[slug] || GROUPS.baby;

  function lang() { try { return localStorage.getItem('fs-lang') || 'ru'; } catch (e) { return 'ru'; } }
  function t(o) { var L = lang(); return (o && (o[L] != null ? o[L] : o.ru)) || ''; }
  function br(s) { return String(s).replace(/\n/g, '<br>'); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  function render() {
    var wa = 'https://wa.me/381644445550?text=' + encodeURIComponent('Здравствуйте! Вопрос по группе ' + g.name + ' в Funscool.');
    var html = '';

    // breadcrumb
    html += '<div class="container gp-crumbs"><a href="index.html">' + t(UI.home) + '</a><span>/</span><a href="index.html#programs">' + t(UI.groups) + '</a><span>/</span><b>' + esc(g.name) + '</b></div>';

    // hero
    html += '<section class="gp-hero"><div class="container gp-hero-grid">'
      + '<div class="gp-hero-text">'
      + '<span class="gp-badge">' + t(g.badge) + '</span>'
      + '<h1 class="gp-title">' + esc(g.name) + '</h1>'
      + '<p class="gp-sub">' + br(t(g.subtitle)) + '</p>'
      + '<p class="gp-intro">' + esc(t(g.intro)) + '</p>'
      + '<a class="btn btn-book gp-cta-btn" href="#contact">' + t(UI.book) + '</a>'
      + '</div>'
      + '<div class="gp-hero-photo"><img src="' + g.photo + '" alt="' + esc(g.name) + '"></div>'
      + '</div>'
      + '<div class="container gp-stats">' + g.stats.map(function (s) {
        return '<div class="gp-stat"><span class="gp-stat-ic">' + svg(s.icon) + '</span><b>' + t(s.v) + '</b><span>' + t(s.l) + '</span></div>';
      }).join('') + '</div>'
      + '</section>';

    // reasons
    html += '<section class="section gp-reasons"><div class="container">'
      + '<h2 class="section-title center">' + t(g.reasonsTitle) + '</h2>'
      + '<div class="gp-reason-grid">' + g.reasons.map(function (r) {
        return '<div class="gp-reason"><span class="gp-reason-ic">' + svg(r.icon) + '</span><h3>' + t(r.t) + '</h3><p>' + esc(t(r.d)) + '</p></div>';
      }).join('') + '</div></div></section>';

    // schedule + program
    html += '<section class="section gp-two-sec"><div class="container gp-two">'
      + '<div class="gp-panel gp-sched"><h3>' + t(g.scheduleTitle) + '</h3><ul>'
      + g.schedule.map(function (r) { return '<li><span class="gp-sc-ic">' + svg(r.icon) + '</span><span class="gp-time">' + r.time + '</span><span class="gp-sc-l">' + t(r.l) + '</span></li>'; }).join('')
      + '</ul><p class="gp-note-sm">' + esc(t(g.scheduleNote)) + '</p></div>'
      + '<div class="gp-panel gp-prog"><h3>' + t(g.programTitle) + '</h3><ul>'
      + g.program.map(function (p) { return '<li>' + esc(t(p)) + '</li>'; }).join('')
      + '</ul><div class="gp-diary">' + svg('book', 'gp-diary-ic') + '<p>' + esc(t(g.diaryNote)) + '</p></div></div>'
      + '</div></section>';

    // activities
    html += '<section class="section gp-acts-sec"><div class="container">'
      + '<h2 class="section-title center">' + t(g.actsTitle) + '</h2>'
      + '<div class="gp-acts">' + g.acts.map(function (a) {
        return '<div class="gp-act"><span class="gp-act-ic">' + svg(a.icon) + '</span><h4>' + t(a.t) + '</h4><p>' + esc(t(a.d)) + '</p></div>';
      }).join('') + '</div></div></section>';

    // advantages
    html += '<section class="section gp-adv-sec"><div class="container">'
      + '<h2 class="section-title center">' + t(g.advTitle) + '</h2>'
      + '<div class="gp-advs">' + g.adv.map(function (a) {
        return '<div class="gp-advi"><span class="gp-advi-ic">' + svg(a.icon) + '</span><p>' + esc(t(a.t)) + '</p></div>';
      }).join('') + '</div></div></section>';

    // CTA band
    html += '<section class="section gp-cta"><div class="container gp-cta-in">'
      + '<div class="gp-cta-text"><h2>' + br(t(g.ctaTitle)) + '</h2><p>' + esc(t(g.ctaText)) + '</p>'
      + '<div class="gp-cta-btns"><a class="btn btn-book btn-lg" href="#contact">' + t(UI.book) + '</a>'
      + '<a class="btn btn-ghost btn-lg" href="' + wa + '" target="_blank" rel="noopener">' + t(UI.ask) + '</a></div></div>'
      + '<div class="gp-cta-photo"><img src="' + g.ctaPhoto + '" alt=""></div>'
      + '</div></section>';

    root.innerHTML = html;
    // per-group accent
    root.style.setProperty('--ga', g.accent);
    root.style.setProperty('--gas', g.accentSoft);
    root.style.setProperty('--gad', g.accentDark);
    document.title = g.name + ' — Funscool';
  }

  render();
  // re-render group content whenever the language changes
  document.querySelectorAll('.lang button[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setTimeout(render, 0); });
  });
})();
