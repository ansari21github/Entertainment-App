const express = require('express');
const router = express.Router();

const Collection = require('../models/Collection'); // Import your Trending model

// Define a route to fetch trending data
router.get('/', async (req, res) => {
  try {
    const trending = await Collection.find({ isTrending: true });
    res.json(trending);
  } catch (error) {
    console.error('Error fetching trending data:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
