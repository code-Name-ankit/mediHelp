import express from "express";
import {
  createLab,
  searchLabs,
  getLabById,
} from "../controllers/lab.controller.js";

const router = express.Router();

router.post("/create", createLab);
router.post("/search", searchLabs);
router.get("/:id", getLabById);

export default router;