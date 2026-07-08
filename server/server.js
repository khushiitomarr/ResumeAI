import express from 'express'
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);

app.get('/', (req, res) => {
  res.send('RsumeAI backend running')
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  });
