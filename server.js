const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const PASSWORD = 'camp2025';
const stocks = {
  "AAPL": { current: 150, endOfDay: 155, history: [ { time: Date.now(), value: 150 } ] },
  "GOOG": { current: 2000, endOfDay: 2020, history: [ { time: Date.now(), value: 2000 } ] }
};

// Get all stocks
app.get('/api/stocks', (req, res) => {
  res.json(stocks);
});

// Set end-of-day value (admin)
app.post('/api/admin/setEndOfDay', (req, res) => {
  if (req.body.password !== PASSWORD) return res.status(401).send('Unauthorized');
  const { stock, value } = req.body;
  if (!stocks[stock]) return res.status(404).send('Stock not found');
  stocks[stock].endOfDay = value;
  res.send('End-of-day value set');
});

// Set value immediately (admin)
app.post('/api/admin/setImmediate', (req, res) => {
  if (req.body.password !== PASSWORD) return res.status(401).send('Unauthorized');
  const { stock, value } = req.body;
  if (!stocks[stock]) return res.status(404).send('Stock not found');
  stocks[stock].current = value;
  stocks[stock].history.push({ time: Date.now(), value });
  res.send('Stock value updated');
});

// Simulate price moving toward end-of-day value
setInterval(() => {
  const now = Date.now();
  for (const key in stocks) {
    let s = stocks[key];
    if (s.current !== s.endOfDay) {
      // Move a little closer each minute
      s.current += (s.endOfDay - s.current) * 0.05;
      s.current = Math.round(s.current * 100) / 100;
      s.history.push({ time: now, value: s.current });
    }
  }
}, 60000);

app.listen(3001, () => console.log('Server running on port 3001'));