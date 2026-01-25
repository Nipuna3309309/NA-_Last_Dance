const express = require('express');
const path = require('path');
const db = require('./db');
const gemini = require('./gemini');

const app = express();
const PORT = process.env.PORT || 3000;

const CATEGORIES = [
  'Internship',
  'Research',
  'IT4070',
  'IT4031',
  'IT4021',
  'Power BI/Apps',
  'Machine Build'
];
const STATUSES = ['Not Started', 'In Progress', 'Blocked', 'Done'];
const PRIORITIES = ['Low', 'Medium', 'High'];
const EXERCISE_TYPES = db.EXERCISE_TYPES;

function validateEnum(value, list, field) {
  if (!value) return null;
  return list.includes(value) ? null : `${field} must be one of: ${list.join(', ')}`;
}

// Database initialization promise for serverless
let dbInitPromise = null;
function ensureDbInit() {
  if (!dbInitPromise) {
    dbInitPromise = db.init().then(() => {
      console.log('Database initialized');
    }).catch(err => {
      console.error('Database init error:', err);
      dbInitPromise = null; // Allow retry on error
      throw err;
    });
  }
  return dbInitPromise;
}

// Start initialization immediately
ensureDbInit();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint (no DB)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Middleware to ensure DB is ready before other API routes
app.use('/api', async (req, res, next) => {
  if (req.path === '/health') return next();
  try {
    await ensureDbInit();
    next();
  } catch (err) {
    console.error('DB init error:', err);
    res.status(500).json({ error: 'Database initialization failed', details: err.message });
  }
});

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await db.getTasks({
      search: req.query.search || '',
      category: req.query.category || '',
      status: req.query.status || '',
      priority: req.query.priority || '',
      liked: req.query.liked === 'true',
      due: req.query.due || 'all'
    });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load tasks' });
  }
});

// Create task
app.post('/api/tasks', async (req, res) => {
  const body = req.body || {};
  const title = (body.title || '').trim();
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const category = body.category || 'Internship';
  const status = body.status || 'Not Started';
  const priority = body.priority || 'Medium';
  const due_date = body.due_date || null;

  const errMsg =
    validateEnum(category, CATEGORIES, 'category') ||
    validateEnum(status, STATUSES, 'status') ||
    validateEnum(priority, PRIORITIES, 'priority');
  if (errMsg) return res.status(400).json({ error: errMsg });

  try {
    const task = await db.createTask({
      title,
      description: body.description || '',
      category,
      status,
      priority,
      due_date,
      liked: body.liked ? 1 : 0
    });
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update task
app.put('/api/tasks/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id' });

  const body = req.body || {};
  const updates = {};

  if (body.title !== undefined) {
    const title = String(body.title).trim();
    if (!title) return res.status(400).json({ error: 'Title is required' });
    updates.title = title;
  }
  if (body.description !== undefined) updates.description = body.description;
  if (body.category !== undefined) updates.category = body.category;
  if (body.status !== undefined) updates.status = body.status;
  if (body.priority !== undefined) updates.priority = body.priority;
  if (body.due_date !== undefined) updates.due_date = body.due_date || null;
  if (body.liked !== undefined) updates.liked = body.liked ? 1 : 0;
  if (body.remind_at !== undefined) updates.remind_at = body.remind_at || null;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No updates provided' });
  }

  const errMsg =
    validateEnum(updates.category, CATEGORIES, 'category') ||
    validateEnum(updates.status, STATUSES, 'status') ||
    validateEnum(updates.priority, PRIORITIES, 'priority');
  if (errMsg) return res.status(400).json({ error: errMsg });

  try {
    const task = await db.updateTask(id, updates);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Toggle like on task
app.post('/api/tasks/:id/like', async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id' });

  try {
    const existing = await db.getTaskById(id);
    if (!existing) return res.status(404).json({ error: 'Task not found' });

    const task = await db.updateTask(id, { liked: existing.liked ? 0 : 1 });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to toggle like' });
  }
});

// Delete task
app.delete('/api/tasks/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id' });

  try {
    const ok = await db.deleteTask(id);
    if (!ok) return res.status(404).json({ error: 'Task not found' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// === SUBTASKS API ===

// Get subtasks for a task
app.get('/api/tasks/:id/subtasks', async (req, res) => {
  const taskId = Number(req.params.id);
  if (!taskId) return res.status(400).json({ error: 'Invalid task id' });

  try {
    const subtasks = await db.getSubtasks(taskId);
    res.json(subtasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load subtasks' });
  }
});

// Create subtask
app.post('/api/tasks/:id/subtasks', async (req, res) => {
  const taskId = Number(req.params.id);
  if (!taskId) return res.status(400).json({ error: 'Invalid task id' });

  const body = req.body || {};
  const title = (body.title || '').trim();
  if (!title) return res.status(400).json({ error: 'Title is required' });

  try {
    const subtask = await db.createSubtask(taskId, title);
    res.status(201).json(subtask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create subtask' });
  }
});

// Update subtask
app.put('/api/subtasks/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id' });

  const body = req.body || {};
  const updates = {};

  if (body.title !== undefined) {
    const title = String(body.title).trim();
    if (!title) return res.status(400).json({ error: 'Title is required' });
    updates.title = title;
  }
  if (body.completed !== undefined) updates.completed = body.completed;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No updates provided' });
  }

  try {
    const subtask = await db.updateSubtask(id, updates);
    if (!subtask) return res.status(404).json({ error: 'Subtask not found' });
    res.json(subtask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update subtask' });
  }
});

// Delete subtask
app.delete('/api/subtasks/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id' });

  try {
    const ok = await db.deleteSubtask(id);
    if (!ok) return res.status(404).json({ error: 'Subtask not found' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete subtask' });
  }
});

// Export tasks
app.post('/api/export', async (req, res) => {
  try {
    const tasks = await db.exportTasks();
    res.json({ exported_at: new Date().toISOString(), tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to export' });
  }
});

// Import tasks
app.post('/api/import', async (req, res) => {
  const body = req.body || {};
  if (!Array.isArray(body.tasks)) {
    return res.status(400).json({ error: 'tasks must be an array' });
  }

  try {
    const count = await db.importTasks(body.tasks);
    res.json({ imported: count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to import' });
  }
});

// === PHYSICAL LOGS API ===

// Get all physical logs
app.get('/api/physical', async (req, res) => {
  try {
    const logs = await db.getPhysicalLogs({
      from: req.query.from || '',
      to: req.query.to || '',
      exercise_type: req.query.exercise_type || ''
    });
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load physical logs' });
  }
});

// Create physical log
app.post('/api/physical', async (req, res) => {
  const body = req.body || {};
  const exercise_type = body.exercise_type || 'Other';
  const duration_minutes = parseInt(body.duration_minutes, 10);
  const log_date = body.log_date || new Date().toISOString().slice(0, 10);

  if (!duration_minutes || duration_minutes < 1) {
    return res.status(400).json({ error: 'Duration must be at least 1 minute' });
  }

  const errMsg = validateEnum(exercise_type, EXERCISE_TYPES, 'exercise_type');
  if (errMsg) return res.status(400).json({ error: errMsg });

  try {
    const log = await db.createPhysicalLog({
      exercise_type,
      duration_minutes,
      notes: body.notes || '',
      log_date
    });
    res.status(201).json(log);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create physical log' });
  }
});

// Update physical log
app.put('/api/physical/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id' });

  const body = req.body || {};
  const updates = {};

  if (body.exercise_type !== undefined) {
    const errMsg = validateEnum(body.exercise_type, EXERCISE_TYPES, 'exercise_type');
    if (errMsg) return res.status(400).json({ error: errMsg });
    updates.exercise_type = body.exercise_type;
  }
  if (body.duration_minutes !== undefined) {
    const duration = parseInt(body.duration_minutes, 10);
    if (!duration || duration < 1) {
      return res.status(400).json({ error: 'Duration must be at least 1 minute' });
    }
    updates.duration_minutes = duration;
  }
  if (body.notes !== undefined) updates.notes = body.notes;
  if (body.log_date !== undefined) updates.log_date = body.log_date;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No updates provided' });
  }

  try {
    const log = await db.updatePhysicalLog(id, updates);
    if (!log) return res.status(404).json({ error: 'Physical log not found' });
    res.json(log);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update physical log' });
  }
});

// Delete physical log
app.delete('/api/physical/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id' });

  try {
    const ok = await db.deletePhysicalLog(id);
    if (!ok) return res.status(404).json({ error: 'Physical log not found' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete physical log' });
  }
});

// === STUDY SESSIONS API ===

// Get all study sessions
app.get('/api/study-sessions', async (req, res) => {
  try {
    const sessions = await db.getStudySessions({
      from: req.query.from || '',
      to: req.query.to || '',
      category: req.query.category || '',
      task_id: req.query.task_id ? Number(req.query.task_id) : null
    });
    res.json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load study sessions' });
  }
});

// Create study session
app.post('/api/study-sessions', async (req, res) => {
  const body = req.body || {};
  const duration_minutes = parseInt(body.duration_minutes, 10);
  const session_date = body.session_date || new Date().toISOString().slice(0, 10);

  if (!duration_minutes || duration_minutes < 1) {
    return res.status(400).json({ error: 'Duration must be at least 1 minute' });
  }

  if (body.category) {
    const errMsg = validateEnum(body.category, CATEGORIES, 'category');
    if (errMsg) return res.status(400).json({ error: errMsg });
  }

  try {
    const session = await db.createStudySession({
      task_id: body.task_id ? Number(body.task_id) : null,
      category: body.category || null,
      duration_minutes,
      notes: body.notes || '',
      session_date
    });
    res.status(201).json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create study session' });
  }
});

// Update study session
app.put('/api/study-sessions/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id' });

  const body = req.body || {};
  const updates = {};

  if (body.task_id !== undefined) updates.task_id = body.task_id ? Number(body.task_id) : null;
  if (body.category !== undefined) {
    if (body.category) {
      const errMsg = validateEnum(body.category, CATEGORIES, 'category');
      if (errMsg) return res.status(400).json({ error: errMsg });
    }
    updates.category = body.category || null;
  }
  if (body.duration_minutes !== undefined) {
    const duration = parseInt(body.duration_minutes, 10);
    if (!duration || duration < 1) {
      return res.status(400).json({ error: 'Duration must be at least 1 minute' });
    }
    updates.duration_minutes = duration;
  }
  if (body.notes !== undefined) updates.notes = body.notes;
  if (body.session_date !== undefined) updates.session_date = body.session_date;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No updates provided' });
  }

  try {
    const session = await db.updateStudySession(id, updates);
    if (!session) return res.status(404).json({ error: 'Study session not found' });
    res.json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update study session' });
  }
});

// Delete study session
app.delete('/api/study-sessions/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id' });

  try {
    const ok = await db.deleteStudySession(id);
    if (!ok) return res.status(404).json({ error: 'Study session not found' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete study session' });
  }
});

// === CALENDAR API ===

// Get calendar data for a month
app.get('/api/calendar', async (req, res) => {
  const year = parseInt(req.query.year, 10) || new Date().getFullYear();
  const month = parseInt(req.query.month, 10) || (new Date().getMonth() + 1);

  if (month < 1 || month > 12) {
    return res.status(400).json({ error: 'Month must be between 1 and 12' });
  }

  try {
    const data = await db.getCalendarData(year, month);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load calendar data' });
  }
});

// Get holidays for a year
app.get('/api/holidays', async (req, res) => {
  const year = parseInt(req.query.year, 10) || new Date().getFullYear();

  try {
    const holidays = await db.getHolidays(year);
    res.json(holidays);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load holidays' });
  }
});

// Load holidays for a year (admin endpoint)
app.post('/api/holidays', async (req, res) => {
  const body = req.body || {};
  const year = parseInt(body.year, 10);
  const holidays = body.holidays;

  if (!year || year < 2000 || year > 2100) {
    return res.status(400).json({ error: 'Year must be between 2000 and 2100' });
  }
  if (!Array.isArray(holidays)) {
    return res.status(400).json({ error: 'holidays must be an array' });
  }

  try {
    await db.loadHolidaysForYear(year, holidays);
    res.json({ loaded: holidays.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load holidays' });
  }
});

// === PLANT/GAMIFICATION API ===

// Get plant status
app.get('/api/plant', async (req, res) => {
  try {
    const status = await db.getPlantStatus();
    res.json(status);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load plant status' });
  }
});

// Get plant growth history
app.get('/api/plant/history', async (req, res) => {
  const days = parseInt(req.query.days, 10) || 14;

  try {
    const history = await db.getPointsHistory(Math.min(days, 90));
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load plant history' });
  }
});

// === REMINDERS API ===

// Get reminders
app.get('/api/reminders', async (req, res) => {
  try {
    const reminders = await db.getReminders({
      pending: req.query.pending === 'true',
      type: req.query.type || ''
    });
    res.json(reminders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load reminders' });
  }
});

// Get due reminders (for notification checking)
app.get('/api/reminders/due', async (req, res) => {
  try {
    const reminders = await db.getDueReminders();
    res.json(reminders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load due reminders' });
  }
});

// Create reminder
app.post('/api/reminders', async (req, res) => {
  const body = req.body || {};
  const type = body.type || 'custom';
  const message = (body.message || '').trim();
  const remind_at = body.remind_at;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  if (!remind_at) {
    return res.status(400).json({ error: 'remind_at is required' });
  }

  try {
    const reminder = await db.createReminder({
      type,
      entity_id: body.entity_id ? Number(body.entity_id) : null,
      entity_type: body.entity_type || null,
      message,
      remind_at
    });
    res.status(201).json(reminder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create reminder' });
  }
});

// Update reminder
app.put('/api/reminders/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id' });

  const body = req.body || {};
  const updates = {};

  if (body.remind_at !== undefined) updates.remind_at = body.remind_at;
  if (body.sent !== undefined) updates.sent = body.sent;
  if (body.message !== undefined) updates.message = body.message;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No updates provided' });
  }

  try {
    const reminder = await db.updateReminder(id, updates);
    if (!reminder) return res.status(404).json({ error: 'Reminder not found' });
    res.json(reminder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update reminder' });
  }
});

// Delete reminder
app.delete('/api/reminders/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id' });

  try {
    const ok = await db.deleteReminder(id);
    if (!ok) return res.status(404).json({ error: 'Reminder not found' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete reminder' });
  }
});

// === NOFAP / HABIT TRACKER API ===

// Get current status (streak, stats, motivation)
app.get('/api/nofap/status', async (req, res) => {
  try {
    const status = await db.getNoFapStatus();
    res.json(status);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load status' });
  }
});

// Daily check-in
app.post('/api/nofap/checkin', async (req, res) => {
  try {
    const result = await db.logNoFapCheckin(req.body.notes || '');
    const status = await db.getNoFapStatus();
    res.status(201).json({ ...result, status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to check in' });
  }
});

// Log a relapse
app.post('/api/nofap/relapse', async (req, res) => {
  try {
    const result = await db.logNoFapRelapse(req.body.notes || '');
    const status = await db.getNoFapStatus();
    res.status(201).json({ ...result, status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to log' });
  }
});

// Log an urge (resisted or not)
app.post('/api/nofap/urge', async (req, res) => {
  const body = req.body || {};
  const intensity = Math.min(10, Math.max(1, parseInt(body.intensity, 10) || 5));
  const resisted = body.resisted !== false;
  const durationSeconds = parseInt(body.duration_seconds, 10) || null;

  try {
    const result = await db.logNoFapUrge(intensity, resisted, durationSeconds, body.notes || '');
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to log urge' });
  }
});

// Get history
app.get('/api/nofap/history', async (req, res) => {
  const days = Math.min(parseInt(req.query.days, 10) || 30, 365);
  try {
    const history = await db.getNoFapHistory(days);
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load history' });
  }
});

// Get monthly tracker data
app.get('/api/nofap/tracker', async (req, res) => {
  const year = parseInt(req.query.year, 10) || new Date().getFullYear();
  const month = parseInt(req.query.month, 10) || (new Date().getMonth() + 1);

  try {
    const data = await db.getTrackerData(year, month);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load tracker data' });
  }
});

// Get a random motivation quote
app.get('/api/nofap/motivation', (req, res) => {
  const quotes = db.NOFAP_MOTIVATIONS;
  res.json({ motivation: quotes[Math.floor(Math.random() * quotes.length)] });
});

// === DIARY / JOURNAL API ===

// Get today's diary entry (or a specific date)
app.get('/api/diary', async (req, res) => {
  try {
    if (req.query.date) {
      const entry = await db.getDiaryEntry(req.query.date);
      return res.json(entry || null);
    }
    const entries = await db.getDiaryEntries(parseInt(req.query.limit, 10) || 30);
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load diary' });
  }
});

// Save or update diary entry
app.post('/api/diary', async (req, res) => {
  const body = req.body || {};
  try {
    const entry = await db.saveDiaryEntry({
      entry_date: body.entry_date || new Date().toISOString().slice(0, 10),
      mood: parseInt(body.mood, 10) || 5,
      feeling: body.feeling || '',
      triggers: body.triggers || '',
      what_helped: body.what_helped || '',
      grateful_for: body.grateful_for || '',
      journal: body.journal || ''
    });
    res.status(201).json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save diary entry' });
  }
});

// Delete diary entry
app.delete('/api/diary/:date', async (req, res) => {
  try {
    const ok = await db.deleteDiaryEntry(req.params.date);
    if (!ok) return res.status(404).json({ error: 'Entry not found' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete diary entry' });
  }
});

// === ENGAGEMENT FEATURES API ===

// Daily Score Widget - calculates 0-100 score based on today's performance
app.get('/api/daily-score', async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);

    // Get NoFap status for streak and check-in
    const nofapStatus = await db.getNoFapStatus();
    const streak = nofapStatus.currentStreak || 0;
    const checkedIn = nofapStatus.checkedInToday;

    // Get today's diary for mood
    const diaryEntry = await db.getDiaryEntry(today);
    const mood = diaryEntry ? diaryEntry.mood : 0;

    // Get today's completed tasks
    const allTasks = await db.getTasks({ status: 'Done' });
    const todayTasks = allTasks.filter(t => t.updated_at && t.updated_at.slice(0, 10) === today);

    // Get today's study sessions
    const studySessions = await db.getStudySessions({ from: today, to: today });
    const studyMinutes = studySessions.reduce((sum, s) => sum + s.duration_minutes, 0);

    // Get today's exercise
    const physicalLogs = await db.getPhysicalLogs({ from: today, to: today });
    const exercised = physicalLogs.length > 0;

    // Calculate score (0-100)
    let score = 0;
    const breakdown = {};

    // Streak: up to 20 points (1 point per day, max 20)
    breakdown.streak = Math.min(20, streak);
    score += breakdown.streak;

    // Check-in: 15 points
    breakdown.checkin = checkedIn ? 15 : 0;
    score += breakdown.checkin;

    // Mood: up to 10 points (mood is 1-10, scale to 10 pts)
    breakdown.mood = mood > 0 ? mood : 0;
    score += breakdown.mood;

    // Tasks: up to 25 points (5 pts per task, max 5 tasks = 25)
    breakdown.tasks = Math.min(25, todayTasks.length * 5);
    score += breakdown.tasks;

    // Study: up to 15 points (1 pt per 10 mins, max 150 mins = 15 pts)
    breakdown.study = Math.min(15, Math.floor(studyMinutes / 10));
    score += breakdown.study;

    // Exercise: 15 points
    breakdown.exercise = exercised ? 15 : 0;
    score += breakdown.exercise;

    // Determine color based on score
    let color = 'red';
    if (score >= 80) color = 'green';
    else if (score >= 60) color = 'yellow';
    else if (score >= 40) color = 'orange';

    res.json({
      score,
      maxScore: 100,
      color,
      breakdown,
      streak,
      checkedIn,
      tasksCompleted: todayTasks.length,
      studyMinutes,
      exercised
    });
  } catch (err) {
    console.error('Daily score error:', err);
    res.status(500).json({ error: 'Failed to calculate daily score' });
  }
});

// Achievement data for badges
app.get('/api/achievements-data', async (req, res) => {
  try {
    const nofapStatus = await db.getNoFapStatus();
    const plantStatus = await db.getPlantStatus();
    const allTasks = await db.getTasks({});
    const doneTasks = allTasks.filter(t => t.status === 'Done');
    const studySessions = await db.getStudySessions({});
    const physicalLogs = await db.getPhysicalLogs({});

    const totalStudyMins = studySessions.reduce((sum, s) => sum + s.duration_minutes, 0);

    res.json({
      streak: nofapStatus.currentStreak || 0,
      bestStreak: nofapStatus.bestStreak || 0,
      totalPoints: plantStatus.totalPoints || 0,
      urgesResisted: nofapStatus.urgesResisted || 0,
      tasksCompleted: doneTasks.length,
      totalStudyMinutes: totalStudyMins,
      exerciseSessions: physicalLogs.length,
      checkedInToday: nofapStatus.checkedInToday,
      plantLevel: plantStatus.currentLevel || 0
    });
  } catch (err) {
    console.error('Achievements data error:', err);
    res.status(500).json({ error: 'Failed to load achievements data' });
  }
});

// Danger hours analysis
app.get('/api/danger-hours', async (req, res) => {
  try {
    const history = await db.getNoFapHistory(90);
    const urges = history.urges || [];

    // Count urges by hour
    const hourCounts = {};
    for (let i = 0; i < 24; i++) hourCounts[i] = 0;

    urges.forEach(u => {
      const hour = new Date(u.created_at).getHours();
      hourCounts[hour]++;
    });

    // Find peak hours (top 3 hours with most urges)
    const sortedHours = Object.entries(hourCounts)
      .sort((a, b) => b[1] - a[1])
      .filter(([_, count]) => count > 0)
      .slice(0, 3);

    const dangerHours = sortedHours.map(([hour, count]) => ({
      hour: parseInt(hour),
      count,
      label: formatHour(parseInt(hour))
    }));

    // Check if current hour is a danger hour
    const currentHour = new Date().getHours();
    const isCurrentlyDanger = dangerHours.some(h => h.hour === currentHour);

    res.json({
      dangerHours,
      isCurrentlyDanger,
      currentHour,
      totalUrges: urges.length
    });
  } catch (err) {
    console.error('Danger hours error:', err);
    res.status(500).json({ error: 'Failed to analyze danger hours' });
  }
});

function formatHour(hour) {
  if (hour === 0) return '12AM';
  if (hour === 12) return '12PM';
  if (hour < 12) return `${hour}AM`;
  return `${hour - 12}PM`;
}

// Weekly comparison
app.get('/api/weekly-comparison', async (req, res) => {
  try {
    const now = new Date();
    const today = now.toISOString().slice(0, 10);

    // This week (last 7 days)
    const weekStart = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    // Last week (7-14 days ago)
    const lastWeekStart = new Date(now - 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const lastWeekEnd = new Date(now - 7 * 24 * 60 * 60 * 1000 - 1).toISOString().slice(0, 10);

    // This week data
    const thisWeekTasks = (await db.getTasks({ status: 'Done' }))
      .filter(t => t.updated_at >= weekStart);
    const thisWeekStudy = await db.getStudySessions({ from: weekStart, to: today });
    const thisWeekStudyMins = thisWeekStudy.reduce((sum, s) => sum + s.duration_minutes, 0);

    // Get tracker data for clean days
    const thisWeekTracker = await db.getTrackerData(now.getFullYear(), now.getMonth() + 1);
    const thisWeekClean = thisWeekTracker.days
      .filter(d => d.date >= weekStart && d.date <= today && d.status === 'clean').length;

    // Last week data (approximate - use previous month if needed)
    const lastWeekTasks = (await db.getTasks({ status: 'Done' }))
      .filter(t => t.updated_at >= lastWeekStart && t.updated_at <= lastWeekEnd);
    const lastWeekStudy = await db.getStudySessions({ from: lastWeekStart, to: lastWeekEnd });
    const lastWeekStudyMins = lastWeekStudy.reduce((sum, s) => sum + s.duration_minutes, 0);

    // Calculate percentages
    const calcChange = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - previous) / previous) * 100);
    };

    res.json({
      thisWeek: {
        cleanDays: thisWeekClean,
        tasksCompleted: thisWeekTasks.length,
        studyMinutes: thisWeekStudyMins
      },
      lastWeek: {
        cleanDays: 0, // Would need more complex query
        tasksCompleted: lastWeekTasks.length,
        studyMinutes: lastWeekStudyMins
      },
      changes: {
        tasksChange: calcChange(thisWeekTasks.length, lastWeekTasks.length),
        studyChange: calcChange(thisWeekStudyMins, lastWeekStudyMins)
      }
    });
  } catch (err) {
    console.error('Weekly comparison error:', err);
    res.status(500).json({ error: 'Failed to get weekly comparison' });
  }
});

// === AI (GEMINI) API ===

// Get AI-powered motivation
app.post('/api/ai/motivation', async (req, res) => {
  try {
    const status = await db.getNoFapStatus();
    const diaryEntries = await db.getDiaryEntries(1);
    const latestMood = diaryEntries.length > 0 ? diaryEntries[0].mood : 5;
    const hour = new Date().getHours();
    const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';

    const plantStatus = await db.getPlantStatus();
    const motivation = await gemini.getSmartMotivation({
      streak: status.currentStreak,
      mood: latestMood,
      recentUrges: status.urgesResisted || 0,
      timeOfDay,
      totalPoints: plantStatus.totalPoints
    });

    res.json({ motivation });
  } catch (err) {
    console.error('AI motivation error:', err.message);
    // Fallback to static quotes if AI fails
    const quotes = db.NOFAP_MOTIVATIONS;
    res.json({ motivation: quotes[Math.floor(Math.random() * quotes.length)], fallback: true });
  }
});

// Get AI diary insights
app.post('/api/ai/diary-insights', async (req, res) => {
  try {
    const entries = await db.getDiaryEntries(parseInt(req.body.days) || 7);
    if (entries.length === 0) {
      return res.status(400).json({ error: 'No diary entries found. Write some entries first!' });
    }
    const insights = await gemini.getDiaryInsights(entries);
    res.json(insights);
  } catch (err) {
    console.error('AI diary insights error:', err.message);
    res.status(500).json({ error: 'Failed to generate insights. Check GEMINI_API_KEY.' });
  }
});

// Get AI task suggestions
app.post('/api/ai/task-suggest', async (req, res) => {
  const { title, description } = req.body || {};
  if (!title) return res.status(400).json({ error: 'Title is required' });

  try {
    const suggestions = await gemini.getTaskSuggestions(title, description || '', CATEGORIES);
    res.json(suggestions);
  } catch (err) {
    console.error('AI task suggest error:', err.message);
    res.status(500).json({ error: 'Failed to generate suggestions. Check GEMINI_API_KEY.' });
  }
});

// Get AI weekly progress summary
app.post('/api/ai/progress-summary', async (req, res) => {
  try {
    const now = new Date();
    const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const today = now.toISOString().slice(0, 10);

    const tasks = await db.getTasks({ status: 'Done' });
    const weekTasks = tasks.filter(t => t.updated_at >= weekAgo);
    const studySessions = await db.getStudySessions({ from: weekAgo, to: today });
    const physicalLogs = await db.getPhysicalLogs({ from: weekAgo, to: today });
    const nofapStatus = await db.getNoFapStatus();
    const diaryEntries = await db.getDiaryEntries(7);
    const plantStatus = await db.getPlantStatus();

    const avgMood = diaryEntries.length > 0
      ? Math.round(diaryEntries.reduce((sum, e) => sum + e.mood, 0) / diaryEntries.length * 10) / 10
      : 5;

    const totalStudyMins = studySessions.reduce((sum, s) => sum + s.duration_minutes, 0);

    const summary = await gemini.getProgressSummary({
      tasksCompleted: weekTasks.length,
      studyMinutes: totalStudyMins,
      exerciseSessions: physicalLogs.length,
      streak: nofapStatus.current_streak,
      avgMood,
      weeklyPoints: plantStatus.total_points
    });

    res.json(summary);
  } catch (err) {
    console.error('AI progress summary error:', err.message);
    res.status(500).json({ error: 'Failed to generate summary. Check GEMINI_API_KEY.' });
  }
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Y4S2 dashboard running at http://localhost:${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
