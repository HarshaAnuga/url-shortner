import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import urlRoutes from './Routes/url.js'

dotenv.config();
const app=express();

app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods:["GET","POST"],
}))
app.use(express.json());

app.use("/", urlRoutes);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connected to MongoDB");
    const PORT = Number(process.env.PORT) || 5001;

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });

  server.on("error", (err) => {
    console.error("Server failed to start:", err);
    process.exit(1);
  });
})
.catch((err) => {
  console.error("Database connection or startup failed:", err);
  process.exit(1);
});
