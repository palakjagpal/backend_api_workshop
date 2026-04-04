import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", authRoutes)

app.get("/",(req,res)=> {
    res.send("🚀 Auth API is running...")
})

app.get("/test", (req,res) => {
    console.log("Test route hit")
    res.json({message: "Test successful"})
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
