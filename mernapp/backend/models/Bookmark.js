
const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bookmarks: Array,
});

module.exports = mongoose.model('Bookmark', BookmarkSchema);