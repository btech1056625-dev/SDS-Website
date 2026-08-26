const { parse } = require('csv-parse/sync');
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

function computeStats(values) {
  const nums = values.filter(v => v !== null && v !== '' && !isNaN(Number(v))).map(Number);
  if (nums.length === 0) return null;
  const sorted = [...nums].sort((a, b) => a - b);
  const sum = nums.reduce((a, b) => a + b, 0);
  const mean = sum / nums.length;
  const median = sorted.length % 2 === 0
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[Math.floor(sorted.length / 2)];
  const variance = nums.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / nums.length;
  const std = Math.sqrt(variance);
  return {
    min: sorted[0],
    max: sorted[sorted.length - 1],
    mean: parseFloat(mean.toFixed(4)),
    median: parseFloat(median.toFixed(4)),
    std: parseFloat(std.toFixed(4)),
    count: nums.length
  };
}

function detectType(values) {
  const nonEmpty = values.filter(v => v !== null && v !== '');
  if (nonEmpty.length === 0) return 'empty';
  const numericCount = nonEmpty.filter(v => !isNaN(Number(v))).length;
  if (numericCount / nonEmpty.length > 0.85) return 'numeric';
  const dateCount = nonEmpty.filter(v => !isNaN(Date.parse(v))).length;
  if (dateCount / nonEmpty.length > 0.7) return 'datetime';
  return 'categorical';
}

async function analyzeCSV(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const csvText = req.file.buffer.toString('utf-8');
    const records = parse(csvText, { columns: true, skip_empty_lines: true, trim: true });

    if (records.length === 0) return res.status(400).json({ error: 'CSV is empty' });

    const columns = Object.keys(records[0]);
    const rowCount = records.length;

    // Per-column analysis
    const columnAnalysis = columns.map(col => {
      const values = records.map(r => r[col]);
      const missing = values.filter(v => v === null || v === '' || v === 'null' || v === 'NA' || v === 'N/A').length;
      const type = detectType(values);
      const stats = type === 'numeric' ? computeStats(values) : null;

      let topValues = null;
      if (type === 'categorical') {
        const freq = {};
        values.forEach(v => { if (v) freq[v] = (freq[v] || 0) + 1; });
        topValues = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([val, count]) => ({ val, count }));
      }

      return { name: col, type, missing, missingPct: parseFloat(((missing / rowCount) * 100).toFixed(1)), stats, topValues };
    });

    // Build a compact summary for Groq (avoid token bloat)
    const summaryForAI = {
      rows: rowCount,
      columns: columns.length,
      columnTypes: columnAnalysis.map(c => `${c.name}(${c.type}${c.missing > 0 ? `, ${c.missingPct}% missing` : ''})`),
      numericSummary: columnAnalysis.filter(c => c.stats).map(c => ({
        col: c.name, ...c.stats
      })),
      categoricalSummary: columnAnalysis.filter(c => c.topValues).map(c => ({
        col: c.name, topValues: c.topValues.slice(0, 3)
      }))
    };

    const prompt = `You are a senior data scientist. Analyze this dataset summary and provide actionable insights.

Dataset Summary:
${JSON.stringify(summaryForAI, null, 2)}

Respond in this EXACT JSON format (no markdown, no extra text):
{
  "title": "One-line dataset description",
  "overview": "2-3 sentence plain English overview of what this dataset contains and its potential use",
  "keyInsights": [
    "Insight 1 — specific and data-driven",
    "Insight 2",
    "Insight 3",
    "Insight 4"
  ],
  "dataQuality": {
    "score": 85,
    "issues": ["Issue 1", "Issue 2"],
    "recommendations": ["Fix 1", "Fix 2"]
  },
  "suggestedAnalyses": [
    { "name": "Analysis name", "description": "Why this would be valuable", "difficulty": "Easy" },
    { "name": "Analysis name 2", "description": "Why this would be valuable", "difficulty": "Medium" }
  ],
  "mlPotential": "Brief assessment of ML applicability — what models, what target variable, what's feasible"
}`;

    const completion = await groq.chat.completions.create({
      model: 'openai/gpt-oss-120b',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 1200
    });

    let aiAnalysis;
    try {
      const raw = completion.choices[0].message.content.trim();
      const cleaned = raw.replace(/```json|```/g, '').trim();
      aiAnalysis = JSON.parse(cleaned);
    } catch {
      aiAnalysis = { overview: completion.choices[0].message.content, keyInsights: [], dataQuality: { score: 70, issues: [], recommendations: [] }, suggestedAnalyses: [], mlPotential: '' };
    }

    res.json({
      meta: { rows: rowCount, columns: columns.length, fileName: req.file.originalname, fileSize: req.file.size },
      columnAnalysis,
      aiAnalysis
    });

  } catch (err) {
    console.error('Analysis error:', err);
    res.status(500).json({ error: err.message || 'Analysis failed' });
  }
}

module.exports = { analyzeCSV };
