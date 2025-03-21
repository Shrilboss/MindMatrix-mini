
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const coursesRoutes = require('./routes/courses');
const passport = require('passport');
const authRoutes = require('./routes/auth'); // New auth routes
const configurePassport = require('./config/passport'); // Passport config

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// app.use(cors({
//   origin: process.env.NODE_ENV === 'production' 
//     ? ['https://yourdomain.com'] 
//     : ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'],
//   credentials: true
// }));
const allowedOrigins = process.env.CORS_ORIGINS.split(',').map(origin => origin.trim());

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mindmesh', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

configurePassport(passport);
app.use(passport.initialize());
// app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Authentication test endpoint
// app.get('/api/auth-test', (req, res) => {
//   const authHeader = req.headers.authorization;
  
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ status: 'error', message: 'No token provided' });
//   }
  
//   const token = authHeader.split(' ')[1];
  
//   // This endpoint just confirms the token was received
//   // Actual verification would happen in your auth middleware
//   res.status(200).json({ 
//     status: 'ok', 
//     message: 'Auth header received', 
//     tokenReceived: !!token 
//   });
// });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
