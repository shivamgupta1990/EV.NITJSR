import express from "express";
import { RegisterUser } from "../controllers/Register.js";
import { loginUser } from "../controllers/Login.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", loginUser);

export default router;
