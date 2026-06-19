# AI Prompts Log — SDS Website Development

This document lists the prompts used with Claude (Anthropic) during development of the SDS Website.

---

## 1. Project Planning
**Prompt:** "I need to build a website for Society for Data Science (SDS) at BIT Mesra. Requirements include a Home page, an additional innovative page with AI integration, MERN stack, and modern UI. What should I build and where do I start?"

**Output:** Architecture plan, page ideas ranked by scoring potential, tech stack decision.

---

## 2. Full Project Scaffold
**Prompt:** "Generate the complete MERN project scaffold for SDS website with: Dataset Playground as the additional page (CSV upload → AI EDA), Groq as AI provider, dark navy/cyan design system, React+Vite frontend, Node/Express backend."

**Output:** Complete project structure including all files listed below.

---

## 3. Backend — CSV Analysis Controller
**Prompt:** "Write a Node.js/Express controller that: parses uploaded CSV with csv-parse, computes per-column statistics (mean, median, std, min, max, missing %), detects column types (numeric/categorical/datetime), sends a compact summary to Groq llama-3.3-70b-versatile, and returns structured JSON with column analysis + AI insights."

**Output:** `analyzeController.js` with full stats computation and Groq integration.

---

## 4. Frontend — Dataset Playground Page
**Prompt:** "Build a React page for the Dataset Playground with: react-dropzone for CSV upload, tabbed results UI (Overview / Columns / Charts / AI Insights), Recharts visualizations (bar chart, pie chart, horizontal bar for missing values), column accordion cards showing stats, and AI insights display with quality score bar."

**Output:** Complete `Playground.jsx` with all components.

---

## 5. Home Page Design
**Prompt:** "Create a stunning React home page for SDS with: animated data stream background, hero section with gradient headline, stat cards, About section with code-aesthetic card, Events grid with colored tags, Team grid with avatar initials, and CTA section for the Playground."

**Output:** `Home.jsx` with all sections.

---

## 6. Design System
**Prompt:** "Design a Tailwind config and global CSS for SDS website using: deep space navy background (#0A0F1E), electric cyan (#00D4FF) primary, violet (#7C3AED) secondary, Space Grotesk display font, Inter body font, JetBrains Mono for data/code. Include glass card utilities, glow effects, and animated data stream keyframes."

**Output:** `tailwind.config.js` and `index.css`.

---

## Tools Used
- Claude (Anthropic) — architecture, all code generation
- Groq API — AI inference for dataset analysis (llama-3.3-70b-versatile)
- Vite — frontend build tool
- Recharts — data visualization
