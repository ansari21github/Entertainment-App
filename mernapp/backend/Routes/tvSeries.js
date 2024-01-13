// routes/tvSeries.js
const express = require('express');
const router = express.Router();
const Collection = require('../models/Collection');

// Route to get TV series by category
router.get('/', async (req, res) => {
  try {
    const tvSeries = await Collection.find({ category: 'TV Series' });
    res.json(tvSeries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Route to get tv series details by ID
router.get('/:id', async (req, res) => {
  const seriesId = req.params.id;

  try {
    const series = await Collection.findById(seriesId);
    if (!series) {
      return res.status(404).json({ message: 'series not found' });
    }
    res.json(series);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
