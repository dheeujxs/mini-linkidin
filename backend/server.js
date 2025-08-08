import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

dotenv.config();
const app = express();

// CORS config
const allowedOrigins = [
  "http://localhost:3000", // local dev
  "https://mini-linkidin-h3th.vercel.app" // deployed frontend
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
