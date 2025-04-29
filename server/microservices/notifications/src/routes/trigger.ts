import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  const { source, status, recipient, userId } = req.body;

  console.log("🔔 Trigger received:", req.body);

  // TODO: Add auth middleware
  // TODO: Add logic to generate and send notification

  res.status(200).json({ message: "Trigger received." });
});

export default router;
