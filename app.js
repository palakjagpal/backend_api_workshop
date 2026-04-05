import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
console.log("JWT_SECRET at startup:", process.env.JWT_SECRET);

import authRoutes from './routes/authRoutes.js';
import connectDB from './config/db.js';
import  itemRoutes from './routes/itemRoute.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

app.get("/",(req,res)=> {
    res.send("🚀 Auth API is running...")
})

app.get("/test", (req,res) => {
    console.log("Test route hit")
    res.json({message: "Test successful"})
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
