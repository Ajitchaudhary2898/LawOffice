const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, { })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((err) => console.log(err.message));
