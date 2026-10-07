import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import urlRoutes from './Routes/url.js'

dotenv.config();
const app=express();

const PORT = Number(process.env.PORT) || 5001;
const FRONTEND_URL =
  process.env.FRONTEND_URL || "http://localhost:5173";

const corsOptions = {
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/", urlRoutes);

async function startServer() {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not configured");
    }

    await mongoose.connect(process.env.MONGO_URL);

    console.log("Connected to MongoDB");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection or startup failed:", error);
    process.exit(1);
  }
}

startServer();