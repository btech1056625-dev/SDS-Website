# SDS Website — Society for Data Science, BIT Mesra

A full-stack MERN website for the Society for Data Science at BIT Mesra, featuring an AI-powered Dataset Playground.

## Features

- **Home Page** — Hero, About, Events, Team, Contact
- **Dataset Playground** — Upload any CSV and get:
  - Instant column-level statistics (mean, median, std, min, max)
  - Missing value detection and visualization
  - Auto-generated charts (bar, pie, horizontal bar)
  - AI-generated insights via Groq (llama-3.3-70b-versatile):
    - Dataset overview
    - Key insights
    - Data quality score + recommendations
    - Suggested analyses
    - ML potential assessment

## Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS + Framer Motion + Recharts
- **Backend**: Node.js + Express + Multer + csv-parse
- **AI**: Groq API (llama-3.3-70b-versatile)
- **Design**: Space Grotesk + Inter + JetBrains Mono

---

## Local Setup

### 1. Clone and install

```bash
git clone <your-repo-url>
cd sds-website

# Install frontend deps
cd frontend && npm install

# Install backend deps
cd ../backend && npm install
```

### 2. Configure backend environment

```bash
cd backend
cp .env.example .env
# Edit .env and add your GROQ_API_KEY
```

Get a free Groq API key at: https://console.groq.com

### 3. Run development servers

Terminal 1 — Backend:
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

Terminal 2 — Frontend:
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

Open http://localhost:5173 in your browser.

---

## Deployment

### Frontend → Vercel

```bash
cd frontend
npm run build
# Deploy dist/ folder to Vercel
# Or connect GitHub repo and set root to /frontend
```

Set environment variable in Vercel:
- `VITE_API_URL` = your backend URL (e.g. https://your-backend.railway.app)

Update `frontend/vite.config.js` proxy target for production.

### Backend → Railway / Render

1. Connect GitHub repo
2. Set root directory to `/backend`
3. Add environment variable: `GROQ_API_KEY=your_key`
4. Build command: `npm install`
5. Start command: `npm start`

---

## Project Structure

```
sds-website/
├── frontend/
│   ├── src/
│   │   ├── components/     # Navbar, Footer
│   │   ├── pages/          # Home, Playground
│   │   └── index.css       # Global styles
│   ├── tailwind.config.js
│   └── vite.config.js
└── backend/
    ├── src/
    │   ├── routes/         # analyze.js
    │   ├── controllers/    # analyzeController.js
    │   └── index.js
    └── .env.example
```

## AI Prompts Used

See `prompts-log.md` for the full list of prompts used during development with Claude.
