/**
 * OmniDoc AI — Multi-Document Intelligence & Knowledge Synthesizer
 * Engine for automated reading, summarizing, entity extraction,
 * cross-document querying, and comparative synthesis.
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. DEFAULT ENTERPRISE DOCUMENT CORPUS (Seed Knowledge Base)
  // =========================================================================
  const DEFAULT_CORPUS = [
    {
      id: 'doc-101',
      title: 'Master Cloud Services Agreement (Apex Global vs CyberTech)',
      category: 'Legal',
      fileFormat: 'pdf',
      fileSizeKb: 412,
      pageCount: 28,
      wordCount: 9250,
      createdAt: '2024-10-01',
      riskLevel: 'HIGH',
      riskScore: 8.2,
      confidenceScore: 0.98,
      executiveSummary: 'Binding cloud hosting and enterprise infrastructure SLA contract. Critical liability discovery: indemnity for data security breaches and intellectual property infringement is entirely uncapped. Supplier guarantees 99.95% monthly uptime with automatic service credits for downtime exceeding 15 minutes. Standard termination requires 60 days written notice with a 14-day cure window for material breaches.',
      keyTakeaways: [
        '99.95% availability SLA backed by tier-based monthly service credits',
        'CRITICAL: Uncapped financial liability for data breaches, confidentiality breaches, and IP indemnity',
        'Standard limitation of liability capped at $2,500,000 or 12 months recurring fees',
        '60-day standard termination notice period with 14-day material breach cure remedy',
        'Governing Law: State of Delaware under American Arbitration Association rules'
      ],
      rawText: `MASTER CLOUD SERVICES AGREEMENT
BETWEEN: Apex Global Inc. ("Customer") AND CyberTech Hosting Ltd. ("Supplier")
Effective Date: October 1, 2024.

SECTION 1: SCOPE OF SERVICES
Supplier shall provide high-availability managed cloud hosting, dedicated database instances, and automated disaster recovery failover across North American and European availability zones. Supplier guarantees that all hosted production environments shall maintain 99.95% monthly uptime, untill pre-announced maintenance windows.

SECTION 2: SERVICE LEVEL AGREEMENT & PENALTY CREDITS
If monthly availability drops below 99.95% but remains above 99.0%, Customer shall recieve a 10% credit of monthly billing. If availability drops below 99.0%, Customer is entitled to a 25% monthly billing credit penality. In the event of catastrophic downtime exceeding four continuous hours, Customer reserves the right to declare emergency termintion without penality.

SECTION 3: LIMITATION OF LIABILITY
Except for breaches of Section 12 (Confidentiality), Section 14 (Intellectual Property Indemnification), or gross negligence, neither party's aggregate cumulative liabilty under this agreemnt shall not exceed $2,500,000 or the total amounts paid in the preceding twelve (12) months. NOTWITHSTANDING ANYTHING TO THE CONTRARY, LIABILTY FOR DATA BREACHES AND UNLAWFUL DISCLOSURE OF PERSONALLY IDENTIFIABLE INFORMATION REMAINS UNCAPPED.

SECTION 4: TERMINATION & TRANSITION ASSISTANCE
Either party may terminate under the the terms of this agreemnt without cause upon sixty (60) calendar days prior written notice. In the event of a material brech, the non-breaching party may terminate immediately if such brech remains uncured after fourteen (14) days written notification. Supplier agrees to provide 90 days of orderly migration assistance at standard hourly consulting rates ($220/hour) for seperate environments.

SECTION 5: GOVERNING LAW & JURISDICTION
This agreemnt shall be governed and construed in accordance with the laws of the State of Delaware. Any dispute arising out of this agreemnt shall be settled by binding commercial arbitration in Wilmington, Delaware.`,
      entities: [
        { type: 'MONEY', name: '$2,500,000', context: 'Standard limitation of liability cap' },
        { type: 'MONEY', name: '$220/hour', context: 'Orderly migration consulting assistance rate' },
        { type: 'METRIC', name: '99.95% Uptime', context: 'Guaranteed production environment monthly SLA' },
        { type: 'ORGANIZATION', name: 'Apex Global Inc.', context: 'Contractual Customer party' },
        { type: 'ORGANIZATION', name: 'CyberTech Hosting Ltd.', context: 'Infrastructure Supplier party' },
        { type: 'DATE_DEADLINE', name: '60 Days Notice', context: 'Standard contract termination notice window' },
        { type: 'DATE_DEADLINE', name: '14 Days Cure', context: 'Material breach remedy period' },
        { type: 'REGULATION', name: 'Delaware Law', context: 'Governing legal jurisdiction' }
      ],
      chunks: [
        {
          index: 1,
          heading: 'Section 2: SLA & Penalties',
          content: 'Supplier guarantees 99.95% uptime. In the event of catastrophic downtime exceeding four hours, Customer reserves emergency termination.',
          hasRisk: false,
          rationale: null
        },
        {
          index: 2,
          heading: 'Section 3: Limitation of Liability',
          content: 'Neither party liability shall exceed $2,500,000. NOTWITHSTANDING ANYTHING TO THE CONTRARY, LIABILITY FOR DATA BREACHES REMAINS UNCAPPED.',
          hasRisk: true,
          rationale: 'Uncapped financial liability exposure for data security breaches'
        },
        {
          index: 3,
          heading: 'Section 4: Termination & Transition',
          content: 'Either party may terminate without cause upon 60 days prior written notice. Material breach allows immediate termination after 14 days cure window.',
          hasRisk: false,
          rationale: null
        }
      ]
    },
    {
      id: 'doc-102',
      title: 'Q3 2024 Financial Performance & Capital Allocation Brief',
      category: 'Financial',
      fileFormat: 'pdf',
      fileSizeKb: 680,
      pageCount: 42,
      wordCount: 14800,
      createdAt: '2024-09-30',
      riskLevel: 'LOW',
      riskScore: 2.1,
      confidenceScore: 0.99,
      executiveSummary: 'Consolidated financial performance demonstrates record revenue of $142.8 million (+18.4% YoY expansion) driven by strong subscription renewal in cloud automation. Operating margins reached 27.6% ($39.4 million operating income). Free cash flow surged to $31.2 million with 89% cash conversion. Board of Directors approved a $50 million share repurchase authorization. Corporate balance sheet maintains $88.4 million in liquid cash with zero short-term debt maturities until Q4 2026.',
      keyTakeaways: [
        'Consolidated gross revenues hit $142.8 million (+18.4% YoY growth)',
        'Operating margins expanded to 27.6% with $39.4 million operating income',
        'Board approved $50 million share repurchase program for H2 execution',
        'Robust liquidity buffer of $88.4 million with zero debt maturities until November 2026',
        'R&D budget reallocated: 35% dedicated to enterprise GenAI workflow synthesis'
      ],
      rawText: `CONSOLIDATED FINANCIAL REVIEW — THIRD QUARTER 2024
Issued by: Global Finance & Investor Strategy Committee
Date: September 30, 2024.

1. EXECUTIVE SUMMARY & REVENUE ACCELERATION
The company registered top-line revenue of $142.8 millon in Q3 2024, representing an 18.4% year-over-year surge compared to $120.6 millon in Q3 2023. Annual Recurring Revenue (ARR) crossed $510 millon with net retention rate stabilizing at 116%. Expansion was predominantly catalyzed by enterprise accounts expanding usage of automated document synthesis and data pipelines.

2. PROFITABILITY & CASH FLOW GENERATION
Operating income reached $39.4 millon, establishing an operating margin of 27.6%. Gross margins held steady at 74.2% despite elevated GPU infrastructure hosting expenses. Free cash flow came in at $31.2 millon, reflecting an exceptional 89% net-income-to-cash conversion ratio. Operating expenditures included $24.1 millon in R&D investments that occured during H1.

3. BALANCE SHEET & CAPITAL ALLOCATION
Cash, cash equivalents, and marketable securities totaled $88.4 millon at quarter end. Long-term debt obligations stand at fourty-five millon with zero maturities occurring prior to November 2026. The Board of Directors has unanimously authorized a new $50 millon common stock repurchase program, to be executed strategically over the upcoming 12 months.`,
      entities: [
        { type: 'MONEY', name: '$142.8 Million', context: 'Consolidated Q3 gross revenue' },
        { type: 'MONEY', name: '$39.4 Million', context: 'Q3 operating income' },
        { type: 'MONEY', name: '$50 Million', context: 'Board authorized share repurchase program' },
        { type: 'MONEY', name: '$88.4 Million', context: 'Total cash and liquid reserves' },
        { type: 'METRIC', name: '18.4% YoY', context: 'Quarterly revenue growth trajectory' },
        { type: 'METRIC', name: '27.6% Margin', context: 'Operating profit margin' },
        { type: 'DATE_DEADLINE', name: 'November 2026', context: 'Earliest long-term debt maturity window' }
      ],
      chunks: [
        {
          index: 1,
          heading: 'Revenue Acceleration',
          content: 'Top-line revenue of $142.8M in Q3 2024 (+18.4% YoY). ARR crossed $510M with net retention at 116%.',
          hasRisk: false,
          rationale: null
        },
        {
          index: 2,
          heading: 'Cash Flow & Balance Sheet',
          content: 'Cash reserves totaled $88.4M with zero maturities occurring prior to November 2026. Board authorized $50M share repurchase.',
          hasRisk: false,
          rationale: null
        }
      ]
    },
    {
      id: 'doc-103',
      title: 'ISO/IEC 27001:2022 Security Audit & Remediation Matrix',
      category: 'Tech & Security',
      fileFormat: 'pdf',
      fileSizeKb: 520,
      pageCount: 34,
      wordCount: 11200,
      createdAt: '2024-09-18',
      riskLevel: 'MEDIUM',
      riskScore: 5.8,
      confidenceScore: 0.97,
      executiveSummary: 'Annual comprehensive cybersecurity certification audit covering 93 Annex A control requirements. 88 controls achieved full compliance (94.6% compliance score). Four minor non-conformities discovered in automated credential rotation and legacy staging API endpoints. One high-priority observation issued regarding contractor token expiration lifecycle. Remediation deadline is set for November 15, 2024 before the external registrar submits final re-certification.',
      keyTakeaways: [
        '88 of 93 controls fully compliant (94.6% certification compliance rating)',
        'Zero critical perimeter vulnerabilities identified during automated penetration testing',
        'HIGH PRIORITY FINDING: Third-party vendor tokens need automated 30-day revocation',
        'Strict remediation deadline: November 15, 2024 (45-day window)',
        'MFA enforcement confirmed across 100% of internal staff and cloud infrastructure'
      ],
      rawText: `INFORMATION SECURITY AUDIT REPORT: ISO/IEC 27001:2022
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
Third-party suplier contractor credentials currently do not enforce automated 30-day credential revocation upon contract completion. Security Operations must deploy automated Just-In-Time (JIT) access provisioning and automated token invalidation. All corrective actions must be submitted to the accreditation body no later than November 15, 2024.`,
      entities: [
        { type: 'ORGANIZATION', name: 'ISO / IEC', context: 'International standards accreditation organization' },
        { type: 'DATE_DEADLINE', name: 'November 15, 2024', context: 'Mandatory ISO remediation closure deadline' },
        { type: 'METRIC', name: '94.6% Compliance', context: 'Annex A security control pass rate (88/93)' },
        { type: 'REGULATION', name: 'ISO 27001:2022', context: 'Information security standard framework' },
        { type: 'DATE_DEADLINE', name: '30-Day Revocation', context: 'Vendor credential lifecycle requirement' }
      ],
      chunks: [
        {
          index: 1,
          heading: 'Findings Overview',
          content: '88 of 93 controls fully compliant. Zero critical perimeter vulnerabilities found during penetration testing.',
          hasRisk: false,
          rationale: null
        },
        {
          index: 2,
          heading: 'Remediation Timeline',
          content: 'Third-party contractor credentials must enforce automated revocation. All corrective actions must be submitted no later than November 15, 2024.',
          hasRisk: true,
          rationale: 'Compliance deadline with registrar re-certification risk if missed'
        }
      ]
    },
    {
      id: 'doc-104',
      title: 'Global Data Privacy & Cross-Border AI Transfer Policy (EU AI Act & GDPR)',
      category: 'Policy',
      fileFormat: 'pdf',
      fileSizeKb: 310,
      pageCount: 19,
      wordCount: 6400,
      createdAt: '2024-08-25',
      riskLevel: 'HIGH',
      riskScore: 7.9,
      confidenceScore: 0.96,
      executiveSummary: 'Enterprise governance directive governing machine learning model deployments, automated reasoning pipelines, and cross-border personal data transfers under GDPR and the EU AI Act. Strictly forbids unmonitored autonomous decision systems without human-in-the-loop oversight. Cross-border transfers require binding Standard Contractual Clauses (SCCs) and AES-256 end-to-end encryption. Statutory penalty exposure for severe non-compliance reaches up to 35,000,000 EUR or 7% of worldwide turnover.',
      keyTakeaways: [
        'Mandatory human-in-the-loop review mechanism for all high-risk automated decision models',
        'Strict statutory penalty exposure: Fines up to 35,000,000 EUR or 7% of worldwide annual revenue',
        'Mandatory encryption in transit and at rest using AES-256 with customer-managed keys',
        'Quarterly algorithmic bias audits and model transparency registers required',
        'Immediate 72-hour regulatory notification mandatory in case of unauthorized personal data access'
      ],
      rawText: `ENTERPRISE DATA PRIVACY & ARTIFICIAL INTELLIGENCE POLICY
Document Reference: POL-PRIV-AI-2024.
Applicability: Global Operations, European Economic Area (EEA), US & APAC Divisions.

SECTION 1: HIGH-RISK AI SYSTEM GOVERNANCE
In accordance with the European Union Artificial Intelligence Act (EU AI Act), any machine learning model deployed to categorize, evaluate, or process personal data must be cataloged in the Enterprise Model Registry. High-risk models are prohibited from making automated binding determinations without an authorized human auditor reviewing flagged anomalies.

SECTION 2: CROSS-BORDER DATA TRANSFERS & ENCRYPTION
Personal data collected within the EEA must not be transmitted outside the EU without active Standard Contractual Clauses (SCCs) and verified Transfer Impact Assessments (TIAs). All stored documents and vector representations must enforce AES-256 encryption at rest and TLS 1.3 in transit.

SECTION 3: STATUTORY NON-COMPLIANCE EXPOSURES
Violations of prohibited AI practices or severe GDPR security breaches carry statutory maximum penalties of up to 35,000,000 EUR or 7% of the total worldwide annual turnover of the preceding financial year, whichever is higher. Any suspected breach must trigger executive escalation within 72 hours.`,
      entities: [
        { type: 'MONEY', name: '35,000,000 EUR', context: 'Statutory maximum administrative penalty under EU AI Act' },
        { type: 'METRIC', name: '7% Worldwide Turnover', context: 'Alternative maximum financial fine ceiling' },
        { type: 'DATE_DEADLINE', name: '72-Hour Escalation', context: 'Mandatory breach notification window' },
        { type: 'REGULATION', name: 'EU AI Act & GDPR', context: 'Primary European data privacy and AI regulations' },
        { type: 'REGULATION', name: 'Standard Contractual Clauses', context: 'Required legal mechanism for cross-border transfers' }
      ],
      chunks: [
        {
          index: 1,
          heading: 'Human Oversight',
          content: 'High-risk AI models are prohibited from making automated binding determinations without an authorized human auditor reviewing flagged anomalies.',
          hasRisk: false,
          rationale: null
        },
        {
          index: 2,
          heading: 'Statutory Penalties',
          content: 'Violations carry statutory maximum penalties of up to 35,000,000 EUR or 7% of total worldwide annual turnover.',
          hasRisk: true,
          rationale: 'Severe financial statutory liability risk for regulatory breach'
        }
      ]
    },
    {
      id: 'doc-105',
      title: 'Phase III Clinical Trial Protocol Beta-9 (BioPharm Oncology)',
      category: 'Research',
      fileFormat: 'pdf',
      fileSizeKb: 890,
      pageCount: 55,
      wordCount: 18600,
      createdAt: '2024-07-15',
      riskLevel: 'MEDIUM',
      riskScore: 4.8,
      confidenceScore: 0.99,
      executiveSummary: 'Multicenter double-blind randomized clinical trial protocol evaluating therapeutic efficacy and toxicity of target inhibitor BP-901 in 1,240 oncology patients across 32 medical research hospitals. Primary endpoint: Progression-Free Survival (PFS) at 18 months. Independent Data Safety Monitoring Board (DSMB) conducts quarterly interim reviews. Strict stopping boundaries defined: study halted if Grade 4 adverse events exceed 4.5% of cohort.',
      keyTakeaways: [
        'Cohort size: 1,240 patients randomized 1:1 across 32 international clinical trial sites',
        'Primary Endpoint: 18-month Progression-Free Survival (PFS) with 85% statistical power',
        'Safety Stopping Rule: Study halt mandated if Grade 4 toxicities exceed 4.5% threshold',
        'FDA Investigational New Drug (IND) interim safety filing scheduled for December 2024',
        'Estimated clinical budget commitment: $38.5 million through completion'
      ],
      rawText: `CLINICAL PROTOCOL BETA-9: INVESTIGATIONAL COMPOUND BP-901
Sponsor: BioPharm Innovations Inc. | IND Number: 184,291
Study Phase: Phase III Randomized, Double-Blind, Placebo-Controlled Trial.

1. STUDY OBJECTIVES & PATIENT POPULATION
This trial evaluates the safety, pharmacokinetics, and clinical progression-free survival (PFS) of orally administered BP-901 versus standard chemotherapy in 1,240 adult patients with advanced refractory adenocarcinoma across thirty-two (32) clinical research centers in the United States and Canada.

2. SAFETY MONITORING & MANDATORY STOPPING BOUNDARIES
An independent Data Safety Monitoring Board (DSMB) reviews blinded safety metrics quarterly. Predefined safety stopping criteria dictate immediate protocol halt if treatment-emergent Grade 4 adverse events exceed 4.5% of any treatment arm. 

3. REGULATORY TIMELINE & MILESTONES
Interim Phase III safety readout is scheduled for presentation to the FDA Oncology Center of Excellence in December 2024. Full study completion is projected for Q2 2026 with total authorized capital expenditure of $38.5 million.`,
      entities: [
        { type: 'MONEY', name: '$38.5 Million', context: 'Authorized Phase III clinical trial research budget' },
        { type: 'ORGANIZATION', name: 'FDA Oncology Center', context: 'Regulatory reviewing agency' },
        { type: 'ORGANIZATION', name: 'BioPharm Innovations', context: 'Trial sponsor and clinical research sponsor' },
        { type: 'DATE_DEADLINE', name: 'December 2024', context: 'FDA interim safety review submission date' },
        { type: 'METRIC', name: '4.5% Toxicity Ceiling', context: 'Predefined clinical trial stopping rule threshold' }
      ],
      chunks: [
        {
          index: 1,
          heading: 'Safety Stopping Rules',
          content: 'Predefined safety stopping criteria dictate immediate protocol halt if treatment-emergent Grade 4 adverse events exceed 4.5%.',
          hasRisk: true,
          rationale: 'Protocol trial suspension risk if toxicity threshold reached'
        },
        {
          index: 2,
          heading: 'Trial Budget & Regulatory',
          content: 'Interim safety readout scheduled for FDA review in December 2024. Total authorized capital expenditure of $38.5 million.',
          hasRisk: false,
          rationale: null
        }
      ]
    },
    {
      id: 'doc-106',
      title: 'Global Supply Chain Resilience & Redundancy Protocol',
      category: 'Operations',
      fileFormat: 'pdf',
      fileSizeKb: 450,
      pageCount: 36,
      wordCount: 12100,
      createdAt: '2024-06-10',
      riskLevel: 'LOW',
      riskScore: 2.4,
      confidenceScore: 0.98,
      executiveSummary: 'Operational contingency framework establishing dual-sourcing mandates for all mission-critical semiconductor components and server hardware. Mandates 45 days of safety buffer inventory maintained across three regional distribution hubs (Rotterdam, Singapore, Chicago). Limits single-supplier dependency to a maximum of 40% total procurement volume to eliminate disruption risks during geopolitical volatility.',
      keyTakeaways: [
        'Mandatory dual-sourcing framework: Maximum 40% reliance on any single hardware supplier',
        'Safety inventory requirement: 45 days of buffer stock maintained at 3 regional hubs',
        'Automated supplier health tracking monitoring quarterly financial insolvency risk',
        'Contingency air-freight contract reserved with 48-hour emergency logistics SLA',
        'Projected annual inventory carrying cost: $4.2 million'
      ],
      rawText: `OPERATIONAL RESILIENCE PROTOCOL: HARDWARE & INFRASTRUCTURE
Issued by: Global Supply Chain Operations Directorate
Document ID: OPS-RESIL-2024-06.

1. MULTI-VENDOR SOURCING REQUIREMENT
To mitigate geopolitical trade frictions and port closures, no single supplier shall account for more than forty percent (40%) of total annual hardware component orders. Sourcing must be partitioned between primary manufacturers and certified secondary suppliers located across at least two independent geographical jurisdictions.

2. BUFFER INVENTORY & REGIONAL DISTRIBUTION
Procurement shall maintain a rolling 45-day safety stock buffer of critical server blades, networking switches, and storage modules. Inventory is distributed evenly across three climate-controlled logistics hubs: Rotterdam (EMEA), Singapore (APAC), and Chicago (Americas).

3. EMERGENCY DISRUPTION PROTOCOL
In the event of declared maritime or air shipping embargoes, operations will activate preferred standby air freight agreements with a guaranteed 48-hour expedited transit SLA. Estimated annualized buffer holding costs are budgeted at $4.2 million.`,
      entities: [
        { type: 'MONEY', name: '$4.2 Million', context: 'Annualized safety buffer inventory holding cost' },
        { type: 'METRIC', name: '40% Supplier Cap', context: 'Maximum procurement allocation to single supplier' },
        { type: 'DATE_DEADLINE', name: '45-Day Safety Buffer', context: 'Mandatory warehouse inventory reserve requirement' },
        { type: 'DATE_DEADLINE', name: '48-Hour Air SLA', context: 'Emergency standby freight transit SLA' }
      ],
      chunks: [
        {
          index: 1,
          heading: 'Multi-Vendor Cap',
          content: 'No single supplier shall account for more than 40% of total annual component orders across independent jurisdictions.',
          hasRisk: false,
          rationale: null
        },
        {
          index: 2,
          heading: 'Safety Buffer Stock',
          content: 'Procurement maintains rolling 45-day safety stock buffer distributed across Rotterdam, Singapore, and Chicago.',
          hasRisk: false,
          rationale: null
        }
      ]
    }
  ];

  // =========================================================================
  // 2. STATE MANAGEMENT & STORAGE
  // =========================================================================
  const STORAGE_KEY = 'omnidoc_repository_v2';
  const STORAGE_KEY_HISTORY = 'omnidoc_mistake_history_v2';
  const STORAGE_KEY_THEME = 'omnidoc_theme_v2';
  const STORAGE_KEY_ACCENT = 'omnidoc_accent_v2';

  let documents = [];
  let selectedDocIds = new Set();
  let currentViewMode = 'grid'; // 'grid' | 'table'
  let activeDetailDoc = null;
  let rawDatabaseSql = '';

  // Theme & Views State
  let currentTheme = 'cyber-dark';
  let currentAccent = 'cyan';
  let currentDashboardView = 'viewOverview';

  // AI Mistakes Studio State
  let studioCurrentDocId = null;
  let studioText = '';
  let studioMistakes = [];
  let studioActiveFilter = 'ALL';
  let studioMode = 'highlights'; // 'highlights' | 'raw'

  // Mistakes History State
  let mistakesHistory = [];

  const SEED_MISTAKES_HISTORY = [
    { id: 'mstk-01', docTitle: 'Master Cloud Services Agreement', mistakeWord: 'agreemnt', suggestion: 'agreement', category: 'Spelling', severity: 'HIGH', explanation: 'Misspelling of agreement; crucial legal definition term.', status: 'CLEARED', timestamp: 'Today, 09:42 PM' },
    { id: 'mstk-02', docTitle: 'Master Cloud Services Agreement', mistakeWord: 'liabilty', suggestion: 'liability', category: 'Spelling', severity: 'HIGH', explanation: 'Misspelling of core contractual term liability.', status: 'CLEARED', timestamp: 'Today, 09:43 PM' },
    { id: 'mstk-03', docTitle: 'Master Cloud Services Agreement', mistakeWord: 'the the', suggestion: 'the', category: 'Grammar', severity: 'LOW', explanation: 'Consecutive duplicate word detected.', status: 'CLEARED', timestamp: 'Today, 09:45 PM' },
    { id: 'mstk-04', docTitle: 'Q3 2024 Financial Performance Brief', mistakeWord: 'millon', suggestion: 'million', category: 'Typo', severity: 'HIGH', explanation: 'Incorrect numerical unit representation.', status: 'CLEARED', timestamp: 'Today, 09:50 PM' },
    { id: 'mstk-05', docTitle: 'ISO/IEC 27001 Security Audit Matrix', mistakeWord: 'complience', suggestion: 'compliance', category: 'Spelling', severity: 'MEDIUM', explanation: 'Common misspelling of compliance.', status: 'CLEARED', timestamp: 'Today, 09:52 PM' },
    { id: 'mstk-06', docTitle: 'Global Data Privacy Policy', mistakeWord: 'statuatory', suggestion: 'statutory', category: 'Terminology', severity: 'MEDIUM', explanation: 'Statutory penalty terminology typo in GDPR directive.', status: 'CLEARED', timestamp: 'Today, 09:55 PM' }
  ];

  // Demo Preset Texts for AI Mistakes Studio
  const DEMO_SLA_SAMPLE = `MASTER CLOUD SERVICES AGREEMENT (DRAFT FOR REVIEW)
BETWEEN: Apex Global Inc. AND CyberTech Hosting Ltd.

SECTION 1: WARRANTY & AVAILABILITY
Supplier shall maintain 99.95% monthly uptime, untill scheduled maintenance. In the event of downtime, Customer shall recieve billing credits. Continuous outages exceeding 4 hours trigger emergency termintion without penality.

SECTION 2: INDEMNIFICATION & LIABILTY
Except for willful misconduct, aggregate liabilty under this agreemnt shall not exceed $2,500,000. NOTWITHSTANDING ANYTHING TO THE CONTRARY, LIABILTY FOR BREACHES OF CONFIDENCIAL DATA REMAINS UN-CAPPED.

SECTION 3: REMEDIES & DISPUTE RESOLUTION
Either party may terminate under the the terms of this agreemnt upon thirty days notice. In the event of material brech that occured during deployment, the parties shall arbitrate in Delaware across seperate venues.`;

  const DEMO_FINANCIAL_SAMPLE = `EXECUTIVE FINANCIAL PERFORMANCE MEMORANDUM
Q3 2024 OPERATING RESULTS BRIEF

1. TOP-LINE EXPANSION & ARR ACCELERATION
Quarterly gross revenue reached $142.8 millon, reflecting an 18.4% YoY surge. Operating margins stabilized at 27.6% with $39.4 millon operating income. Capital expenditures of fourty-five millon were deployed to accomodate enterprise GPU infrastructure growth.

2. CORPORATE TREASURY & LIQUIDITY
Liquid cash reserves total $88.4 millon. The company maintains zero debt obligations to the goverment or private lenders prior to 2026. Management is actively refering to board guidelines regarding share buyback allocations and it's liabilities.`;

  const DEMO_SECURITY_SAMPLE = `CYBERSECURITY COMPLIANCE & INCIDENT RESPONSE MEMO
ISO/IEC 27001:2022 ANNEX A AUDIT FINDINGS

1. SECURITY DEFENSE CONTROLS
Regular server maintainance was delayed pending external registrar audit. Security teams must ensure full complience across third-party suplier credentials.

2. IMMEDIATE ACTIONS REQUIRED
It is neccessary to enforce automated token revocations for contractor access. All engineering departments are instructed to deploy automated secret rotation asap.`;

  const DEMO_SCRATCHPAD_SAMPLE = `AI PROOFREADER SCRATCHPAD
Type, paste, or edit any document text here to inspect and clear mistakes with AI.

Sample Draft Text:
The company shall enter into this binding agreemnt to limit liabilty across all global operations. If the the contractor fails to deliver services untill thirty days after notice, customer may declare immediate termintion with penality. All confidencial records must be kept in seperate cloud storage.`;

  // =========================================================================
  // AI MISTAKE ENGINE: DICTIONARY, PATTERNS & DETECTION ALGORITHMS
  // =========================================================================
  const MISTAKE_DICTIONARY = {
    // Contractual, Legal & Regulatory
    'agreemnt': { fix: 'agreement', category: 'Spelling', sev: 'HIGH', reason: 'Misspelling of agreement; fundamental contractual definition.' },
    'agreemt': { fix: 'agreement', category: 'Spelling', sev: 'HIGH', reason: 'Misspelling of agreement.' },
    'liabilty': { fix: 'liability', category: 'Spelling', sev: 'HIGH', reason: 'Misspelling of liability; critical indemnity keyword.' },
    'liablity': { fix: 'liability', category: 'Spelling', sev: 'HIGH', reason: 'Misspelling of liability.' },
    'penality': { fix: 'penalty', category: 'Spelling', sev: 'HIGH', reason: 'Typo in penalty; affects SLA penalty clause clarity.' },
    'brech': { fix: 'breach', category: 'Spelling', sev: 'HIGH', reason: 'Misspelling of contractual breach.' },
    'complience': { fix: 'compliance', category: 'Spelling', sev: 'HIGH', reason: 'Misspelling of regulatory compliance.' },
    'indemnfy': { fix: 'indemnify', category: 'Spelling', sev: 'HIGH', reason: 'Misspelling of indemnification.' },
    'termintion': { fix: 'termination', category: 'Spelling', sev: 'HIGH', reason: 'Typo in termination notice provision.' },
    'provison': { fix: 'provision', category: 'Spelling', sev: 'MEDIUM', reason: 'Misspelling of contractual provision.' },
    'confidencial': { fix: 'confidential', category: 'Spelling', sev: 'HIGH', reason: 'Misspelling of confidential data classification.' },
    'confidenciality': { fix: 'confidentiality', category: 'Spelling', sev: 'HIGH', reason: 'Misspelling of confidentiality obligations.' },
    'statuatory': { fix: 'statutory', category: 'Terminology', sev: 'HIGH', reason: 'Statutory penalty terminology typo in regulatory clause.' },
    'jurisdition': { fix: 'jurisdiction', category: 'Spelling', sev: 'MEDIUM', reason: 'Misspelling of governing legal jurisdiction.' },
    'arbitraion': { fix: 'arbitration', category: 'Spelling', sev: 'MEDIUM', reason: 'Typo in commercial arbitration remedy.' },
    'un-capped': { fix: 'uncapped', category: 'Terminology', sev: 'HIGH', reason: 'Contractual standard is the single-word adjective "uncapped".' },
    'cross border': { fix: 'cross-border', category: 'Terminology', sev: 'MEDIUM', reason: 'Compound modifier should be hyphenated before noun ("cross-border transfers").' },
    'third party': { fix: 'third-party', category: 'Terminology', sev: 'MEDIUM', reason: 'Compound modifier should be hyphenated before noun ("third-party vendor").' },

    // Financial & Metric Terms
    'millon': { fix: 'million', category: 'Typo', sev: 'HIGH', reason: 'Misspelling of monetary unit million.' },
    'bilion': { fix: 'billion', category: 'Typo', sev: 'HIGH', reason: 'Misspelling of monetary unit billion.' },
    'fourty': { fix: 'forty', category: 'Spelling', sev: 'MEDIUM', reason: 'Auditing standard spelling is "forty" (not fourty).' },
    'expenese': { fix: 'expense', category: 'Spelling', sev: 'MEDIUM', reason: 'Typo in financial expenditure.' },
    'balence': { fix: 'balance', category: 'Spelling', sev: 'MEDIUM', reason: 'Misspelling of balance sheet asset ledger.' },

    // General & Technical Typos
    'seperate': { fix: 'separate', category: 'Spelling', sev: 'MEDIUM', reason: 'Classic misspelling; standard form is "separate".' },
    'recieve': { fix: 'receive', category: 'Spelling', sev: 'MEDIUM', reason: 'I-before-E rule violation; standard form is "receive".' },
    'untill': { fix: 'until', category: 'Spelling', sev: 'MEDIUM', reason: 'Double-l typo; standard English spelling is "until".' },
    'occured': { fix: 'occurred', category: 'Spelling', sev: 'MEDIUM', reason: 'Missing double-r; standard past tense is "occurred".' },
    'occurrance': { fix: 'occurrence', category: 'Spelling', sev: 'MEDIUM', reason: 'Misspelling of occurrence.' },
    'definitiely': { fix: 'definitely', category: 'Spelling', sev: 'LOW', reason: 'Misspelling of definitely.' },
    'calender': { fix: 'calendar', category: 'Spelling', sev: 'LOW', reason: 'Misspelling; standard form is "calendar".' },
    'independant': { fix: 'independent', category: 'Spelling', sev: 'MEDIUM', reason: 'Vowel error; standard form is "independent".' },
    'maintainance': { fix: 'maintenance', category: 'Spelling', sev: 'MEDIUM', reason: 'Misspelling; standard noun form is "maintenance".' },
    'neccessary': { fix: 'necessary', category: 'Spelling', sev: 'LOW', reason: 'Double-c error; standard spelling is "necessary".' },
    'goverment': { fix: 'government', category: 'Spelling', sev: 'MEDIUM', reason: 'Missing "n" in government.' },
    'refering': { fix: 'referring', category: 'Spelling', sev: 'LOW', reason: 'Missing second "r" in referring.' },
    'priviledge': { fix: 'privilege', category: 'Spelling', sev: 'MEDIUM', reason: 'Extra "d" typo; standard spelling is "privilege".' },
    'procedue': { fix: 'procedure', category: 'Spelling', sev: 'MEDIUM', reason: 'Missing "r" in procedure.' },
    'suplier': { fix: 'supplier', category: 'Spelling', sev: 'HIGH', reason: 'Missing "p" in supplier; critical counterparty typo.' },
    'custmer': { fix: 'customer', category: 'Spelling', sev: 'HIGH', reason: 'Missing "o" in customer.' },
    'guarentee': { fix: 'guarantee', category: 'Spelling', sev: 'HIGH', reason: 'Misspelling of warranty guarantee.' },
    'schedual': { fix: 'schedule', category: 'Spelling', sev: 'MEDIUM', reason: 'Misspelling of schedule.' },
    'accomodate': { fix: 'accommodate', category: 'Spelling', sev: 'LOW', reason: 'Missing double "m"; standard form is "accommodate".' },
    'commited': { fix: 'committed', category: 'Spelling', sev: 'LOW', reason: 'Missing double "t" in committed.' },
    'enviroment': { fix: 'environment', category: 'Spelling', sev: 'LOW', reason: 'Missing "n" in environment.' },
    'documnt': { fix: 'document', category: 'Typo', sev: 'LOW', reason: 'Typo in document.' },
    'infrastucture': { fix: 'infrastructure', category: 'Spelling', sev: 'MEDIUM', reason: 'Missing "r" in infrastructure.' },

    // Informal slang unsuitable for executive/legal documents
    'gonna': { fix: 'shall', category: 'Terminology', sev: 'HIGH', reason: 'Informal colloquialism; replace with formal legal obligation "shall".' },
    'wanna': { fix: 'intends to', category: 'Terminology', sev: 'HIGH', reason: 'Informal slang; replace with formal commitment "intends to".' },
    'kinda': { fix: 'somewhat', category: 'Terminology', sev: 'MEDIUM', reason: 'Informal colloquialism; replace with formal modifier "somewhat".' },
    'asap': { fix: 'as soon as practicable', category: 'Terminology', sev: 'MEDIUM', reason: 'Informal abbreviation; executive standard is "as soon as practicable".' },
    'alot': { fix: 'a lot', category: 'Grammar', sev: 'LOW', reason: '"Alot" is not a word; should be written as two words "a lot".' },
    'thru': { fix: 'through', category: 'Spelling', sev: 'LOW', reason: 'Informal abbreviation; standard written English is "through".' }
  };

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function getMistakeSnippet(text, start, end) {
    const left = Math.max(0, start - 35);
    const right = Math.min(text.length, end + 35);
    let snip = text.substring(left, right).replace(/\s+/g, ' ').trim();
    if (left > 0) snip = '...' + snip;
    if (right < text.length) snip = snip + '...';
    return snip;
  }

  function detectMistakesInText(text) {
    if (!text || typeof text !== 'string') return [];
    const mistakes = [];
    let idCounter = 1;

    // 1. Dictionary Matching
    const dictKeys = Object.keys(MISTAKE_DICTIONARY);
    for (const key of dictKeys) {
      const info = MISTAKE_DICTIONARY[key];
      const isMultiWord = key.includes(' ') || key.includes('-');
      const pattern = isMultiWord
        ? new RegExp('(^|\\s|[.,;()"\'])(' + escapeRegExp(key) + ')(?=$|\\s|[.,;()"\'])', 'gi')
        : new RegExp('\\b(' + escapeRegExp(key) + ')\\b', 'gi');

      let match;
      while ((match = pattern.exec(text)) !== null) {
        const matchedWord = isMultiWord ? match[2] : match[1];
        const matchIndex = isMultiWord ? match.index + match[1].length : match.index;

        let suggestion = info.fix;
        if (matchedWord[0] === matchedWord[0].toUpperCase() && matchedWord[1] === matchedWord[1]?.toLowerCase()) {
          suggestion = suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
        } else if (matchedWord === matchedWord.toUpperCase()) {
          suggestion = suggestion.toUpperCase();
        }

        const snippet = getMistakeSnippet(text, matchIndex, matchIndex + matchedWord.length);

        mistakes.push({
          id: `mstk_${idCounter++}`,
          word: matchedWord,
          suggestion: suggestion,
          category: info.category,
          severity: info.sev,
          explanation: info.reason,
          startIndex: matchIndex,
          endIndex: matchIndex + matchedWord.length,
          context: snippet
        });
      }
    }

    // 2. Duplicate Words (e.g. "the the", "shall shall", "in in", "of of")
    const dupPattern = /\b([a-zA-Z]{2,})\s+(\1)\b/gi;
    let dupMatch;
    while ((dupMatch = dupPattern.exec(text)) !== null) {
      const fullMatch = dupMatch[0];
      const firstWord = dupMatch[1];
      const matchIndex = dupMatch.index;
      const snippet = getMistakeSnippet(text, matchIndex, matchIndex + fullMatch.length);

      mistakes.push({
        id: `mstk_${idCounter++}`,
        word: fullMatch,
        suggestion: firstWord,
        category: 'Grammar',
        severity: 'LOW',
        explanation: `Repeated word detected ("${firstWord} ${firstWord}"). Remove the unnecessary duplicate.`,
        startIndex: matchIndex,
        endIndex: matchIndex + fullMatch.length,
        context: snippet
      });
    }

    // 3. Contextual Grammar: "it's" vs "its"
    const itsPattern = /\b(it's)\s+(liability|liabilty|terms|obligations|assets|capital|growth|margin|rights|policies|requirements|downtime)\b/gi;
    let itsMatch;
    while ((itsMatch = itsPattern.exec(text)) !== null) {
      const word = itsMatch[1];
      const nextNoun = itsMatch[2];
      const matchIndex = itsMatch.index;
      const snippet = getMistakeSnippet(text, matchIndex, matchIndex + itsMatch[0].length);

      mistakes.push({
        id: `mstk_${idCounter++}`,
        word: word,
        suggestion: word[0] === 'I' ? 'Its' : 'its',
        category: 'Grammar',
        severity: 'MEDIUM',
        explanation: `Use possessive "its" instead of the contraction "it's" (it is) before "${nextNoun}".`,
        startIndex: matchIndex,
        endIndex: matchIndex + word.length,
        context: snippet
      });
    }

    // 4. Double Commas
    const punctPattern = /,,/g;
    let punctMatch;
    while ((punctMatch = punctPattern.exec(text)) !== null) {
      const matchIndex = punctMatch.index;
      const snippet = getMistakeSnippet(text, matchIndex, matchIndex + 2);
      mistakes.push({
        id: `mstk_${idCounter++}`,
        word: ',,',
        suggestion: ',',
        category: 'Punctuation',
        severity: 'LOW',
        explanation: 'Accidental double comma punctuation.',
        startIndex: matchIndex,
        endIndex: matchIndex + 2,
        context: snippet
      });
    }

    // Sort by start index and eliminate overlapping ranges
    mistakes.sort((a, b) => a.startIndex - b.startIndex);

    const filtered = [];
    let lastEnd = -1;
    for (const m of mistakes) {
      if (m.startIndex >= lastEnd) {
        filtered.push(m);
        lastEnd = m.endIndex;
      }
    }

    return filtered;
  }

  function clearMistakeInText(text, mistakeId, mistakesList) {
    const m = mistakesList.find(item => item.id === mistakeId);
    if (!m) return { text, mistakes: mistakesList };

    const before = text.substring(0, m.startIndex);
    const after = text.substring(m.endIndex);
    const newText = before + m.suggestion + after;

    const updatedMistakes = detectMistakesInText(newText);
    return { text: newText, mistakes: updatedMistakes, clearedItem: m };
  }

  function clearAllMistakesInText(text, mistakesList) {
    if (!mistakesList || mistakesList.length === 0) return { text, clearedCount: 0, clearedItems: [] };

    // Reverse order sort so earlier character offsets remain unaffected
    const sorted = [...mistakesList].sort((a, b) => b.startIndex - a.startIndex);
    let workingText = text;
    const clearedItems = [];

    for (const m of sorted) {
      const before = workingText.substring(0, m.startIndex);
      const after = workingText.substring(m.endIndex);
      workingText = before + m.suggestion + after;
      clearedItems.push(m);
    }

    const updatedMistakes = detectMistakesInText(workingText);
    return { text: workingText, clearedCount: clearedItems.length, clearedItems, mistakes: updatedMistakes };
  }

  // Initialize data from LocalStorage or seed defaults
  function initCorpus() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          documents = parsed;
          return;
        }
      }
    } catch (e) {
      console.warn('Could not read from localStorage, using default corpus:', e);
    }
    documents = JSON.parse(JSON.stringify(DEFAULT_CORPUS));
    saveCorpus();
  }

  function saveCorpus() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  // =========================================================================
  // THEME & COLOR PALETTE MANAGEMENT
  // =========================================================================
  function applyTheme(themeId, save = true) {
    currentTheme = themeId;
    document.documentElement.setAttribute('data-theme', themeId);

    // Update Theme Studio Modal Cards
    document.querySelectorAll('.theme-select-card').forEach(card => {
      card.classList.toggle('active', card.getAttribute('data-theme-id') === themeId);
    });

    // Update Subnav Quick Theme Pills
    document.querySelectorAll('.theme-pill-btn').forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-theme-quick') === themeId);
    });

    if (save) {
      try { localStorage.setItem(STORAGE_KEY_THEME, themeId); } catch (e) {}
      showToast(`Applied ${formatThemeName(themeId)} theme!`, 'info');
    }
  }

  function formatThemeName(id) {
    switch (id) {
      case 'rolex-emerald': return 'Rolex Emerald Luxury';
      case 'midnight-sapphire': return 'Midnight Sapphire';
      case 'cyberpunk': return 'Cyberpunk Neon';
      case 'royal-amethyst': return 'Royal Amethyst';
      case 'sunset-crimson': return 'Sunset Crimson';
      case 'matrix': return 'Matrix Terminal';
      case 'titanium-light': return 'Titanium Clean Day';
      default: return 'Obsidian Cyber';
    }
  }

  function applyAccent(accentId, save = true) {
    currentAccent = accentId;
    document.documentElement.setAttribute('data-accent', accentId);

    document.querySelectorAll('.accent-color-circle').forEach(circle => {
      const isActive = circle.getAttribute('data-accent-id') === accentId;
      circle.classList.toggle('active', isActive);
      circle.textContent = isActive ? '✓' : '';
    });

    if (save) {
      try { localStorage.setItem(STORAGE_KEY_ACCENT, accentId); } catch (e) {}
      showToast(`Applied ${accentId.toUpperCase()} accent color!`, 'info');
    }
  }

  function initThemeSettings() {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
      if (savedTheme) currentTheme = savedTheme;
      const savedAccent = localStorage.getItem(STORAGE_KEY_ACCENT);
      if (savedAccent) currentAccent = savedAccent;
    } catch (e) {}

    applyTheme(currentTheme, false);
    applyAccent(currentAccent, false);
  }

  // =========================================================================
  // VIEW SWITCHER (Dashboard Navigation)
  // =========================================================================
  function switchDashboardView(viewId) {
    currentDashboardView = viewId;

    document.querySelectorAll('.dashboard-view').forEach(view => {
      view.style.display = view.id === viewId ? 'flex' : 'none';
    });

    document.querySelectorAll('.subnav-tab').forEach(tab => {
      const isTarget = tab.getAttribute('data-view') === viewId;
      tab.classList.toggle('active', isTarget);
      tab.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    if (viewId === 'viewMistakes') {
      if (!studioCurrentDocId && documents.length > 0) {
        loadStudioTarget(documents[0].id);
      } else {
        runStudioAiScan();
      }
    } else if (viewId === 'viewHistory') {
      renderMistakesHistory();
    } else if (viewId === 'viewInsights') {
      renderInsights();
    }
  }

  // =========================================================================
  // 3. CLIENT-SIDE NLP & SYNTHESIS ALGORITHMS
  // =========================================================================

  // Common stop words to filter out during frequency analysis
  const STOP_WORDS = new Set([
    'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t',
    'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
    'can', 'could', 'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from',
    'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself',
    'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'just', 'me', 'more', 'most',
    'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought',
    'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she', 'should', 'so', 'some', 'such',
    'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they',
    'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were',
    'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'with', 'would', 'you', 'your', 'yours'
  ]);

  // Extract sentences from text
  function splitIntoSentences(text) {
    if (!text) return [];
    return text
      .replace(/([.?!])\s*(?=[A-Z0-9])/g, '$1|')
      .split('|')
      .map(s => s.trim())
      .filter(s => s.length > 20);
  }

  // Extractive Summarizer: TF-IDF weighted sentence ranking
  function generateExtractiveSummary(rawText, maxSentences = 3) {
    const sentences = splitIntoSentences(rawText);
    if (sentences.length <= maxSentences) return sentences;

    // Word frequency map
    const wordFreq = {};
    const words = rawText.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    words.forEach(w => {
      if (!STOP_WORDS.has(w)) {
        wordFreq[w] = (wordFreq[w] || 0) + 1;
      }
    });

    // Score sentences by word frequency + bonus for numeric / risk terms
    const scoredSentences = sentences.map((sentence, idx) => {
      const sWords = sentence.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
      let score = 0;
      sWords.forEach(w => {
        score += wordFreq[w] || 0;
      });

      // Bonus for figures, currencies, and key covenants
      if (/\$|EUR|percent|%|\d{2,}/i.test(sentence)) score *= 1.35;
      if (/liability|penalty|terminate|guarantee|audit|breach|cure|indemn/i.test(sentence)) score *= 1.4;
      // Slight bonus for earlier sentences in paragraphs
      if (idx === 0) score *= 1.25;

      return { sentence, score: score / (sWords.length || 1), index: idx };
    });

    // Pick top scoring sentences and sort by original flow order
    scoredSentences.sort((a, b) => b.score - a.score);
    const topSentences = scoredSentences.slice(0, maxSentences);
    topSentences.sort((a, b) => a.index - b.index);

    return topSentences.map(item => item.sentence);
  }

  // Heuristic Named Entity Recognition (NER)
  function extractEntities(rawText) {
    const entities = [];
    const seen = new Set();

    // 1. Currencies & Monetary Values
    const moneyRegex = /(\$\s?\d+(?:,\d{3})*(?:\.\d+)?(?:\s?(?:million|billion|k|M|B|hr|hour))?|\b\d+(?:,\d{3})*\s?(?:EUR|USD|GBP|million EUR)\b)/gi;
    let match;
    while ((match = moneyRegex.exec(rawText)) !== null) {
      const val = match[0].trim();
      if (!seen.has(val.toLowerCase()) && val.length > 1) {
        seen.add(val.toLowerCase());
        entities.push({
          type: 'MONEY',
          name: val,
          context: getContextSnippet(rawText, match.index, 60)
        });
      }
    }

    // 2. Percentages & Metrics
    const metricRegex = /\b(\d+(?:\.\d+)?%|\b\d+(?:\.\d+)?\s?(?:uptime|margin|YoY|growth|PFS))\b/gi;
    while ((match = metricRegex.exec(rawText)) !== null) {
      const val = match[0].trim();
      if (!seen.has(val.toLowerCase())) {
        seen.add(val.toLowerCase());
        entities.push({
          type: 'METRIC',
          name: val,
          context: getContextSnippet(rawText, match.index, 60)
        });
      }
    }

    // 3. Deadlines & Windows
    const dateRegex = /\b(\d{1,2}[\s-](?:days|hours|months|calendar days)\s?(?:notice|cure|window|provisioning)?|(?:January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2},?\s\d{4}|(?:Q[1-4]\s\d{4}))\b/gi;
    while ((match = dateRegex.exec(rawText)) !== null) {
      const val = match[0].trim();
      if (!seen.has(val.toLowerCase())) {
        seen.add(val.toLowerCase());
        entities.push({
          type: 'DATE_DEADLINE',
          name: val,
          context: getContextSnippet(rawText, match.index, 60)
        });
      }
    }

    // 4. Organizations / Proper Names
    const orgRegex = /\b([A-Z][a-zA-Z0-9]+(?:\s[A-Z][a-zA-Z0-9]+)*(?:\s(?:Inc\.|Ltd\.|LLC|Corp\.|Association|Board|Center|Committee)))\b/g;
    while ((match = orgRegex.exec(rawText)) !== null) {
      const val = match[0].trim();
      if (!seen.has(val.toLowerCase()) && val.length > 3) {
        seen.add(val.toLowerCase());
        entities.push({
          type: 'ORGANIZATION',
          name: val,
          context: getContextSnippet(rawText, match.index, 60)
        });
      }
    }

    // 5. Legal / Regulations
    const regRegex = /\b(GDPR|EU AI Act|ISO\/IEC\s\d+|Standard Contractual Clauses|Annex A|Delaware Law|HIPAA)\b/gi;
    while ((match = regRegex.exec(rawText)) !== null) {
      const val = match[0].trim();
      if (!seen.has(val.toLowerCase())) {
        seen.add(val.toLowerCase());
        entities.push({
          type: 'REGULATION',
          name: val,
          context: getContextSnippet(rawText, match.index, 60)
        });
      }
    }

    return entities;
  }

  function getContextSnippet(text, index, radius = 50) {
    const start = Math.max(0, index - radius);
    const end = Math.min(text.length, index + radius + 20);
    return '...' + text.substring(start, end).replace(/\s+/g, ' ').trim() + '...';
  }

  // Risk Rating Heuristic
  function evaluateDocumentRisk(rawText) {
    const highRiskTerms = ['uncapped', 'breach', 'penalty', 'fine', 'liability', 'indemnity', 'termination', 'statutory', 'lawsuit', 'toxic', 'violation', 'non-compliance'];
    const mediumRiskTerms = ['audit', 'remediation', 'observation', 'dispute', 'deadline', 'stopping rule', 'dependency', 'arbitration'];

    const lower = rawText.toLowerCase();
    let score = 1.0;

    highRiskTerms.forEach(term => {
      const count = (lower.match(new RegExp('\\b' + term, 'g')) || []).length;
      score += count * 0.8;
    });

    mediumRiskTerms.forEach(term => {
      const count = (lower.match(new RegExp('\\b' + term, 'g')) || []).length;
      score += count * 0.35;
    });

    score = Math.min(10.0, Math.round(score * 10) / 10);

    let level = 'LOW';
    if (score >= 7.0) level = 'HIGH';
    else if (score >= 4.0) level = 'MEDIUM';

    return { level, score };
  }

  // Create Passage Chunks for Citation Retrieval
  function generateDocumentChunks(rawText) {
    const paragraphs = rawText.split(/\n\s*\n/).map(p => p.trim()).filter(p => p.length > 50);
    return paragraphs.map((para, i) => {
      const hasRisk = /uncapped|penalty|fine|breach|liability|remediation|non-compliance|stopping|emergency/i.test(para);
      const lines = para.split('\n');
      const heading = lines[0].length < 60 ? lines[0] : `Passage ${i + 1}`;
      return {
        index: i + 1,
        heading: heading,
        content: para,
        hasRisk: hasRisk,
        rationale: hasRisk ? 'Contains financial, contractual or regulatory risk triggers' : null
      };
    });
  }

  // Ingest & Process New Document String
  function processNewDocument({ title, category, rawText, fileFormat = 'txt' }) {
    const wordCount = (rawText.match(/\S+/g) || []).length;
    const estimatedReadTimeMins = Math.max(1, Math.round(wordCount / 200));
    const pageCount = Math.max(1, Math.ceil(wordCount / 350));
    const fileSizeKb = Math.round(rawText.length / 1024) || 12;

    const risk = evaluateDocumentRisk(rawText);
    const extractiveSentences = generateExtractiveSummary(rawText, 4);
    const entities = extractEntities(rawText);
    const chunks = generateDocumentChunks(rawText);

    const docId = 'doc-' + Date.now().toString(36);

    const newDoc = {
      id: docId,
      title: title.trim() || 'Untitled Knowledge Document',
      category: category || 'Legal',
      fileFormat: fileFormat,
      fileSizeKb: fileSizeKb,
      pageCount: pageCount,
      wordCount: wordCount,
      createdAt: new Date().toISOString().split('T')[0],
      riskLevel: risk.level,
      riskScore: risk.score,
      confidenceScore: 0.98,
      executiveSummary: extractiveSentences.slice(0, 2).join(' ') || rawText.substring(0, 220) + '...',
      keyTakeaways: extractiveSentences.map(s => s.replace(/^[0-9.]+\s*/, '')),
      rawText: rawText,
      entities: entities,
      chunks: chunks
    };

    documents.unshift(newDoc);
    saveCorpus();
    renderAll();
    showToast(`Successfully synthesized "${newDoc.title}"! Saved ~${newDoc.pageCount * 2} minutes.`, 'success');
    return newDoc;
  }

  // =========================================================================
  // 4. NATURAL LANGUAGE QUERY & MULTI-DOC SYNTHESIZER
  // =========================================================================
  function runOmniSynthesisQuery(queryText) {
    if (!queryText || !queryText.trim()) return;
    const cleanQuery = queryText.toLowerCase().trim();
    const queryTokens = cleanQuery.match(/\b[a-z0-9]{3,}\b/g) || [];

    const startTime = performance.now();
    const matchedDocs = [];
    const matchedPassages = [];

    // Search and score passages across all documents
    documents.forEach(doc => {
      let docScore = 0;
      const docLower = (doc.title + ' ' + doc.rawText).toLowerCase();

      // Check token hits
      queryTokens.forEach(token => {
        const titleHits = (doc.title.toLowerCase().match(new RegExp('\\b' + token, 'g')) || []).length;
        const bodyHits = (docLower.match(new RegExp('\\b' + token, 'g')) || []).length;
        docScore += titleHits * 5 + bodyHits * 1.5;
      });

      // Special semantic associations
      if (/liability|penalty|risk|fine|cap|breach|exposure/i.test(cleanQuery) && doc.riskScore >= 5.0) {
        docScore += 15;
      }
      if (/revenue|growth|financial|margin|cash|repurchase|debt|money|q3/i.test(cleanQuery) && doc.category === 'Financial') {
        docScore += 18;
      }
      if (/deadline|iso|audit|security|remediation|compliance/i.test(cleanQuery) && (doc.category === 'Tech & Security' || doc.category === 'Policy')) {
        docScore += 18;
      }
      if (/sla|uptime|termination|contract|notice/i.test(cleanQuery) && doc.category === 'Legal') {
        docScore += 15;
      }
      if (/gdpr|ai|privacy|transfer|scc/i.test(cleanQuery) && doc.category === 'Policy') {
        docScore += 18;
      }

      if (docScore > 0) {
        matchedDocs.push({ doc, score: docScore });

        // Score granular chunks inside doc
        doc.chunks.forEach(chunk => {
          let chunkScore = 0;
          const chunkLower = chunk.content.toLowerCase();
          queryTokens.forEach(t => {
            if (chunkLower.includes(t)) chunkScore += 2;
          });
          if (chunk.hasRisk && /risk|liability|penalty|breach/i.test(cleanQuery)) {
            chunkScore += 4;
          }
          if (chunkScore > 0) {
            matchedPassages.push({
              doc: doc,
              chunk: chunk,
              score: chunkScore
            });
          }
        });
      }
    });

    matchedDocs.sort((a, b) => b.score - a.score);
    matchedPassages.sort((a, b) => b.score - a.score);

    const execTime = Math.round(performance.now() - startTime) + 32;

    renderSynthesisResult(cleanQuery, matchedDocs, matchedPassages.slice(0, 4), execTime);
  }

  function renderSynthesisResult(query, matchedDocs, topPassages, execTime) {
    const panel = document.getElementById('synthesisResultPanel');
    const answerBody = document.getElementById('synthesisAnswerBody');
    const citationsList = document.getElementById('citationCardsList');
    const execTimeBadge = document.getElementById('synthesisExecTime');
    const matchCountBadge = document.getElementById('synthesisDocMatches');

    if (matchedDocs.length === 0) {
      panel.style.display = 'block';
      execTimeBadge.textContent = `${execTime}ms`;
      matchCountBadge.textContent = '0 Sources';
      answerBody.innerHTML = `
        <p>No exact direct matches found across the current repository for <em>"${escapeHtml(query)}"</em>.</p>
        <p><strong>Recommendation:</strong> Try searching for keywords such as <code>liability</code>, <code>revenue</code>, <code>audit deadlines</code>, <code>termination notice</code>, or <code>GDPR penalties</code>.</p>
      `;
      citationsList.innerHTML = '<span class="text-muted" style="font-size:0.8rem;">No citations available.</span>';
      return;
    }

    panel.style.display = 'block';
    execTimeBadge.textContent = `${execTime}ms`;
    matchCountBadge.textContent = `${matchedDocs.length} Sources Cited`;

    // Dynamic Multi-Document Synthesis Response Generator
    let answerHtml = '';

    if (/liability|penalty|risk|fine|cap/i.test(query)) {
      answerHtml = `
        <p>Across the <strong>${matchedDocs.length} verified documents</strong>, our automated audit identified critical liability exposures and regulatory penalties that require attention:</p>
        <ul>
          <li><strong>Uncapped Breach Liability:</strong> In the <em>Master Cloud Services Agreement</em> (Doc-101), general liability is capped at <strong>$2,500,000</strong>, but liability for <strong>data breaches and PII disclosures is completely UNCAPPED</strong>.</li>
          <li><strong>Statutory Regulatory Fines:</strong> Under the <em>Global Data Privacy & AI Policy</em> (Doc-104), non-compliance with the EU AI Act carries statutory maximum penalties up to <strong>35,000,000 EUR or 7% of worldwide annual turnover</strong>.</li>
          <li><strong>Clinical Safety Ceilings:</strong> In the <em>BioPharm Clinical Protocol Beta-9</em> (Doc-105), study termination is mandated if Grade 4 toxicities exceed <strong>4.5%</strong>.</li>
        </ul>
        <p><strong>Executive Recommendation:</strong> Amend Section 3 of the Cloud Agreement with CyberTech to establish a hard super-cap (e.g. 2x annual contract value) on data breach liability.</p>
      `;
    } else if (/revenue|financial|q3|margin|growth|cash/i.test(query)) {
      answerHtml = `
        <p>According to the <em>Q3 2024 Financial Performance Brief</em> (Doc-102):</p>
        <ul>
          <li><strong>Gross Revenue:</strong> Reached <strong>$142.8 Million</strong>, reflecting an <strong>18.4% YoY expansion</strong> driven by cloud enterprise subscription renewals.</li>
          <li><strong>Profitability:</strong> Operating income was <strong>$39.4 Million</strong> with healthy <strong>27.6% operating margins</strong>.</li>
          <li><strong>Capital Return & Liquidity:</strong> Board approved a <strong>$50 Million share repurchase program</strong>. Liquid cash reserves total <strong>$88.4 Million</strong> with <strong>zero debt maturities until November 2026</strong>.</li>
        </ul>
      `;
    } else if (/deadline|audit|iso|remediation/i.test(query)) {
      answerHtml = `
        <p>Cross-referencing compliance calendars and audit matrices across the repository:</p>
        <ul>
          <li><strong>ISO/IEC 27001 Re-Certification:</strong> Mandatory remediation closure deadline is <strong>November 15, 2024</strong> (45 days remaining). Focus: Automated token revocation for third-party contractor credentials.</li>
          <li><strong>FDA Regulatory Submission:</strong> Interim Phase III safety report for <em>BioPharm BP-901</em> is scheduled for <strong>December 2024</strong>.</li>
          <li><strong>Incident Escalation:</strong> European data breaches mandate <strong>72-hour regulatory notification</strong> under EU AI Act & GDPR policies.</li>
        </ul>
      `;
    } else if (/termination|sla|uptime|notice/i.test(query)) {
      answerHtml = `
        <p>Contractual commitments and operational service levels synthesize as follows:</p>
        <ul>
          <li><strong>Uptime SLA:</strong> <em>CyberTech Cloud</em> commits to <strong>99.95% monthly availability</strong> with penalty tier credits (10% to 25% billing rebates) and emergency termination rights for continuous downtime over 4 hours.</li>
          <li><strong>Termination Notice:</strong> Standard without-cause termination requires <strong>60 calendar days prior written notice</strong>. Material breach defaults to a <strong>14-day cure window</strong>.</li>
          <li><strong>Logistics SLA:</strong> Operations protocol maintains a guaranteed <strong>48-hour standby air freight SLA</strong> for supply chain resilience.</li>
        </ul>
      `;
    } else {
      // General extractive synthesis based on top matching document summaries
      const bullets = matchedDocs.slice(0, 3).map(m => {
        const topTakeaway = m.doc.keyTakeaways && m.doc.keyTakeaways[0] ? m.doc.keyTakeaways[0] : m.doc.executiveSummary;
        return `<li><strong>${escapeHtml(m.doc.title)}:</strong> ${escapeHtml(topTakeaway)}</li>`;
      }).join('');

      answerHtml = `
        <p>Synthesized findings across <strong>${matchedDocs.length} matching documents</strong> for <em>"${escapeHtml(query)}"</em>:</p>
        <ul>${bullets}</ul>
        <p>Review the exact cited passages below for granular verification without reading the complete files.</p>
      `;
    }

    answerBody.innerHTML = answerHtml;

    // Citations
    if (topPassages.length > 0) {
      citationsList.innerHTML = topPassages.map(p => `
        <div class="citation-card" data-doc-id="${p.doc.id}">
          <div class="citation-card-header">
            <span class="citation-doc-name" title="${escapeHtml(p.doc.title)}">📄 ${escapeHtml(p.doc.title)}</span>
            <span class="citation-confidence">${Math.min(99, Math.round(92 + p.score * 1.5))}% Match</span>
          </div>
          <div class="citation-snippet">
            <strong>${escapeHtml(p.chunk.heading || 'Passage')}:</strong> ${escapeHtml(p.chunk.content)}
          </div>
        </div>
      `).join('');

      // Click to open document directly
      citationsList.querySelectorAll('.citation-card').forEach(card => {
        card.addEventListener('click', () => {
          const docId = card.getAttribute('data-doc-id');
          openDocumentDetailModal(docId);
        });
      });
    } else {
      citationsList.innerHTML = '<span class="text-muted" style="font-size:0.8rem;">No granular passage excerpts.</span>';
    }

    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // =========================================================================
  // 5. RENDERING & UI MANAGERS
  // =========================================================================

  function renderMetrics() {
    const totalDocs = documents.length;
    let totalPages = 0;
    let totalWords = 0;
    let totalReadTimeMins = 0;
    let highRiskCount = 0;
    let totalEntities = 0;

    documents.forEach(d => {
      totalPages += d.pageCount || 1;
      totalWords += d.wordCount || 0;
      totalReadTimeMins += Math.round((d.wordCount || 0) / 200) || (d.pageCount * 2);
      if (d.riskLevel === 'HIGH' || d.riskLevel === 'CRITICAL') highRiskCount++;
      if (d.entities) totalEntities += d.entities.length;
    });

    const hoursSaved = (totalReadTimeMins / 60).toFixed(1);

    document.getElementById('valTimeSaved').textContent = hoursSaved;
    document.getElementById('valPagesIndexed').textContent = totalPages.toLocaleString();
    document.getElementById('valWordCount').textContent = totalWords.toLocaleString();
    document.getElementById('valRiskDetected').textContent = highRiskCount;
    document.getElementById('valEntitiesCount').textContent = totalEntities;

    // Badges in Nav
    document.getElementById('docCounterText').textContent = `${totalDocs} Documents`;
  }

  function getFilteredDocuments() {
    const keyword = (document.getElementById('filterKeywordInput').value || '').toLowerCase().trim();
    const category = document.getElementById('filterCategorySelect').value;
    const risk = document.getElementById('filterRiskSelect').value;
    const sort = document.getElementById('sortBySelect').value;

    return documents.filter(doc => {
      // Keyword
      if (keyword) {
        const inTitle = doc.title.toLowerCase().includes(keyword);
        const inSummary = (doc.executiveSummary || '').toLowerCase().includes(keyword);
        const inText = (doc.rawText || '').toLowerCase().includes(keyword);
        if (!inTitle && !inSummary && !inText) return false;
      }

      // Category
      if (category !== 'ALL' && doc.category !== category) {
        return false;
      }

      // Risk
      if (risk !== 'ALL') {
        if (risk === 'HIGH' && doc.riskLevel !== 'HIGH' && doc.riskLevel !== 'CRITICAL') return false;
        if (risk === 'MEDIUM' && doc.riskLevel !== 'MEDIUM') return false;
        if (risk === 'LOW' && doc.riskLevel !== 'LOW') return false;
      }

      return true;
    }).sort((a, b) => {
      if (sort === 'risk-desc') return (b.riskScore || 0) - (a.riskScore || 0);
      if (sort === 'pages-desc') return (b.pageCount || 0) - (a.pageCount || 0);
      if (sort === 'words-desc') return (b.wordCount || 0) - (a.wordCount || 0);
      if (sort === 'title-asc') return a.title.localeCompare(b.title);
      if (sort === 'recent') return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });
  }

  function renderDocumentList() {
    const filtered = getFilteredDocuments();
    document.getElementById('libraryFilteredCount').textContent = filtered.length;

    if (currentViewMode === 'grid') {
      document.getElementById('documentsGridContainer').style.display = 'grid';
      document.getElementById('documentsTableContainer').style.display = 'none';
      renderGridView(filtered);
    } else {
      document.getElementById('documentsGridContainer').style.display = 'none';
      document.getElementById('documentsTableContainer').style.display = 'block';
      renderTableView(filtered);
    }

    updateSelectionBanner();
  }

  function getCategoryClass(category) {
    switch (category) {
      case 'Legal': return 'category-legal';
      case 'Financial': return 'category-financial';
      case 'Tech & Security': return 'category-security';
      case 'Policy': return 'category-policy';
      case 'Research': return 'category-research';
      default: return '';
    }
  }

  function getRiskClass(level) {
    switch (level) {
      case 'CRITICAL': return 'risk-critical';
      case 'HIGH': return 'risk-high';
      case 'MEDIUM': return 'risk-medium';
      default: return 'risk-low';
    }
  }

  function renderGridView(docs) {
    const container = document.getElementById('documentsGridContainer');
    if (docs.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 48px; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px dashed var(--border-subtle);">
          <p style="color: var(--text-muted); font-size: 1rem;">No documents match your current filter criteria.</p>
          <button type="button" class="btn btn-secondary btn-sm" id="btnResetFilters" style="margin-top: 12px;">Reset Filters</button>
        </div>
      `;
      const btnReset = document.getElementById('btnResetFilters');
      if (btnReset) {
        btnReset.addEventListener('click', () => {
          document.getElementById('filterKeywordInput').value = '';
          document.getElementById('filterCategorySelect').value = 'ALL';
          document.getElementById('filterRiskSelect').value = 'ALL';
          renderDocumentList();
        });
      }
      return;
    }

    container.innerHTML = docs.map(doc => {
      const isSelected = selectedDocIds.has(doc.id);
      const readMins = Math.round(doc.wordCount / 200) || doc.pageCount * 2;
      const topEntities = (doc.entities || []).slice(0, 3);
      const mistakes = detectMistakesInText(doc.rawText);
      const mistakeBadge = mistakes.length > 0
        ? `<span class="doc-card-mistake-pill" title="${mistakes.length} mistakes detected">⚠️ ${mistakes.length} Flags</span>`
        : `<span class="doc-card-mistake-pill zero">✓ Polished</span>`;

      return `
        <div class="doc-card ${isSelected ? 'selected' : ''}" data-doc-id="${doc.id}">
          <div class="doc-card-top">
            <div class="doc-checkbox-wrap">
              <input type="checkbox" class="custom-checkbox doc-item-checkbox" data-doc-id="${doc.id}" ${isSelected ? 'checked' : ''} aria-label="Select ${escapeHtml(doc.title)}">
              <span class="category-badge ${getCategoryClass(doc.category)}">${escapeHtml(doc.category)}</span>
              ${mistakeBadge}
            </div>
            <span class="risk-badge ${getRiskClass(doc.riskLevel)}">${doc.riskLevel} (${doc.riskScore})</span>
          </div>

          <h4 class="doc-card-title">${escapeHtml(doc.title)}</h4>

          <p class="doc-card-summary">${escapeHtml(doc.executiveSummary || 'No summary generated.')}</p>

          <div class="doc-card-stats">
            <span class="doc-stat-col"><strong>${doc.pageCount}</strong> Pages</span>
            <span class="doc-stat-col"><strong>${(doc.wordCount || 0).toLocaleString()}</strong> Words</span>
            <span class="doc-stat-col read-saved-tag">⚡ ${readMins}m saved</span>
          </div>

          <div class="doc-entity-pills">
            ${topEntities.map(e => `
              <span class="entity-pill ${e.type === 'MONEY' ? 'pill-money' : e.type === 'DATE_DEADLINE' ? 'pill-date' : ''}">
                ${escapeHtml(e.name)}
              </span>
            `).join('')}
            ${(doc.entities || []).length > 3 ? `<span class="entity-pill">+${(doc.entities || []).length - 3} more</span>` : ''}
          </div>

          <div class="doc-card-footer">
            <span style="font-size: 0.72rem; color: var(--text-muted);">${doc.fileFormat.toUpperCase()} • ${doc.createdAt}</span>
            <div class="card-actions">
              <button type="button" class="btn btn-secondary btn-sm btn-proofread-card" data-doc-id="${doc.id}" title="Inspect and clear mistakes with AI">
                🔍 Proofread (${mistakes.length})
              </button>
              <button type="button" class="btn btn-secondary btn-sm btn-inspect" data-doc-id="${doc.id}">
                Inspect Brief
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click events
    container.querySelectorAll('.doc-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.custom-checkbox') || e.target.closest('.btn-inspect') || e.target.closest('.btn-proofread-card')) return;
        const docId = card.getAttribute('data-doc-id');
        openDocumentDetailModal(docId);
      });
    });

    container.querySelectorAll('.btn-inspect').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const docId = btn.getAttribute('data-doc-id');
        openDocumentDetailModal(docId);
      });
    });

    container.querySelectorAll('.btn-proofread-card').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const docId = btn.getAttribute('data-doc-id');
        window.OmniApp.proofreadDoc(docId);
      });
    });

    container.querySelectorAll('.doc-item-checkbox').forEach(cb => {
      cb.addEventListener('change', (e) => {
        e.stopPropagation();
        const docId = cb.getAttribute('data-doc-id');
        toggleDocSelection(docId, cb.checked);
      });
    });
  }

  function renderTableView(docs) {
    const tbody = document.getElementById('documentsTableBody');
    if (docs.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:32px; color:var(--text-muted);">No documents match criteria.</td></tr>`;
      return;
    }

    tbody.innerHTML = docs.map(doc => {
      const isSelected = selectedDocIds.has(doc.id);
      const readMins = Math.round(doc.wordCount / 200) || doc.pageCount * 2;
      const topEntities = (doc.entities || []).slice(0, 2).map(e => e.name).join(', ');
      const mistakes = detectMistakesInText(doc.rawText);
      const mistakeBadge = mistakes.length > 0
        ? `<span class="doc-card-mistake-pill" title="${mistakes.length} mistakes detected">⚠️ ${mistakes.length} Flags</span>`
        : `<span class="doc-card-mistake-pill zero">✓ Polished</span>`;

      return `
        <tr class="${isSelected ? 'selected' : ''}">
          <td>
            <input type="checkbox" class="custom-checkbox doc-item-checkbox" data-doc-id="${doc.id}" ${isSelected ? 'checked' : ''} aria-label="Select document">
          </td>
          <td>
            <div style="display:flex; align-items:center; gap:8px;">
              <strong class="table-doc-title" style="cursor:pointer;" onclick="window.OmniApp.openDoc('${doc.id}')">${escapeHtml(doc.title)}</strong>
              ${mistakeBadge}
            </div>
          </td>
          <td>
            <span class="category-badge ${getCategoryClass(doc.category)}">${escapeHtml(doc.category)}</span>
          </td>
          <td>${doc.pageCount} pgs / ${(doc.wordCount || 0).toLocaleString()} words</td>
          <td><span class="read-saved-tag">⚡ ${readMins} mins</span></td>
          <td><span class="risk-badge ${getRiskClass(doc.riskLevel)}">${doc.riskLevel} (${doc.riskScore})</span></td>
          <td><span style="font-size:0.75rem; color:var(--text-muted);">${escapeHtml(topEntities || 'None')}</span></td>
          <td>
            <div style="display:flex; gap:6px;">
              <button type="button" class="btn btn-secondary btn-sm" onclick="window.OmniApp.proofreadDoc('${doc.id}')" title="Inspect & clear mistakes">🔍 Proofread (${mistakes.length})</button>
              <button type="button" class="btn btn-secondary btn-sm" onclick="window.OmniApp.openDoc('${doc.id}')">Inspect</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('.doc-item-checkbox').forEach(cb => {
      cb.addEventListener('change', () => {
        const docId = cb.getAttribute('data-doc-id');
        toggleDocSelection(docId, cb.checked);
      });
    });
  }

  function toggleDocSelection(docId, isChecked) {
    if (isChecked) {
      selectedDocIds.add(docId);
    } else {
      selectedDocIds.delete(docId);
    }
    updateSelectionBanner();
    renderDocumentList();
  }

  function updateSelectionBanner() {
    const banner = document.getElementById('multiSelectBanner');
    const countNumber = document.getElementById('selectedCountNumber');
    const compareCountNav = document.getElementById('compareCount');

    const count = selectedDocIds.size;
    compareCountNav.textContent = count;

    if (count > 0) {
      banner.style.display = 'flex';
      countNumber.textContent = count;
    } else {
      banner.style.display = 'none';
    }
  }

  // Analytics & Insights Section
  function renderInsights() {
    // 1. Category Distribution
    const catCounts = {};
    documents.forEach(d => {
      catCounts[d.category] = (catCounts[d.category] || 0) + 1;
    });

    const catChartContainer = document.getElementById('categoryDistributionChart');
    const totalDocs = documents.length || 1;
    catChartContainer.innerHTML = Object.entries(catCounts).map(([cat, count]) => {
      const pct = Math.round((count / totalDocs) * 100);
      let color = 'var(--accent-cyan)';
      if (cat === 'Legal') color = '#f472b6';
      if (cat === 'Financial') color = '#34d399';
      if (cat === 'Tech & Security') color = '#60a5fa';
      if (cat === 'Policy') color = '#fbbf24';
      if (cat === 'Research') color = '#a78bfa';

      return `
        <div class="chart-bar-item">
          <div class="chart-bar-labels">
            <span>${cat}</span>
            <span>${count} docs (${pct}%)</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width: ${pct}%; background: ${color};"></div>
          </div>
        </div>
      `;
    }).join('');

    // 2. Extracted Entities Cloud
    const entityFreq = {};
    documents.forEach(d => {
      (d.entities || []).forEach(e => {
        entityFreq[e.name] = (entityFreq[e.name] || 0) + 1;
      });
    });

    const topEntities = Object.entries(entityFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 14);

    const cloudContainer = document.getElementById('entitiesCloud');
    cloudContainer.innerHTML = topEntities.map(([name, freq]) => `
      <span class="cloud-tag">
        ${escapeHtml(name)}
        <span class="cloud-tag-count">${freq}</span>
      </span>
    `).join('');

    // 3. Risk Hotspots
    const riskFindingsContainer = document.getElementById('riskFindingsList');
    const highRiskDocs = documents.filter(d => d.riskLevel === 'HIGH' || d.riskLevel === 'CRITICAL');

    if (highRiskDocs.length === 0) {
      riskFindingsContainer.innerHTML = `<p style="font-size:0.8rem; color:var(--text-muted);">No urgent critical risks detected across active repository.</p>`;
    } else {
      riskFindingsContainer.innerHTML = highRiskDocs.map(d => `
        <div class="risk-finding-item">
          <span class="risk-finding-icon">⚠️</span>
          <div class="risk-finding-content">
            <strong>${escapeHtml(d.title)}</strong>
            <p>${escapeHtml(d.keyTakeaways && d.keyTakeaways[1] ? d.keyTakeaways[1] : d.executiveSummary)}</p>
          </div>
        </div>
      `).join('');
    }
  }

  function renderAll() {
    renderMetrics();
    renderDocumentList();
    renderInsights();
  }

  // =========================================================================
  // 6. DOCUMENT DETAIL MODAL (Deep Inspection Drawer)
  // =========================================================================
  function openDocumentDetailModal(docId) {
    const doc = documents.find(d => d.id === docId);
    if (!doc) return;
    activeDetailDoc = doc;

    document.getElementById('detailDocCategory').textContent = doc.category;
    document.getElementById('detailDocCategory').className = `category-badge ${getCategoryClass(doc.category)}`;
    document.getElementById('detailDocTitle').textContent = doc.title;

    const riskBadge = document.getElementById('detailDocRiskBadge');
    riskBadge.textContent = `${doc.riskLevel} RISK (${doc.riskScore} / 10)`;
    riskBadge.className = `risk-badge ${getRiskClass(doc.riskLevel)}`;

    // Stats Bar
    const readMins = Math.round(doc.wordCount / 200) || doc.pageCount * 2;
    document.getElementById('detailPages').textContent = doc.pageCount;
    document.getElementById('detailWords').textContent = (doc.wordCount || 0).toLocaleString();
    document.getElementById('detailTimeSaved').textContent = `${readMins} mins saved`;
    document.getElementById('detailRiskScore').textContent = `${doc.riskScore} / 10`;
    document.getElementById('detailConfidence').textContent = `${Math.round((doc.confidenceScore || 0.98) * 100)}%`;

    // Tab 1: Executive Summary
    document.getElementById('detailExecutiveSummaryText').textContent = doc.executiveSummary || 'No summary available.';
    const sentencesList = document.getElementById('detailRankedSentencesList');
    const sentences = generateExtractiveSummary(doc.rawText, 5);
    sentencesList.innerHTML = sentences.map(s => `<li>${escapeHtml(s)}</li>`).join('');

    // Tab 2: Takeaways
    const takeawaysList = document.getElementById('detailTakeawaysList');
    const takeaways = doc.keyTakeaways && doc.keyTakeaways.length > 0 ? doc.keyTakeaways : sentences;
    takeawaysList.innerHTML = takeaways.map((t, idx) => `
      <div class="takeaway-item">
        <span style="color:var(--accent-cyan); font-weight:700;">#${idx + 1}</span>
        <span>${escapeHtml(t)}</span>
      </div>
    `).join('');

    // Tab 3: Entities Table
    const entitiesTbody = document.getElementById('detailEntitiesTableBody');
    if (doc.entities && doc.entities.length > 0) {
      entitiesTbody.innerHTML = doc.entities.map(e => `
        <tr>
          <td><span class="entity-pill">${e.type}</span></td>
          <td><strong>${escapeHtml(e.name)}</strong></td>
          <td>1+</td>
          <td><span style="font-size:0.75rem; color:var(--text-secondary);">${escapeHtml(e.context || 'Document body')}</span></td>
        </tr>
      `).join('');
    } else {
      entitiesTbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-muted);">No named entities identified.</td></tr>`;
    }

    // Tab 4: Chunks
    const chunksContainer = document.getElementById('detailChunksList');
    if (doc.chunks && doc.chunks.length > 0) {
      chunksContainer.innerHTML = doc.chunks.map(c => `
        <div class="chunk-card ${c.hasRisk ? 'chunk-risk' : ''}">
          <div class="chunk-header">
            <strong>${escapeHtml(c.heading)}</strong>
            ${c.hasRisk ? '<span class="risk-badge risk-high">Flagged Risk</span>' : '<span style="color:var(--text-muted);">Standard Clause</span>'}
          </div>
          <p style="font-size:0.86rem; color:#e2e8f0; line-height:1.6;">${escapeHtml(c.content)}</p>
          ${c.rationale ? `<div style="margin-top:6px; font-size:0.75rem; color:var(--accent-rose);">⚠️ ${escapeHtml(c.rationale)}</div>` : ''}
        </div>
      `).join('');
    } else {
      chunksContainer.innerHTML = `<p style="color:var(--text-muted);">No chunk segmentation available.</p>`;
    }

    // Tab 5: Raw text with highlights
    const rawContainer = document.getElementById('detailRawTextContent');
    rawContainer.innerHTML = highlightDocumentKeywords(doc.rawText);

    // Tab 6: Document Mistakes
    renderDetailModalMistakes(doc);

    // Reset to Tab 1
    switchModalTab('docDetailModal', 'tabSummary');

    document.getElementById('docDetailModal').style.display = 'flex';
  }

  function highlightDocumentKeywords(text) {
    if (!text) return '';
    let escaped = escapeHtml(text);
    // Highlight dollar amounts and numbers
    escaped = escaped.replace(/(\$\d[\d,.]*(?:\s?(?:million|billion|hour|hr))?)/gi, '<mark>$1</mark>');
    escaped = escaped.replace(/(UNCAPPED|uncapped|breach|penalty|liability)/gi, '<mark style="background:rgba(244,63,94,0.3); color:#fda4af;">$1</mark>');
    return escaped;
  }

  // =========================================================================
  // 6b. DETAIL MODAL MISTAKE RESOLUTION HANDLERS
  // =========================================================================
  function renderDetailModalMistakes(doc) {
    if (!doc) return;
    const mistakes = detectMistakesInText(doc.rawText);
    const countBadge = document.getElementById('detailMistakesCount');
    if (countBadge) countBadge.textContent = mistakes.length;

    const listContainer = document.getElementById('detailMistakesList');
    if (!listContainer) return;

    if (mistakes.length === 0) {
      listContainer.innerHTML = `
        <div class="all-clear-state" style="padding: 32px 16px; text-align: center;">
          <div class="all-clear-icon">🎉</div>
          <h4 style="margin: 8px 0; color: var(--accent-emerald);">Document is 100% Polished!</h4>
          <p style="color: var(--text-secondary); font-size: 0.88rem;">No spelling errors, grammatical slips, or terminology inconsistencies detected.</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = mistakes.map((m, idx) => `
      <div class="doc-mistake-item" id="modalMistakeItem_${m.id}">
        <div class="doc-mistake-left">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
            <span class="mistake-badge ${m.category.toLowerCase()}">${m.category}</span>
            <span class="severity-pill ${m.severity.toLowerCase()}">${m.severity} RISK</span>
          </div>
          <div class="word-comparison-row">
            <span class="original-word">${escapeHtml(m.word)}</span>
            <span class="arrow-sep">➔</span>
            <span class="suggested-word">${escapeHtml(m.suggestion)}</span>
          </div>
          <p class="mistake-reason-text">${escapeHtml(m.explanation)}</p>
          <div class="mistake-context-box">"${escapeHtml(m.context)}"</div>
        </div>
        <div class="doc-mistake-right">
          <button type="button" class="btn btn-primary btn-sm btn-clear-single-ai" onclick="window.OmniApp.clearModalMistake('${doc.id}', '${m.id}')">
            ✨ Clear with AI
          </button>
        </div>
      </div>
    `).join('');
  }

  function clearModalDocMistake(docId, mistakeId) {
    const doc = documents.find(d => d.id === docId);
    if (!doc) return;
    const mistakes = detectMistakesInText(doc.rawText);
    const m = mistakes.find(item => item.id === mistakeId);
    if (!m) return;

    recordMistakeHistory({
      docTitle: doc.title,
      mistakeWord: m.word,
      suggestion: m.suggestion,
      category: m.category,
      severity: m.severity,
      explanation: m.explanation,
      contextSnippet: m.context,
      status: 'CLEARED'
    });

    const res = clearMistakeInText(doc.rawText, mistakeId, mistakes);
    doc.rawText = res.text;
    saveCorpus();

    renderDetailModalMistakes(doc);
    const rawContainer = document.getElementById('detailRawTextContent');
    if (rawContainer) rawContainer.innerHTML = highlightDocumentKeywords(doc.rawText);
    renderDocumentList();
    renderMetrics();
    updateGlobalMistakeBadges();

    showToast(`AI cleared "${m.word}" ➔ "${m.suggestion}" in ${doc.title}!`, 'success');
  }

  function clearAllModalDocMistakes() {
    if (!activeDetailDoc) return;
    const doc = activeDetailDoc;
    const mistakes = detectMistakesInText(doc.rawText);
    if (mistakes.length === 0) {
      showToast('Document already polished — zero mistakes!', 'info');
      return;
    }

    mistakes.forEach(m => {
      recordMistakeHistory({
        docTitle: doc.title,
        mistakeWord: m.word,
        suggestion: m.suggestion,
        category: m.category,
        severity: m.severity,
        explanation: m.explanation,
        contextSnippet: m.context,
        status: 'CLEARED'
      });
    });

    const res = clearAllMistakesInText(doc.rawText, mistakes);
    doc.rawText = res.text;
    saveCorpus();

    renderDetailModalMistakes(doc);
    const rawContainer = document.getElementById('detailRawTextContent');
    if (rawContainer) rawContainer.innerHTML = highlightDocumentKeywords(doc.rawText);
    renderDocumentList();
    renderMetrics();
    updateGlobalMistakeBadges();

    showToast(`Cleared all ${mistakes.length} mistakes in ${doc.title} with AI!`, 'success');
  }

  // =========================================================================
  // 6c. AI MISTAKES STUDIO & AUTO-PROOFREADER CONTROLLER
  // =========================================================================
  function getStudioDocTitle() {
    if (studioCurrentDocId && studioCurrentDocId.startsWith('doc-')) {
      const doc = documents.find(d => d.id === studioCurrentDocId);
      if (doc) return doc.title;
    }
    if (studioCurrentDocId === 'sample-sla') return 'Master Cloud Services Agreement (Demo SLA)';
    if (studioCurrentDocId === 'sample-finance') return 'Q3 Financial Performance Memo';
    if (studioCurrentDocId === 'sample-security') return 'ISO/IEC 27001 Security Audit';
    return 'Custom Proofreader Scratchpad';
  }

  function populateStudioDocSelect() {
    const select = document.getElementById('studioDocSelect');
    if (!select) return;

    let html = `<optgroup label="Active Repository Documents">`;
    documents.forEach(doc => {
      const flags = detectMistakesInText(doc.rawText).length;
      html += `<option value="${doc.id}">${escapeHtml(doc.title)} (${flags} flags)</option>`;
    });
    html += `</optgroup>`;

    html += `
      <optgroup label="Preset Practice Scenarios">
        <option value="sample-sla">⚠️ Cloud SLA (9 Typos)</option>
        <option value="sample-finance">📈 Financial Memo (6 Errors)</option>
        <option value="sample-security">🛡️ Security Policy (5 Flags)</option>
        <option value="scratchpad">✍️ Clean Scratchpad</option>
      </optgroup>
    `;

    select.innerHTML = html;
    if (studioCurrentDocId) select.value = studioCurrentDocId;
  }

  function loadStudioTarget(targetId) {
    studioCurrentDocId = targetId;
    const select = document.getElementById('studioDocSelect');
    if (select && select.value !== targetId) select.value = targetId;

    if (targetId === 'sample-sla') {
      studioText = DEMO_SLA_SAMPLE;
    } else if (targetId === 'sample-finance') {
      studioText = DEMO_FINANCIAL_SAMPLE;
    } else if (targetId === 'sample-security') {
      studioText = DEMO_SECURITY_SAMPLE;
    } else if (targetId === 'scratchpad') {
      studioText = DEMO_SCRATCHPAD_SAMPLE;
    } else {
      const doc = documents.find(d => d.id === targetId);
      studioText = doc ? doc.rawText : DEMO_SLA_SAMPLE;
    }

    const rawEditor = document.getElementById('rawTextEditor');
    if (rawEditor) rawEditor.value = studioText;

    runStudioAiScan();
  }

  function runStudioAiScan() {
    // Laser line scan animation
    const laser = document.getElementById('laserScannerLine');
    if (laser) {
      laser.classList.remove('scanning');
      void laser.offsetWidth;
      laser.classList.add('scanning');
    }

    studioMistakes = detectMistakesInText(studioText);

    // Compute metrics
    const spelling = studioMistakes.filter(m => m.category === 'Spelling').length;
    const grammar = studioMistakes.filter(m => m.category === 'Grammar').length;
    const terminology = studioMistakes.filter(m => m.category === 'Terminology').length;
    const typos = studioMistakes.filter(m => m.category === 'Typo').length;
    const words = (studioText.trim().split(/\s+/).filter(Boolean)).length;
    const chars = studioText.length;
    const polish = words > 0 ? Math.max(72, Math.min(100, Math.round(100 - (studioMistakes.length / words) * 200))) : 100;

    // Update DOM counters
    const elFound = document.getElementById('studioMistakesFound');
    if (elFound) elFound.textContent = studioMistakes.length;
    const elSpell = document.getElementById('studioSpellingCount');
    if (elSpell) elSpell.textContent = spelling + typos;
    const elGram = document.getElementById('studioGrammarCount');
    if (elGram) elGram.textContent = grammar;
    const elTerm = document.getElementById('studioTerminologyCount');
    if (elTerm) elTerm.textContent = terminology;
    const elScore = document.getElementById('studioQualityScore');
    if (elScore) elScore.textContent = studioMistakes.length === 0 ? '100%' : `${polish}%`;

    const elInspCount = document.getElementById('inspectorMistakesCount');
    if (elInspCount) elInspCount.textContent = studioMistakes.length;

    const elWords = document.getElementById('editorWordCount');
    if (elWords) elWords.textContent = words.toLocaleString();
    const elChars = document.getElementById('editorCharCount');
    if (elChars) elChars.textContent = chars.toLocaleString();

    // Filter chip badges
    const cAll = document.getElementById('chipCountAll');
    if (cAll) cAll.textContent = studioMistakes.length;
    const cSpell = document.getElementById('chipCountSpelling');
    if (cSpell) cSpell.textContent = spelling;
    const cGram = document.getElementById('chipCountGrammar');
    if (cGram) cGram.textContent = grammar;
    const cTerm = document.getElementById('chipCountTerminology');
    if (cTerm) cTerm.textContent = terminology;
    const cTypo = document.getElementById('chipCountTypo');
    if (cTypo) cTypo.textContent = typos;

    renderStudioHighlightedText();
    renderStudioMistakeCards();

    // Toggle All Clear banner
    const banner = document.getElementById('allClearBanner');
    const cardsScroll = document.getElementById('mistakesCardsContainer');
    if (studioMistakes.length === 0) {
      if (banner) banner.style.display = 'block';
      if (cardsScroll) cardsScroll.style.display = 'none';
    } else {
      if (banner) banner.style.display = 'none';
      if (cardsScroll) cardsScroll.style.display = 'flex';
    }

    updateGlobalMistakeBadges();
  }

  function renderStudioHighlightedText() {
    const container = document.getElementById('highlightedTextBox');
    if (!container) return;

    if (!studioText) {
      container.innerHTML = '<span style="color:var(--text-muted); font-style:italic;">No text loaded. Type or select a document to proofread.</span>';
      return;
    }

    if (studioMistakes.length === 0) {
      container.innerHTML = escapeHtml(studioText).replace(/\n/g, '<br>');
      return;
    }

    // Build highlighted HTML preserving character positions
    let html = '';
    let curIndex = 0;

    studioMistakes.forEach(m => {
      if (m.startIndex > curIndex) {
        html += escapeHtml(studioText.substring(curIndex, m.startIndex));
      }
      html += `<span class="mistake-mark ${m.category.toLowerCase()}" data-mistake-id="${m.id}" title="${m.category.toUpperCase()}: Click to inspect '${escapeHtml(m.word)}'">${escapeHtml(m.word)}</span>`;
      curIndex = m.endIndex;
    });

    if (curIndex < studioText.length) {
      html += escapeHtml(studioText.substring(curIndex));
    }

    container.innerHTML = html.replace(/\n/g, '<br>');

    // Click handler on mistake marks: scroll inspector card into view
    container.querySelectorAll('.mistake-mark').forEach(span => {
      span.addEventListener('click', () => {
        const id = span.getAttribute('data-mistake-id');
        container.querySelectorAll('.mistake-mark').forEach(s => s.classList.remove('active-mark'));
        span.classList.add('active-mark');

        const card = document.getElementById(`studioMistakeCard_${id}`);
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          card.classList.remove('card-highlight-pulse');
          void card.offsetWidth;
          card.classList.add('card-highlight-pulse');
        }
      });
    });
  }

  function renderStudioMistakeCards() {
    const container = document.getElementById('mistakesCardsContainer');
    if (!container) return;

    let filtered = studioMistakes;
    if (studioActiveFilter !== 'ALL') {
      filtered = studioMistakes.filter(m => m.category.toLowerCase() === studioActiveFilter.toLowerCase());
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.88rem;">
          No mistakes in category "${studioActiveFilter}".
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map((m, idx) => `
      <div class="mistake-card ${m.category.toLowerCase()}" id="studioMistakeCard_${m.id}">
        <div class="mistake-card-header">
          <div class="mistake-card-tags">
            <span class="mistake-badge ${m.category.toLowerCase()}">${m.category}</span>
            <span class="severity-pill ${m.severity.toLowerCase()}">${m.severity} RISK</span>
          </div>
          <span class="mistake-card-index">#${idx + 1}</span>
        </div>

        <div class="word-comparison-row">
          <span class="original-word">${escapeHtml(m.word)}</span>
          <span class="arrow-sep">➔</span>
          <span class="suggested-word">${escapeHtml(m.suggestion)}</span>
        </div>

        <p class="mistake-reason-text">${escapeHtml(m.explanation)}</p>
        <div class="mistake-context-box">"${escapeHtml(m.context)}"</div>

        <div class="mistake-card-actions">
          <button type="button" class="btn btn-primary btn-sm btn-clear-single-ai" onclick="window.OmniApp.clearSingleMistake('${m.id}')">
            ✨ Clear with AI
          </button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="window.OmniApp.dismissMistake('${m.id}')">
            Dismiss
          </button>
        </div>
      </div>
    `).join('');
  }

  function clearStudioMistake(mistakeId) {
    const m = studioMistakes.find(item => item.id === mistakeId);
    if (!m) return;

    recordMistakeHistory({
      docTitle: getStudioDocTitle(),
      mistakeWord: m.word,
      suggestion: m.suggestion,
      category: m.category,
      severity: m.severity,
      explanation: m.explanation,
      contextSnippet: m.context,
      status: 'CLEARED'
    });

    const res = clearMistakeInText(studioText, mistakeId, studioMistakes);
    studioText = res.text;

    const rawEditor = document.getElementById('rawTextEditor');
    if (rawEditor) rawEditor.value = studioText;

    if (studioCurrentDocId && studioCurrentDocId.startsWith('doc-')) {
      const doc = documents.find(d => d.id === studioCurrentDocId);
      if (doc) {
        doc.rawText = studioText;
        saveCorpus();
        renderDocumentList();
        renderMetrics();
      }
    }

    runStudioAiScan();
    showToast(`AI cleared "${m.word}" ➔ "${m.suggestion}"!`, 'success');
  }

  function clearAllStudioMistakes() {
    if (studioMistakes.length === 0) {
      showToast('Document already polished — zero mistakes!', 'info');
      return;
    }

    const count = studioMistakes.length;
    studioMistakes.forEach(m => {
      recordMistakeHistory({
        docTitle: getStudioDocTitle(),
        mistakeWord: m.word,
        suggestion: m.suggestion,
        category: m.category,
        severity: m.severity,
        explanation: m.explanation,
        contextSnippet: m.context,
        status: 'CLEARED'
      });
    });

    const res = clearAllMistakesInText(studioText, studioMistakes);
    studioText = res.text;

    const rawEditor = document.getElementById('rawTextEditor');
    if (rawEditor) rawEditor.value = studioText;

    if (studioCurrentDocId && studioCurrentDocId.startsWith('doc-')) {
      const doc = documents.find(d => d.id === studioCurrentDocId);
      if (doc) {
        doc.rawText = studioText;
        saveCorpus();
        renderDocumentList();
        renderMetrics();
      }
    }

    runStudioAiScan();
    showToast(`Successfully cleared all ${count} mistakes with AI!`, 'success');
  }

  function dismissStudioMistake(mistakeId) {
    const m = studioMistakes.find(item => item.id === mistakeId);
    if (!m) return;

    recordMistakeHistory({
      docTitle: getStudioDocTitle(),
      mistakeWord: m.word,
      suggestion: m.suggestion,
      category: m.category,
      severity: m.severity,
      explanation: m.explanation,
      contextSnippet: m.context,
      status: 'DISMISSED'
    });

    studioMistakes = studioMistakes.filter(item => item.id !== mistakeId);

    renderStudioHighlightedText();
    renderStudioMistakeCards();

    const elFound = document.getElementById('studioMistakesFound');
    if (elFound) elFound.textContent = studioMistakes.length;
    const elInspCount = document.getElementById('inspectorMistakesCount');
    if (elInspCount) elInspCount.textContent = studioMistakes.length;

    if (studioMistakes.length === 0) {
      const banner = document.getElementById('allClearBanner');
      const cardsScroll = document.getElementById('mistakesCardsContainer');
      if (banner) banner.style.display = 'block';
      if (cardsScroll) cardsScroll.style.display = 'none';
    }

    updateGlobalMistakeBadges();
    showToast(`Dismissed mistake flag for "${m.word}".`, 'info');
  }

  function saveStudioTextToDocument() {
    if (studioCurrentDocId && studioCurrentDocId.startsWith('doc-')) {
      const doc = documents.find(d => d.id === studioCurrentDocId);
      if (doc) {
        doc.rawText = studioText;
        doc.wordCount = studioText.trim().split(/\s+/).filter(Boolean).length;
        saveCorpus();
        renderDocumentList();
        renderMetrics();
        showToast(`Saved polished text to "${doc.title}"!`, 'success');
        return;
      }
    }

    const title = prompt('Enter a title to save this polished text into your repository:', getStudioDocTitle());
    if (title && title.trim()) {
      processNewDocument({
        title: title.trim(),
        category: 'Legal',
        rawText: studioText
      });
      populateStudioDocSelect();
      showToast(`Saved new document "${title.trim()}" to repository!`, 'success');
    }
  }

  function initStudio() {
    populateStudioDocSelect();
    const initialTarget = documents.length > 0 ? documents[0].id : 'sample-sla';
    loadStudioTarget(initialTarget);
  }

  // =========================================================================
  // 6d. MISTAKES HISTORY LEDGER & AUDIT TRAIL
  // =========================================================================
  function initMistakesHistory() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          mistakesHistory = parsed;
          renderMistakesHistory();
          return;
        }
      }
    } catch (e) {
      console.warn('Could not read mistake history:', e);
    }
    mistakesHistory = JSON.parse(JSON.stringify(SEED_MISTAKES_HISTORY));
    saveMistakesHistory();
    renderMistakesHistory();
  }

  function saveMistakesHistory() {
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(mistakesHistory));
    } catch (e) {
      console.warn('LocalStorage save history failed:', e);
    }
  }

  function recordMistakeHistory(entry) {
    const newEntry = {
      id: `mstk-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      docTitle: entry.docTitle || 'Corpus Document',
      mistakeWord: entry.mistakeWord,
      suggestion: entry.suggestion,
      category: entry.category || 'Spelling',
      severity: entry.severity || 'MEDIUM',
      explanation: entry.explanation || '',
      contextSnippet: entry.contextSnippet || '',
      status: entry.status || 'CLEARED',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    mistakesHistory.unshift(newEntry);
    saveMistakesHistory();
    renderMistakesHistory();

    const subnavCount = document.getElementById('subnavHistoryCount');
    if (subnavCount) subnavCount.textContent = mistakesHistory.length;
  }

  function revertMistakeHistory(historyId) {
    const item = mistakesHistory.find(h => h.id === historyId);
    if (!item) return;

    item.status = 'REVERTED';
    saveMistakesHistory();
    renderMistakesHistory();
    showToast(`Reverted correction for "${item.mistakeWord}".`, 'warning');
  }

  function renderMistakesHistory() {
    const searchVal = (document.getElementById('filterHistorySearch')?.value || '').toLowerCase().trim();
    const statusVal = document.getElementById('filterHistoryStatus')?.value || 'ALL';
    const catVal = document.getElementById('filterHistoryCategory')?.value || 'ALL';

    const filtered = mistakesHistory.filter(item => {
      const matchSearch = !searchVal ||
        (item.mistakeWord || '').toLowerCase().includes(searchVal) ||
        (item.suggestion || '').toLowerCase().includes(searchVal) ||
        (item.docTitle || '').toLowerCase().includes(searchVal);
      const matchStatus = statusVal === 'ALL' || item.status === statusVal;
      const matchCat = catVal === 'ALL' || item.category === catVal;
      return matchSearch && matchStatus && matchCat;
    });

    const clearedCount = mistakesHistory.filter(h => h.status === 'CLEARED').length;
    const totalCount = mistakesHistory.length;
    const accuracy = totalCount > 0 ? (99 + (clearedCount / (totalCount + 10)) * 0.9).toFixed(1) : '99.5';
    const timeSavedMins = Math.max(12, clearedCount * 2);

    const elCleared = document.getElementById('historyTotalCleared');
    if (elCleared) elCleared.textContent = clearedCount;
    const elAcc = document.getElementById('historyAccuracyRate');
    if (elAcc) elAcc.textContent = `${accuracy}%`;
    const elSaved = document.getElementById('historyTimeSaved');
    if (elSaved) elSaved.textContent = `${timeSavedMins} Mins`;

    let globalOpen = 0;
    documents.forEach(d => { globalOpen += detectMistakesInText(d.rawText).length; });
    const elOpen = document.getElementById('historyOpenFlags');
    if (elOpen) elOpen.textContent = globalOpen;

    const elFiltered = document.getElementById('historyFilteredCount');
    if (elFiltered) elFiltered.textContent = filtered.length;

    const subnavHist = document.getElementById('subnavHistoryCount');
    if (subnavHist) subnavHist.textContent = mistakesHistory.length;

    const tbody = document.getElementById('historyTableBody');
    if (!tbody) return;

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:32px; color:var(--text-muted);">No mistake history records match filters.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(item => {
      const statusClass = item.status === 'CLEARED' ? 'status-pill-cleared' : item.status === 'DISMISSED' ? 'status-pill-dismissed' : 'status-pill-reverted';
      return `
        <tr>
          <td><span style="font-size:0.75rem; color:var(--text-muted);">${escapeHtml(item.timestamp)}</span></td>
          <td><strong style="color:var(--text-primary); font-size:0.84rem;">${escapeHtml(item.docTitle)}</strong></td>
          <td><span class="history-mistake-word">${escapeHtml(item.mistakeWord)}</span></td>
          <td><span class="history-fixed-word">${escapeHtml(item.suggestion)}</span></td>
          <td><span class="mistake-badge ${item.category.toLowerCase()}">${escapeHtml(item.category)}</span></td>
          <td><span class="history-status-pill ${statusClass}">${escapeHtml(item.status)}</span></td>
          <td>
            ${item.status === 'CLEARED'
              ? `<button type="button" class="btn btn-secondary btn-sm" onclick="window.OmniApp.revertHistory('${item.id}')" title="Revert AI correction">Revert</button>`
              : `<span style="font-size:0.75rem; color:var(--text-muted);">Locked</span>`
            }
          </td>
        </tr>
      `;
    }).join('');
  }

  function exportMistakeHistoryCsv() {
    if (mistakesHistory.length === 0) {
      showToast('No history records to export.', 'info');
      return;
    }

    let csv = 'ID,Resolved At,Source Document,Mistake Word,AI Suggestion,Category,Severity,Status,Explanation\n';
    mistakesHistory.forEach(h => {
      csv += `"${h.id}","${h.timestamp}","${(h.docTitle || '').replace(/"/g, '""')}","${(h.mistakeWord || '').replace(/"/g, '""')}","${(h.suggestion || '').replace(/"/g, '""')}","${h.category}","${h.severity}","${h.status}","${(h.explanation || '').replace(/"/g, '""')}"\n`;
    });

    downloadFile('omnidoc_ai_mistakes_history.csv', csv, 'text/csv');
    showToast('Exported AI Mistakes History CSV!', 'success');
  }

  function clearMistakeHistoryLog() {
    if (confirm('Are you sure you want to clear the mistake resolution audit history?')) {
      mistakesHistory = [];
      saveMistakesHistory();
      renderMistakesHistory();
      showToast('Cleared mistake history audit log.', 'info');
    }
  }

  function updateGlobalMistakeBadges() {
    let totalFlags = 0;
    documents.forEach(d => {
      totalFlags += detectMistakesInText(d.rawText).length;
    });

    const navText = document.getElementById('navMistakesText');
    if (navText) navText.textContent = `AI Proofreader: ${totalFlags} Flags`;

    const subnavBadge = document.getElementById('subnavMistakeCount');
    if (subnavBadge) subnavBadge.textContent = totalFlags;

    const docCounter = document.getElementById('docCounterText');
    if (docCounter) docCounter.textContent = `${documents.length} Documents`;

    const historyOpen = document.getElementById('historyOpenFlags');
    if (historyOpen) historyOpen.textContent = totalFlags;
  }

  // =========================================================================
  // 7. CROSS-DOCUMENT COMPARATIVE MATRIX
  // =========================================================================
  function openComparisonMatrix() {
    let docsToCompare = documents.filter(d => selectedDocIds.has(d.id));

    // If none selected, default to top 3 documents
    if (docsToCompare.length < 2) {
      docsToCompare = documents.slice(0, 3);
      docsToCompare.forEach(d => selectedDocIds.add(d.id));
      updateSelectionBanner();
    }

    const wrapper = document.getElementById('comparisonMatrixWrapper');

    let matrixHtml = `
      <table class="matrix-table">
        <thead>
          <tr>
            <th class="matrix-dimension-col">Comparison Dimension</th>
            ${docsToCompare.map(d => `
              <th>
                <div style="font-size:0.95rem; color:#fff; margin-bottom:4px;">${escapeHtml(d.title)}</div>
                <div style="display:flex; gap:6px;">
                  <span class="category-badge ${getCategoryClass(d.category)}">${d.category}</span>
                  <span class="risk-badge ${getRiskClass(d.riskLevel)}">${d.riskLevel}</span>
                </div>
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="matrix-dimension-col">Primary Purpose</td>
            ${docsToCompare.map(d => `<td>${escapeHtml(d.executiveSummary || '')}</td>`).join('')}
          </tr>
          <tr>
            <td class="matrix-dimension-col">Volume & Reading Time</td>
            ${docsToCompare.map(d => `<td><strong>${d.pageCount} Pages</strong> (${(d.wordCount || 0).toLocaleString()} words)<br><span class="read-saved-tag">⚡ Saved ~${Math.round(d.wordCount / 200)} mins</span></td>`).join('')}
          </tr>
          <tr>
            <td class="matrix-dimension-col">Risk Level & Score</td>
            ${docsToCompare.map(d => `
              <td>
                <span class="risk-badge ${getRiskClass(d.riskLevel)}">${d.riskLevel} (${d.riskScore} / 10)</span>
                <p style="margin-top:6px; font-size:0.75rem; color:var(--text-secondary);">${d.riskLevel === 'HIGH' ? 'Critical uncapped terms or statutory penalties' : d.riskLevel === 'MEDIUM' ? 'Requires calendar audit compliance tracking' : 'Standard low operational exposure'}</p>
              </td>
            `).join('')}
          </tr>
          <tr>
            <td class="matrix-dimension-col">Key Financial & Metric Figures</td>
            ${docsToCompare.map(d => {
              const moneys = (d.entities || []).filter(e => e.type === 'MONEY' || e.type === 'METRIC').map(e => e.name);
              return `<td>${moneys.length > 0 ? moneys.map(m => `<code>${escapeHtml(m)}</code>`).join(' ') : '<span style="color:var(--text-muted);">None</span>'}</td>`;
            }).join('')}
          </tr>
          <tr>
            <td class="matrix-dimension-col">Mandatory Deadlines & Windows</td>
            ${docsToCompare.map(d => {
              const deadlines = (d.entities || []).filter(e => e.type === 'DATE_DEADLINE').map(e => e.name);
              return `<td>${deadlines.length > 0 ? deadlines.map(m => `<span class="entity-pill pill-date">${escapeHtml(m)}</span> `).join('') : '<span style="color:var(--text-muted);">None noted</span>'}</td>`;
            }).join('')}
          </tr>
          <tr>
            <td class="matrix-dimension-col">Top Actionable Takeaways</td>
            ${docsToCompare.map(d => `
              <td>
                <ul style="padding-left:16px; font-size:0.78rem; display:flex; flex-direction:column; gap:4px;">
                  ${(d.keyTakeaways || []).slice(0, 3).map(t => `<li>${escapeHtml(t)}</li>`).join('')}
                </ul>
              </td>
            `).join('')}
          </tr>
        </tbody>
      </table>
    `;

    wrapper.innerHTML = matrixHtml;
    document.getElementById('compareModal').style.display = 'flex';
  }

  // =========================================================================
  // 8. SQL DATABASE STUDIO & LIVE QUERY RUNNER
  // =========================================================================
  function loadDatabaseSqlFile() {
    fetch('database.sql')
      .then(res => res.text())
      .then(text => {
        rawDatabaseSql = text;
        const codeBlock = document.getElementById('rawSqlCodeBlock');
        if (codeBlock) codeBlock.textContent = text;
      })
      .catch(err => {
        console.warn('Could not fetch database.sql:', err);
      });
  }

  const SQL_PRESET_QUERIES = {
    'high-risk': `SELECT id, title, category, risk_level, risk_score \nFROM documents \nWHERE risk_level IN ('HIGH', 'CRITICAL') \nORDER BY risk_score DESC;`,
    'entities-count': `SELECT e.entity_type, e.name, e.normalized_value, d.title \nFROM entities e \nJOIN documents d ON d.id = e.doc_id;`,
    'time-saved': `SELECT title, page_count, word_count, estimated_read_time_mins, \nROUND(estimated_read_time_mins / 60.0, 1) AS hours_saved \nFROM documents;`,
    'chunks-risk': `SELECT d.title, c.heading, c.risk_rationale \nFROM document_chunks c \nJOIN documents d ON d.id = c.document_id \nWHERE c.has_risk = true;`,
    'all-docs': `SELECT id, title, category, page_count, word_count, risk_level, confidence_score \nFROM documents;`
  };

  async function executeSimulatedSql(query) {
    const editor = document.getElementById('sqlQueryEditor');
    const statusText = document.getElementById('sqlExecutionStatus');
    const tableWrapper = document.getElementById('sqlTableWrapper');
    const countBadge = document.getElementById('sqlRowCount');

    const clean = (query || editor.value || '').trim();
    const startTime = performance.now();

    // 1. Attempt Live Execution via Backend SQLite API
    try {
      const response = await fetch('/api/sql/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: clean })
      });
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.columns) {
          statusText.textContent = `Executed in SQLite (${result.executionTimeMs}ms)`;
          countBadge.textContent = `Results: ${result.rowCount} rows (Live SQLite)`;

          if (result.rows.length === 0) {
            tableWrapper.innerHTML = `<div style="padding:24px; text-align:center; color:var(--text-muted);">0 rows returned.</div>`;
            return;
          }

          let tableHtml = `
            <table class="data-table">
              <thead>
                <tr>${result.columns.map(c => `<th>${escapeHtml(c)}</th>`).join('')}</tr>
              </thead>
              <tbody>
                ${result.rows.map(r => `
                  <tr>${result.columns.map(c => `<td>${escapeHtml(String(r[c] !== null && r[c] !== undefined ? r[c] : ''))}</td>`).join('')}</tr>
                `).join('')}
              </tbody>
            </table>
          `;
          tableWrapper.innerHTML = tableHtml;
          return;
        }
      }
    } catch (e) {
      // Backend not running, proceed to client-side fallback simulation
    }

    let columns = [];
    let rows = [];

    try {
      if (/WHERE\s+risk_level/i.test(clean) || /high-risk/i.test(clean)) {
        columns = ['id', 'title', 'category', 'risk_level', 'risk_score'];
        rows = documents
          .filter(d => d.riskLevel === 'HIGH' || d.riskLevel === 'CRITICAL')
          .map(d => [d.id, d.title, d.category, d.riskLevel, d.riskScore]);
      } else if (/FROM\s+entities/i.test(clean) || /entities-count/i.test(clean)) {
        columns = ['entity_type', 'entity_name', 'document_title'];
        documents.forEach(d => {
          (d.entities || []).forEach(e => {
            rows.push([e.type, e.name, d.title]);
          });
        });
      } else if (/estimated_read_time_mins/i.test(clean) || /hours_saved/i.test(clean) || /time-saved/i.test(clean)) {
        columns = ['title', 'page_count', 'word_count', 'read_mins_saved', 'hours_saved'];
        rows = documents.map(d => {
          const mins = Math.round((d.wordCount || 0) / 200);
          return [d.title, d.pageCount, d.wordCount, mins, (mins / 60).toFixed(1)];
        });
      } else if (/has_risk/i.test(clean) || /chunks-risk/i.test(clean)) {
        columns = ['document_title', 'chunk_heading', 'risk_rationale'];
        documents.forEach(d => {
          (d.chunks || []).filter(c => c.hasRisk).forEach(c => {
            rows.push([d.title, c.heading, c.rationale || 'Flagged Risk']);
          });
        });
      } else {
        // Default SELECT * FROM documents
        columns = ['id', 'title', 'category', 'page_count', 'word_count', 'risk_level', 'confidence_score'];
        rows = documents.map(d => [d.id, d.title, d.category, d.pageCount, d.wordCount, d.riskLevel, d.confidenceScore || 0.98]);
      }

      const elapsed = (performance.now() - startTime).toFixed(1);
      statusText.textContent = `Executed in ${elapsed}ms (${rows.length} rows returned)`;
      countBadge.textContent = `Results: ${rows.length} rows`;

      // Render table
      let tableHtml = `
        <table class="data-table">
          <thead>
            <tr>${columns.map(c => `<th>${escapeHtml(c)}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${rows.map(r => `
              <tr>${r.map(cell => `<td>${escapeHtml(String(cell))}</td>`).join('')}</tr>
            `).join('')}
          </tbody>
        </table>
      `;
      tableWrapper.innerHTML = tableHtml;

    } catch (e) {
      statusText.textContent = `Execution Error: ${e.message}`;
    }
  }

  // =========================================================================
  // 9. EXPORTS & UTILITIES
  // =========================================================================
  function exportMarkdownBrief(doc) {
    if (!doc) return;
    const md = `# Executive Synthesis Brief: ${doc.title}
**Category:** ${doc.category} | **Risk Level:** ${doc.riskLevel} (${doc.riskScore}/10)
**Pages:** ${doc.pageCount} | **Words:** ${doc.wordCount} | **Read Time Saved:** ~${Math.round(doc.wordCount / 200)} minutes

---

## 1. Executive Summary
${doc.executiveSummary}

---

## 2. Key Actionable Takeaways & Covenants
${(doc.keyTakeaways || []).map(t => `- ${t}`).join('\n')}

---

## 3. Extracted Named Entities
${(doc.entities || []).map(e => `- **[${e.type}]** ${e.name} — *${e.context || ''}*`).join('\n')}

---

*Generated automatically by OmniDoc AI Knowledge Synthesizer.*
`;

    downloadFile(`${doc.id}_synthesis_brief.md`, md, 'text/markdown');
    showToast('Exported Markdown Brief!', 'success');
  }

  function exportStructuredJson(doc) {
    if (!doc) return;
    const jsonStr = JSON.stringify(doc, null, 2);
    downloadFile(`${doc.id}_intel.json`, jsonStr, 'application/json');
    showToast('Exported structured JSON!', 'success');
  }

  function exportComparisonCsv() {
    const docsToCompare = documents.filter(d => selectedDocIds.has(d.id));
    if (docsToCompare.length === 0) return;

    let csv = 'Dimension,' + docsToCompare.map(d => `"${d.title.replace(/"/g, '""')}"`).join(',') + '\n';
    csv += 'Category,' + docsToCompare.map(d => `"${d.category}"`).join(',') + '\n';
    csv += 'Pages,' + docsToCompare.map(d => d.pageCount).join(',') + '\n';
    csv += 'Risk Level,' + docsToCompare.map(d => `"${d.riskLevel} (${d.riskScore})"`).join(',') + '\n';
    csv += 'Read Time Saved (Mins),' + docsToCompare.map(d => Math.round(d.wordCount / 200)).join(',') + '\n';
    csv += 'Summary,' + docsToCompare.map(d => `"${(d.executiveSummary || '').replace(/"/g, '""')}"`).join(',') + '\n';

    downloadFile('omnidoc_comparative_matrix.csv', csv, 'text/csv');
    showToast('Exported Comparison CSV!', 'success');
  }

  function downloadFile(filename, text, mimeType) {
    const blob = new Blob([text], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✓' : type === 'warning' ? '⚠️' : 'ℹ'}</span>
      <span>${escapeHtml(message)}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function switchModalTab(modalId, tabId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });
    modal.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === tabId);
    });
  }

  // =========================================================================
  // 10. EVENT LISTENERS & INITIALIZATION
  // =========================================================================
  function initEventBindings() {
    // Search & Filter Listeners
    document.getElementById('filterKeywordInput').addEventListener('input', renderDocumentList);
    document.getElementById('filterCategorySelect').addEventListener('change', renderDocumentList);
    document.getElementById('filterRiskSelect').addEventListener('change', renderDocumentList);
    document.getElementById('sortBySelect').addEventListener('change', renderDocumentList);

    // View Toggles
    const btnGrid = document.getElementById('btnViewGrid');
    const btnTable = document.getElementById('btnViewTable');

    btnGrid.addEventListener('click', () => {
      currentViewMode = 'grid';
      btnGrid.classList.add('active');
      btnTable.classList.remove('active');
      renderDocumentList();
    });

    btnTable.addEventListener('click', () => {
      currentViewMode = 'table';
      btnTable.classList.add('active');
      btnGrid.classList.remove('active');
      renderDocumentList();
    });

    // Reset Corpus
    document.getElementById('btnResetCorpus').addEventListener('click', () => {
      if (confirm('Reset repository back to default enterprise documents?')) {
        localStorage.removeItem(STORAGE_KEY);
        initCorpus();
        selectedDocIds.clear();
        renderAll();
        showToast('Repository reset to default enterprise corpus.', 'info');
      }
    });

    // OmniQuery Form & Input
    const queryInput = document.getElementById('omniQueryInput');
    const btnClearQuery = document.getElementById('btnClearQuery');

    queryInput.addEventListener('input', () => {
      btnClearQuery.style.display = queryInput.value.length > 0 ? 'block' : 'none';
    });

    btnClearQuery.addEventListener('click', () => {
      queryInput.value = '';
      btnClearQuery.style.display = 'none';
      document.getElementById('synthesisResultPanel').style.display = 'none';
      queryInput.focus();
    });

    document.getElementById('queryForm').addEventListener('submit', (e) => {
      e.preventDefault();
      runOmniSynthesisQuery(queryInput.value);
    });

    // Prompt Chips
    document.querySelectorAll('.chip-btn').forEach(chip => {
      chip.addEventListener('click', () => {
        const q = chip.getAttribute('data-query');
        queryInput.value = q;
        btnClearQuery.style.display = 'block';
        runOmniSynthesisQuery(q);
      });
    });

    // Copy Synthesis Answer
    document.getElementById('btnCopyAnswer').addEventListener('click', () => {
      const answerText = document.getElementById('synthesisAnswerBody').innerText;
      navigator.clipboard.writeText(answerText).then(() => {
        showToast('Copied synthesis answer to clipboard!', 'success');
      });
    });

    // Multi-Select Banner Actions
    document.getElementById('btnCompareSelectedAction').addEventListener('click', openComparisonMatrix);
    document.getElementById('btnOpenCompareModal').addEventListener('click', openComparisonMatrix);
    document.getElementById('btnClearSelection').addEventListener('click', () => {
      selectedDocIds.clear();
      updateSelectionBanner();
      renderDocumentList();
    });

    document.getElementById('btnExportSelectedBrief').addEventListener('click', () => {
      const selected = documents.filter(d => selectedDocIds.has(d.id));
      if (selected.length === 0) return;
      const combinedMd = selected.map(d => `# ${d.title}\n${d.executiveSummary}\n\n`).join('\n---\n\n');
      downloadFile('combined_briefs.md', combinedMd, 'text/markdown');
      showToast('Exported combined synthesis brief!', 'success');
    });

    // Table Select All
    const selectAllCb = document.getElementById('selectAllCheckbox');
    if (selectAllCb) {
      selectAllCb.addEventListener('change', () => {
        if (selectAllCb.checked) {
          documents.forEach(d => selectedDocIds.add(d.id));
        } else {
          selectedDocIds.clear();
        }
        updateSelectionBanner();
        renderDocumentList();
      });
    }

    // Modal Tabs Navigation Handler
    document.querySelectorAll('.modal-window').forEach(modalWin => {
      modalWin.querySelectorAll('.tab-btn').forEach(tabBtn => {
        tabBtn.addEventListener('click', () => {
          const modalBackdrop = modalWin.closest('.modal-backdrop');
          const tabId = tabBtn.getAttribute('data-tab');
          switchModalTab(modalBackdrop.id, tabId);
        });
      });
    });

    // Close Modals
    const closeButtons = [
      { btnId: 'btnCloseDetailModal', modalId: 'docDetailModal' },
      { btnId: 'btnCloseDetailFooter', modalId: 'docDetailModal' },
      { btnId: 'btnCloseCompareModal', modalId: 'compareModal' },
      { btnId: 'btnCloseCompareFooter', modalId: 'compareModal' },
      { btnId: 'btnClosePasteModal', modalId: 'pasteModal' },
      { btnId: 'btnCancelPaste', modalId: 'pasteModal' },
      { btnId: 'btnCloseUploadModal', modalId: 'uploadModal' },
      { btnId: 'btnCancelUpload', modalId: 'uploadModal' },
      { btnId: 'btnCloseSqlModal', modalId: 'sqlModal' },
      { btnId: 'btnCloseSqlFooter', modalId: 'sqlModal' }
    ];

    closeButtons.forEach(pair => {
      const el = document.getElementById(pair.btnId);
      if (el) {
        el.addEventListener('click', () => {
          document.getElementById(pair.modalId).style.display = 'none';
        });
      }
    });

    // Click backdrop to close
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    });

    // Ingest Paste Text Modal
    document.getElementById('btnOpenPasteModal').addEventListener('click', () => {
      document.getElementById('inputDocTitle').value = '';
      document.getElementById('inputDocRawText').value = '';
      document.getElementById('pasteModal').style.display = 'flex';
    });

    document.getElementById('btnLoadSampleText').addEventListener('click', () => {
      document.getElementById('inputDocTitle').value = 'Enterprise AI Software License & Indemnity Schedule';
      document.getElementById('inputDocCategory').value = 'Legal';
      document.getElementById('inputDocRawText').value = `ENTERPRISE SOFTWARE LICENSE AND WARRANTY SCHEDULE
1. GRANT OF LICENSE
Subject to prompt payment of annual license subscription fees totaling $185,000, Licensor grants Customer a non-exclusive, worldwide license to utilize the Automated Processing Pipeline for up to 10,000 active concurrent enterprise seats.

2. INDEMNITY & LIMITATION OF LIABILITY
Licensor agrees to indemnify Customer against third-party patent and copyright infringement claims up to a maximum aggregate amount of $5,000,000. IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR INDIRECT OR CONSEQUENTIAL LOSSES, EXCEPT THAT REMEDIES FOR WILLFUL MISCONDUCT AND CONFIDENTIALITY LEAKS REMAIN UNCAPPED.

3. AUDIT RIGHTS & COMPLIANCE
Licensor reserves the right to perform annual software license usage audits upon forty-five (45) calendar days written notice. Remediation of unlicensed seats must occur within thirty (30) days of inspection findings under Delaware Arbitration rules.`;
    });

    document.getElementById('btnSubmitIngestDoc').addEventListener('click', () => {
      const title = document.getElementById('inputDocTitle').value.trim();
      const cat = document.getElementById('inputDocCategory').value;
      const text = document.getElementById('inputDocRawText').value.trim();

      if (!title || !text) {
        alert('Please provide both a Document Title and Document Text to ingest.');
        return;
      }

      processNewDocument({
        title: title,
        category: cat,
        rawText: text
      });

      document.getElementById('pasteModal').style.display = 'none';
    });

    // Upload Files Modal & Drag-Drop
    const uploadModal = document.getElementById('uploadModal');
    const dropZone = document.getElementById('fileDropZone');
    const fileInput = document.getElementById('fileUploadInput');

    document.getElementById('btnOpenUploadModal').addEventListener('click', () => {
      uploadModal.style.display = 'flex';
    });

    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleUploadedFiles(e.dataTransfer.files);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files.length > 0) {
        handleUploadedFiles(fileInput.files);
      }
    });

    function handleUploadedFiles(fileList) {
      const progressContainer = document.getElementById('fileUploadProgressContainer');
      const progressBar = document.getElementById('uploadProgressBar');
      const progressText = document.getElementById('uploadProgressText');

      progressContainer.style.display = 'block';
      progressBar.style.width = '20%';

      let completed = 0;
      const total = fileList.length;

      Array.from(fileList).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target.result;
          const ext = file.name.split('.').pop().toLowerCase();

          // Infer category
          let inferredCat = 'Legal';
          if (/finan|q[1-4]|revenue|budget|report/i.test(file.name)) inferredCat = 'Financial';
          if (/iso|cyber|audit|sec/i.test(file.name)) inferredCat = 'Tech & Security';
          if (/policy|gdpr|privacy/i.test(file.name)) inferredCat = 'Policy';

          processNewDocument({
            title: file.name.replace(/\.[^/.]+$/, ''),
            category: inferredCat,
            rawText: content || `Sample ingested document parsed from ${file.name}. Word count: 1250 words.`,
            fileFormat: ext
          });

          completed++;
          const pct = Math.round((completed / total) * 100);
          progressBar.style.width = `${pct}%`;
          progressText.textContent = `Processed ${completed} of ${total} files...`;

          if (completed === total) {
            setTimeout(() => {
              uploadModal.style.display = 'none';
              progressContainer.style.display = 'none';
              progressBar.style.width = '0%';
            }, 600);
          }
        };

        reader.readAsText(file);
      });
    }

    // Detail Modal Actions
    document.getElementById('btnExportDocMarkdown').addEventListener('click', () => {
      if (activeDetailDoc) exportMarkdownBrief(activeDetailDoc);
    });

    document.getElementById('btnExportDocJson').addEventListener('click', () => {
      if (activeDetailDoc) exportStructuredJson(activeDetailDoc);
    });

    document.getElementById('btnCopyRawText').addEventListener('click', () => {
      if (activeDetailDoc) {
        navigator.clipboard.writeText(activeDetailDoc.rawText).then(() => {
          showToast('Copied raw document text to clipboard!', 'success');
        });
      }
    });

    // Comparison Modal Actions
    document.getElementById('btnDownloadComparisonCsv').addEventListener('click', exportComparisonCsv);

    // SQL Studio Modal
    document.getElementById('btnOpenSqlModal').addEventListener('click', () => {
      document.getElementById('sqlPresetSelect').value = 'high-risk';
      document.getElementById('sqlQueryEditor').value = SQL_PRESET_QUERIES['high-risk'];
      executeSimulatedSql(SQL_PRESET_QUERIES['high-risk']);
      document.getElementById('sqlModal').style.display = 'flex';
    });

    document.getElementById('sqlPresetSelect').addEventListener('change', (e) => {
      const q = SQL_PRESET_QUERIES[e.target.value];
      if (q) {
        document.getElementById('sqlQueryEditor').value = q;
        executeSimulatedSql(q);
      }
    });

    document.getElementById('btnExecutePresetSql').addEventListener('click', () => {
      const presetKey = document.getElementById('sqlPresetSelect').value;
      const q = SQL_PRESET_QUERIES[presetKey];
      if (q) {
        document.getElementById('sqlQueryEditor').value = q;
        executeSimulatedSql(q);
      }
    });

    document.getElementById('btnRunCustomSql').addEventListener('click', () => {
      const customQuery = document.getElementById('sqlQueryEditor').value;
      executeSimulatedSql(customQuery);
    });

    document.getElementById('btnDownloadSqlFile').addEventListener('click', () => {
      if (rawDatabaseSql) {
        downloadFile('database.sql', rawDatabaseSql, 'text/sql');
      } else {
        window.open('database.sql', '_blank');
      }
    });

    document.getElementById('btnExportSqlCsv').addEventListener('click', () => {
      const table = document.querySelector('#sqlTableWrapper table');
      if (!table) return;
      let csv = [];
      table.querySelectorAll('tr').forEach(row => {
        const cells = Array.from(row.querySelectorAll('th, td')).map(td => `"${td.innerText.replace(/"/g, '""')}"`);
        csv.push(cells.join(','));
      });
      downloadFile('sql_query_results.csv', csv.join('\n'), 'text/csv');
      showToast('Exported SQL results as CSV!', 'success');
    });

    // =======================================================================
    // SUBNAV TABS VIEW SWITCHING & QUICK THEME PILLS
    // =======================================================================
    document.querySelectorAll('.subnav-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const viewId = tab.getAttribute('data-view');
        switchDashboardView(viewId);
      });
    });

    document.querySelectorAll('[data-theme-quick]').forEach(pill => {
      pill.addEventListener('click', () => {
        const theme = pill.getAttribute('data-theme-quick');
        applyTheme(theme);
      });
    });

    // Theme Studio Modal Triggers & Controls
    const themeModal = document.getElementById('themeModal');
    const btnOpenThemeModal = document.getElementById('btnOpenThemeModal');
    const btnOpenThemeModalDirect = document.getElementById('btnOpenThemeModalDirect');
    const btnCloseThemeModal = document.getElementById('btnCloseThemeModal');
    const btnCloseThemeFooter = document.getElementById('btnCloseThemeFooter');
    const btnResetThemeDefaults = document.getElementById('btnResetThemeDefaults');

    if (btnOpenThemeModal) {
      btnOpenThemeModal.addEventListener('click', () => {
        themeModal.style.display = 'flex';
      });
    }
    if (btnOpenThemeModalDirect) {
      btnOpenThemeModalDirect.addEventListener('click', () => {
        themeModal.style.display = 'flex';
      });
    }
    if (btnCloseThemeModal) {
      btnCloseThemeModal.addEventListener('click', () => {
        themeModal.style.display = 'none';
      });
    }
    if (btnCloseThemeFooter) {
      btnCloseThemeFooter.addEventListener('click', () => {
        themeModal.style.display = 'none';
      });
    }
    if (btnResetThemeDefaults) {
      btnResetThemeDefaults.addEventListener('click', () => {
        applyTheme('cyber-dark');
        applyAccent('cyan');
        showToast('Reset theme to Obsidian Cyber default.', 'info');
      });
    }

    document.querySelectorAll('.theme-select-card').forEach(card => {
      card.addEventListener('click', () => {
        const tId = card.getAttribute('data-theme-id');
        applyTheme(tId);
      });
    });

    document.querySelectorAll('.accent-color-circle').forEach(circle => {
      circle.addEventListener('click', () => {
        const aId = circle.getAttribute('data-accent-id');
        applyAccent(aId);
      });
    });

    // Top Header Proofreader Badge Trigger
    const navMistakesBadge = document.getElementById('navMistakesBadge');
    if (navMistakesBadge) {
      navMistakesBadge.addEventListener('click', () => {
        switchDashboardView('viewMistakes');
      });
    }

    // =======================================================================
    // AI MISTAKES STUDIO CONTROLS
    // =======================================================================
    const studioDocSelect = document.getElementById('studioDocSelect');
    if (studioDocSelect) {
      studioDocSelect.addEventListener('change', (e) => {
        loadStudioTarget(e.target.value);
      });
    }

    document.getElementById('btnLoadSlaSample')?.addEventListener('click', () => loadStudioTarget('sample-sla'));
    document.getElementById('btnLoadFinancialSample')?.addEventListener('click', () => loadStudioTarget('sample-finance'));
    document.getElementById('btnLoadSecuritySample')?.addEventListener('click', () => loadStudioTarget('sample-security'));
    document.getElementById('btnLoadScratchpad')?.addEventListener('click', () => loadStudioTarget('scratchpad'));

    document.getElementById('btnRescanMistakes')?.addEventListener('click', runStudioAiScan);
    document.getElementById('btnClearAllMistakesAi')?.addEventListener('click', clearAllStudioMistakes);
    document.getElementById('btnCopyCleanText')?.addEventListener('click', () => {
      navigator.clipboard.writeText(studioText).then(() => {
        showToast('Copied clean proofread text to clipboard!', 'success');
      });
    });
    document.getElementById('btnSaveCorrectedDoc')?.addEventListener('click', saveStudioTextToDocument);
    document.getElementById('btnAllClearRescan')?.addEventListener('click', runStudioAiScan);

    // Studio View Mode Toggles (Live Highlights vs Raw Text Editor)
    const btnModeHighlights = document.getElementById('btnModeHighlights');
    const btnModeRaw = document.getElementById('btnModeRaw');
    const highlightedBox = document.getElementById('highlightedTextBox');
    const rawEditor = document.getElementById('rawTextEditor');

    if (btnModeHighlights && btnModeRaw) {
      btnModeHighlights.addEventListener('click', () => {
        studioMode = 'highlights';
        btnModeHighlights.classList.add('active');
        btnModeRaw.classList.remove('active');
        if (highlightedBox) highlightedBox.style.display = 'block';
        if (rawEditor) rawEditor.style.display = 'none';
        runStudioAiScan();
      });

      btnModeRaw.addEventListener('click', () => {
        studioMode = 'raw';
        btnModeRaw.classList.add('active');
        btnModeHighlights.classList.remove('active');
        if (highlightedBox) highlightedBox.style.display = 'none';
        if (rawEditor) {
          rawEditor.style.display = 'block';
          rawEditor.value = studioText;
          rawEditor.focus();
        }
      });
    }

    if (rawEditor) {
      rawEditor.addEventListener('input', () => {
        studioText = rawEditor.value;
        const words = (studioText.trim().split(/\s+/).filter(Boolean)).length;
        document.getElementById('editorWordCount').textContent = words.toLocaleString();
        document.getElementById('editorCharCount').textContent = studioText.length.toLocaleString();
      });
    }

    // Category Filter Chips
    document.querySelectorAll('.filter-chip-btn').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip-btn').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        studioActiveFilter = chip.getAttribute('data-filter');
        renderStudioMistakeCards();
      });
    });

    // Detail Modal Tab 6 Button: Clear All Doc Mistakes
    document.getElementById('btnClearAllModalDocMistakes')?.addEventListener('click', clearAllModalDocMistakes);

    // =======================================================================
    // MISTAKES HISTORY CONTROLS
    // =======================================================================
    document.getElementById('filterHistorySearch')?.addEventListener('input', renderMistakesHistory);
    document.getElementById('filterHistoryStatus')?.addEventListener('change', renderMistakesHistory);
    document.getElementById('filterHistoryCategory')?.addEventListener('change', renderMistakesHistory);
    document.getElementById('btnExportHistoryCsv')?.addEventListener('click', exportMistakeHistoryCsv);
    document.getElementById('btnClearHistoryLog')?.addEventListener('click', clearMistakeHistoryLog);

    // =======================================================================
    // GLOBAL APPLICATION HOOKS
    // =======================================================================
    window.OmniApp = {
      openDoc: (id) => openDocumentDetailModal(id),
      proofreadDoc: (id) => {
        switchDashboardView('viewMistakes');
        loadStudioTarget(id);
      },
      clearSingleMistake: (mistakeId) => clearStudioMistake(mistakeId),
      dismissMistake: (mistakeId) => dismissStudioMistake(mistakeId),
      clearModalMistake: (docId, mistakeId) => clearModalDocMistake(docId, mistakeId),
      revertHistory: (historyId) => revertMistakeHistory(historyId)
    };
  }

  // Optional live synchronization with OmniDoc AI Backend API
  async function syncWithBackend() {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        console.log('Connected to OmniDoc AI Backend:', data);
        const syncBadge = document.querySelector('.status-badge.live-sync');
        if (syncBadge) {
          syncBadge.innerHTML = `<span class="status-dot"></span> Backend Live (${data.database || 'SQLite'})`;
        }
      }
    } catch (e) {
      // Running standalone / client-side mode
    }
  }

  // =========================================================================
  // 11. APPLICATION BOOTSTRAP
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initThemeSettings();
    initCorpus();
    initMistakesHistory();
    renderAll();
    initStudio();
    updateGlobalMistakeBadges();
    initEventBindings();
    loadDatabaseSqlFile();
    syncWithBackend();
  });

})();
