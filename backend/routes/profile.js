import express from "express";
import { viewProfile, editProfile } from "../controllers/profileController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/profile", verifyToken, viewProfile);
router.put("/profile", verifyToken, editProfile);

export default router;

