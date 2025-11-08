const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const {globalErrorHandler} = require('./utils/failure');

// Import routes
const authRoutes = require('./routes/auth');
const electionRoutes = require('./routes/election');
const voteRoutes = require('./routes/vote');
const receiptRoutes= require('./routes/receipt');

const app = express();

//security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from the URL please try again'
});
app.use(limiter);

//CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({limit: '1000mb' }));
app.use(express.urlencoded({ extended: true, limit: '1000mb'}));

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/elections', electionRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/receipts', receiptRoutes);

//Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({status: 'OK', message: 'Neo-vote Api running'});
});

// 404 handler
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

//Global error handler
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Neo Vote API server is running on port ${PORT} `);
});

module.exports = app;

