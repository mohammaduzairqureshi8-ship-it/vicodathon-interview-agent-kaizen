-- ═══════════════════════════════════════════════════════════════════
-- AI INTERVIEW AGENT — REAL SEED DATA
-- ═══════════════════════════════════════════════════════════════════

-- Clear existing dummy data safely
TRUNCATE TABLE candidates, curriculum_days, curriculum_modules CASCADE;

-- ─────────────────────────────────────────────────────────────────────
-- PART 1: 8 REAL MODULES
-- ─────────────────────────────────────────────────────────────────────

INSERT INTO curriculum_modules (id, name, description, order_index, start_day, end_day) VALUES
('module_1', 'Environment & Tooling', 'Setup tools', 1, 1, 3),
('module_2', 'Data Foundations', 'Data processing', 2, 4, 6),
('module_3', 'Embeddings & Vector Search', 'Vectors', 3, 7, 10),
('module_4', 'LLM Core, Prompting & Fine-Tuning', 'LLMs', 4, 11, 15),
('module_5', 'Chatbot Application Build', 'Apps', 5, 16, 20),
('module_6', 'Agentic AI & MCP', 'Agents', 6, 21, 24),
('module_7', 'Evaluation, Security & Deployment', 'Deploy', 7, 25, 28),
('module_8', 'Production & Capstone', 'Final', 8, 29, 31);

-- ─────────────────────────────────────────────────────────────────────
-- PART 2: 31 REAL CURRICULUM DAYS
-- ─────────────────────────────────────────────────────────────────────

INSERT INTO curriculum_days (day_number, module_id, title, topics, objectives) VALUES
(1, 'module_1', 'VS Code & Python Environment Setup', '["VS Code", "Python", "Pylance", "Virtual Environment"]'::jsonb, '["Install VS Code and Python", "Create venv"]'::jsonb),
(2, 'module_1', 'Local LLM & AI Coding Assistant Setup', '["Ollama", "Qwen2.5-Coder", "GitHub Copilot", "Cline"]'::jsonb, '["Install Ollama", "Generate code offline"]'::jsonb),
(3, 'module_1', 'First AI Project, React Frontend & GitHub', '["Python", "FastAPI", "React", "Git"]'::jsonb, '["Build chatbot", "Scaffold FastAPI"]'::jsonb),
(4, 'module_2', 'Reading & Processing Structured Data', '["Pandas", "SQLite", "SQL"]'::jsonb, '["Load CSV", "Store in SQLite"]'::jsonb),
(5, 'module_2', 'Reading & Processing Unstructured Data', '["pdfplumber", "PyPDF", "Tesseract OCR"]'::jsonb, '["Extract PDF text", "OCR scans"]'::jsonb),
(6, 'module_2', 'Building the Knowledge Base', '["LangChain Text Splitters", "JSONL"]'::jsonb, '["Split chunks", "Export knowledge_base"]'::jsonb),
(7, 'module_3', 'Embeddings Explained', '["Sentence Transformers", "OpenAI Embeddings"]'::jsonb, '["Understand vectors", "Visualize PCA"]'::jsonb),
(8, 'module_3', 'Vector Databases Overview', '["ChromaDB", "Pinecone"]'::jsonb, '["Learn vector DB role", "Set up Chroma"]'::jsonb),
(9, 'module_3', 'Building & Populating the Vector Database', '["ChromaDB", "Sentence Transformers"]'::jsonb, '["Load embeddings", "Test semantic search"]'::jsonb),
(10, 'module_3', 'The Retrieval & Matching Engine', '["SQLite", "ChromaDB"]'::jsonb, '["Build query router", "Evaluate accuracy"]'::jsonb),
(11, 'module_4', 'RAG End-to-End & LLM API Basics', '["OpenAI SDK", "Ollama", "Groq"]'::jsonb, '["Connect LLM", "Generate RAG answers"]'::jsonb),
(12, 'module_4', 'Prompt Engineering Fundamentals', '["LLMs", "Prompt Templates"]'::jsonb, '["Zero-shot, few-shot", "Design variations"]'::jsonb),
(13, 'module_4', 'Advanced Prompting: Function Calling', '["OpenAI Function Calling", "Pydantic"]'::jsonb, '["Define tool schemas", "Validate outputs"]'::jsonb),
(14, 'module_4', 'Fine-Tuning: Concepts & When to Use It', '["LoRA", "QLoRA"]'::jsonb, '["Understand fine-tuning vs RAG", "Create dataset"]'::jsonb),
(15, 'module_4', 'Fine-Tuning: Hands-On with LoRA & QLoRA', '["PEFT", "Transformers"]'::jsonb, '["Train LLM", "Load model"]'::jsonb),
(16, 'module_5', 'Chatbot Backend & API Integration', '["FastAPI", "SQLite"]'::jsonb, '["Create /chat API", "Session memory"]'::jsonb),
(17, 'module_5', 'Chatbot Frontend Development', '["Streamlit", "Requests"]'::jsonb, '["Build UI", "Connect API"]'::jsonb),
(18, 'module_5', 'Full-Stack Integration & Streaming', '["FastAPI", "StreamingResponse"]'::jsonb, '["Real-time streaming", "Loading UI"]'::jsonb),
(19, 'module_5', 'Response Formatting & Rich Outputs', '["Pydantic", "Markdown"]'::jsonb, '["Add citations", "Render Markdown"]'::jsonb),
(20, 'module_5', 'Conversation Memory & Context Management', '["SQLite", "Token Management"]'::jsonb, '["Persist history", "Summarization"]'::jsonb),
(21, 'module_6', 'Agentic Frameworks: LangChain Agents', '["LangChain", "ReAct"]'::jsonb, '["Build ReAct agent", "Wrap tools"]'::jsonb),
(22, 'module_6', 'Multi-Agent Orchestration', '["CrewAI", "LangGraph"]'::jsonb, '["Specialized agents", "Router agent"]'::jsonb),
(23, 'module_6', 'Model Context Protocol (MCP)', '["MCP Python SDK", "Claude Desktop"]'::jsonb, '["Build MCP server", "Connect client"]'::jsonb),
(24, 'module_6', 'Agentic Chatbot Integration', '["LangChain", "MCP"]'::jsonb, '["Integrate agents", "Graceful errors"]'::jsonb),
(25, 'module_7', 'Chatbot Evaluation & Testing', '["Evaluation Dataset"]'::jsonb, '["Benchmark dataset", "Measure accuracy"]'::jsonb),
(26, 'module_7', 'Performance Optimization', '["tiktoken"]'::jsonb, '["Measure tokens", "Response caching"]'::jsonb),
(27, 'module_7', 'Security, Privacy & Guardrails', '["Authentication", "Input Validation"]'::jsonb, '["Secure APIs", "Sanitize input"]'::jsonb),
(28, 'module_7', 'Docker & Kubernetes Deployment', '["Docker", "Kubernetes"]'::jsonb, '["Containerize backend", "Deploy cluster"]'::jsonb),
(29, 'module_8', 'Monitoring, Logging & Observability', '["Prometheus", "Grafana"]'::jsonb, '["Structured logging", "Dashboards"]'::jsonb),
(30, 'module_8', 'Production Readiness & Final Testing', '["FastAPI", "Docker"]'::jsonb, '["E2E test", "Fix issues"]'::jsonb),
(31, 'module_8', 'Capstone Project & Final Demo', '["React", "MCP", "Docker"]'::jsonb, '["Demonstrate app", "Publish code"]'::jsonb);

-- ─────────────────────────────────────────────────────────────────────
-- PART 3: 20 REAL CANDIDATES
-- ─────────────────────────────────────────────────────────────────────

INSERT INTO candidates (external_id, name, email, current_day, module_id, progress_percentage, signals, status) VALUES
('CAND-001', 'Sarah Johnson', 'sarah.j@cohort.com', 31, 'module_8', 100, '{"technical": "strong", "missions": 30}'::jsonb, 'completed'),
('CAND-002', 'Alex Turner', 'alex.t@cohort.com', 31, 'module_8', 100, '{"technical": "medium", "missions": 29}'::jsonb, 'completed'),
('CAND-003', 'Emily Chen', 'emily.c@cohort.com', 31, 'module_8', 100, '{"technical": "strong", "missions": 31}'::jsonb, 'completed'),
('CAND-004', 'David Miller', 'david.m@cohort.com', 31, 'module_8', 100, '{"technical": "weak", "missions": 28}'::jsonb, 'completed'),
('CAND-005', 'Michael Brown', 'michael.b@cohort.com', 31, 'module_8', 100, '{"technical": "strong", "missions": 31}'::jsonb, 'completed'),
('CAND-006', 'Wendy Foster', 'wendy.f@cohort.com', 31, 'module_8', 100, '{"technical": "weak", "missions": 24}'::jsonb, 'completed'),
('CAND-007', 'Ethan Brooks', 'ethan.b@cohort.com', 31, 'module_8', 100, '{"technical": "strong", "missions": 27}'::jsonb, 'completed'),
('CAND-008', 'Harold Whitfield', 'harold.w@cohort.com', 31, 'module_8', 100, '{"technical": "medium", "missions": 27}'::jsonb, 'completed'),
('CAND-009', 'Zara Ahmadi', 'zara.a@cohort.com', 31, 'module_8', 100, '{"technical": "strong", "missions": 31}'::jsonb, 'completed'),
('CAND-010', 'Gerald Combs', 'gerald.c@cohort.com', 31, 'module_8', 100, '{"technical": "weak", "missions": 23}'::jsonb, 'completed'),
('CAND-011', 'Mia Alvarez', 'mia.a@cohort.com', 31, 'module_8', 100, '{"technical": "weak", "missions": 14}'::jsonb, 'completed'),
('CAND-012', 'Chen Wei', 'chen.w@cohort.com', 31, 'module_8', 100, '{"technical": "medium", "missions": 30}'::jsonb, 'completed'),
('CAND-013', 'Ravi Patel', 'ravi.p@cohort.com', 31, 'module_8', 100, '{"technical": "medium", "missions": 30}'::jsonb, 'completed'),
('CAND-014', 'Bethany Cole', 'bethany.c@cohort.com', 31, 'module_8', 100, '{"technical": "weak", "missions": 20}'::jsonb, 'completed'),
('CAND-015', 'Noah Kim', 'noah.k@cohort.com', 31, 'module_8', 100, '{"technical": "strong", "missions": 29}'::jsonb, 'completed'),
('CAND-016', 'Isabella Rossi', 'isabella.r@cohort.com', 31, 'module_8', 100, '{"technical": "weak", "missions": 21}'::jsonb, 'completed'),
('CAND-017', 'Tyler Brooks', 'tyler.b@cohort.com', 31, 'module_8', 100, '{"technical": "medium", "missions": 31}'::jsonb, 'completed'),
('CAND-018', 'Diane Foster', 'diane.f@cohort.com', 31, 'module_8', 100, '{"technical": "strong", "missions": 31}'::jsonb, 'completed'),
('CAND-019', 'Frank DeLuca', 'frank.d@cohort.com', 31, 'module_8', 100, '{"technical": "medium", "missions": 29}'::jsonb, 'completed'),
('CAND-020', 'Priyanka Sharma', 'priyanka.s@cohort.com', 31, 'module_8', 100, '{"technical": "strong", "missions": 27}'::jsonb, 'completed');