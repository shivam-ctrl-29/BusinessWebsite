# Shivam Logistics — Business Website

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
