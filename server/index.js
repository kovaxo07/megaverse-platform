const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory store for demo purposes only
const lastClaim = {}; // userId -> timestamp

const CLAIM_INTERVAL_MIN = 60; // minutes
const BASE_REWARD = 100;

app.post('/api/faucet/claim', (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: 'userId required' });

  const now = Date.now();
  const last = lastClaim[userId] || 0;
  const elapsedMin = (now - last) / 1000 / 60;
  if (elapsedMin < CLAIM_INTERVAL_MIN) {
    return res.status(429).json({ error: 'Cooldown', retryAfter: Math.ceil(CLAIM_INTERVAL_MIN - elapsedMin) });
  }

  // Simple dynamic reward (demo): +50 if userId contains 'vip'
  const bonus = userId.includes('vip') ? 50 : 0;
  const reward = BASE_REWARD + bonus;
  lastClaim[userId] = now;

  // In production: mint/transfer tokens or call blockchain
  return res.json({ userId, reward, nextClaimInMin: CLAIM_INTERVAL_MIN });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Faucet server listening on ${port}`));
