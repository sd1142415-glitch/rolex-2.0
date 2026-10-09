/**
 * OmniDoc AI — User Settings & Preferences API Router
 */
const express = require('express');
const router = express.Router();
const { getDb } = require('../db');

// GET /api/settings - Retrieve saved theme and preferences
router.get('/', (req, res) => {
  try {
    const db = getDb();
    const rows = db.prepare('SELECT key, value FROM user_settings').all();
    const settings = {};
    rows.forEach(r => { settings[r.key] = r.value; });
    res.json({ success: true, settings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/settings - Save theme or preference
router.post('/', (req, res) => {
  try {
    const { key, value } = req.body;
    if (!key || value === undefined) {
      return res.status(400).json({ success: false, error: 'Key and value are required' });
    }

    const db = getDb();
    db.prepare('INSERT OR REPLACE INTO user_settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)').run(key, String(value));
    res.json({ success: true, message: `Setting '${key}' saved successfully.` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
