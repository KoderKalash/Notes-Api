const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth.routes');
const notesRoutes = require('./routes/notes.routes');
const { errorHandler } = require('./middleware/error.middleware');
const path = require('path');




const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// basic rate limiter
app.use(rateLimit({ windowMs: 60*1000, max: 100 }));

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// health
app.get('/health', (req, res) => res.json({ ok: true }));

app.use(errorHandler);





module.exports = app;
