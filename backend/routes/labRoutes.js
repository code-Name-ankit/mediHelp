import express from "express";
import { getNearbyLabs } from "../controllers/labController.js";

const router = express.Router();

router.get("/nearby", getNearbyLabs);

export default router;