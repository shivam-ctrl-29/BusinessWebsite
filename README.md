# Shivam Logistics — Business Website

Professional logistics business website for **Shivam Logistics**, India's smart logistics partner offering Full Truck Load (FTL), Part Truck Load (PTL), and Heavy Equipment Transport across 28 states.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | CSS Variables (no UI framework) |
| Backend | Node.js + Express |
| Email | Nodemailer (Gmail SMTP) |
| Security | Helmet.js, express-rate-limit, CORS |
| Fonts | Inter + Plus Jakarta Sans (Google Fonts) |

---

## Features

- Hero section with live GPS & on-time delivery floating cards
- Services: FTL, PTL, Heavy Equipment Transport (modal detail view)
- Fleet showcase with vehicle specs
- Pan-India branch network map
- Get Quote form (sends email notification)
- Contact form (sends email notification)
- AI Chat assistant (rule-based, no external API cost)
- Dark / Light mode toggle
- Legal: Privacy Policy & Terms of Service (Indian law)
- Fully responsive — mobile, tablet, desktop

---

## Project Structure

```
shivam-logistics/
├── frontend/          # React + Vite app
│   ├── src/
│   │   ├── components/   # All UI components
│   │   └── index.css     # Global styles + CSS variables
│   └── index.html
├── backend/           # Express API server
│   ├── controllers/      # contactController, quoteController, trackingController
│   ├── routes/
│   └── utils/
│       └── sanitize.js   # HTML escaping + header sanitization
└── package.json       # Root scripts
```

---

## Getting Started (Local Development)

### 1. Install dependencies

```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env` inside the `backend/` folder and fill in your values:

```bash
cp .env.example backend/.env
```

Required variables:

```
PORT=4000
NODE_ENV=development
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_TO=your_receiving_email@gmail.com
WHATSAPP_NUMBER=919999999999
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:4000
```

> **Never commit `.env`** — it is gitignored.

### 3. Run the dev servers

```bash
# From project root — starts both frontend (5173) and backend (4000)
npm run dev
```

Or start individually:

```bash
# Frontend
cd frontend && npm run dev

# Backend
cd backend && node server.js
```

---

## Production Deployment

```bash
# Build the frontend
cd frontend && npm run build

# Set env vars on server, then start backend
NODE_ENV=production node backend/server.js
```

The backend serves `frontend/dist` automatically in production.

**Important before deploying:**
- Set `ALLOWED_ORIGINS` to your real domain (e.g., `https://shivamlogistics.in`)
- Set `NODE_ENV=production`
- Use a process manager like PM2 for the backend

---

## Security

- Helmet.js with Content Security Policy
- Rate limiting: 300 req/15 min globally, 8 req/15 min on form endpoints
- CORS restricted to `ALLOWED_ORIGINS`
- All form inputs validated, sanitized, and HTML-escaped before email
- JSON body limit: 20 KB
- Centralized error handler — no stack traces leaked to client

---

## License & Copyright

© 2026 Shivam Logistics. All rights reserved.

This codebase and all website content are the exclusive property of Shivam Logistics and are protected under the **Copyright Act, 1957 (India)** and applicable international copyright laws. Unauthorized reproduction or distribution is prohibited.

For permissions: [shivamlogistics28@gmail.com](mailto:shivamlogistics28@gmail.com)
