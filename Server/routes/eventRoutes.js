import express from "express";
import { createEvent,getEventById, getEvents } from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Public/User
router.get("/", getEvents);

router.get("/:id", getEventById);

// Admin only
router.post("/", protect, adminOnly,upload.single("image"), createEvent);

export default router;
