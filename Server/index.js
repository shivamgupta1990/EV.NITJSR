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
app.use(cors({
  origin: "*", // later restrict this for production
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
