// middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded user:', decoded.user); // Log the decoded user
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Authentication error:', err); // Log the error
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
