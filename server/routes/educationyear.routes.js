import { Router } from "express";

import {
  getYears,
  getYear,
  updateEducationYear,
} from "../controllers/educationyear.controller.js";

const router = Router();

router.get("/educationyear", getYears);
router.get("/educationyear/:id", getYear);
router.patch("/educationyear/:id", updateEducationYear);

export default router;
