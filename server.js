const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In serverless environments (like Vercel), root directory is read-only.
// We use /tmp for persistence or fallback gracefully.
const DATA_FILE = process.env.VERCEL ? path.join('/tmp', 'data.json') : path.join(__dirname, 'data.json');

// In-memory fallback if filesystem write fails in serverless
let memoryState = getInitialData();

// Initial state
function getInitialData() {
  const seats = [];
  for (let i = 1; i <= 10; i++) {
    seats.push({
      id: i,
      seatNumber: `Seat ${i}`,
      isOccupied: false,
      studentName: null,
      occupiedAt: null
    });
  }
  return {
    seats,
    submissions: []
  };
}

// Load or create data
function loadData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const init = getInitialData();
      try { fs.writeFileSync(DATA_FILE, JSON.stringify(init, null, 2)); } catch(e) {}
      memoryState = init;
      return init;
    }
    const content = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(content);
    memoryState = parsed;
    return parsed;
  } catch (e) {
    return memoryState;
  }
}

function saveData(data) {
  memoryState = data;
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.warn('Could not write to disk in serverless, kept in memory state:', e.message);
  }
}

// Exam Questions Definition (5 topics x 5 questions = 25 questions, 4 marks each = 100 marks)
const QUESTIONS = [
  // --- TOPIC 1: Nebensatz mit weil vs. Hauptsatz mit denn (Kapitel 1) ---
  {
    id: 1,
    topic: "Topic 1: Nebensatz mit weil & Hauptsatz mit denn",
    type: "mcq",
    prompt: "Ich gehe ins Krankenhaus, ________ ich krank bin. (কারণ বাক্যের শেষে Verb 'bin' আছে - এটি কোন কানেক্টর?)",
    options: ["weil", "denn", "aber", "und"],
    correctAnswer: "weil",
    points: 4,
    explanation: "Nebensatz-এ Verb শেষে চলে যায় (Verb am Ende)। যেহেতু 'bin' একদম শেষে আছে, তাই এখানে 'weil' হবে।"
  },
  {
    id: 2,
    topic: "Topic 1: Nebensatz mit weil & Hauptsatz mit denn",
    type: "mcq",
    prompt: "Ich lerne Deutsch, ________ ich lebe in Deutschland. (এখানে 'denn' পজিশন 0 এবং 'lebe' পজিশন 2-এ আছে - এটি Hauptsatz)",
    options: ["weil", "denn", "ob", "dass"],
    correctAnswer: "denn",
    points: 4,
    explanation: "'denn' পজিশন 0-তে বসে এবং Verb ২য় পজিশনে (Position 2) থাকে। এটি Hauptsatz গঠন করে।"
  },
  {
    id: 3,
    topic: "Topic 1: Nebensatz mit weil & Hauptsatz mit denn",
    type: "mcq",
    prompt: "সঠিক বাক্যটি নির্বাচন করুন (Nebensatz mit weil এর ক্ষেত্রে Verb কোথায় বসে?):",
    options: [
      "Ich esse Reis, weil ich Hunger habe.",
      "Ich esse Reis, weil ich habe Hunger.",
      "Ich esse Reis, weil habe ich Hunger.",
      "Ich esse Reis, denn ich Hunger habe."
    ],
    correctAnswer: "Ich esse Reis, weil ich Hunger habe.",
    points: 4,
    explanation: "weil দিয়ে বাক্য বানালে Verb ('habe') সবসময় বাক্যের একদম শেষে (Verb am Ende) চলে যায়।"
  },
  {
    id: 4,
    topic: "Topic 1: Nebensatz mit weil & Hauptsatz mit denn",
    type: "text",
    prompt: "নিচের বাক্যটিতে শূন্যস্থান পূরণ করুন (ছোট হাতের অক্ষরে লিখুন): 'Ich lerne Deutsch, weil ich in Deutschland ________.' (Verb: leben)",
    acceptableAnswers: ["lebe"],
    points: 4,
    explanation: "'weil ich in Deutschland lebe.' — ich এর সাথে leben কনজুগেশন হয়ে lebe হবে এবং বাক্যের শেষে বসবে।"
  },
  {
    id: 5,
    topic: "Topic 1: Nebensatz mit weil & Hauptsatz mit denn",
    type: "text",
    prompt: "'denn' ব্যবহার করার পর বাক্যে Verb কোন পজিশনে বসে? (উত্তরে লিখুন: 'Position 2' অথবা শুধু '2'):",
    acceptableAnswers: ["2", "position 2", "second position", "দ্বিতীয় পজিশনে", "2nd"],
    points: 4,
    explanation: "denn পজিশন 0 (Null-Position) হিসেবে গণ্য হয়, এরপর Subject (পজিশন 1) এবং Verb ২য় পজিশনে (Position 2) বসে।"
  },

  // --- TOPIC 2: Perfekt mit haben / sein & Partizip II (Kapitel 1) ---
  {
    id: 6,
    topic: "Topic 2: Perfekt mit haben / sein & Partizip II",
    type: "mcq",
    prompt: "'Ich ________ nach Berlin gereist.' — শূন্যস্থানে সঠিক Hilfsverb কোনটি?",
    options: ["bin", "habe", "hat", "ist"],
    correctAnswer: "bin",
    points: 4,
    explanation: "reisen দ্বারা স্থান পরিবর্তন (Ortswechsel / Movement from A to B) বোঝায়, তাই এর সাথে sein (ich bin) ব্যবহৃত হয়।"
  },
  {
    id: 7,
    topic: "Topic 2: Perfekt mit haben / sein & Partizip II",
    type: "mcq",
    prompt: "'studieren' এবং 'organisieren' এর মতো -ieren যুক্ত Verb-গুলোর Partizip II রূপ কোনটি?",
    options: [
      "gestudiert / georganisiert (আগে ge যুক্ত হয়)",
      "studiert / organisiert (আগে ge বসে না, শেষে শুধু t যুক্ত হয়)",
      "gestudieren / georganisieren",
      "studierte / organisierte"
    ],
    correctAnswer: "studiert / organisiert (আগে ge বসে না, শেষে শুধু t যুক্ত হয়)",
    points: 4,
    explanation: "-ieren যুক্ত Verb-এর Partizip II বানাতে আগে 'ge-' বসে না, মূল Verb-এর শেষে শুধু '-t' যুক্ত হয় (hat studiert, hat organisiert)।"
  },
  {
    id: 8,
    topic: "Topic 2: Perfekt mit haben / sein & Partizip II",
    type: "mcq",
    prompt: "'gestern' কোনো কিছু ঘটেছে এমন কাজের জন্য 'passieren' এর Perfekt রূপ কোনটি?",
    options: [
      "ist passiert",
      "hat passiert",
      "ist gepassiert",
      "hat gepassiert"
    ],
    correctAnswer: "ist passiert",
    points: 4,
    explanation: "passieren (ঘটনা ঘটা) এর ক্ষেত্রে sein ভার্ব লাগে এবং এর Partizip II হলো 'passiert' (কোনো ge- যুক্ত হয় না)। তাই 'ist passiert'।"
  },
  {
    id: 9,
    topic: "Topic 2: Perfekt mit haben / sein & Partizip II",
    type: "text",
    prompt: "Verb 'gehen' এর Partizip II কি? (শুধুমাত্র Partizip II শব্দটি লিখুন, যেমন: gegangen):",
    acceptableAnswers: ["gegangen"],
    points: 4,
    explanation: "gehen -> ist gegangen (উনরেগেলমেসিগ / Irregular Verb)।"
  },
  {
    id: 10,
    topic: "Topic 2: Perfekt mit haben / sein & Partizip II",
    type: "text",
    prompt: "'essen' এর সাথে Perfekt এ কোন Hilfsverb এবং Partizip II বসে? (উত্তরে লিখুন: 'hat gegessen'):",
    acceptableAnswers: ["hat gegessen", "habe gegessen", "gegessen"],
    points: 4,
    explanation: "essen এ কোনো মুভমেন্ট নেই, তাই haben বসে: hat gegessen।"
  },

  // --- TOPIC 3: Genitiv bei Namen (+s / Apostroph ') (Kapitel 1) ---
  {
    id: 11,
    topic: "Topic 3: Genitiv bei Namen (+s / Apostroph)",
    type: "mcq",
    prompt: "'সনিয়ার বই' — জার্মান ভাষায় নামবাচক শব্দে Genitiv কিভাবে প্রকাশ করা হয়?",
    options: ["Sonias Buch", "Sonias' Buch", "Das Buch von Sonia nur", "Sonia Buch"],
    correctAnswer: "Sonias Buch",
    points: 4,
    explanation: "সাধারণ নামের শেষে কোনো অ্যাপোস্ট্রফি ছাড়া সরাসরি 's' যোগ করে Genitiv (মালিকানা) বোঝানো হয়: Sonias Buch।"
  },
  {
    id: 12,
    topic: "Topic 3: Genitiv bei Namen (+s / Apostroph)",
    type: "mcq",
    prompt: "যদি কারো নামের শেষে ইতোমধ্যে -s, -ss, -ß, -z বা -x থাকে (যেমন: Jonas), তখন Genitiv এ কি বসে?",
    options: [
      "শুধুমাত্র একটি অ্যাপোস্ট্রফি (') বসে (যেমন: Jonas' Buch)",
      "আরেকটি 's' যোগ করতে হয় (Jonass Buch)",
      "-es যোগ করতে হয় (Jonases Buch)",
      "কোনো পরিবর্তন হয় না"
    ],
    correctAnswer: "শুধুমাত্র একটি অ্যাপোস্ট্রফি (') বসে (যেমন: Jonas' Buch)",
    points: 4,
    explanation: "-s, -z, -x, -ß দিয়ে শেষ হওয়া নামের ক্ষেত্রে অতিরিক্ত s না বসিয়ে শুধু অ্যাপোস্ট্রফি (') বসে: Jonas' Buch।"
  },
  {
    id: 13,
    topic: "Topic 3: Genitiv bei Namen (+s / Apostroph)",
    type: "mcq",
    prompt: "'ম্যাক্সের কম্পিউটার' — জার্মান ভাষায় সঠিক রূপ কোনটি? (Max)",
    options: ["Max' Computer", "Maxs Computer", "Maxes Computer", "Max's Computer"],
    correctAnswer: "Max' Computer",
    points: 4,
    explanation: "Max এর শেষে 'x' রয়েছে, তাই শুধু অ্যাপোস্ট্রফি বসবে: Max' Computer।"
  },
  {
    id: 14,
    topic: "Topic 3: Genitiv bei Namen (+s / Apostroph)",
    type: "text",
    prompt: "'আবিরের গাড়ি' (Auto von Abir) — Genitiv দিয়ে লিখলে কি হবে? (যেমন: Abirs Auto):",
    acceptableAnswers: ["abirs auto", "abir's auto", "abirs"],
    points: 4,
    explanation: "Abir এর নামের শেষে s যোগ হয়ে হবে 'Abirs Auto'।"
  },
  {
    id: 15,
    topic: "Topic 3: Genitiv bei Namen (+s / Apostroph)",
    type: "text",
    prompt: "'Lukas' নামের শেষে Genitiv বোঝাতে কি যোগ করবেন? (শব্দটি লিখুন: Lukas' ):",
    acceptableAnswers: ["lukas'", "lukas '", "'", "apostroph", "appostrophe"],
    points: 4,
    explanation: "যেহেতু Lukas-এর শেষে s আছে, তাই শুধু Apostroph (') বসবে: Lukas'।"
  },

  // --- TOPIC 4: Modalverben im Präteritum (müssen, können, etc.) (Kapitel 2) ---
  {
    id: 16,
    topic: "Topic 4: Modalverben im Präteritum",
    type: "mcq",
    prompt: "Präteritum-এ Modalverb (যেমন müssen, können)-এর রূপান্তরের সবচেয়ে বড় বৈশিষ্ট্য কি?",
    options: [
      "কোনো উমলাউট (Umlaut ä, ö, ü) থাকে না এবং স্টেমের সাথে -te- যুক্ত হয়",
      "সবসময় উমলাউট সহ ব্যবহৃত হয়",
      "শুধুমাত্র ich এবং er/sie/es এ উমলাউট থাকে",
      "ভার্বটির কোনো পরিবর্তন হয় না"
    ],
    correctAnswer: "কোনো উমলাউট (Umlaut ä, ö, ü) থাকে না এবং স্টেমের সাথে -te- যুক্ত হয়",
    points: 4,
    explanation: "Präteritum-এ সব Modalverb-এর উমলাউট উঠে যায় (müssen -> musste, können -> konnte) এবং -te স্টেম থাকে।"
  },
  {
    id: 17,
    topic: "Topic 4: Modalverben im Präteritum",
    type: "mcq",
    prompt: "'Gestern ________ ich nicht zur Schule gehen.' (können এর Präteritum form ich এর জন্য):",
    options: ["konnte", "könnte", "kann", "konntest"],
    correctAnswer: "konnte",
    points: 4,
    explanation: "können এর Präteritum রূপ ich এর জন্য হলো 'konnte' (কোনো উমলাউট নেই)।"
  },
  {
    id: 18,
    topic: "Topic 4: Modalverben im Präteritum",
    type: "mcq",
    prompt: "'du' এর জন্য müssen-এর Präteritum রূপ কোনটি?",
    options: ["musstest", "müsstest", "musst", "musste"],
    correctAnswer: "musstest",
    points: 4,
    explanation: "müssen -> musste + st = musstest (উমলাউট ছাড়া)।"
  },
  {
    id: 19,
    topic: "Topic 4: Modalverben im Präteritum",
    type: "text",
    prompt: "'er/sie/es' এর জন্য 'müssen'-এর Präteritum রূপ কি? (শব্দটি লিখুন):",
    acceptableAnswers: ["musste"],
    points: 4,
    explanation: "er/sie/es musste (Präteritum এ ich এবং er/sie/es একই রূপ ধারণ করে)।"
  },
  {
    id: 20,
    topic: "Topic 4: Modalverben im Präteritum",
    type: "text",
    prompt: "'wir' এর জন্য 'wollen' এর Präteritum রূপ কি? (শব্দটি লিখুন):",
    acceptableAnswers: ["wollten"],
    points: 4,
    explanation: "wir wollten."
  },

  // --- TOPIC 5: Possessivartikel im Dativ (mit meinem, meiner, meinen) (Kapitel 2) ---
  {
    id: 21,
    topic: "Topic 5: Possessivartikel im Dativ",
    type: "mcq",
    prompt: "'Ich spreche mit ________ Bruder (der Bruder).' — শূন্যস্থানে সঠিক রূপ কোনটি?",
    options: ["meinem", "meiner", "meinen", "meine"],
    correctAnswer: "meinem",
    points: 4,
    explanation: "'mit' একটি Dativ Präposition। der Bruder Dativ-এ dem Bruder হয়, সুতরাং mein -> meinem Bruder।"
  },
  {
    id: 22,
    topic: "Topic 5: Possessivartikel im Dativ",
    type: "mcq",
    prompt: "'Er trinkt Kaffee bei ________ Tante (die Tante).' — শূন্যস্থানে কোনটি বসবে?",
    options: ["seiner", "seinem", "seinen", "seine"],
    correctAnswer: "seiner",
    points: 4,
    explanation: "'bei' হলো Dativ। die Tante Dativ-এ der Tante হয়, তাই er এর Possessivartikel হবে 'seiner Tante'।"
  },
  {
    id: 23,
    topic: "Topic 5: Possessivartikel im Dativ",
    type: "mcq",
    prompt: "Dativ Plural (die Freunde) এর ক্ষেত্রে সঠিক রূপ কোনটি? 'Ich spiele mit ________ Freunden.'",
    options: ["meinen", "meinem", "meiner", "meine"],
    correctAnswer: "meinen",
    points: 4,
    explanation: "Dativ Plural-এ Artikel হয় 'den' এবং Nomen-এর শেষে '-n' যোগ হয়। তাই mein -> meinen Freunden।"
  },
  {
    id: 24,
    topic: "Topic 5: Possessivartikel im Dativ",
    type: "text",
    prompt: "'nach der Schule' — এখানে 'die Schule' শব্দটির আর্টিকেল Dativ-এ কি হয়েছে? (আর্টিকেলটি লিখুন: der / dem / den):",
    acceptableAnswers: ["der"],
    points: 4,
    explanation: "'nach' একটি Dativ Präposition, এবং die Schule Dativ-এ 'der Schule' হয়।"
  },
  {
    id: 25,
    topic: "Topic 5: Possessivartikel im Dativ",
    type: "text",
    prompt: "'Wir helfen ________ Tochter (die Tochter).' (হেলফেন Dativ ভার্ব, wir এর জন্য Dativ Possessivartikel লিখুন: unserer / unserem):",
    acceptableAnswers: ["unserer"],
    points: 4,
    explanation: "die Tochter Dativ-এ der Tochter হয়, wir এর Possessivartikel feminine Dativ-এ হবে 'unserer'."
  }
];

// Serve admin panel
app.get('/admin', (req, res) => {
  res.sendFile('admin.html', { root: path.join(__dirname, 'public') });
});

// API: Get Seat Status
app.get('/api/seats', (req, res) => {
  const data = loadData();
  res.json({
    seats: data.seats,
    totalSeats: 10,
    availableSeats: data.seats.filter(s => !s.isOccupied).length
  });
});

// API: Book a seat and start exam
app.post('/api/seats/book', (req, res) => {
  const { seatId, studentName } = req.body;
  if (!seatId || !studentName || !studentName.trim()) {
    return res.status(400).json({ error: 'Seat ID এবং Student Name আবশ্যক।' });
  }

  const data = loadData();
  const seat = data.seats.find(s => s.id === parseInt(seatId));

  if (!seat) {
    return res.status(404).json({ error: 'সিটটি খুঁজে পাওয়া যায়নি।' });
  }

  if (seat.isOccupied) {
    return res.status(400).json({ error: 'এই সিটটি ইতোমধ্যে একজন শিক্ষার্থী নিয়ে নিয়েছেন! অনুগ্রহ করে অন্য কোনো সিট নির্বাচন করুন।' });
  }

  seat.isOccupied = true;
  seat.studentName = studentName.trim();
  seat.occupiedAt = new Date().toISOString();

  saveData(data);

  res.json({
    success: true,
    message: `অভিনন্দন ${seat.studentName}, আপনি ${seat.seatNumber} গ্রহণ করেছেন!`,
    seat,
    totalQuestions: QUESTIONS.length,
    totalPoints: QUESTIONS.reduce((sum, q) => sum + q.points, 0)
  });
});

// API: Get Exam Questions
app.get('/api/questions', (req, res) => {
  // Return questions without correct answers for security
  const safeQuestions = QUESTIONS.map(q => ({
    id: q.id,
    topic: q.topic,
    type: q.type,
    prompt: q.prompt,
    options: q.options || null,
    points: q.points
  }));
  res.json({
    questions: safeQuestions,
    totalPoints: QUESTIONS.reduce((sum, q) => sum + q.points, 0)
  });
});

// API: Submit Exam
app.post('/api/exam/submit', (req, res) => {
  const { seatId, studentName, answers } = req.body;
  if (!seatId || !studentName) {
    return res.status(400).json({ error: 'Seat ID ও Student Name প্রয়োজন।' });
  }

  const data = loadData();
  let totalScore = 0;
  let maxScore = 0;
  let correctCount = 0;
  let wrongCount = 0;

  const evaluationDetails = QUESTIONS.map(q => {
    maxScore += q.points;
    const userAnswer = answers ? answers[q.id] : undefined;
    let isCorrect = false;

    if (q.type === 'mcq') {
      if (userAnswer && userAnswer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
        isCorrect = true;
      }
    } else if (q.type === 'text') {
      if (userAnswer && typeof userAnswer === 'string') {
        const cleanUser = userAnswer.trim().toLowerCase();
        isCorrect = q.acceptableAnswers.some(ans => ans.trim().toLowerCase() === cleanUser);
      }
    }

    if (isCorrect) {
      totalScore += q.points;
      correctCount++;
    } else {
      wrongCount++;
    }

    return {
      questionId: q.id,
      topic: q.topic,
      prompt: q.prompt,
      userAnswer: userAnswer || '(উত্তর দেওয়া হয়নি)',
      correctAnswer: q.type === 'mcq' ? q.correctAnswer : q.acceptableAnswers.join(' / '),
      isCorrect,
      pointsEarned: isCorrect ? q.points : 0,
      maxPoints: q.points,
      explanation: q.explanation
    };
  });

  const submission = {
    id: Date.now(),
    seatId,
    seatNumber: `Seat ${seatId}`,
    studentName,
    submittedAt: new Date().toISOString(),
    totalScore,
    maxScore,
    percentage: Math.round((totalScore / maxScore) * 100),
    correctCount,
    wrongCount,
    totalQuestions: QUESTIONS.length,
    evaluationDetails
  };

  // Keep seat assigned with score status so admin knows this seat belongs to this student
  const seat = data.seats.find(s => s.id === parseInt(seatId));
  if (seat) {
    seat.isOccupied = true;
    seat.studentName = studentName;
    seat.totalScore = totalScore;
    seat.maxScore = maxScore;
    seat.hasSubmitted = true;
  }

  data.submissions.push(submission);
  saveData(data);

  res.json({
    success: true,
    message: 'পরীক্ষা সফলভাবে জমা দেওয়া হয়েছে!',
    result: {
      studentName,
      seatNumber: submission.seatNumber,
      totalScore,
      maxScore,
      percentage: submission.percentage,
      correctCount,
      wrongCount,
      totalQuestions: QUESTIONS.length,
      evaluationDetails
    }
  });
});

// API: Admin Panel Submissions
app.get('/api/admin/submissions', (req, res) => {
  const data = loadData();
  res.json({
    seats: data.seats,
    submissions: data.submissions
  });
});

// API: Clear/Release user from a seat
app.post('/api/admin/seats/clear-user', (req, res) => {
  const { seatId } = req.body;
  const data = loadData();
  const seat = data.seats.find(s => s.id === parseInt(seatId));
  if (!seat) {
    return res.status(404).json({ error: 'সিটটি পাওয়া যায়নি।' });
  }
  const prevStudent = seat.studentName;
  seat.isOccupied = false;
  seat.studentName = null;
  seat.occupiedAt = null;
  saveData(data);
  res.json({ success: true, message: `${seat.seatNumber} থেকে ব্যবহারকারী (${prevStudent || 'অজ্ঞাত'}) কে সফলভাবে অপসারণ করা হয়েছে।` });
});

// API: Delete a seat permanently
app.post('/api/admin/seats/delete', (req, res) => {
  const { seatId } = req.body;
  const data = loadData();
  const index = data.seats.findIndex(s => s.id === parseInt(seatId));
  if (index === -1) {
    return res.status(404).json({ error: 'সিটটি পাওয়া যায়নি।' });
  }
  const deletedSeat = data.seats.splice(index, 1)[0];
  saveData(data);
  res.json({ success: true, message: `${deletedSeat.seatNumber} সম্পূর্ণরূপে মুছে ফেলা হয়েছে।` });
});

// API: Add a new seat
app.post('/api/admin/seats/add', (req, res) => {
  const data = loadData();
  const nextId = data.seats.length > 0 ? Math.max(...data.seats.map(s => s.id)) + 1 : 1;
  const newSeat = {
    id: nextId,
    seatNumber: `Seat ${nextId}`,
    isOccupied: false,
    studentName: null,
    occupiedAt: null
  };
  data.seats.push(newSeat);
  saveData(data);
  res.json({ success: true, message: `${newSeat.seatNumber} সফলভাবে যোগ করা হয়েছে।`, seat: newSeat });
});

// API: Delete a student's submission
app.post('/api/admin/submissions/delete', (req, res) => {
  const { submissionId } = req.body;
  const data = loadData();
  const index = data.submissions.findIndex(s => s.id === parseInt(submissionId));
  if (index === -1) {
    return res.status(404).json({ error: 'সাবমিশনটি পাওয়া যায়নি।' });
  }
  const removed = data.submissions.splice(index, 1)[0];
  saveData(data);
  res.json({ success: true, message: `${removed.studentName}-এর ফলাফল সফলভাবে ডিলিট করা হয়েছে।` });
});

// API: Reset all seats & submissions (for testing / admin convenience)
app.post('/api/admin/reset', (req, res) => {
  const init = getInitialData();
  saveData(init);
  res.json({ success: true, message: 'সব সিট ও সাবমিশন ডাটা সফলভাবে রিসেট করা হয়েছে।' });
});

app.listen(PORT, () => {
  console.log(`German Exam Platform running at http://localhost:${PORT}`);
});
