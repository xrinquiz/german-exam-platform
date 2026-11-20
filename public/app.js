// Student Global State
let currentSeat = null;
let currentStudent = null;
let examQuestions = [];

document.addEventListener('DOMContentLoaded', () => {
  loadSeats();
});

function switchView(viewId) {
  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.classList.add('active');
  }
}

// 1. Fetch & Render Seats
async function loadSeats() {
  try {
    const res = await fetch('/api/seats');
    const data = await res.json();
    renderSeatsGrid(data.seats);
  } catch (err) {
    console.error('Error fetching seats:', err);
  }
}

function renderSeatsGrid(seats) {
  const grid = document.getElementById('seatsGrid');
  grid.innerHTML = '';

  seats.forEach(seat => {
    const seatEl = document.createElement('div');
    seatEl.className = `seat-box ${seat.isOccupied ? 'occupied' : ''} ${currentSeat && currentSeat.id === seat.id ? 'selected' : ''}`;
    
    seatEl.innerHTML = `
      <div class="seat-icon">${seat.isOccupied ? '🚫' : '🪑'}</div>
      <div class="seat-num">${seat.seatNumber}</div>
      <div class="seat-status-text">${seat.isOccupied ? 'বুকড' : 'খালি আছে'}</div>
      ${seat.isOccupied ? `<div class="seat-occupant" title="${seat.studentName}">👤 ${seat.studentName}</div>` : ''}
    `;

    if (!seat.isOccupied) {
      seatEl.onclick = () => selectSeat(seat);
    }

    grid.appendChild(seatEl);
  });
}

function selectSeat(seat) {
  currentSeat = seat;
  document.getElementById('selectedSeatLabel').innerText = `${seat.seatNumber}`;
  validateBookingForm();
  loadSeats();
}

function validateBookingForm() {
  const name = document.getElementById('studentNameInput').value.trim();
  const btn = document.getElementById('btnStartExam');
  if (currentSeat && name.length >= 2) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
}

// 2. Book Seat & Start Exam
async function bookSeatAndStart() {
  const studentName = document.getElementById('studentNameInput').value.trim();
  if (!currentSeat || !studentName) return;

  const btn = document.getElementById('btnStartExam');
  btn.disabled = true;
  btn.innerText = 'অপেক্ষা করুন...';

  try {
    const res = await fetch('/api/seats/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seatId: currentSeat.id, studentName })
    });

    const result = await res.json();
    if (!res.ok) {
      alert(result.error || 'সিট বুকিং ব্যর্থ হয়েছে।');
      btn.disabled = false;
      btn.innerText = '🚀 সিট বুক ও পরীক্ষা শুরু করুন';
      loadSeats();
      return;
    }

    currentStudent = studentName;
    document.getElementById('activeCandidateName').innerText = studentName;
    document.getElementById('activeSeatName').innerText = result.seat.seatNumber;

    // Load exam questions
    await fetchQuestionsAndStart();
  } catch (err) {
    alert('সার্ভারের সাথে সংযোগ বিচ্ছিন্ন হয়েছে।');
    btn.disabled = false;
    btn.innerText = '🚀 সিট বুক ও পরীক্ষা শুরু করুন';
  }
}

async function fetchQuestionsAndStart() {
  try {
    const res = await fetch('/api/questions');
    const data = await res.json();
    examQuestions = data.questions;
    renderExamQuestions(examQuestions);
    switchView('examView');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    console.error('Error fetching questions:', err);
    alert('প্রশ্ন লোড করতে সমস্যা হয়েছে।');
  }
}

// 3. Render Exam Questions (90 Questions in 3 Topics)
function renderExamQuestions(questions) {
  const container = document.getElementById('questionsContainer');
  container.innerHTML = '';

  let currentTopic = '';

  questions.forEach((q, index) => {
    if (q.topic !== currentTopic) {
      currentTopic = q.topic;
      const topicHeader = document.createElement('div');
      topicHeader.className = 'topic-group-header';
      topicHeader.innerHTML = `
        <span>${currentTopic}</span>
        <span class="count">৩০টি প্রশ্ন (৩০ নম্বর)</span>
      `;
      container.appendChild(topicHeader);
    }

    const card = document.createElement('div');
    card.className = 'question-card';

    let inputHtml = '';
    if (q.type === 'mcq') {
      inputHtml = `
        <div class="options-list">
          ${q.options.map((opt, optIdx) => `
            <label class="option-item">
              <input type="radio" name="question_${q.id}" value="${opt}" required>
              <span>${opt}</span>
            </label>
          `).join('')}
        </div>
      `;
    } else if (q.type === 'text') {
      inputHtml = `
        <div class="text-answer-box">
          <input type="text" name="question_${q.id}" placeholder="আপনার উত্তর এখানে টাইপ করুন..." required autocomplete="off">
        </div>
      `;
    }

    card.innerHTML = `
      <div class="q-header">
        <span class="q-number">প্রশ্ন নং ${index + 1} (${q.type === 'mcq' ? 'এমসিকিউ' : 'লিখিত উত্তর'})</span>
        <span class="q-points">${q.points} নম্বর</span>
      </div>
      <div class="q-prompt">${q.prompt}</div>
      ${inputHtml}
    `;

    container.appendChild(card);
  });
}

// 4. Submit Exam Answers
async function submitExamAnswers() {
  const confirmSubmit = confirm('আপনি কি নিশ্চিত যে আপনি পরীক্ষাটি জমা দিতে চান?');
  if (!confirmSubmit) return;

  const btn = document.getElementById('btnSubmitExam');
  btn.disabled = true;
  btn.innerText = 'মূল্যায়ন চলছে, অপেক্ষা করুন...';

  const form = document.getElementById('examForm');
  const formData = new FormData(form);
  const answers = {};

  examQuestions.forEach(q => {
    const val = formData.get(`question_${q.id}`);
    answers[q.id] = val ? val.trim() : '';
  });

  try {
    const res = await fetch('/api/exam/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        seatId: currentSeat.id,
        studentName: currentStudent,
        answers
      })
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.error || 'সাবমিশনে সমস্যা হয়েছে।');
      btn.disabled = false;
      btn.innerText = '✅ পরীক্ষা জমা দিন (Submit Exam)';
      return;
    }

    renderExamResult(data.result);
    switchView('resultView');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    alert('সার্ভার এরর: সাবমিশন সম্পন্ন হয়নি।');
    btn.disabled = false;
    btn.innerText = '✅ পরীক্ষা জমা দিন (Submit Exam)';
  }
}

// 5. Render Result Card
function renderExamResult(result) {
  document.getElementById('resTotalScore').innerText = `${result.totalScore}`;
  document.getElementById('resCorrectCount').innerText = `${result.correctCount}`;
  document.getElementById('resWrongCount').innerText = `${result.wrongCount}`;
  document.getElementById('resPercentage').innerText = `${result.percentage}%`;

  const detailsContainer = document.getElementById('resultDetailsList');
  detailsContainer.innerHTML = '';

  result.evaluationDetails.forEach((item, index) => {
    const revEl = document.createElement('div');
    revEl.className = `review-item ${item.isCorrect ? 'correct' : 'wrong'}`;
    revEl.innerHTML = `
      <div class="review-header">
        <span>প্রশ্ন ${index + 1}: ${item.topic}</span>
        <span class="${item.isCorrect ? 'text-success' : 'text-danger'}">
          ${item.isCorrect ? `✅ সঠিক (+${item.pointsEarned} নম্বর)` : `❌ ভুল (${item.pointsEarned}/${item.maxPoints})`}
        </span>
      </div>
      <div style="margin-bottom: 0.4rem;"><strong>প্রশ্ন:</strong> ${item.prompt}</div>
      <div style="font-size: 0.95rem;"><strong>আপনার দেওয়া উত্তর:</strong> <span style="font-weight: 600; color: ${item.isCorrect ? '#059669' : '#dc2626'}">${item.userAnswer}</span></div>
      ${!item.isCorrect ? `<div style="font-size: 0.95rem; color: #166534;"><strong>সঠিক উত্তর:</strong> ${item.correctAnswer}</div>` : ''}
      <div class="review-explanation"><strong>ব্যাকরণগত ব্যাখ্যা:</strong> ${item.explanation}</div>
    `;
    detailsContainer.appendChild(revEl);
  });
}

// 6. Public Leaderboard & Student Marksheets
async function showPublicLeaderboardModal() {
  const modal = document.getElementById('publicLeaderboardModal');
  if (modal) modal.style.display = 'flex';
  await loadPublicSubmissions();
}

function closePublicLeaderboardModal() {
  const modal = document.getElementById('publicLeaderboardModal');
  if (modal) modal.style.display = 'none';
}

async function loadPublicSubmissions() {
  const tbody = document.getElementById('publicSubmissionsTableBody');
  if (!tbody) return;
  tbody.innerHTML = '<tr><td colspan="8" class="text-center">ফলাফল লোড হচ্ছে...</td></tr>';

  try {
    const res = await fetch('/api/submissions');
    const data = await res.json();
    const submissions = (data.submissions || []).sort((a, b) => b.totalScore - a.totalScore || new Date(a.submittedAt) - new Date(b.submittedAt));

    if (submissions.length === 0) {
      tbody.innerHTML = '<tr><td colspan="8" class="text-center" style="color: #64748b; padding: 1.5rem;">এখনো কোনো শিক্ষার্থী পরীক্ষা জমা দেয়নি।</td></tr>';
      return;
    }

    tbody.innerHTML = '';
    submissions.forEach((sub, idx) => {
      const tr = document.createElement('tr');
      const timeStr = sub.submittedAt ? new Date(sub.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-';
      const rankBadge = idx === 0 ? '🥇 ১' : idx === 1 ? '🥈 ২' : idx === 2 ? '🥉 ৩' : `${idx + 1}`;
      
      tr.innerHTML = `
        <td style="font-weight: 700; text-align: center;">${rankBadge}</td>
        <td><strong>${sub.studentName}</strong></td>
        <td><span class="seat-pill-sm">${sub.seatNumber}</span></td>
        <td><strong>${sub.totalScore} / ${sub.maxScore}</strong></td>
        <td><span style="color: #10b981; font-weight: 600;">✅ ${sub.correctCount}</span> / <span style="color: #ef4444; font-weight: 600;">❌ ${sub.wrongCount}</span></td>
        <td><span class="badge-status" style="background: ${sub.percentage >= 60 ? '#ecfdf5; color: #065f46;' : '#fef2f2; color: #991b1b;'}">${sub.percentage}%</span></td>
        <td style="font-size: 0.825rem; color: #64748b;">${timeStr}</td>
        <td style="text-align: center;">
          <button class="btn btn-primary" style="padding: 0.35rem 0.75rem; font-size: 0.825rem;" onclick="viewStudentPublicMarksheet(${sub.id})">
            👁️ উত্তরপত্র দেখুন
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error('Error loading public submissions:', err);
    tbody.innerHTML = '<tr><td colspan="8" class="text-center text-danger">ডাটা লোড করতে সমস্যা হয়েছে।</td></tr>';
  }
}

async function viewStudentPublicMarksheet(submissionId) {
  try {
    const res = await fetch(`/api/submissions/${submissionId}`);
    if (!res.ok) {
      alert('উত্তরপত্র লোড করতে সমস্যা হয়েছে।');
      return;
    }
    const sub = await res.json();
    
    document.getElementById('publicModalStudentTitle').innerText = `${sub.studentName}-এর সম্পূর্ণ উত্তরপত্র`;
    document.getElementById('publicModalStudentSubtitle').innerText = `${sub.seatNumber} • জমা দেওয়ার সময়: ${new Date(sub.submittedAt).toLocaleString()}`;

    const scoreSummary = document.getElementById('publicMarksheetScoreSummary');
    scoreSummary.innerHTML = `
      <div class="score-summary-grid" style="margin-bottom: 1rem;">
        <div class="metric-box">
          <span class="metric-title">প্রাপ্ত নম্বর</span>
          <span class="metric-val">${sub.totalScore}</span>
          <span class="metric-sub">${sub.maxScore} এর মধ্যে</span>
        </div>
        <div class="metric-box">
          <span class="metric-title">সঠিক উত্তর</span>
          <span class="metric-val text-success">${sub.correctCount}</span>
          <span class="metric-sub">টি প্রশ্ন</span>
        </div>
        <div class="metric-box">
          <span class="metric-title">ভুল / অনুত্তরিত</span>
          <span class="metric-val text-danger">${sub.wrongCount}</span>
          <span class="metric-sub">টি প্রশ্ন</span>
        </div>
        <div class="metric-box">
          <span class="metric-title">সাফল্যের হার</span>
          <span class="metric-val text-primary">${sub.percentage}%</span>
          <span class="metric-sub">শতকরা</span>
        </div>
      </div>
    `;

    const questionsList = document.getElementById('publicMarksheetQuestionsList');
    questionsList.innerHTML = '';

    sub.evaluationDetails.forEach((item, index) => {
      const revEl = document.createElement('div');
      revEl.className = `review-item ${item.isCorrect ? 'correct' : 'wrong'}`;
      revEl.innerHTML = `
        <div class="review-header">
          <span>প্রশ্ন ${index + 1}: ${item.topic}</span>
          <span class="${item.isCorrect ? 'text-success' : 'text-danger'}">
            ${item.isCorrect ? `✅ সঠিক (+${item.pointsEarned} নম্বর)` : `❌ ভুল (${item.pointsEarned}/${item.maxPoints})`}
          </span>
        </div>
        <div style="margin-bottom: 0.4rem;"><strong>প্রশ্ন:</strong> ${item.prompt}</div>
        <div style="font-size: 0.95rem;"><strong>শিক্ষার্থীর উত্তর:</strong> <span style="font-weight: 600; color: ${item.isCorrect ? '#059669' : '#dc2626'}">${item.userAnswer}</span></div>
        ${!item.isCorrect ? `<div style="font-size: 0.95rem; color: #166534;"><strong>সঠিক উত্তর:</strong> ${item.correctAnswer}</div>` : ''}
        <div class="review-explanation"><strong>ব্যাকরণগত ব্যাখ্যা:</strong> ${item.explanation}</div>
      `;
      questionsList.appendChild(revEl);
    });

    const marksheetModal = document.getElementById('publicMarksheetModal');
    if (marksheetModal) marksheetModal.style.display = 'flex';
  } catch (err) {
    console.error('Error fetching student submission details:', err);
    alert('উত্তরপত্র লোড করা সম্ভব হয়নি।');
  }
}

function closePublicMarksheetModal() {
  const modal = document.getElementById('publicMarksheetModal');
  if (modal) modal.style.display = 'none';
}
