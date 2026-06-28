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
