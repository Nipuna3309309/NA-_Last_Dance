const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

const CATEGORIES = [
  'Internship',
  'Research Paper',
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

// Initialize database then start server
db.init().then(() => {
  console.log('Database initialized');
}).catch(err => {
  console.error('Database init error:', err);
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Y4S2 dashboard running at http://localhost:${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
