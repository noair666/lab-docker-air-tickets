const cors = require('cors');
const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 3001;

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  port: 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_NAME || 'postgres',
});

app.get('/health', (req, res) => {
  res.send('OK');
});

app.post('/search-and-save', async (req, res) => {
  const { from, to, date, passengers } = req.body;
  console.log('✅ Получен запрос на поиск билетов:', { from, to, date, passengers });

  if (!from || !to || !date || !passengers) {
    return res.status(400).json({ success: false, message: 'Не все поля заполнены' });
  }

  try {
    const query = `
      INSERT INTO bookings (from_city, to_city, date, passengers)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;
    const values = [from, to, date, passengers];

    const result = await pool.query(query, values);

    const newId = result.rows[0].id;

    console.log(`💾 Бронь сохранена! ID: ${newId}`);

    return res.json({
      success: true,
      id: newId,
      message: 'Бронь создана',
  
      results: [
        { id: newId, from_city: from, to_city: to, price: 10000, airline: 'TestAir' }
      ],
    });
  } catch (err) {
    console.error('❌ Ошибка при сохранении брони:', err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend запущен на порту ${PORT}`);
});
