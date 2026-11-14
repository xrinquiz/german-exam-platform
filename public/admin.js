// Admin Dashboard Logic
let adminSeats = [];
let adminSubmissions = [];
let activeMarksheetSub = null;
let submissionsMap = new Map();

document.addEventListener('DOMContentLoaded', () => {
  loadAdminData();
  // Auto refresh every 4 seconds for live sync
  setInterval(loadAdminData, 4000);
});

// Toast notification helper
function showToast(message) {
  const toast = document.getElementById('copyToast');
  if (toast) {
    toast.innerText = message || 'কপি সম্পন্ন হয়েছে! ✅';
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }
}

// 1. Fetch Admin Data
async function loadAdminData() {
  try {
    const res = await fetch('/api/admin/submissions');
    const data = await res.json();
    adminSeats = data.seats || [];
    adminSubmissions = data.submissions || [];

    // Store in global map by ID to avoid JSON.stringify quote escaping issues
    submissionsMap.clear();
    adminSubmissions.forEach(sub => {
      submissionsMap.set(sub.id.toString(), sub);
    });

    renderSeatControlCards(adminSeats, adminSubmissions);
    renderSubmissionsTable(adminSubmissions);
  } catch (err) {
    console.error('Error fetching admin data:', err);
  }
}

// 2. Render Interactive Seat Cards
function renderSeatControlCards(seats, submissions) {
  const container = document.getElementById('adminSeatsCardsGrid');
  const badge = document.getElementById('seatSummaryBadge');
  if (badge) {
    const occupiedCount = seats.filter(s => s.isOccupied).length;
    badge.innerText = `মোট সিট: ${seats.length}টি (ব্যস্ত: ${occupiedCount}টি | খালি: ${seats.length - occupiedCount}টি)`;
  }

  container.innerHTML = '';

  if (seats.length === 0) {
    container.innerHTML = '<div style="color: #64748b; padding: 1.5rem;">কোনো সিট নেই। উপরের "+ নতুন সিট যোগ করুন" বাটনে ক্লিক করে সিট তৈরি করুন।</div>';
    return;
  }

  seats.forEach(seat => {
    const card = document.createElement('div');
    card.className = `admin-seat-card ${seat.isOccupied ? 'is-occupied' : 'is-free'}`;

    // Find student submission if available
    const studentSub = submissions.find(sub => sub.seatId === seat.id || (sub.studentName === seat.studentName && sub.seatNumber === seat.seatNumber));
    
    let scoreInfo = '';
    if (studentSub) {
      scoreInfo = `
        <div class="seat-score-pill">
          <span>স্কোর: <strong>${studentSub.totalScore}/${studentSub.maxScore}</strong> (${studentSub.percentage}%)</span>
        </div>
      `;
    } else if (seat.isOccupied) {
      scoreInfo = `<div class="seat-score-pill testing"><span>পরীক্ষা চলছে... ⏳</span></div>`;
    }

    card.innerHTML = `
      <div class="seat-card-top">
        <span class="seat-badge ${seat.isOccupied ? 'badge-occupied' : 'badge-free'}">
          ${seat.isOccupied ? 'বুকড' : 'খালি'}
        </span>
        <button class="btn-icon-del" title="এই সিটটি সম্পূর্ণ ডিলিট করুন" onclick="deleteSeat(${seat.id}, '${seat.seatNumber}')">🗑️</button>
      </div>

      <div class="seat-title">${seat.seatNumber}</div>

      <div class="seat-user-info">
        ${seat.isOccupied ? `
          <div class="seat-user-name" title="${seat.studentName}">👤 <strong>${seat.studentName}</strong></div>
          ${scoreInfo}
          <div class="seat-action-btn-row">
            <button class="btn btn-warning-sm" onclick="clearSeatUser(${seat.id}, '${seat.seatNumber}', '${seat.studentName}')">
              ❌ ইউজার সরান (খালি করুন)
            </button>
            ${studentSub ? `
              <button class="btn btn-info-sm" onclick="openMarksheetById('${studentSub.id}')">
                📄 মার্কশিট
              </button>
            ` : ''}
          </div>
        ` : `
          <div class="seat-empty-msg">সিটটি খালি আছে</div>
          <div class="seat-action-btn-row">
            <span style="font-size: 0.8rem; color: #10b981;">শিক্ষার্থীর জন্য উন্মুক্ত</span>
          </div>
        `}
      </div>
    `;

    container.appendChild(card);
  });
}

// 3. Clear User from Seat
async function clearSeatUser(seatId, seatNumber, studentName) {
  const ok = confirm(`আপনি কি নিশ্চিত যে ${seatNumber} থেকে শিক্ষার্থী "${studentName}"-কে মুছে দিয়ে সিটটি খালি করতে চান?`);
  if (!ok) return;

  try {
    const res = await fetch('/api/admin/seats/clear-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seatId })
    });
    const data = await res.json();
    showToast(data.message);
    loadAdminData();
  } catch (err) {
    alert('ইউজার অপসারণে সমস্যা হয়েছে।');
  }
}

// 4. Delete Seat Permanently
async function deleteSeat(seatId, seatNumber) {
  const ok = confirm(`সতর্কতা: আপনি কি নিশ্চিত যে ${seatNumber} সম্পূর্ণভাবে ডিলিট করতে চান?`);
  if (!ok) return;

  try {
    const res = await fetch('/api/admin/seats/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seatId })
    });
    const data = await res.json();
    showToast(data.message);
    loadAdminData();
  } catch (err) {
    alert('সিট ডিলিট করতে ব্যর্থ হয়েছে।');
  }
}

// 5. Add New Seat
async function addNewSeat() {
  try {
    const res = await fetch('/api/admin/seats/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    showToast(data.message);
    loadAdminData();
  } catch (err) {
    alert('নতুন সিট যোগ করতে সমস্যা হয়েছে।');
  }
}

// 6. Render Submissions Table
function renderSubmissionsTable(submissions) {
  const tbody = document.getElementById('submissionsTableBody');
  const countBadge = document.getElementById('submissionCountBadge');
  
  if (countBadge) {
    countBadge.innerText = `${submissions ? submissions.length : 0} জন পরীক্ষার্থী`;
  }

  tbody.innerHTML = '';

  if (!submissions || submissions.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center" style="padding: 2.5rem; color: #64748b;">এখনও কোনো শিক্ষার্থী পরীক্ষা জমা দেয়নি।</td></tr>';
    return;
  }

  submissions.forEach(sub => {
    const tr = document.createElement('tr');
    const timeStr = new Date(sub.submittedAt).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' });
    
    tr.innerHTML = `
      <td>${timeStr}</td>
      <td><strong>${sub.studentName}</strong></td>
      <td><span class="badge-score">${sub.seatNumber}</span></td>
      <td><strong style="font-size: 1.05rem;">${sub.totalScore}</strong> / ${sub.maxScore}</td>
      <td>
        <span class="text-success" style="font-weight: 600;">✅ ${sub.correctCount}</span> / 
        <span class="text-danger" style="font-weight: 600;">❌ ${sub.wrongCount}</span>
      </td>
      <td>
        <span class="badge-status" style="background: ${sub.percentage >= 60 ? '#ecfdf5; color: #065f46;' : '#fef2f2; color: #991b1b;'}">
          ${sub.percentage}%
        </span>
      </td>
      <td style="text-align: center;">
        <div style="display: inline-flex; gap: 0.4rem; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-primary" style="padding: 0.35rem 0.75rem; font-size: 0.825rem;" onclick="openMarksheetById('${sub.id}')">
            📄 মার্কশিট দেখুন
          </button>
          <button class="btn btn-outline" style="padding: 0.35rem 0.65rem; font-size: 0.825rem;" title="এই রেজাল্ট কপি করুন" onclick="copyMarksheetById('${sub.id}')">
            📋 কপি
          </button>
          <button class="btn btn-danger-sm" title="ফলাফল ডিলিট" onclick="deleteSubmission(${sub.id}, '${sub.studentName}')">
            🗑️
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function openMarksheetById(id) {
  const sub = submissionsMap.get(id.toString());
  if (sub) {
    openMarksheetModal(sub);
  }
}

function copyMarksheetById(id) {
  const sub = submissionsMap.get(id.toString());
  if (sub) {
    copyMarksheetDirect(sub);
  }
}

// 7. Delete Submission
async function deleteSubmission(submissionId, studentName) {
  const ok = confirm(`আপনি কি নিশ্চিত যে "${studentName}" এর সাবমিশনটি ডিলিট করতে চান?`);
  if (!ok) return;

  try {
    const res = await fetch('/api/admin/submissions/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ submissionId })
    });
    const data = await res.json();
    showToast(data.message);
    loadAdminData();
  } catch (err) {
    alert('সাবমিশন ডিলিট করতে ব্যর্থ হয়েছে।');
  }
}

// 8. Marksheet Modal (Tik / Cross Format)
function openMarksheetModal(sub) {
  activeMarksheetSub = sub;
  const modal = document.getElementById('marksheetModal');
  const title = document.getElementById('modalStudentTitle');
  const subtitle = document.getElementById('modalStudentSubtitle');
  const badgesBox = document.getElementById('modalScoreBadges');
  const content = document.getElementById('modalStudentContent');

  title.innerText = `অফিশিয়াল মার্কশিট: ${sub.studentName} (${sub.seatNumber})`;
  subtitle.innerText = `জমার তারিখ ও সময়: ${new Date(sub.submittedAt).toLocaleString('bn-BD')}`;

  badgesBox.innerHTML = `
    <span class="badge-score" style="font-size: 1rem; padding: 0.35rem 0.8rem; background: #dbeafe; color: #1e40af;">
      মোট নম্বর: <strong>${sub.totalScore} / ${sub.maxScore}</strong>
    </span>
    <span class="badge-score" style="font-size: 1rem; padding: 0.35rem 0.8rem; background: #ecfdf5; color: #065f46;">
      ✅ সঠিক: <strong>${sub.correctCount}টি</strong>
    </span>
    <span class="badge-score" style="font-size: 1rem; padding: 0.35rem 0.8rem; background: #fef2f2; color: #991b1b;">
      ❌ ভুল: <strong>${sub.wrongCount}টি</strong>
    </span>
    <span class="badge-score" style="font-size: 1rem; padding: 0.35rem 0.8rem;">
      সাফল্য: <strong>${sub.percentage}%</strong>
    </span>
  `;

  let html = `<div class="marksheet-questions-container">`;

  sub.evaluationDetails.forEach((item, idx) => {
    const isCorrect = item.isCorrect;
    html += `
      <div class="marksheet-item ${isCorrect ? 'item-correct' : 'item-wrong'}">
        <div class="marksheet-item-header">
          <div class="item-status-icon">
            ${isCorrect ? '<span class="icon-tik">✅</span> <strong style="color: #065f46;">সঠিক উত্তর</strong>' : '<span class="icon-cross">❌</span> <strong style="color: #991b1b;">ভুল উত্তর</strong>'}
          </div>
          <div class="item-points-tag">
            ${isCorrect ? `+${item.pointsEarned}/${item.maxPoints} নম্বর` : `০/${item.maxPoints} নম্বর`}
          </div>
        </div>

        <div class="item-q-prompt">
          <strong>প্রশ্ন ${idx + 1} (${item.topic}):</strong> ${item.prompt}
        </div>

        <div class="item-answers-box">
          <div class="ans-row">
            <span class="ans-label">শিক্ষার্থীর উত্তর:</span>
            <span class="ans-val ${isCorrect ? 'text-success' : 'text-danger'}">${item.userAnswer}</span>
          </div>

          ${!isCorrect ? `
            <div class="ans-row right-ans-row">
              <span class="ans-label">সঠিক উত্তর (Right Answer):</span>
              <strong class="ans-val right-answer-text">👉 ${item.correctAnswer}</strong>
            </div>
          ` : ''}

          <div class="ans-explanation">
            💡 <strong>ব্যাকরণ নোট (Explanation):</strong> ${item.explanation}
          </div>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  content.innerHTML = html;
  modal.style.display = 'block';
}

function closeMarksheetModal() {
  document.getElementById('marksheetModal').style.display = 'none';
}

// 9. Copy Single Marksheet Helper
function copyCurrentMarksheet() {
  if (!activeMarksheetSub) return;
  copyMarksheetDirect(activeMarksheetSub);
}

function copyMarksheetDirect(sub) {
  let text = `====================================\n`;
  text += `🎓 Netzwerk A2 German Exam Marksheet\n`;
  text += `====================================\n`;
  text += `👤 শিক্ষার্থীর নাম: ${sub.studentName}\n`;
  text += `🪑 সিট নম্বর: ${sub.seatNumber}\n`;
  text += `🕒 সাবমিশন সময়: ${new Date(sub.submittedAt).toLocaleString('bn-BD')}\n`;
  text += `📊 প্রাপ্ত নম্বর: ${sub.totalScore} / ${sub.maxScore} (${sub.percentage}%)\n`;
  text += `✅ সঠিক উত্তর: ${sub.correctCount} টি | ❌ ভুল উত্তর: ${sub.wrongCount} টি\n`;
  text += `------------------------------------\n`;
  text += `📝 প্রতি প্রশ্নের ফলাফল বিস্তারিত:\n`;
  text += `------------------------------------\n`;

  sub.evaluationDetails.forEach((item, idx) => {
    const symbol = item.isCorrect ? '✅ [সঠিক]' : '❌ [ভুল]';
    text += `${idx + 1}. ${symbol} ${item.prompt}\n`;
    text += `   • শিক্ষার্থীর উত্তর: ${item.userAnswer}\n`;
    if (!item.isCorrect) {
      text += `   • সঠিক উত্তর: ${item.correctAnswer}\n`;
    }
    text += `   • ব্যাখ্যা: ${item.explanation}\n\n`;
  });

  text += `====================================\n`;

  navigator.clipboard.writeText(text).then(() => {
    showToast('মার্কশিট সফলভাবে ক্লিপবোর্ডে কপি হয়েছে! 📋');
  }).catch(() => {
    alert('কপি করতে সমস্যা হয়েছে।');
  });
}

// 10. Leaderboard (Rank 1st, 2nd, 3rd with Copy)
function showLeaderboardModal() {
  const modal = document.getElementById('leaderboardModal');
  const content = document.getElementById('modalLeaderboardContent');

  if (adminSubmissions.length === 0) {
    content.innerHTML = `<div style="text-align: center; padding: 2rem; color: #64748b;">এখনও কোনো শিক্ষার্থীর ফলাফল জমা পড়েনি।</div>`;
    modal.style.display = 'block';
    return;
  }

  // Sort descending by score, then ascending by time
  const sorted = [...adminSubmissions].sort((a, b) => {
    if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
    return new Date(a.submittedAt) - new Date(b.submittedAt);
  });

  let html = `<div class="leaderboard-list">`;

  sorted.forEach((student, index) => {
    const rank = index + 1;
    let rankBadge = `<span class="rank-num">${rank}</span>`;
    let rankClass = '';

    if (rank === 1) {
      rankBadge = `<span class="rank-medal gold">🥇 ১ম স্থান (1st)</span>`;
      rankClass = 'rank-first';
    } else if (rank === 2) {
      rankBadge = `<span class="rank-medal silver">🥈 ২য় স্থান (2nd)</span>`;
      rankClass = 'rank-second';
    } else if (rank === 3) {
      rankBadge = `<span class="rank-medal bronze">🥉 ৩য় স্থান (3rd)</span>`;
      rankClass = 'rank-third';
    }

    html += `
      <div class="leaderboard-item ${rankClass}">
        <div class="lb-left">
          ${rankBadge}
          <div class="lb-student-info">
            <span class="lb-name">${student.studentName}</span>
            <span class="lb-seat">${student.seatNumber} • ${student.correctCount}টি সঠিক, ${student.wrongCount}টি ভুল</span>
          </div>
        </div>
        <div class="lb-right">
          <div class="lb-score-val">${student.totalScore} / ${student.maxScore}</div>
          <div class="lb-percentage">${student.percentage}%</div>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  content.innerHTML = html;
  modal.style.display = 'block';
}

function closeLeaderboardModal() {
  document.getElementById('leaderboardModal').style.display = 'none';
}

// 11. Copy Whole Leaderboard in Text Format
function copyLeaderboardText() {
  if (!adminSubmissions || adminSubmissions.length === 0) {
    alert('কপি করার মতো কোনো ফলাফল এখনও জমা হয়নি।');
    return;
  }

  const sorted = [...adminSubmissions].sort((a, b) => {
    if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
    return new Date(a.submittedAt) - new Date(b.submittedAt);
  });

  let text = `🏆====================================🏆\n`;
  text += `   Netzwerk A2 Exam Leaderboard (মেধাতালিকা)\n`;
  text += `🏆====================================🏆\n`;
  text += `তারিখ: ${new Date().toLocaleDateString('bn-BD')} | মোট পরীক্ষার্থী: ${sorted.length} জন\n\n`;

  sorted.forEach((sub, idx) => {
    const rank = idx + 1;
    let medal = `${rank}.`;
    if (rank === 1) medal = `🥇 [১ম স্থান]`;
    else if (rank === 2) medal = `🥈 [২য় স্থান]`;
    else if (rank === 3) medal = `🥉 [৩য় স্থান]`;

    text += `${medal} ${sub.studentName} (${sub.seatNumber})\n`;
    text += `   • প্রাপ্ত নম্বর: ${sub.totalScore} / ${sub.maxScore} (${sub.percentage}%)\n`;
    text += `   • সঠিক: ${sub.correctCount} টি | ভুল: ${sub.wrongCount} টি\n\n`;
  });

  text += `========================================\n`;

  navigator.clipboard.writeText(text).then(() => {
    showToast('সম্পূর্ণ লিডারবোর্ড কপি হয়েছে! 🏆📋');
  }).catch(() => {
    alert('কপিতে ত্রুটি হয়েছে।');
  });
}

// 12. Reset All Data
async function resetAllData() {
  const ok = confirm('আপনি কি নিশ্চিত যে সকল সিট খালি করবেন এবং শিক্ষার্থীদের পূর্ববর্তী সকল সাবমিশন ডাটা মুছে ফেলবেন?');
  if (!ok) return;

  try {
    const res = await fetch('/api/admin/reset', { method: 'POST' });
    const data = await res.json();
    showToast(data.message);
    loadAdminData();
  } catch (err) {
    alert('রিসেট করতে ব্যর্থ হয়েছে।');
  }
}

// Close modals when clicking outside
window.onclick = function(event) {
  const marksheetModal = document.getElementById('marksheetModal');
  const leaderboardModal = document.getElementById('leaderboardModal');
  if (event.target === marksheetModal) {
    marksheetModal.style.display = 'none';
  }
  if (event.target === leaderboardModal) {
    leaderboardModal.style.display = 'none';
  }
};
