// routes/watchlist.js
const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlistController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, watchlistController.getWatchlist);
router.post('/add', authMiddleware, watchlistController.addToWatchlist);
router.post('/remove', authMiddleware, watchlistController.removeFromWatchlist);
router.get('/check/:imdbID', authMiddleware, watchlistController.isInWatchlist);

module.exports = router;
