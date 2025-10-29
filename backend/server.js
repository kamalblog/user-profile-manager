require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');


const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const githubRoutes = require('./routes/github');


const app = express();
const PORT = process.env.PORT || 4000;


app.use(helmet());
app.use(cors());
app.use(express.json());


const limiter = rateLimit({ windowMs: 60 * 1000, max: 100 });
app.use(limiter);


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/github', githubRoutes);


app.get('/', (req, res) => res.send({ ok: true }));


app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));