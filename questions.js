// German A2 Exam - 90 Comprehensive Questions across 3 Topics (30 questions each)
// Topic 1: Komparativ & Superlativ (inkl. als & wie) [Questions 1-30]
// Topic 2: Reflexive Verben (Akkusativ, Dativ, Position, Präpositionen) [Questions 31-60]
// Topic 3: Adjektivendung nach bestimmtem Artikel (Nominativ, Akkusativ, Dativ) [Questions 61-90]

const QUESTIONS = [
  // =========================================================================
  // TOPIC 1: Komparativ & Superlativ (inkl. als & wie) — 30 Questions
  // =========================================================================
  {
    id: 1,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "mcq",
    prompt: "Das Auto ist schnell, aber das Flugzeug ist ________.",
    options: ["schnell", "schneller", "am schnellsten", "mehr schnell"],
    correctAnswer: "schneller",
    points: 1,
    explanation: "Adjektiv-এর সাধারণ Komparativ রূপ তৈরিতে মূল শব্দের শেষে -er যুক্ত হয় (schnell + er = schneller)। জার্মান ভাষায় ইংরেজির মতো 'more' বা 'mehr' ব্যবহার করা হয় না।"
  },
  {
    id: 2,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "mcq",
    prompt: "Mein altes Fahrrad war billig, aber mein neues Fahrrad ist noch ________.",
    options: ["billiger", "am billigsten", "billig", "mehr billig"],
    correctAnswer: "billiger",
    points: 1,
    explanation: "billig-এর Komparativ রূপ হলো billiger (-er যোগ হয়)।"
  },
  {
    id: 3,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "text",
    prompt: "Adjektiv-টির Komparativ রূপ লিখুন: klein -> ________",
    acceptableAnswers: ["kleiner"],
    points: 1,
    explanation: "klein-এর Komparativ রূপ হলো kleiner।"
  },
  {
    id: 4,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "text",
    prompt: "Adjektiv-টির Komparativ রূপ লিখুন: schön -> ________",
    acceptableAnswers: ["schöner", "schoener"],
    points: 1,
    explanation: "schön-এর Komparativ রূপ হলো schöner।"
  },
  {
    id: 5,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "mcq",
    prompt: "Dieses Buch ist interessant, aber jener Film ist ________.",
    options: ["interessanter", "mehr interessant", "am interessantesten", "interessanteste"],
    correctAnswer: "interessanter",
    points: 1,
    explanation: "জার্মান ভাষায় দীর্ঘ শব্দের ক্ষেত্রেও 'mehr' বসে না, সরাসরি শব্দের শেষে -er যুক্ত হয়: interessant -> interessanter।"
  },
  {
    id: 6,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "mcq",
    prompt: "Mein Großvater ist 80 Jahre alt, aber mein Urgroßvater ist noch ________.",
    options: ["älter", "alter", "am ältesten", "mehr alt"],
    correctAnswer: "älter",
    points: 1,
    explanation: "alt এক-সিলেবলের শব্দ এবং স্বরবর্ণ 'a' থাকায় Komparativ-এ Umlaut যুক্ত হয়ে 'älter' হয়।"
  },
  {
    id: 7,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "mcq",
    prompt: "Berlin ist ________ als Bonn.",
    options: ["größer", "großer", "am größten", "mehr groß"],
    correctAnswer: "größer",
    points: 1,
    explanation: "groß-এর 'o' Umlaut হয়ে ö হয় এবং -er যুক্ত হয়ে 'größer' হয়।"
  },
  {
    id: 8,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "text",
    prompt: "Adjektiv-টির Komparativ রূপ লিখুন: jung -> ________",
    acceptableAnswers: ["jünger", "juenger"],
    points: 1,
    explanation: "jung-এর স্বরবর্ণ 'u' Umlaut হয়ে ü হয়: jünger।"
  },
  {
    id: 9,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "mcq",
    prompt: "Im Winter ist es in Deutschland ________ als in Italien.",
    options: ["kälter", "kalter", "am kältesten", "mehr kalt"],
    correctAnswer: "kälter",
    points: 1,
    explanation: "kalt শব্দটিতে 'a' Umlaut হয়ে 'kälter' হয়।"
  },
  {
    id: 10,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "text",
    prompt: "Adjektiv-টির Komparativ রূপ লিখুন: warm -> ________",
    acceptableAnswers: ["wärmer", "waermer"],
    points: 1,
    explanation: "warm শব্দটিতে 'a' Umlaut হয়ে wärmer হয়।"
  },
  {
    id: 11,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "mcq",
    prompt: "Der Nil ist ________ als der Rhein.",
    options: ["länger", "langer", "am längsten", "mehr lang"],
    correctAnswer: "länger",
    points: 1,
    explanation: "lang শব্দে Umlaut হয়ে 'länger' হয়।"
  },
  {
    id: 12,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "mcq",
    prompt: "Obst ist ________ als Fast Food.",
    options: ["gesünder", "gesunder", "am gesündesten", "mehr gesund"],
    correctAnswer: "gesünder",
    points: 1,
    explanation: "gesund শব্দে 'u' Umlaut হয়ে 'gesünder' হয়।"
  },
  {
    id: 13,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "mcq",
    prompt: "Das Zimmer ist ________ als die Küche.",
    options: ["leiser", "leiseer", "am leisesten", "mehr leise"],
    correctAnswer: "leiser",
    points: 1,
    explanation: "যে সব Adjektiv-এর শেষে ইতোমধ্যে -e থাকে, সেগুলোতে শুধু -r যুক্ত হয়: leise -> leiser।"
  },
  {
    id: 14,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "mcq",
    prompt: "Der Flug ist ________ als die Zugfahrt.",
    options: ["teurer", "teuerer", "am teuersten", "teurers"],
    correctAnswer: "teurer",
    points: 1,
    explanation: "teuer শব্দটিতে Komparativ করার সময় মাঝের 'e' ঝরে যায় (teuer -> teurer, teuerer নয়)।"
  },
  {
    id: 15,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "text",
    prompt: "Adjektiv-টির Komparativ রূপ লিখুন: teuer -> ________",
    acceptableAnswers: ["teurer"],
    points: 1,
    explanation: "teuer-এর মাঝের e বাদ পড়ে teurer হয়।"
  },
  {
    id: 16,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "mcq",
    prompt: "Tee schmeckt mir gut, aber Kaffee schmeckt mir ________.",
    options: ["besser", "guter", "mehr gut", "am besten"],
    correctAnswer: "besser",
    points: 1,
    explanation: "gut একটি সম্পূর্ণ irregular Adjektiv; এর Komparativ হলো besser।"
  },
  {
    id: 17,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "mcq",
    prompt: "Er hat viel Geld, aber seine Schwester hat noch ________.",
    options: ["mehr", "vieler", "am meisten", "mehrer"],
    correctAnswer: "mehr",
    points: 1,
    explanation: "viel-এর Komparativ রূপ হলো mehr।"
  },
  {
    id: 18,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "mcq",
    prompt: "Ich trinke gern Tee, aber ich trinke noch ________ Kaffee.",
    options: ["lieber", "gerner", "mehr gern", "am liebsten"],
    correctAnswer: "lieber",
    points: 1,
    explanation: "gern-এর Komparativ রূপ হলো lieber।"
  },
  {
    id: 19,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "mcq",
    prompt: "Dieser Turm ist ________ als jener Baum.",
    options: ["höher", "hocher", "höchst", "am höchsten"],
    correctAnswer: "höher",
    points: 1,
    explanation: "hoch-এর Komparativ করার সময় 'c' বাদ পড়ে এবং Umlaut হয়: hoch -> höher।"
  },
  {
    id: 20,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "mcq",
    prompt: "Die Apotheke ist ________ als die Post.",
    options: ["näher", "naher", "nächster", "am nächsten"],
    correctAnswer: "näher",
    points: 1,
    explanation: "nah-এর Komparativ রূপ হলো näher (Superlativ হলো am nächsten)।"
  },
  {
    id: 21,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "mcq",
    prompt: "Von allen Verkehrsmitteln ist das Flugzeug am ________.",
    options: ["schnellsten", "schnellesten", "schneller", "schnellste"],
    correctAnswer: "schnellsten",
    points: 1,
    explanation: "Adjektiv/Adverb হিসেবে বাক্যের শেষে Superlativ গঠনে 'am + Adjektiv + -sten' বসে: am schnellsten।"
  },
  {
    id: 22,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "mcq",
    prompt: "Der Januar ist in Deutschland am ________.",
    options: ["kältesten", "kaltsten", "kältsten", "kälter"],
    correctAnswer: "kältesten",
    points: 1,
    explanation: "-d, -t, -s, -ß, -x, -z দিয়ে শেষ হওয়া শব্দে উচ্চারণের সুবিধার্থে Superlativ-এ -esten বসে এবং kalt-এ Umlaut হয়ে 'am kältesten' হয়।"
  },
  {
    id: 23,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "mcq",
    prompt: "Er ist der ________ Junge in der ganzen Klasse.",
    options: ["größte", "größeste", "größste", "größer"],
    correctAnswer: "größte",
    points: 1,
    explanation: "Noun-এর পূর্বে Superlativ বসলে 'am' বসে না, bestimmter Artikel + Adjektiv + -ste বসে (groß -> größte)।"
  },
  {
    id: 24,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "text",
    prompt: "Adjektiv-টির Superlativ রূপ লিখুন (am সহ): gut -> ________",
    acceptableAnswers: ["am besten", "besten"],
    points: 1,
    explanation: "gut -> besser -> am besten।"
  },
  {
    id: 25,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "mcq",
    prompt: "Lana unterrichtet besser ________ Mika.",
    options: ["als", "wie", "denn", "so"],
    correctAnswer: "als",
    points: 1,
    explanation: "Komparativ-এর মাধ্যমে অসম বা আলাদা তুলনা বোঝালে সর্বদা 'als' বসে (besser als)।"
  },
  {
    id: 26,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "mcq",
    prompt: "Mika unterrichtet genauso gut ________ Lana.",
    options: ["wie", "als", "so", "denn"],
    correctAnswer: "wie",
    points: 1,
    explanation: "সমান তুলনা (genauso ... wie / so ... wie)-এর ক্ষেত্রে সর্বদা 'wie' বসে এবং Adjektiv মূল রূপে (Positiv) থাকে।"
  },
  {
    id: 27,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "text",
    prompt: "শূন্যস্থানে 'als' অথবা 'wie' লিখুন: Mein Handy ist billiger ________ mein Tablet.",
    acceptableAnswers: ["als"],
    points: 1,
    explanation: "Komparativ (billiger) থাকলে তার সঙ্গী হিসেবে সর্বদা 'als' বসে।"
  },
  {
    id: 28,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "text",
    prompt: "শূন্যস্থানে 'als' অথবা 'wie' লিখুন: Mein Bruder ist so groß ________ mein Vater.",
    acceptableAnswers: ["wie"],
    points: 1,
    explanation: "so + Positiv + wie — সমান তুলনায় সর্বদা 'wie' ব্যবহৃত হয়।"
  },
  {
    id: 29,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "mcq",
    prompt: "সঠিক বাক্যটি নির্বাচন করুন:",
    options: [
      "Er ist größer als ich.",
      "Er ist mehr groß wie ich.",
      "Er ist größer wie ich.",
      "Er ist am größten als ich."
    ],
    correctAnswer: "Er ist größer als ich.",
    points: 1,
    explanation: "Komparativ-এর সাথে 'als' বসে, 'wie' নয়। এছাড়া als-এর পরে Subject-এর সমান্তরাল রূপ (ich) বসে।"
  },
  {
    id: 30,
    topic: "Topic 1: Komparativ & Superlativ (inkl. als & wie)",
    type: "mcq",
    prompt: "সঠিক বাক্যটি নির্বাচন করুন:",
    options: [
      "Das neue Handy ist nicht so teuer wie das alte.",
      "Das neue Handy ist nicht so teurer als das alte.",
      "Das neue Handy ist nicht so teuer als das alte.",
      "Das neue Handy ist nicht genauso teurer wie das alte."
    ],
    correctAnswer: "Das neue Handy ist nicht so teuer wie das alte.",
    points: 1,
    explanation: "'nicht so ... wie'-এর সাথে Adjektiv-এর মূল রূপ (Positiv: teuer) বসে।"
  },

  // =========================================================================
  // TOPIC 2: Reflexive Verben (Akkusativ, Dativ, Position, Präpositionen) — 30 Questions
  // =========================================================================
  {
    id: 31,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "mcq",
    prompt: "Ich freue ________ auf das Wochenende.",
    options: ["mich", "mir", "sich", "dich"],
    correctAnswer: "mich",
    points: 1,
    explanation: "'sich freuen' একটি Akkusativ Reflexive Verb। বাক্যে অন্য কোনো Direct Object নেই, তাই ich-এর Reflexivpronomen হবে 'mich'।"
  },
  {
    id: 32,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "mcq",
    prompt: "Du musst ________ beeilen, der Zug fährt gleich ab!",
    options: ["dich", "dir", "sich", "mich"],
    correctAnswer: "dich",
    points: 1,
    explanation: "'sich beeilen' Akkusativ Reflexivpronomen নেয়; du-এর জন্য এটি 'dich'।"
  },
  {
    id: 33,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "mcq",
    prompt: "Er wäscht ________ jeden Morgen.",
    options: ["sich", "ihn", "ihm", "mich"],
    correctAnswer: "sich",
    points: 1,
    explanation: "er / sie / es-এর Reflexivpronomen হলো 'sich'।"
  },
  {
    id: 34,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "text",
    prompt: "শূন্যস্থানে উপযুক্ত Reflexivpronomen লিখুন: Wir amüsieren ________ sehr auf der Party.",
    acceptableAnswers: ["uns"],
    points: 1,
    explanation: "wir-এর Reflexivpronomen Akkusativ এবং Dativ উভয় ক্ষেত্রেই 'uns'।"
  },
  {
    id: 35,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "text",
    prompt: "শূন্যস্থানে উপযুক্ত Reflexivpronomen লিখুন: Kinder, ihr müsst ________ beeilen!",
    acceptableAnswers: ["euch"],
    points: 1,
    explanation: "ihr-এর Reflexivpronomen হলো 'euch'।"
  },
  {
    id: 36,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "mcq",
    prompt: "Ich wasche ________ die Hände.",
    options: ["mir", "mich", "sich", "dir"],
    correctAnswer: "mir",
    points: 1,
    explanation: "বাক্যে 'die Hände' একটি আলাদা Akkusativ-Objekt হিসেবে থাকায় Reflexivpronomen-টি Dativ হয়ে 'mir' হবে।"
  },
  {
    id: 37,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "mcq",
    prompt: "Putz ________ sofort die Zähne!",
    options: ["dir", "dich", "sich", "mir"],
    correctAnswer: "dir",
    points: 1,
    explanation: "'die Zähne' আলাদা Akkusativ Object, তাই du-এর ক্ষেত্রে Dativ Reflexivpronomen 'dir' বসবে।"
  },
  {
    id: 38,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "mcq",
    prompt: "Er kauft ________ ein neues Auto.",
    options: ["sich", "ihm", "ihn", "mir"],
    correctAnswer: "sich",
    points: 1,
    explanation: "er-এর Reflexivpronomen Akkusativ ও Dativ উভয় ক্ষেত্রেই 'sich'। এখানে 'ein neues Auto' থাকায় এটি Dativ sich।"
  },
  {
    id: 39,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "text",
    prompt: "শূন্যস্থানে 'mich' অথবা 'mir' লিখুন: Ich habe ________ gestern beim Sport verletzt.",
    acceptableAnswers: ["mich"],
    points: 1,
    explanation: "আঘাত পাওয়ার কাজে অন্য কোনো Direct Object নেই, তাই Akkusativ 'mich' বসবে।"
  },
  {
    id: 40,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "text",
    prompt: "শূন্যস্থানে 'mich' অথবা 'mir' লিখুন: Ich muss ________ die Haare kämmen.",
    acceptableAnswers: ["mir"],
    points: 1,
    explanation: "'die Haare' একটি আলাদা Akkusativ-Objekt, তাই Reflexivpronomen-টি Dativ হয়ে 'mir' হবে।"
  },
  {
    id: 41,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "mcq",
    prompt: "Du bildest ________ ein, dass du alles besser weißt.",
    options: ["dir", "dich", "sich", "mir"],
    correctAnswer: "dir",
    points: 1,
    explanation: "'sich einbilden' সর্বদা Dativ Reflexivpronomen গ্রহণ করে; du-এর জন্য এটি 'dir'।"
  },
  {
    id: 42,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "mcq",
    prompt: "Ich habe ________ vorgenommen, jeden Tag Deutsch zu lernen.",
    options: ["mir", "mich", "sich", "dir"],
    correctAnswer: "mir",
    points: 1,
    explanation: "'sich vornehmen' Verb-টি Dativ Reflexivpronomen গ্রহণ করে (ich -> mir)।"
  },
  {
    id: 43,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "mcq",
    prompt: "Ich verbitte ________ diesen frechen Ton!",
    options: ["mir", "mich", "dir", "sich"],
    correctAnswer: "mir",
    points: 1,
    explanation: "'sich verbitten' Verb-টি Dativ Pronoun নেয় (ich -> mir)।"
  },
  {
    id: 44,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "mcq",
    prompt: "Ich muss ________ das noch einmal in Ruhe überlegen.",
    options: ["mir", "mich", "dir", "sich"],
    correctAnswer: "mir",
    points: 1,
    explanation: "'sich überlegen' Verb-এর সাথে Dativ Pronoun (mir) বসে।"
  },
  {
    id: 45,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "text",
    prompt: "শূন্যস্থানে 'dir' অথবা 'dich' লিখুন: Kannst du ________ vorstellen, in Deutschland zu leben?",
    acceptableAnswers: ["dir"],
    points: 1,
    explanation: "'sich vorstellen' (কল্পনা করা অর্থে) Dativ Pronoun গ্রহণ করে (du -> dir)।"
  },
  {
    id: 46,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "mcq",
    prompt: "সঠিক বাক্যটি নির্বাচন করুন:",
    options: [
      "Jetzt konzentriere ich mich auf meine Prüfung.",
      "Jetzt konzentriere mich ich auf meine Prüfung.",
      "Jetzt mich konzentriere ich auf meine Prüfung.",
      "Jetzt konzentriert sich ich auf meine Prüfung."
    ],
    correctAnswer: "Jetzt konzentriere ich mich auf meine Prüfung.",
    points: 1,
    explanation: "বাক্যের শুরুতে Adverb (Jetzt) বসলে Verb ২ নম্বরে আসে, এরপর Subject Pronoun (ich) এবং তার ঠিক পরেই Reflexivpronomen (mich) বসে।"
  },
  {
    id: 47,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "mcq",
    prompt: "সঠিক বাক্যটি নির্বাচন করুন:",
    options: [
      "Jetzt ärgert er sich über den Stau.",
      "Jetzt ärgert sich er über den Stau.",
      "Jetzt sich ärgert er über den Stau.",
      "Jetzt er ärgert sich über den Stau."
    ],
    correctAnswer: "Jetzt ärgert er sich über den Stau.",
    points: 1,
    explanation: "Subject যদি Pronoun (er) হয়, তবে তা কখনো Reflexivpronomen-এর পেছনে যেতে পারে না। সঠিক ক্রম: Verb (ärgert) + Subject (er) + Reflexivpronomen (sich)।"
  },
  {
    id: 48,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "mcq",
    prompt: "Subject যদি Noun বা নাম হয়, তবে নিচের কোন বাক্যটি সঠিক?",
    options: [
      "উভয় বাক্যই ব্যাকরণগতভাবে সঠিক",
      "শুধু: Jetzt konzentriert sich Anna auf ihr Studium.",
      "শুধু: Jetzt konzentriert Anna sich auf ihr Studium.",
      "উভয় বাক্যই ব্যাকরণগতভাবে ভুল"
    ],
    correctAnswer: "উভয় বাক্যই ব্যাকরণগতভাবে সঠিক",
    points: 1,
    explanation: "Subject যদি Noun বা নাম (যেমন Anna) হয়, তবে Reflexivpronomen (sich) নামের আগেও বসতে পারে, পরেও বসতে পারে। দুটি রূপই সঠিক।"
  },
  {
    id: 49,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "mcq",
    prompt: "Nebensatz-এ Reflexivpronomen-এর সঠিক ক্রম কোনটি?",
    options: [
      "..., weil ich mich auf die Reise freue.",
      "..., weil mich ich auf die Reise freue.",
      "..., weil ich auf die Reise mich freue.",
      "..., weil freue ich mich auf die Reise."
    ],
    correctAnswer: "..., weil ich mich auf die Reise freue.",
    points: 1,
    explanation: "Nebensatz-এ Connector (weil)-এর পরপরই Subject (ich), তারপর Reflexivpronomen (mich), এবং conjugated verb বাক্যের একদম শেষে যায়।"
  },
  {
    id: 50,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "mcq",
    prompt: "Er lernt fleißig, ________ er sich auf den Test vorbereitet.",
    options: ["denn", "weil", "dass", "ob"],
    correctAnswer: "denn",
    points: 1,
    explanation: "বাক্যে Verb (bereitet ... vor) ২য় অবস্থানে রয়েছে, যা Hauptsatz নির্দেশ করে। তাই এখানে Hauptsatz-Connector 'denn' বসবে (weil হলে Verb শেষে যেত)।"
  },
  {
    id: 51,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "mcq",
    prompt: "Ich freue mich ________ den Urlaub nächste Woche.",
    options: ["auf", "über", "an", "für"],
    correctAnswer: "auf",
    points: 1,
    explanation: "ভবিষ্যতের কোনো ঘটনা বা আসন্ন বিষয় নিয়ে আগাম আনন্দ প্রকাশ করতে 'sich freuen auf + Akkusativ' বসে।"
  },
  {
    id: 52,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "mcq",
    prompt: "Ich habe mich sehr ________ dein schönes Geschenk gefreut.",
    options: ["über", "auf", "für", "von"],
    correctAnswer: "über",
    points: 1,
    explanation: "ইতোমধ্যে ঘটে যাওয়া বা বর্তমানের পাওয়া কোনো কিছু নিয়ে খুশি হতে 'sich freuen über + Akkusativ' বসে।"
  },
  {
    id: 53,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "text",
    prompt: "সঠিক Präposition লিখুন: Er interessiert sich sehr ________ moderne Kunst.",
    acceptableAnswers: ["für", "fuer"],
    points: 1,
    explanation: "'sich interessieren für + Akkusativ' একটি নির্দিষ্ট প্রেপজিশনাল জোড়া।"
  },
  {
    id: 54,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "text",
    prompt: "সঠিক Präposition লিখুন: Die Mutter kümmert sich liebevoll ________ das Baby.",
    acceptableAnswers: ["um"],
    points: 1,
    explanation: "'sich kümmern um + Akkusativ' অর্থ কারো যত্ন নেওয়া বা দেখাশোনা করা।"
  },
  {
    id: 55,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "mcq",
    prompt: "Der Gast beschwert sich beim Kellner ________ die kalte Suppe.",
    options: ["über", "auf", "an", "nach"],
    correctAnswer: "über",
    points: 1,
    explanation: "কোনো বিষয়ে অভিযোগ জানাতে 'sich beschweren über + Akkusativ' বসে।"
  },
  {
    id: 56,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "text",
    prompt: "সঠিক Präposition লিখুন: Wir möchten uns ________ diesen Deutschkurs anmelden.",
    acceptableAnswers: ["für", "fuer"],
    points: 1,
    explanation: "'sich anmelden für + Akkusativ' অর্থ কোনো কোর্স বা ইভেন্টে নাম নিবন্ধন করা।"
  },
  {
    id: 57,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "mcq",
    prompt: "Ich bedanke mich ________ Ihnen für die Hilfe.",
    options: ["bei", "an", "mit", "zu"],
    correctAnswer: "bei",
    points: 1,
    explanation: "ব্যক্তির কাছে ধন্যবাদ বা কৃতজ্ঞতা প্রকাশে 'sich bedanken bei + Dativ' বসে (এবং বিষয়ের জন্য 'für + Akkusativ')।"
  },
  {
    id: 58,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "mcq",
    prompt: "Er erinnert sich noch genau ________ seine Schulzeit.",
    options: ["an", "auf", "über", "von"],
    correctAnswer: "an",
    points: 1,
    explanation: "কোনো কিছু মনে করা বা স্মৃতিচারণ করতে 'sich erinnern an + Akkusativ' বসে।"
  },
  {
    id: 59,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "mcq",
    prompt: "Nach der Party verabschiedet er sich ________ seinen Freunden.",
    options: ["von", "mit", "aus", "bei"],
    correctAnswer: "von",
    points: 1,
    explanation: "কারো কাছ থেকে বিদায় নিতে 'sich verabschieden von + Dativ' বসে।"
  },
  {
    id: 60,
    topic: "Topic 2: Reflexive Verben (Akkusativ, Dativ & Präpositionen)",
    type: "mcq",
    prompt: "Er hat sich über den dummen Fehler sehr ________.",
    options: ["geärgert", "gefreut", "erholt", "bedankt"],
    correctAnswer: "geärgert",
    points: 1,
    explanation: "'sich ärgern über + Akkusativ' অর্থ কোনো বিষয়ে রাগ বা বিরক্ত হওয়া।"
  },

  // =========================================================================
  // TOPIC 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat) — 30 Questions
  // =========================================================================
  {
    id: 61,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "mcq",
    prompt: "Das ist der nett________ Mann.",
    options: ["-e (nette)", "-en (netten)", "-er (netter)", "-es (nettes)"],
    correctAnswer: "-e (nette)",
    points: 1,
    explanation: "Bestimmter Artikel (der) সহ Nominativ singular-এ Adjektiv-এর শেষে সবসময় -e যুক্ত হয় (der nette Mann)।"
  },
  {
    id: 62,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "mcq",
    prompt: "Die schön________ Frau wohnt hier.",
    options: ["-e (schöne)", "-en (schönen)", "-er (schöner)", "-es (schönes)"],
    correctAnswer: "-e (schöne)",
    points: 1,
    explanation: "Bestimmter Artikel (die) সহ Nominativ singular feminin-এ Adjektiv-এর শেষে -e বসে।"
  },
  {
    id: 63,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "text",
    prompt: "সঠিক Adjektivendung লিখুন: Das klein________ Kind spielt im Garten.",
    acceptableAnswers: ["e", "-e", "kleine"],
    points: 1,
    explanation: "Nominativ neutral singular (das)-এর পরে Adjektiv-এর শেষে -e যুক্ত হয় (das kleine Kind)।"
  },
  {
    id: 64,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "mcq",
    prompt: "Die süß________ Kinder spielen zusammen im Park.",
    options: ["-en (süßen)", "-e (süße)", "-er (süßer)", "-es (süßes)"],
    correctAnswer: "-en (süßen)",
    points: 1,
    explanation: "Bestimmter Artikel সহ Plural-এ (die) Nominativ-এর ক্ষেত্রে Adjektiv-এর শেষে সর্বদা -en যুক্ত হয় (die süßen Kinder)।"
  },
  {
    id: 65,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "mcq",
    prompt: "Ich kenne den nett________ Mann schon lange.",
    options: ["-en (netten)", "-e (nette)", "-em (nettem)", "-es (nettes)"],
    correctAnswer: "-en (netten)",
    points: 1,
    explanation: "Akkusativ-এ শুধুমাত্র Maskulin পরিবর্তিত হয়: der -> den এবং Adjektiv-এর শেষে -en যুক্ত হয় (den netten Mann)।"
  },
  {
    id: 66,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "mcq",
    prompt: "Ich mag die schön________ Frau.",
    options: ["-e (schöne)", "-en (schönen)", "-er (schöner)", "-es (schönes)"],
    correctAnswer: "-e (schöne)",
    points: 1,
    explanation: "Akkusativ feminin পরিবর্তিত হয় না, Nominativ-এর মতোই -e থাকে (die schöne Frau)।"
  },
  {
    id: 67,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "text",
    prompt: "সঠিক Adjektivendung লিখুন: Ich sehe das klein________ Kind.",
    acceptableAnswers: ["e", "-e", "kleine"],
    points: 1,
    explanation: "Akkusativ neutral-এ কোনো পরিবর্তন নেই, Nominativ-এর মতোই -e থাকে (das kleine Kind)।"
  },
  {
    id: 68,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "mcq",
    prompt: "Sie kauft die süß________ Äpfel.",
    options: ["-en (süßen)", "-e (süße)", "-er (süßer)", "-em (süßem)"],
    correctAnswer: "-en (süßen)",
    points: 1,
    explanation: "Plural Akkusativ-এ bestimmter Artikel-এর পরে Adjektiv-এর শেষে সর্বদা -en বসে।"
  },
  {
    id: 69,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "mcq",
    prompt: "Ich gebe dem nett________ Mann ein Buch.",
    options: ["-en (netten)", "-e (nette)", "-em (nettem)", "-er (netter)"],
    correctAnswer: "-en (netten)",
    points: 1,
    explanation: "Dativ-এ Gender যাই হোক না কেন, bestimmter Artikel-এর পরে Adjektiv-এ সর্বদা -en যুক্ত হয় (dem netten Mann)।"
  },
  {
    id: 70,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "mcq",
    prompt: "Ich helfe der alt________ Dame über die Straße.",
    options: ["-en (alten)", "-e (alte)", "-er (alter)", "-em (altem)"],
    correctAnswer: "-en (alten)",
    points: 1,
    explanation: "Dativ feminin-এ Artikel 'der' হয় এবং Adjektiv-এর শেষে -en বসে (der alten Dame)।"
  },
  {
    id: 71,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "text",
    prompt: "সঠিক Adjektivendung লিখুন: Das Geschenk gehört dem klein________ Kind.",
    acceptableAnswers: ["en", "-en", "kleinen"],
    points: 1,
    explanation: "Dativ neutral (dem)-এর পরে Adjektiv-এর শেষে -en বসে (dem kleinen Kind)।"
  },
  {
    id: 72,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "mcq",
    prompt: "Er spielt mit den süß________ Kindern.",
    options: ["-en (süßen)", "-e (süße)", "-er (süßer)", "-em (süßem)"],
    correctAnswer: "-en (süßen)",
    points: 1,
    explanation: "Dativ plural-এ Artikel 'den' হয় এবং Adjektiv-এর শেষে -en বসে (den süßen Kindern)।"
  },
  {
    id: 73,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "mcq",
    prompt: "Dativ Plural-এ Noun-এর ক্ষেত্রে অতিরিক্ত কী নিয়ম প্রযোজ্য?",
    options: [
      "Noun-এর শেষে একটি '-n' যোগ করতে হয় (যদি আগে থেকেই -n বা -s না থাকে)",
      "Noun-এর শেষে '-e' যোগ করতে হয়",
      "Noun-এর কোনো পরিবর্তন হয় না",
      "Noun-এর শেষে '-s' যোগ করতে হয়"
    ],
    correctAnswer: "Noun-এর শেষে একটি '-n' যোগ করতে হয় (যদি আগে থেকেই -n বা -s না থাকে)",
    points: 1,
    explanation: "Dativ plural-এ Artikel 'den' হয়, Adjektiv-এ '-en' বসে এবং Plural Noun-এর শেষে অতিরিক্ত একটি '-n' যুক্ত হয় (যেমন: die Kinder -> den Kindern)।"
  },
  {
    id: 74,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "text",
    prompt: "শূন্যস্থানে সঠিক শব্দ দুটি লিখুন: Ich spiele mit den klein________ Kind________.",
    acceptableAnswers: ["kleinen kindern", "kleinen, kindern", "kleinen / kindern"],
    points: 1,
    explanation: "Dativ plural-এ Adjektiv হয় 'kleinen' এবং Noun-এর শেষে -n যুক্ত হয়ে হয় 'Kindern' (den kleinen Kindern)।"
  },
  {
    id: 75,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "mcq",
    prompt: "Er geht ohne den warm________ Mantel nach draußen.",
    options: ["-en (warmen)", "-e (warme)", "-er (warmer)", "-em (warmem)"],
    correctAnswer: "-en (warmen)",
    points: 1,
    explanation: "'ohne' একটি Akkusativ Präposition। der Mantel Akkusativ-এ 'den Mantel' হয়, তাই Adjektiv-এর শেষে -en বসে।"
  },
  {
    id: 76,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "mcq",
    prompt: "Wir fahren mit dem schnell________ Zug.",
    options: ["-en (schnellen)", "-e (schnelle)", "-em (schnellem)", "-er (schneller)"],
    correctAnswer: "-en (schnellen)",
    points: 1,
    explanation: "'mit' সর্বদা Dativ গ্রহণ করে। Dativ maskulin-এ dem schnellen Zug।"
  },
  {
    id: 77,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "text",
    prompt: "সঠিক Adjektivendung লিখুন: Sie kauft die rot________ Tasche.",
    acceptableAnswers: ["e", "-e", "rote"],
    points: 1,
    explanation: "Akkusativ feminin (die)-এর পরে Adjektiv-এ -e বসে (die rote Tasche)।"
  },
  {
    id: 78,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "mcq",
    prompt: "Der freundlich________ Lehrer erklärt die neu________ Regel.",
    options: [
      "freundliche / neue",
      "freundlichen / neue",
      "freundliche / neuen",
      "freundlichen / neuen"
    ],
    correctAnswer: "freundliche / neue",
    points: 1,
    explanation: "Der freundliche Lehrer হলো Nominativ maskulin (-e); die neue Regel হলো Akkusativ feminin (-e)।"
  },
  {
    id: 79,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "mcq",
    prompt: "Ich danke dem nett________ Mann für das groß________ Geschenk.",
    options: [
      "netten / große",
      "netten / großen",
      "nette / große",
      "nettem / großes"
    ],
    correctAnswer: "netten / große",
    points: 1,
    explanation: "danken Dativ নেয়, তাই dem netten Mann (-en); für Akkusativ নেয় এবং das Geschenk neutral হওয়ায় das große Geschenk (-e)।"
  },
  {
    id: 80,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "mcq",
    prompt: "Wir wohnen in dem alt________ Haus neben den groß________ Bäumen.",
    options: [
      "alten / großen",
      "alte / große",
      "alten / große",
      "altem / großen"
    ],
    correctAnswer: "alten / großen",
    points: 1,
    explanation: "'in dem' Dativ neutral -> alten; 'neben den' Dativ plural -> großen। Dativ-এ সকল Adjektiv-এ -en বসে।"
  },
  {
    id: 81,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "mcq",
    prompt: "Er kauft den teur________ Mantel.",
    options: ["teuren", "teueren", "teure", "teurem"],
    correctAnswer: "teuren",
    points: 1,
    explanation: "teuer শব্দটিতে এন্ডিং যোগ করার সময় ভেতরের 'e' বাদ পড়ে: teuer -> den teuren Mantel।"
  },
  {
    id: 82,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "text",
    prompt: "শূন্যস্থানে Adjektiv-এর সঠিক রূপটি লিখুন: Das ist das teur________ Auto.",
    acceptableAnswers: ["teure", "teuere"],
    points: 1,
    explanation: "das teure Auto (মাঝের e ঝরে যায়)।"
  },
  {
    id: 83,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "mcq",
    prompt: "Wir gehen durch den dunkl________ Wald.",
    options: ["dunklen", "dunkelen", "dunkle", "dunklem"],
    correctAnswer: "dunklen",
    points: 1,
    explanation: "dunkel শব্দে এন্ডিং যুক্ত হলে ভেতরের e উঠে গিয়ে dunklen হয়। durch Akkusativ নেয়, তাই den dunklen Wald।"
  },
  {
    id: 84,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "mcq",
    prompt: "Die Bank befindet sich gegenüber dem alt________ Bahnhof.",
    options: ["-en (alten)", "-e (alte)", "-em (altem)", "-er (alter)"],
    correctAnswer: "-en (alten)",
    points: 1,
    explanation: "'gegenüber' সর্বদা Dativ গ্রহণ করে। Dativ-এ bestimmter Artikel-এর পরে Adjektiv-এ -en বসে (dem alten Bahnhof)।"
  },
  {
    id: 85,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "mcq",
    prompt: "Wir spielen gegen die ander________ Mannschaft.",
    options: ["-e (andere)", "-en (anderen)", "-er (anderer)", "-es (anderes)"],
    correctAnswer: "-e (andere)",
    points: 1,
    explanation: "'gegen' একটি Akkusativ Präposition। die Mannschaft feminin, Akkusativ feminin-এ এন্ডিং -e থাকে: die andere Mannschaft।"
  },
  {
    id: 86,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "mcq",
    prompt: "সঠিক বাক্যটি নির্বাচন করুন:",
    options: [
      "Ich mag den netten Mann.",
      "Ich mag der nette Mann.",
      "Ich mag den nette Mann.",
      "Ich mag dem netten Mann."
    ],
    correctAnswer: "Ich mag den netten Mann.",
    points: 1,
    explanation: "mögen Verb Akkusativ Object নেয়। der Mann Akkusativ-এ den netten Mann হয়।"
  },
  {
    id: 87,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "mcq",
    prompt: "সঠিক বাক্যটি নির্বাচন করুন:",
    options: [
      "Die süßen Kinder spielen draußen.",
      "Die süße Kinder spielen draußen.",
      "Die süßes Kinder spielen draußen.",
      "Die süßer Kinder spielen draußen."
    ],
    correctAnswer: "Die süßen Kinder spielen draußen.",
    points: 1,
    explanation: "Plural Nominativ-এ bestimmter Artikel (die)-এর পর Adjektiv-এর শেষে সর্বদা -en যুক্ত হয় (die süßen Kinder)।"
  },
  {
    id: 88,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "text",
    prompt: "সঠিক Adjektivendung লিখুন: Er hilft der krank________ Frau.",
    acceptableAnswers: ["en", "-en", "kranken"],
    points: 1,
    explanation: "Dativ feminin-এ bestimmter Artikel 'der'-এর পরে Adjektiv-এ -en বসে (der kranken Frau)।"
  },
  {
    id: 89,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "mcq",
    prompt: "Nach der lang________ Reise war er sehr müde.",
    options: ["-en (langen)", "-e (lange)", "-er (langer)", "-em (langem)"],
    correctAnswer: "-en (langen)",
    points: 1,
    explanation: "'nach' Dativ প্রেপজিশন। die Reise Dativ-এ 'der Reise' হয় এবং Adjektiv-এ -en বসে (der langen Reise)।"
  },
  {
    id: 90,
    topic: "Topic 3: Adjektivendung nach bestimmtem Artikel (Nom, Akk, Dat)",
    type: "mcq",
    prompt: "Aus dem neu________ Haus hört man Musik.",
    options: ["-en (neuen)", "-e (neue)", "-em (neuem)", "-es (neues)"],
    correctAnswer: "-en (neuen)",
    points: 1,
    explanation: "'aus' Dativ প্রেপজিশন। das Haus Dativ-এ 'dem Haus' হয় এবং Adjektiv-এ -en বসে (dem neuen Haus)।"
  }
];

module.exports = QUESTIONS;
