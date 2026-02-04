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

const app = express();

/* ---------- Middleware ---------- */
const allowedOrigins = [
  "http://localhost:3000", // Local development
  "http://localhost:5173", // Vite default
  "https://your-app.vercel.app", // Replace with your actual Vercel domain
  // Add more origins as needed
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    // Allow file:// protocol for local development
    if (origin && origin.startsWith('file://')) return callback(null, true);
    // Allow localhost origins for development
    if (origin && (origin.includes('localhost') || origin.includes('127.0.0.1'))) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // For development, allow all origins
      callback(null, true);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

/* ---------- Static Files ---------- */
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

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
  console.log(`✅ Server running on port ${PORT}`);
});
