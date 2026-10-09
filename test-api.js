/**
 * OmniDoc AI — Backend API Automated Validation Suite
 */
const { app, server } = require('./server');

const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('\n--- Running OmniDoc AI Backend Tests ---');
  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`✅ [PASS] ${name}`);
      passed++;
    } catch (e) {
      console.error(`❌ [FAIL] ${name}:`, e.message);
      failed++;
    }
  }

  try {
    // 1. Health check
    await test('GET /api/health', async () => {
      const res = await fetch(`${BASE_URL}/api/health`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.status !== 'UP') throw new Error('Expected status UP');
      if (typeof data.documentsIndexed !== 'number') throw new Error('Missing documentsIndexed');
    });

    // 2. Documents listing
    await test('GET /api/documents', async () => {
      const res = await fetch(`${BASE_URL}/api/documents`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!data.success || data.documents.length < 6) throw new Error('Expected at least 6 documents');
    });

    // 3. Document details
    await test('GET /api/documents/doc-101', async () => {
      const res = await fetch(`${BASE_URL}/api/documents/doc-101`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!data.document || data.document.id !== 'doc-101') throw new Error('Expected doc-101');
      if (!Array.isArray(data.document.mistakes)) throw new Error('Expected mistakes array');
    });

    // 4. Mistake detection
    await test('POST /api/mistakes/detect', async () => {
      const res = await fetch(`${BASE_URL}/api/mistakes/detect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: 'This agreemnt limits liabilty under the the terms untill thirty days.'
        })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.count < 3) throw new Error(`Expected at least 3 mistakes, got ${data.count}`);
    });

    // 5. Batch Mistake Clearing with AI
    await test('POST /api/mistakes/clear-all', async () => {
      const res = await fetch(`${BASE_URL}/api/mistakes/clear-all`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: 'The parties enter this agreemnt with capped liabilty untill 2026.'
        })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.clearedCount < 3) throw new Error(`Expected at least 3 cleared, got ${data.clearedCount}`);
      if (!data.text.includes('agreement') || !data.text.includes('liability')) {
        throw new Error('Cleaned text missing expected replacements');
      }
    });

    // 6. Mistake History
    await test('GET /api/mistakes/history', async () => {
      const res = await fetch(`${BASE_URL}/api/mistakes/history`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data.history) || data.history.length === 0) throw new Error('Expected history entries');
    });

    // 7. Synthesis Query
    await test('POST /api/synthesis/query', async () => {
      const res = await fetch(`${BASE_URL}/api/synthesis/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: 'What is our maximum liability cap and financial exposure?'
        })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!data.answer || !data.answer.includes('$2,500,000') && !data.answer.includes('liability')) {
        throw new Error('Expected synthesized answer referencing liability');
      }
    });

    // 8. SQL Studio Query Runner
    await test('POST /api/sql/query', async () => {
      const res = await fetch(`${BASE_URL}/api/sql/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: "SELECT id, title, risk_level, risk_score FROM documents WHERE risk_level = 'HIGH'"
        })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.rowCount === 0 || !data.columns.includes('risk_score')) {
        throw new Error('Expected SQL rows with risk_score');
      }
    });

    // 9. User Settings (Theme persistence)
    await test('POST & GET /api/settings', async () => {
      await fetch(`${BASE_URL}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'theme', value: 'rolex-emerald' })
      });

      const res = await fetch(`${BASE_URL}/api/settings`);
      const data = await res.json();
      if (data.settings.theme !== 'rolex-emerald') {
        throw new Error(`Expected theme rolex-emerald, got ${data.settings.theme}`);
      }
    });

    console.log(`\n--- Test Results: ${passed} Passed, ${failed} Failed ---\n`);

  } finally {
    server.close(() => {
      console.log('Test server closed.');
      process.exit(failed > 0 ? 1 : 0);
    });
  }
}

// Give server 500ms to bind, then run tests
setTimeout(runTests, 500);
