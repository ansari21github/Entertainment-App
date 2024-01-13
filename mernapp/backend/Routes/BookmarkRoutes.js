
const express = require('express');
const router = express.Router();
const {
  addToBookmarks,
  getBookmarks,
  removeFromBookmarks,
} = require('../controllers/controller');

router.post('/add', addToBookmarks);
router.delete("/remove", removeFromBookmarks);
router.get("/bookmarks/:email", getBookmarks);
module.exports = router;
