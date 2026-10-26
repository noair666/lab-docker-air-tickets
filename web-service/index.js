const express = require('express');
const app = express();
const PORT = 3000;

app.get('/health', (req, res) => {
  res.send('OK');
});

app.get('/search', (req, res) => {
  const from = req.query.from || 'Москва';
  const to = req.query.to || 'Сочи';
  res.json([
    { from, to, price: 5000, airline: 'TestAir', departure_time: '2025-12-15 10:00:00' },
    { from, to, price: 6200, airline: 'TestJet', departure_time: '2025-12-16 14:30:00' }
  ]);
});

app.listen(PORT, () => {
  console.log(`Web-service running on port ${PORT}`);
});
