require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/user');
const pollRoutes = require('./routes/poll');

const app = express();

// ---------------- CORS Setup ----------------
const allowedOrigins = [
  'http://localhost:5173',  // Local React dev
  'https://online-voting-platform-ruddy.vercel.app' // Deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS error: This origin (${origin}) is not allowed.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware
app.use(express.json());

// ---------------- MongoDB Connection ----------------
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((error) => console.error('❌ MongoDB Connection Error:', error));

// ---------------- Routes ----------------
app.use('/api/auth', authRoutes);
app.use('/api/polls', pollRoutes);

// ---------------- Start Server ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
