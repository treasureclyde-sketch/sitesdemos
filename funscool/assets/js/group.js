/* Funscool — group landing pages (data-driven, RU/SR/EN).
   One template renders any group by ?g=<slug>. */
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
    home:'<path d="M4 11 12 4l8 7"/><path d="M6 10v9h12v-9"/>',
    music:'<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
    flask:'<path d="M9 3h6M10 3v6l-5 8a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 17l-5-8V3"/><path d="M7.5 14h9"/>',
    pencil:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    lang:'<path d="M4 5h11M9 3v2c0 5-2.5 8-6 9M6 9c0 3 3.5 5.5 7 6"/><path d="m13 20 4-9 4 9M14.5 17h5"/>',
    mask:'<path d="M3 5s2 2 9 2 9-2 9-2v6a9 9 0 0 1-18 0Z"/><path d="M8 10h.01M16 10h.01M9 15a4 4 0 0 0 6 0"/>'
  };
  function svg(name, cls) {
    return '<svg class="' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + (ICON[name] || '') + '</svg>';
  }

  // Shared full-day routine for the age groups that stay all day.
  var fullDay = [
    { time: '07:30 – 08:30', icon: 'sun', l: { ru: 'Приём, свободная игра', sr: 'Prijem, slobodna igra', en: 'Arrival, free play' } },
    { time: '08:30 – 09:00', icon: 'bowl', l: { ru: 'Завтрак', sr: 'Doručak', en: 'Breakfast' } },
    { time: '09:00 – 10:00', icon: 'star', l: { ru: 'Занятия и активности', sr: 'Aktivnosti i časovi', en: 'Activities' } },
    { time: '10:00 – 10:30', icon: 'cup', l: { ru: 'Второй завтрак', sr: 'Užina', en: 'Morning snack' } },
    { time: '10:30 – 11:30', icon: 'tree', l: { ru: 'Прогулка', sr: 'Šetnja', en: 'Walk' } },
    { time: '11:30 – 12:00', icon: 'plate', l: { ru: 'Обед', sr: 'Ručak', en: 'Lunch' } },
    { time: '12:00 – 15:00', icon: 'moon', l: { ru: 'Дневной сон / тихий час', sr: 'Dnevni san / tiho vreme', en: 'Nap / quiet time' } },
    { time: '15:00 – 15:30', icon: 'apple', l: { ru: 'Полдник', sr: 'Užina', en: 'Afternoon snack' } },
    { time: '15:30 – 17:00', icon: 'palette', l: { ru: 'Игры и творчество', sr: 'Igra i stvaralaštvo', en: 'Play and art' } },
    { time: '17:00 – 18:00', icon: 'home', l: { ru: 'Прогулка, уход домой', sr: 'Šetnja, odlazak kući', en: 'Walk, going home' } }
  ];
  var scheduleNote = { ru: 'Режим может меняться с учётом потребностей детей.', sr: 'Raspored se može prilagoditi potrebama dece.', en: "The routine may adapt to the children's needs." };

  var GROUPS = {

    /* ============================ BABY-FUN ============================ */
    baby: {
      accent: '#78B15A', accentSoft: '#E9F1DE', accentDark: '#5c8a3f',
      name: 'Baby-Fun',
      photo: 'assets/img/groups/baby-hero.jpg',
      ctaPhoto: 'assets/img/kids/k5.jpg',
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
      schedule: fullDay,
      scheduleNote: scheduleNote,
      programTitle: { ru: 'Программа адаптации Funscool', sr: 'Program adaptacije Funscool', en: 'The Funscool adaptation program' },
      program: [
        { ru: 'Совместная работа педагогов и родителей', sr: 'Zajednički rad vaspitača i roditelja', en: 'Teachers and parents working together' },
        { ru: 'Ежедневные наблюдения и рекомендации', sr: 'Svakodnevna zapažanja i preporuke', en: 'Daily observations and guidance' },
        { ru: 'Поддержка по всем важным направлениям: эмоции, сон, питание, общение, игра и речь', sr: 'Podrška u svim važnim oblastima: emocije, san, ishrana, komunikacija, igra i govor', en: 'Support across all key areas: emotions, sleep, meals, communication, play and speech' },
        { ru: 'Индивидуальный подход к каждому малышу', sr: 'Individualni pristup svakom detetu', en: 'An individual approach to every child' }
      ],
      diaryIcon: 'book',
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
    },

    /* ============================ ENERGY-FUN ============================ */
    energy: {
      accent: '#F5871F', accentSoft: '#FBE8D6', accentDark: '#cf6d0c',
      name: 'Energy-Fun',
      photo: 'assets/img/extra/kids-outdoor.jpg',
      ctaPhoto: 'assets/img/kids/k3.jpg',
      badge: { ru: 'от 2,5 лет', sr: 'od 2,5 godine', en: 'from age 2.5' },
      subtitle: { ru: 'Учимся быть вместе\nи познаём мир в движении', sr: 'Učimo da budemo zajedno\ni upoznajemo svet u pokretu', en: 'Learning to be together\nand exploring the world in motion' },
      intro: {
        ru: 'Группа для детей 2,5–3,5 лет, где ребёнок переходит от игры рядом к настоящему общению: учится договариваться, делиться и играть вместе. А обучение строится на движении — дети постоянно меняют зоны, а не сидят за столом.',
        sr: 'Grupa za decu od 2,5 do 3,5 godine u kojoj dete prelazi od igre pored drugih ka pravoj komunikaciji: uči da se dogovara, deli i igra zajedno. A učenje se gradi kroz pokret — deca stalno menjaju zone umesto da sede za stolom.',
        en: 'A group for children aged 2.5–3.5, where a child moves from playing alongside others to real interaction: learning to negotiate, share and play together. And learning is built on movement — children keep switching zones instead of sitting at a table.'
      },
      stats: [
        { icon: 'kids', v: { ru: 'до 14 детей', sr: 'do 14 dece', en: 'up to 14 children' }, l: { ru: 'в группе', sr: 'u grupi', en: 'in a group' } },
        { icon: 'adults', v: { ru: '2 педагога', sr: '2 pedagoga', en: '2 teachers' }, l: { ru: 'воспитатель и ассистент', sr: 'vaspitač i asistent', en: 'a teacher and an assistant' } },
        { icon: 'run', v: { ru: 'каждые 8–10 мин', sr: 'svakih 8–10 min', en: 'every 8–10 min' }, l: { ru: 'смена активности', sr: 'promena aktivnosti', en: 'change of activity' } },
        { icon: 'globe', v: { ru: 'English', sr: 'English', en: 'English' }, l: { ru: '3 раза в неделю по 30 мин', sr: '3 puta nedeljno po 30 min', en: '3 times a week, 30 min' } }
      ],
      reasonsTitle: { ru: 'Почему Energy-Fun?', sr: 'Zašto Energy-Fun?', en: 'Why Energy-Fun' },
      reasons: [
        { icon: 'heart', t: { ru: 'Учимся быть вместе', sr: 'Učimo da budemo zajedno', en: 'Learning to be together' }, d: { ru: 'Обмен, умение делиться и ждать, совместные сюжетно-ролевые игры и простые правила — социализация становится настоящей педагогической задачей, а не пускается на самотёк.', sr: 'Razmena, deljenje i čekanje, zajedničke igre uloga i jednostavna pravila — socijalizacija postaje prava pedagoška zadaća, a ne prepušta se slučaju.', en: 'Sharing, taking turns and waiting, joint role-play and simple rules — socialisation becomes a real teaching goal, not left to chance.' } },
        { icon: 'run', t: { ru: 'Обучение через движение', sr: 'Učenje kroz pokret', en: 'Learning through movement' }, d: { ru: 'Каждые 8–10 минут дети меняют локацию: ковёр, работа стоя за столами, эстафеты, гимнастика и танцы. Меньше статичного сидения — больше действия.', sr: 'Svakih 8–10 minuta deca menjaju lokaciju: tepih, rad stojeći za stolovima, štafete, gimnastika i ples. Manje statičnog sedenja — više akcije.', en: 'Every 8–10 minutes children change location: the carpet, standing work at tables, relays, gymnastics and dancing. Less static sitting — more action.' } },
        { icon: 'chat', t: { ru: 'Речь: от комментария к диалогу', sr: 'Govor: od komentara do dijaloga', en: 'Speech: from comment to dialogue' }, d: { ru: 'Ежедневная логоритмика, вопросы «кто?», «что делал?», «какой?». Педагог побуждает ребёнка отвечать развёрнуто и точнее описывать происходящее.', sr: 'Svakodnevna logoritmika, pitanja „ko?“, „šta je radio?“, „kakav?“. Vaspitač podstiče dete da odgovara razvijenije i preciznije opisuje šta se dešava.', en: 'Daily speech-rhythm work and questions — "who?", "what did they do?", "what kind?". The teacher encourages fuller answers and more precise descriptions.' } }
      ],
      scheduleTitle: { ru: 'Наш режим дня', sr: 'Naš raspored dana', en: 'Our daily routine' },
      schedule: fullDay,
      scheduleNote: scheduleNote,
      programTitle: { ru: 'Что входит в программу', sr: 'Šta je u programu', en: "What's in the program" },
      program: [
        { ru: 'Ежедневная утренняя гимнастика и логоритмика', sr: 'Svakodnevna jutarnja gimnastika i logoritmika', en: 'Daily morning gymnastics and speech-rhythm work' },
        { ru: 'Музыкальные занятия с профессиональным педагогом, танцы и ритмика', sr: 'Muzičke aktivnosti sa profesionalnim pedagogom, ples i ritmika', en: 'Music lessons with a professional teacher, dance and rhythm' },
        { ru: 'Сенсорика и первые математические представления с Montessori-материалами', sr: 'Senzorika i prvi matematički pojmovi uz Montessori materijale', en: 'Sensory work and first maths concepts with Montessori materials' },
        { ru: 'Творчество: рисование, краски, пластилин и аппликация по образцу', sr: 'Stvaralaštvo: crtanje, boje, plastelin i aplikacija po uzoru', en: 'Art: drawing, paints, modelling and appliqué from a model' },
        { ru: 'Чтение, театрализация и первые роли; круги приветствия и прощания', sr: 'Čitanje, dramatizacija i prve uloge; krugovi pozdrava i opraštanja', en: 'Reading, drama and first roles; greeting and farewell circles' }
      ],
      diaryIcon: 'home',
      diaryNote: { ru: '«Супер домовёнок» — еженедельное практическое занятие: дети готовят простые блюда, наводят порядок с детскими приспособлениями и вместе договариваются, как устроена жизнь группы.', sr: '„Super kućni duh“ — nedeljna praktična aktivnost: deca pripremaju jednostavna jela, sređuju prostor dečjim priborom i zajedno se dogovaraju kako funkcioniše život grupe.', en: '"Super House-Helper" is a weekly hands-on session: children cook simple dishes, tidy up with child-sized tools and agree together on how the group life works.' },
      actsTitle: { ru: 'Чем мы занимаемся', sr: 'Čime se bavimo', en: 'What we do' },
      acts: [
        { icon: 'run', t: { ru: 'Движение и гимнастика', sr: 'Pokret i gimnastika', en: 'Movement & gymnastics' }, d: { ru: 'Смена зон, эстафеты, крупная моторика', sr: 'Promena zona, štafete, krupna motorika', en: 'Zone changes, relays, gross motor skills' } },
        { icon: 'music', t: { ru: 'Музыка и танцы', sr: 'Muzika i ples', en: 'Music & dance' }, d: { ru: 'Ритм, движение под музыку, простые построения', sr: 'Ritam, pokret uz muziku, jednostavne formacije', en: 'Rhythm, moving to music, simple formations' } },
        { icon: 'palette', t: { ru: 'Творчество', sr: 'Stvaralaštvo', en: 'Art & craft' }, d: { ru: 'Рисование, краски, пластилин, аппликация', sr: 'Crtanje, boje, plastelin, aplikacija', en: 'Drawing, paints, modelling, appliqué' } },
        { icon: 'book', t: { ru: 'Книги и театр', sr: 'Knjige i pozorište', en: 'Books & theatre' }, d: { ru: 'Чтение, обсуждение сюжетов, первые роли', sr: 'Čitanje, razgovor o pričama, prve uloge', en: 'Reading, discussing stories, first roles' } },
        { icon: 'globe', t: { ru: 'Английский + Jolly Phonics', sr: 'Engleski + Jolly Phonics', en: 'English + Jolly Phonics' }, d: { ru: '3 раза в неделю по 30 минут, звуки в игре', sr: '3 puta nedeljno po 30 min, glasovi kroz igru', en: '3 times a week, 30 min, sounds through play' } }
      ],
      advTitle: { ru: 'Преимущества Energy-Fun', sr: 'Prednosti Energy-Fun', en: 'Energy-Fun advantages' },
      adv: [
        { icon: 'kids', t: { ru: 'Малочисленная группа: до 14 детей', sr: 'Mala grupa: do 14 dece', en: 'A small group: up to 14 children' } },
        { icon: 'teacher', t: { ru: 'Воспитатель и ассистент в группе', sr: 'Vaspitač i asistent u grupi', en: 'A teacher and an assistant' } },
        { icon: 'run', t: { ru: 'Обучение через движение и смену зон', sr: 'Učenje kroz pokret i promenu zona', en: 'Learning through movement and zone changes' } },
        { icon: 'puzzle', t: { ru: 'Montessori-материалы и practical life', sr: 'Montessori materijali i practical life', en: 'Montessori materials and practical life' } },
        { icon: 'tree', t: { ru: 'Две прогулки в день, 5-разовое питание', sr: 'Dve šetnje dnevno, pet obroka', en: 'Two walks a day, five meals a day' } }
      ],
      ctaTitle: { ru: 'Энергия, дружба\nи первые правила!', sr: 'Energija, prijateljstvo\ni prva pravila!', en: 'Energy, friendship\nand first rules!' },
      ctaText: { ru: 'Запишитесь на экскурсию и познакомьтесь с нашей Energy-Fun-группой.', sr: 'Zakažite obilazak i upoznajte našu Energy-Fun grupu.', en: 'Book a tour and meet our Energy-Fun group.' }
    },

    /* ============================ DISCOVERY-FUN ============================ */
    discovery: {
      accent: '#8B6BD9', accentSoft: '#EDE5F8', accentDark: '#7451c9',
      name: 'Discovery-Fun',
      photo: 'assets/img/kids/k4.jpg',
      ctaPhoto: 'assets/img/interiors/discovery.jpg',
      badge: { ru: 'от 3,5 лет', sr: 'od 3,5 godine', en: 'from age 3.5' },
      subtitle: { ru: 'Возраст почемучек:\nисследуем и открываем мир', sr: 'Uzrast pitalica:\nistražujemo i otkrivamo svet', en: 'The age of "why?":\nexploring and discovering the world' },
      intro: {
        ru: 'Группа для детей 3,5–4,5 лет — возраста «почему?». Дети ставят опыты, наблюдают, сравнивают, делают первые выводы, работают над небольшими проектами и учатся рассказывать о результате. При этом главным способом обучения остаётся игра.',
        sr: 'Grupa za decu od 3,5 do 4,5 godine — uzrast „zašto?“. Deca izvode oglede, posmatraju, upoređuju, donose prve zaključke, rade na malim projektima i uče da pričaju o rezultatu. Pri tome glavni način učenja ostaje igra.',
        en: 'A group for children aged 3.5–4.5 — the age of "why?". Children run experiments, observe, compare, draw first conclusions, work on small projects and learn to talk about the result. And play stays the main way of learning.'
      },
      stats: [
        { icon: 'kids', v: { ru: 'до 16 детей', sr: 'do 16 dece', en: 'up to 16 children' }, l: { ru: 'в группе', sr: 'u grupi', en: 'in a group' } },
        { icon: 'flask', v: { ru: '26 тем года', sr: '26 tema godišnje', en: '26 topics a year' }, l: { ru: 'опыт в каждой теме', sr: 'ogled u svakoj temi', en: 'an experiment in each topic' } },
        { icon: 'tree', v: { ru: 'Проекты', sr: 'Projekti', en: 'Projects' }, l: { ru: 'многошаговые, с наблюдением', sr: 'višekoračni, sa posmatranjem', en: 'multi-step, with observation' } },
        { icon: 'globe', v: { ru: 'English', sr: 'English', en: 'English' }, l: { ru: '3 раза в неделю по 1,5 ч', sr: '3 puta nedeljno po 1,5 h', en: '3 times a week, 1.5 h' } }
      ],
      reasonsTitle: { ru: 'Почему Discovery-Fun?', sr: 'Zašto Discovery-Fun?', en: 'Why Discovery-Fun' },
      reasons: [
        { icon: 'flask', t: { ru: 'Эксперимент в каждой теме', sr: 'Ogled u svakoj temi', en: 'An experiment in every topic' }, d: { ru: 'Каждая из 26 тем года включает опыт или исследовательскую задачу: от моделирования вулкана до наблюдения за свойствами материалов. Ребёнок не просто слушает — он пробует и обсуждает результат.', sr: 'Svaka od 26 tema godišnje uključuje ogled ili istraživački zadatak: od modelovanja vulkana do posmatranja svojstava materijala. Dete ne samo da sluša — ono proba i razgovara o rezultatu.', en: 'Each of the 26 yearly topics includes an experiment or a research task: from modelling a volcano to observing the properties of materials. A child does not just listen — they try and discuss the result.' } },
        { icon: 'tree', t: { ru: 'Первые проекты', sr: 'Prvi projekti', en: 'First projects' }, d: { ru: 'Небольшие многошаговые проекты: дети высаживают зелень, наблюдают путь от семени до растения, ухаживают, фиксируют изменения — и используют урожай на «Весёлом поварёнке».', sr: 'Mali višekoračni projekti: deca sade zelen, prate put od semena do biljke, brinu, beleže promene — i koriste plod na „Veselom kuvarčiću“.', en: 'Small multi-step projects: children plant greens, watch the path from seed to plant, care for it, record changes — and use the harvest in "The Cheerful Little Cook".' } },
        { icon: 'heart', t: { ru: 'Дружба и команда', sr: 'Prijateljstvo i tim', en: 'Friendship and teamwork' }, d: { ru: 'Возраст первых устойчивых дружеских связей. Социоигровая технология и постоянно меняющиеся мини-группы учат договариваться, а «зона успеха» помогает каждому поверить в свои силы.', sr: 'Uzrast prvih stabilnih prijateljstava. Socioigrovna tehnologija i mini-grupe koje se stalno menjaju uče dogovaranju, a „zona uspeha“ pomaže svakome da poveruje u sebe.', en: 'The age of first lasting friendships. A socio-play method and constantly changing mini-groups teach negotiation, while a "success zone" helps every child believe in themselves.' } }
      ],
      scheduleTitle: { ru: 'Наш режим дня', sr: 'Naš raspored dana', en: 'Our daily routine' },
      schedule: fullDay,
      scheduleNote: scheduleNote,
      programTitle: { ru: 'Чему учится ребёнок', sr: 'Šta dete uči', en: 'What the child learns' },
      program: [
        { ru: 'Причинно-следственное мышление и ось времени: «как?», «почему?», «когда?»', sr: 'Uzročno-posledično mišljenje i osa vremena: „kako?“, „zašto?“, „kada?“', en: 'Cause-and-effect thinking and a sense of time: "how?", "why?", "when?"' },
        { ru: 'Мнемотехника и сочинение собственных историй по цепочке картинок', sr: 'Mnemotehnika i smišljanje sopstvenih priča po nizu sličica', en: 'Memory techniques and composing their own stories from a chain of pictures' },
        { ru: 'Сказки народов мира как культурный и нравственный контекст', sr: 'Bajke naroda sveta kao kulturni i moralni kontekst', en: "Folk tales from around the world as a cultural and moral context" },
        { ru: 'Математика и сенсорика: состав числа, числовая лента, вес, объём, площадь', sr: 'Matematika i senzorika: sastav broja, brojevna traka, težina, zapremina, površina', en: 'Maths and sensory work: number composition, the number line, weight, volume, area' },
        { ru: 'Творчество: переход от работы по образцу к собственному замыслу', sr: 'Stvaralaštvo: prelaz sa rada po uzoru na sopstvenu zamisao', en: 'Art: moving from working to a model towards their own idea' }
      ],
      diaryIcon: 'flask',
      diaryNote: { ru: 'В группе работает расширенная команда: постоянный сербско-русскоговорящий воспитатель, ассистент, англоязычный, музыкальный педагог, педагоги по танцам и ИЗО. Логопед — индивидуально, по желанию семьи.', sr: 'U grupi radi proširen tim: stalni srpsko-ruski vaspitač, asistent, pedagog za engleski, muzički pedagog, pedagozi za ples i likovno. Logoped — individualno, po želji porodice.', en: 'The group has an extended team: a permanent Serbian-Russian teacher, an assistant, an English teacher, a music teacher, dance and art teachers. A speech therapist is available individually, at the family’s request.' },
      actsTitle: { ru: 'Чем мы занимаемся', sr: 'Čime se bavimo', en: 'What we do' },
      acts: [
        { icon: 'flask', t: { ru: 'Опыты и эксперименты', sr: 'Ogledi i eksperimenti', en: 'Experiments' }, d: { ru: 'Наблюдаем, пробуем, ищем причины', sr: 'Posmatramo, probamo, tražimo uzroke', en: 'Observe, try, look for causes' } },
        { icon: 'tree', t: { ru: 'Проекты и наблюдения', sr: 'Projekti i posmatranja', en: 'Projects & observation' }, d: { ru: 'От семечка до блюда, шаг за шагом', sr: 'Od semena do jela, korak po korak', en: 'From seed to dish, step by step' } },
        { icon: 'mask', t: { ru: 'Театр и сценарии', sr: 'Pozorište i scenariji', en: 'Theatre & scripts' }, d: { ru: 'Разыгрываем сказки и свои истории', sr: 'Igramo bajke i svoje priče', en: 'Acting out tales and their own stories' } },
        { icon: 'palette', t: { ru: 'Творчество', sr: 'Stvaralaštvo', en: 'Art & craft' }, d: { ru: 'Свобода цвета, формы и материала', sr: 'Sloboda boje, oblika i materijala', en: 'Freedom of colour, shape and material' } },
        { icon: 'globe', t: { ru: 'English Discovery', sr: 'English Discovery', en: 'English Discovery' }, d: { ru: '3×1,5 ч, включая математику и мир вокруг', sr: '3×1,5 h, uključujući matematiku i svet oko nas', en: '3×1.5 h, incl. maths and the world around' } }
      ],
      advTitle: { ru: 'Преимущества Discovery-Fun', sr: 'Prednosti Discovery-Fun', en: 'Discovery-Fun advantages' },
      adv: [
        { icon: 'kids', t: { ru: 'До 16 детей в группе', sr: 'Do 16 dece u grupi', en: 'Up to 16 children in a group' } },
        { icon: 'teacher', t: { ru: 'Расширенная команда специалистов', sr: 'Proširen tim stručnjaka', en: 'An extended team of specialists' } },
        { icon: 'flask', t: { ru: '26 тем года и эксперименты', sr: '26 tema godišnje i eksperimenti', en: '26 topics a year and experiments' } },
        { icon: 'puzzle', t: { ru: 'Montessori и «золотая математика»', sr: 'Montessori i „zlatna matematika“', en: 'Montessori and the "golden maths"' } },
        { icon: 'chat', t: { ru: 'Логопед индивидуально, по желанию', sr: 'Logoped individualno, po želji', en: 'A speech therapist individually, on request' } }
      ],
      ctaTitle: { ru: 'Возраст больших\nоткрытий!', sr: 'Uzrast velikih\notkrića!', en: 'The age of big\ndiscoveries!' },
      ctaText: { ru: 'Запишитесь на экскурсию и познакомьтесь с нашей Discovery-Fun-группой.', sr: 'Zakažite obilazak i upoznajte našu Discovery-Fun grupu.', en: 'Book a tour and meet our Discovery-Fun group.' }
    },

    /* ============================ CREATIVE-FUN ============================ */
    creative: {
      accent: '#F0685F', accentSoft: '#FBE6EE', accentDark: '#d64e45',
      name: 'Creative-Fun',
      photo: 'assets/img/kids/k2.jpg',
      ctaPhoto: 'assets/img/interiors/creative.jpg',
      badge: { ru: 'от 4,5 лет', sr: 'od 4,5 godine', en: 'from age 4.5' },
      subtitle: { ru: 'Творчество, речь\nи первый шаг к школе', sr: 'Stvaralaštvo, govor\ni prvi korak ka školi', en: 'Creativity, speech\nand the first step to school' },
      intro: {
        ru: 'Группа для детей 4,5–6 лет, где творчество, театр и проекты соединяются с системной подготовкой к школе. Ребёнок воплощает собственные замыслы, презентует результат и с интересом осваивает чтение, математику и логику.',
        sr: 'Grupa za decu od 4,5 do 6 godina u kojoj se stvaralaštvo, pozorište i projekti spajaju sa sistematskom pripremom za školu. Dete ostvaruje sopstvene zamisli, predstavlja rezultat i sa zanimanjem savladava čitanje, matematiku i logiku.',
        en: 'A group for children aged 4.5–6, where creativity, theatre and projects meet a systematic preparation for school. A child brings their own ideas to life, presents the result and takes to reading, maths and logic with real interest.'
      },
      stats: [
        { icon: 'kids', v: { ru: 'до 16 детей', sr: 'do 16 dece', en: 'up to 16 children' }, l: { ru: 'в группе', sr: 'u grupi', en: 'in a group' } },
        { icon: 'mask', v: { ru: 'Театр и сцена', sr: 'Pozorište i scena', en: 'Theatre & stage' }, l: { ru: 'не менее 5 утренников в год', sr: 'najmanje 5 priredbi godišnje', en: 'at least 5 shows a year' } },
        { icon: 'book', v: { ru: 'Чтение', sr: 'Čitanje', en: 'Reading' }, l: { ru: 'English + Jolly Phonics', sr: 'English + Jolly Phonics', en: 'English + Jolly Phonics' } },
        { icon: 'puzzle', v: { ru: 'Montessori', sr: 'Montessori', en: 'Montessori' }, l: { ru: 'математика и речь', sr: 'matematika i govor', en: 'maths and speech' } }
      ],
      reasonsTitle: { ru: 'Почему Creative-Fun?', sr: 'Zašto Creative-Fun?', en: 'Why Creative-Fun' },
      reasons: [
        { icon: 'palette', t: { ru: 'Творчество по своему замыслу', sr: 'Stvaralaštvo po svojoj zamisli', en: 'Creativity by their own design' }, d: { ru: 'Ребёнок переходит от работы по образцу к собственным идеям: выбирает цвет, форму, материал и способ. После работ — мини-выставки, где группа замечает сильные стороны каждого автора.', sr: 'Dete prelazi sa rada po uzoru na sopstvene ideje: bira boju, oblik, materijal i način. Nakon radova — mini-izložbe, gde grupa uočava snage svakog autora.', en: 'A child moves from working to a model towards their own ideas: choosing colour, shape, material and method. Work is followed by mini-exhibitions where the group notices each author’s strengths.' } },
        { icon: 'book', t: { ru: 'От звука к чтению', sr: 'Od glasa do čitanja', en: 'From sound to reading' }, d: { ru: 'English и Jolly Phonics ведут ребёнка по цепочке звук → буква → слово → чтение. Параллельно развиваем грамотную, связную речь на русском и сербском.', sr: 'English i Jolly Phonics vode dete kroz niz glas → slovo → reč → čitanje. Paralelno razvijamo pravilan, povezan govor na ruskom i srpskom.', en: 'English and Jolly Phonics lead a child along the chain sound → letter → word → reading. In parallel we develop clear, connected speech in Russian and Serbian.' } },
        { icon: 'puzzle', t: { ru: 'Логика и мышление', sr: 'Logika i mišljenje', en: 'Logic and thinking' }, d: { ru: 'Классификации, последовательности, круги Эйлера и занимательная математика готовят ребёнка к школьному формату — без превращения дошкольника в «первоклассника раньше времени».', sr: 'Klasifikacije, nizovi, Ojlerovi krugovi i zanimljiva matematika pripremaju dete za školski format — bez pretvaranja predškolca u „prevremenog prvaka“.', en: 'Classifications, sequences, Euler circles and playful maths prepare a child for the school format — without turning a preschooler into a "first-grader too soon".' } }
      ],
      scheduleTitle: { ru: 'Наш режим дня', sr: 'Naš raspored dana', en: 'Our daily routine' },
      schedule: fullDay,
      scheduleNote: scheduleNote,
      programTitle: { ru: 'Чему учится ребёнок', sr: 'Šta dete uči', en: 'What the child learns' },
      program: [
        { ru: 'Театр, драматизация и собственные детские сценарии', sr: 'Pozorište, dramatizacija i sopstveni dečji scenariji', en: 'Theatre, drama and the children’s own scripts' },
        { ru: 'Презентации и проекты: умение объяснить и показать результат', sr: 'Prezentacije i projekti: sposobnost da objasni i prikaže rezultat', en: 'Presentations and projects: explaining and showing a result' },
        { ru: 'Дежурства, самостоятельность и «Весёлый поварёнок»', sr: 'Dežurstva, samostalnost i „Veseli kuvarčić“', en: 'Duties, independence and "The Cheerful Little Cook"' },
        { ru: 'Математика и логика: занимательная математика, классификации, круги Эйлера', sr: 'Matematika i logika: zanimljiva matematika, klasifikacije, Ojlerovi krugovi', en: 'Maths and logic: playful maths, classifications, Euler circles' },
        { ru: 'Чтение, грамотная речь, география и знакомство с миром', sr: 'Čitanje, pravilan govor, geografija i upoznavanje sveta', en: 'Reading, correct speech, geography and getting to know the world' }
      ],
      diaryIcon: 'mask',
      diaryNote: { ru: 'В течение года проходит не менее пяти утренников: дети придумывают, репетируют и выступают перед родителями. Так рождаются уверенность и умение держаться на сцене.', sr: 'Tokom godine održava se najmanje pet priredbi: deca smišljaju, uvežbavaju i nastupaju pred roditeljima. Tako se rađaju samopouzdanje i sigurnost na sceni.', en: 'At least five shows are held during the year: children invent, rehearse and perform in front of parents. That is how confidence and stage presence are born.' },
      actsTitle: { ru: 'Чем мы занимаемся', sr: 'Čime se bavimo', en: 'What we do' },
      acts: [
        { icon: 'mask', t: { ru: 'Театр и сцена', sr: 'Pozorište i scena', en: 'Theatre & stage' }, d: { ru: 'Постановки, роли, детские сценарии', sr: 'Predstave, uloge, dečji scenariji', en: 'Plays, roles, children’s scripts' } },
        { icon: 'palette', t: { ru: 'Творчество и ИЗО', sr: 'Stvaralaštvo i likovno', en: 'Art & craft' }, d: { ru: 'Собственные замыслы и мини-выставки', sr: 'Sopstvene zamisli i mini-izložbe', en: 'Own ideas and mini-exhibitions' } },
        { icon: 'book', t: { ru: 'Чтение и речь', sr: 'Čitanje i govor', en: 'Reading & speech' }, d: { ru: 'Грамотная связная речь, первые тексты', sr: 'Pravilan povezan govor, prvi tekstovi', en: 'Clear connected speech, first texts' } },
        { icon: 'globe', t: { ru: 'English + Jolly Phonics', sr: 'English + Jolly Phonics', en: 'English + Jolly Phonics' }, d: { ru: 'Звук → буква → слово → чтение', sr: 'Glas → slovo → reč → čitanje', en: 'Sound → letter → word → reading' } },
        { icon: 'puzzle', t: { ru: 'Логика и математика', sr: 'Logika i matematika', en: 'Logic & maths' }, d: { ru: 'Классификации, круги Эйлера, Петерсон', sr: 'Klasifikacije, Ojlerovi krugovi, Peterson', en: 'Classifications, Euler circles, Peterson' } }
      ],
      advTitle: { ru: 'Преимущества Creative-Fun', sr: 'Prednosti Creative-Fun', en: 'Creative-Fun advantages' },
      adv: [
        { icon: 'kids', t: { ru: 'До 16 детей в группе', sr: 'Do 16 dece u grupi', en: 'Up to 16 children in a group' } },
        { icon: 'star', t: { ru: 'Подготовка к школе через интерес', sr: 'Priprema za školu kroz interesovanje', en: 'School preparation through interest' } },
        { icon: 'globe', t: { ru: 'English и Jolly Phonics', sr: 'English i Jolly Phonics', en: 'English and Jolly Phonics' } },
        { icon: 'puzzle', t: { ru: 'Montessori: математика и речь', sr: 'Montessori: matematika i govor', en: 'Montessori: maths and speech' } },
        { icon: 'check', t: { ru: 'Дежурства и самостоятельность', sr: 'Dežurstva i samostalnost', en: 'Duties and independence' } }
      ],
      ctaTitle: { ru: 'Творчество, которое\nготовит к школе!', sr: 'Stvaralaštvo koje\npriprema za školu!', en: 'Creativity that\ngets you ready for school!' },
      ctaText: { ru: 'Запишитесь на экскурсию и познакомьтесь с нашей Creative-Fun-группой.', sr: 'Zakažite obilazak i upoznajte našu Creative-Fun grupu.', en: 'Book a tour and meet our Creative-Fun group.' }
    },

    /* ============================ PRESCHOOL / SCHOOL READINESS ============================ */
    preschool: {
      accent: '#4FA79B', accentSoft: '#E1F0EC', accentDark: '#3d857b',
      name: 'Preschool',
      photo: 'assets/img/kids/k1.jpg',
      ctaPhoto: 'assets/img/interiors/preschool.jpg',
      badge: { ru: 'Дополнительная программа · 5,5–7 лет', sr: 'Dodatni program · 5,5–7 godina', en: 'Additional program · ages 5.5–7' },
      subtitle: { ru: 'Одна готовность к школе —\nтри образовательные траектории', sr: 'Jedna spremnost za školu —\ntri obrazovne putanje', en: 'One school readiness —\nthree learning tracks' },
      intro: {
        ru: 'В 2026/27 году Preschool — это финальная ступень FunsCool: программа подготовки к школе для детей 5,5–7 лет на русском, сербском или английском языке. Готовность к школе — это больше, чем чтение и счёт: это внимание, речь, самостоятельность и уверенность на языке будущего обучения.',
        sr: 'U 2026/27. godini Preschool je završna stepenica FunsCool-a: program pripreme za školu za decu od 5,5 do 7 godina na ruskom, srpskom ili engleskom jeziku. Spremnost za školu je više od čitanja i računanja: to su pažnja, govor, samostalnost i sigurnost na jeziku budućeg školovanja.',
        en: 'For 2026/27 Preschool is the final FunsCool stage: a school-readiness program for children aged 5.5–7 in Russian, Serbian or English. School readiness is more than reading and counting: it is attention, speech, independence and confidence in the language of future learning.'
      },
      stats: [
        { icon: 'lang', v: { ru: '3 языка', sr: '3 jezika', en: '3 languages' }, l: { ru: 'Russian · Serbian · English', sr: 'Russian · Serbian · English', en: 'Russian · Serbian · English' } },
        { icon: 'cup', v: { ru: 'School Readiness', sr: 'School Readiness', en: 'School Readiness' }, l: { ru: 'подготовка к школе', sr: 'priprema za školu', en: 'preparation for school' } },
        { icon: 'kids', v: { ru: '5,5–7 лет', sr: '5,5–7 godina', en: 'ages 5.5–7' }, l: { ru: 'старший дошкольный возраст', sr: 'stariji predškolski uzrast', en: 'senior preschool age' } },
        { icon: 'book', v: { ru: 'Речь · чтение · логика', sr: 'Govor · čitanje · logika', en: 'Speech · reading · logic' }, l: { ru: 'ключевые навыки', sr: 'ključne veštine', en: 'core skills' } }
      ],
      reasonsTitle: { ru: 'Что значит быть готовым к школе', sr: 'Šta znači biti spreman za školu', en: 'What being ready for school means' },
      reasons: [
        { icon: 'chat', t: { ru: 'Речь и мышление', sr: 'Govor i mišljenje', en: 'Speech and thinking' }, d: { ru: 'Ребёнок учится рассуждать, отвечать развёрнуто, понимать и выполнять инструкцию, задавать вопросы и объяснять своё решение.', sr: 'Dete uči da rasuđuje, odgovara razvijenije, razume i izvršava uputstvo, postavlja pitanja i objašnjava svoje rešenje.', en: 'A child learns to reason, answer in full, understand and follow instructions, ask questions and explain their solution.' } },
        { icon: 'book', t: { ru: 'Чтение и математика', sr: 'Čitanje i matematika', en: 'Reading and maths' }, d: { ru: 'Звуковой анализ, знакомство с буквами и переход к чтению, математические представления, логика и подготовка руки к письму.', sr: 'Glasovna analiza, upoznavanje slova i prelaz na čitanje, matematički pojmovi, logika i priprema ruke za pisanje.', en: 'Sound analysis, learning letters and moving to reading, maths concepts, logic and preparing the hand for writing.' } },
        { icon: 'shield', t: { ru: 'Самостоятельность и уверенность', sr: 'Samostalnost i sigurnost', en: 'Independence and confidence' }, d: { ru: 'Организовать рабочее место, довести задачу до результата, работать в паре и группе и уверенно чувствовать себя на языке будущей школы.', sr: 'Da organizuje radno mesto, dovede zadatak do rezultata, radi u paru i grupi i oseća se sigurno na jeziku buduće škole.', en: 'Organising a workspace, seeing a task through, working in a pair and a group, and feeling confident in the language of their future school.' } }
      ],
      tracksTitle: { ru: 'Три образовательные траектории', sr: 'Tri obrazovne putanje', en: 'Three learning tracks' },
      tracks: [
        { icon: 'book', t: { ru: 'Русская школа', sr: 'Ruska škola', en: 'Russian school' }, items: [
          { ru: 'Развитие речи и звуковой анализ', sr: 'Razvoj govora i glasovna analiza', en: 'Speech development and sound analysis' },
          { ru: 'Буквы и переход к чтению', sr: 'Slova i prelaz na čitanje', en: 'Letters and moving to reading' },
          { ru: 'Математика (Петерсон) и логика', sr: 'Matematika (Peterson) i logika', en: 'Maths (Peterson) and logic' },
          { ru: 'Графомоторика и формат заданий', sr: 'Grafomotorika i format zadataka', en: 'Handwriting prep and task formats' }
        ] },
        { icon: 'lang', t: { ru: 'Сербская школа', sr: 'Srpska škola', en: 'Serbian school' }, items: [
          { ru: 'Сербская речь и школьная лексика', sr: 'Srpski govor i školska leksika', en: 'Serbian speech and school vocabulary' },
          { ru: 'Понимание инструкции педагога', sr: 'Razumevanje uputstva vaspitača', en: "Understanding the teacher's instructions" },
          { ru: 'Буквы, звуки и простые слова', sr: 'Slova, glasovi i jednostavne reči', en: 'Letters, sounds and simple words' },
          { ru: 'Математика на сербском языке', sr: 'Matematika na srpskom jeziku', en: 'Maths in Serbian' }
        ] },
        { icon: 'globe', t: { ru: 'English / International', sr: 'English / International', en: 'English / International' }, items: [
          { ru: 'Jolly Phonics и phonemic awareness', sr: 'Jolly Phonics i phonemic awareness', en: 'Jolly Phonics and phonemic awareness' },
          { ru: 'Early reading и vocabulary', sr: 'Early reading i vocabulary', en: 'Early reading and vocabulary' },
          { ru: 'Classroom instructions и speaking', sr: 'Classroom instructions i speaking', en: 'Classroom instructions and speaking' },
          { ru: 'Early maths in English', sr: 'Early maths in English', en: 'Early maths in English' }
        ] }
      ],
      programTitle: { ru: 'Единое ядро FunsCool School Readiness', sr: 'Jedinstveno jezgro FunsCool School Readiness', en: 'The shared FunsCool School Readiness core' },
      program: [
        { ru: 'Развитие внимания, памяти, логического и математического мышления', sr: 'Razvoj pažnje, pamćenja, logičkog i matematičkog mišljenja', en: 'Developing attention, memory, logical and mathematical thinking' },
        { ru: 'Связная речь, умение рассуждать и отвечать развёрнуто', sr: 'Povezan govor, sposobnost rasuđivanja i razvijenog odgovora', en: 'Connected speech, reasoning and answering in full' },
        { ru: 'Понимание и выполнение инструкции, графомоторика', sr: 'Razumevanje i izvršavanje uputstva, grafomotorika', en: 'Understanding and following instructions, handwriting prep' },
        { ru: 'Самостоятельность и организация рабочего места', sr: 'Samostalnost i organizacija radnog mesta', en: 'Independence and organising a workspace' },
        { ru: 'Работа индивидуально, в паре и в небольшой группе, презентация результата', sr: 'Rad individualno, u paru i u maloj grupi, prezentacija rezultata', en: 'Working individually, in pairs and small groups, presenting results' }
      ],
      diaryIcon: 'lang',
      diaryNote: { ru: 'Семья выбирает не язык «вообще», а школу, к которой готовится ребёнок: русскую, сербскую или международную. Траектория подбирается под язык будущего обучения, текущий уровень и цель семьи.', sr: 'Porodica ne bira jezik „uopšte“, već školu za koju se dete priprema: rusku, srpsku ili međunarodnu. Putanja se bira prema jeziku budućeg školovanja, trenutnom nivou i cilju porodice.', en: 'A family chooses not a language "in general" but the school a child is preparing for: Russian, Serbian or international. The track is matched to the language of future learning, the current level and the family’s goal.' },
      actsTitle: { ru: 'Ключевые направления', sr: 'Ključni pravci', en: 'Key areas' },
      acts: [
        { icon: 'chat', t: { ru: 'Речь и коммуникация', sr: 'Govor i komunikacija', en: 'Speech & communication' }, d: { ru: 'Рассуждать, объяснять, задавать вопросы', sr: 'Rasuđivati, objašnjavati, postavljati pitanja', en: 'Reasoning, explaining, asking questions' } },
        { icon: 'book', t: { ru: 'Чтение и грамота', sr: 'Čitanje i pismenost', en: 'Reading & literacy' }, d: { ru: 'Звуковой анализ, буквы, первое чтение', sr: 'Glasovna analiza, slova, prvo čitanje', en: 'Sound analysis, letters, first reading' } },
        { icon: 'puzzle', t: { ru: 'Математика и логика', sr: 'Matematika i logika', en: 'Maths & logic' }, d: { ru: 'Счёт, задачи, последовательности', sr: 'Računanje, zadaci, nizovi', en: 'Counting, problems, sequences' } },
        { icon: 'pencil', t: { ru: 'Графомоторика', sr: 'Grafomotorika', en: 'Handwriting prep' }, d: { ru: 'Подготовка руки к письму', sr: 'Priprema ruke za pisanje', en: 'Preparing the hand for writing' } },
        { icon: 'globe', t: { ru: 'Языки и English', sr: 'Jezici i English', en: 'Languages & English' }, d: { ru: 'Готовность учиться на выбранном языке', sr: 'Spremnost za učenje na izabranom jeziku', en: 'Readiness to learn in the chosen language' } }
      ],
      advTitle: { ru: 'Почему Preschool FunsCool', sr: 'Zašto Preschool FunsCool', en: 'Why Preschool FunsCool' },
      adv: [
        { icon: 'lang', t: { ru: 'Три траектории: ru / sr / en', sr: 'Tri putanje: ru / sr / en', en: 'Three tracks: ru / sr / en' } },
        { icon: 'book', t: { ru: 'Подготовка к языку будущей школы', sr: 'Priprema za jezik buduće škole', en: 'Preparing for the future school’s language' } },
        { icon: 'heart', t: { ru: 'Внимание к каждому ребёнку', sr: 'Pažnja prema svakom detetu', en: 'Attention to every child' } },
        { icon: 'teacher', t: { ru: 'Опытные педагоги FunsCool', sr: 'Iskusni pedagozi FunsCool', en: 'Experienced FunsCool teachers' } },
        { icon: 'check', t: { ru: 'Плавный переход к учебному формату', sr: 'Postepen prelaz na školski format', en: 'A gentle move into the learning format' } }
      ],
      ctaTitle: { ru: 'Готовимся к школе\nна языке будущего!', sr: 'Pripremamo se za školu\nna jeziku budućnosti!', en: 'Getting ready for school\nin the language of the future!' },
      ctaText: { ru: 'Запишитесь на консультацию — поможем выбрать программу подготовки для вашего ребёнка.', sr: 'Zakažite konsultaciju — pomoći ćemo vam da izaberete program pripreme za vaše dete.', en: 'Book a consultation — we’ll help you choose the right preparation track for your child.' }
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

    // language tracks (Preschool only)
    if (g.tracks) {
      html += '<section class="section gp-tracks-sec"><div class="container">'
        + '<h2 class="section-title center">' + t(g.tracksTitle) + '</h2>'
        + '<div class="gp-tracks">' + g.tracks.map(function (tr) {
          return '<div class="gp-track"><span class="gp-track-ic">' + svg(tr.icon) + '</span><h3>' + t(tr.t) + '</h3><ul>'
            + tr.items.map(function (it) { return '<li>' + esc(t(it)) + '</li>'; }).join('')
            + '</ul></div>';
        }).join('') + '</div></div></section>';
    }

    // schedule + program (schedule optional)
    var progPanel = '<div class="gp-panel gp-prog"><h3>' + t(g.programTitle) + '</h3><ul>'
      + g.program.map(function (p) { return '<li>' + esc(t(p)) + '</li>'; }).join('')
      + '</ul>' + (g.diaryNote ? '<div class="gp-diary">' + svg(g.diaryIcon || 'book', 'gp-diary-ic') + '<p>' + esc(t(g.diaryNote)) + '</p></div>' : '') + '</div>';

    if (g.schedule) {
      html += '<section class="section gp-two-sec"><div class="container gp-two">'
        + '<div class="gp-panel gp-sched"><h3>' + t(g.scheduleTitle) + '</h3><ul>'
        + g.schedule.map(function (r) { return '<li><span class="gp-sc-ic">' + svg(r.icon) + '</span><span class="gp-time">' + r.time + '</span><span class="gp-sc-l">' + t(r.l) + '</span></li>'; }).join('')
        + '</ul><p class="gp-note-sm">' + esc(t(g.scheduleNote)) + '</p></div>'
        + progPanel
        + '</div></section>';
    } else {
      html += '<section class="section gp-two-sec"><div class="container gp-two single">'
        + progPanel
        + '</div></section>';
    }

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
