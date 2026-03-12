const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const fs = require('fs');

const app = express();
app.use(cors());
app.set('trust proxy', true);
const PORT = process.env.PORT || 3000;

// Load proverbs from JSON
const proverbs = JSON.parse(fs.readFileSync('./proverbs.json', 'utf-8'));

// Rate limiter: 120 requests per minute per IP
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 120,
  keyGenerator: (req) => {
    return req.headers['cf-connecting-ip'] || req.ip; // Fallback if header missing (or for non-CF)
  },
  message: { error: 'Too many requests, please try again later. (120 reqs/min/IP)' }
});

app.use(limiter);

app.get('/', (req, res) => {
  res.json({
    message: 'Wrong German Proverbs API is running.',
    endpoint: '/get'
  });
});

// Random wrong proverb endpoint
app.get('/get', (req, res) => {
  const proverb = proverbs[Math.floor(Math.random() * proverbs.length)];
  res.json({ proverb });
});

// Start server
app.listen(PORT, () => {
  console.log(`Wrong-german-proverbs is running on port ${PORT}`);
});
