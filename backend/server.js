const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'https://imdbfrontend-7dzip0p1n-berkays-projects-e9522f58.vercel.app', // Replace with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json());

const PORT = process.env.PORT || 5000;

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Import Routes
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const commentRoutes = require('./routes/comments');
const watchlistRoutes = require('./routes/watchlist');

// Route Middleware
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes); // Use movie routes
app.use('/api/comments', commentRoutes);
app.use('/api/watchlist', watchlistRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
