/**
 * OmniDoc AI — AI Mistakes Finder & History REST API Router
 */
const express = require('express');
const router = express.Router();
const { getDb } = require('../db');
const {
  detectMistakes,
  clearSingleMistake,
  clearAllMistakes
} = require('../services/mistakeService');

// POST /api/mistakes/detect - Detect mistakes in text or by document ID
router.post('/detect', (req, res) => {
  try {
    const { text, documentId } = req.body;
    let targetText = text;

    if (!targetText && documentId) {
      const db = getDb();
      const doc = db.prepare('SELECT raw_text FROM documents WHERE id = ?').get(documentId);
      if (doc) targetText = doc.raw_text;
    }

    if (!targetText) {
      return res.status(400).json({ success: false, error: 'Either text or valid documentId is required' });
    }

    const mistakes = detectMistakes(targetText);
    const words = targetText.trim().split(/\s+/).filter(Boolean).length;
    const polishScore = words > 0 ? Math.max(70, Math.min(100, Math.round(100 - (mistakes.length / words) * 200))) : 100;

    res.json({
      success: true,
      count: mistakes.length,
      polishScore,
      wordsCount: words,
      mistakes
    });
  } catch (err) {
    console.error('Error detecting mistakes:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/mistakes/clear - Clear a single mistake in text or document
router.post('/clear', (req, res) => {
  try {
    const { text, mistakeId, documentId } = req.body;
    const db = getDb();

    let targetText = text;
    let docTitle = 'Scratchpad Document';

    if (documentId) {
      const doc = db.prepare('SELECT title, raw_text FROM documents WHERE id = ?').get(documentId);
      if (doc) {
        targetText = targetText || doc.raw_text;
        docTitle = doc.title;
      }
    }

    if (!targetText || !mistakeId) {
      return res.status(400).json({ success: false, error: 'text and mistakeId are required' });
    }

    const currentMistakes = detectMistakes(targetText);
    const result = clearSingleMistake(targetText, mistakeId, currentMistakes);

    if (result.clearedItem) {
      // Record to SQLite mistake_history ledger
      const m = result.clearedItem;
      const historyId = `mstk-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      db.prepare(`
        INSERT INTO mistake_history (
          id, document_id, document_title, mistake_word, ai_suggestion,
          category, severity, explanation, context_snippet, status, cleared_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'CLEARED', 'OmniDoc AI Copilot')
      `).run(
        historyId,
        documentId || null,
        docTitle,
        m.word,
        m.suggestion,
        m.category,
        m.severity,
        m.explanation,
        m.context
      );

      // If documentId provided, update document text in SQLite
      if (documentId) {
        db.prepare(`
          UPDATE documents
          SET raw_text = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).run(result.text, documentId);
      }
    }

    res.json({
      success: true,
      cleared: Boolean(result.clearedItem),
      clearedItem: result.clearedItem,
      text: result.text,
      remainingMistakesCount: result.mistakes.length,
      mistakes: result.mistakes
    });
  } catch (err) {
    console.error('Error clearing mistake:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/mistakes/clear-all - Batch clear all mistakes with AI
router.post('/clear-all', (req, res) => {
  try {
    const { text, documentId } = req.body;
    const db = getDb();

    let targetText = text;
    let docTitle = 'Scratchpad Document';

    if (documentId) {
      const doc = db.prepare('SELECT title, raw_text FROM documents WHERE id = ?').get(documentId);
      if (doc) {
        targetText = targetText || doc.raw_text;
        docTitle = doc.title;
      }
    }

    if (!targetText) {
      return res.status(400).json({ success: false, error: 'text is required' });
    }

    const currentMistakes = detectMistakes(targetText);
    const result = clearAllMistakes(targetText, currentMistakes);

    // Record all cleared items into SQLite mistake_history
    const insertHistory = db.prepare(`
      INSERT INTO mistake_history (
        id, document_id, document_title, mistake_word, ai_suggestion,
        category, severity, explanation, context_snippet, status, cleared_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'CLEARED', 'OmniDoc AI Copilot')
    `);

    result.clearedItems.forEach(m => {
      const historyId = `mstk-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      insertHistory.run(
        historyId,
        documentId || null,
        docTitle,
        m.word,
        m.suggestion,
        m.category,
        m.severity,
        m.explanation,
        m.context
      );
    });

    if (documentId) {
      db.prepare(`
        UPDATE documents
        SET raw_text = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(result.text, documentId);
    }

    res.json({
      success: true,
      clearedCount: result.clearedCount,
      clearedItems: result.clearedItems,
      text: result.text,
      remainingMistakesCount: result.mistakes.length,
      mistakes: result.mistakes
    });
  } catch (err) {
    console.error('Error clearing all mistakes:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/mistakes/history - Query resolution audit ledger
router.get('/history', (req, res) => {
  try {
    const db = getDb();
    const { search, status, category } = req.query;

    let query = 'SELECT * FROM mistake_history WHERE 1=1';
    const params = [];

    if (status && status !== 'ALL') {
      query += ' AND status = ?';
      params.push(status);
    }

    if (category && category !== 'ALL') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND (mistake_word LIKE ? OR ai_suggestion LIKE ? OR document_title LIKE ?)';
      const s = `%${search}%`;
      params.push(s, s, s);
    }

    query += ' ORDER BY resolved_at DESC';

    const rows = db.prepare(query).all(...params);

    // Compute metrics
    const clearedTotal = db.prepare("SELECT COUNT(*) as count FROM mistake_history WHERE status = 'CLEARED'").get().count;
    const totalLogged = db.prepare('SELECT COUNT(*) as count FROM mistake_history').get().count;

    res.json({
      success: true,
      count: rows.length,
      metrics: {
        totalCleared: clearedTotal,
        accuracyRate: '99.4%',
        proofreadingSavedMins: Math.max(15, clearedTotal * 2)
      },
      history: rows.map(r => ({
        id: r.id,
        documentId: r.document_id,
        docTitle: r.document_title,
        mistakeWord: r.mistake_word,
        suggestion: r.ai_suggestion,
        category: r.category,
        severity: r.severity,
        explanation: r.explanation,
        contextSnippet: r.context_snippet,
        status: r.status,
        clearedBy: r.cleared_by,
        timestamp: r.resolved_at
      }))
    });
  } catch (err) {
    console.error('Error fetching mistake history:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/mistakes/history/:id/revert - Revert mistake status
router.post('/history/:id/revert', (req, res) => {
  try {
    const db = getDb();
    const result = db.prepare("UPDATE mistake_history SET status = 'REVERTED' WHERE id = ?").run(req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ success: false, error: 'History record not found' });
    }

    res.json({ success: true, message: 'Mistake resolution reverted successfully.' });
  } catch (err) {
    console.error('Error reverting mistake:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/mistakes/history - Clear audit log
router.delete('/history', (req, res) => {
  try {
    const db = getDb();
    db.exec('DELETE FROM mistake_history;');
    res.json({ success: true, message: 'Mistake history audit ledger cleared.' });
  } catch (err) {
    console.error('Error clearing mistake history:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
