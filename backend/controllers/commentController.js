const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  const { userId, movieId, text, rating } = req.body;
  try {
    const comment = new Comment({ user: userId, movie: movieId, text, rating });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
