const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const hpp = require('hpp');

const applySecurityMiddleware = (app) => {
  // Set secure HTTP headers
  app.use(helmet());

  // Enable CORS
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  app.use(xss());

  app.use(hpp());

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: 'Too many requests from this IP, please try again later.',
  });
  app.use(limiter);
};

module.exports = { applySecurityMiddleware };
