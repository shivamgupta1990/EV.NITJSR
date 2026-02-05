import express from "express";
import { createEvent,getEventById, getEvents } from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";




const router = express.Router();

// Admin only
router.post("/",protect,adminOnly, createEvent);

// Public/User
router.get("/", getEvents);

router.get("/:id", getEventById);



export default router;
