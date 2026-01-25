const { GoogleGenerativeAI } = require('@google/generative-ai');

const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyC1au3aXTag-G7cucz-ie17ft44PMhcFkA';

let genAI = null;
let model = null;

function getModel() {
  if (!API_KEY) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
  }
  if (!genAI) {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }
  return model;
}

// Generate personalized motivation based on user context
async function getSmartMotivation(context) {
  const m = getModel();
  const { streak, mood, recentUrges, timeOfDay, totalPoints } = context;

  const prompt = `You are a supportive accountability coach for a university student on a self-improvement journey. Generate ONE short, powerful motivational message (2-3 sentences max) based on their current state:

- Current streak: ${streak} days
- Current mood: ${mood}/10
- Recent urges resisted: ${recentUrges}
- Time of day: ${timeOfDay}
- Total growth points: ${totalPoints}

Rules:
- Be direct, empathetic, and genuine. No generic platitudes.
- If streak is 0-2 days, be encouraging about fresh starts.
- If streak is 3-7 days, acknowledge the momentum building.
- If streak is 7+ days, celebrate the strength shown.
- If mood is low (1-4), be gentle and validating.
- If mood is high (7-10), reinforce the positive energy.
- Never be preachy or judgmental.
- Keep it under 50 words.

Respond with ONLY the motivational message, nothing else.`;

  const result = await m.generateContent(prompt);
  return result.response.text().trim();
}

// Analyze diary entries and generate insights
async function getDiaryInsights(entries) {
  const m = getModel();

  const entrySummaries = entries.map(e => ({
    date: e.entry_date,
    mood: e.mood,
    feeling: e.feeling,
    triggers: e.triggers,
    what_helped: e.what_helped,
    grateful_for: e.grateful_for
  }));

  const prompt = `You are a supportive wellness analyst for a university student. Analyze their recent diary entries and provide actionable insights.

Diary entries (most recent first):
${JSON.stringify(entrySummaries, null, 2)}

Provide a JSON response with this exact structure:
{
  "mood_trend": "improving" | "declining" | "stable",
  "average_mood": <number>,
  "patterns": ["<pattern 1>", "<pattern 2>"],
  "triggers_identified": ["<trigger 1>", "<trigger 2>"],
  "coping_strategies": ["<strategy 1>", "<strategy 2>"],
  "weekly_summary": "<2-3 sentence summary of their emotional week>",
  "recommendation": "<one specific, actionable suggestion for next week>"
}

Rules:
- Be empathetic and non-judgmental
- Focus on actionable patterns
- Keep patterns and triggers to 2-3 items max
- Make the recommendation specific and achievable
- If data is limited, acknowledge it and work with what's available

Respond with ONLY valid JSON, no markdown formatting.`;

  const result = await m.generateContent(prompt);
  const text = result.response.text().trim().replace(/```json\n?|\n?```/g, '');
  return JSON.parse(text);
}

// Suggest subtasks, priority, and category for a task
async function getTaskSuggestions(title, description, categories) {
  const m = getModel();

  const prompt = `You are a productivity assistant for a university student. Given a task, suggest how to break it down and categorize it.

Task title: "${title}"
Task description: "${description || 'No description provided'}"

Available categories: ${categories.join(', ')}

Provide a JSON response with this exact structure:
{
  "suggested_category": "<one of the available categories>",
  "suggested_priority": "Low" | "Medium" | "High",
  "suggested_subtasks": ["<subtask 1>", "<subtask 2>", "<subtask 3>"],
  "estimated_sessions": <number of 25-min study sessions needed>,
  "tips": "<one short tip for approaching this task>"
}

Rules:
- Suggest 3-5 subtasks that are specific and actionable
- Choose the most relevant category from the available list
- Base priority on academic urgency and complexity
- Keep tips under 30 words
- Be practical and student-focused

Respond with ONLY valid JSON, no markdown formatting.`;

  const result = await m.generateContent(prompt);
  const text = result.response.text().trim().replace(/```json\n?|\n?```/g, '');
  return JSON.parse(text);
}

// Generate a progress summary
async function getProgressSummary(data) {
  const m = getModel();

  const prompt = `You are a productivity coach for a university student. Generate a brief weekly progress summary.

This week's data:
- Tasks completed: ${data.tasksCompleted}
- Total study minutes: ${data.studyMinutes}
- Exercise sessions: ${data.exerciseSessions}
- Current streak: ${data.streak} days
- Average mood: ${data.avgMood}/10
- Total points earned this week: ${data.weeklyPoints}

Provide a JSON response:
{
  "grade": "A+" | "A" | "B+" | "B" | "C" | "D",
  "headline": "<5-8 word summary of the week>",
  "wins": ["<win 1>", "<win 2>"],
  "improve": ["<area to improve>"],
  "next_week_focus": "<one specific goal for next week>"
}

Rules:
- Be honest but encouraging
- Grade fairly based on activity levels
- Wins should be specific achievements
- Keep everything concise

Respond with ONLY valid JSON, no markdown formatting.`;

  const result = await m.generateContent(prompt);
  const text = result.response.text().trim().replace(/```json\n?|\n?```/g, '');
  return JSON.parse(text);
}

module.exports = {
  getSmartMotivation,
  getDiaryInsights,
  getTaskSuggestions,
  getProgressSummary
};
