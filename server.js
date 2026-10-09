/**
 * OmniDoc AI — Main Express Backend Server
 * Enterprise Multi-Document Intelligence, AI Mistakes Proofreader & Synthesis Engine
 */

const express = require('express');
const cors = require('cors');
const path = require('node:path');
const fs = require('node:fs');
const multer = require('multer');

const { getDb } = require('./db');
const documentsRouter = require('./routes/documents');
const mistakesRouter = require('./routes/mistakes');
const synthesisRouter = require('./routes/synthesis');
const sqlRouter = require('./routes/sql');
const settingsRouter = require('./routes/settings');
const { generateExtractiveSummary, computeRiskAnalysis } = require('./services/nlpService');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Database
const db = getDb();

// Middleware
app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Serve frontend static assets (HTML, CSS, JS) directly from workspace root
app.use(express.static(path.join(__dirname)));

// File Upload Configuration (Multer in-memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB per file
});

// File Upload API: POST /api/upload
app.post('/api/upload', upload.array('files', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, error: 'No files uploaded.' });
    }

    const processed = [];

    for (const file of req.files) {
      const filename = Buffer.from(file.originalname, 'latin1').toString('utf8');
      const ext = path.extname(filename).toLowerCase().replace('.', '') || 'txt';
      const textContent = file.buffer.toString('utf8');

      // Infer category from filename
      let inferredCat = 'Legal';
      if (/finan|q[1-4]|revenue|budget|report|profit|balance/i.test(filename)) inferredCat = 'Financial';
      if (/iso|cyber|audit|sec|token|auth|cve/i.test(filename)) inferredCat = 'Tech & Security';
      if (/policy|gdpr|privacy|act|compliance/i.test(filename)) inferredCat = 'Policy';
      if (/clinical|trial|protocol|pharma|bio/i.test(filename)) inferredCat = 'Research';
      if (/supply|chain|logistics|sla|ops|resil/i.test(filename)) inferredCat = 'Operations';

      const title = path.basename(filename, path.extname(filename)).replace(/[-_]/g, ' ');
      const words = textContent.trim().split(/\s+/).filter(Boolean);
      const wordCount = words.length;
      const pageCount = Math.max(1, Math.ceil(wordCount / 320));
      const readTimeMins = Math.round(wordCount / 200);

      const extractive = generateExtractiveSummary(textContent, 4);
      const execSummary = extractive.slice(0, 2).join(' ') || `Uploaded document ${filename} parsed successfully.`;
      const { riskScore, riskLevel } = computeRiskAnalysis(textContent);

      const docId = `doc-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 100)}`;

      db.prepare(`
        INSERT INTO documents (
          id, title, category, file_format, file_size_kb, page_count, word_count,
          estimated_read_time_mins, risk_level, risk_score, confidence_score,
          executive_summary, key_takeaways, raw_text
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?
        )
      `).run(
        docId,
        title,
        inferredCat,
        ext,
        Math.round(file.size / 1024),
        pageCount,
        wordCount,
        readTimeMins,
        riskLevel,
        riskScore,
        0.98,
        execSummary,
        JSON.stringify(extractive),
        textContent
      );

      processed.push({ id: docId, title, category: inferredCat, wordCount, pageCount });
    }

    res.json({
      success: true,
      message: `Successfully processed and indexed ${processed.length} file(s).`,
      count: processed.length,
      documents: processed
    });
  } catch (err) {
    console.error('File Upload Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Mount Modular API Routers
app.use('/api/documents', documentsRouter);
app.use('/api/mistakes', mistakesRouter);
app.use('/api/synthesis', synthesisRouter);
app.use('/api/sql', sqlRouter);
app.use('/api/settings', settingsRouter);

// Health & System Diagnostic Endpoint: GET /api/health
app.get('/api/health', (req, res) => {
  try {
    const docCount = db.prepare('SELECT COUNT(*) as count FROM documents').get().count;
    const mistakeCount = db.prepare('SELECT COUNT(*) as count FROM mistake_history').get().count;

    res.json({
      status: 'UP',
      uptimeSecs: Math.round(process.uptime()),
      database: 'SQLite (node:sqlite)',
      version: '2.0.0',
      documentsIndexed: docCount,
      mistakesHistoryLogged: mistakeCount,
      memoryMb: Math.round(process.memoryUsage().rss / (1024 * 1024)),
      nodeVersion: process.version,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

// Root fallback to index.html
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Server Error]:', err);
  res.status(500).json({ success: false, error: 'Internal Server Error', details: err.message });
});

// Start Server
// Start Server
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log("==================================");
  console.log("🚀 OmniDoc AI Backend Server is live!");
  console.log(`URL: http://localhost:${PORT}`);
  console.log("Database: SQLite");
  console.log("==================================");
});

module.exports = { app, server };
