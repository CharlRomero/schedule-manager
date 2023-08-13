import { Router } from "express";

import {
  getSlot,
  createSlot,
  updateSlot,
  deleteSlot,
} from "../controllers/slot.controller.js";

const router = Router();

router.get("/slot", getSlot);
router.post("/slot", createSlot);
router.patch("/slot/:id", updateSlot);
router.delete("/slot/:id", deleteSlot);

export default router;
