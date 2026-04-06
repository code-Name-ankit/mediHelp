import express from "express";
import { uploadReport } from "../controllers/reportController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadReport);

export default router;