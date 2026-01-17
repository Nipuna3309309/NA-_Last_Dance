const path = require('path');
const fs = require('fs');
const { DatabaseSync } = require('node:sqlite');

// Use cloud persistent storage if available, otherwise use local
// Azure: /home/data, Fly.io: /data, Glitch: .data, Local: current dir
const dataDir = process.env.WEBSITE_SITE_NAME
  ? path.join(process.env.HOME, 'data')  // Azure App Service
  : fs.existsSync('/data')
    ? '/data'                              // Fly.io volume
    : fs.existsSync('.data')
      ? '.data'                            // Glitch
      : __dirname;                         // Local
const dbPath = path.join(dataDir, 'y4s2.db');
let db;

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
const EXERCISE_TYPES = ['Walking', 'Running', 'Cycling', 'Gym', 'Yoga', 'Swimming', 'Other'];

// Plant level definitions
const PLANT_LEVELS = [
  { level: 0, name: 'Seed', min: 0, max: 29 },
  { level: 1, name: 'Sprout', min: 30, max: 79 },
  { level: 2, name: 'Small Plant', min: 80, max: 149 },
  { level: 3, name: 'Bush', min: 150, max: 249 },
  { level: 4, name: 'Tree', min: 250, max: 399 },
  { level: 5, name: 'Legendary', min: 400, max: Infinity }
];

// Sri Lanka Holidays 2025
const HOLIDAYS_2025 = [
  { month: 1, day: 13, name: 'Duruthu Full Moon Poya Day', type: 'poya' },
  { month: 1, day: 14, name: 'Tamil Thai Pongal Day', type: 'public' },
  { month: 2, day: 4, name: 'National Day', type: 'public' },
  { month: 2, day: 12, name: 'Navam Full Moon Poya Day', type: 'poya' },
  { month: 2, day: 26, name: 'Mahasivarathri Day', type: 'public' },
  { month: 3, day: 13, name: 'Medin Full Moon Poya Day', type: 'poya' },
  { month: 3, day: 30, name: 'Eid-ul-Fitr', type: 'public' },
  { month: 4, day: 12, name: 'Bak Full Moon Poya Day', type: 'poya' },
  { month: 4, day: 13, name: 'Day Prior to Sinhala & Tamil New Year', type: 'public' },
  { month: 4, day: 14, name: 'Sinhala & Tamil New Year Day', type: 'public' },
  { month: 4, day: 18, name: 'Good Friday', type: 'public' },
  { month: 5, day: 1, name: 'May Day', type: 'public' },
  { month: 5, day: 12, name: 'Vesak Full Moon Poya Day', type: 'poya' },
  { month: 5, day: 13, name: 'Day Following Vesak', type: 'public' },
  { month: 6, day: 6, name: 'Eid-ul-Adha', type: 'public' },
  { month: 6, day: 10, name: 'Poson Full Moon Poya Day', type: 'poya' },
  { month: 7, day: 10, name: 'Esala Full Moon Poya Day', type: 'poya' },
  { month: 8, day: 8, name: 'Nikini Full Moon Poya Day', type: 'poya' },
  { month: 9, day: 5, name: 'Milad-Un-Nabi', type: 'public' },
  { month: 9, day: 7, name: 'Binara Full Moon Poya Day', type: 'poya' },
  { month: 10, day: 6, name: 'Vap Full Moon Poya Day', type: 'poya' },
  { month: 10, day: 20, name: 'Deepavali Festival Day', type: 'public' },
  { month: 11, day: 5, name: 'Il Full Moon Poya Day', type: 'poya' },
  { month: 12, day: 4, name: 'Unduvap Full Moon Poya Day', type: 'poya' },
  { month: 12, day: 25, name: 'Christmas Day', type: 'public' }
];

function init() {
  // Ensure data directory exists (for Azure persistent storage)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  db = new DatabaseSync(dbPath);
  db.exec('PRAGMA journal_mode = WAL');

  // Main tasks table with liked column
  db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      category TEXT,
      status TEXT,
      priority TEXT,
      due_date TEXT,
      liked INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
    CREATE INDEX IF NOT EXISTS idx_tasks_category ON tasks(category);
    CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
  `);

  // Add liked column if it doesn't exist (for existing databases)
  try {
    db.exec('ALTER TABLE tasks ADD COLUMN liked INTEGER DEFAULT 0');
  } catch (e) {
    // Column already exists
  }

  // Subtasks table
  db.exec(`
    CREATE TABLE IF NOT EXISTS subtasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_subtasks_task_id ON subtasks(task_id);
  `);

  // Add remind_at column to tasks if it doesn't exist
  try {
    db.exec('ALTER TABLE tasks ADD COLUMN remind_at TEXT');
  } catch (e) {
    // Column already exists
  }

  // Points Ledger - anti-cheat core for gamification
  db.exec(`
    CREATE TABLE IF NOT EXISTS points_ledger (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_type TEXT NOT NULL,
      entity_id INTEGER,
      entity_type TEXT NOT NULL,
      points INTEGER NOT NULL,
      event_key TEXT UNIQUE NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_points_ledger_event_key ON points_ledger(event_key);
    CREATE INDEX IF NOT EXISTS idx_points_ledger_created_at ON points_ledger(created_at);
    CREATE INDEX IF NOT EXISTS idx_points_ledger_event_type ON points_ledger(event_type);
  `);

  // Physical Logs - exercise tracking
  db.exec(`
    CREATE TABLE IF NOT EXISTS physical_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      exercise_type TEXT NOT NULL,
      duration_minutes INTEGER NOT NULL,
      notes TEXT,
      log_date TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_physical_logs_log_date ON physical_logs(log_date);
  `);

  // Study Sessions - optional study time tracking
  db.exec(`
    CREATE TABLE IF NOT EXISTS study_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_id INTEGER,
      category TEXT,
      duration_minutes INTEGER NOT NULL,
      notes TEXT,
      session_date TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE SET NULL
    );
    CREATE INDEX IF NOT EXISTS idx_study_sessions_session_date ON study_sessions(session_date);
    CREATE INDEX IF NOT EXISTS idx_study_sessions_task_id ON study_sessions(task_id);
  `);

  // Sri Lanka Holidays
  db.exec(`
    CREATE TABLE IF NOT EXISTS sri_lanka_holidays (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      year INTEGER NOT NULL,
      month INTEGER NOT NULL,
      day INTEGER NOT NULL,
      name TEXT NOT NULL,
      type TEXT DEFAULT 'public',
      UNIQUE(year, month, day)
    );
    CREATE INDEX IF NOT EXISTS idx_holidays_year ON sri_lanka_holidays(year);
  `);

  // Reminders
  db.exec(`
    CREATE TABLE IF NOT EXISTS reminders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      entity_id INTEGER,
      entity_type TEXT,
      message TEXT NOT NULL,
      remind_at TEXT NOT NULL,
      sent INTEGER DEFAULT 0,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_reminders_remind_at ON reminders(remind_at);
    CREATE INDEX IF NOT EXISTS idx_reminders_sent ON reminders(sent);
  `);

  // Load holidays for current year if not already loaded
  const currentYear = new Date().getFullYear();
  const holidayCount = db.prepare('SELECT COUNT(*) as count FROM sri_lanka_holidays WHERE year = ?').get(currentYear);
  if (holidayCount.count === 0) {
    loadHolidaysForYear(currentYear, HOLIDAYS_2025);
  }
}

// Load holidays for a specific year
function loadHolidaysForYear(year, holidays) {
  db.prepare('DELETE FROM sri_lanka_holidays WHERE year = ?').run(year);
  const insert = db.prepare(`
    INSERT INTO sri_lanka_holidays (year, month, day, name, type)
    VALUES (@year, @month, @day, @name, @type)
  `);
  for (const h of holidays) {
    insert.run({ year, ...h });
  }
}

function getTaskById(id) {
  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  if (task) {
    task.subtasks = db.prepare('SELECT * FROM subtasks WHERE task_id = ? ORDER BY id').all(id);
  }
  return task;
}

function getTasks(filters) {
  let sql = 'SELECT * FROM tasks';
  const where = [];
  const params = {};

  if (filters.search) {
    where.push('(title LIKE @search OR description LIKE @search)');
    params.search = `%${filters.search}%`;
  }
  if (filters.category) {
    where.push('category = @category');
    params.category = filters.category;
  }
  if (filters.status) {
    where.push('status = @status');
    params.status = filters.status;
  }
  if (filters.priority) {
    where.push('priority = @priority');
    params.priority = filters.priority;
  }
  if (filters.liked) {
    where.push('liked = 1');
  }
  if (filters.due && filters.due !== 'all') {
    const today = new Date().toISOString().slice(0, 10);
    params.today = today;
    if (filters.due === 'today') {
      where.push('due_date = @today');
    }
    if (filters.due === 'overdue') {
      where.push('(due_date < @today AND due_date IS NOT NULL AND due_date != "")');
    }
  }

  if (where.length) {
    sql += ` WHERE ${where.join(' AND ')}`;
  }
  sql += ' ORDER BY liked DESC, updated_at DESC';

  const tasks = db.prepare(sql).all(params);

  // Fetch subtasks for each task
  const subtaskStmt = db.prepare('SELECT * FROM subtasks WHERE task_id = ? ORDER BY id');
  for (const task of tasks) {
    task.subtasks = subtaskStmt.all(task.id);
  }

  return tasks;
}

function createTask(data) {
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO tasks (title, description, category, status, priority, due_date, liked, created_at, updated_at)
    VALUES (@title, @description, @category, @status, @priority, @due_date, @liked, @created_at, @updated_at)
  `);
  const info = stmt.run({
    title: data.title,
    description: data.description || '',
    category: data.category,
    status: data.status,
    priority: data.priority,
    due_date: data.due_date || null,
    liked: data.liked || 0,
    created_at: now,
    updated_at: now
  });
  return getTaskById(info.lastInsertRowid);
}

function updateTask(id, updates) {
  // Get current task to check for status change
  const currentTask = getTaskById(id);
  if (!currentTask) return null;

  const fields = [];
  const params = { id };

  for (const key of ['title', 'description', 'category', 'status', 'priority', 'due_date', 'liked', 'remind_at']) {
    if (updates[key] !== undefined) {
      fields.push(`${key} = @${key}`);
      params[key] = updates[key];
    }
  }

  if (!fields.length) return getTaskById(id);

  params.updated_at = new Date().toISOString();
  fields.push('updated_at = @updated_at');

  const stmt = db.prepare(`UPDATE tasks SET ${fields.join(', ')} WHERE id = @id`);
  const info = stmt.run(params);
  if (!info.changes) return null;

  // Award points if status changed TO 'Done' (anti-cheat: only once per task)
  if (updates.status === 'Done' && currentTask.status !== 'Done') {
    awardPoints('task_done', id, 'task', 10, `task_done_${id}`);
    awardDailyStreakBonus();
  }

  return getTaskById(id);
}

function deleteTask(id) {
  // Subtasks are deleted automatically via CASCADE
  return db.prepare('DELETE FROM tasks WHERE id = ?').run(id).changes > 0;
}

// Subtask functions
function createSubtask(taskId, title) {
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO subtasks (task_id, title, completed, created_at)
    VALUES (@task_id, @title, 0, @created_at)
  `);
  const info = stmt.run({
    task_id: taskId,
    title: title,
    created_at: now
  });

  // Update parent task's updated_at
  db.prepare('UPDATE tasks SET updated_at = ? WHERE id = ?').run(now, taskId);

  return db.prepare('SELECT * FROM subtasks WHERE id = ?').get(info.lastInsertRowid);
}

function updateSubtask(id, updates) {
  const subtask = db.prepare('SELECT * FROM subtasks WHERE id = ?').get(id);
  if (!subtask) return null;

  const fields = [];
  const params = { id };

  if (updates.title !== undefined) {
    fields.push('title = @title');
    params.title = updates.title;
  }
  if (updates.completed !== undefined) {
    fields.push('completed = @completed');
    params.completed = updates.completed ? 1 : 0;
  }

  if (!fields.length) return subtask;

  db.prepare(`UPDATE subtasks SET ${fields.join(', ')} WHERE id = @id`).run(params);

  // Update parent task's updated_at
  const now = new Date().toISOString();
  db.prepare('UPDATE tasks SET updated_at = ? WHERE id = ?').run(now, subtask.task_id);

  // Award points if subtask changed TO completed (anti-cheat: only once per subtask)
  if (updates.completed && !subtask.completed) {
    awardPoints('subtask_done', id, 'subtask', 3, `subtask_done_${id}`);
    awardDailyStreakBonus();
  }

  return db.prepare('SELECT * FROM subtasks WHERE id = ?').get(id);
}

function deleteSubtask(id) {
  const subtask = db.prepare('SELECT * FROM subtasks WHERE id = ?').get(id);
  if (!subtask) return false;

  const result = db.prepare('DELETE FROM subtasks WHERE id = ?').run(id).changes > 0;

  if (result) {
    const now = new Date().toISOString();
    db.prepare('UPDATE tasks SET updated_at = ? WHERE id = ?').run(now, subtask.task_id);
  }

  return result;
}

function getSubtasks(taskId) {
  return db.prepare('SELECT * FROM subtasks WHERE task_id = ? ORDER BY id').all(taskId);
}

function exportTasks() {
  const tasks = db.prepare('SELECT * FROM tasks ORDER BY id').all();
  const subtaskStmt = db.prepare('SELECT * FROM subtasks WHERE task_id = ? ORDER BY id');
  for (const task of tasks) {
    task.subtasks = subtaskStmt.all(task.id);
  }
  return tasks;
}

function normalizeTask(task) {
  const now = new Date().toISOString();
  return {
    title: String(task.title || '').trim(),
    description: task.description || '',
    category: CATEGORIES.includes(task.category) ? task.category : 'Internship',
    status: STATUSES.includes(task.status) ? task.status : 'Not Started',
    priority: PRIORITIES.includes(task.priority) ? task.priority : 'Medium',
    due_date: task.due_date || null,
    liked: task.liked ? 1 : 0,
    created_at: task.created_at || now,
    updated_at: task.updated_at || now
  };
}

function importTasks(tasks) {
  const insertWithId = db.prepare(`
    INSERT INTO tasks (id, title, description, category, status, priority, due_date, liked, created_at, updated_at)
    VALUES (@id, @title, @description, @category, @status, @priority, @due_date, @liked, @created_at, @updated_at)
  `);
  const insertNoId = db.prepare(`
    INSERT INTO tasks (title, description, category, status, priority, due_date, liked, created_at, updated_at)
    VALUES (@title, @description, @category, @status, @priority, @due_date, @liked, @created_at, @updated_at)
  `);
  const insertSubtask = db.prepare(`
    INSERT INTO subtasks (task_id, title, completed, created_at)
    VALUES (@task_id, @title, @completed, @created_at)
  `);

  let count = 0;
  db.exec('BEGIN');
  try {
    db.prepare('DELETE FROM subtasks').run();
    db.prepare('DELETE FROM tasks').run();

    for (const row of tasks) {
      if (!row || !row.title) continue;
      const normalized = normalizeTask(row);
      let taskId;

      if (row.id) {
        insertWithId.run({ id: row.id, ...normalized });
        taskId = row.id;
      } else {
        const info = insertNoId.run(normalized);
        taskId = info.lastInsertRowid;
      }

      // Import subtasks
      if (Array.isArray(row.subtasks)) {
        for (const subtask of row.subtasks) {
          if (subtask && subtask.title) {
            insertSubtask.run({
              task_id: taskId,
              title: subtask.title,
              completed: subtask.completed ? 1 : 0,
              created_at: subtask.created_at || new Date().toISOString()
            });
          }
        }
      }

      count += 1;
    }

    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }

  return count;
}

// === POINTS SYSTEM ===

// Award points with anti-cheat (INSERT OR IGNORE for unique event_key)
function awardPoints(eventType, entityId, entityType, points, eventKey) {
  try {
    const stmt = db.prepare(`
      INSERT OR IGNORE INTO points_ledger (event_type, entity_id, entity_type, points, event_key, created_at)
      VALUES (@event_type, @entity_id, @entity_type, @points, @event_key, @created_at)
    `);
    const info = stmt.run({
      event_type: eventType,
      entity_id: entityId,
      entity_type: entityType,
      points: points,
      event_key: eventKey,
      created_at: new Date().toISOString()
    });
    return info.changes > 0; // True if points were actually awarded (not duplicate)
  } catch (err) {
    return false;
  }
}

// Award daily streak bonus (+5) on first activity of the day
function awardDailyStreakBonus() {
  const today = new Date().toISOString().slice(0, 10);
  const eventKey = `streak_bonus_${today}`;
  return awardPoints('streak_bonus', null, 'daily', 5, eventKey);
}

// Get points earned today
function getPointsToday() {
  const today = new Date().toISOString().slice(0, 10);
  const result = db.prepare(`
    SELECT COALESCE(SUM(points), 0) as total
    FROM points_ledger
    WHERE date(created_at) = ?
  `).get(today);
  return result.total;
}

// Get points earned this week (Monday to Sunday)
function getPointsThisWeek() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  const weekStart = monday.toISOString().slice(0, 10);

  const result = db.prepare(`
    SELECT COALESCE(SUM(points), 0) as total
    FROM points_ledger
    WHERE date(created_at) >= ?
  `).get(weekStart);
  return result.total;
}

// Get total points ever earned
function getTotalPoints() {
  const result = db.prepare('SELECT COALESCE(SUM(points), 0) as total FROM points_ledger').get();
  return result.total;
}

// Calculate current plant level from total points
function getPlantLevel(totalPoints) {
  for (const level of PLANT_LEVELS) {
    if (totalPoints >= level.min && totalPoints <= level.max) {
      return level;
    }
  }
  return PLANT_LEVELS[PLANT_LEVELS.length - 1];
}

// Get full plant status
function getPlantStatus() {
  const totalPoints = getTotalPoints();
  const level = getPlantLevel(totalPoints);
  const nextLevel = PLANT_LEVELS[level.level + 1];

  let pointsToNextLevel = 0;
  let progressPercent = 100;

  if (nextLevel) {
    pointsToNextLevel = nextLevel.min - totalPoints;
    const levelRange = level.max - level.min + 1;
    const pointsInLevel = totalPoints - level.min;
    progressPercent = Math.round((pointsInLevel / levelRange) * 100);
  }

  return {
    totalPoints,
    currentLevel: level.level,
    levelName: level.name,
    pointsToNextLevel,
    progressPercent,
    todayPoints: getPointsToday(),
    weekPoints: getPointsThisWeek(),
    streak: calculateCombinedStreak()
  };
}

// Get points history for last N days
function getPointsHistory(days = 14) {
  const history = [];
  const stmt = db.prepare(`
    SELECT
      date(created_at) as date,
      event_type,
      SUM(points) as points
    FROM points_ledger
    WHERE date(created_at) >= date('now', ?)
    GROUP BY date(created_at), event_type
    ORDER BY date(created_at) DESC
  `);

  const rows = stmt.all(`-${days} days`);

  // Group by date
  const dateMap = {};
  for (const row of rows) {
    if (!dateMap[row.date]) {
      dateMap[row.date] = { date: row.date, points: 0, sources: {} };
    }
    dateMap[row.date].points += row.points;
    dateMap[row.date].sources[row.event_type] = row.points;
  }

  return Object.values(dateMap).sort((a, b) => b.date.localeCompare(a.date));
}

// Calculate combined streak (study + physical activity)
function calculateCombinedStreak() {
  // Get all unique dates with any activity
  const activityDates = db.prepare(`
    SELECT DISTINCT date(created_at) as date FROM points_ledger
    WHERE event_type IN ('task_done', 'subtask_done', 'study_session', 'physical')
    ORDER BY date DESC
  `).all().map(r => r.date);

  if (activityDates.length === 0) return 0;

  let streak = 0;
  const today = new Date().toISOString().slice(0, 10);
  let checkDate = new Date(today);

  // Check if today has activity, if not check yesterday
  const hasToday = activityDates.includes(today);
  if (!hasToday) {
    checkDate.setDate(checkDate.getDate() - 1);
  }

  // Count consecutive days
  for (let i = 0; i < 365; i++) {
    const dateStr = checkDate.toISOString().slice(0, 10);
    if (activityDates.includes(dateStr)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

// === PHYSICAL LOGS ===

function getPhysicalLogs(filters = {}) {
  let sql = 'SELECT * FROM physical_logs';
  const where = [];
  const params = {};

  if (filters.from) {
    where.push('log_date >= @from');
    params.from = filters.from;
  }
  if (filters.to) {
    where.push('log_date <= @to');
    params.to = filters.to;
  }
  if (filters.exercise_type) {
    where.push('exercise_type = @exercise_type');
    params.exercise_type = filters.exercise_type;
  }

  if (where.length) {
    sql += ` WHERE ${where.join(' AND ')}`;
  }
  sql += ' ORDER BY log_date DESC, created_at DESC';

  return db.prepare(sql).all(params);
}

function getPhysicalLogById(id) {
  return db.prepare('SELECT * FROM physical_logs WHERE id = ?').get(id);
}

function createPhysicalLog(data) {
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO physical_logs (exercise_type, duration_minutes, notes, log_date, created_at, updated_at)
    VALUES (@exercise_type, @duration_minutes, @notes, @log_date, @created_at, @updated_at)
  `);
  const info = stmt.run({
    exercise_type: data.exercise_type,
    duration_minutes: data.duration_minutes,
    notes: data.notes || '',
    log_date: data.log_date,
    created_at: now,
    updated_at: now
  });

  const log = getPhysicalLogById(info.lastInsertRowid);

  // Award points: 1 point per 5 minutes
  const points = Math.floor(data.duration_minutes / 5);
  if (points > 0) {
    awardPoints('physical', log.id, 'physical_log', points, `physical_${log.id}`);
  }

  // Award daily streak bonus on first activity
  awardDailyStreakBonus();

  return log;
}

function updatePhysicalLog(id, updates) {
  const fields = [];
  const params = { id };

  if (updates.exercise_type !== undefined) {
    fields.push('exercise_type = @exercise_type');
    params.exercise_type = updates.exercise_type;
  }
  if (updates.duration_minutes !== undefined) {
    fields.push('duration_minutes = @duration_minutes');
    params.duration_minutes = updates.duration_minutes;
  }
  if (updates.notes !== undefined) {
    fields.push('notes = @notes');
    params.notes = updates.notes;
  }
  if (updates.log_date !== undefined) {
    fields.push('log_date = @log_date');
    params.log_date = updates.log_date;
  }

  if (!fields.length) return getPhysicalLogById(id);

  params.updated_at = new Date().toISOString();
  fields.push('updated_at = @updated_at');

  const stmt = db.prepare(`UPDATE physical_logs SET ${fields.join(', ')} WHERE id = @id`);
  const info = stmt.run(params);
  if (!info.changes) return null;

  return getPhysicalLogById(id);
}

function deletePhysicalLog(id) {
  return db.prepare('DELETE FROM physical_logs WHERE id = ?').run(id).changes > 0;
}

// === STUDY SESSIONS ===

function getStudySessions(filters = {}) {
  let sql = 'SELECT * FROM study_sessions';
  const where = [];
  const params = {};

  if (filters.from) {
    where.push('session_date >= @from');
    params.from = filters.from;
  }
  if (filters.to) {
    where.push('session_date <= @to');
    params.to = filters.to;
  }
  if (filters.category) {
    where.push('category = @category');
    params.category = filters.category;
  }
  if (filters.task_id) {
    where.push('task_id = @task_id');
    params.task_id = filters.task_id;
  }

  if (where.length) {
    sql += ` WHERE ${where.join(' AND ')}`;
  }
  sql += ' ORDER BY session_date DESC, created_at DESC';

  return db.prepare(sql).all(params);
}

function getStudySessionById(id) {
  return db.prepare('SELECT * FROM study_sessions WHERE id = ?').get(id);
}

function createStudySession(data) {
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO study_sessions (task_id, category, duration_minutes, notes, session_date, created_at)
    VALUES (@task_id, @category, @duration_minutes, @notes, @session_date, @created_at)
  `);
  const info = stmt.run({
    task_id: data.task_id || null,
    category: data.category || null,
    duration_minutes: data.duration_minutes,
    notes: data.notes || '',
    session_date: data.session_date,
    created_at: now
  });

  const session = getStudySessionById(info.lastInsertRowid);

  // Award points: 1 point per 10 minutes
  const points = Math.floor(data.duration_minutes / 10);
  if (points > 0) {
    awardPoints('study_session', session.id, 'study_session', points, `study_session_${session.id}`);
  }

  // Award daily streak bonus on first activity
  awardDailyStreakBonus();

  return session;
}

function updateStudySession(id, updates) {
  const fields = [];
  const params = { id };

  if (updates.task_id !== undefined) {
    fields.push('task_id = @task_id');
    params.task_id = updates.task_id;
  }
  if (updates.category !== undefined) {
    fields.push('category = @category');
    params.category = updates.category;
  }
  if (updates.duration_minutes !== undefined) {
    fields.push('duration_minutes = @duration_minutes');
    params.duration_minutes = updates.duration_minutes;
  }
  if (updates.notes !== undefined) {
    fields.push('notes = @notes');
    params.notes = updates.notes;
  }
  if (updates.session_date !== undefined) {
    fields.push('session_date = @session_date');
    params.session_date = updates.session_date;
  }

  if (!fields.length) return getStudySessionById(id);

  const stmt = db.prepare(`UPDATE study_sessions SET ${fields.join(', ')} WHERE id = @id`);
  const info = stmt.run(params);
  if (!info.changes) return null;

  return getStudySessionById(id);
}

function deleteStudySession(id) {
  return db.prepare('DELETE FROM study_sessions WHERE id = ?').run(id).changes > 0;
}

// === CALENDAR ===

function getCalendarData(year, month) {
  // Get holidays for the month
  const holidays = db.prepare(`
    SELECT day, name, type FROM sri_lanka_holidays
    WHERE year = ? AND month = ?
    ORDER BY day
  `).all(year, month);

  // Get study activity days (tasks marked done in this month)
  const monthStart = `${year}-${String(month).padStart(2, '0')}-01`;
  const monthEnd = `${year}-${String(month).padStart(2, '0')}-31`;

  const studyDays = db.prepare(`
    SELECT
      CAST(strftime('%d', updated_at) AS INTEGER) as day,
      COUNT(*) as count
    FROM tasks
    WHERE status = 'Done'
      AND date(updated_at) >= ? AND date(updated_at) <= ?
    GROUP BY strftime('%d', updated_at)
  `).all(monthStart, monthEnd);

  // Add study sessions
  const sessionDays = db.prepare(`
    SELECT
      CAST(strftime('%d', session_date) AS INTEGER) as day,
      COUNT(*) as count
    FROM study_sessions
    WHERE date(session_date) >= ? AND date(session_date) <= ?
    GROUP BY strftime('%d', session_date)
  `).all(monthStart, monthEnd);

  // Merge study counts
  const studyMap = {};
  for (const d of studyDays) {
    studyMap[d.day] = (studyMap[d.day] || 0) + d.count;
  }
  for (const d of sessionDays) {
    studyMap[d.day] = (studyMap[d.day] || 0) + d.count;
  }
  const mergedStudyDays = Object.entries(studyMap).map(([day, count]) => ({ day: parseInt(day), count }));

  // Get exercise activity days
  const exerciseDays = db.prepare(`
    SELECT
      CAST(strftime('%d', log_date) AS INTEGER) as day,
      COUNT(*) as count
    FROM physical_logs
    WHERE date(log_date) >= ? AND date(log_date) <= ?
    GROUP BY strftime('%d', log_date)
  `).all(monthStart, monthEnd);

  return {
    holidays,
    studyDays: mergedStudyDays,
    exerciseDays
  };
}

function getHolidays(year) {
  return db.prepare('SELECT month, day, name, type FROM sri_lanka_holidays WHERE year = ? ORDER BY month, day').all(year);
}

// === REMINDERS ===

function getReminders(filters = {}) {
  let sql = 'SELECT * FROM reminders';
  const where = [];
  const params = {};

  if (filters.pending) {
    where.push('sent = 0');
  }
  if (filters.type) {
    where.push('type = @type');
    params.type = filters.type;
  }

  if (where.length) {
    sql += ` WHERE ${where.join(' AND ')}`;
  }
  sql += ' ORDER BY remind_at ASC';

  return db.prepare(sql).all(params);
}

function getReminderById(id) {
  return db.prepare('SELECT * FROM reminders WHERE id = ?').get(id);
}

function createReminder(data) {
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO reminders (type, entity_id, entity_type, message, remind_at, sent, created_at)
    VALUES (@type, @entity_id, @entity_type, @message, @remind_at, 0, @created_at)
  `);
  const info = stmt.run({
    type: data.type,
    entity_id: data.entity_id || null,
    entity_type: data.entity_type || null,
    message: data.message,
    remind_at: data.remind_at,
    created_at: now
  });

  return getReminderById(info.lastInsertRowid);
}

function updateReminder(id, updates) {
  const fields = [];
  const params = { id };

  if (updates.remind_at !== undefined) {
    fields.push('remind_at = @remind_at');
    params.remind_at = updates.remind_at;
  }
  if (updates.sent !== undefined) {
    fields.push('sent = @sent');
    params.sent = updates.sent ? 1 : 0;
  }
  if (updates.message !== undefined) {
    fields.push('message = @message');
    params.message = updates.message;
  }

  if (!fields.length) return getReminderById(id);

  const stmt = db.prepare(`UPDATE reminders SET ${fields.join(', ')} WHERE id = @id`);
  const info = stmt.run(params);
  if (!info.changes) return null;

  return getReminderById(id);
}

function deleteReminder(id) {
  return db.prepare('DELETE FROM reminders WHERE id = ?').run(id).changes > 0;
}

// Get pending reminders that are due
function getDueReminders() {
  const now = new Date().toISOString();
  return db.prepare(`
    SELECT * FROM reminders
    WHERE sent = 0 AND remind_at <= ?
    ORDER BY remind_at ASC
  `).all(now);
}

module.exports = {
  init,
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  createSubtask,
  updateSubtask,
  deleteSubtask,
  getSubtasks,
  exportTasks,
  importTasks,
  // Points system
  awardPoints,
  awardDailyStreakBonus,
  getPointsToday,
  getPointsThisWeek,
  getTotalPoints,
  getPlantStatus,
  getPointsHistory,
  calculateCombinedStreak,
  // Physical logs
  getPhysicalLogs,
  getPhysicalLogById,
  createPhysicalLog,
  updatePhysicalLog,
  deletePhysicalLog,
  // Study sessions
  getStudySessions,
  getStudySessionById,
  createStudySession,
  updateStudySession,
  deleteStudySession,
  // Calendar
  getCalendarData,
  getHolidays,
  loadHolidaysForYear,
  // Reminders
  getReminders,
  getReminderById,
  createReminder,
  updateReminder,
  deleteReminder,
  getDueReminders,
  // Constants
  EXERCISE_TYPES,
  PLANT_LEVELS,
  CATEGORIES,
  STATUSES,
  PRIORITIES
};
