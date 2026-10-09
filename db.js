/**
 * OmniDoc AI — SQLite Relational Database Engine
 * Utilizes Node.js built-in `node:sqlite` for high performance, zero-dependency storage.
 */
const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');
const fs = require('node:fs');

const DB_FILE = process.env.DB_PATH || path.join(__dirname, 'omnidoc.db');
let dbInstance = null;

function getDb() {
  if (!dbInstance) {
    dbInstance = new DatabaseSync(DB_FILE);
    dbInstance.exec('PRAGMA foreign_keys = ON;');
    dbInstance.exec('PRAGMA journal_mode = WAL;');
    initSchema(dbInstance);
  }
  return dbInstance;
}

function initSchema(db) {
  // 1. Documents Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS documents (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      file_format TEXT DEFAULT 'pdf',
      file_size_kb INTEGER DEFAULT 250,
      page_count INTEGER NOT NULL,
      word_count INTEGER NOT NULL,
      estimated_read_time_mins INTEGER,
      executive_summary TEXT,
      risk_level TEXT DEFAULT 'LOW',
      risk_score REAL DEFAULT 1.0,
      confidence_score REAL DEFAULT 0.98,
      raw_text TEXT NOT NULL,
      key_takeaways TEXT, -- JSON array
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Document Chunks Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS document_chunks (
      id TEXT PRIMARY KEY,
      document_id TEXT NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
      chunk_index INTEGER NOT NULL,
      page_number INTEGER DEFAULT 1,
      section_heading TEXT,
      chunk_content TEXT NOT NULL,
      has_risk_flag INTEGER DEFAULT 0,
      risk_rationale TEXT
    );
  `);

  // 3. Entities Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS entities (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      normalized_value TEXT
    );
  `);

  // 4. Document Entities Junction
  db.exec(`
    CREATE TABLE IF NOT EXISTS document_entities (
      document_id TEXT NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
      entity_id TEXT NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
      occurrence_count INTEGER DEFAULT 1,
      context_snippet TEXT,
      PRIMARY KEY (document_id, entity_id)
    );
  `);

  // 5. Query History
  db.exec(`
    CREATE TABLE IF NOT EXISTS query_history (
      id TEXT PRIMARY KEY,
      natural_query TEXT NOT NULL,
      synthesized_answer TEXT NOT NULL,
      referenced_doc_count INTEGER DEFAULT 1,
      execution_time_ms REAL DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 6. Mistake History Ledger
  db.exec(`
    CREATE TABLE IF NOT EXISTS mistake_history (
      id TEXT PRIMARY KEY,
      document_id TEXT REFERENCES documents(id) ON DELETE SET NULL,
      document_title TEXT NOT NULL,
      mistake_word TEXT NOT NULL,
      ai_suggestion TEXT NOT NULL,
      category TEXT NOT NULL,
      severity TEXT DEFAULT 'MEDIUM',
      explanation TEXT,
      context_snippet TEXT,
      status TEXT DEFAULT 'CLEARED',
      cleared_by TEXT DEFAULT 'OmniDoc AI Copilot',
      resolved_at TEXT DEFAULT CURRENT_TIMESTAMP,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 7. User Settings (Themes & Accents)
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed default data if documents table is empty
  const countRow = db.prepare('SELECT COUNT(*) as count FROM documents').get();
  if (countRow.count === 0) {
    seedDefaultCorpus(db);
  }
}

function seedDefaultCorpus(db) {
  console.log('[OmniDoc DB] Seeding default enterprise documents into SQLite...');

  // Default Corpus Seed Data
  const SEED_DOCS = [
    {
      id: 'doc-101',
      title: 'Master Cloud Services & SLA Framework Agreement',
      category: 'Legal',
      file_format: 'pdf',
      file_size_kb: 420,
      page_count: 28,
      word_count: 8900,
      estimated_read_time_mins: 45,
      risk_level: 'HIGH',
      risk_score: 8.5,
      confidence_score: 0.99,
      executive_summary: 'Comprehensive enterprise SaaS vendor agreement establishing uptime commitments (99.95%), uncapped liability for data breach indemnification, and liquidated damages of 25% monthly fees for extended outages exceeding 4 hours. Includes strict 30-day termination notice requirements and mandatory Delaware arbitration venue.',
      key_takeaways: JSON.stringify([
        'Service Level Agreement mandates 99.95% monthly uptime with automatic service credit penalties',
        'CRITICAL RISK: Section 14 leaves indemnification for confidential data breaches UNCAPPED',
        'Outages exceeding 4 consecutive hours entitle Customer to immediate termination without penalty',
        'Standard liability cap is limited to $2,500,000 or 12 months fees paid',
        'Disputes subject to binding commercial arbitration in Delaware under AAA rules'
      ]),
      raw_text: `MASTER CLOUD SERVICES AGREEMENT (DRAFT FOR REVIEW)
BETWEEN: Apex Global Inc. (Customer) AND CyberTech Hosting Ltd. (Supplier)
EFFECTIVE DATE: October 1, 2024.

1. SERVICE LEVEL COMMITMENTS & PENALTY CREDITS
Supplier guarantees that the production environment will achieve 99.95% monthly uptime, untill scheduled maintenance. In the event uptime falls below 99.0%, Customer shall recieve a 25% credit on monthly fees. Continuous outages exceeding four (4) hours trigger emergency termintion rights without penality.

2. INDEMNIFICATION & LIABILITY LIMITS
Except for willful misconduct or IP infringement, cumulative liabilty under this agreemnt shall not exceed $2,500,000. NOTWITHSTANDING ANYTHING TO THE CONTRARY, LIABILTY FOR BREACHES OF CONFIDENCIAL DATA REMAINS UNCAPPED.

3. REMEDIES & DISPUTE RESOLUTION
Either party may terminate under the the terms of this agreemnt upon thirty (30) days notice. In the event of material brech that occured during deployment, the parties shall arbitrate in Delaware across seperate venues.`
    },
    {
      id: 'doc-102',
      title: 'Q3 2024 Consolidated Financial Performance Review',
      category: 'Financial',
      file_format: 'pdf',
      file_size_kb: 680,
      page_count: 42,
      word_count: 14200,
      estimated_read_time_mins: 71,
      risk_level: 'LOW',
      risk_score: 1.8,
      confidence_score: 0.98,
      executive_summary: 'Third quarter corporate financial disclosures highlighting $142.8 million gross revenues (+18.4% YoY growth) and 27.6% operating profit margins. Operating income reached $39.4 million with zero long-term debt maturing prior to 2026. The Board approved a $50 million share repurchase authorization for H2 execution.',
      key_takeaways: JSON.stringify([
        'Consolidated gross revenues hit $142.8 million (+18.4% YoY growth)',
        'Operating margins expanded to 27.6% with $39.4 million operating income',
        'Board approved $50 million share repurchase program for H2 execution',
        'Robust liquidity buffer of $88.4 million with zero debt maturities until November 2026',
        'R&D budget reallocated: 35% dedicated to enterprise GenAI workflow synthesis'
      ]),
      raw_text: `CONSOLIDATED FINANCIAL REVIEW — THIRD QUARTER 2024
Issued by: Global Finance & Investor Strategy Committee
Date: September 30, 2024.

1. EXECUTIVE SUMMARY & REVENUE ACCELERATION
The company registered top-line revenue of $142.8 millon in Q3 2024, representing an 18.4% year-over-year surge compared to $120.6 millon in Q3 2023. Annual Recurring Revenue (ARR) crossed $510 millon with net retention rate stabilizing at 116%. Expansion was predominantly catalyzed by enterprise accounts expanding usage of automated document synthesis and data pipelines.

2. PROFITABILITY & CASH FLOW GENERATION
Operating income reached $39.4 millon, establishing an operating margin of 27.6%. Gross margins held steady at 74.2% despite elevated GPU infrastructure hosting expenses. Free cash flow came in at $31.2 millon, reflecting an exceptional 89% net-income-to-cash conversion ratio. Operating expenditures included $24.1 millon in R&D investments that occured during H1.

3. BALANCE SHEET & CAPITAL ALLOCATION
Cash, cash equivalents, and marketable securities totaled $88.4 millon at quarter end. Long-term debt obligations stand at fourty-five millon with zero maturities occurring prior to November 2026. The Board of Directors has unanimously authorized a new $50 millon common stock repurchase program, to be executed strategically over the upcoming 12 months.`
    },
    {
      id: 'doc-103',
      title: 'ISO/IEC 27001:2022 Security Audit & Remediation Matrix',
      category: 'Tech & Security',
      file_format: 'pdf',
      file_size_kb: 520,
      page_count: 34,
      word_count: 11200,
      estimated_read_time_mins: 56,
      risk_level: 'MEDIUM',
      risk_score: 5.8,
      confidence_score: 0.97,
      executive_summary: 'Annual comprehensive cybersecurity certification audit covering 93 Annex A control requirements. 88 controls achieved full compliance (94.6% compliance score). Four minor non-conformities discovered in automated credential rotation and legacy staging API endpoints. One high-priority observation issued regarding contractor token expiration lifecycle. Remediation deadline is set for November 15, 2024.',
      key_takeaways: JSON.stringify([
        '88 of 93 controls fully compliant (94.6% certification compliance rating)',
        'Zero critical perimeter vulnerabilities identified during automated penetration testing',
        'HIGH PRIORITY FINDING: Third-party vendor tokens need automated 30-day revocation',
        'Strict remediation deadline: November 15, 2024 (45-day window)',
        'MFA enforcement confirmed across 100% of internal staff and cloud infrastructure'
      ]),
      raw_text: `INFORMATION SECURITY AUDIT REPORT: ISO/IEC 27001:2022
Prepared by: Apex Cyber Defense & Compliance Assessor Team
Assessment Period: September 2024.

1. SCOPE AND METHODOLOGY
The scope of this audit encompassed cloud infrastructure, continuous deployment CI/CD pipelines, physical workstation controls, cryptographic key management, and incident response readiness across all corporate subsidiaries to verify full complience.

2. SUMMARY OF AUDIT FINDINGS
Out of ninety-three (93) evaluated controls under ISO/IEC 27001:2022 Annex A:
- 88 Controls: FULLY COMPLIANT
- 4 Controls: MINOR NON-CONFORMITY (Control A.8.9 Configuration Management, Control A.8.24 Use of Cryptography)
- 1 Control: HIGH PRIORITY OBSERVATION (Control A.5.21 Managing Information Security in the ICT Supply Chain). Routine maintainance was delayed.

3. HIGH PRIORITY REMEDIATION REQUIREMENT
Third-party suplier contractor credentials currently do not enforce automated 30-day credential revocation upon contract completion. Security Operations must deploy automated Just-In-Time (JIT) access provisioning and automated token invalidation. All corrective actions must be submitted to the accreditation body no later than November 15, 2024.`
    },
    {
      id: 'doc-104',
      title: 'Global Data Privacy & Cross-Border AI Transfer Policy (EU AI Act & GDPR)',
      category: 'Policy',
      file_format: 'pdf',
      file_size_kb: 310,
      page_count: 19,
      word_count: 6400,
      estimated_read_time_mins: 32,
      risk_level: 'HIGH',
      risk_score: 7.9,
      confidence_score: 0.96,
      executive_summary: 'Enterprise governance directive governing machine learning model deployments, automated reasoning pipelines, and cross-border personal data transfers under GDPR and the EU AI Act. Strictly forbids unmonitored autonomous decision systems without human-in-the-loop oversight. Cross-border transfers require binding Standard Contractual Clauses (SCCs). Fines reach up to 35,000,000 EUR or 7% of worldwide turnover.',
      key_takeaways: JSON.stringify([
        'Mandatory human-in-the-loop review mechanism for all high-risk automated decision models',
        'Strict statutory penalty exposure: Fines up to 35,000,000 EUR or 7% of worldwide annual revenue',
        'Mandatory encryption in transit and at rest using AES-256 with customer-managed keys',
        'Quarterly algorithmic bias audits and model transparency registers required',
        'Immediate 72-hour regulatory notification mandatory in case of unauthorized personal data access'
      ]),
      raw_text: `ENTERPRISE DATA PRIVACY & ARTIFICIAL INTELLIGENCE POLICY
Document Reference: POL-PRIV-AI-2024.
Applicability: Global Operations, European Economic Area (EEA), US & APAC Divisions.

SECTION 1: HIGH-RISK AI SYSTEM GOVERNANCE
In accordance with the European Union Artificial Intelligence Act (EU AI Act), any machine learning model deployed to categorize, evaluate, or process personal data must be cataloged in the Enterprise Model Registry. High-risk models are prohibited from making automated binding determinations without an authorized human auditor reviewing flagged anomalies.

SECTION 2: CROSS-BORDER DATA TRANSFERS & ENCRYPTION
Personal data collected within the EEA must not be transmitted outside the EU without active Standard Contractual Clauses (SCCs) and verified Transfer Impact Assessments (TIAs). All stored documents and vector representations must enforce AES-256 encryption at rest and TLS 1.3 in transit.

SECTION 3: STATUTORY NON-COMPLIANCE EXPOSURES
Violations of prohibited AI practices or severe GDPR security breaches carry statuatory maximum penalties of up to 35,000,000 EUR or 7% of the total worldwide annual turnover of the preceding financial year, whichever is higher. Any suspected breach must trigger executive escalation within 72 hours.`
    },
    {
      id: 'doc-105',
      title: 'Phase III Clinical Trial Protocol Beta-9 (BioPharm Oncology)',
      category: 'Research',
      file_format: 'pdf',
      file_size_kb: 890,
      page_count: 55,
      word_count: 18600,
      estimated_read_time_mins: 93,
      risk_level: 'MEDIUM',
      risk_score: 4.8,
      confidence_score: 0.99,
      executive_summary: 'Multicenter double-blind randomized clinical trial protocol evaluating therapeutic efficacy and toxicity of target inhibitor BP-901 in 1,240 oncology patients across 32 medical research hospitals. Primary endpoint: Progression-Free Survival (PFS) at 18 months. Independent Data Safety Monitoring Board (DSMB) conducts quarterly interim reviews. Safety boundary: study halted if Grade 4 toxicities exceed 4.5%.',
      key_takeaways: JSON.stringify([
        'Cohort size: 1,240 patients randomized 1:1 across 32 international clinical trial sites',
        'Primary Endpoint: 18-month Progression-Free Survival (PFS) with 85% statistical power',
        'Safety Stopping Rule: Study halt mandated if Grade 4 toxicities exceed 4.5% threshold',
        'FDA Investigational New Drug (IND) interim safety filing scheduled for December 2024',
        'Estimated clinical budget commitment: $38.5 million through completion'
      ]),
      raw_text: `CLINICAL PROTOCOL BETA-9: INVESTIGATIONAL COMPOUND BP-901
Sponsor: BioPharm Innovations Inc. | IND Number: 184,291
Study Phase: Phase III Randomized, Double-Blind, Placebo-Controlled Trial.

1. STUDY OBJECTIVES & PATIENT POPULATION
This trial evaluates the safety, pharmacokinetics, and clinical progression-free survival (PFS) of orally administered BP-901 versus standard chemotherapy in 1,240 adult patients with advanced refractory adenocarcinoma across thirty-two (32) clinical research centers in the United States and Canada.

2. SAFETY MONITORING & MANDATORY STOPPING BOUNDARIES
An independent Data Safety Monitoring Board (DSMB) reviews blinded safety metrics quarterly. Predefined safety stopping criteria dictate immediate protocol halt if treatment-emergent Grade 4 adverse events exceed 4.5% of any treatment arm. 

3. REGULATORY TIMELINE & MILESTONES
Interim Phase III safety readout is scheduled for presentation to the FDA Oncology Center of Excellence in December 2024. Full study completion is projected for Q2 2026 with total authorized capital expenditure of $38.5 million.`
    },
    {
      id: 'doc-106',
      title: 'Global Supply Chain Resilience & Redundancy Protocol',
      category: 'Operations',
      file_format: 'pdf',
      file_size_kb: 450,
      page_count: 36,
      word_count: 12100,
      estimated_read_time_mins: 61,
      risk_level: 'LOW',
      risk_score: 2.4,
      confidence_score: 0.98,
      executive_summary: 'Operational contingency framework establishing dual-sourcing mandates for all mission-critical semiconductor components and server hardware. Mandates 45 days of safety buffer inventory maintained across three regional distribution hubs (Rotterdam, Singapore, Chicago). Limits single-supplier dependency to a maximum of 40% total procurement volume.',
      key_takeaways: JSON.stringify([
        'Mandatory dual-sourcing framework: Maximum 40% reliance on any single hardware supplier',
        'Safety inventory requirement: 45 days of buffer stock maintained at 3 regional hubs',
        'Automated supplier health tracking monitoring quarterly financial insolvency risk',
        'Contingency air-freight contract reserved with 48-hour emergency logistics SLA',
        'Projected annual inventory carrying cost: $4.2 million'
      ]),
      raw_text: `OPERATIONAL RESILIENCE PROTOCOL: HARDWARE & INFRASTRUCTURE
Issued by: Global Supply Chain Operations Directorate
Document ID: OPS-RESIL-2024-06.

1. MULTI-VENDOR SOURCING REQUIREMENT
To mitigate geopolitical trade frictions and port closures, no single supplier shall account for more than forty percent (40%) of total annual hardware component orders. Sourcing must be partitioned between primary manufacturers and certified secondary suppliers located across at least two independent geographical jurisdictions.

2. BUFFER INVENTORY & REGIONAL DISTRIBUTION
Procurement shall maintain a rolling 45-day safety stock buffer of critical server blades, networking switches, and storage modules. Inventory is distributed evenly across three climate-controlled logistics hubs: Rotterdam (EMEA), Singapore (APAC), and Chicago (Americas).

3. EMERGENCY DISRUPTION PROTOCOL
In the event of declared maritime or air shipping embargoes, operations will activate preferred standby air freight agreements with a guaranteed 48-hour expedited transit SLA. Estimated annualized buffer holding costs are budgeted at $4.2 million.`
    }
  ];

  const insertDoc = db.prepare(`
    INSERT INTO documents (
      id, title, category, file_format, file_size_kb, page_count, word_count,
      estimated_read_time_mins, risk_level, risk_score, confidence_score,
      executive_summary, key_takeaways, raw_text
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?
    )
  `);

  for (const d of SEED_DOCS) {
    insertDoc.run(
      d.id, d.title, d.category, d.file_format, d.file_size_kb, d.page_count, d.word_count,
      d.estimated_read_time_mins, d.risk_level, d.risk_score, d.confidence_score,
      d.executive_summary, d.key_takeaways, d.raw_text
    );
  }

  // Seed Entities
  const SEED_ENTITIES = [
    { id: 'ent-01', name: '$2,500,000', type: 'MONEY', norm: '2500000_USD' },
    { id: 'ent-02', name: '$142.8 Million', type: 'MONEY', norm: '142800000_USD' },
    { id: 'ent-03', name: '35,000,000 EUR', type: 'MONEY', norm: '35000000_EUR' },
    { id: 'ent-04', name: 'Delaware Commercial Arbitration', type: 'LEGAL_VENUE', norm: 'DELAWARE_USA' },
    { id: 'ent-05', name: '4-Hour Outage Remedy', type: 'DATE_DEADLINE', norm: '4_HOURS' },
    { id: 'ent-06', name: '99.95% Monthly Uptime', type: 'METRIC', norm: '0.9995_UPTIME' },
    { id: 'ent-07', name: 'November 15, 2024', type: 'DATE_DEADLINE', norm: '2024-11-15' },
    { id: 'ent-08', name: 'GDPR / EU AI Act', type: 'REGULATION', norm: 'EU_GDPR_AIACT' }
  ];

  const insertEnt = db.prepare(`
    INSERT INTO entities (id, name, entity_type, normalized_value)
    VALUES (?, ?, ?, ?)
  `);

  for (const e of SEED_ENTITIES) {
    insertEnt.run(e.id, e.name, e.type, e.norm);
  }

  // Seed Chunks
  const SEED_CHUNKS = [
    { id: 'chk-101-1', doc_id: 'doc-101', idx: 1, p: 4, head: 'Section 8.2: Limitation of Liability', text: 'Except for breaches of Section 12 (Confidentiality) or willful misconduct, cumulative liability shall not exceed $2,500,000. Data protection indemnity remains uncapped.', risk: 1, reason: 'Uncapped confidential data liability exposure' },
    { id: 'chk-101-2', doc_id: 'doc-101', idx: 2, p: 7, head: 'Section 9.1: Service Level Guarantees', text: 'Supplier commits to 99.95% monthly uptime. If uptime drops below 99.0%, Customer is entitled to a 25% monthly fee credit.', risk: 0, reason: null },
    { id: 'chk-102-1', doc_id: 'doc-102', idx: 1, p: 3, head: 'Financial Highlights: Q3 Earnings', text: 'Quarterly top-line expansion of 18.4% achieved $142.8M. Free cash flow generation came in at $31.2M with 89% cash conversion ratio.', risk: 0, reason: null },
    { id: 'chk-104-1', doc_id: 'doc-104', idx: 1, p: 2, head: 'Article 5: Regulatory Penalty Exposure', text: 'Failure to maintain adequate training data governance under the EU AI Act exposes the entity to administrative fines up to 35,000,000 EUR or 7% of worldwide turnover.', risk: 1, reason: 'Severe statutory financial penalty' }
  ];

  const insertChunk = db.prepare(`
    INSERT INTO document_chunks (id, document_id, chunk_index, page_number, section_heading, chunk_content, has_risk_flag, risk_rationale)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const c of SEED_CHUNKS) {
    insertChunk.run(c.id, c.doc_id, c.idx, c.p, c.head, c.text, c.risk, c.reason);
  }

  // Seed Mistake History
  const SEED_MISTAKES = [
    { id: 'mstk-01', doc_id: 'doc-101', title: 'Master Cloud Services Agreement', word: 'agreemnt', fix: 'agreement', cat: 'Spelling', sev: 'HIGH', exp: 'Misspelling of agreement; crucial legal definition term.', snip: 'shall govern this agreemnt between parties...', status: 'CLEARED' },
    { id: 'mstk-02', doc_id: 'doc-101', title: 'Master Cloud Services Agreement', word: 'liabilty', fix: 'liability', cat: 'Spelling', sev: 'HIGH', exp: 'Misspelling of core contractual term liability.', snip: 'the aggregate cumulative liabilty shall not exceed...', status: 'CLEARED' },
    { id: 'mstk-03', doc_id: 'doc-101', title: 'Master Cloud Services Agreement', word: 'the the', fix: 'the', cat: 'Grammar', sev: 'LOW', exp: 'Consecutive duplicate word detected.', snip: 'under the the terms and conditions set forth...', status: 'CLEARED' },
    { id: 'mstk-04', doc_id: 'doc-102', title: 'Q3 2024 Financial Performance Review', word: 'millon', fix: 'million', cat: 'Typo', sev: 'HIGH', exp: 'Incorrect numerical unit representation.', snip: 'operating income surpassed $39.4 millon...', status: 'CLEARED' },
    { id: 'mstk-05', doc_id: 'doc-103', title: 'ISO/IEC 27001 Security Audit Matrix', word: 'complience', fix: 'compliance', cat: 'Spelling', sev: 'MEDIUM', exp: 'Common misspelling of compliance.', snip: 'to ensure full ISO 27001 complience by Q4...', status: 'CLEARED' },
    { id: 'mstk-06', doc_id: 'doc-104', title: 'Global Data Privacy Policy', word: 'statuatory', fix: 'statutory', cat: 'Terminology', sev: 'MEDIUM', exp: 'Statutory penalty terminology typo in GDPR directive.', snip: 'statuatory maximum penalties reach 35M EUR...', status: 'CLEARED' }
  ];

  const insertMistake = db.prepare(`
    INSERT INTO mistake_history (id, document_id, document_title, mistake_word, ai_suggestion, category, severity, explanation, context_snippet, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const m of SEED_MISTAKES) {
    insertMistake.run(m.id, m.doc_id, m.title, m.word, m.fix, m.cat, m.sev, m.exp, m.snip, m.status);
  }

  // Seed default settings
  const insertSetting = db.prepare(`INSERT OR REPLACE INTO user_settings (key, value) VALUES (?, ?)`);
  insertSetting.run('theme', 'cyber-dark');
  insertSetting.run('accent', 'cyan');

  console.log('[OmniDoc DB] Database successfully seeded with 6 documents, chunks, entities, and mistake history.');
}

function resetDatabase() {
  const db = getDb();
  db.exec('DROP TABLE IF EXISTS user_settings;');
  db.exec('DROP TABLE IF EXISTS mistake_history;');
  db.exec('DROP TABLE IF EXISTS query_history;');
  db.exec('DROP TABLE IF EXISTS document_entities;');
  db.exec('DROP TABLE IF EXISTS entities;');
  db.exec('DROP TABLE IF EXISTS document_chunks;');
  db.exec('DROP TABLE IF EXISTS documents;');
  initSchema(db);
  return { success: true, message: 'Database reset to default enterprise corpus.' };
}

module.exports = {
  getDb,
  resetDatabase,
  DB_FILE
};
