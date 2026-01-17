// Constants
const statuses = ['Not Started', 'In Progress', 'Blocked', 'Done'];
const categories = [
  'Internship',
  'Research Paper',
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
  plantStatus: null
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

  // Hide task-specific UI when on other modules
  const taskUI = document.querySelector('.topbar');
  const progressUI = document.querySelector('.progress-section');
  const toolbarUI = document.querySelector('.toolbar');
  const quoteUI = document.querySelector('.quote-section');

  if (module === 'tasks') {
    viewContainer.classList.remove('hidden');
    taskUI.style.display = '';
    progressUI.style.display = '';
    toolbarUI.style.display = '';
    quoteUI.style.display = '';
    loadTasks();
  } else {
    taskUI.style.display = 'none';
    progressUI.style.display = 'none';
    toolbarUI.style.display = 'none';
    quoteUI.style.display = 'none';

    if (module === 'calendar') {
      calendarContainer.classList.remove('hidden');
      loadCalendar();
    } else if (module === 'physical') {
      physicalContainer.classList.remove('hidden');
      loadPhysicalLogs();
    } else if (module === 'plant') {
      plantContainer.classList.remove('hidden');
      loadPlantStatus();
    }
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
