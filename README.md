# OmniDoc AI — Enterprise Multi-Document Intelligence & Knowledge Synthesizer

OmniDoc AI is a high-performance, full-stack enterprise document synthesis and neural proofreading platform. It allows users to process, query, analyze, and proofread multi-document corpora without manual document-by-document reading.

---

## 🌟 Key Features

1. **AI Mistakes Finder & Auto-Proofreader**:
   - Detects spelling typos, grammatical slips, consecutive repeated words, and legal/regulatory terminology errors in real time.
   - Laser scan animation beam with interactive highlight preview.
   - One-click individual error clearing and instant **"Clear All Mistakes with AI"** batch resolution.
   - Comprehensive audit ledger tracking every resolution with revert capabilities.

2. **Dashboard Themes & Color Studio**:
   - **8 Curated Themes**:
     - 🌌 *Obsidian Cyber* (Default Deep Space Dark)
     - 👑 *Rolex Emerald Luxury* (British Racing Green & Royal Gold)
     - 💎 *Midnight Sapphire* (Royal Navy & Electric Oceanic)
     - ⚡ *Cyberpunk Neon* (Magenta Abyss & Neon Pink)
     - 🔮 *Royal Amethyst* (Imperial Velvet Purple & Lilac)
     - 🔥 *Sunset Crimson* (Warm Charcoal & Fiery Ember)
     - 💻 *Matrix Terminal* (True Black & Phosphor Green)
     - ☀️ *Titanium Clean Day* (High-Contrast Luxury Light Mode)
   - **8 Accent Colors**: Cyan, Gold, Emerald, Violet, Indigo, Rose, Orange, Sky Blue.
   - Quick theme switcher pills in the top subnav bar.

3. **Multi-Document Synthesis & OmniQuery Engine**:
   - Natural language cross-document question answering.
   - TF-IDF extractive summarization and sentence ranking.
   - Granular passage chunking and sub-document citation cards.
   - Heuristic Named Entity Recognition (Money, Metrics, Deadlines, Regulations, Venues).
   - Dynamic Risk Scoring (0 to 10 scale with High, Medium, Low ratings).

4. **Relational SQL Database Studio**:
   - Integrated SQLite database utilizing Node.js native `node:sqlite`.
   - Pre-configured preset queries for high-risk covenants, extracted entities, and reading time savings.
   - Live query runner with execution duration timing and CSV export.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v22+ or v24+ (Node v24.19.0 recommended)
- **npm** (v11+)

### Installation
```bash
# Install dependencies
npm install
```

### Running the Full-Stack Server
```bash
# Start backend server and serve frontend at http://localhost:3000
npm start

# Or with live reload in development
npm run dev
```

Visit **`http://localhost:3000`** in your browser.

### Running Automated API Tests
```bash
npm test
# or
node test-api.js
```

---

## 📡 Backend REST API Reference

### 1. System Health
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server uptime, memory usage, and SQLite database status |

### 2. Documents Management
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/documents` | List documents with query filters (`category`, `risk`, `search`, `sort`) |
| `GET` | `/api/documents/:id` | Deep inspection with passage chunks, extracted entities, and mistake flags |
| `POST` | `/api/documents` | Ingest document, auto-calculate read time, NLP summaries, risk score, and index |
| `PUT` | `/api/documents/:id` | Update document title, category, or raw text |
| `DELETE` | `/api/documents/:id` | Delete document from database |
| `POST` | `/api/documents/reset` | Reset repository back to default enterprise corpus |
| `POST` | `/api/upload` | Multipart file upload (`.txt`, `.md`, `.json`, `.csv`) with auto-ingestion |

### 3. AI Mistake Finder & Proofreader
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/mistakes/detect` | Detect mistakes in text or by document ID |
| `POST` | `/api/mistakes/clear` | Clear individual mistake, log to audit ledger, update document |
| `POST` | `/api/mistakes/clear-all` | Batch clear all mistakes with character offset preservation |
| `GET` | `/api/mistakes/history` | Query mistake resolution audit ledger with status/category filters |
| `POST` | `/api/mistakes/history/:id/revert` | Revert a mistake resolution status |
| `DELETE` | `/api/mistakes/history` | Clear mistake audit history |

### 4. Multi-Document Synthesis
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/synthesis/query` | Natural language cross-document question answering with citations |
| `POST` | `/api/synthesis/compare` | Cross-document comparative matrix generation across selected IDs |

### 5. SQL Studio & Database
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/sql/query` | Execute SQL query against live SQLite database |
| `GET` | `/api/sql/schema` | Inspect table schemas and DDL metadata |
| `GET` | `/api/sql/file` | Retrieve raw `database.sql` contents |

### 6. User Settings
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/settings` | Retrieve saved theme and accent settings |
| `POST` | `/api/settings` | Save active theme or accent preference |

---

## 🗄️ Database Architecture

The relational schema is defined in [database.sql](file:///c:/Users/abbu/OneDrive/Desktop/rolex%202.0/database.sql) and implemented in SQLite ([db.js](file:///c:/Users/abbu/OneDrive/Desktop/rolex%202.0/db.js)):
- **`documents`**: Primary repository records with raw text, word count, read times, summaries, and risk ratings.
- **`document_chunks`**: Passage segments enabling sub-document citation and clause risk flagging.
- **`entities` & `document_entities`**: Extracted named entities (currencies, metrics, deadlines, regulations).
- **`query_history`**: Audit trail of natural language questions and synthesized answers.
- **`mistake_history`**: Resolution audit ledger tracking detected errors, categories, AI suggestions, and resolution timestamps.
- **`user_settings`**: Key-value store for user theme and visual preferences.

---

## 📁 Project Structure

```
rolex 2.0/
├── db.js                      # Native SQLite database connection & schema seeder
├── server.js                  # Main Express backend server & static asset host
├── package.json               # Node.js dependencies & scripts
├── test-api.js                # Automated backend test suite
├── database.sql               # Relational SQL schema definitions
├── index.html                 # Complete Single Page Application UI
├── style.css                  # Design system, 8 themes, animations & glassmorphism
├── script.js                  # Frontend client engine with offline/online sync
├── routes/
│   ├── documents.js           # Document CRUD & ingestion endpoints
│   ├── mistakes.js            # Mistake detection, resolution & history endpoints
│   ├── synthesis.js           # Multi-document query & comparison matrix
│   ├── sql.js                 # SQL Studio query runner
│   └── settings.js            # User theme and accent persistence
└── services/
    ├── mistakeService.js      # Mistake dictionary (120+ words) & replacement algorithms
    └── nlpService.js          # Extractive summarization, NER & query synthesis
```
