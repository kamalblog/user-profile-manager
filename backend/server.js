import dotenv from "dotenv";
import express from 'express';
import helmet  from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { sanitizeInput } from "./middleware/sanitizeMiddleware.js";
dotenv.config();

import  authRoutes  from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import githubRoutes from './routes/github.js';


const app = express();
const PORT = process.env.PORT || 4000;

app.use(sanitizeInput);
app.use(helmet());
app.use(cors());
app.use(express.json());


const limiter = rateLimit({ windowMs: 60 * 1000, max: 100 });
app.use(limiter);


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/github', githubRoutes);


app.get('/', (req, res) => res.send({ ok: true }));


if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
}

export default app;