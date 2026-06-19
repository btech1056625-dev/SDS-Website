# SDS Website — Society for Data Science, BIT Mesra

A full-stack MERN web platform for the Society for Data Science (SDS) at BIT Mesra — featuring real club branding, event history, executive body profiles, and an AI-powered Dataset Playground for exploratory data analysis.

**🔗 Live Site:** [sds-website-ivory.vercel.app](https://sds-website-ivory.vercel.app/)
**🔗 Backend API:** [sds-website-8phk.onrender.com](https://sds-website-8phk.onrender.com/)
**🔗 Repository:** [github.com/btech1056625-dev/SDS-Website](https://github.com/btech1056625-dev/SDS-Website)

---

## Overview

This project was built for the **SDS Website Development Challenge**, with the goal of producing a professional, production-quality club website rather than a static assignment. It combines a modern, branded UI with a genuinely useful AI feature — an in-browser tool that lets any student upload a CSV and instantly receive a full exploratory data analysis (EDA) report powered by LLM-generated insights.

---

## Features

### 🏠 Home
- Animated particle-network hero (canvas-based, zero external 3D libraries)
- Embedded club intro video
- Brand-accurate design system (orange + blue, matched to the official SDS logo)
- Quick navigation into Events and Team

### 📅 Events — dedicated page
- Real DSS'26 event history: Hack & Forge, Coder's Cup, Render Replicas, and both speaker sessions (Siddhartha Samant — AI Lead, Deloitte; Shridhar Mankar — 5 Minutes Engineering)
- Tabbed Past / Upcoming view with dates, timings, venues, and organizer credits
- Upcoming events roadmap

### 👥 Team — dedicated page
- Full executive body with real photos: President, Vice Presidents, Directors, General Secretary, Joint Secretary
- Split into Leadership and Core Team sections

### 🧠 Dataset Playground — AI-powered EDA tool
Upload any CSV and receive:
- Column-level statistics (mean, median, std dev, min, max, missing %)
- Automatic type detection (numeric / categorical / datetime)
- Visualizations — bar charts, pie charts, missing-value breakdown (Recharts)
- AI-generated insights via **Groq (Llama 3.3 70B)**:
  - Plain-English dataset overview
  - Key insights (data-driven, not generic)
  - Data quality score with issues + recommendations
  - Suggested next analyses, ranked by difficulty
  - ML applicability assessment

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router, Tailwind CSS |
| Visualization | Recharts |
| File Upload | react-dropzone |
| Backend | Node.js, Express |
| CSV Parsing | csv-parse |
| File Handling | Multer |
| AI Inference | Groq API — `llama-3.3-70b-versatile` |
| Hosting (Frontend) | Vercel |
| Hosting (Backend) | Render |
| Fonts | Space Grotesk (display), Inter (body), JetBrains Mono (data) |

---

## Project Structure

SDS-Website/

├── backend/

│   ├── src/

│   │   ├── controllers/

│   │   │   └── analyzeController.js   # CSV parsing, stats engine, Groq prompt

│   │   ├── routes/

│   │   │   └── analyze.js             # Multer upload route

│   │   └── index.js                   # Express app entry point

│   ├── .env.example

│   └── package.json

│

├── frontend/

│   ├── src/

│   │   ├── assets/

│   │   │   ├── team/                  # Executive body photos

│   │   │   └── video/                 # Club intro video

│   │   ├── components/

│   │   │   ├── Navbar.jsx

│   │   │   └── Footer.jsx

│   │   ├── data/

│   │   │   └── sdsData.js             # Single source of truth: events + team

│   │   ├── pages/

│   │   │   ├── Home.jsx

│   │   │   ├── Events.jsx

│   │   │   ├── Team.jsx

│   │   │   └── Playground.jsx

│   │   ├── App.jsx

│   │   └── index.css

│   ├── vercel.json                    # SPA routing rewrite rules

│   ├── tailwind.config.js

│   ├── vite.config.js

│   └── .env.example

│

├── prompts-log.md                     # AI prompts used during development

└── README.md

---

## Local Development Setup

### Prerequisites
- Node.js 18+
- A free [Groq API key](https://console.groq.com)

### 1. Clone the repository

```bash
git clone https://github.com/btech1056625-dev/SDS-Website.git
cd SDS-Website
```

### 2. Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3. Configure environment variables

**Backend** (`backend/.env`):
```env
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
FRONTEND_URL=http://localhost:5173
```

**Frontend** (`frontend/.env`) — only needed if testing against a deployed backend locally:
```env
VITE_API_URL=https://sds-website-8phk.onrender.com
```

### 4. Run both servers

```bash
# Terminal 1 — backend
cd backend
npm run dev      # http://localhost:5000

# Terminal 2 — frontend
cd frontend
npm run dev      # http://localhost:5173
```

Visit `http://localhost:5173`.

---

## Deployment

### Frontend — Vercel
| Setting | Value |
|---|---|
| Root Directory | `frontend` |
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Env Variable | `VITE_API_URL` = your Render backend URL |

`frontend/vercel.json` handles SPA routing so direct navigation/refresh on `/playground`, `/events`, `/team` works correctly.

### Backend — Render
| Setting | Value |
|---|---|
| Root Directory | `backend` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Env Variables | `GROQ_API_KEY`, `FRONTEND_URL` (set to Vercel URL once deployed) |

> **Note:** The backend runs on Render's free tier, which spins down after periods of inactivity. The first request after idle time may take 30–50 seconds to respond while the instance wakes up.

---

## API Reference

### `POST /api/analyze`
Analyzes an uploaded CSV file and returns statistics + AI-generated insights.

**Request:** `multipart/form-data` with field `file` (CSV, max 5MB)

**Response:**
```json
{
  "meta": { "rows": 891, "columns": 12, "fileName": "titanic.csv", "fileSize": 60302 },
  "columnAnalysis": [ /* per-column stats, type, missing % */ ],
  "aiAnalysis": {
    "overview": "...",
    "keyInsights": ["..."],
    "dataQuality": { "score": 85, "issues": ["..."], "recommendations": ["..."] },
    "suggestedAnalyses": [{ "name": "...", "description": "...", "difficulty": "Easy" }],
    "mlPotential": "..."
  }
}
```

### `GET /health`
Basic health check — returns `{ "status": "ok", "service": "SDS Backend" }`.

---

## AI Prompts Used

The full list of prompts used with Claude during development is documented in [`prompts-log.md`](./prompts-log.md), as required by the challenge submission guidelines.

---

## Future Improvements

For this to evolve from a hackathon submission into the club's actual production site, the following would be the next priorities:
- Admin panel (auth-gated) to manage Events/Team data without code changes
- MongoDB-backed CMS for event and member records
- Image upload UI for team photos instead of manual cropping
- Always-on backend hosting to eliminate cold-start delays
- Basic uptime monitoring

---

## License

Built for the SDS Website Development Challenge. © 2025 Society for Data Science, BIT Mesra.
