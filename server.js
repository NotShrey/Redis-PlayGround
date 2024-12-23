const express = require('express');
const axios = require('axios').default;
const client = require('./client');

const app = express();

app.get('/', async (req, res) => {
  try {
    // Check if data is in cache
    const cachedVal = await client.get('products');
    if (cachedVal) return res.json(JSON.parse(cachedVal));

    // Fetch data from external API
    const { data } = await axios.get('https://fakestoreapi.com/products/1');

    // Cache the data with a TTL of 3600 seconds (1 hour)
    await client.set('products', JSON.stringify(data));
    await client.expire('products', 3600);

    return res.json(data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
