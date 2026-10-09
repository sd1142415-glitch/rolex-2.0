/**
 * OmniDoc AI — Documents REST API Router
 */
const express = require('express');
const router = express.Router();
const { getDb, resetDatabase } = require('../db');
const { detectMistakes } = require('../services/mistakeService');
const {
  generateExtractiveSummary,
  extractEntities,
  computeRiskAnalysis,
  segmentChunks
} = require('../services/nlpService');

// GET /api/documents - List all documents
router.get('/', (req, res) => {
  try {
    const db = getDb();
    const { category, risk, search, sort } = req.query;

    let query = 'SELECT * FROM documents WHERE 1=1';
    const params = [];

    if (category && category !== 'ALL') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (risk && risk !== 'ALL') {
      query += ' AND risk_level = ?';
      params.push(risk);
    }

    if (search) {
      query += ' AND (title LIKE ? OR raw_text LIKE ? OR executive_summary LIKE ?)';
      const s = `%${search}%`;
      params.push(s, s, s);
    }

    // Sort order
    if (sort === 'risk-desc') query += ' ORDER BY risk_score DESC';
    else if (sort === 'pages-desc') query += ' ORDER BY page_count DESC';
    else if (sort === 'words-desc') query += ' ORDER BY word_count DESC';
    else if (sort === 'title-asc') query += ' ORDER BY title ASC';
    else query += ' ORDER BY created_at DESC';

    const rows = db.prepare(query).all(...params);

    // Format output with mistake counts and parsed key_takeaways
    const documents = rows.map(doc => {
      const mistakes = detectMistakes(doc.raw_text);
      return {
        id: doc.id,
        title: doc.title,
        category: doc.category,
        fileFormat: doc.file_format,
        fileSizeKb: doc.file_size_kb,
        pageCount: doc.page_count,
        wordCount: doc.word_count,
        estimatedReadTimeMins: doc.estimated_read_time_mins,
        executiveSummary: doc.executive_summary,
        riskLevel: doc.risk_level,
        riskScore: doc.risk_score,
        confidenceScore: doc.confidence_score,
        keyTakeaways: doc.key_takeaways ? JSON.parse(doc.key_takeaways) : [],
        rawText: doc.raw_text,
        createdAt: doc.created_at,
        mistakesCount: mistakes.length,
        mistakes: mistakes
      };
    });

    res.json({ success: true, count: documents.length, documents });
  } catch (err) {
    console.error('Error fetching documents:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/documents/:id - Single document deep inspection
router.get('/:id', (req, res) => {
  try {
    const db = getDb();
    const doc = db.prepare('SELECT * FROM documents WHERE id = ?').get(req.params.id);

    if (!doc) {
      return res.status(404).json({ success: false, error: 'Document not found' });
    }

    // Fetch chunks
    const chunks = db.prepare('SELECT * FROM document_chunks WHERE document_id = ? ORDER BY chunk_index ASC').all(doc.id);

    // Fetch entities
    const entities = db.prepare(`
      SELECT e.id, e.name, e.entity_type, e.normalized_value, de.occurrence_count, de.context_snippet
      FROM document_entities de
      JOIN entities e ON e.id = de.entity_id
      WHERE de.document_id = ?
    `).all(doc.id);

    // Detect mistake flags in live text
    const mistakes = detectMistakes(doc.raw_text);

    res.json({
      success: true,
      document: {
        id: doc.id,
        title: doc.title,
        category: doc.category,
        fileFormat: doc.file_format,
        fileSizeKb: doc.file_size_kb,
        pageCount: doc.page_count,
        wordCount: doc.word_count,
        estimatedReadTimeMins: doc.estimated_read_time_mins,
        executiveSummary: doc.executive_summary,
        riskLevel: doc.risk_level,
        riskScore: doc.risk_score,
        confidenceScore: doc.confidence_score,
        keyTakeaways: doc.key_takeaways ? JSON.parse(doc.key_takeaways) : [],
        rawText: doc.raw_text,
        createdAt: doc.created_at,
        chunks: chunks.map(c => ({
          id: c.id,
          index: c.chunk_index,
          page: c.page_number,
          heading: c.section_heading,
          content: c.chunk_content,
          hasRisk: Boolean(c.has_risk_flag),
          rationale: c.risk_rationale
        })),
        entities: entities.map(e => ({
          id: e.id,
          name: e.name,
          type: e.entity_type,
          normalized: e.normalized_value,
          occurrences: e.occurrence_count,
          context: e.context_snippet
        })),
        mistakes
      }
    });
  } catch (err) {
    console.error('Error fetching document detail:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/documents - Ingest and auto-process new document
router.post('/', (req, res) => {
  try {
    const { title, category, rawText, fileFormat, fileSizeKb } = req.body;

    if (!title || !rawText) {
      return res.status(400).json({ success: false, error: 'Title and rawText are required' });
    }

    const words = rawText.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const pageCount = Math.max(1, Math.ceil(wordCount / 320));
    const readTimeMins = Math.round(wordCount / 200);

    // Run NLP processing
    const extractiveSentences = generateExtractiveSummary(rawText, 5);
    const execSummary = extractiveSentences.slice(0, 2).join(' ') || rawText.substring(0, 200) + '...';
    const { riskScore, riskLevel } = computeRiskAnalysis(rawText);
    const detectedEntities = extractEntities(rawText);

    const docId = `doc-${Date.now().toString().slice(-6)}`;
    const db = getDb();

    // Insert Document
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
      title.trim(),
      category || 'Legal',
      fileFormat || 'txt',
      fileSizeKb || Math.round(rawText.length / 1024) || 20,
      pageCount,
      wordCount,
      readTimeMins,
      riskLevel,
      riskScore,
      0.98,
      execSummary,
      JSON.stringify(extractiveSentences),
      rawText
    );

    // Insert Chunks
    const chunks = segmentChunks(rawText, docId);
    const insertChunk = db.prepare(`
      INSERT INTO document_chunks (
        id, document_id, chunk_index, page_number, section_heading, chunk_content, has_risk_flag, risk_rationale
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const c of chunks) {
      insertChunk.run(c.id, c.document_id, c.chunk_index, c.page_number, c.section_heading, c.chunk_content, c.has_risk_flag, c.risk_rationale);
    }

    // Insert Extracted Entities
    const insertEntity = db.prepare(`
      INSERT OR IGNORE INTO entities (id, name, entity_type, normalized_value)
      VALUES (?, ?, ?, ?)
    `);
    const insertDocEntity = db.prepare(`
      INSERT OR IGNORE INTO document_entities (document_id, entity_id, occurrence_count, context_snippet)
      VALUES (?, ?, ?, ?)
    `);

    detectedEntities.forEach((e, idx) => {
      const entId = `ent-${docId}-${idx + 1}`;
      insertEntity.run(entId, e.name, e.type, e.name.toUpperCase().replace(/\s+/g, '_'));
      insertDocEntity.run(docId, entId, 1, e.context || '');
    });

    res.status(201).json({
      success: true,
      message: 'Document successfully ingested, synthesized, and indexed.',
      documentId: docId
    });
  } catch (err) {
    console.error('Error creating document:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/documents/:id - Update document (e.g. text corrected by AI)
router.put('/:id', (req, res) => {
  try {
    const { title, rawText, category } = req.body;
    const db = getDb();
    const existing = db.prepare('SELECT * FROM documents WHERE id = ?').get(req.params.id);

    if (!existing) {
      return res.status(404).json({ success: false, error: 'Document not found' });
    }

    const updatedText = rawText !== undefined ? rawText : existing.raw_text;
    const updatedTitle = title !== undefined ? title : existing.title;
    const updatedCategory = category !== undefined ? category : existing.category;

    const words = updatedText.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const pageCount = Math.max(1, Math.ceil(wordCount / 320));
    const readTimeMins = Math.round(wordCount / 200);

    const { riskScore, riskLevel } = computeRiskAnalysis(updatedText);

    db.prepare(`
      UPDATE documents
      SET title = ?, category = ?, raw_text = ?, word_count = ?, page_count = ?,
          estimated_read_time_mins = ?, risk_score = ?, risk_level = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      updatedTitle,
      updatedCategory,
      updatedText,
      wordCount,
      pageCount,
      readTimeMins,
      riskScore,
      riskLevel,
      req.params.id
    );

    res.json({ success: true, message: 'Document updated successfully.' });
  } catch (err) {
    console.error('Error updating document:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/documents/:id - Delete document
router.delete('/:id', (req, res) => {
  try {
    const db = getDb();
    const result = db.prepare('DELETE FROM documents WHERE id = ?').run(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, error: 'Document not found' });
    }
    res.json({ success: true, message: 'Document deleted successfully.' });
  } catch (err) {
    console.error('Error deleting document:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/documents/reset - Reset to default seed corpus
router.post('/reset', (req, res) => {
  try {
    const result = resetDatabase();
    res.json(result);
  } catch (err) {
    console.error('Error resetting database:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
