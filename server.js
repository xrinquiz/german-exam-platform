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

// Exam Questions Definition (90 questions across 3 topics from questions.js)
const QUESTIONS = require('./questions');

// API: Public Submissions List (accessible by all students)
app.get('/api/submissions', (req, res) => {
  const data = loadData();
  res.json({
    totalSubmissions: data.submissions.length,
    submissions: data.submissions.map(sub => ({
      id: sub.id,
      seatId: sub.seatId,
      seatNumber: sub.seatNumber,
      studentName: sub.studentName,
      submittedAt: sub.submittedAt,
      totalScore: sub.totalScore,
      maxScore: sub.maxScore,
      percentage: sub.percentage,
      correctCount: sub.correctCount,
      wrongCount: sub.wrongCount,
      totalQuestions: sub.totalQuestions
    }))
  });
});

// API: Public Single Submission Details
app.get('/api/submissions/:id', (req, res) => {
  const data = loadData();
  const sub = data.submissions.find(s => s.id === parseInt(req.params.id));
  if (!sub) {
    return res.status(404).json({ error: 'সাবমিশনটি পাওয়া যায়নি।' });
  }
  res.json(sub);
});

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
