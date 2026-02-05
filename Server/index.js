import "./config/env.js";
const app = express();
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";


import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();
connectDB();


app.use(express.json());

/* ---------- Middleware ---------- */

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      // "https://ev-nitjsr-pumk.vercel.app" // Replace with your actual vercel link
    ],
    credentials: true
  })
);


app.use(express.json());

/* ---------- Static Files ---------- */
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

/* ---------- Routes ---------- */
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);

/* ---------- Health Check ---------- */
app.get("/", (req, res) => {
  res.status(200).send("Event Booking API is running 🚀");
});

/* ---------- Server ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});