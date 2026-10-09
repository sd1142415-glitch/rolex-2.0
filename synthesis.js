/**
 * OmniDoc AI — Multi-Document Knowledge Synthesis & Query API Router
 */
const express = require('express');
const router = express.Router();
const { getDb } = require('../db');
const { synthesizeQuery } = require('../services/nlpService');

// POST /api/synthesis/query - Natural language cross-document synthesis
router.post('/query', (req, res) => {
  const startTime = performance.now();
  try {
    const { query } = req.body;
    if (!query || !query.trim()) {
      return res.status(400).json({ success: false, error: 'Query parameter is required' });
    }

    const db = getDb();
    const documents = db.prepare('SELECT id, title, category, executive_summary, risk_level, risk_score, raw_text FROM documents').all();

    const synthesisResult = synthesizeQuery(query.trim(), documents);
    const elapsed = Math.round((performance.now() - startTime) * 10) / 10;

    // Log query to SQLite query_history
    const queryId = `qry-${Date.now().toString().slice(-6)}`;
    db.prepare(`
      INSERT INTO query_history (id, natural_query, synthesized_answer, referenced_doc_count, execution_time_ms)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      queryId,
      query.trim(),
      synthesisResult.answer,
      synthesisResult.citations.length,
      elapsed
    );

    res.json({
      success: true,
      query: query.trim(),
      answer: synthesisResult.answer,
      citations: synthesisResult.citations,
      confidence: synthesisResult.confidence,
      executionTimeMs: elapsed
    });
  } catch (err) {
    console.error('Error executing synthesis query:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/synthesis/compare - Cross-document comparative matrix
router.post('/compare', (req, res) => {
  try {
    const { documentIds } = req.body;
    if (!documentIds || !Array.isArray(documentIds) || documentIds.length === 0) {
      return res.status(400).json({ success: false, error: 'Array of documentIds is required' });
    }

    const db = getDb();
    const placeholders = documentIds.map(() => '?').join(',');
    const docs = db.prepare(`SELECT * FROM documents WHERE id IN (${placeholders})`).all(...documentIds);

    const matrix = {
      documents: docs.map(d => ({
        id: d.id,
        title: d.title,
        category: d.category,
        riskLevel: d.risk_level,
        riskScore: d.risk_score,
        pageCount: d.page_count,
        wordCount: d.word_count,
        executiveSummary: d.executive_summary,
        keyTakeaways: d.key_takeaways ? JSON.parse(d.key_takeaways) : []
      })),
      dimensions: [
        {
          dimension: 'Primary Purpose',
          values: docs.map(d => ({ docId: d.id, value: d.executive_summary }))
        },
        {
          dimension: 'Volume & Reading Time Saved',
          values: docs.map(d => ({ docId: d.id, value: `${d.page_count} Pages (${(d.word_count || 0).toLocaleString()} words), ~${d.estimated_read_time_mins} mins saved` }))
        },
        {
          dimension: 'Risk Level & Scoring',
          values: docs.map(d => ({ docId: d.id, value: `${d.risk_level} (${d.risk_score} / 10)` }))
        }
      ]
    };

    res.json({ success: true, count: docs.length, matrix });
  } catch (err) {
    console.error('Error comparing documents:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
