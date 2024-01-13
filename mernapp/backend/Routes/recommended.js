const express = require('express');
const router = express.Router();

const Collection = require('../models/Collection');

router.get('/', async (req, res) => {
  try {
    // Use the limit method to fetch only 10 records
    const recommended = await Collection.find({ isTrending: false }).limit(8);
    res.json(recommended);
  } catch (error) {
    console.error('Error fetching recommended data:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
