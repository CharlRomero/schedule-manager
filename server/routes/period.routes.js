import { Router } from "express";

import {
  getPeriods,
  getPeriod,
  createPeriod,
  updatePeriod,
  deletePeriod,
} from "../controllers/period.controller.js";

const router = Router();

router.get("/period", getPeriods);
router.get("/period/:id", getPeriod);
router.post("/period", createPeriod);
router.patch("/period/:id", updatePeriod);
router.delete("/period/:id", deletePeriod);

export default router;
