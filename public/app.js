// Constants
const statuses = ['Not Started', 'In Progress', 'Blocked', 'Done'];
const categories = [
  'Internship',
  'Research',
  'IT4070',
  'IT4031',
  'IT4021',
  'Power BI/Apps',
  'Machine Build'
];
const priorities = ['Low', 'Medium', 'High'];

// Motivational Quotes for A+ Students
const quotes = [
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Education is the most powerful weapon which you can use to change the world. - Nelson Mandela",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "Success is walking from failure to failure with no loss of enthusiasm. - Winston Churchill",
  "The expert in anything was once a beginner. - Helen Hayes",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn't just find you. You have to go out and get it.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Don't stop when you're tired. Stop when you're done.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Do something today that your future self will thank you for.",
  "It's going to be hard, but hard does not mean impossible.",
  "Little things make big days.",
  "The key to success is to focus on goals, not obstacles.",
  "Dream bigger. Do bigger.",
  "You don't have to be great to start, but you have to start to be great.",
  "A year from now you'll wish you had started today.",
  "Every expert was once a beginner. Every pro was once an amateur.",
  "Stay focused and never give up on your dreams."
];

// Exercise type icons
const exerciseIcons = {
  Walking: '&#128694;',
  Running: '&#127939;',
  Cycling: '&#128690;',
  Gym: '&#127947;',
  Yoga: '&#129495;',
  Swimming: '&#127946;',
  Other: '&#128170;'
};

// Plant SVGs for each level
const plantSVGs = {
  0: `<svg viewBox="0 0 100 120">
    <ellipse cx="50" cy="100" rx="30" ry="10" fill="#8B4513"/>
    <ellipse cx="50" cy="85" rx="12" ry="8" fill="#A0522D"/>
    <ellipse cx="50" cy="82" rx="8" ry="5" fill="#8B7355"/>
  </svg>`,
  1: `<svg viewBox="0 0 100 120">
    <ellipse cx="50" cy="110" rx="35" ry="8" fill="#8B4513"/>
    <path d="M50 110 Q50 80 50 70" stroke="#228B22" stroke-width="4" fill="none"/>
    <ellipse cx="38" cy="75" rx="12" ry="6" fill="#32CD32" transform="rotate(-30 38 75)"/>
    <ellipse cx="62" cy="75" rx="12" ry="6" fill="#32CD32" transform="rotate(30 62 75)"/>
  </svg>`,
  2: `<svg viewBox="0 0 100 120">
    <ellipse cx="50" cy="112" rx="35" ry="8" fill="#8B4513"/>
    <path d="M50 112 Q50 70 50 50" stroke="#228B22" stroke-width="5" fill="none"/>
    <ellipse cx="32" cy="85" rx="14" ry="7" fill="#32CD32" transform="rotate(-35 32 85)"/>
    <ellipse cx="68" cy="85" rx="14" ry="7" fill="#32CD32" transform="rotate(35 68 85)"/>
    <ellipse cx="35" cy="65" rx="12" ry="6" fill="#2E8B57" transform="rotate(-25 35 65)"/>
    <ellipse cx="65" cy="65" rx="12" ry="6" fill="#2E8B57" transform="rotate(25 65 65)"/>
    <ellipse cx="50" cy="48" rx="10" ry="5" fill="#228B22"/>
  </svg>`,
  3: `<svg viewBox="0 0 100 120">
    <ellipse cx="50" cy="112" rx="35" ry="8" fill="#8B4513"/>
    <path d="M50 112 Q50 60 50 40" stroke="#228B22" stroke-width="6" fill="none"/>
    <ellipse cx="28" cy="90" rx="16" ry="8" fill="#32CD32" transform="rotate(-40 28 90)"/>
    <ellipse cx="72" cy="90" rx="16" ry="8" fill="#32CD32" transform="rotate(40 72 90)"/>
    <ellipse cx="25" cy="70" rx="14" ry="7" fill="#2E8B57" transform="rotate(-30 25 70)"/>
    <ellipse cx="75" cy="70" rx="14" ry="7" fill="#2E8B57" transform="rotate(30 75 70)"/>
    <ellipse cx="30" cy="50" rx="12" ry="6" fill="#228B22" transform="rotate(-20 30 50)"/>
    <ellipse cx="70" cy="50" rx="12" ry="6" fill="#228B22" transform="rotate(20 70 50)"/>
    <ellipse cx="50" cy="35" rx="14" ry="7" fill="#32CD32"/>
    <circle cx="40" cy="60" r="4" fill="#FF69B4"/>
    <circle cx="65" cy="75" r="4" fill="#FFB6C1"/>
  </svg>`,
  4: `<svg viewBox="0 0 100 120">
    <ellipse cx="50" cy="115" rx="35" ry="6" fill="#8B4513"/>
    <path d="M50 115 Q50 70 50 30" stroke="#8B4513" stroke-width="8" fill="none"/>
    <path d="M50 70 Q30 60 20 70" stroke="#8B4513" stroke-width="3" fill="none"/>
    <path d="M50 70 Q70 60 80 70" stroke="#8B4513" stroke-width="3" fill="none"/>
    <ellipse cx="50" cy="35" rx="35" ry="25" fill="#228B22"/>
    <ellipse cx="30" cy="45" rx="20" ry="15" fill="#32CD32"/>
    <ellipse cx="70" cy="45" rx="20" ry="15" fill="#32CD32"/>
    <ellipse cx="50" cy="25" rx="25" ry="18" fill="#2E8B57"/>
    <ellipse cx="35" cy="55" rx="15" ry="10" fill="#3CB371"/>
    <ellipse cx="65" cy="55" rx="15" ry="10" fill="#3CB371"/>
    <circle cx="25" cy="60" r="3" fill="#FF6347"/>
    <circle cx="75" cy="55" r="3" fill="#FF6347"/>
    <circle cx="45" cy="40" r="2" fill="#FFD700"/>
  </svg>`,
  5: `<svg viewBox="0 0 100 120">
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#FFD700"/>
        <stop offset="50%" style="stop-color:#FFA500"/>
        <stop offset="100%" style="stop-color:#FFD700"/>
      </linearGradient>
    </defs>
    <ellipse cx="50" cy="115" rx="35" ry="6" fill="#8B4513"/>
    <path d="M50 115 Q50 65 50 25" stroke="url(#goldGrad)" stroke-width="10" fill="none"/>
    <path d="M50 65 Q25 55 15 65" stroke="#8B4513" stroke-width="4" fill="none"/>
    <path d="M50 65 Q75 55 85 65" stroke="#8B4513" stroke-width="4" fill="none"/>
    <ellipse cx="50" cy="30" rx="40" ry="28" fill="#228B22"/>
    <ellipse cx="25" cy="45" rx="22" ry="16" fill="#32CD32"/>
    <ellipse cx="75" cy="45" rx="22" ry="16" fill="#32CD32"/>
    <ellipse cx="50" cy="18" rx="30" ry="20" fill="#2E8B57"/>
    <ellipse cx="30" cy="58" rx="18" ry="12" fill="#3CB371"/>
    <ellipse cx="70" cy="58" rx="18" ry="12" fill="#3CB371"/>
    <circle cx="20" cy="55" r="5" fill="#FFD700"/>
    <circle cx="80" cy="50" r="5" fill="#FFD700"/>
    <circle cx="50" cy="10" r="6" fill="#FFD700"/>
    <circle cx="35" cy="35" r="4" fill="#FFD700"/>
    <circle cx="65" cy="30" r="4" fill="#FFD700"/>
  </svg>`
};

// App State
const state = {
  tasks: [],
  allTasks: [],
  view: 'kanban',
  due: 'all',
  filters: {
    search: '',
    category: '',
    status: '',
    priority: '',
    liked: false
  },
  sort: {
    key: 'updated_at',
    dir: 'desc'
  },
  editingId: null,
  currentQuoteIndex: 0,
  // New module states
  activeModule: 'tasks',
  physicalLogs: [],
  editingPhysicalId: null,
  studySessions: [],
  editingStudyId: null,
  calendarYear: new Date().getFullYear(),
  calendarMonth: new Date().getMonth() + 1,
  calendarData: null,
  plantStatus: null,
  // NoFap module states
  nofapStatus: null,
  nofapHistory: null,
  urgeTimerInterval: null,
  urgeTimerSeconds: 600,
  urgeTimerRunning: false
};

// DOM Elements
const viewContainer = document.getElementById('viewContainer');
const searchInput = document.getElementById('searchInput');
const filterCategory = document.getElementById('filterCategory');
const filterStatus = document.getElementById('filterStatus');
const filterPriority = document.getElementById('filterPriority');
const newTaskBtn = document.getElementById('newTaskBtn');
const modalOverlay = document.getElementById('modalOverlay');
const taskForm = document.getElementById('taskForm');
const formTitle = document.getElementById('formTitle');
const cancelEdit = document.getElementById('cancelEdit');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const importFile = document.getElementById('importFile');
const toast = document.getElementById('toast');
const todayBadge = document.getElementById('todayBadge');
const quoteText = document.getElementById('quoteText');
const nextQuoteBtn = document.getElementById('nextQuote');
const confettiCanvas = document.getElementById('confettiCanvas');

// Progress elements
const statTotal = document.getElementById('statTotal');
const statDone = document.getElementById('statDone');
const statInProgress = document.getElementById('statInProgress');
const statStreak = document.getElementById('statStreak');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

// Form inputs
const titleInput = document.getElementById('titleInput');
const descriptionInput = document.getElementById('descriptionInput');
const categoryInput = document.getElementById('categoryInput');
const statusInput = document.getElementById('statusInput');
const priorityInput = document.getElementById('priorityInput');
const dueInput = document.getElementById('dueInput');

// New module elements
const calendarContainer = document.getElementById('calendarContainer');
const physicalContainer = document.getElementById('physicalContainer');
const plantContainer = document.getElementById('plantContainer');
const galaxyContainer = document.getElementById('galaxyContainer');
const calendarGrid = document.getElementById('calendarGrid');
const calendarTitle = document.getElementById('calendarTitle');
const calendarPrev = document.getElementById('calendarPrev');
const calendarNext = document.getElementById('calendarNext');
const physicalList = document.getElementById('physicalList');
const newPhysicalBtn = document.getElementById('newPhysicalBtn');
const physicalModalOverlay = document.getElementById('physicalModalOverlay');
const physicalForm = document.getElementById('physicalForm');
const cancelPhysical = document.getElementById('cancelPhysical');
const exerciseTypeInput = document.getElementById('exerciseTypeInput');
const durationInput = document.getElementById('durationInput');
const logDateInput = document.getElementById('logDateInput');
const physicalNotesInput = document.getElementById('physicalNotesInput');
const studyModalOverlay = document.getElementById('studyModalOverlay');
const studyForm = document.getElementById('studyForm');
const cancelStudy = document.getElementById('cancelStudy');
const studyCategoryInput = document.getElementById('studyCategoryInput');
const studyDurationInput = document.getElementById('studyDurationInput');
const sessionDateInput = document.getElementById('sessionDateInput');
const studyNotesInput = document.getElementById('studyNotesInput');
const plantSvg = document.getElementById('plantSvg');
const plantLevel = document.getElementById('plantLevel');
const plantProgressFill = document.getElementById('plantProgressFill');
const plantProgressText = document.getElementById('plantProgressText');
const plantTotalPoints = document.getElementById('plantTotalPoints');
const plantTodayPoints = document.getElementById('plantTodayPoints');
const plantWeekPoints = document.getElementById('plantWeekPoints');
const plantStreak = document.getElementById('plantStreak');
const plantDisplay = document.getElementById('plantDisplay');
const plantWater = document.getElementById('plantWater');
const viewHistoryBtn = document.getElementById('viewHistoryBtn');
const historyModalOverlay = document.getElementById('historyModalOverlay');
const historyContent = document.getElementById('historyContent');
const closeHistory = document.getElementById('closeHistory');
const physicalStreakEl = document.getElementById('physicalStreak');
const physicalWeekEl = document.getElementById('physicalWeek');
const physicalMonthEl = document.getElementById('physicalMonth');

// NoFap module elements
const nofapContainer = document.getElementById('nofapContainer');
const nofapStreakNumber = document.getElementById('nofapStreakNumber');
const nofapBestStreak = document.getElementById('nofapBestStreak');
const nofapUrgesResisted = document.getElementById('nofapUrgesResisted');
const nofapTotalRelapses = document.getElementById('nofapTotalRelapses');
const nofapCheckinStatus = document.getElementById('nofapCheckinStatus');
const nofapMotivation = document.getElementById('nofapMotivation');
const nofapCheckinBtn = document.getElementById('nofapCheckinBtn');
const nofapUrgeBtn = document.getElementById('nofapUrgeBtn');
const nofapRelapseBtn = document.getElementById('nofapRelapseBtn');
const nofapUrgeTimer = document.getElementById('nofapUrgeTimer');
const urgeTimerProgress = document.getElementById('urgeTimerProgress');
const urgeTimerText = document.getElementById('urgeTimerText');
const urgeTimerMotivation = document.getElementById('urgeTimerMotivation');
const urgeIntensitySlider = document.getElementById('urgeIntensitySlider');
const urgeIntensityValue = document.getElementById('urgeIntensityValue');
const urgeTimerDoneBtn = document.getElementById('urgeTimerDoneBtn');
const urgeTimerCancelBtn = document.getElementById('urgeTimerCancelBtn');
const nofapHistoryList = document.getElementById('nofapHistoryList');

// ============ CONFETTI ============
class Confetti {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.running = false;
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles(count = 100) {
    const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6'];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height - this.canvas.height,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 3 + 2,
        speedX: Math.random() * 2 - 1,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5
      });
    }
  }

  animate() {
    if (!this.running) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles = this.particles.filter(p => p.y < this.canvas.height + 20);

    for (const p of this.particles) {
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation * Math.PI / 180);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      this.ctx.restore();

      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotationSpeed;
    }

    if (this.particles.length > 0) {
      requestAnimationFrame(() => this.animate());
    } else {
      this.running = false;
    }
  }

  fire() {
    this.resize();
    this.particles = [];
    this.createParticles(150);
    this.running = true;
    this.animate();
  }
}

const confetti = new Confetti(confettiCanvas);
window.addEventListener('resize', () => confetti.resize());

// ============ QUOTES ============
function showQuote() {
  state.currentQuoteIndex = Math.floor(Math.random() * quotes.length);
  if (quoteText) {
    quoteText.style.animation = 'none';
    quoteText.offsetHeight; // Trigger reflow
    quoteText.style.animation = 'fadeInQuote 0.5s ease';
    quoteText.textContent = `"${quotes[state.currentQuoteIndex]}"`;
  }
}

function nextQuote() {
  state.currentQuoteIndex = (state.currentQuoteIndex + 1) % quotes.length;
  if (quoteText) {
    quoteText.style.animation = 'none';
    quoteText.offsetHeight;
    quoteText.style.animation = 'fadeInQuote 0.5s ease';
    quoteText.textContent = `"${quotes[state.currentQuoteIndex]}"`;
  }
}

// Auto-rotate quotes every 30 seconds
setInterval(nextQuote, 30000);

// ============ TOAST ============
function showToast(message, tone = 'info') {
  toast.textContent = message;
  toast.className = `toast show ${tone}`;
  setTimeout(() => {
    toast.className = 'toast';
  }, 2500);
}

// ============ API HELPERS ============
function buildQuery() {
  const params = new URLSearchParams();
  params.set('search', state.filters.search);
  if (state.filters.category && state.filters.category !== 'liked') {
    params.set('category', state.filters.category);
  }
  if (state.filters.category === 'liked') {
    params.set('liked', 'true');
  }
  params.set('status', state.filters.status);
  params.set('priority', state.filters.priority);
  params.set('due', state.due);
  return params.toString();
}

async function loadTasks() {
  try {
    const response = await fetch(`/api/tasks?${buildQuery()}`);
    const data = await response.json();
    state.tasks = Array.isArray(data) ? data : [];

    const allResponse = await fetch('/api/tasks');
    const allData = await allResponse.json();
    state.allTasks = Array.isArray(allData) ? allData : [];

    render();
    updateProgress();
    await updateTodayBadge();
  } catch (error) {
    showToast('Failed to load tasks', 'error');
  }
}

function updateProgress() {
  const total = state.allTasks.length;
  const done = state.allTasks.filter(t => t.status === 'Done').length;
  const inProgress = state.allTasks.filter(t => t.status === 'In Progress').length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  // Animate stat updates
  animateValue(statTotal, total);
  animateValue(statDone, done);
  animateValue(statInProgress, inProgress);

  // Calculate streak (days with completed tasks)
  const streak = calculateStreak();
  if (statStreak) statStreak.textContent = streak;

  progressFill.style.width = `${percent}%`;
  progressText.textContent = `${percent}% complete`;
}

function animateValue(element, value) {
  if (!element) return;
  const current = parseInt(element.textContent) || 0;
  if (current !== value) {
    element.textContent = value;
    element.classList.add('updated');
    setTimeout(() => element.classList.remove('updated'), 500);
  }
}

function calculateStreak() {
  // Simple streak calculation based on consecutive days with completed tasks
  const completedDates = state.allTasks
    .filter(t => t.status === 'Done' && t.updated_at)
    .map(t => t.updated_at.slice(0, 10))
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort()
    .reverse();

  if (completedDates.length === 0) return 0;

  let streak = 0;
  const today = new Date().toISOString().slice(0, 10);
  let checkDate = new Date(today);

  for (let i = 0; i < completedDates.length && i < 365; i++) {
    const dateStr = checkDate.toISOString().slice(0, 10);
    if (completedDates.includes(dateStr)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (i === 0) {
      // If today has no completions, check yesterday
      checkDate.setDate(checkDate.getDate() - 1);
      if (completedDates.includes(checkDate.toISOString().slice(0, 10))) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    } else {
      break;
    }
  }

  return streak;
}

async function updateTodayBadge() {
  if (!todayBadge) return;
  try {
    const response = await fetch('/api/tasks?due=today');
    if (!response.ok) throw new Error('Failed');
    const data = await response.json();
    const count = (Array.isArray(data) ? data : []).filter(t => t.status !== 'Done').length;
    todayBadge.textContent = String(count);
    todayBadge.classList.toggle('hidden', count === 0);
  } catch (err) {
    todayBadge.classList.add('hidden');
  }
}

function isTypingTarget(target) {
  if (!target) return false;
  const tag = target.tagName;
  return target.isContentEditable || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
}

// ============ MODAL FORM ============
function openForm(task = null) {
  modalOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';

  if (task) {
    state.editingId = task.id;
    formTitle.textContent = 'Edit Task';
    titleInput.value = task.title || '';
    descriptionInput.value = task.description || '';
    categoryInput.value = task.category || categories[0];
    statusInput.value = task.status || statuses[0];
    priorityInput.value = task.priority || priorities[1];
    dueInput.value = task.due_date || '';
  } else {
    state.editingId = null;
    formTitle.textContent = 'New Task';
    taskForm.reset();
    categoryInput.value = categories[0];
    statusInput.value = statuses[0];
    priorityInput.value = priorities[1];
  }

  setTimeout(() => titleInput.focus(), 100);
}

function closeForm() {
  modalOverlay.classList.remove('show');
  document.body.style.overflow = '';
  state.editingId = null;
  taskForm.reset();
}

function updateTabButtons(attr, value) {
  document.querySelectorAll(`[data-${attr}]`).forEach(btn => {
    btn.classList.toggle('active', btn.dataset[attr] === value);
  });
}

// ============ TASK CRUD ============
async function saveTask(payload) {
  const isEdit = Boolean(state.editingId);
  const url = isEdit ? `/api/tasks/${state.editingId}` : '/api/tasks';
  const method = isEdit ? 'PUT' : 'POST';

  try {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.json();
      showToast(error.error || 'Save failed', 'error');
      return;
    }

    closeForm();
    await loadTasks();
    showToast(isEdit ? 'Task updated!' : 'Task created! You got this!', 'success');
  } catch (error) {
    showToast('Failed to save task', 'error');
  }
}

async function updateTask(id, updates) {
  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });

    if (!response.ok) {
      const error = await response.json();
      showToast(error.error || 'Update failed', 'error');
      return null;
    }

    return response.json();
  } catch (error) {
    showToast('Failed to update task', 'error');
    return null;
  }
}

async function deleteTask(id) {
  try {
    const response = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      const error = await response.json();
      showToast(error.error || 'Delete failed', 'error');
      return;
    }
    await loadTasks();
    showToast('Task deleted', 'success');
  } catch (error) {
    showToast('Failed to delete task', 'error');
  }
}

async function toggleLike(id) {
  try {
    const response = await fetch(`/api/tasks/${id}/like`, { method: 'POST' });
    if (!response.ok) throw new Error('Failed');
    const task = await response.json();
    await loadTasks();
    showToast(task.liked ? 'Added to favorites!' : 'Removed from favorites', 'success');
  } catch (error) {
    showToast('Failed to update favorite', 'error');
  }
}

// ============ SUBTASK CRUD ============
async function createSubtask(taskId, title) {
  try {
    const response = await fetch(`/api/tasks/${taskId}/subtasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    if (!response.ok) throw new Error('Failed');
    await loadTasks();
    showToast('Subtask added!', 'success');
  } catch (error) {
    showToast('Failed to add subtask', 'error');
  }
}

async function toggleSubtask(subtaskId, completed) {
  try {
    const response = await fetch(`/api/subtasks/${subtaskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })
    });
    if (!response.ok) throw new Error('Failed');
    await loadTasks();
    if (completed) {
      showToast('Great job! Subtask completed!', 'success');
    }
  } catch (error) {
    showToast('Failed to update subtask', 'error');
  }
}

async function deleteSubtask(subtaskId) {
  try {
    const response = await fetch(`/api/subtasks/${subtaskId}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed');
    await loadTasks();
  } catch (error) {
    showToast('Failed to delete subtask', 'error');
  }
}

// ============ HELPERS ============
function sortTasks(tasks) {
  const { key, dir } = state.sort;
  const factor = dir === 'asc' ? 1 : -1;

  return [...tasks].sort((a, b) => {
    const aVal = a[key] || '';
    const bVal = b[key] || '';

    if (key.includes('date') || key.includes('at')) {
      const aDate = aVal ? new Date(aVal).getTime() : 0;
      const bDate = bVal ? new Date(bVal).getTime() : 0;
      return (aDate - bDate) * factor;
    }

    return String(aVal).localeCompare(String(bVal)) * factor;
  });
}

function isToday(dateStr) {
  if (!dateStr) return false;
  const today = new Date().toISOString().slice(0, 10);
  return dateStr === today;
}

function isOverdue(dateStr) {
  if (!dateStr) return false;
  const today = new Date().toISOString().slice(0, 10);
  return dateStr < today;
}

// ============ UI COMPONENTS ============
function createTitleEditor(task) {
  const span = document.createElement('span');
  span.className = 'card-title';
  span.textContent = task.title;
  span.contentEditable = 'true';
  span.spellcheck = false;

  span.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      span.blur();
    }
    if (event.key === 'Escape') {
      span.textContent = task.title;
      span.blur();
    }
  });

  span.addEventListener('blur', async () => {
    const next = span.textContent.trim();
    if (!next) {
      span.textContent = task.title;
      return;
    }
    if (next === task.title) return;
    const updated = await updateTask(task.id, { title: next });
    if (updated) {
      task.title = updated.title;
      showToast('Title updated', 'success');
      await loadTasks();
    }
  });

  return span;
}

function createLikeButton(task) {
  const btn = document.createElement('button');
  btn.className = `like-btn ${task.liked ? 'liked' : ''}`;
  btn.innerHTML = task.liked ? '&#9829;' : '&#9825;';
  btn.title = task.liked ? 'Remove from favorites' : 'Add to favorites';
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleLike(task.id);
  });
  return btn;
}

function createPriorityBadge(priority) {
  const span = document.createElement('span');
  span.className = `card-priority ${priority.toLowerCase()}`;
  span.textContent = priority;
  return span;
}

function createMetaPill(text, tone, extraClass = '') {
  const span = document.createElement('span');
  span.className = `pill ${tone || ''} ${extraClass}`.trim();
  span.textContent = text;
  return span;
}

function createMoveSelect(task) {
  const select = document.createElement('select');
  select.className = 'move-select';
  statuses.forEach(status => {
    const option = document.createElement('option');
    option.value = status;
    option.textContent = status;
    if (status === task.status) option.selected = true;
    select.appendChild(option);
  });
  select.addEventListener('change', async (event) => {
    const newStatus = event.target.value;
    const wasNotDone = task.status !== 'Done';
    const updated = await updateTask(task.id, { status: newStatus });
    if (updated) {
      await loadTasks();
      if (newStatus === 'Done' && wasNotDone) {
        confetti.fire();
        showToast('Amazing! Task completed!', 'success');
      } else {
        showToast('Status updated', 'success');
      }
    }
  });
  return select;
}

function createSubtasksSection(task) {
  const section = document.createElement('div');
  section.className = 'subtasks-section';

  const subtasks = task.subtasks || [];
  const completedCount = subtasks.filter(s => s.completed).length;
  const totalCount = subtasks.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  // Header
  const header = document.createElement('div');
  header.className = 'subtasks-header';

  const title = document.createElement('span');
  title.className = 'subtasks-title';
  title.innerHTML = `Subtasks <span class="subtasks-count">${completedCount}/${totalCount}</span>`;

  const progress = document.createElement('div');
  progress.className = 'subtask-progress';
  const progressBar = document.createElement('div');
  progressBar.className = 'subtask-progress-fill';
  progressBar.style.width = `${progressPercent}%`;
  progress.appendChild(progressBar);

  header.appendChild(title);
  header.appendChild(progress);
  section.appendChild(header);

  // Subtasks list
  const list = document.createElement('div');
  list.className = 'subtasks-list';

  subtasks.forEach(subtask => {
    const item = document.createElement('div');
    item.className = 'subtask-item';

    const checkbox = document.createElement('div');
    checkbox.className = `subtask-checkbox ${subtask.completed ? 'checked' : ''}`;
    checkbox.addEventListener('click', () => toggleSubtask(subtask.id, !subtask.completed));

    const text = document.createElement('span');
    text.className = `subtask-text ${subtask.completed ? 'completed' : ''}`;
    text.textContent = subtask.title;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'subtask-delete';
    deleteBtn.innerHTML = '&times;';
    deleteBtn.addEventListener('click', () => deleteSubtask(subtask.id));

    item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(deleteBtn);
    list.appendChild(item);
  });

  section.appendChild(list);

  // Add subtask form
  const addForm = document.createElement('div');
  addForm.className = 'add-subtask';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Add a subtask...';
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const title = input.value.trim();
      if (title) {
        createSubtask(task.id, title);
        input.value = '';
      }
    }
  });

  const addBtn = document.createElement('button');
  addBtn.textContent = 'Add';
  addBtn.addEventListener('click', () => {
    const title = input.value.trim();
    if (title) {
      createSubtask(task.id, title);
      input.value = '';
    }
  });

  addForm.appendChild(input);
  addForm.appendChild(addBtn);
  section.appendChild(addForm);

  return section;
}

function createEmptyState(message = 'No tasks found', description = 'Create a new task to get started!') {
  const div = document.createElement('div');
  div.className = 'empty-state';
  div.innerHTML = `
    <div class="empty-icon">&#128218;</div>
    <div class="empty-title">${message}</div>
    <div class="empty-desc">${description}</div>
  `;
  return div;
}

// ============ KANBAN RENDER ============
function renderKanban(tasks) {
  viewContainer.innerHTML = '';
  const board = document.createElement('div');
  board.className = 'kanban-board';

  statuses.forEach(status => {
    const column = document.createElement('div');
    column.className = 'kanban-column';
    column.dataset.status = status;

    const columnHeader = document.createElement('div');
    columnHeader.className = 'column-header';
    const statusTasks = tasks.filter(t => t.status === status);
    const count = statusTasks.length;

    const h3 = document.createElement('h3');
    h3.textContent = status;

    const countSpan = document.createElement('span');
    countSpan.className = 'column-count';
    countSpan.textContent = count;

    columnHeader.appendChild(h3);
    columnHeader.appendChild(countSpan);

    const list = document.createElement('div');
    list.className = 'kanban-list';

    list.addEventListener('dragover', (event) => {
      event.preventDefault();
      column.classList.add('drag-over');
    });

    list.addEventListener('dragleave', () => {
      column.classList.remove('drag-over');
    });

    list.addEventListener('drop', async (event) => {
      event.preventDefault();
      column.classList.remove('drag-over');
      const id = Number(event.dataTransfer.getData('text/plain'));
      if (!id) return;

      const task = state.tasks.find(t => t.id === id);
      const wasNotDone = task && task.status !== 'Done';

      const updated = await updateTask(id, { status });
      if (updated) {
        await loadTasks();
        if (status === 'Done' && wasNotDone) {
          confetti.fire();
          showToast('Amazing! Task completed!', 'success');
        } else {
          showToast('Status updated', 'success');
        }
      }
    });

    column.appendChild(columnHeader);
    column.appendChild(list);
    board.appendChild(column);
  });

  // Render task cards
  tasks.forEach(task => {
    const list = board.querySelector(`[data-status="${task.status}"] .kanban-list`);
    if (!list) return;

    const card = document.createElement('div');
    card.className = `task-card ${task.liked ? 'liked-card' : ''}`;
    card.draggable = true;

    card.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', task.id);
      card.classList.add('dragging');
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
    });

    // Card header
    const header = document.createElement('div');
    header.className = 'card-header';
    header.appendChild(createTitleEditor(task));
    header.appendChild(createLikeButton(task));
    header.appendChild(createPriorityBadge(task.priority));

    // Description
    const desc = document.createElement('div');
    desc.className = 'card-desc';
    desc.textContent = task.description || '';

    // Meta pills
    const meta = document.createElement('div');
    meta.className = 'card-meta';
    meta.appendChild(createMetaPill(task.category, 'tone-category'));

    if (task.due_date) {
      const dueClass = isOverdue(task.due_date) && task.status !== 'Done' ? 'tone-due' :
                       isToday(task.due_date) ? 'tone-due today' : '';
      const dueText = isToday(task.due_date) ? 'Due Today!' : `Due ${task.due_date}`;
      meta.appendChild(createMetaPill(dueText, dueClass));
    }

    // Subtasks section
    const subtasksSection = createSubtasksSection(task);

    // Actions
    const actions = document.createElement('div');
    actions.className = 'card-actions';

    if (task.status !== 'Done') {
      const doneBtn = document.createElement('button');
      doneBtn.className = 'ghost success';
      doneBtn.textContent = 'Complete';
      doneBtn.addEventListener('click', async () => {
        const updated = await updateTask(task.id, { status: 'Done' });
        if (updated) {
          confetti.fire();
          await loadTasks();
          showToast('Amazing! Task completed!', 'success');
        }
      });
      actions.appendChild(doneBtn);
    }

    const editBtn = document.createElement('button');
    editBtn.className = 'ghost';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => openForm(task));

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'ghost danger';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      if (confirm('Delete this task?')) deleteTask(task.id);
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    const moveSelect = createMoveSelect(task);

    card.appendChild(header);
    if (task.description) card.appendChild(desc);
    card.appendChild(meta);
    card.appendChild(subtasksSection);
    card.appendChild(moveSelect);
    card.appendChild(actions);
    list.appendChild(card);
  });

  viewContainer.appendChild(board);

  if (tasks.length === 0) {
    viewContainer.innerHTML = '';
    viewContainer.appendChild(createEmptyState(
      state.filters.category === 'liked' ? 'No favorites yet' : 'No tasks found',
      state.filters.category === 'liked' ? 'Click the heart icon on tasks you want to prioritize!' : 'Press N to create a new task and start crushing it!'
    ));
  }
}

// ============ TABLE RENDER ============
function renderTable(tasks) {
  viewContainer.innerHTML = '';

  if (tasks.length === 0) {
    viewContainer.appendChild(createEmptyState());
    return;
  }

  const table = document.createElement('table');
  table.className = 'task-table';

  const headerRow = document.createElement('tr');
  const columns = [
    { key: 'liked', label: '' },
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    { key: 'status', label: 'Status' },
    { key: 'priority', label: 'Priority' },
    { key: 'due_date', label: 'Due' },
    { key: 'updated_at', label: 'Updated' }
  ];

  columns.forEach(col => {
    const th = document.createElement('th');
    th.textContent = col.label;
    th.dataset.key = col.key;
    if (col.key !== 'liked') {
      th.addEventListener('click', () => {
        if (state.sort.key === col.key) {
          state.sort.dir = state.sort.dir === 'asc' ? 'desc' : 'asc';
        } else {
          state.sort.key = col.key;
          state.sort.dir = 'asc';
        }
        render();
      });
      if (state.sort.key === col.key) {
        th.classList.add('sorted');
        th.dataset.dir = state.sort.dir === 'asc' ? '↑' : '↓';
      }
    }
    headerRow.appendChild(th);
  });

  const thActions = document.createElement('th');
  thActions.textContent = 'Actions';
  headerRow.appendChild(thActions);

  const thead = document.createElement('thead');
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  sortTasks(tasks).forEach(task => {
    const row = document.createElement('tr');

    // Like cell
    const likeCell = document.createElement('td');
    likeCell.appendChild(createLikeButton(task));
    row.appendChild(likeCell);

    const titleCell = document.createElement('td');
    titleCell.appendChild(createTitleEditor(task));
    row.appendChild(titleCell);

    const categoryCell = document.createElement('td');
    categoryCell.textContent = task.category || '';
    row.appendChild(categoryCell);

    const statusCell = document.createElement('td');
    statusCell.textContent = task.status || '';
    row.appendChild(statusCell);

    const priorityCell = document.createElement('td');
    priorityCell.appendChild(createPriorityBadge(task.priority));
    row.appendChild(priorityCell);

    const dueCell = document.createElement('td');
    if (task.due_date) {
      if (isToday(task.due_date)) {
        dueCell.innerHTML = '<span style="color: var(--warning)">Today!</span>';
      } else if (isOverdue(task.due_date) && task.status !== 'Done') {
        dueCell.innerHTML = `<span style="color: var(--danger)">${task.due_date}</span>`;
      } else {
        dueCell.textContent = task.due_date;
      }
    } else {
      dueCell.textContent = '-';
    }
    row.appendChild(dueCell);

    const updatedCell = document.createElement('td');
    updatedCell.textContent = task.updated_at ? task.updated_at.slice(0, 10) : '-';
    row.appendChild(updatedCell);

    const actionsCell = document.createElement('td');
    actionsCell.className = 'table-actions';

    if (task.status !== 'Done') {
      const doneBtn = document.createElement('button');
      doneBtn.className = 'ghost success';
      doneBtn.textContent = 'Done';
      doneBtn.addEventListener('click', async () => {
        const updated = await updateTask(task.id, { status: 'Done' });
        if (updated) {
          confetti.fire();
          await loadTasks();
          showToast('Amazing! Task completed!', 'success');
        }
      });
      actionsCell.appendChild(doneBtn);
    }

    const editBtn = document.createElement('button');
    editBtn.className = 'ghost';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => openForm(task));

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'ghost danger';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      if (confirm('Delete this task?')) deleteTask(task.id);
    });

    actionsCell.appendChild(editBtn);
    actionsCell.appendChild(deleteBtn);

    row.appendChild(actionsCell);
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  viewContainer.appendChild(table);
}

// ============ MAIN RENDER ============
function render() {
  const tasks = state.tasks;
  if (state.view === 'kanban') {
    renderKanban(tasks);
  } else {
    renderTable(tasks);
  }
}

// ============ EVENT WIRING ============
function wireEvents() {
  // Quote button
  if (nextQuoteBtn) {
    nextQuoteBtn.addEventListener('click', nextQuote);
  }

  // Search with debounce
  let searchTimeout;
  searchInput.addEventListener('input', (event) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      state.filters.search = event.target.value;
      loadTasks();
    }, 300);
  });

  // Filter dropdowns
  filterCategory.addEventListener('change', (event) => {
    state.filters.category = event.target.value;
    loadTasks();
  });

  filterStatus.addEventListener('change', (event) => {
    state.filters.status = event.target.value;
    loadTasks();
  });

  filterPriority.addEventListener('change', (event) => {
    state.filters.priority = event.target.value;
    loadTasks();
  });

  // Sidebar navigation
  const researchTimeline = document.getElementById('researchTimeline');
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
      item.classList.add('active');
      state.filters.category = item.dataset.category || '';
      if (state.filters.category !== 'liked') {
        filterCategory.value = state.filters.category;
      } else {
        filterCategory.value = '';
      }
      // Show/hide research timeline
      if (researchTimeline) {
        if (state.filters.category === 'Research') {
          researchTimeline.classList.remove('hidden');
        } else {
          researchTimeline.classList.add('hidden');
        }
      }
      loadTasks();
    });
  });

  // View tabs
  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.view = btn.dataset.view;
      updateTabButtons('view', state.view);
      render();
    });
  });

  // Due date tabs
  document.querySelectorAll('[data-due]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.due = btn.dataset.due;
      updateTabButtons('due', state.due);
      loadTasks();
    });
  });

  // New task button
  newTaskBtn.addEventListener('click', () => openForm());

  // Cancel button
  cancelEdit.addEventListener('click', closeForm);

  // Click outside modal to close
  modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
      closeForm();
    }
  });

  // Form submission
  taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const payload = {
      title: titleInput.value.trim(),
      description: descriptionInput.value.trim(),
      category: categoryInput.value,
      status: statusInput.value,
      priority: priorityInput.value,
      due_date: dueInput.value || null
    };
    saveTask(payload);
  });

  // Export
  exportBtn.addEventListener('click', async () => {
    try {
      const response = await fetch('/api/export', { method: 'POST' });
      if (!response.ok) {
        showToast('Export failed', 'error');
        return;
      }
      const data = await response.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `y4s2-backup-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
      showToast('Exported successfully', 'success');
    } catch (error) {
      showToast('Export failed', 'error');
    }
  });

  // Import
  importBtn.addEventListener('click', () => importFile.click());

  importFile.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const payload = JSON.parse(text);
      const response = await fetch('/api/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        showToast('Import failed', 'error');
        return;
      }
      await loadTasks();
      showToast('Import complete', 'success');
    } catch (error) {
      showToast('Invalid JSON file', 'error');
    } finally {
      importFile.value = '';
    }
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (event) => {
    // N to create new task
    if (event.key.toLowerCase() === 'n') {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (isTypingTarget(event.target)) return;
      if (modalOverlay.classList.contains('show')) return;
      event.preventDefault();
      openForm();
    }

    // Escape to close modal
    if (event.key === 'Escape') {
      if (modalOverlay.classList.contains('show')) {
        closeForm();
      }
    }
  });
}

// ============ MODULE NAVIGATION ============
function switchModule(module) {
  state.activeModule = module;

  // Hide all containers
  viewContainer.classList.add('hidden');
  calendarContainer.classList.add('hidden');
  physicalContainer.classList.add('hidden');
  plantContainer.classList.add('hidden');
  if (nofapContainer) nofapContainer.classList.add('hidden');
  if (galaxyContainer) galaxyContainer.classList.add('hidden');

  // Hide task-specific UI when on other modules
  const taskUI = document.querySelector('.topbar');
  const progressUI = document.querySelector('.progress-section');
  const toolbarUI = document.querySelector('.toolbar');
  const quoteUI = document.querySelector('.quote-section');

  const researchTl = document.getElementById('researchTimeline');

  if (module === 'tasks') {
    viewContainer.classList.remove('hidden');
    taskUI.style.display = '';
    progressUI.style.display = '';
    toolbarUI.style.display = '';
    quoteUI.style.display = '';
    // Show research timeline if Research category is active
    if (researchTl) {
      if (state.filters.category === 'Research') {
        researchTl.classList.remove('hidden');
      } else {
        researchTl.classList.add('hidden');
      }
    }
    loadTasks();
  } else {
    taskUI.style.display = 'none';
    progressUI.style.display = 'none';
    toolbarUI.style.display = 'none';
    quoteUI.style.display = 'none';
    if (researchTl) researchTl.classList.add('hidden');

    if (module === 'calendar') {
      calendarContainer.classList.remove('hidden');
      loadCalendar();
    } else if (module === 'physical') {
      physicalContainer.classList.remove('hidden');
      loadPhysicalLogs();
    } else if (module === 'plant') {
      plantContainer.classList.remove('hidden');
      loadPlantStatus();
    } else if (module === 'nofap') {
      nofapContainer.classList.remove('hidden');
      loadNoFapStatus();
    }
    // Galaxy is handled by the override at the bottom of the file
  }

  // Update nav active states
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.module === module) {
      item.classList.add('active');
    }
  });
}

// ============ PHYSICAL MODULE ============
async function loadPhysicalLogs() {
  try {
    const response = await fetch('/api/physical');
    const data = await response.json();
    state.physicalLogs = Array.isArray(data) ? data : [];
    renderPhysicalView();
    updatePhysicalStats();
  } catch (error) {
    showToast('Failed to load exercise logs', 'error');
  }
}

function renderPhysicalView() {
  if (!physicalList) return;

  if (state.physicalLogs.length === 0) {
    physicalList.innerHTML = `
      <div class="physical-empty">
        <div class="physical-empty-icon">&#127939;</div>
        <p>No exercise logged yet</p>
        <p>Click "+ Log Exercise" to get started!</p>
      </div>
    `;
    return;
  }

  physicalList.innerHTML = state.physicalLogs.map(log => `
    <div class="physical-card" data-id="${log.id}">
      <div class="physical-card-info">
        <div class="physical-icon">${exerciseIcons[log.exercise_type] || exerciseIcons.Other}</div>
        <div class="physical-details">
          <h4>${log.exercise_type}</h4>
          <p>${log.notes || 'No notes'}</p>
        </div>
      </div>
      <div class="physical-meta">
        <span class="physical-duration">${log.duration_minutes} min</span>
        <span class="physical-date">${formatDate(log.log_date)}</span>
        <div class="physical-actions">
          <button class="ghost edit-physical" data-id="${log.id}">Edit</button>
          <button class="ghost delete-physical" data-id="${log.id}">Delete</button>
        </div>
      </div>
    </div>
  `).join('');

  // Wire up edit/delete buttons
  physicalList.querySelectorAll('.edit-physical').forEach(btn => {
    btn.addEventListener('click', () => {
      const log = state.physicalLogs.find(l => l.id === Number(btn.dataset.id));
      if (log) openPhysicalForm(log);
    });
  });

  physicalList.querySelectorAll('.delete-physical').forEach(btn => {
    btn.addEventListener('click', () => deletePhysicalLog(Number(btn.dataset.id)));
  });
}

function updatePhysicalStats() {
  if (!physicalStreakEl) return;

  const today = new Date().toISOString().slice(0, 10);
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const weekLogs = state.physicalLogs.filter(l => l.log_date >= weekAgo);
  const monthLogs = state.physicalLogs.filter(l => l.log_date >= monthAgo);

  const weekMinutes = weekLogs.reduce((sum, l) => sum + l.duration_minutes, 0);
  const monthMinutes = monthLogs.reduce((sum, l) => sum + l.duration_minutes, 0);

  // Calculate streak
  const uniqueDates = [...new Set(state.physicalLogs.map(l => l.log_date))].sort().reverse();
  let streak = 0;
  let checkDate = new Date(today);

  for (let i = 0; i < 365; i++) {
    const dateStr = checkDate.toISOString().slice(0, 10);
    if (uniqueDates.includes(dateStr)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (i === 0) {
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  physicalStreakEl.textContent = streak;
  physicalWeekEl.textContent = weekMinutes;
  physicalMonthEl.textContent = monthMinutes;
}

function openPhysicalForm(log = null) {
  physicalModalOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';

  if (log) {
    state.editingPhysicalId = log.id;
    document.getElementById('physicalFormTitle').textContent = 'Edit Exercise';
    exerciseTypeInput.value = log.exercise_type;
    durationInput.value = log.duration_minutes;
    logDateInput.value = log.log_date;
    physicalNotesInput.value = log.notes || '';
  } else {
    state.editingPhysicalId = null;
    document.getElementById('physicalFormTitle').textContent = 'Log Exercise';
    physicalForm.reset();
    logDateInput.value = new Date().toISOString().slice(0, 10);
  }

  setTimeout(() => durationInput.focus(), 100);
}

function closePhysicalForm() {
  physicalModalOverlay.classList.remove('show');
  document.body.style.overflow = '';
  state.editingPhysicalId = null;
  physicalForm.reset();
}

async function savePhysicalLog(payload) {
  const isEdit = state.editingPhysicalId !== null;
  const url = isEdit ? `/api/physical/${state.editingPhysicalId}` : '/api/physical';
  const method = isEdit ? 'PUT' : 'POST';

  try {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const err = await response.json();
      showToast(err.error || 'Failed to save', 'error');
      return;
    }

    closePhysicalForm();
    await loadPhysicalLogs();
    showToast(isEdit ? 'Exercise updated' : 'Exercise logged! Keep it up!', 'success');

    if (!isEdit) {
      // Show points popup and trigger water animation
      showPointsPopup(Math.floor(payload.duration_minutes / 5));
      triggerWaterAnimation();
    }
  } catch (error) {
    showToast('Failed to save exercise', 'error');
  }
}

async function deletePhysicalLog(id) {
  if (!confirm('Delete this exercise log?')) return;

  try {
    const response = await fetch(`/api/physical/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      showToast('Failed to delete', 'error');
      return;
    }
    await loadPhysicalLogs();
    showToast('Exercise deleted', 'success');
  } catch (error) {
    showToast('Failed to delete', 'error');
  }
}

// ============ STUDY SESSIONS MODULE ============
function openStudyForm(session = null) {
  studyModalOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';

  if (session) {
    state.editingStudyId = session.id;
    document.getElementById('studyFormTitle').textContent = 'Edit Study Session';
    studyCategoryInput.value = session.category || '';
    studyDurationInput.value = session.duration_minutes;
    sessionDateInput.value = session.session_date;
    studyNotesInput.value = session.notes || '';
  } else {
    state.editingStudyId = null;
    document.getElementById('studyFormTitle').textContent = 'Log Study Session';
    studyForm.reset();
    sessionDateInput.value = new Date().toISOString().slice(0, 10);
  }

  setTimeout(() => studyDurationInput.focus(), 100);
}

function closeStudyForm() {
  studyModalOverlay.classList.remove('show');
  document.body.style.overflow = '';
  state.editingStudyId = null;
  studyForm.reset();
}

async function saveStudySession(payload) {
  const isEdit = state.editingStudyId !== null;
  const url = isEdit ? `/api/study-sessions/${state.editingStudyId}` : '/api/study-sessions';
  const method = isEdit ? 'PUT' : 'POST';

  try {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const err = await response.json();
      showToast(err.error || 'Failed to save', 'error');
      return;
    }

    closeStudyForm();
    showToast(isEdit ? 'Session updated' : 'Study session logged!', 'success');

    if (!isEdit) {
      showPointsPopup(Math.floor(payload.duration_minutes / 10));
      triggerWaterAnimation();
    }
  } catch (error) {
    showToast('Failed to save session', 'error');
  }
}

// ============ CALENDAR MODULE ============
async function loadCalendar() {
  try {
    const response = await fetch(`/api/calendar?year=${state.calendarYear}&month=${state.calendarMonth}`);
    const data = await response.json();
    state.calendarData = data;
    renderCalendar();
  } catch (error) {
    showToast('Failed to load calendar', 'error');
  }
}

function renderCalendar() {
  if (!calendarGrid || !state.calendarData) return;

  const { holidays, studyDays, exerciseDays } = state.calendarData;
  const year = state.calendarYear;
  const month = state.calendarMonth;

  // Update title
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  calendarTitle.textContent = `${monthNames[month - 1]} ${year}`;

  // Get first day of month and total days
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);

  // Create maps for quick lookup
  const holidayMap = {};
  holidays.forEach(h => { holidayMap[h.day] = h; });
  const studyMap = {};
  studyDays.forEach(d => { studyMap[d.day] = d.count; });
  const exerciseMap = {};
  exerciseDays.forEach(d => { exerciseMap[d.day] = d.count; });

  // Build calendar HTML
  let html = '';

  // Day headers
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dayNames.forEach(d => {
    html += `<div class="calendar-day-header">${d}</div>`;
  });

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    html += `<div class="calendar-day empty"></div>`;
  }

  // Days of month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isToday = dateStr === todayStr;
    const holiday = holidayMap[day];
    const studyCount = studyMap[day] || 0;
    const exerciseCount = exerciseMap[day] || 0;

    let classes = 'calendar-day';
    if (isToday) classes += ' today';
    if (holiday) classes += ' holiday';

    let tooltip = '';
    if (holiday) tooltip = holiday.name;
    if (studyCount) tooltip += (tooltip ? ' | ' : '') + `${studyCount} study`;
    if (exerciseCount) tooltip += (tooltip ? ' | ' : '') + `${exerciseCount} exercise`;

    html += `
      <div class="${classes}">
        <span class="calendar-day-number">${day}</span>
        <div class="calendar-dots">
          ${studyCount ? '<span class="calendar-dot study"></span>' : ''}
          ${exerciseCount ? '<span class="calendar-dot exercise"></span>' : ''}
        </div>
        ${tooltip ? `<div class="calendar-day-tooltip">${tooltip}</div>` : ''}
      </div>
    `;
  }

  calendarGrid.innerHTML = html;
}

function navigateMonth(delta) {
  state.calendarMonth += delta;

  if (state.calendarMonth > 12) {
    state.calendarMonth = 1;
    state.calendarYear++;
  } else if (state.calendarMonth < 1) {
    state.calendarMonth = 12;
    state.calendarYear--;
  }

  loadCalendar();
}

// ============ PLANT MODULE ============
async function loadPlantStatus() {
  try {
    const response = await fetch('/api/plant');
    const data = await response.json();
    state.plantStatus = data;
    renderPlant();
  } catch (error) {
    showToast('Failed to load plant status', 'error');
  }
}

function renderPlant() {
  if (!plantSvg || !state.plantStatus) return;

  const { totalPoints, currentLevel, levelName, pointsToNextLevel, progressPercent, todayPoints, weekPoints, streak } = state.plantStatus;

  // Update SVG
  plantSvg.innerHTML = plantSVGs[currentLevel] || plantSVGs[0];

  // Update level display
  plantLevel.textContent = levelName;

  // Update progress
  plantProgressFill.style.width = `${progressPercent}%`;
  const nextLevelPoints = [30, 80, 150, 250, 400, Infinity][currentLevel + 1] || 'Max';
  plantProgressText.textContent = `${totalPoints} / ${nextLevelPoints === Infinity ? 'MAX' : nextLevelPoints} pts`;

  // Update stats
  plantTotalPoints.textContent = totalPoints;
  plantTodayPoints.textContent = todayPoints;
  plantWeekPoints.textContent = weekPoints;
  plantStreak.textContent = streak;

  // Update display level class
  plantDisplay.className = 'plant-display level-' + currentLevel;
}

function triggerWaterAnimation() {
  if (!plantWater) return;
  plantWater.classList.add('animating');
  setTimeout(() => plantWater.classList.remove('animating'), 1000);
}

function showPointsPopup(points) {
  if (points <= 0) return;

  const popup = document.createElement('div');
  popup.className = 'points-toast';
  popup.textContent = `+${points}`;
  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 1000);
}

async function loadPlantHistory() {
  try {
    const response = await fetch('/api/plant/history?days=14');
    const data = await response.json();
    renderPlantHistory(data);
  } catch (error) {
    showToast('Failed to load history', 'error');
  }
}

function renderPlantHistory(history) {
  if (!historyContent) return;

  if (history.length === 0) {
    historyContent.innerHTML = '<p style="text-align:center;color:var(--text-secondary);">No activity recorded yet</p>';
    return;
  }

  const sourceLabels = {
    task_done: 'Tasks',
    subtask_done: 'Subtasks',
    physical: 'Exercise',
    study_session: 'Study',
    streak_bonus: 'Streak'
  };

  historyContent.innerHTML = history.map(day => `
    <div class="history-day">
      <div>
        <div class="history-date">${formatDate(day.date)}</div>
        <div class="history-sources">
          ${Object.entries(day.sources).map(([type, pts]) =>
            `<span class="history-source ${type}">${sourceLabels[type] || type}: +${pts}</span>`
          ).join('')}
        </div>
      </div>
      <span class="history-points">+${day.points}</span>
    </div>
  `).join('');
}

function openHistoryModal() {
  historyModalOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';
  loadPlantHistory();
}

function closeHistoryModal() {
  historyModalOverlay.classList.remove('show');
  document.body.style.overflow = '';
}

// ============ HELPERS ============
function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

// ============ INITIALIZE ============
showQuote();
wireEvents();
wireNewModuleEvents();
loadTasks();

// Wire new module events
function wireNewModuleEvents() {
  // Module navigation
  document.querySelectorAll('.module-nav').forEach(btn => {
    btn.addEventListener('click', () => {
      switchModule(btn.dataset.module);
    });
  });

  // Return to tasks when clicking task categories
  document.querySelectorAll('.nav-item[data-category]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (state.activeModule !== 'tasks') {
        switchModule('tasks');
      }
    });
  });

  // Physical form
  if (newPhysicalBtn) {
    newPhysicalBtn.addEventListener('click', () => openPhysicalForm());
  }

  if (cancelPhysical) {
    cancelPhysical.addEventListener('click', closePhysicalForm);
  }

  if (physicalModalOverlay) {
    physicalModalOverlay.addEventListener('click', (e) => {
      if (e.target === physicalModalOverlay) closePhysicalForm();
    });
  }

  if (physicalForm) {
    physicalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      savePhysicalLog({
        exercise_type: exerciseTypeInput.value,
        duration_minutes: parseInt(durationInput.value, 10),
        log_date: logDateInput.value,
        notes: physicalNotesInput.value
      });
    });
  }

  // Study session form
  if (cancelStudy) {
    cancelStudy.addEventListener('click', closeStudyForm);
  }

  if (studyModalOverlay) {
    studyModalOverlay.addEventListener('click', (e) => {
      if (e.target === studyModalOverlay) closeStudyForm();
    });
  }

  if (studyForm) {
    studyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      saveStudySession({
        category: studyCategoryInput.value || null,
        duration_minutes: parseInt(studyDurationInput.value, 10),
        session_date: sessionDateInput.value,
        notes: studyNotesInput.value
      });
    });
  }

  // Calendar navigation
  if (calendarPrev) {
    calendarPrev.addEventListener('click', () => navigateMonth(-1));
  }

  if (calendarNext) {
    calendarNext.addEventListener('click', () => navigateMonth(1));
  }

  // Plant history
  if (viewHistoryBtn) {
    viewHistoryBtn.addEventListener('click', openHistoryModal);
  }

  if (closeHistory) {
    closeHistory.addEventListener('click', closeHistoryModal);
  }

  if (historyModalOverlay) {
    historyModalOverlay.addEventListener('click', (e) => {
      if (e.target === historyModalOverlay) closeHistoryModal();
    });
  }

  // Close modals on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (physicalModalOverlay && physicalModalOverlay.classList.contains('show')) {
        closePhysicalForm();
      }
      if (studyModalOverlay && studyModalOverlay.classList.contains('show')) {
        closeStudyForm();
      }
      if (historyModalOverlay && historyModalOverlay.classList.contains('show')) {
        closeHistoryModal();
      }
    }
  });
}

// ============ PWA & NOTIFICATIONS ============

// Register service worker
async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service Worker registered:', registration.scope);
      return registration;
    } catch (error) {
      console.log('Service Worker registration failed:', error);
      return null;
    }
  }
  return null;
}

// Request notification permission
async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

// Show browser notification
function showNotification(title, options = {}) {
  if (Notification.permission === 'granted') {
    const notification = new Notification(title, {
      icon: '/manifest.json',
      badge: '/manifest.json',
      ...options
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    return notification;
  }
  return null;
}

// Check for due reminders
async function checkDueReminders() {
  try {
    const response = await fetch('/api/reminders/due');
    if (!response.ok) return;

    const reminders = await response.json();
    for (const reminder of reminders) {
      showNotification('Y4S2 Reminder', {
        body: reminder.message,
        tag: `reminder-${reminder.id}`
      });

      // Mark as sent
      await fetch(`/api/reminders/${reminder.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sent: 1 })
      });
    }
  } catch (error) {
    console.log('Failed to check reminders:', error);
  }
}

// Check for tasks due today on load
async function checkTasksDueToday() {
  try {
    const response = await fetch('/api/tasks?due=today');
    if (!response.ok) return;

    const tasks = await response.json();
    const dueTasks = tasks.filter(t => t.status !== 'Done');

    if (dueTasks.length > 0) {
      // Update badge
      const todayBadge = document.getElementById('todayBadge');
      if (todayBadge) {
        todayBadge.textContent = dueTasks.length;
        todayBadge.classList.remove('hidden');
      }

      // Show notification if permission granted
      if (Notification.permission === 'granted') {
        showNotification('Tasks Due Today', {
          body: `You have ${dueTasks.length} task${dueTasks.length > 1 ? 's' : ''} due today!`,
          tag: 'tasks-due-today'
        });
      }
    }
  } catch (error) {
    console.log('Failed to check due tasks:', error);
  }
}

// Initialize PWA features
async function initPWA() {
  await registerServiceWorker();

  // Request notification permission after user interaction
  document.body.addEventListener('click', async function requestOnce() {
    await requestNotificationPermission();
    document.body.removeEventListener('click', requestOnce);
  }, { once: true });

  // Check due tasks on load
  checkTasksDueToday();

  // Check reminders every minute
  setInterval(checkDueReminders, 60000);

  // Initial reminder check
  setTimeout(checkDueReminders, 5000);
}

// Start PWA initialization
initPWA();

// ============ NOFAP / ACCOUNTABILITY MODULE ============

const URGE_TIMER_DURATION = 600; // 10 minutes in seconds
const URGE_CIRCLE_CIRCUMFERENCE = 2 * Math.PI * 54; // radius 54 from SVG

const urgeMotivations = [
  "You are stronger than your urges. This moment will pass.",
  "Every second you resist makes you stronger.",
  "Your future self will thank you for this fight.",
  "Discipline is choosing between what you want NOW and what you want MOST.",
  "The pain of discipline weighs ounces. The pain of regret weighs tons.",
  "You didn't come this far to only come this far.",
  "Control your mind or it will control you.",
  "A river cuts through rock not because of power but persistence.",
  "Fall seven times, stand up eight.",
  "Real strength is when you hold it together when everyone expects you to fall apart.",
  "Break the cycle. Build a new pattern.",
  "You are not your habits. You are the one who can change them.",
  "10 minutes. Just survive 10 minutes. The urge will fade.",
  "Think about why you started this journey.",
  "Every urge resisted is a victory won."
];

async function loadNoFapStatus() {
  try {
    const response = await fetch('/api/nofap/status');
    const data = await response.json();
    state.nofapStatus = data;
    renderNoFapStatus();
    loadNoFapHistory();
  } catch (error) {
    console.error('Failed to load accountability status:', error);
    showToast('Failed to load status', 'error');
  }
}

function renderNoFapStatus() {
  const s = state.nofapStatus;
  if (!s) return;

  if (nofapStreakNumber) nofapStreakNumber.textContent = s.currentStreak;
  if (nofapBestStreak) nofapBestStreak.textContent = s.bestStreak;
  if (nofapUrgesResisted) nofapUrgesResisted.textContent = s.urgesResisted;
  if (nofapTotalRelapses) nofapTotalRelapses.textContent = s.totalRelapses;
  if (nofapMotivation) nofapMotivation.textContent = s.motivation;

  if (nofapCheckinStatus) {
    nofapCheckinStatus.textContent = s.checkedInToday ? 'Done' : 'Pending';
    nofapCheckinStatus.className = 'nf-qs-val ' + (s.checkedInToday ? 'checkin-done' : 'checkin-pending');
  }

  if (nofapCheckinBtn) {
    const titleEl = nofapCheckinBtn.querySelector('.nf-action-title');
    const descEl = nofapCheckinBtn.querySelector('.nf-action-desc');
    if (s.checkedInToday) {
      if (titleEl) titleEl.textContent = 'Checked In';
      if (descEl) descEl.textContent = 'You\'re good for today!';
      nofapCheckinBtn.disabled = true;
      nofapCheckinBtn.classList.add('btn-disabled');
    } else {
      if (titleEl) titleEl.textContent = 'Daily Check-in';
      if (descEl) descEl.textContent = 'Confirm you stayed clean today';
      nofapCheckinBtn.disabled = false;
      nofapCheckinBtn.classList.remove('btn-disabled');
    }
  }

  // Animate streak number
  if (nofapStreakNumber && s.currentStreak > 0) {
    nofapStreakNumber.classList.add('streak-glow');
  }
}

async function loadNoFapHistory() {
  try {
    const response = await fetch('/api/nofap/history?days=30');
    const data = await response.json();
    state.nofapHistory = data;
    renderNoFapHistory();
  } catch (error) {
    console.error('Failed to load history:', error);
  }
}

function renderNoFapHistory() {
  if (!nofapHistoryList || !state.nofapHistory) return;

  const { logs, urges } = state.nofapHistory;

  // Combine and sort by date
  const events = [];
  for (const log of logs) {
    events.push({
      type: log.type,
      date: log.created_at,
      notes: log.notes,
      icon: log.type === 'relapse' ? '&#10060;' : '&#9989;',
      label: log.type === 'relapse' ? 'Relapse' : 'Check-in'
    });
  }
  for (const urge of urges) {
    events.push({
      type: 'urge',
      date: urge.created_at,
      notes: urge.notes,
      intensity: urge.intensity,
      resisted: urge.resisted,
      icon: urge.resisted ? '&#128170;' : '&#9888;',
      label: urge.resisted ? `Urge Resisted (${urge.intensity}/10)` : `Urge (${urge.intensity}/10)`
    });
  }

  events.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (events.length === 0) {
    nofapHistoryList.innerHTML = '<p class="empty-history">No activity yet. Start your journey with a daily check-in!</p>';
    return;
  }

  nofapHistoryList.innerHTML = events.slice(0, 20).map(event => {
    const date = new Date(event.date);
    const timeStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
      ' ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const typeClass = event.type === 'relapse' ? 'history-relapse' : event.type === 'urge' ? 'history-urge' : 'history-checkin';
    return `
      <div class="nofap-history-item ${typeClass}">
        <span class="history-icon">${event.icon}</span>
        <div class="history-details">
          <span class="history-label">${event.label}</span>
          ${event.notes ? `<span class="history-notes">${event.notes}</span>` : ''}
        </div>
        <span class="history-time">${timeStr}</span>
      </div>
    `;
  }).join('');
}

async function doNoFapCheckin() {
  try {
    const response = await fetch('/api/nofap/checkin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes: '' })
    });
    const data = await response.json();
    if (data.already_checked) {
      showToast('Already checked in today!', 'info');
    } else {
      showToast('Check-in complete! +2 points', 'success');
      if (confetti) confetti.fire();
    }
    state.nofapStatus = data.status;
    renderNoFapStatus();
    loadNoFapHistory();
  } catch (error) {
    console.error('Check-in failed:', error);
    showToast('Check-in failed', 'error');
  }
}

async function doNoFapRelapse() {
  if (!confirm('Are you sure you want to log a relapse? Your streak will reset. Remember: falling is not failing. Getting back up is what matters.')) {
    return;
  }
  try {
    const response = await fetch('/api/nofap/relapse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes: '' })
    });
    const data = await response.json();
    showToast('Logged. Your streak resets but YOU don\'t. Get back up.', 'info');
    state.nofapStatus = data.status;
    renderNoFapStatus();
    loadNoFapHistory();
  } catch (error) {
    console.error('Failed to log:', error);
    showToast('Failed to log', 'error');
  }
}

function startUrgeTimer() {
  if (state.urgeTimerRunning) return;

  state.urgeTimerSeconds = URGE_TIMER_DURATION;
  state.urgeTimerRunning = true;
  nofapUrgeTimer.classList.remove('hidden');

  // Set initial circle state
  if (urgeTimerProgress) {
    urgeTimerProgress.style.strokeDasharray = URGE_CIRCLE_CIRCUMFERENCE;
    urgeTimerProgress.style.strokeDashoffset = '0';
  }

  updateUrgeTimerDisplay();
  rotateUrgeMotivation();

  state.urgeTimerInterval = setInterval(() => {
    state.urgeTimerSeconds--;
    updateUrgeTimerDisplay();

    // Rotate motivation every 30 seconds
    if (state.urgeTimerSeconds % 30 === 0) {
      rotateUrgeMotivation();
    }

    if (state.urgeTimerSeconds <= 0) {
      endUrgeTimer(true);
    }
  }, 1000);

  // Also trigger a notification
  showNotification('Stay Strong!', {
    body: 'You started the urge timer. Hold on for 10 minutes!',
    tag: 'urge-timer-start'
  });
}

function updateUrgeTimerDisplay() {
  const mins = Math.floor(state.urgeTimerSeconds / 60);
  const secs = state.urgeTimerSeconds % 60;
  if (urgeTimerText) {
    urgeTimerText.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Update circle progress
  if (urgeTimerProgress) {
    const progress = 1 - (state.urgeTimerSeconds / URGE_TIMER_DURATION);
    const offset = URGE_CIRCLE_CIRCUMFERENCE * (1 - progress);
    urgeTimerProgress.style.strokeDashoffset = offset;
  }
}

function rotateUrgeMotivation() {
  if (urgeTimerMotivation) {
    const msg = urgeMotivations[Math.floor(Math.random() * urgeMotivations.length)];
    urgeTimerMotivation.textContent = msg;
    urgeTimerMotivation.classList.add('motivation-fade');
    setTimeout(() => urgeTimerMotivation.classList.remove('motivation-fade'), 500);
  }
}

async function endUrgeTimer(resisted) {
  clearInterval(state.urgeTimerInterval);
  state.urgeTimerRunning = false;

  const elapsed = URGE_TIMER_DURATION - state.urgeTimerSeconds;
  const intensity = urgeIntensitySlider ? parseInt(urgeIntensitySlider.value, 10) : 5;

  nofapUrgeTimer.classList.add('hidden');

  try {
    await fetch('/api/nofap/urge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intensity,
        resisted,
        duration_seconds: elapsed,
        notes: resisted ? 'Urge resisted via timer' : 'Timer cancelled'
      })
    });

    if (resisted) {
      showToast('You resisted! +5 points. You\'re a warrior!', 'success');
      if (confetti) confetti.fire();
      showNotification('Urge Defeated!', {
        body: `You resisted an urge of intensity ${intensity}/10! Stay strong!`,
        tag: 'urge-resisted'
      });
    } else {
      showToast('Timer cancelled. Stay aware of your triggers.', 'info');
    }

    loadNoFapStatus();
  } catch (error) {
    console.error('Failed to log urge:', error);
  }
}

// Wire nofap events
function wireNoFapEvents() {
  if (nofapCheckinBtn) {
    nofapCheckinBtn.addEventListener('click', doNoFapCheckin);
  }
  if (nofapUrgeBtn) {
    nofapUrgeBtn.addEventListener('click', startUrgeTimer);
  }
  if (nofapRelapseBtn) {
    nofapRelapseBtn.addEventListener('click', doNoFapRelapse);
  }
  if (urgeTimerDoneBtn) {
    urgeTimerDoneBtn.addEventListener('click', () => endUrgeTimer(true));
  }
  if (urgeTimerCancelBtn) {
    urgeTimerCancelBtn.addEventListener('click', () => endUrgeTimer(false));
  }
  if (urgeIntensitySlider) {
    urgeIntensitySlider.addEventListener('input', () => {
      if (urgeIntensityValue) urgeIntensityValue.textContent = urgeIntensitySlider.value;
    });
  }
}

// Schedule daily check-in reminder notification
function scheduleNoFapReminder() {
  // Check every hour if user hasn't checked in today
  setInterval(async () => {
    if (state.activeModule !== 'nofap' && Notification.permission === 'granted') {
      try {
        const response = await fetch('/api/nofap/status');
        const status = await response.json();
        if (!status.checkedInToday) {
          const hour = new Date().getHours();
          // Remind at 9 AM, 2 PM, and 8 PM
          if (hour === 9 || hour === 14 || hour === 20) {
            showNotification('Daily Check-in Reminder', {
              body: `Day ${status.currentStreak + 1} awaits! Check in to keep your streak going.`,
              tag: 'nofap-checkin-reminder'
            });
          }
        }
      } catch (e) {
        // silently fail
      }
    }
  }, 3600000); // every hour
}

wireNoFapEvents();
scheduleNoFapReminder();

// Tab switching for accountability module
function wireNfTabs() {
  document.querySelectorAll('.nf-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.nftab;
      document.querySelectorAll('.nf-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.nf-tab-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.querySelector(`[data-nfpanel="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });
}
wireNfTabs();

// === DIARY / JOURNAL ===

const diaryForm = document.getElementById('diaryForm');
const diaryMoodSlider = document.getElementById('diaryMoodSlider');
const diaryMoodValue = document.getElementById('diaryMoodValue');
const diaryFeeling = document.getElementById('diaryFeeling');
const diaryTriggers = document.getElementById('diaryTriggers');
const diaryWhatHelped = document.getElementById('diaryWhatHelped');
const diaryGrateful = document.getElementById('diaryGrateful');
const diaryJournal = document.getElementById('diaryJournal');
const diaryDate = document.getElementById('diaryDate');
const diaryPastEntries = document.getElementById('diaryPastEntries');
const diarySaveBtn = document.getElementById('diarySaveBtn');

async function loadDiaryToday() {
  const today = new Date().toISOString().slice(0, 10);
  if (diaryDate) diaryDate.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  try {
    const response = await fetch(`/api/diary?date=${today}`);
    const entry = await response.json();
    if (entry) {
      if (diaryMoodSlider) { diaryMoodSlider.value = entry.mood || 5; if (diaryMoodValue) diaryMoodValue.textContent = entry.mood || 5; }
      if (diaryFeeling) diaryFeeling.value = entry.feeling || '';
      if (diaryTriggers) diaryTriggers.value = entry.triggers || '';
      if (diaryWhatHelped) diaryWhatHelped.value = entry.what_helped || '';
      if (diaryGrateful) diaryGrateful.value = entry.grateful_for || '';
      if (diaryJournal) diaryJournal.value = entry.journal || '';
      if (diarySaveBtn) diarySaveBtn.textContent = 'Update Journal Entry';
    } else {
      if (diarySaveBtn) diarySaveBtn.textContent = 'Save Journal Entry';
    }
  } catch (e) {
    console.error('Failed to load diary:', e);
  }

  loadDiaryPastEntries();
}

async function loadDiaryPastEntries() {
  if (!diaryPastEntries) return;
  try {
    const response = await fetch('/api/diary?limit=7');
    const entries = await response.json();
    if (!Array.isArray(entries) || entries.length === 0) {
      diaryPastEntries.innerHTML = '';
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    const past = entries.filter(e => e.entry_date !== today);
    if (past.length === 0) { diaryPastEntries.innerHTML = ''; return; }

    diaryPastEntries.innerHTML = '<h4>Past Entries</h4>' + past.map(entry => {
      const date = new Date(entry.entry_date);
      const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      const moodEmoji = entry.mood >= 8 ? '&#128513;' : entry.mood >= 6 ? '&#128522;' : entry.mood >= 4 ? '&#128528;' : '&#128542;';
      return `
        <div class="diary-past-item">
          <div class="diary-past-header">
            <span class="diary-past-date">${dateStr}</span>
            <span class="diary-past-mood">${moodEmoji} ${entry.mood}/10</span>
          </div>
          ${entry.journal ? `<p class="diary-past-text">${entry.journal.slice(0, 150)}${entry.journal.length > 150 ? '...' : ''}</p>` : ''}
          ${entry.grateful_for ? `<p class="diary-past-grateful">Grateful: ${entry.grateful_for.slice(0, 100)}</p>` : ''}
        </div>
      `;
    }).join('');
  } catch (e) {
    console.error('Failed to load past entries:', e);
  }
}

async function saveDiaryEntry() {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const response = await fetch('/api/diary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        entry_date: today,
        mood: diaryMoodSlider ? parseInt(diaryMoodSlider.value, 10) : 5,
        feeling: diaryFeeling ? diaryFeeling.value : '',
        triggers: diaryTriggers ? diaryTriggers.value : '',
        what_helped: diaryWhatHelped ? diaryWhatHelped.value : '',
        grateful_for: diaryGrateful ? diaryGrateful.value : '',
        journal: diaryJournal ? diaryJournal.value : ''
      })
    });
    if (response.ok) {
      showToast('Journal saved! +3 points', 'success');
      if (diarySaveBtn) diarySaveBtn.textContent = 'Update Journal Entry';
      loadDiaryPastEntries();
    } else {
      showToast('Failed to save journal', 'error');
    }
  } catch (e) {
    console.error('Failed to save diary:', e);
    showToast('Failed to save journal', 'error');
  }
}

function wireDiaryEvents() {
  if (diaryMoodSlider) {
    diaryMoodSlider.addEventListener('input', () => {
      if (diaryMoodValue) diaryMoodValue.textContent = diaryMoodSlider.value;
    });
  }
  if (diaryForm) {
    diaryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      saveDiaryEntry();
    });
  }
}

wireDiaryEvents();

// Update loadNoFapStatus to also load diary
const _origLoadNoFap = loadNoFapStatus;
loadNoFapStatus = async function() {
  await _origLoadNoFap();
  loadDiaryToday();
};

// ============ GALAXY MODULE ============

const galaxy = {
  canvas: null,
  ctx: null,
  stars: [],
  mode: 'spiral',
  handX: 0,
  handY: 0,
  handActive: false,
  camera: null,
  hands: null,
  animationId: null,
  lastTime: 0,
  fps: 0,
  frameCount: 0,
  lastFpsUpdate: 0,
  initialized: false,
  mouseDown: false
};

// Star class
class Star {
  constructor(x, y, canvas, mode) {
    this.canvas = canvas;
    this.reset(x, y, mode);
  }

  reset(x, y, mode) {
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;

    if (mode === 'spiral') {
      const angle = Math.random() * Math.PI * 6;
      const distance = Math.random() * Math.min(centerX, centerY) * 0.8;
      this.x = centerX + Math.cos(angle) * distance * (1 + angle * 0.05);
      this.y = centerY + Math.sin(angle) * distance * (1 + angle * 0.05);
      this.baseAngle = angle;
      this.distance = distance;
    } else if (mode === 'cluster') {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random();
      const distance = Math.pow(r, 0.5) * Math.min(centerX, centerY) * 0.7;
      this.x = centerX + Math.cos(angle) * distance;
      this.y = centerY + Math.sin(angle) * distance;
    } else if (mode === 'nebula') {
      this.x = x !== undefined ? x : Math.random() * this.canvas.width;
      this.y = y !== undefined ? y : Math.random() * this.canvas.height;
    } else {
      this.x = x !== undefined ? x : Math.random() * this.canvas.width;
      this.y = y !== undefined ? y : Math.random() * this.canvas.height;
    }

    this.originX = this.x;
    this.originY = this.y;
    this.vx = 0;
    this.vy = 0;
    this.size = Math.random() * 2.5 + 0.5;
    this.brightness = Math.random() * 0.5 + 0.5;
    this.twinkleSpeed = Math.random() * 0.02 + 0.01;
    this.twinkleOffset = Math.random() * Math.PI * 2;
    this.scattered = false;
    this.returnSpeed = 0.02 + Math.random() * 0.02;

    // Color based on mode
    if (mode === 'nebula') {
      const colors = ['#ff6b9d', '#c084fc', '#60a5fa', '#34d399', '#fbbf24'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    } else {
      const temp = Math.random();
      if (temp < 0.3) this.color = '#ffeedd';
      else if (temp < 0.5) this.color = '#aaccff';
      else if (temp < 0.7) this.color = '#ffffcc';
      else if (temp < 0.85) this.color = '#ffccaa';
      else this.color = '#ff9999';
    }
  }

  scatter(forceX, forceY, strength) {
    const dx = this.x - forceX;
    const dy = this.y - forceY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 200;

    if (dist < maxDist) {
      const force = (1 - dist / maxDist) * strength;
      const angle = Math.atan2(dy, dx);
      this.vx += Math.cos(angle) * force * 15;
      this.vy += Math.sin(angle) * force * 15;
      this.scattered = true;
    }
  }

  update(time) {
    // Apply velocity with friction
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.96;
    this.vy *= 0.96;

    // Return to origin when scattered
    if (this.scattered && Math.abs(this.vx) < 0.5 && Math.abs(this.vy) < 0.5) {
      const dx = this.originX - this.x;
      const dy = this.originY - this.y;
      this.x += dx * this.returnSpeed;
      this.y += dy * this.returnSpeed;

      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
        this.x = this.originX;
        this.y = this.originY;
        this.scattered = false;
      }
    }

    // Twinkle effect
    this.currentBrightness = this.brightness * (0.7 + 0.3 * Math.sin(time * this.twinkleSpeed + this.twinkleOffset));
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.currentBrightness;
    ctx.fill();

    // Glow effect for larger stars
    if (this.size > 1.5) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
      gradient.addColorStop(0, this.color);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.globalAlpha = this.currentBrightness * 0.3;
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  }
}

// Solar System Planets
const PLANETS = [
  { name: 'Mercury', color: '#b5b5b5', size: 3, orbit: 0.08, speed: 4.15 },
  { name: 'Venus', color: '#e8cda0', size: 5, orbit: 0.13, speed: 1.62 },
  { name: 'Earth', color: '#6b93d6', size: 5.5, orbit: 0.19, speed: 1.0 },
  { name: 'Mars', color: '#c1440e', size: 4, orbit: 0.25, speed: 0.53 },
  { name: 'Jupiter', color: '#c88b3a', size: 14, orbit: 0.38, speed: 0.084 },
  { name: 'Saturn', color: '#e4d191', size: 12, orbit: 0.50, speed: 0.034, rings: true },
  { name: 'Uranus', color: '#7de8e8', size: 8, orbit: 0.62, speed: 0.012 },
  { name: 'Neptune', color: '#4b70dd', size: 7.5, orbit: 0.74, speed: 0.006 }
];

class Planet {
  constructor(data, canvas) {
    this.name = data.name;
    this.color = data.color;
    this.size = data.size;
    this.orbitFraction = data.orbit;
    this.speedMultiplier = data.speed;
    this.hasRings = data.rings || false;
    this.canvas = canvas;
    this.angle = Math.random() * Math.PI * 2;
    this.vx = 0;
    this.vy = 0;
    this.scattered = false;
  }

  getOrbitRadius() {
    return this.orbitFraction * Math.min(this.canvas.width, this.canvas.height) * 0.45;
  }

  getPosition() {
    const cx = this.canvas.width / 2;
    const cy = this.canvas.height / 2;
    const r = this.getOrbitRadius();
    return {
      x: cx + Math.cos(this.angle) * r + this.vx,
      y: cy + Math.sin(this.angle) * r + this.vy
    };
  }

  scatter(forceX, forceY, strength) {
    const pos = this.getPosition();
    const dx = pos.x - forceX;
    const dy = pos.y - forceY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150) {
      const force = (1 - dist / 150) * strength;
      this.vx += (dx / dist) * force * 8;
      this.vy += (dy / dist) * force * 8;
      this.scattered = true;
    }
  }

  update(deltaTime) {
    this.angle += this.speedMultiplier * 0.001 * (deltaTime || 16);

    if (this.scattered) {
      this.vx *= 0.95;
      this.vy *= 0.95;
      if (Math.abs(this.vx) < 0.1 && Math.abs(this.vy) < 0.1) {
        this.vx = 0;
        this.vy = 0;
        this.scattered = false;
      }
    }
  }

  drawOrbit(ctx) {
    const cx = this.canvas.width / 2;
    const cy = this.canvas.height / 2;
    const r = this.getOrbitRadius();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  draw(ctx) {
    const pos = this.getPosition();

    // Planet glow
    const glowGradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, this.size * 2.5);
    glowGradient.addColorStop(0, this.color + '40');
    glowGradient.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, this.size * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = glowGradient;
    ctx.fill();

    // Rings (Saturn)
    if (this.hasRings) {
      ctx.beginPath();
      ctx.ellipse(pos.x, pos.y, this.size * 2.2, this.size * 0.6, 0.3, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(228, 209, 145, 0.5)';
      ctx.lineWidth = 2.5;
      ctx.stroke();
    }

    // Planet body
    const gradient = ctx.createRadialGradient(pos.x - this.size * 0.3, pos.y - this.size * 0.3, 0, pos.x, pos.y, this.size);
    gradient.addColorStop(0, '#ffffff40');
    gradient.addColorStop(0.5, this.color);
    gradient.addColorStop(1, this.color + '80');
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Name label
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(this.name, pos.x, pos.y + this.size + 14);
  }
}

function drawSun(ctx, canvas) {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const sunSize = 22;

  // Sun glow layers
  for (let i = 3; i > 0; i--) {
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, sunSize * (1 + i * 0.8));
    gradient.addColorStop(0, `rgba(255, 200, 50, ${0.15 / i})`);
    gradient.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(cx, cy, sunSize * (1 + i * 0.8), 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }

  // Sun body
  const sunGradient = ctx.createRadialGradient(cx - 5, cy - 5, 0, cx, cy, sunSize);
  sunGradient.addColorStop(0, '#fff5d6');
  sunGradient.addColorStop(0.4, '#ffcc33');
  sunGradient.addColorStop(1, '#ff8800');
  ctx.beginPath();
  ctx.arc(cx, cy, sunSize, 0, Math.PI * 2);
  ctx.fillStyle = sunGradient;
  ctx.fill();
}

galaxy.planets = [];

function createSolarSystem() {
  galaxy.planets = PLANETS.map(p => new Planet(p, galaxy.canvas));
}

function initGalaxy() {
  if (galaxy.initialized) return;

  galaxy.canvas = document.getElementById('galaxyCanvas');
  if (!galaxy.canvas) return;

  galaxy.ctx = galaxy.canvas.getContext('2d');
  resizeGalaxyCanvas();
  createStars();
  galaxy.initialized = true;

  // Event listeners
  window.addEventListener('resize', resizeGalaxyCanvas);

  // Mouse interaction
  galaxy.canvas.addEventListener('mousemove', (e) => {
    if (!galaxy.handActive) {
      const rect = galaxy.canvas.getBoundingClientRect();
      galaxy.handX = e.clientX - rect.left;
      galaxy.handY = e.clientY - rect.top;
    }
  });

  galaxy.canvas.addEventListener('mousedown', () => {
    galaxy.mouseDown = true;
  });

  galaxy.canvas.addEventListener('mouseup', () => {
    galaxy.mouseDown = false;
  });

  galaxy.canvas.addEventListener('mouseleave', () => {
    galaxy.mouseDown = false;
  });

  // Touch support
  galaxy.canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const rect = galaxy.canvas.getBoundingClientRect();
    const touch = e.touches[0];
    galaxy.handX = touch.clientX - rect.left;
    galaxy.handY = touch.clientY - rect.top;
    scatterStars(galaxy.handX, galaxy.handY, 1);
    if (galaxy.mode === 'solar') {
      galaxy.planets.forEach(p => p.scatter(galaxy.handX, galaxy.handY, 1));
    }
  });

  // Mode buttons
  document.querySelectorAll('.galaxy-mode').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.galaxy-mode').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      galaxy.mode = btn.dataset.mode;
      createStars();
    });
  });

  // Camera buttons
  const startCameraBtn = document.getElementById('startCameraBtn');
  const stopCameraBtn = document.getElementById('stopCameraBtn');
  const resetGalaxyBtn = document.getElementById('resetGalaxyBtn');

  if (startCameraBtn) {
    startCameraBtn.addEventListener('click', startHandTracking);
  }

  if (stopCameraBtn) {
    stopCameraBtn.addEventListener('click', stopHandTracking);
  }

  if (resetGalaxyBtn) {
    resetGalaxyBtn.addEventListener('click', () => {
      createStars();
      showToast('Galaxy reset!', 'success');
    });
  }
}

function resizeGalaxyCanvas() {
  if (!galaxy.canvas) return;
  const rect = galaxy.canvas.parentElement.getBoundingClientRect();
  galaxy.canvas.width = rect.width;
  galaxy.canvas.height = rect.height;
  if (galaxy.stars.length > 0) createStars();
}

function createStars() {
  galaxy.stars = [];

  if (galaxy.mode === 'solar') {
    // Fewer background stars for solar system
    const starCount = Math.min(500, Math.floor((galaxy.canvas.width * galaxy.canvas.height) / 1500));
    for (let i = 0; i < starCount; i++) {
      galaxy.stars.push(new Star(undefined, undefined, galaxy.canvas, 'cluster'));
    }
    createSolarSystem();
  } else {
    galaxy.planets = [];
    const starCount = Math.min(2000, Math.floor((galaxy.canvas.width * galaxy.canvas.height) / 400));
    for (let i = 0; i < starCount; i++) {
      galaxy.stars.push(new Star(undefined, undefined, galaxy.canvas, galaxy.mode));
    }
  }

  updateStarCount();
}

function scatterStars(x, y, strength) {
  galaxy.stars.forEach(star => {
    star.scatter(x, y, strength);
  });
}

function updateStarCount() {
  const starCountEl = document.getElementById('starCount');
  if (starCountEl) {
    starCountEl.textContent = `Stars: ${galaxy.stars.length}`;
  }
}

function updateFPS(timestamp) {
  galaxy.frameCount++;
  if (timestamp - galaxy.lastFpsUpdate >= 1000) {
    galaxy.fps = galaxy.frameCount;
    galaxy.frameCount = 0;
    galaxy.lastFpsUpdate = timestamp;

    const fpsCountEl = document.getElementById('fpsCount');
    if (fpsCountEl) {
      fpsCountEl.textContent = `FPS: ${galaxy.fps}`;
    }
  }
}

function animateGalaxy(timestamp) {
  if (state.activeModule !== 'galaxy') {
    galaxy.animationId = null;
    return;
  }

  galaxy.animationId = requestAnimationFrame(animateGalaxy);

  // Calculate delta time
  const deltaTime = timestamp - galaxy.lastTime;
  galaxy.lastTime = timestamp;

  updateFPS(timestamp);

  // Clear canvas with fade effect
  galaxy.ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  galaxy.ctx.fillRect(0, 0, galaxy.canvas.width, galaxy.canvas.height);

  // Draw nebula background for nebula mode
  if (galaxy.mode === 'nebula') {
    drawNebula();
  }

  // Mouse/touch scatter effect
  if (galaxy.mouseDown && !galaxy.handActive) {
    scatterStars(galaxy.handX, galaxy.handY, 0.5);
    if (galaxy.mode === 'solar') {
      galaxy.planets.forEach(p => p.scatter(galaxy.handX, galaxy.handY, 0.5));
    }
  }

  // Update and draw stars
  galaxy.stars.forEach(star => {
    star.update(timestamp);
    star.draw(galaxy.ctx);
  });

  // Draw solar system if in solar mode
  if (galaxy.mode === 'solar' && galaxy.planets.length > 0) {
    galaxy.planets.forEach(p => p.drawOrbit(galaxy.ctx));
    drawSun(galaxy.ctx, galaxy.canvas);
    galaxy.planets.forEach(p => {
      p.update(deltaTime);
      p.draw(galaxy.ctx);
    });
  }

  // Draw hand indicator
  if (galaxy.handActive) {
    drawHandIndicator();
  }
}

function drawNebula() {
  const ctx = galaxy.ctx;
  const centerX = galaxy.canvas.width / 2;
  const centerY = galaxy.canvas.height / 2;

  // Draw colorful nebula clouds
  const nebulaColors = [
    { x: centerX - 100, y: centerY - 50, color: 'rgba(147, 51, 234, 0.1)', size: 200 },
    { x: centerX + 80, y: centerY + 30, color: 'rgba(59, 130, 246, 0.08)', size: 180 },
    { x: centerX, y: centerY - 80, color: 'rgba(236, 72, 153, 0.08)', size: 150 },
  ];

  nebulaColors.forEach(nebula => {
    const gradient = ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, nebula.size);
    gradient.addColorStop(0, nebula.color);
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, galaxy.canvas.width, galaxy.canvas.height);
  });
}

function drawHandIndicator() {
  const indicator = document.getElementById('handIndicator');
  if (indicator) {
    indicator.style.left = galaxy.handX + 'px';
    indicator.style.top = galaxy.handY + 'px';
  }
}

async function startHandTracking() {
  const video = document.getElementById('handVideo');
  const indicator = document.getElementById('handIndicator');
  const startBtn = document.getElementById('startCameraBtn');
  const stopBtn = document.getElementById('stopCameraBtn');

  if (!video || typeof Hands === 'undefined') {
    showToast('Hand tracking not available', 'error');
    return;
  }

  try {
    // Initialize MediaPipe Hands
    galaxy.hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });

    galaxy.hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 0,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    galaxy.hands.onResults((results) => {
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const hand = results.multiHandLandmarks[0];
        // Use index finger tip (landmark 8) or palm center
        const landmark = hand[8]; // Index finger tip

        // Convert normalized coordinates to canvas coordinates
        galaxy.handX = (1 - landmark.x) * galaxy.canvas.width; // Mirror
        galaxy.handY = landmark.y * galaxy.canvas.height;
        galaxy.handActive = true;

        if (indicator) {
          indicator.classList.remove('hidden');
        }

        // Scatter stars and planets based on hand movement
        scatterStars(galaxy.handX, galaxy.handY, 1.2);
        if (galaxy.mode === 'solar') {
          galaxy.planets.forEach(p => p.scatter(galaxy.handX, galaxy.handY, 1.2));
        }
      } else {
        galaxy.handActive = false;
        if (indicator) {
          indicator.classList.add('hidden');
        }
      }
    });

    // Start camera
    galaxy.camera = new Camera(video, {
      onFrame: async () => {
        await galaxy.hands.send({ image: video });
      },
      width: 640,
      height: 480
    });

    await galaxy.camera.start();

    video.classList.add('active');
    if (startBtn) startBtn.classList.add('hidden');
    if (stopBtn) stopBtn.classList.remove('hidden');

    showToast('Camera started! Wave your hand!', 'success');

  } catch (error) {
    console.error('Failed to start hand tracking:', error);
    showToast('Could not access camera', 'error');
  }
}

function stopHandTracking() {
  const video = document.getElementById('handVideo');
  const indicator = document.getElementById('handIndicator');
  const startBtn = document.getElementById('startCameraBtn');
  const stopBtn = document.getElementById('stopCameraBtn');

  if (galaxy.camera) {
    galaxy.camera.stop();
    galaxy.camera = null;
  }

  if (galaxy.hands) {
    galaxy.hands.close();
    galaxy.hands = null;
  }

  galaxy.handActive = false;

  if (video) {
    video.classList.remove('active');
    video.srcObject = null;
  }

  if (indicator) {
    indicator.classList.add('hidden');
  }

  if (startBtn) startBtn.classList.remove('hidden');
  if (stopBtn) stopBtn.classList.add('hidden');

  showToast('Camera stopped', 'success');
}

function startGalaxyAnimation() {
  if (!galaxy.animationId) {
    galaxy.lastTime = performance.now();
    galaxy.animationId = requestAnimationFrame(animateGalaxy);
  }
}

function stopGalaxyAnimation() {
  if (galaxy.animationId) {
    cancelAnimationFrame(galaxy.animationId);
    galaxy.animationId = null;
  }
  stopHandTracking();
}

// Update switchModule to handle galaxy
const originalSwitchModule = switchModule;
switchModule = function(module) {
  // Stop galaxy animation when switching away
  if (state.activeModule === 'galaxy' && module !== 'galaxy') {
    stopGalaxyAnimation();
  }

  // Call original function
  originalSwitchModule(module);

  // Start galaxy animation when switching to galaxy
  if (module === 'galaxy') {
    const galaxyContainer = document.getElementById('galaxyContainer');
    if (galaxyContainer) {
      galaxyContainer.classList.remove('hidden');
    }
    initGalaxy();
    setTimeout(() => {
      resizeGalaxyCanvas();
      startGalaxyAnimation();
    }, 100);
  }
};

// ============ HABIT TRACKER & ANALYTICS ============

const trackerState = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1
};

const trackerGrid = document.getElementById('trackerGrid');
const trackerStats = document.getElementById('trackerStats');
const trackerMonthLabel = document.getElementById('trackerMonthLabel');
const trackerPrevMonth = document.getElementById('trackerPrevMonth');
const trackerNextMonth = document.getElementById('trackerNextMonth');

if (trackerPrevMonth) {
  trackerPrevMonth.addEventListener('click', () => {
    trackerState.month--;
    if (trackerState.month < 1) { trackerState.month = 12; trackerState.year--; }
    loadTrackerData();
  });
}

if (trackerNextMonth) {
  trackerNextMonth.addEventListener('click', () => {
    trackerState.month++;
    if (trackerState.month > 12) { trackerState.month = 1; trackerState.year++; }
    loadTrackerData();
  });
}

async function loadTrackerData() {
  if (!trackerGrid) return;
  try {
    const res = await fetch(`/api/nofap/tracker?year=${trackerState.year}&month=${trackerState.month}`);
    const data = await res.json();
    renderTracker(data);
  } catch (err) {
    console.error('Failed to load tracker:', err);
  }
}

function renderTracker(data) {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  if (trackerMonthLabel) {
    trackerMonthLabel.textContent = `${months[data.month - 1]} ${data.year}`;
  }

  // Render grid
  const firstDay = new Date(data.year, data.month - 1, 1).getDay();
  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  let html = dayNames.map(d => `<div class="tracker-day-name">${d}</div>`).join('');

  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    html += `<div class="tracker-cell tracker-empty"></div>`;
  }

  const today = new Date().toISOString().slice(0, 10);

  data.days.forEach(day => {
    const isToday = day.date === today;
    const statusClass = `tl-${day.status === 'urge_resisted' ? 'urge' : day.status}`;
    const moodInfo = day.mood ? ` | Mood: ${day.mood}/10` : '';
    const urgeInfo = day.urges ? ` | Urges: ${day.urges.resisted}/${day.urges.total} resisted` : '';
    html += `<div class="tracker-cell ${statusClass} ${isToday ? 'tracker-today' : ''}" title="${day.date}: ${day.status}${moodInfo}${urgeInfo}">
      <span class="tracker-day-num">${day.day}</span>
    </div>`;
  });

  trackerGrid.innerHTML = html;

  // Render stats
  const s = data.stats;
  if (trackerStats) {
    trackerStats.innerHTML = `
      <div class="tracker-stats-grid">
        <div class="tracker-stat-card">
          <div class="tracker-stat-row">
            <div class="tracker-stat-box">
              <span class="tracker-stat-num green">${s.weekClean}</span>
              <span class="tracker-stat-label">Clean (7d)</span>
            </div>
            <div class="tracker-stat-box">
              <span class="tracker-stat-num red">${s.weekRelapses}</span>
              <span class="tracker-stat-label">Relapses (7d)</span>
            </div>
          </div>
        </div>
        <div class="tracker-stat-card">
          <div class="tracker-stat-row">
            <div class="tracker-stat-box">
              <span class="tracker-stat-num green">${s.monthClean}</span>
              <span class="tracker-stat-label">Clean (Month)</span>
            </div>
            <div class="tracker-stat-box">
              <span class="tracker-stat-num orange">${s.monthUrgesResisted}</span>
              <span class="tracker-stat-label">Urges Resisted</span>
            </div>
            <div class="tracker-stat-box">
              <span class="tracker-stat-num red">${s.monthRelapses}</span>
              <span class="tracker-stat-label">Relapses</span>
            </div>
          </div>
        </div>
        <div class="tracker-stat-card">
          <div class="tracker-stat-row">
            <div class="tracker-stat-box">
              <span class="tracker-stat-num blue">${s.avgMood !== null ? s.avgMood : '-'}</span>
              <span class="tracker-stat-label">Avg Mood</span>
            </div>
            <div class="tracker-stat-box">
              <span class="tracker-stat-num">${s.totalDaysTracked}</span>
              <span class="tracker-stat-label">Days Tracked</span>
            </div>
            <div class="tracker-stat-box">
              <span class="tracker-stat-num green">${s.monthClean > 0 ? Math.round(s.monthClean / Math.max(s.totalDaysTracked, 1) * 100) : 0}%</span>
              <span class="tracker-stat-label">Success Rate</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

// Load tracker when switching to tracker tab
const origWireNfTabs = typeof wireNfTabs === 'function' ? wireNfTabs : null;
document.querySelectorAll('.nf-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    if (tab.dataset.nftab === 'tracker') {
      loadTrackerData();
    }
  });
});

// ============ RESEARCH TIMELINE ============

const RESEARCH_MILESTONES = [
  { id: 'brainstorm', title: 'Brainstorming', date: 'Jul 2025', done: true },
  { id: 'group_reg', title: 'Group Registration', date: '25 Mar', done: true },
  { id: 'taf', title: 'TAF', date: '26 May', done: true },
  { id: 'charter', title: 'Project Charter', date: '30 Jun - 16 Jul', done: true },
  { id: 'proposal_draft', title: 'Proposal (Draft)', date: '23 Jul', done: true },
  { id: 'proposal_pres', title: 'Proposal Presentation', date: '15 Aug', done: true },
  { id: 'proposal_final', title: 'Proposal (Final)', date: '8-12 Sep', done: true },
  { id: 'ppt1', title: 'PPT I', date: '19 Sep', done: true },
  { id: 'checklist1', title: 'Check List I', date: '15-19 Dec', done: true },
  { id: 'research_paper', title: 'Research Paper', date: '15-19 Dec', done: true },
  { id: 'final_reports', title: 'Final Reports', date: 'Mar 2026', done: false },
  { id: 'ppt2', title: 'PPT II', date: 'Mar 2026', done: false },
  { id: 'checklist2', title: 'Check List II', date: 'Mar 2026', done: false },
  { id: 'viva', title: 'VIVA', date: 'May 2026', done: false },
  { id: 'rp_acceptance', title: 'RP Acceptance', date: 'Jun 2026', done: false },
  { id: 'website', title: 'Project Website', date: 'Jun 2026', done: false },
  { id: 'logbook', title: 'Research Logbook', date: 'Jun 2026', done: false }
];

function loadResearchTimeline() {
  // Load saved state from localStorage
  const saved = JSON.parse(localStorage.getItem('researchTimeline') || '{}');
  RESEARCH_MILESTONES.forEach(m => {
    if (saved[m.id] !== undefined) m.done = saved[m.id];
  });
  renderResearchTimeline();
}

function saveResearchState() {
  const state = {};
  RESEARCH_MILESTONES.forEach(m => { state[m.id] = m.done; });
  localStorage.setItem('researchTimeline', JSON.stringify(state));
}

function toggleMilestone(id) {
  const m = RESEARCH_MILESTONES.find(x => x.id === id);
  if (m) {
    m.done = !m.done;
    saveResearchState();
    renderResearchTimeline();
  }
}

function renderResearchTimeline() {
  const track = document.getElementById('rtlTrack');
  if (!track) return;

  const firstUndone = RESEARCH_MILESTONES.findIndex(m => !m.done);

  track.innerHTML = RESEARCH_MILESTONES.map((m, i) => {
    let status = m.done ? 'done' : (i === firstUndone ? 'current' : 'pending');
    return `
      <div class="rtl-node ${status}" onclick="toggleMilestone('${m.id}')" title="Click to mark ${m.done ? 'incomplete' : 'complete'}">
        <div class="rtl-dot">
          ${m.done ? '<svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#fff" stroke-width="2" fill="none"/></svg>' : ''}
        </div>
        <div class="rtl-label">${m.title}</div>
        <div class="rtl-date">${m.date}</div>
      </div>
    `;
  }).join('');
}

loadResearchTimeline();

// ============ AI (GEMINI) INTEGRATION ============

// AI Motivation
const aiMotivationBtn = document.getElementById('aiMotivationBtn');
if (aiMotivationBtn) {
  aiMotivationBtn.addEventListener('click', async () => {
    aiMotivationBtn.disabled = true;
    aiMotivationBtn.classList.add('loading');
    aiMotivationBtn.textContent = 'Thinking';
    try {
      const res = await fetch('/api/ai/motivation', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      const data = await res.json();
      if (nofapMotivation) {
        nofapMotivation.textContent = data.motivation;
        nofapMotivation.style.transition = 'opacity 0.3s';
        nofapMotivation.style.opacity = '0';
        setTimeout(() => { nofapMotivation.style.opacity = '1'; }, 50);
      }
      if (data.fallback) {
        showToast('Using offline quotes (set GEMINI_API_KEY for AI)', 'warning');
      }
    } catch (err) {
      showToast('AI motivation failed', 'error');
    } finally {
      aiMotivationBtn.disabled = false;
      aiMotivationBtn.classList.remove('loading');
      aiMotivationBtn.textContent = 'AI Boost';
    }
  });
}

// AI Diary Insights
const aiInsightsBtn = document.getElementById('aiInsightsBtn');
const aiInsightsPanel = document.getElementById('aiInsightsPanel');
if (aiInsightsBtn && aiInsightsPanel) {
  aiInsightsBtn.addEventListener('click', async () => {
    aiInsightsBtn.disabled = true;
    aiInsightsBtn.classList.add('loading');
    aiInsightsBtn.textContent = 'Analyzing';
    aiInsightsPanel.style.display = 'none';
    try {
      const res = await fetch('/api/ai/diary-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ days: 7 })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed');
      }
      const data = await res.json();
      aiInsightsPanel.innerHTML = renderDiaryInsights(data);
      aiInsightsPanel.style.display = 'block';
    } catch (err) {
      showToast(err.message || 'AI insights failed', 'error');
    } finally {
      aiInsightsBtn.disabled = false;
      aiInsightsBtn.classList.remove('loading');
      aiInsightsBtn.textContent = 'Get AI Insights';
    }
  });
}

function renderDiaryInsights(data) {
  const trendClass = data.mood_trend || 'stable';
  let html = `<h4>Weekly Insights</h4>`;
  html += `<span class="ai-trend ${trendClass}">Mood: ${trendClass} (avg ${data.average_mood}/10)</span>`;

  if (data.patterns && data.patterns.length) {
    html += `<p style="margin-top:0.5rem;color:#94a3b8;font-size:0.78rem;">Patterns noticed:</p><ul>`;
    data.patterns.forEach(p => { html += `<li>${p}</li>`; });
    html += `</ul>`;
  }

  if (data.triggers_identified && data.triggers_identified.length) {
    html += `<p style="color:#94a3b8;font-size:0.78rem;">Triggers:</p><ul>`;
    data.triggers_identified.forEach(t => { html += `<li>${t}</li>`; });
    html += `</ul>`;
  }

  if (data.coping_strategies && data.coping_strategies.length) {
    html += `<p style="color:#94a3b8;font-size:0.78rem;">Strategies that work:</p><ul>`;
    data.coping_strategies.forEach(s => { html += `<li>${s}</li>`; });
    html += `</ul>`;
  }

  if (data.weekly_summary) {
    html += `<div class="ai-summary">${data.weekly_summary}</div>`;
  }

  if (data.recommendation) {
    html += `<div class="ai-recommendation"><strong>Next step:</strong> ${data.recommendation}</div>`;
  }

  return html;
}

// AI Task Suggestions
const aiSuggestBtn = document.getElementById('aiSuggestBtn');
const aiSuggestPanel = document.getElementById('aiSuggestPanel');
let pendingAiSuggestions = null;

if (aiSuggestBtn && aiSuggestPanel) {
  aiSuggestBtn.addEventListener('click', async () => {
    const title = document.getElementById('titleInput').value.trim();
    if (!title) {
      showToast('Enter a task title first', 'warning');
      return;
    }
    const description = document.getElementById('descriptionInput').value.trim();

    aiSuggestBtn.disabled = true;
    aiSuggestBtn.classList.add('loading');
    aiSuggestBtn.textContent = 'Thinking';
    aiSuggestPanel.style.display = 'none';

    try {
      const res = await fetch('/api/ai/task-suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed');
      }
      const data = await res.json();
      pendingAiSuggestions = data;
      aiSuggestPanel.innerHTML = renderTaskSuggestions(data);
      aiSuggestPanel.style.display = 'block';
    } catch (err) {
      showToast(err.message || 'AI suggest failed', 'error');
    } finally {
      aiSuggestBtn.disabled = false;
      aiSuggestBtn.classList.remove('loading');
      aiSuggestBtn.textContent = 'AI Suggest';
    }
  });
}

function renderTaskSuggestions(data) {
  let html = `<h4>AI Suggestions</h4>`;
  html += `<div class="ai-meta">`;
  html += `<span class="ai-meta-item"><strong>Category:</strong> ${data.suggested_category}</span>`;
  html += `<span class="ai-meta-item"><strong>Priority:</strong> ${data.suggested_priority}</span>`;
  html += `<span class="ai-meta-item"><strong>Sessions:</strong> ~${data.estimated_sessions} x 25min</span>`;
  html += `</div>`;

  if (data.suggested_subtasks && data.suggested_subtasks.length) {
    html += `<div class="ai-subtasks"><p style="color:#94a3b8;font-size:0.78rem;margin-top:0.5rem;">Suggested subtasks:</p>`;
    data.suggested_subtasks.forEach(s => {
      html += `<div class="ai-subtask-item"><span>• ${s}</span></div>`;
    });
    html += `</div>`;
  }

  if (data.tips) {
    html += `<div class="ai-recommendation" style="margin-top:0.5rem;"><strong>Tip:</strong> ${data.tips}</div>`;
  }

  html += `<button type="button" class="ai-btn ai-apply-btn" onclick="applyAiSuggestions()">Apply Category & Priority</button>`;
  return html;
}

function applyAiSuggestions() {
  if (!pendingAiSuggestions) return;
  const categoryInput = document.getElementById('categoryInput');
  const priorityInput = document.getElementById('priorityInput');

  if (categoryInput && pendingAiSuggestions.suggested_category) {
    categoryInput.value = pendingAiSuggestions.suggested_category;
  }
  if (priorityInput && pendingAiSuggestions.suggested_priority) {
    priorityInput.value = pendingAiSuggestions.suggested_priority;
  }
  showToast('Applied AI suggestions!', 'success');
}

// ============ ENGAGEMENT FEATURES ============

// === DAILY SCORE WIDGET ===

const dailyScoreNumber = document.getElementById('dailyScoreNumber');
const scoreRingFill = document.getElementById('scoreRingFill');
const scoreGreeting = document.getElementById('scoreGreeting');
const scoreContext = document.getElementById('scoreContext');
const sbStreak = document.getElementById('sbStreak');
const sbCheckin = document.getElementById('sbCheckin');
const sbMood = document.getElementById('sbMood');
const sbTasks = document.getElementById('sbTasks');
const sbStudy = document.getElementById('sbStudy');
const sbExercise = document.getElementById('sbExercise');
const trophyBtn = document.getElementById('trophyBtn');

async function loadDailyScore() {
  try {
    const res = await fetch('/api/daily-score');
    const data = await res.json();
    renderDailyScore(data);
  } catch (err) {
    console.error('Failed to load daily score:', err);
  }
}

function renderDailyScore(data) {
  if (!dailyScoreNumber) return;

  // Animate score number
  animateNumber(dailyScoreNumber, data.score);

  // Update ring
  if (scoreRingFill) {
    const circumference = 2 * Math.PI * 52;
    const offset = circumference - (data.score / 100) * circumference;
    scoreRingFill.style.strokeDasharray = circumference;
    scoreRingFill.style.strokeDashoffset = offset;

    // Color based on score
    scoreRingFill.className = 'score-ring-fill score-' + data.color;
  }

  // Update greeting
  const greeting = getPersonalizedGreeting(data.streak, data.checkedIn);
  if (scoreGreeting) scoreGreeting.textContent = greeting.title;
  if (scoreContext) scoreContext.textContent = greeting.context;

  // Update breakdown
  if (sbStreak) sbStreak.textContent = data.breakdown.streak;
  if (sbCheckin) sbCheckin.textContent = data.breakdown.checkin;
  if (sbMood) sbMood.textContent = data.breakdown.mood;
  if (sbTasks) sbTasks.textContent = data.breakdown.tasks;
  if (sbStudy) sbStudy.textContent = data.breakdown.study;
  if (sbExercise) sbExercise.textContent = data.breakdown.exercise;

  // Update fire animations
  updateStreakFire(data.streak);
}

function animateNumber(el, target) {
  const current = parseInt(el.textContent) || 0;
  const diff = target - current;
  const steps = 30;
  const stepValue = diff / steps;
  let step = 0;

  const interval = setInterval(() => {
    step++;
    el.textContent = Math.round(current + stepValue * step);
    if (step >= steps) {
      el.textContent = target;
      clearInterval(interval);
    }
  }, 20);
}

function getPersonalizedGreeting(streak, checkedIn) {
  const hour = new Date().getHours();
  let timeGreeting;
  if (hour < 12) timeGreeting = 'Good morning';
  else if (hour < 17) timeGreeting = 'Good afternoon';
  else timeGreeting = 'Good evening';

  // Title based on streak
  let title;
  if (streak >= 100) title = 'Legend';
  else if (streak >= 30) title = 'Champion';
  else if (streak >= 7) title = 'Warrior';
  else if (streak >= 1) title = 'Fighter';
  else title = 'Friend';

  // Context based on status
  let context;
  if (!checkedIn && streak === 0) {
    context = "Let's start fresh today!";
  } else if (!checkedIn) {
    context = `Day ${streak + 1} awaits your check-in!`;
  } else if (streak >= 30) {
    context = `${streak} days strong! Legendary status!`;
  } else if (streak >= 7) {
    context = `${streak} days! Keep the momentum!`;
  } else if (streak >= 1) {
    context = `Day ${streak}! Every day counts!`;
  } else {
    context = "Checked in! Build that streak!";
  }

  return {
    title: `${timeGreeting}, ${title}!`,
    context
  };
}

// === STREAK FIRE ANIMATION ===

const streakFire = document.getElementById('streakFire');
const heroStreakFire = document.getElementById('heroStreakFire');

function updateStreakFire(streak) {
  const fireClass = getFireClass(streak);

  if (streakFire) {
    streakFire.className = 'streak-fire ' + fireClass;
  }
  if (heroStreakFire) {
    heroStreakFire.className = 'hero-streak-fire ' + fireClass;
  }
}

function getFireClass(streak) {
  if (streak >= 100) return 'fire-legendary';
  if (streak >= 30) return 'fire-large';
  if (streak >= 7) return 'fire-medium';
  if (streak >= 1) return 'fire-small';
  return '';
}

// === DANGER HOURS ===

const dangerHoursAlert = document.getElementById('dangerHoursAlert');
const dangerHoursText = document.getElementById('dangerHoursText');

async function loadDangerHours() {
  if (!dangerHoursAlert) return;
  try {
    const res = await fetch('/api/danger-hours');
    const data = await res.json();
    renderDangerHours(data);
  } catch (err) {
    console.error('Failed to load danger hours:', err);
  }
}

function renderDangerHours(data) {
  if (!dangerHoursAlert || !data.dangerHours || data.dangerHours.length === 0) {
    if (dangerHoursAlert) dangerHoursAlert.classList.add('hidden');
    return;
  }

  dangerHoursAlert.classList.remove('hidden');

  const hoursText = data.dangerHours.map(h => h.label).join(', ');
  if (dangerHoursText) dangerHoursText.textContent = hoursText;

  if (data.isCurrentlyDanger) {
    dangerHoursAlert.classList.add('active');
  } else {
    dangerHoursAlert.classList.remove('active');
  }
}

// === WEEK COMPARISON ===

const wcTasksThis = document.getElementById('wcTasksThis');
const wcTasksLast = document.getElementById('wcTasksLast');
const wcTasksChange = document.getElementById('wcTasksChange');
const wcStudyThis = document.getElementById('wcStudyThis');
const wcStudyLast = document.getElementById('wcStudyLast');
const wcStudyChange = document.getElementById('wcStudyChange');
const wcCleanThis = document.getElementById('wcCleanThis');

async function loadWeekComparison() {
  if (!wcTasksThis) return;
  try {
    const res = await fetch('/api/weekly-comparison');
    const data = await res.json();
    renderWeekComparison(data);
  } catch (err) {
    console.error('Failed to load week comparison:', err);
  }
}

function renderWeekComparison(data) {
  if (wcTasksThis) wcTasksThis.textContent = data.thisWeek.tasksCompleted;
  if (wcTasksLast) wcTasksLast.textContent = data.lastWeek.tasksCompleted;
  if (wcTasksChange) {
    const change = data.changes.tasksChange;
    wcTasksChange.textContent = (change >= 0 ? '+' : '') + change + '%';
    wcTasksChange.className = 'wc-change ' + (change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral');
  }

  if (wcStudyThis) wcStudyThis.textContent = data.thisWeek.studyMinutes;
  if (wcStudyLast) wcStudyLast.textContent = data.lastWeek.studyMinutes;
  if (wcStudyChange) {
    const change = data.changes.studyChange;
    wcStudyChange.textContent = (change >= 0 ? '+' : '') + change + '%';
    wcStudyChange.className = 'wc-change ' + (change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral');
  }

  if (wcCleanThis) wcCleanThis.textContent = data.thisWeek.cleanDays;
}

// === ACHIEVEMENT BADGES ===

const BADGES = [
  { id: 'first_checkin', name: 'First Step', desc: 'Complete your first check-in', icon: '🌟', check: d => d.checkedInToday || d.streak > 0 },
  { id: 'streak_7', name: 'Week Warrior', desc: '7-day streak', icon: '🔥', check: d => d.streak >= 7 },
  { id: 'streak_30', name: 'Month Master', desc: '30-day streak', icon: '🏆', check: d => d.streak >= 30 },
  { id: 'streak_100', name: 'Century Legend', desc: '100-day streak', icon: '👑', check: d => d.streak >= 100 },
  { id: 'points_100', name: 'Point Hunter', desc: 'Earn 100 points', icon: '💎', check: d => d.totalPoints >= 100 },
  { id: 'points_500', name: 'Point Master', desc: 'Earn 500 points', icon: '💰', check: d => d.totalPoints >= 500 },
  { id: 'points_1000', name: 'Point Legend', desc: 'Earn 1000 points', icon: '🌈', check: d => d.totalPoints >= 1000 },
  { id: 'urges_10', name: 'Willpower', desc: 'Resist 10 urges', icon: '💪', check: d => d.urgesResisted >= 10 },
  { id: 'tasks_10', name: 'Task Starter', desc: 'Complete 10 tasks', icon: '✅', check: d => d.tasksCompleted >= 10 },
  { id: 'tasks_50', name: 'Task Master', desc: 'Complete 50 tasks', icon: '📋', check: d => d.tasksCompleted >= 50 },
  { id: 'study_1000', name: 'Scholar', desc: 'Study 1000 minutes', icon: '📚', check: d => d.totalStudyMinutes >= 1000 },
  { id: 'exercise_30', name: 'Fitness Buff', desc: '30 exercise sessions', icon: '🏋️', check: d => d.exerciseSessions >= 30 },
  { id: 'plant_5', name: 'Green Thumb', desc: 'Reach Legendary plant', icon: '🌳', check: d => d.plantLevel >= 5 }
];

const badgesModalOverlay = document.getElementById('badgesModalOverlay');
const badgesGrid = document.getElementById('badgesGrid');
const closeBadges = document.getElementById('closeBadges');
const badgeToast = document.getElementById('badgeToast');
const badgeToastName = document.getElementById('badgeToastName');

function getUnlockedBadges() {
  return JSON.parse(localStorage.getItem('unlockedBadges') || '[]');
}

function saveUnlockedBadges(badges) {
  localStorage.setItem('unlockedBadges', JSON.stringify(badges));
}

async function checkAchievements() {
  try {
    const res = await fetch('/api/achievements-data');
    const data = await res.json();

    const unlocked = getUnlockedBadges();
    const newlyUnlocked = [];

    BADGES.forEach(badge => {
      if (!unlocked.includes(badge.id) && badge.check(data)) {
        unlocked.push(badge.id);
        newlyUnlocked.push(badge);
      }
    });

    if (newlyUnlocked.length > 0) {
      saveUnlockedBadges(unlocked);
      // Show toast for first new badge
      showBadgeToast(newlyUnlocked[0]);
      confetti.fire();
    }
  } catch (err) {
    console.error('Failed to check achievements:', err);
  }
}

function showBadgeToast(badge) {
  if (!badgeToast || !badgeToastName) return;

  badgeToastName.textContent = badge.icon + ' ' + badge.name;
  badgeToast.classList.remove('hidden');
  badgeToast.classList.add('show');

  setTimeout(() => {
    badgeToast.classList.remove('show');
    setTimeout(() => badgeToast.classList.add('hidden'), 400);
  }, 4000);
}

function openBadgesModal() {
  if (!badgesModalOverlay || !badgesGrid) return;

  const unlocked = getUnlockedBadges();

  badgesGrid.innerHTML = BADGES.map(badge => {
    const isUnlocked = unlocked.includes(badge.id);
    return `
      <div class="badge-card ${isUnlocked ? 'unlocked' : 'locked'}">
        <span class="badge-icon">${badge.icon}</span>
        <span class="badge-name">${badge.name}</span>
        <span class="badge-desc">${badge.desc}</span>
        ${!isUnlocked ? '<span class="badge-lock">🔒</span>' : ''}
      </div>
    `;
  }).join('');

  badgesModalOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeBadgesModal() {
  if (!badgesModalOverlay) return;
  badgesModalOverlay.classList.remove('show');
  document.body.style.overflow = '';
}

// Wire badge events
if (trophyBtn) {
  trophyBtn.addEventListener('click', openBadgesModal);
}

if (closeBadges) {
  closeBadges.addEventListener('click', closeBadgesModal);
}

if (badgesModalOverlay) {
  badgesModalOverlay.addEventListener('click', (e) => {
    if (e.target === badgesModalOverlay) closeBadgesModal();
  });
}

// === INITIALIZE ENGAGEMENT FEATURES ===

// Load engagement features on page load
loadDailyScore();

// Check achievements periodically and on certain actions
checkAchievements();
setInterval(checkAchievements, 300000); // Check every 5 minutes

// Load week comparison when tracker tab is opened
document.querySelectorAll('.nf-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    if (tab.dataset.nftab === 'tracker') {
      loadWeekComparison();
    }
  });
});

// Load danger hours when accountability module is opened
const origSwitchModuleEngagement = switchModule;
switchModule = function(module) {
  origSwitchModuleEngagement(module);
  if (module === 'nofap') {
    loadDangerHours();
    loadDailyScore(); // Refresh score
  }
};

// Refresh daily score when actions are taken
const origDoNoFapCheckin = doNoFapCheckin;
doNoFapCheckin = async function() {
  await origDoNoFapCheckin();
  loadDailyScore();
  checkAchievements();
};

// Global expose for onclick handlers
window.toggleMilestone = toggleMilestone;
window.applyAiSuggestions = applyAiSuggestions;
