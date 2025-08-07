require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/user');
const pollRoutes = require('./routes/poll');

const app = express();

// Middleware
app.use(cors({
  origin: ['https://online-voting-platform-ruddy.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Modern replacement of body-parser
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((error) => console.error('❌ MongoDB Connection Error:', error));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/polls', pollRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
