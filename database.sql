-- ============================================================================
-- OMNIDOC INTELLIGENCE & KNOWLEDGE SYNTHESIS DATABASE SCHEMA
-- Target Database: PostgreSQL 14+ / MySQL 8.0+ / SQLite Compatible Architecture
-- Purpose: Ingest, index, summarize, and cross-query massive multi-document 
--          corpora without requiring manual document-by-document review.
-- ============================================================================

-- Create database if needed
-- CREATE DATABASE IF NOT EXISTS omnidoc_db;
-- \c omnidoc_db;

-- ----------------------------------------------------------------------------
-- 1. EXTENSIONS & SETUP (PostgreSQL Full-Text & Vector Search Support)
-- ----------------------------------------------------------------------------
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- Trigram fuzzy string matching

-- ----------------------------------------------------------------------------
-- 2. USERS & WORKSPACES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(180) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'analyst', -- admin, analyst, auditor, reviewer
    department VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS workspaces (
    id VARCHAR(36) PRIMARY KEY,
    owner_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    retention_days INT DEFAULT 365,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 3. CORE DOCUMENTS TABLE
-- Stores raw documents, metadata, computed stats, and high-level summaries.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS documents (
    id VARCHAR(36) PRIMARY KEY,
    workspace_id VARCHAR(36) REFERENCES workspaces(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(60) NOT NULL, -- Legal, Financial, Tech & Security, Medical, Policy, Operations
    source_type VARCHAR(40) DEFAULT 'file_upload', -- file_upload, api_ingest, web_crawler, email_import
    file_format VARCHAR(20) DEFAULT 'pdf', -- pdf, docx, txt, markdown, csv
    file_size_kb INT DEFAULT 0,
    page_count INT DEFAULT 1,
    word_count INT DEFAULT 0,
    estimated_read_time_mins INT DEFAULT 0,
    
    -- Content & Summaries
    raw_text TEXT NOT NULL,
    executive_summary TEXT,
    key_takeaways TEXT, -- JSON or bullet points
    
    -- Machine Intelligence Scores
    risk_level VARCHAR(20) DEFAULT 'LOW', -- LOW, MEDIUM, HIGH, CRITICAL
    risk_score DECIMAL(4, 2) DEFAULT 0.00, -- 0.00 to 10.00
    sentiment_score DECIMAL(3, 2) DEFAULT 0.00, -- -1.00 (negative) to +1.00 (positive)
    confidence_score DECIMAL(3, 2) DEFAULT 0.95,
    
    -- Status & Auditing
    processing_status VARCHAR(30) DEFAULT 'COMPLETED', -- QUEUED, PROCESSING, COMPLETED, FAILED
    uploaded_by VARCHAR(36) REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 4. DOCUMENT CHUNKS / PASSAGES (For Semantic Retrieval & Fast Lookup)
-- Segments large documents into bite-sized paragraphs for granular citation.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS document_chunks (
    id VARCHAR(36) PRIMARY KEY,
    document_id VARCHAR(36) REFERENCES documents(id) ON DELETE CASCADE,
    chunk_index INT NOT NULL,
    page_number INT DEFAULT 1,
    section_heading VARCHAR(200),
    chunk_content TEXT NOT NULL,
    token_count INT DEFAULT 0,
    has_risk_flag BOOLEAN DEFAULT FALSE,
    risk_rationale VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 5. EXTRACTED ENTITIES (Automated NER: People, Orgs, Amounts, Deadlines)
-- Eliminates manual scanning for critical identifiers and monetary obligations.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS entities (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    entity_type VARCHAR(50) NOT NULL, -- MONEY, ORGANIZATION, PERSON, DATE_DEADLINE, REGULATION, METRIC
    normalized_value VARCHAR(200),
    UNIQUE(name, entity_type)
);

CREATE TABLE IF NOT EXISTS document_entities (
    document_id VARCHAR(36) REFERENCES documents(id) ON DELETE CASCADE,
    entity_id VARCHAR(36) REFERENCES entities(id) ON DELETE CASCADE,
    occurrence_count INT DEFAULT 1,
    context_snippet TEXT,
    PRIMARY KEY (document_id, entity_id)
);

-- ----------------------------------------------------------------------------
-- 6. TAGS & TAXONOMY
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tags (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(80) UNIQUE NOT NULL,
    category VARCHAR(50) DEFAULT 'General'
);

CREATE TABLE IF NOT EXISTS document_tags (
    document_id VARCHAR(36) REFERENCES documents(id) ON DELETE CASCADE,
    tag_id VARCHAR(36) REFERENCES tags(id) ON DELETE CASCADE,
    confidence DECIMAL(3, 2) DEFAULT 1.00,
    PRIMARY KEY (document_id, tag_id)
);

-- ----------------------------------------------------------------------------
-- 7. NATURAL LANGUAGE QUERIES & AUDIT TRAIL
-- Stores user questions ("What is the liability cap?") and cross-document answers.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS query_history (
    id VARCHAR(36) PRIMARY KEY,
    workspace_id VARCHAR(36) REFERENCES workspaces(id) ON DELETE CASCADE,
    user_id VARCHAR(36) REFERENCES users(id),
    natural_query TEXT NOT NULL,
    synthesized_answer TEXT NOT NULL,
    referenced_doc_count INT DEFAULT 0,
    execution_time_ms INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS query_citations (
    query_id VARCHAR(36) REFERENCES query_history(id) ON DELETE CASCADE,
    document_id VARCHAR(36) REFERENCES documents(id) ON DELETE CASCADE,
    chunk_id VARCHAR(36) REFERENCES document_chunks(id) ON DELETE SET NULL,
    relevance_score DECIMAL(4, 3) DEFAULT 0.90,
    PRIMARY KEY (query_id, document_id)
);

-- ----------------------------------------------------------------------------
-- 8. INDEXES FOR RAPID SEARCH & SCALABILITY
-- ----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_docs_category ON documents(category);
CREATE INDEX IF NOT EXISTS idx_docs_risk_level ON documents(risk_level);
CREATE INDEX IF NOT EXISTS idx_docs_created ON documents(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chunks_doc_id ON document_chunks(document_id);
CREATE INDEX IF NOT EXISTS idx_doc_entities_doc ON document_entities(document_id);
CREATE INDEX IF NOT EXISTS idx_entities_type ON entities(entity_type);

-- ----------------------------------------------------------------------------
-- 9. ANALYTICAL VIEWS
-- Rapid aggregation views for dashboards without heavy query loops.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW vw_workspace_document_metrics AS
SELECT 
    d.workspace_id,
    COUNT(d.id) AS total_documents,
    SUM(d.page_count) AS total_pages_indexed,
    SUM(d.word_count) AS total_words_analyzed,
    ROUND(SUM(d.estimated_read_time_mins) / 60.0, 1) AS total_reading_hours_saved,
    SUM(CASE WHEN d.risk_level IN ('HIGH', 'CRITICAL') THEN 1 ELSE 0 END) AS high_risk_documents,
    COUNT(DISTINCT de.entity_id) AS distinct_entities_extracted
FROM documents d
LEFT JOIN document_entities de ON d.id = de.document_id
GROUP BY d.workspace_id;

CREATE OR REPLACE VIEW vw_high_risk_document_alerts AS
SELECT 
    d.id,
    d.title,
    d.category,
    d.risk_level,
    d.risk_score,
    d.executive_summary,
    COUNT(c.id) AS flagged_clause_count
FROM documents d
LEFT JOIN document_chunks c ON d.id = c.document_id AND c.has_risk_flag = TRUE
WHERE d.risk_level IN ('HIGH', 'CRITICAL')
GROUP BY d.id, d.title, d.category, d.risk_level, d.risk_score, d.executive_summary
ORDER BY d.risk_score DESC;

-- ----------------------------------------------------------------------------
-- 10. REALISTIC SEED DATA
-- Prepopulating database with multi-domain enterprise knowledge.
-- ----------------------------------------------------------------------------
INSERT INTO users (id, name, email, role, department) VALUES
('usr-001', 'Elena Rostova', 'elena.rostova@enterprise.corp', 'auditor', 'Compliance & Risk'),
('usr-002', 'Marcus Vance', 'marcus.v@enterprise.corp', 'analyst', 'Strategy & Finance');

INSERT INTO workspaces (id, owner_id, name, description) VALUES
('ws-main', 'usr-001', 'Global Enterprise Intelligence Vault', 'Primary repository for rapid contract, financial, and policy cross-synthesis');

-- Core Documents
INSERT INTO documents (
    id, workspace_id, title, category, file_format, file_size_kb, page_count, word_count,
    estimated_read_time_mins, raw_text, executive_summary, key_takeaways,
    risk_level, risk_score, sentiment_score, confidence_score, processing_status, uploaded_by
) VALUES
(
    'doc-101', 'ws-main', 'Master Cloud Services Agreement (Apex Global vs CyberTech)', 'Legal', 'pdf',
    412, 28, 9250, 46,
    'This Master Cloud Services Agreement governs cloud infrastructure hosting, data privacy obligations, SLAs, and liability caps. The supplier guarantees 99.95% uptime with penalty credits for outages exceeding 15 minutes. Total liability cap is capped at $2,500,000 or 12 months fees, except for gross negligence, IP infringement, and data breaches where liability is uncapped. Termination requires 60 days written notice with immediate termination for material breach uncured after 14 days.',
    'Governs cloud infrastructure SLAs and confidentiality. Critical flag: uncapped liability for data breaches and IP indemnity. 99.95% uptime guaranteed.',
    '["99.95% SLA with automated tier credit penalties", "Uncapped liability for data breaches and IP violations", "60-day standard termination notice, 14-day cure window", "Jurisdiction: State of Delaware under AAA Arbitration"]',
    'HIGH', 8.20, -0.15, 0.98, 'COMPLETED', 'usr-001'
),
(
    'doc-102', 'ws-main', 'Q3 2024 Financial Performance & Capital Allocation Brief', 'Financial', 'pdf',
    680, 42, 14800, 74,
    'Consolidated gross revenues for Q3 2024 reached $142.8 million, marking an 18.4% YoY surge driven by cloud enterprise subscription retention. Operating margin expanded to 27.6% despite higher R&D expenditures of $24.1 million. Working capital remains robust at $88.4 million with zero short-term debt maturities until Q4 2026. Capital allocation priority remains accretive M&A in document AI automation and strategic share buybacks under the approved $50M program.',
    'Record Q3 revenue of $142.8M (+18.4% YoY) with healthy 27.6% operating margins. Strong liquidity buffer with zero immediate debt maturities.',
    '["Gross revenue hit $142.8M (+18.4% YoY expansion)", "Operating margins expanded to 27.6% ($39.4M operating income)", "$50M share repurchase program authorized for H2", "Zero short-term debt maturities until November 2026"]',
    'LOW', 2.10, 0.72, 0.99, 'COMPLETED', 'usr-002'
),
(
    'doc-103', 'ws-main', 'ISO/IEC 27001:2022 Security Audit & Remediation Matrix', 'Tech & Security', 'pdf',
    520, 34, 11200, 56,
    'Comprehensive annual cybersecurity audit covering 93 Annex A controls. 88 controls fully compliant, 4 minor non-conformities identified in automated secret rotation and legacy API key deprecation, 1 high priority observation regarding third-party vendor access audits. Mandatory remediation timeline is 45 days before formal ISO re-certification submission. Multi-factor authentication is enforced across 100% of internal staff and contractors.',
    '88 of 93 controls fully compliant. High-priority remediation required within 45 days for third-party vendor token lifecycle management.',
    '["94.6% control compliance rate across security domains", "High-priority finding: 3rd-party vendor tokens need automated expiration", "Zero critical perimeter vulnerabilities detected during penetration testing", "Remediation deadline scheduled for November 15, 2024"]',
    'MEDIUM', 5.80, 0.10, 0.97, 'COMPLETED', 'usr-001'
),
(
    'doc-104', 'ws-main', 'Global Data Privacy & Cross-Border AI Transfer Policy (EU AI Act & GDPR)', 'Policy', 'pdf',
    310, 19, 6400, 32,
    'This internal governance framework specifies mandatory safeguards for deploying automated machine learning models handling personal data within the European Economic Area. High-risk AI systems must maintain documented transparency logs, human-in-the-loop oversight mechanisms, and algorithmic bias evaluations. Cross-border transfers must adhere to Standard Contractual Clauses (SCCs) and Data Privacy Framework guidelines with zero unencrypted storage at rest.',
    'Stipulates binding operational rules for GDPR and EU AI Act alignment. Mandatory human-in-the-loop review for all automated decision models.',
    '["Strict human oversight required for automated classifications", "Mandatory encrypted transfer using AES-256 for cross-border datasets", "Quarterly algorithmic bias audits required for compliance filing", "Maximum non-compliance fine penalty exposure up to 35M EUR or 7% global turnover"]',
    'HIGH', 7.90, -0.05, 0.96, 'COMPLETED', 'usr-001'
);

-- Extracted Entities Seed
INSERT INTO entities (id, name, entity_type, normalized_value) VALUES
('ent-01', '$2,500,000', 'MONEY', '2500000 USD'),
('ent-02', '$142.8 Million', 'MONEY', '142800000 USD'),
('ent-03', '35M EUR', 'MONEY', '35000000 EUR'),
('ent-04', 'Apex Global Inc.', 'ORGANIZATION', 'Apex Global Inc'),
('ent-05', 'CyberTech Hosting Ltd.', 'ORGANIZATION', 'CyberTech Hosting Ltd'),
('ent-06', '99.95% Uptime', 'METRIC', '0.9995'),
('ent-07', 'November 15, 2024', 'DATE_DEADLINE', '2024-11-15'),
('ent-08', 'GDPR / EU AI Act', 'REGULATION', 'EU_GDPR_AIACT');

INSERT INTO document_entities (document_id, entity_id, occurrence_count, context_snippet) VALUES
('doc-101', 'ent-01', 3, 'Total liability cap is capped at $2,500,000 or 12 months fees...'),
('doc-101', 'ent-04', 5, 'Master Cloud Services Agreement governs Apex Global Inc...'),
('doc-101', 'ent-06', 4, 'The supplier guarantees 99.95% uptime with penalty credits...'),
('doc-102', 'ent-02', 6, 'Consolidated gross revenues for Q3 2024 reached $142.8 million...'),
('doc-103', 'ent-07', 2, 'Remediation deadline scheduled for November 15, 2024...'),
('doc-104', 'ent-03', 1, 'Maximum non-compliance fine penalty exposure up to 35M EUR...');

-- Document Chunks for Deep Granular Retrieval
INSERT INTO document_chunks (id, document_id, chunk_index, page_number, section_heading, chunk_content, has_risk_flag, risk_rationale) VALUES
('chk-101-1', 'doc-101', 1, 4, 'Section 8.2: Limitation of Liability', 'Except for breaches of Section 12 (Confidentiality), Section 14 (IP Indemnification), or gross negligence, neither party liability shall exceed $2,500,000. Data protection indemnity remains uncapped.', TRUE, 'Uncapped data protection & IP indemnity liability exposure'),
('chk-101-2', 'doc-101', 2, 7, 'Section 9.1: Service Level Guarantees', 'Supplier commits to 99.95% monthly uptime. If uptime drops below 99.0%, Customer is entitled to a 25% monthly service fee rebate credited against the subsequent invoicing cycle.', FALSE, NULL),
('chk-102-1', 'doc-102', 1, 3, 'Financial Highlights: Q3 Earnings', 'Quarterly top-line expansion of 18.4% achieved $142.8M. Free cash flow generation came in at $31.2M with 89% cash conversion ratio from net income.', FALSE, NULL),
('chk-104-1', 'doc-104', 1, 2, 'Article 5: Regulatory Penalty Exposure', 'Failure to maintain adequate training data governance or human override under the EU AI Act exposes the entity to administrative fines up to 35,000,000 EUR or 7% of total worldwide annual turnover.', TRUE, 'Severe non-compliance statutory financial penalty');

-- Sample Query History
INSERT INTO query_history (id, workspace_id, user_id, natural_query, synthesized_answer, referenced_doc_count, execution_time_ms) VALUES
('qry-01', 'ws-main', 'usr-001', 'What are our highest financial liabilities and penalty exposures across all contracts?', 'Across reviewed documents, your highest exposures are: 1) Uncapped liability for data breaches under the Master Cloud Agreement with Apex Global (Doc-101), 2) Statutory fine exposure up to 35M EUR or 7% global turnover under the EU AI Act policy (Doc-104). Standard contractual cap is $2,500,000.', 2, 42);

-- ----------------------------------------------------------------------------
-- 8. AI MISTAKE FINDER & CORRECTIONS AUDIT TRAIL
-- Tracks detected typographical, grammatical, and contractual terminology errors,
-- along with one-click AI resolution history and status (CLEARED, DISMISSED, REVERTED).
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS mistake_history (
    id VARCHAR(36) PRIMARY KEY,
    document_id VARCHAR(36) REFERENCES documents(id) ON DELETE SET NULL,
    document_title VARCHAR(255) NOT NULL,
    mistake_word VARCHAR(100) NOT NULL,
    ai_suggestion VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL, -- Spelling, Grammar, Typo, Terminology, Punctuation
    severity VARCHAR(20) DEFAULT 'MEDIUM', -- HIGH, MEDIUM, LOW
    explanation TEXT,
    context_snippet TEXT,
    status VARCHAR(30) DEFAULT 'CLEARED', -- CLEARED, DISMISSED, REVERTED
    cleared_by VARCHAR(50) DEFAULT 'OmniDoc AI Copilot',
    resolved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Historical AI Cleared Mistakes
INSERT INTO mistake_history (id, document_id, document_title, mistake_word, ai_suggestion, category, severity, explanation, context_snippet, status, cleared_by) VALUES
('mstk-01', 'doc-101', 'Master Cloud Services Agreement', 'agreemnt', 'agreement', 'Spelling', 'HIGH', 'Misspelling of agreement; crucial legal definition term.', 'shall govern this agreemnt between parties...', 'CLEARED', 'OmniDoc AI Copilot'),
('mstk-02', 'doc-101', 'Master Cloud Services Agreement', 'liabilty', 'liability', 'Spelling', 'HIGH', 'Misspelling of core contractual term liability.', 'the aggregate cumulative liabilty shall not exceed...', 'CLEARED', 'OmniDoc AI Copilot'),
('mstk-03', 'doc-101', 'Master Cloud Services Agreement', 'the the', 'the', 'Grammar', 'LOW', 'Consecutive duplicate word detected.', 'under the the terms and conditions set forth...', 'CLEARED', 'OmniDoc AI Copilot'),
('mstk-04', 'doc-102', 'Q3 2024 Financial Performance Brief', 'millon', 'million', 'Typo', 'HIGH', 'Incorrect numerical unit representation.', 'operating income surpassed $39.4 millon...', 'CLEARED', 'OmniDoc AI Copilot'),
('mstk-05', 'doc-103', 'ISO/IEC 27001 Security Audit Matrix', 'complience', 'compliance', 'Spelling', 'MEDIUM', 'Common misspelling of compliance.', 'to ensure full ISO 27001 complience by Q4...', 'CLEARED', 'OmniDoc AI Copilot'),
('mstk-06', 'doc-104', 'Global Data Privacy Policy', 'statuatory', 'statutory', 'Terminology', 'MEDIUM', 'Statutory penalty terminology typo in GDPR directive.', 'statuatory maximum penalties reach 35M EUR...', 'CLEARED', 'OmniDoc AI Copilot');

