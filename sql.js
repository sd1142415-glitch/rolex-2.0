/**
 * OmniDoc AI — SQL Studio Live Query Runner API Router
 */
const express = require('express');
const router = express.Router();
const path = require('node:path');
const fs = require('node:fs');
const { getDb } = require('../db');

// POST /api/sql/query - Run arbitrary SQL query against SQLite
router.post('/query', (req, res) => {
  const startTime = performance.now();
  try {
    const { query } = req.body;
    if (!query || !query.trim()) {
      return res.status(400).json({ success: false, error: 'SQL query string is required' });
    }

    const cleanQuery = query.trim();
    const db = getDb();

    // Prevent dangerous operations in query runner
    if (/^\s*(DROP|ALTER|TRUNCATE)/i.test(cleanQuery)) {
      return res.status(403).json({ success: false, error: 'Destructive DDL operations are restricted in query runner.' });
    }

    if (/^\s*(INSERT|UPDATE|DELETE)/i.test(cleanQuery)) {
      const result = db.prepare(cleanQuery).run();
      const elapsed = (performance.now() - startTime).toFixed(1);
      return res.json({
        success: true,
        type: 'DML',
        changes: result.changes,
        lastInsertRowid: String(result.lastInsertRowid),
        executionTimeMs: elapsed
      });
    }

    // Normalize double quoted literals in WHERE clauses (e.g. = "HIGH" -> = 'HIGH')
    let executableQuery = cleanQuery.replace(/(=|!=|<>|LIKE|IN)\s*"([^"]+)"/gi, "$1 '$2'");

    // Default SELECT queries
    let rows;
    try {
      rows = db.prepare(executableQuery).all();
    } catch (sqlErr) {
      // Fallback try raw query
      rows = db.prepare(cleanQuery).all();
    }
    const elapsed = (performance.now() - startTime).toFixed(1);

    const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

    res.json({
      success: true,
      columns,
      rowCount: rows.length,
      rows,
      executionTimeMs: elapsed
    });
  } catch (err) {
    console.error('SQL Execution Error:', err);
    res.status(400).json({
      success: false,
      error: err.message,
      executionTimeMs: (performance.now() - startTime).toFixed(1)
    });
  }
});

// GET /api/sql/schema - Inspect table schemas
router.get('/schema', (req, res) => {
  try {
    const db = getDb();
    const tables = db.prepare("SELECT name, sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all();
    res.json({ success: true, count: tables.length, tables });
  } catch (err) {
    console.error('Error fetching schema:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/sql/file - Return database.sql file contents
router.get('/file', (req, res) => {
  try {
    const sqlPath = path.join(__dirname, '..', 'database.sql');
    if (fs.existsSync(sqlPath)) {
      const content = fs.readFileSync(sqlPath, 'utf8');
      res.type('text/plain').send(content);
    } else {
      res.status(404).send('database.sql not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
