import express from "express";
import { createBooking, updateStatus } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/create", createBooking);
router.put("/status/:id", updateStatus);

export default router;