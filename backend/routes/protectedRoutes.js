import express from "express";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

router.get("/dashboard", (req, res) => {
  const user = verifyToken(req);

  if (!user) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  res.json({
    msg: "Welcome Dashboard",
    user
  });
});

export default router;