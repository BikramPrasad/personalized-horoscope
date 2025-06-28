const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 5, 
  message: {
    status: 429,
    message: 'Too many requests. Please try again after a minute.',
  },
  standardHeaders: true,
  legacyHeaders: false,  

  handler: (req, res) => {
    console.warn(`⚠️  Rate limit exceeded for IP: ${req.ip}, Route: ${req.originalUrl}`);
    res.status(429).json({
      status: 429,
      message: 'Too many requests. Please try again after a minute.',
    });
  },

  keyGenerator: (req) => {
    return req.headers['x-forwarded-for'] || req.ip;
  },
});

module.exports = limiter;
