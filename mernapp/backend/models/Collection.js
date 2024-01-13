
const mongoose = require('mongoose');

const { Schema } = mongoose

const CollectionSchema = new Schema({
  id: String,
  title: String,
  thumbnail: {
    trending: {
      small: String,
      large: String,
    },
    regular: {
      small: String,
      medium: String,
      large: String,
    },
  },
  year: Number,
  category: String,
  rating: String,
  starRating: String,
  language: String,
  isBookmarked: Boolean,
  isTrending: Boolean,
  length: String,
  genres: Array,
  casts: Array,
  overview: String,
  status: String,
  tagline: String,
  firstAir: String,
  lastAir: String
});

module.exports = mongoose.model('collection', CollectionSchema);