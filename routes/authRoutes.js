import { protectedRoute, publicRoute, login, signup } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.get("/profile/:id", authMiddleware, protectedRoute)
router.get("/public", publicRoute)

export default router;
