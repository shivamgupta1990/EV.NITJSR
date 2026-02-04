import express from "express";
import { registerEvent,getMyBookings ,createBooking} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", protect, registerEvent);
router.get("/my", protect, getMyBookings);
router.post("/", protect, createBooking);

export default router;
