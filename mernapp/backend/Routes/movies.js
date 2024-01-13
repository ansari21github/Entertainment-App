// routes/movies.js
const express = require('express');
const router = express.Router();
const Collection = require('../models/Collection');

// Route to get movies by category
router.get('/', async (req, res) => {
  try {
    const movies = await Collection.find({ category: 'Movie' });
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to get movie details by ID
router.get('/:id', async (req, res) => {
  const movieId = req.params.id;

  try {
    const movie = await Collection.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
