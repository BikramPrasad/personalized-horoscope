const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to authenticate user via JWT
function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
}

// Function to generate JWT
function generateAccessToken(user) {
  if (!user || !user.id || !user.email) {
    throw new Error('User object must contain id and email');
  }
  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

  return token;
}

module.exports = {
  authenticateUser,
  generateAccessToken,
};
