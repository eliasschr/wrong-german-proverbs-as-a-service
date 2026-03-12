const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const fs = require('fs');

const app = express();
app.use(cors());
app.set('trust proxy', true);

const PORT = process.env.PORT || 3000;
const API_VERSION = '1.2.0';

let proverbs = [];
try {
  proverbs = JSON.parse(fs.readFileSync('./proverbs.json', 'utf-8'));
  if (!Array.isArray(proverbs) || proverbs.length === 0) {
    throw new Error('proverbs.json must contain a non-empty array');
  }
} catch (error) {
  console.error(`Failed to load proverbs.json: ${error.message}`);
  process.exit(1);
}

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.headers['cf-connecting-ip'] || req.ip,
  message: { error: 'Too many requests, please try again later. (120 reqs/min/IP)' }
});

app.use(limiter);

const getRandomProverb = () => {
  return proverbs[Math.floor(Math.random() * proverbs.length)];
};

app.get('/', (req, res) => {
  res.json({
    message: 'Wrong German Proverbs API is running.',
    version: API_VERSION,
    endpoints: ['/', '/healthz', '/get', '/no']
  });
});

app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Preferred endpoint
app.get('/get', (req, res) => {
  res.json({ proverb: getRandomProverb() });
});

// Backwards-compatible endpoint
app.get('/no', (req, res) => {
  res.json({ proverb: getRandomProverb() });
});

app.listen(PORT, () => {
  console.log(`Wrong-german-proverbs is running on port ${PORT}`);
});
