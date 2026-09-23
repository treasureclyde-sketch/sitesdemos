/* FUNSCOOL — interactions + i18n (RU inline default, SR/EN dictionaries) */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CONTENT = null;      // data loaded from content/*.json (CMS-editable)
  var currentLang = 'ru';  // language the page is currently showing
  var feedExpanded = false; // main-page «Актуальное» block: "показать ещё" toggled?

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
    nav_parents:"Za roditelje", nav_contacts:"Kontakt", nav_teachers:"Vaspitači", nav_reviews:"Utisci", cta_book:"Zakažite obilazak", cta_book_short:"Zakažite",
    hero_title:"Međunarodni vrtić FunsCool u Beogradu", hero_tag:"Srećno detinjstvo — svakog dana", hero_sub:"Boutique vrtić za decu 1,2–7 godina u centru Beograda (Dorćol): male grupe, tri jezika svakog dana, nežna adaptacija, Montessori i Waldorf.",
    cta_programs:"Naši programi", addr:"Dorćol, Popovićeva 14A, Beograd", addr_sub:"Mirno centralno mesto, sigurno okruženje",
    rating:"Ocena ustanove na Yandex-u",
    f1_t:"Male grupe", f1_d:"do 15 dece", f2_t:"Blaga adaptacija", f2_d:"bez stresa i suza",
    f3_t:"Višejezično okruženje", f3_d:"ruski, srpski, engleski", f4_t:"Autorski program", f4_d:"zasnovan na Montessori i Waldorf pristupima", feat_h:"Zašto FunsCool",
    sreda_eyebrow:"Bezbedan razvoj svakog dana", sreda_title:"Razvojno okruženje vrtića koje raste zajedno sa detetom",
    sreda_text:"Osmišljeni prostori, boje, materijali i zone pomažu deci da rastu samopouzdano, samostalno i srećno.",
    sreda_1:"Boje i junaci po Waldorf sistemu za svaki uzrast", sreda_2:"7–8 razvojnih zona u svakoj grupi u zavisnosti od uzrasta",
    sreda_3:"Bezbedni materijali i prostor za slobodno istraživanje", sreda_4:"Razvoj u svakoj fazi — od senzorike do stvaralaštva i projekata",
    prog_eyebrow:"Uzrasne grupe", prog_title:"Grupe vrtića FunsCool — od 1,2 do 7 godina", prog_sub:"Svaka grupa je važna faza u razvoju vašeg deteta.",
    p1_name:"Bebi-Fan", p1_age:"1,2–2,5 godine", p1_desc:"Prvi koraci ka samostalnosti u atmosferi brige i sigurnosti.",
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
    play_eyebrow:"Svež vazduh", play_title:"Sopstveno bezbedno dvorište i vrtić u centru srpske prestonice",
    play_1:"Šetnje dva puta dnevno na sopstvenom igralištu vrtića", play_2:"Ograđeno i potpuno bezbedno",
    play_3:"Puno pokreta, igre i otkrića svakog dana", play_4:"Čist vazduh i zelenilo u mirnom centru Dorćola",
    about_eyebrow:"U mirnom centru Dorćola", about_title:"Kuća sa istorijom u srcu Beograda",
    about_text:"Funscool je licencirani vrtić koji radi po državnom programu i savremenim pedagoškim pristupima. Cenimo tradiciju, profesionalizam i individualni pristup svakom detetu.",
    about_b1:"Licencirani vrtić", about_b2:"Državni program", about_b3:"Profesionalni tim",
    net_eyebrow:"Međunarodna mreža", net_title:"FunsCool je mreža vrtića", net_photo:"Kipar", net_cta:"Više o Kipru",
    net_text:"Rastemo i van Beograda. FunsCool je međunarodna mreža, a jedan od naših vrtića radi i na Kipru: iste vrednosti, nežna adaptacija i autorski program — u toploj mediteranskoj atmosferi.",
    day_eyebrow:"Osmišljen raspored dana", day_title:"Kako izgleda dan u vrtiću FunsCool",
    day_text:"Osmislili smo svaki sat dana da se dete razvija skladno, sa zadovoljstvom i svojim tempom.",
    day_quote_t:"Svaki trenutak je važan", day_quote_d:"Briga, pažnja i podrška — osnova srećnog detinjstva.",
    day_hours:"07:00 – 18:00", day_meals:"5 obroka dnevno",
    clk1:"Jutarnji prijem, pozdrav i vežbanje", clk2:"Ukusan doručak", clk3:"Aktivnosti po višejezičnom programu",
    clk4:"Voćna užina", clk5:"Zanimljiva šetnja", clk6:"Zdrav ručak", clk7:"Dnevni odmor i relaksacija",
    clk8:"Hranljiv snek", clk9:"Časovi po Montesori / Valdorf metodi", clk10:"Obilna večera",
    clk11:"Šetnja, sekcije i radionice", clk12:"Ispraćaj",
    joy_eyebrow:"Radost — svakog dana", joy_title:"Radost — svakog dana",
    joy_sub:"Život našeg vrtića nije samo aktivnosti i uobičajen ritam dana. Deca učestvuju u praznicima i pozorišnim predstavama, kuvaju sa vaspitačima, prave projekte, idu na izlete i upoznaju tradicije različitih kultura.",
    ev1_t:"Praznici i tradicije", ev1_d:"Sezonski praznici, kulturne tradicije i događaji zajednice.",
    ev2_t:"Pozorište i scena", ev2_d:"Igramo uloge, nastupamo, smišljamo i proživljavamo priče.",
    ev3_t:"Veseli kuvarčić", ev3_d:"Kuvamo zajedno, probamo i učimo samostalnost kroz praksu.",
    ev4_t:"Projekti i otkrića", ev4_d:"Istražujemo, stvaramo i pokazujemo rezultat.",
    ev5_t:"Izleti i nova mesta", ev5_d:"Muzeji, priroda, grad i novi utisci van vrtića.",
    ev6_t:"FunsCool Family Events", ev6_d:"Događaji, proslave i susreti sa porodicama.",
    joy_end:"Detinjstvo čine trenuci kojih volimo da se sećamo.",
    joy1_t:"Živo interesovanje za novo", joy1_d:"Budimo radoznalost i uključujemo u aktivnosti kroz igru i komunikaciju.",
    joy2_t:"Šareni dani — bez šablona", joy2_d:"Tematski dani, stvaralaštvo i eksperimenti — svaki dan donosi nešto posebno.",
    joy3_t:"Događaji koji se pamte", joy3_d:"Kvizovi, proslave i prave avanture — ono što deca čekaju i rado prepričavaju.",
    joy4_t:"Samopouzdanje i radost pobeda", joy4_d:"Vaspitači podržavaju i primećuju uspehe deteta, pomažući mu da veruje u sebe.",
    team_eyebrow:"Sa ljubavlju i brigom", team_title:"Vaspitači vrtića FunsCool",
    team_sub:"Četiri vaspitača i administrator koji svakodnevno neguju mirnu, toplu i razumljivu atmosferu.", team_ask:"Postavite pitanje",
    rev_eyebrow:"Utisci roditelja", rev_title:"Šta roditelji kažu o nama", rev_sub:"Pravi utisci porodica vrtića FunsCool.",
    feed_title:"Aktuelno", feed_more:"Prikaži još", feed_all:"Prikaži sve", news_back:"Na početnu", feed_empty:"Još nema objava — navratite kasnije.",
    feed_arch_title:"Aktuelno — život vrtića FunsCool", feed_arch_sub:"Novosti, događaji, praznici i sve čime živi naš vrtić.",
    /* teacher cards are rendered from content/teachers.json */
    mom_eyebrow:"Svaki trenutak je važan", mom_title:"Srećni trenuci svakog dana",
    mom_sub:"Igramo se, stvaramo, istražujemo i rastemo zajedno. Svaki dan u Funscool-u ispunjen je radošću i otkrićima.",
    mom_note:"Bezbedno, brižno i inspirativno okruženje — od jutra do večeri.",
    faq_eyebrow:"Česta pitanja", faq_title:"Česta pitanja o vrtiću FunsCool",
    faq_q1:"Kako izgleda adaptacija?", faq_a1:"Počinjemo kratkim posetama zajedno sa roditeljem i postepeno produžavamo vreme. Tempo prilagođavamo detetu — nežno, bez stresa i suza. Roditelji dobijaju poseban dnevnik adaptacije koji povezuje ono što se dešava sa detetom u vrtiću i ono što porodica radi kod kuće. Zajedno pratimo dete i po završetku programa određujemo režim dolaska za koji je baš ono sada spremno.",
    faq_q2:"Da li možemo početi sa pola dana?", faq_a2:"Da. Mnoga deca počinju sa pola dana, a zatim postepeno prelaze na ceo dan kada su spremna.",
    faq_q3:"Koji jezici se koriste?", faq_a3:"Ruski, srpski i engleski koriste se svakodnevno. Deca prirodno usvajaju višejezično okruženje — kroz igru, aktivnosti, pesme, čitanje i živu komunikaciju.",
    faq_q4:"Kako je organizovana ishrana?", faq_a4:"Pet obroka dnevno: doručak, voćna užina, ručak, užina i večera. Uravnotežen jelovnik; vodimo računa o posebnostima i alergijama.",
    faq_q5:"Koliko dece ima u grupi?", faq_a5:"Male grupe do 15 dece — tako svako dete dobija dovoljno pažnje vaspitača.",
    faq_q6:"Kako možemo zakazati posetu?", faq_a6:"Ostavite prijavu u formi ispod ili nas pozovite — dogovorićemo termin obilaska.", faq_q7:"Od kog uzrasta primate decu?", faq_a7:"Decu primamo otprilike od 1,2 godine — kada dete sigurno hoda, jede kašikom i pije iz šolje. Za najmlađe postoji adaptaciona grupa Baby-Fun.", faq_q8:"Da li postoje šetnje i sopstveno dvorište?", faq_a8:"Da. Deca borave napolju dva puta dnevno u sopstvenom, ograđenom dvorištu uz vrtić — bez odlaska na javna igrališta i prelaska ulica.",
    form_title:"Želite da vidite vrtić svojim očima?", form_text:"Ostavite zahtev — pokazaćemo prostor, odgovoriti na pitanja i pronaći grupu za vaše dete. Poslaćemo raspored, događaje i dnevni režim.",
    form_call:"Pozovite nas", form_card_title:"Zakažite obilazak", form_card_sub:"Popunite formu — javićemo vam se u najkraćem roku.",
    cta_rating:"Ocena na Yandexu", cta_c1:"Male grupe do 15", cta_c2:"Licencirani vrtić", intro_skip:"Preskoči →",
    form_name:"Vaše ime", form_phone:"Telefon", form_age:"Uzrast deteta", form_submit:"Ostavite kontakt",
    form_privacy:"Poštujemo vašu privatnost i ne delimo podatke sa trećim licima.", form_ok:"Hvala! Zahtev je primljen — javićemo vam se uskoro.",
    form_group:"Grupa", form_group_ph:"Izaberite grupu", form_age_lbl:"Uzrast", form_child:"Ime deteta", form_wa:"Pošalji na WhatsApp", form_err:"Slanje nije uspelo. Pišite nam na WhatsApp:",
    form_add_child:"Dodaj dete", form_contact_hint:"Ostavite telefon ili e-mail — kako vam odgovara.",
    offers_btn:"Aktuelne ponude", offers_eyebrow:"Posebni uslovi", offers_title:"Aktuelne ponude",
    offers_sub:"Nekoliko povoljnih uslova za naše porodice — detalje proverite prilikom upisa.",
    offer1_t:"Plaćanje materinskim kapitalom", offer1_d:"Prihvatamo plaćanje vrtića sredstvima materinskog kapitala.",
    offer2_t:"Popust 20% za prvih 20 porodica", offer2_d:"Prvih 20 porodica u novom upisu ostvaruje popust od 20% na školarinu.",
    offer3_t:"Popust 5% za braću i sestre", offer3_d:"Ako vrtić pohađa dvoje ili više dece iz iste porodice, važi popust od 5%.",
    offers_cta:"Zakažite obilazak", offers_note:"Ponude se ne sabiraju. Detalje proverite kod administratora.",
    footer_tagline:"Razvijamo sa ljubavlju i brigom svakog dana.", footer_nav:"Navigacija", footer_programs:"Programi",
    foot_p1:"Bebi-Fan · 1,2–2,5", foot_p2:"Enerdži-Fan · 2,5–3,5", foot_p3:"Diskaveri-Fan · 3,5–4,5", foot_p4:"Kreativ-Fan · 4,5–6", foot_p5:"Preskul · 5,5–7",
    footer_contacts:"Kontakt", footer_rights:"Sva prava zadržana", footer_privacy:"Politika privatnosti"
  };

  var EN = {
    brand_sub:"preschool", nav_about:"About", nav_programs:"Programs", nav_env:"Environment",
    nav_parents:"For parents", nav_contacts:"Contacts", nav_teachers:"Teachers", nav_reviews:"Reviews", cta_book:"Book a Tour", cta_book_short:"Book a Tour",
    hero_title:"FunsCool International Preschool in Belgrade", hero_tag:"A happy childhood — every day", hero_sub:"A boutique preschool for children 1.2–7 in central Belgrade (Dorćol): small groups, three languages every day, gentle adaptation, Montessori &amp; Waldorf.",
    cta_programs:"Our programs", addr:"Dorćol, Popovića 14A, Belgrade", addr_sub:"Quiet central location, safe neighborhood",
    rating:"Rated on Yandex",
    f1_t:"Small groups", f1_d:"up to 15 children", f2_t:"Gentle adaptation", f2_d:"a stress-free start",
    f3_t:"Multilingual environment", f3_d:"Russian, Serbian, English", f4_t:"Exclusive curriculum", f4_d:"based on Montessori and Waldorf approach", feat_h:"Why FunsCool",
    sreda_eyebrow:"Safe development every day", sreda_title:"A preschool environment designed to grow with your child",
    sreda_text:"Thoughtful spaces, colors, materials and zones help children grow confident, independent and happy.",
    sreda_1:"Colors and characters by the Waldorf system for each age", sreda_2:"7–8 developmental zones in each group depending on age",
    sreda_3:"Safe materials and space for free exploration", sreda_4:"Development at every stage — from sensory play to creativity and projects",
    prog_eyebrow:"Age groups", prog_title:"FunsCool preschool groups — from 1.2 to 7 years", prog_sub:"Each group is an important stage in your child's development.",
    p1_name:"Baby-Fun", p1_age:"1.2–2.5 years", p1_desc:"First steps toward independence in an atmosphere of care and safety.",
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
    play_eyebrow:"Fresh air", play_title:"Our own safe playground and a preschool in the heart of the Serbian capital",
    play_1:"Walks twice a day on the preschool's own playground", play_2:"Fenced and completely safe",
    play_3:"Plenty of movement, play and discovery every day", play_4:"Clean air and greenery in quiet central Dorćol",
    about_eyebrow:"In the quiet centre of Dorćol", about_title:"A house with history in the heart of Belgrade",
    about_text:"Funscool is a licensed preschool operating under the state program and modern pedagogical approaches. We value tradition, professionalism and an individual approach to every child.",
    about_b1:"Licensed preschool", about_b2:"State program", about_b3:"Professional team",
    net_eyebrow:"An international network", net_title:"FunsCool is a network of preschools", net_photo:"Cyprus", net_cta:"More about Cyprus",
    net_text:"We're growing beyond Belgrade. FunsCool is an international network, and one of our preschools is in Cyprus — the same values, gentle adaptation and signature programme, in a warm Mediterranean setting.",
    day_eyebrow:"A well-planned daily rhythm", day_title:"A day at FunsCool preschool",
    day_text:"We've thought through every hour of the day so that a child develops harmoniously, with joy and at their own pace.",
    day_quote_t:"Every moment matters", day_quote_d:"Care, attention and support — the foundation of a happy childhood.",
    day_hours:"07:00 – 18:00", day_meals:"5 meals a day",
    clk1:"Morning welcome, greeting and exercise", clk2:"Tasty breakfast", clk3:"Activities in the multilingual program",
    clk4:"Fruit snack", clk5:"An engaging walk", clk6:"Healthy lunch", clk7:"Daytime rest and relaxation",
    clk8:"Nourishing snack", clk9:"Montessori / Waldorf method classes", clk10:"Hearty dinner",
    clk11:"Walk, clubs and activities", clk12:"Farewell",
    joy_eyebrow:"Joy — every single day", joy_title:"Joy — every single day",
    joy_sub:"Life at our preschool is more than lessons and a daily routine. Children take part in celebrations and theatre performances, cook together with teachers, create projects, go on excursions and get to know the traditions of different cultures.",
    ev1_t:"Celebrations & traditions", ev1_d:"Seasonal holidays, cultural traditions and community events.",
    ev2_t:"Theatre & stage", ev2_d:"Playing roles, performing and living out stories together.",
    ev3_t:"Little chef", ev3_d:"Cooking together, tasting and learning independence through practice.",
    ev4_t:"Projects & discoveries", ev4_d:"We explore, create and present the result.",
    ev5_t:"Excursions & new places", ev5_d:"Museums, nature, the city and new impressions beyond the school.",
    ev6_t:"FunsCool Family Events", ev6_d:"Events, celebrations and get-togethers with families.",
    joy_end:"Childhood is made of moments worth remembering.",
    joy1_t:"A love for learning", joy1_d:"We spark curiosity and engage children through play and warm communication.",
    joy2_t:"Bright days — never routine", joy2_d:"Themed days, creativity and experiments — every day brings something special.",
    joy3_t:"Memorable events", joy3_d:"Quests, celebrations and real adventures — what children look forward to and love to share.",
    joy4_t:"Confidence and the joy of wins", joy4_d:"Teachers support and notice each child's progress, helping them believe in themselves.",
    team_eyebrow:"With love and care", team_title:"The team at FunsCool preschool",
    team_sub:"Four teachers and an administrator who nurture a calm, warm and caring atmosphere every day.", team_ask:"Ask a question",
    rev_eyebrow:"Parents' reviews", rev_title:"What parents say about us", rev_sub:"Real reviews from FunsCool families.",
    feed_title:"What's on", feed_more:"Show more", feed_all:"See all", news_back:"Home", feed_empty:"Nothing here yet — check back soon.",
    feed_arch_title:"What's on — life at FunsCool kindergarten", feed_arch_sub:"News, events, celebrations and everything our kindergarten lives by.",
    /* teacher cards are rendered from content/teachers.json */
    mom_eyebrow:"Every moment matters", mom_title:"Happy moments, every single day",
    mom_sub:"We play, create, explore and grow together. Every day at Funscool is filled with joy and new discoveries.",
    mom_note:"A safe, caring and inspiring environment — from morning to evening.",
    faq_eyebrow:"Frequent questions", faq_title:"Frequently asked questions about FunsCool preschool",
    faq_q1:"What does adaptation look like?", faq_a1:"We start with short visits together with a parent and gradually extend the time. We match the pace to the child — gently, without stress or tears. Parents receive a special adaptation diary that connects what happens with the child at preschool and what the family does at home. We observe the child together and, at the end of the programme, decide on the attendance schedule they are ready for right now.",
    faq_q2:"Can we start with half a day?", faq_a2:"Yes. Many children start with half a day and then smoothly move to a full day when they're ready.",
    faq_q3:"Which languages are used?", faq_a3:"Russian, Serbian and English are used every day. Children absorb the multilingual environment naturally — through play, activities, songs, reading and real conversation.",
    faq_q4:"How are meals organised?", faq_a4:"Five meals a day: breakfast, a fruit snack, lunch, a snack and dinner. A balanced menu; we account for special needs and allergies.",
    faq_q5:"How many children are in a group?", faq_a5:"Small groups of up to 15 children — so each child gets enough of the teacher's attention.",
    faq_q6:"How can we book a visit?", faq_a6:"Leave a request in the form below or give us a call — we'll arrange a convenient time for a tour.", faq_q7:"From what age do you accept children?", faq_a7:"We welcome children from around age 1.2 — once a child walks confidently, eats with a spoon and drinks from a cup. For the youngest there is the Baby-Fun adaptation group.", faq_q8:"Are there walks and an own playground?", faq_a8:"Yes. Children spend time outdoors twice a day in our own enclosed playground on the preschool grounds — no public playgrounds and no road crossings.",
    form_title:"Want to see the preschool with your own eyes?", form_text:"Leave a request — we'll show the space, answer your questions and find the right group for your child. We'll send the schedule, events and daily routine.",
    form_call:"Call us", form_card_title:"Book a Tour", form_card_sub:"Fill out the form — we'll get back to you shortly.",
    cta_rating:"Rating on Yandex", cta_c1:"Small groups up to 15", cta_c2:"Licensed kindergarten", intro_skip:"Skip →",
    form_name:"Your name", form_phone:"Phone number", form_age:"Child's age", form_submit:"Leave your contacts",
    form_privacy:"We value your privacy and never share your data with third parties.", form_ok:"Thank you! Your request has been received — we'll be in touch soon.",
    form_group:"Group", form_group_ph:"Choose a group", form_age_lbl:"Age", form_child:"Child's name", form_wa:"Send via WhatsApp", form_err:"Couldn't send. Message us on WhatsApp:",
    form_add_child:"Add child", form_contact_hint:"Leave a phone or e-mail — whichever suits you.",
    offers_btn:"Current offers", offers_eyebrow:"Special offers", offers_title:"Current offers",
    offers_sub:"A few beneficial options for our families — ask for details when you enrol.",
    offer1_t:"Payment with maternity capital", offer1_d:"We accept payment for the kindergarten using maternity-capital funds.",
    offer2_t:"20% off for the first 20 families", offer2_d:"The first 20 families to enrol in the new intake get 20% off tuition.",
    offer3_t:"5% sibling discount", offer3_d:"If two or more children from one family attend, a 5% discount applies.",
    offers_cta:"Book a tour", offers_note:"Offers can't be combined. Ask our administrator for details.",
    footer_tagline:"Growing with love and care every day.", footer_nav:"Navigation", footer_programs:"Programs",
    foot_p1:"Baby-Fun · 1.2–2.5", foot_p2:"Energy-Fun · 2.5–3.5", foot_p3:"Discovery-Fun · 3.5–4.5", foot_p4:"Creative-Fun · 4.5–6", foot_p5:"Pre-school · 5.5–7",
    footer_contacts:"Contacts", footer_rights:"All rights reserved", footer_privacy:"Privacy policy"
  };

  var DICT = { ru: RU, sr: SR, en: EN };
  var PH = { ru: RU_PH,
    sr: { form_name:"Vaše ime", form_phone:"Telefon", form_child:"Ime deteta", form_email:"E-mail", form_question_ph:"Vaše pitanje (po želji)" },
    en: { form_name:"Your name", form_phone:"Phone number", form_child:"Child's name", form_email:"E-mail", form_question_ph:"Your question (optional)" } };
  // EN audience for a Belgrade kindergarten = expats in Belgrade → Serbian number
  var PHONE = { ru:["+7 (499) 283-46-28","+74992834628"], en:["+381 (69) 283-46-28","+381692834628"], sr:["+381 (69) 283-46-28","+381692834628"] };

  /* per-page <title>/description/OG, localized (QA BUG-06). Group page titles are
     set by group.js. */
  var META = {
    index: {
      ru: { t: "Частный международный детский сад FunsCool в Белграде · 1,2–7 лет", d: "Частный международный детский сад FunsCool в центре Белграда (Дорчол) для детей от 1,2 до 7 лет. Мини-группы, русский, сербский и английский языки каждый день, бережная адаптация и авторская программа на основе Montessori и Waldorf. Запишитесь на экскурсию." },
      sr: { t: "Privatni međunarodni vrtić FunsCool u Beogradu · 1,2–7 godina", d: "Privatni međunarodni vrtić FunsCool u centru Beograda (Dorćol) za decu od 1,2 do 7 godina. Male grupe, ruski, srpski i engleski svaki dan, blaga adaptacija i autorski program po Montessori i Waldorf pristupu. Zakažite obilazak." },
      en: { t: "FunsCool International Preschool in Belgrade · ages 1.2–7", d: "Private international preschool FunsCool in central Belgrade (Dorćol) for ages 1.2–7. Small groups, Russian, Serbian and English every day, gentle adaptation and a Montessori & Waldorf-based curriculum. Book a tour." }
    },
    news: {
      ru: { t: "Актуальное — жизнь детского сада FunsCool", d: "Новости, события, праздники и жизнь детского сада FunsCool. Архив всех записей раздела «Актуальное»." },
      sr: { t: "Aktuelno — život vrtića FunsCool", d: "Novosti, događaji, praznici i život vrtića FunsCool. Arhiva svih objava u odeljku «Aktuelno»." },
      en: { t: "What’s on — life at FunsCool kindergarten", d: "News, events, celebrations and daily life of FunsCool kindergarten. Archive of all posts." }
    }
  };
  var PAGE = (document.body && document.body.getAttribute('data-page')) || 'index';
  function metaEl(sel, attr, key) {
    var el = document.head.querySelector(sel);
    if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
    return el;
  }
  function updateMeta(lang) {
    var m = META[PAGE] && (META[PAGE][lang] || META[PAGE].ru);
    if (!m) return; // group page — group.js owns the title
    document.title = m.t;
    metaEl('meta[name="description"]', 'name', 'description').setAttribute('content', m.d);
    metaEl('meta[property="og:title"]', 'property', 'og:title').setAttribute('content', m.t);
    metaEl('meta[property="og:description"]', 'property', 'og:description').setAttribute('content', m.d);
    var ol = document.head.querySelector('meta[property="og:locale"]');
    if (ol) ol.setAttribute('content', lang === 'sr' ? 'sr_RS' : lang === 'en' ? 'en_RS' : 'ru_RS');
  }

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
      a.setAttribute('data-ask', '1'); // opens the modal in "question to teachers" mode
      a.textContent = askTxt;
      body.appendChild(a);

      art.appendChild(photoWrap);
      art.appendChild(body);
      grid.appendChild(art);
    });
    try { document.dispatchEvent(new Event('fs:teachers-rendered')); } catch (e) {}
  }
  function renderReviews(lang) {
    // review cards are images (content/reviews.json, editable in the CMS)
    var grid = document.getElementById('revGrid');
    if (!grid || !CONTENT || !Array.isArray(CONTENT.reviews)) return;
    grid.textContent = '';
    CONTENT.reviews.forEach(function (r) {
      var src = String((r && r.photo) || '').replace(/^\//, ''); // keep paths relative to the site root
      if (!src) return;
      var fig = document.createElement('figure');
      fig.className = 'rev-card';
      var img = document.createElement('img');
      img.src = src;
      img.alt = (typeof r.alt === 'string' && r.alt) ? r.alt : 'Отзыв о детском саде FunsCool';
      img.loading = 'lazy';
      img.width = 720; img.height = 1280;
      fig.appendChild(img);
      grid.appendChild(fig);
    });
    try { document.dispatchEvent(new Event('fs:teachers-rendered')); } catch (e) {} // re-scan sliders
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
  function feedCard(it, lang) {
    // A single «Актуальное» card in the плашка (ev-card) style: photo on top
    // (or a «?» placeholder until a real photo is added), optional date, title,
    // text. No 'reveal' class: cards are built after the reveal observer has
    // already scanned the page, so a reveal class would leave them stuck at
    // opacity:0 (invisible).
    var art = document.createElement('article');
    art.className = 'ev-card';
    var photo = document.createElement('div');
    var src = String(it.photo || '').replace(/^\//, '');
    if (src) {
      photo.className = 'ev-photo';
      var img = document.createElement('img');
      img.src = src; img.alt = tr(it.title, lang); img.loading = 'lazy';
      photo.appendChild(img);
    } else {
      // intentional "photo coming soon" placeholder (a soft picture icon),
      // instead of a stark "?" that reads like a broken/failed image
      photo.className = 'ev-photo ev-ph';
      photo.innerHTML = '<svg class="ev-ph-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4.5" width="18" height="15" rx="3"/><circle cx="8.5" cy="10" r="1.7"/><path d="M3.5 17.5 8.6 12.9a2 2 0 0 1 2.7 0l3.4 3.1"/><path d="m13.5 15.2 1.7-1.6a2 2 0 0 1 2.7-.05l2.6 2.3"/></svg>';
    }
    art.appendChild(photo);
    if (it.date) {
      var d = document.createElement('span'); d.className = 'ev-date'; d.textContent = it.date;
      art.appendChild(d);
    }
    var h3 = document.createElement('h3'); h3.textContent = tr(it.title, lang);
    art.appendChild(h3);
    var txt = tr(it.text, lang);
    if (txt) { var p = document.createElement('p'); p.textContent = txt; art.appendChild(p); }
    return art;
  }
  function renderFeed(lang) {
    // «Актуальное» — the unified «Радость — каждый день» + news feed from
    // content/news.json (CMS-editable). Each item has a type: "joy" (Радость —
    // каждый день, pinned first) or "news" (a regular news item, shown after).
    // «joy» items are stable-sorted to the front so they stay the pinned cards
    // even if the admin order changes. Two surfaces:
    //   #feedList          — main page: 3 cards, "показать ещё" reveals up to 6,
    //                        then a link to the archive page (news.html).
    //   #feedArchiveList   — archive page: every item (joy first, then news).
    var items = (CONTENT && Array.isArray(CONTENT.news)) ? CONTENT.news : [];
    var visible = items.filter(function (it) { return it && (tr(it.title, lang) || tr(it.text, lang)); });
    // stable sort: joy (0) before news (1); unknown types are treated as news
    visible = visible
      .map(function (it, idx) { return { it: it, idx: idx, rank: (it.type === 'joy') ? 0 : 1 }; })
      .sort(function (a, b) { return (a.rank - b.rank) || (a.idx - b.idx); })
      .map(function (o) { return o.it; });

    // --- main page: compact block (3 → +3 → link) ---
    // The «Радость — каждый день» intro (heading + photo) is static, so the
    // section stays visible even before/without cards; we only fill the grid
    // and toggle the buttons.
    var sec = document.getElementById('feed');
    var list = document.getElementById('feedList');
    if (sec && list) {
      sec.hidden = false;
      list.textContent = '';
      visible.slice(0, 6).forEach(function (it, i) {
        var card = feedCard(it, lang);
        if (i >= 3 && !feedExpanded) card.classList.add('news-hidden');
        list.appendChild(card);
      });
      // "Показать ещё" while collapsed and there are more than 3 items;
      // "Смотреть всё" once expanded (or when everything already fits).
      var moreBtn = document.getElementById('feedMore');
      if (moreBtn) moreBtn.hidden = !(visible.length > 3) || feedExpanded;
      // "Смотреть всё" only when the archive holds more than the main block shows —
      // never with ≤3 records (archive would be identical). QA BUG-15.
      var allLink = document.getElementById('feedAll');
      if (allLink) allLink.hidden = !(visible.length > 3) || (!feedExpanded && visible.length <= 6);
    }

    // --- archive page: the whole feed ---
    var arch = document.getElementById('feedArchiveList');
    if (arch) {
      arch.textContent = '';
      var emptyEl = document.getElementById('feedArchiveEmpty');
      if (!visible.length) {
        if (emptyEl) emptyEl.hidden = false;
      } else {
        if (emptyEl) emptyEl.hidden = true;
        visible.forEach(function (it) { arch.appendChild(feedCard(it, lang)); });
      }
    }
  }
  function renderDynamic(lang) {
    renderTeachers(lang);
    renderReviews(lang);
    renderFaq(lang);
    renderFeed(lang);
  }

  /* ---------- typography: smoother line breaks (RU/SR/EN) ----------
     Russian/Serbian rule: a short function word (в, и, к, с, для…) must not be
     left hanging at the end of a line, and short hyphenated names (Baby-Fun,
     мини-группы) must not split. We glue those with a non-breaking space /
     non-breaking hyphen. Works on text nodes only, so inline <b>/<span> are
     preserved; re-running is idempotent. Runs on load and after every render. */
  var TYPO_GLUE = /(^|[\s(«"„'—–‒])([A-Za-zА-Яа-яЁёЈјЉљЊњЋћЂђЏџ]{1,2}|для|или|под|над|при|про|без|что|как|это|над|the|and|for|but|per|via|iz|od|sa|za|na|po|do|uz|ka)(\s)/gi;
  function fixTypography(root) {
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var p = node.parentNode; if (!p) return;
      var tag = p.nodeName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA' || tag === 'CODE') return;
      var t = node.nodeValue;
      if (!t || t.length < 2 || (t.indexOf(' ') === -1 && t.indexOf('-') === -1)) return;
      var glue = function (m, pre, w) { return pre + w + ' '; };
      // glue short function words to the next word; run twice for chains like "и в"
      var out = t.replace(TYPO_GLUE, glue).replace(TYPO_GLUE, glue);
      // keep short hyphenated names together (Baby-Fun, Беби-Фан, мини-группы, 5-разовое)
      out = out.replace(/([A-Za-zА-Яа-яЁё0-9]{1,7})-([A-Za-zА-Яа-яЁё]{2,8})/g, function (m, a, b) {
        return (m.length <= 14) ? (a + '‑' + b) : m;
      });
      if (out !== t) node.nodeValue = out;
    });
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
    updateMeta(lang);
    document.querySelectorAll('.lang button').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-lang') === lang); });
    try { localStorage.setItem('fs-lang', lang); } catch (e) {}
    renderDynamic(lang);
    fixTypography(document.body);
  }
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });
  // "Показать ещё" on the main-page «Актуальное» block: reveal cards 4–6
  var feedMoreBtn = document.getElementById('feedMore');
  if (feedMoreBtn) feedMoreBtn.addEventListener('click', function () { feedExpanded = true; renderFeed(currentLang); });
  var saved; try { saved = localStorage.getItem('fs-lang'); } catch (e) {}
  if (saved && saved !== 'ru') setLang(saved);
  else fixTypography(document.body);   // RU (inline) has no setLang pass on load

  /* load editable content, then render the data-driven sections in the current language */
  (function loadContent() {
    var files = ['content/teachers.json', 'content/faq.json', 'content/news.json', 'content/reviews.json'];
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
      fixTypography(document.body);
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
    // the constant dot→card gap is handled in CSS via each card's --rx/--ry
    // radial vector (see .ev.clk-item in the desktop media query)
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
    // make the clock dots real keyboard controls (QA BUG-22)
    function dotLabel(j) {
      var it = items[j]; if (!it) return 'Пункт ' + (j + 1);
      var time = it.querySelector('.clk-time, .ev-time'), txt = it.querySelector('h4, .clk-text, p');
      return [time && time.textContent.trim(), txt && txt.textContent.trim()].filter(Boolean).join(' — ') || ('Пункт ' + (j + 1));
    }
    dots.forEach(function (d, j) {
      d.setAttribute('tabindex', '0'); d.setAttribute('role', 'button'); d.setAttribute('aria-label', dotLabel(j));
      d.addEventListener('click', function () { goTo(j); });
      d.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); goTo(j); } });
    });
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

  /* ---------- offers modal ("Актуальные предложения") ---------- */
  (function () {
    var modal = document.getElementById('offersModal');
    if (!modal) return;
    var lastFocus = null;
    function open(e, trigger) {
      if (e) e.preventDefault();
      lastFocus = trigger || document.activeElement;
      modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      var first = modal.querySelector('.modal-x');
      setTimeout(function () { try { first && first.focus(); } catch (_) {} }, 60);
    }
    function close() {
      modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      try { lastFocus && lastFocus.focus && lastFocus.focus(); } catch (_) {}
    }
    // runs before the booking handler below, so when the window's CTA points at
    // #contact this closes the offers window first and the booking form opens cleanly
    document.addEventListener('click', function (e) {
      if (!e.target.closest) return;
      var trigger = e.target.closest('[data-offers]');
      if (trigger) { open(e, trigger); return; }
      if (modal.classList.contains('open') && e.target.closest('a[href="#contact"]')) close();
    });
    modal.querySelectorAll('[data-offers-close]').forEach(function (el) { el.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });
  })();

  /* ---------- booking modal (open on any "Записаться"/#contact link) ---------- */
  (function () {
    var modal = document.getElementById('bookModal');
    if (!modal) return;
    var lastFocus = null;
    var titleEl = document.getElementById('bookTitle');
    var subEl = modal.querySelector('.modal-sub');
    var questionEl = document.getElementById('questionInput');
    // "Задать вопрос педагогам" — same window, slightly different wording
    var ASK = {
      title: { ru: 'Задать вопрос педагогам', sr: 'Postavite pitanje vaspitačima', en: 'Ask our teachers a question' },
      sub:   { ru: 'Оставьте контакты и свой вопрос — педагоги ответят вам в ближайшее время.', sr: 'Ostavite kontakt i pitanje — vaspitači će vam se javiti u najkraćem roku.', en: 'Leave your contact and question — our teachers will get back to you soon.' }
    };
    function bookTxt(key) { var d = DICT[currentLang]; return (d && d[key] != null) ? d[key] : (RU[key] || ''); }
    function setMode(ask) {
      if (titleEl) titleEl.textContent = ask ? (ASK.title[currentLang] || ASK.title.ru) : bookTxt('form_card_title');
      if (subEl)   subEl.textContent   = ask ? (ASK.sub[currentLang]   || ASK.sub.ru)   : bookTxt('form_card_sub');
    }
    function open(e, trigger) {
      if (e) e.preventDefault();
      lastFocus = document.activeElement;
      var ask = !!(trigger && trigger.hasAttribute('data-ask'));
      setMode(ask);
      modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      var first = ask && questionEl ? questionEl : modal.querySelector('select, input:not([type=hidden]), button');
      setTimeout(function () { try { first && first.focus(); } catch (_) {} }, 60);
    }
    function close() {
      modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      try { lastFocus && lastFocus.focus(); } catch (_) {}
    }
    // delegation: covers static links AND dynamically-rendered teacher "Задать вопрос" buttons
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href="#contact"]');
      if (a) open(e, a);
    });
    modal.querySelectorAll('[data-close]').forEach(function (el) { el.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });

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

    /* ----- submit → Google Apps Script (branded Gmail email); WhatsApp fallback ----- */
    // Письмо отправляет Google Apps Script с почты сада (GitHub Pages серверный код
    // не запускает). Чтобы сменить адрес — поменяй ТОЛЬКО эту строку (и action у
    // <form> в index.html / group.html / news.html). Подробности — в MAIL-SETUP.md.
    var LEAD_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwZzChpd-rgbdyskw3TQKpzum99TVH9AkPGCte5RAbzMQKcppXCvsoFYEliE24L2O1b7A/exec';
    var form = document.getElementById('leadForm');
    if (!form) return;
    var emailInput = document.getElementById('emailInput');
    form.querySelectorAll('input, select').forEach(function (i) { i.addEventListener('input', function () { this.style.borderColor = ''; }); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameField = form.querySelector('[name="parent"]');
      var nameVal = nameField ? nameField.value.trim() : '';
      var digits = pin ? pin.value.replace(/\D/g, '') : '';
      var need = (cc && cc.value === 'rs') ? 8 : 10;
      var phoneOk = digits.length >= need;
      var emailVal = emailInput ? emailInput.value.trim() : '';
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
      if (!nameVal) { if (nameField) { nameField.focus(); nameField.style.borderColor = 'var(--coral)'; } return; }
      if (!phoneOk && !emailOk) {
        if (pin) pin.style.borderColor = 'var(--coral)';
        if (emailInput) emailInput.style.borderColor = 'var(--coral)';
        (emailVal && emailInput ? emailInput : pin).focus();
        return;
      }
      sync();
      var honey = form.querySelector('[name="_honey"]');
      var question = questionEl ? questionEl.value.trim() : '';
      var payload = {
        children: [],
        parent: nameVal,
        phone: phoneOk && pfull ? pfull.value : '',
        email: emailOk ? emailVal : '',
        question: question,
        hp: honey ? honey.value : ''
      };
      var ok = document.getElementById('formSuccess');
      var errBox = document.getElementById('formError');
      var wa = document.getElementById('waFallback');
      var btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      // text/plain — «простой» запрос без CORS-preflight (Apps Script не отвечает на OPTIONS)
      fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) })
        .then(function (r) {
          if (!r.ok) throw new Error('http ' + r.status);
          if (ok) ok.classList.add('show');
          try { if (window.fsTrackLead) window.fsTrackLead(); } catch (_) {}  // mark the form as a Meta/GA event
          form.reset(); if (pin) pin.value = '';
        })
        .catch(function () {
          var text = 'Здравствуйте! Хочу оставить заявку в Funscool.\n'
            + (nameVal ? 'Имя: ' + nameVal + '\n' : '')
            + (phoneOk && pfull ? 'Телефон: ' + pfull.value + '\n' : '')
            + (emailOk ? 'E-mail: ' + emailVal + '\n' : '')
            + (question ? 'Вопрос: ' + question : '');
          if (wa) { wa.href = 'https://wa.me/381644445550?text=' + encodeURIComponent(text); wa.hidden = false; }
          if (errBox) errBox.hidden = false;
        })
        .then(function () { if (btn) btn.disabled = false; });
    });
  })();

  /* keep Tab inside an open modal so focus can't wander to the page behind it (QA BUG-09) */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var open = document.querySelector('.modal.open');
    if (!open) return;
    var card = open.querySelector('.modal-card') || open;
    var nodes = card.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]):not([type=hidden]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
    var f = Array.prototype.filter.call(nodes, function (el) { return el.offsetWidth || el.offsetHeight || el.getClientRects().length; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (!card.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

  /* hide the WhatsApp FAB while the hero (and its «Записаться» CTA) is on screen,
     so on small phones the FAB never overlaps the main button (QA BUG-08) */
  (function () {
    var fab = document.querySelector('.wa-fab');
    var hero = document.querySelector('.hero');
    if (!fab || !hero || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { fab.classList.toggle('fab-hidden', e.isIntersecting); });
    }, { threshold: 0.05 }).observe(hero);
  })();

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

  /* ---------- reviews: click a review to see it larger in a floating window
     (desktop / large screens only; on phones the card is already big) ---------- */
  (function () {
    var box = null;
    function close() { if (box) { box.classList.remove('open'); document.body.classList.remove('modal-open'); } }
    function open(src, alt) {
      if (!box) {
        box = document.createElement('div');
        box.className = 'rev-lightbox';
        box.innerHTML = '<button class="rev-lightbox-x" type="button" aria-label="Закрыть">&times;</button><img alt="">';
        box.addEventListener('click', function (e) { if (e.target === box || e.target.closest('.rev-lightbox-x')) close(); });
        document.body.appendChild(box);
      }
      var img = box.querySelector('img');
      img.src = src; img.alt = alt || '';
      box.classList.add('open');
      document.body.classList.add('modal-open');
    }
    document.addEventListener('click', function (e) {
      var img = e.target.closest && e.target.closest('.rev-card img');
      if (!img) return;
      if (window.matchMedia && !window.matchMedia('(min-width: 901px)').matches) return; // large screens only
      open(img.currentSrc || img.src, img.alt);
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  })();
})();
