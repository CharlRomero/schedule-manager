import { Router } from "express";

import {
  getSlot,
  createSlot,
  updateSlot,
} from "../controllers/slot.controller.js";

const router = Router();

router.get("/slot", getSlot);
router.post("/slot", createSlot);
router.patch("/slot/:id", updateSlot);

export default router;