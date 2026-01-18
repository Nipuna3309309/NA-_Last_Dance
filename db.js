const { createClient } = require('@libsql/client/web');

// Turso database connection
const db = createClient({
  url: process.env.TURSO_DATABASE_URL || 'libsql://y4s2-nipuna3309309.aws-ap-south-1.turso.io',
  authToken: process.env.TURSO_AUTH_TOKEN || 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Njg3NDk3MTEsImlkIjoiZTgyNjAyYWMtMWRlMy00NjBkLThkYTItNGQ5YWZlYzEyY2UwIiwicmlkIjoiNTZlOWJiY2EtMzc5NS00ZTlhLTk1MWItODkzMWEzNWIxMTk5In0.3DklfUgSR1JM3VFlrEvuWDqkGg8-xX8n9GW0O6xzFDLijJrfFQtZKz1x-blpgjedkeFu78zidsX2LZH0EkEuAw'
});

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

const PLANT_LEVELS = [
  { level: 0, name: 'Seed', min: 0, max: 29 },
  { level: 1, name: 'Sprout', min: 30, max: 79 },
  { level: 2, name: 'Small Plant', min: 80, max: 149 },
  { level: 3, name: 'Bush', min: 150, max: 249 },
  { level: 4, name: 'Tree', min: 250, max: 399 },
  { level: 5, name: 'Legendary', min: 400, max: Infinity }
];

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

async function init() {
  // Main tasks table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      category TEXT,
      status TEXT,
      priority TEXT,
      due_date TEXT,
      liked INTEGER DEFAULT 0,
      remind_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);
  await db.execute('CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status)');
  await db.execute('CREATE INDEX IF NOT EXISTS idx_tasks_category ON tasks(category)');
  await db.execute('CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date)');

  // Subtasks table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS subtasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
    )
  `);
  await db.execute('CREATE INDEX IF NOT EXISTS idx_subtasks_task_id ON subtasks(task_id)');

  // Points Ledger
  await db.execute(`
    CREATE TABLE IF NOT EXISTS points_ledger (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_type TEXT NOT NULL,
      entity_id INTEGER,
      entity_type TEXT NOT NULL,
      points INTEGER NOT NULL,
      event_key TEXT UNIQUE NOT NULL,
      created_at TEXT NOT NULL
    )
  `);
  await db.execute('CREATE INDEX IF NOT EXISTS idx_points_ledger_event_key ON points_ledger(event_key)');
  await db.execute('CREATE INDEX IF NOT EXISTS idx_points_ledger_created_at ON points_ledger(created_at)');

  // Physical Logs
  await db.execute(`
    CREATE TABLE IF NOT EXISTS physical_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      exercise_type TEXT NOT NULL,
      duration_minutes INTEGER NOT NULL,
      notes TEXT,
      log_date TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);
  await db.execute('CREATE INDEX IF NOT EXISTS idx_physical_logs_log_date ON physical_logs(log_date)');

  // Study Sessions
  await db.execute(`
    CREATE TABLE IF NOT EXISTS study_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_id INTEGER,
      category TEXT,
      duration_minutes INTEGER NOT NULL,
      notes TEXT,
      session_date TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE SET NULL
    )
  `);
  await db.execute('CREATE INDEX IF NOT EXISTS idx_study_sessions_session_date ON study_sessions(session_date)');

  // Sri Lanka Holidays
  await db.execute(`
    CREATE TABLE IF NOT EXISTS sri_lanka_holidays (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      year INTEGER NOT NULL,
      month INTEGER NOT NULL,
      day INTEGER NOT NULL,
      name TEXT NOT NULL,
      type TEXT DEFAULT 'public',
      UNIQUE(year, month, day)
    )
  `);
  await db.execute('CREATE INDEX IF NOT EXISTS idx_holidays_year ON sri_lanka_holidays(year)');

  // Reminders
  await db.execute(`
    CREATE TABLE IF NOT EXISTS reminders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      entity_id INTEGER,
      entity_type TEXT,
      message TEXT NOT NULL,
      remind_at TEXT NOT NULL,
      sent INTEGER DEFAULT 0,
      created_at TEXT NOT NULL
    )
  `);
  await db.execute('CREATE INDEX IF NOT EXISTS idx_reminders_remind_at ON reminders(remind_at)');

  // Load holidays for current year if not already loaded
  const currentYear = new Date().getFullYear();
  const holidayCount = await db.execute({
    sql: 'SELECT COUNT(*) as count FROM sri_lanka_holidays WHERE year = ?',
    args: [currentYear]
  });
  if (holidayCount.rows[0].count === 0) {
    await loadHolidaysForYear(currentYear, HOLIDAYS_2025);
  }
}

async function loadHolidaysForYear(year, holidays) {
  await db.execute({ sql: 'DELETE FROM sri_lanka_holidays WHERE year = ?', args: [year] });
  for (const h of holidays) {
    await db.execute({
      sql: 'INSERT INTO sri_lanka_holidays (year, month, day, name, type) VALUES (?, ?, ?, ?, ?)',
      args: [year, h.month, h.day, h.name, h.type]
    });
  }
}

async function getTaskById(id) {
  const result = await db.execute({ sql: 'SELECT * FROM tasks WHERE id = ?', args: [id] });
  if (result.rows.length === 0) return null;
  const task = { ...result.rows[0] };
  const subtasks = await db.execute({ sql: 'SELECT * FROM subtasks WHERE task_id = ? ORDER BY id', args: [id] });
  task.subtasks = subtasks.rows;
  return task;
}

async function getTasks(filters) {
  let sql = 'SELECT * FROM tasks';
  const where = [];
  const args = [];

  if (filters.search) {
    where.push('(title LIKE ? OR description LIKE ?)');
    args.push(`%${filters.search}%`, `%${filters.search}%`);
  }
  if (filters.category) {
    where.push('category = ?');
    args.push(filters.category);
  }
  if (filters.status) {
    where.push('status = ?');
    args.push(filters.status);
  }
  if (filters.priority) {
    where.push('priority = ?');
    args.push(filters.priority);
  }
  if (filters.liked) {
    where.push('liked = 1');
  }
  if (filters.due && filters.due !== 'all') {
    const today = new Date().toISOString().slice(0, 10);
    if (filters.due === 'today') {
      where.push('due_date = ?');
      args.push(today);
    }
    if (filters.due === 'overdue') {
      where.push('(due_date < ? AND due_date IS NOT NULL AND due_date != "")');
      args.push(today);
    }
  }

  if (where.length) {
    sql += ` WHERE ${where.join(' AND ')}`;
  }
  sql += ' ORDER BY liked DESC, updated_at DESC';

  const result = await db.execute({ sql, args });
  const tasks = [];

  for (const row of result.rows) {
    const task = { ...row };
    const subtasks = await db.execute({ sql: 'SELECT * FROM subtasks WHERE task_id = ? ORDER BY id', args: [row.id] });
    task.subtasks = subtasks.rows;
    tasks.push(task);
  }

  return tasks;
}

async function createTask(data) {
  const now = new Date().toISOString();
  const result = await db.execute({
    sql: `INSERT INTO tasks (title, description, category, status, priority, due_date, liked, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [data.title, data.description || '', data.category, data.status, data.priority, data.due_date || null, data.liked || 0, now, now]
  });
  return await getTaskById(Number(result.lastInsertRowid));
}

async function updateTask(id, updates) {
  const currentTask = await getTaskById(id);
  if (!currentTask) return null;

  const fields = [];
  const args = [];

  for (const key of ['title', 'description', 'category', 'status', 'priority', 'due_date', 'liked', 'remind_at']) {
    if (updates[key] !== undefined) {
      fields.push(`${key} = ?`);
      args.push(updates[key]);
    }
  }

  if (!fields.length) return await getTaskById(id);

  const now = new Date().toISOString();
  fields.push('updated_at = ?');
  args.push(now);
  args.push(id);

  await db.execute({ sql: `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`, args });

  if (updates.status === 'Done' && currentTask.status !== 'Done') {
    await awardPoints('task_done', id, 'task', 10, `task_done_${id}`);
    await awardDailyStreakBonus();
  }

  return await getTaskById(id);
}

async function deleteTask(id) {
  const result = await db.execute({ sql: 'DELETE FROM tasks WHERE id = ?', args: [id] });
  return result.rowsAffected > 0;
}

async function createSubtask(taskId, title) {
  const now = new Date().toISOString();
  const result = await db.execute({
    sql: 'INSERT INTO subtasks (task_id, title, completed, created_at) VALUES (?, ?, 0, ?)',
    args: [taskId, title, now]
  });
  await db.execute({ sql: 'UPDATE tasks SET updated_at = ? WHERE id = ?', args: [now, taskId] });
  const subtask = await db.execute({ sql: 'SELECT * FROM subtasks WHERE id = ?', args: [Number(result.lastInsertRowid)] });
  return subtask.rows[0];
}

async function updateSubtask(id, updates) {
  const existing = await db.execute({ sql: 'SELECT * FROM subtasks WHERE id = ?', args: [id] });
  if (existing.rows.length === 0) return null;
  const subtask = existing.rows[0];

  const fields = [];
  const args = [];

  if (updates.title !== undefined) {
    fields.push('title = ?');
    args.push(updates.title);
  }
  if (updates.completed !== undefined) {
    fields.push('completed = ?');
    args.push(updates.completed ? 1 : 0);
  }

  if (!fields.length) return subtask;

  args.push(id);
  await db.execute({ sql: `UPDATE subtasks SET ${fields.join(', ')} WHERE id = ?`, args });

  const now = new Date().toISOString();
  await db.execute({ sql: 'UPDATE tasks SET updated_at = ? WHERE id = ?', args: [now, subtask.task_id] });

  if (updates.completed && !subtask.completed) {
    await awardPoints('subtask_done', id, 'subtask', 3, `subtask_done_${id}`);
    await awardDailyStreakBonus();
  }

  const updated = await db.execute({ sql: 'SELECT * FROM subtasks WHERE id = ?', args: [id] });
  return updated.rows[0];
}

async function deleteSubtask(id) {
  const existing = await db.execute({ sql: 'SELECT * FROM subtasks WHERE id = ?', args: [id] });
  if (existing.rows.length === 0) return false;
  const subtask = existing.rows[0];

  const result = await db.execute({ sql: 'DELETE FROM subtasks WHERE id = ?', args: [id] });
  if (result.rowsAffected > 0) {
    const now = new Date().toISOString();
    await db.execute({ sql: 'UPDATE tasks SET updated_at = ? WHERE id = ?', args: [now, subtask.task_id] });
  }
  return result.rowsAffected > 0;
}

async function getSubtasks(taskId) {
  const result = await db.execute({ sql: 'SELECT * FROM subtasks WHERE task_id = ? ORDER BY id', args: [taskId] });
  return result.rows;
}

async function exportTasks() {
  const result = await db.execute('SELECT * FROM tasks ORDER BY id');
  const tasks = [];
  for (const row of result.rows) {
    const task = { ...row };
    const subtasks = await db.execute({ sql: 'SELECT * FROM subtasks WHERE task_id = ? ORDER BY id', args: [row.id] });
    task.subtasks = subtasks.rows;
    tasks.push(task);
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

async function importTasks(tasks) {
  await db.execute('DELETE FROM subtasks');
  await db.execute('DELETE FROM tasks');

  let count = 0;
  for (const row of tasks) {
    if (!row || !row.title) continue;
    const normalized = normalizeTask(row);

    let taskId;
    if (row.id) {
      await db.execute({
        sql: `INSERT INTO tasks (id, title, description, category, status, priority, due_date, liked, created_at, updated_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [row.id, normalized.title, normalized.description, normalized.category, normalized.status, normalized.priority, normalized.due_date, normalized.liked, normalized.created_at, normalized.updated_at]
      });
      taskId = row.id;
    } else {
      const result = await db.execute({
        sql: `INSERT INTO tasks (title, description, category, status, priority, due_date, liked, created_at, updated_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [normalized.title, normalized.description, normalized.category, normalized.status, normalized.priority, normalized.due_date, normalized.liked, normalized.created_at, normalized.updated_at]
      });
      taskId = Number(result.lastInsertRowid);
    }

    if (Array.isArray(row.subtasks)) {
      for (const subtask of row.subtasks) {
        if (subtask && subtask.title) {
          await db.execute({
            sql: 'INSERT INTO subtasks (task_id, title, completed, created_at) VALUES (?, ?, ?, ?)',
            args: [taskId, subtask.title, subtask.completed ? 1 : 0, subtask.created_at || new Date().toISOString()]
          });
        }
      }
    }
    count += 1;
  }
  return count;
}

async function awardPoints(eventType, entityId, entityType, points, eventKey) {
  try {
    await db.execute({
      sql: `INSERT OR IGNORE INTO points_ledger (event_type, entity_id, entity_type, points, event_key, created_at)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [eventType, entityId, entityType, points, eventKey, new Date().toISOString()]
    });
    return true;
  } catch (err) {
    return false;
  }
}

async function awardDailyStreakBonus() {
  const today = new Date().toISOString().slice(0, 10);
  const eventKey = `streak_bonus_${today}`;
  return await awardPoints('streak_bonus', null, 'daily', 5, eventKey);
}

async function getPointsToday() {
  const today = new Date().toISOString().slice(0, 10);
  const result = await db.execute({
    sql: `SELECT COALESCE(SUM(points), 0) as total FROM points_ledger WHERE date(created_at) = ?`,
    args: [today]
  });
  return Number(result.rows[0].total);
}

async function getPointsThisWeek() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  const weekStart = monday.toISOString().slice(0, 10);

  const result = await db.execute({
    sql: `SELECT COALESCE(SUM(points), 0) as total FROM points_ledger WHERE date(created_at) >= ?`,
    args: [weekStart]
  });
  return Number(result.rows[0].total);
}

async function getTotalPoints() {
  const result = await db.execute('SELECT COALESCE(SUM(points), 0) as total FROM points_ledger');
  return Number(result.rows[0].total);
}

function getPlantLevel(totalPoints) {
  for (const level of PLANT_LEVELS) {
    if (totalPoints >= level.min && totalPoints <= level.max) {
      return level;
    }
  }
  return PLANT_LEVELS[PLANT_LEVELS.length - 1];
}

async function getPlantStatus() {
  const totalPoints = await getTotalPoints();
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
    todayPoints: await getPointsToday(),
    weekPoints: await getPointsThisWeek(),
    streak: await calculateCombinedStreak()
  };
}

async function getPointsHistory(days = 14) {
  const result = await db.execute({
    sql: `SELECT date(created_at) as date, event_type, SUM(points) as points
          FROM points_ledger WHERE date(created_at) >= date('now', ?)
          GROUP BY date(created_at), event_type ORDER BY date(created_at) DESC`,
    args: [`-${days} days`]
  });

  const dateMap = {};
  for (const row of result.rows) {
    if (!dateMap[row.date]) {
      dateMap[row.date] = { date: row.date, points: 0, sources: {} };
    }
    dateMap[row.date].points += Number(row.points);
    dateMap[row.date].sources[row.event_type] = Number(row.points);
  }

  return Object.values(dateMap).sort((a, b) => b.date.localeCompare(a.date));
}

async function calculateCombinedStreak() {
  const result = await db.execute(`
    SELECT DISTINCT date(created_at) as date FROM points_ledger
    WHERE event_type IN ('task_done', 'subtask_done', 'study_session', 'physical')
    ORDER BY date DESC
  `);

  const activityDates = result.rows.map(r => r.date);
  if (activityDates.length === 0) return 0;

  let streak = 0;
  const today = new Date().toISOString().slice(0, 10);
  let checkDate = new Date(today);

  const hasToday = activityDates.includes(today);
  if (!hasToday) {
    checkDate.setDate(checkDate.getDate() - 1);
  }

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

async function getPhysicalLogs(filters = {}) {
  let sql = 'SELECT * FROM physical_logs';
  const where = [];
  const args = [];

  if (filters.from) {
    where.push('log_date >= ?');
    args.push(filters.from);
  }
  if (filters.to) {
    where.push('log_date <= ?');
    args.push(filters.to);
  }
  if (filters.exercise_type) {
    where.push('exercise_type = ?');
    args.push(filters.exercise_type);
  }

  if (where.length) {
    sql += ` WHERE ${where.join(' AND ')}`;
  }
  sql += ' ORDER BY log_date DESC, created_at DESC';

  const result = await db.execute({ sql, args });
  return result.rows;
}

async function getPhysicalLogById(id) {
  const result = await db.execute({ sql: 'SELECT * FROM physical_logs WHERE id = ?', args: [id] });
  return result.rows[0] || null;
}

async function createPhysicalLog(data) {
  const now = new Date().toISOString();
  const result = await db.execute({
    sql: `INSERT INTO physical_logs (exercise_type, duration_minutes, notes, log_date, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?)`,
    args: [data.exercise_type, data.duration_minutes, data.notes || '', data.log_date, now, now]
  });

  const log = await getPhysicalLogById(Number(result.lastInsertRowid));

  const points = Math.floor(data.duration_minutes / 5);
  if (points > 0) {
    await awardPoints('physical', log.id, 'physical_log', points, `physical_${log.id}`);
  }
  await awardDailyStreakBonus();

  return log;
}

async function updatePhysicalLog(id, updates) {
  const fields = [];
  const args = [];

  if (updates.exercise_type !== undefined) {
    fields.push('exercise_type = ?');
    args.push(updates.exercise_type);
  }
  if (updates.duration_minutes !== undefined) {
    fields.push('duration_minutes = ?');
    args.push(updates.duration_minutes);
  }
  if (updates.notes !== undefined) {
    fields.push('notes = ?');
    args.push(updates.notes);
  }
  if (updates.log_date !== undefined) {
    fields.push('log_date = ?');
    args.push(updates.log_date);
  }

  if (!fields.length) return await getPhysicalLogById(id);

  fields.push('updated_at = ?');
  args.push(new Date().toISOString());
  args.push(id);

  const result = await db.execute({ sql: `UPDATE physical_logs SET ${fields.join(', ')} WHERE id = ?`, args });
  if (result.rowsAffected === 0) return null;

  return await getPhysicalLogById(id);
}

async function deletePhysicalLog(id) {
  const result = await db.execute({ sql: 'DELETE FROM physical_logs WHERE id = ?', args: [id] });
  return result.rowsAffected > 0;
}

async function getStudySessions(filters = {}) {
  let sql = 'SELECT * FROM study_sessions';
  const where = [];
  const args = [];

  if (filters.from) {
    where.push('session_date >= ?');
    args.push(filters.from);
  }
  if (filters.to) {
    where.push('session_date <= ?');
    args.push(filters.to);
  }
  if (filters.category) {
    where.push('category = ?');
    args.push(filters.category);
  }
  if (filters.task_id) {
    where.push('task_id = ?');
    args.push(filters.task_id);
  }

  if (where.length) {
    sql += ` WHERE ${where.join(' AND ')}`;
  }
  sql += ' ORDER BY session_date DESC, created_at DESC';

  const result = await db.execute({ sql, args });
  return result.rows;
}

async function getStudySessionById(id) {
  const result = await db.execute({ sql: 'SELECT * FROM study_sessions WHERE id = ?', args: [id] });
  return result.rows[0] || null;
}

async function createStudySession(data) {
  const now = new Date().toISOString();
  const result = await db.execute({
    sql: `INSERT INTO study_sessions (task_id, category, duration_minutes, notes, session_date, created_at)
          VALUES (?, ?, ?, ?, ?, ?)`,
    args: [data.task_id || null, data.category || null, data.duration_minutes, data.notes || '', data.session_date, now]
  });

  const session = await getStudySessionById(Number(result.lastInsertRowid));

  const points = Math.floor(data.duration_minutes / 10);
  if (points > 0) {
    await awardPoints('study_session', session.id, 'study_session', points, `study_session_${session.id}`);
  }
  await awardDailyStreakBonus();

  return session;
}

async function updateStudySession(id, updates) {
  const fields = [];
  const args = [];

  if (updates.task_id !== undefined) {
    fields.push('task_id = ?');
    args.push(updates.task_id);
  }
  if (updates.category !== undefined) {
    fields.push('category = ?');
    args.push(updates.category);
  }
  if (updates.duration_minutes !== undefined) {
    fields.push('duration_minutes = ?');
    args.push(updates.duration_minutes);
  }
  if (updates.notes !== undefined) {
    fields.push('notes = ?');
    args.push(updates.notes);
  }
  if (updates.session_date !== undefined) {
    fields.push('session_date = ?');
    args.push(updates.session_date);
  }

  if (!fields.length) return await getStudySessionById(id);

  args.push(id);
  const result = await db.execute({ sql: `UPDATE study_sessions SET ${fields.join(', ')} WHERE id = ?`, args });
  if (result.rowsAffected === 0) return null;

  return await getStudySessionById(id);
}

async function deleteStudySession(id) {
  const result = await db.execute({ sql: 'DELETE FROM study_sessions WHERE id = ?', args: [id] });
  return result.rowsAffected > 0;
}

async function getCalendarData(year, month) {
  const holidays = await db.execute({
    sql: `SELECT day, name, type FROM sri_lanka_holidays WHERE year = ? AND month = ? ORDER BY day`,
    args: [year, month]
  });

  const monthStart = `${year}-${String(month).padStart(2, '0')}-01`;
  const monthEnd = `${year}-${String(month).padStart(2, '0')}-31`;

  const studyDays = await db.execute({
    sql: `SELECT CAST(strftime('%d', updated_at) AS INTEGER) as day, COUNT(*) as count
          FROM tasks WHERE status = 'Done' AND date(updated_at) >= ? AND date(updated_at) <= ?
          GROUP BY strftime('%d', updated_at)`,
    args: [monthStart, monthEnd]
  });

  const sessionDays = await db.execute({
    sql: `SELECT CAST(strftime('%d', session_date) AS INTEGER) as day, COUNT(*) as count
          FROM study_sessions WHERE date(session_date) >= ? AND date(session_date) <= ?
          GROUP BY strftime('%d', session_date)`,
    args: [monthStart, monthEnd]
  });

  const studyMap = {};
  for (const d of studyDays.rows) {
    studyMap[d.day] = (studyMap[d.day] || 0) + Number(d.count);
  }
  for (const d of sessionDays.rows) {
    studyMap[d.day] = (studyMap[d.day] || 0) + Number(d.count);
  }
  const mergedStudyDays = Object.entries(studyMap).map(([day, count]) => ({ day: parseInt(day), count }));

  const exerciseDays = await db.execute({
    sql: `SELECT CAST(strftime('%d', log_date) AS INTEGER) as day, COUNT(*) as count
          FROM physical_logs WHERE date(log_date) >= ? AND date(log_date) <= ?
          GROUP BY strftime('%d', log_date)`,
    args: [monthStart, monthEnd]
  });

  return {
    holidays: holidays.rows,
    studyDays: mergedStudyDays,
    exerciseDays: exerciseDays.rows
  };
}

async function getHolidays(year) {
  const result = await db.execute({
    sql: 'SELECT month, day, name, type FROM sri_lanka_holidays WHERE year = ? ORDER BY month, day',
    args: [year]
  });
  return result.rows;
}

async function getReminders(filters = {}) {
  let sql = 'SELECT * FROM reminders';
  const where = [];
  const args = [];

  if (filters.pending) {
    where.push('sent = 0');
  }
  if (filters.type) {
    where.push('type = ?');
    args.push(filters.type);
  }

  if (where.length) {
    sql += ` WHERE ${where.join(' AND ')}`;
  }
  sql += ' ORDER BY remind_at ASC';

  const result = await db.execute({ sql, args });
  return result.rows;
}

async function getReminderById(id) {
  const result = await db.execute({ sql: 'SELECT * FROM reminders WHERE id = ?', args: [id] });
  return result.rows[0] || null;
}

async function createReminder(data) {
  const now = new Date().toISOString();
  const result = await db.execute({
    sql: `INSERT INTO reminders (type, entity_id, entity_type, message, remind_at, sent, created_at)
          VALUES (?, ?, ?, ?, ?, 0, ?)`,
    args: [data.type, data.entity_id || null, data.entity_type || null, data.message, data.remind_at, now]
  });
  return await getReminderById(Number(result.lastInsertRowid));
}

async function updateReminder(id, updates) {
  const fields = [];
  const args = [];

  if (updates.remind_at !== undefined) {
    fields.push('remind_at = ?');
    args.push(updates.remind_at);
  }
  if (updates.sent !== undefined) {
    fields.push('sent = ?');
    args.push(updates.sent ? 1 : 0);
  }
  if (updates.message !== undefined) {
    fields.push('message = ?');
    args.push(updates.message);
  }

  if (!fields.length) return await getReminderById(id);

  args.push(id);
  const result = await db.execute({ sql: `UPDATE reminders SET ${fields.join(', ')} WHERE id = ?`, args });
  if (result.rowsAffected === 0) return null;

  return await getReminderById(id);
}

async function deleteReminder(id) {
  const result = await db.execute({ sql: 'DELETE FROM reminders WHERE id = ?', args: [id] });
  return result.rowsAffected > 0;
}

async function getDueReminders() {
  const now = new Date().toISOString();
  const result = await db.execute({
    sql: 'SELECT * FROM reminders WHERE sent = 0 AND remind_at <= ? ORDER BY remind_at ASC',
    args: [now]
  });
  return result.rows;
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
  awardPoints,
  awardDailyStreakBonus,
  getPointsToday,
  getPointsThisWeek,
  getTotalPoints,
  getPlantStatus,
  getPointsHistory,
  calculateCombinedStreak,
  getPhysicalLogs,
  getPhysicalLogById,
  createPhysicalLog,
  updatePhysicalLog,
  deletePhysicalLog,
  getStudySessions,
  getStudySessionById,
  createStudySession,
  updateStudySession,
  deleteStudySession,
  getCalendarData,
  getHolidays,
  loadHolidaysForYear,
  getReminders,
  getReminderById,
  createReminder,
  updateReminder,
  deleteReminder,
  getDueReminders,
  EXERCISE_TYPES,
  PLANT_LEVELS,
  CATEGORIES,
  STATUSES,
  PRIORITIES
};
