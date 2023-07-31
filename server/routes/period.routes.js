import { Router } from "express";

import {
  getPeriods,
  getPeriod,
  createPeriod,
  updatePeriod,
} from "../controllers/period.controller.js";

const router = Router();

router.get("/period", getPeriods);
router.get("/period/:id", getPeriod);
router.post("/period", createPeriod);
router.patch("/period/:id", updatePeriod);

export default router;
