const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/rates', async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.freecurrencyapi.com/v1/latest`,
      {
        headers: {
          apikey: process.env.CURRENCY_API_KEY,
        },
      }
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
