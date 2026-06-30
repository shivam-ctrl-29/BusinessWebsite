require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const contactRoutes = require('./routes/contact');
const quoteRoutes = require('./routes/quote');
const trackingRoutes = require('./routes/tracking');

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

// Trust the first proxy hop (Render/Railway/Vercel/Nginx) so rate-limit
// and req.ip see the real client IP instead of the proxy's IP.
app.set('trust proxy', 1);

// ── Security headers ─────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'blob:'],
      connectSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
      upgradeInsecureRequests: isProd ? [] : null,
    },
  },
  crossOriginResourcePolicy: { policy: 'same-site' },
}));

// ── CORS — restrict to known frontend origin(s) only ──────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://localhost:4000')
  .split(',')
  .map(o => o.trim());

app.use(cors({
  origin(origin, callback) {
    // Allow same-origin / non-browser requests (no Origin header)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST'],
}));

// ── Body parsing with explicit, small size limits ──────────────────
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));

// ── Rate limiting ──────────────────────────────────────────────────
// General baseline for every request
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
}));

// Stricter limiter for form-submission endpoints (anti-spam, protects
// the Gmail account from being used to mail-bomb third parties).
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests. Please try again in a few minutes.' },
});

// ── Serve the built frontend only (never the source tree) ─────────
app.use(express.static(path.join(__dirname, '../frontend/dist'), {
  maxAge: isProd ? '7d' : 0,
  index: false,
}));

// ── API Routes ──────────────────────────────────────────────────────
app.use('/api/contact', formLimiter, contactRoutes);
app.use('/api/quote', formLimiter, quoteRoutes);
app.use('/api/track', trackingRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Shivam Logistics API is running' });
});

// Fallback: serve index.html for any non-API route (SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// ── Centralized error handler — never leak stack traces / internals ─
app.use((err, req, res, next) => {
  if (err && err.message === 'Not allowed by CORS') {
    return res.status(403).json({ success: false, error: 'Origin not allowed' });
  }
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, error: 'Something went wrong. Please try again.' });
});

app.listen(PORT, () => {
  console.log(`Shivam Logistics server running at http://localhost:${PORT}`);
});
