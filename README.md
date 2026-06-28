# 🌌 Prism: Multi-Agent Deep Research System

Prism is an advanced agentic deep research framework that orchestrates multiple specialized AI agents to autonomously search, evaluate, synthesize, and verify information from the web and generate structured, high-quality research reports.

It is built as a modular LangChain-based pipeline that replicates a real-world research workflow — from query understanding to final report validation.

---

## 🧠 Core Idea

Instead of relying on a single LLM call, Prism decomposes research into **7 specialized AI agents**, each responsible for a distinct stage of intelligence gathering and reasoning.

This improves:
- Factual accuracy
- Source reliability
- Output structure
- Hallucination reduction
- Self-evaluation through feedback loops

---

## 🏗️ System Architecture

```mermaid
graph TD
    A[User Query] --> B[1. Router Agent]

    B -->|Simple Query| C[Direct Response]
    B -->|Deep Research| D[2. Web Search Agent]

    D --> E[3. Ranking Agent]
    E --> F[4. Parallel Scraper]
    F --> G[5. Summarizer Agent]
    G --> H[6. Writer Agent]

    H --> I{7. Critic Agent}

    I -->|Score < 8| D
    I -->|Score >= 8| J[Final Report]

Key Challenges Faced & Solutions (Backend / Python Only)

During the development of the Prism backend (Python-based agentic pipeline and terminal execution system), several challenges were encountered in building a stable multi-agent workflow.

1. Inconsistent Agent Output Format

Problem:
Different agents (Router, Search, Ranking, Summarizer) were returning inconsistent outputs (sometimes plain text, sometimes partial JSON), which broke downstream parsing in the pipeline.

Solution:
Standardized all agent outputs using a strict JSON schema contract, ensuring every agent returns structured, machine-readable data.

2. Web Search Noise & Irrelevant Results

Problem:
Tavily search results often included irrelevant blogs, SEO-heavy pages, or duplicated links, which reduced final report quality.

Solution:
Implemented a Ranking Agent filtering layer:

keyword relevance scoring
domain-level quality filtering
duplicate URL removal
penalty scoring for low-content pages
3. Scraper Failures & Partial Content Extraction

Problem:
Some URLs failed during scraping due to:

request timeouts
blocked access
JavaScript-rendered content

This caused incomplete or empty summaries.

Solution:
Added:

retry mechanism with exponential backoff
timeout handling per request
fallback raw HTML extraction
parallel scraping for stability and speed
4. Token Overflow in LLM Processing

Problem:
Large scraped web pages exceeded LLM context limits, causing API errors or truncated outputs.

Solution:
Implemented a chunk-based processing pipeline:

split content into smaller chunks
summarize each chunk independently
merge summaries into final structured output
5. Agent Pipeline Breaks During Execution Flow

Problem:
When intermediate agents returned empty or malformed data, the entire pipeline would crash or produce invalid final reports.

Solution:
Introduced pipeline validation gates:

check output before passing to next agent
retry search/scrape if data is insufficient
fail-safe fallback messages for empty results
6. Infinite Loop in Critic Feedback Cycle

Problem:
Critic Agent sometimes kept rejecting outputs repeatedly, causing the system to loop indefinitely between Writer → Critic → Writer.

Solution:
Added:

maximum iteration cap (2–3 cycles)
structured scoring system (0–10)
strict acceptance threshold (≥ 8/10)
7. Loss of Context Between Agents

Problem:
Each agent worked independently, causing loss of context (query intent, earlier findings, ranked URLs).

Solution:
Built a shared pipeline state object that stores:

original query
search results
ranked URLs
intermediate summaries
final draft

This ensured continuity across the entire pipeline.

8. API Rate Limits & Cost Spikes

Problem:
Frequent calls to LLM and Tavily APIs caused:

rate limiting errors
increased token usage cost

Solution:
Optimized pipeline by:

caching repeated queries
reducing redundant LLM calls
batching scraping requests instead of sequential execution


## 🚀 Local Development Setup
### Backend (Python/Flask)
1. Navigate to the root directory.
2. Install virtual environment and packages:
   ```bash
   python -m venv .venv
   .venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. Create a `.env` file in the root directory:
   ```env
   MISTRAL_API_KEY=your_key_here
   TAVILY_API_KEY=your_key_here
   ```
4. Run the Flask server:
   ```bash
   python app.py
   ```
### Frontend (React/Vite)
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. Open [http://localhost:5173](http://localhost:5173) in your browser.
---
## 📦 Production Deployment (Render Monolith)
Prism is fully optimized for **monolith deployment** on platforms like Render:
* **Build Command**: `pip install -r requirements.txt && cd frontend && npm install && npm run build`
* **Start Command**: `gunicorn app:app`
* **Environment Variables**: Make sure to add `MISTRAL_API_KEY` and `TAVILY_API_KEY` to the Render Dashboard settings.

