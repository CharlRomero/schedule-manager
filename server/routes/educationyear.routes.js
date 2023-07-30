import { Router } from "express";

import {
  getYears,
  getYear,
} from "../controllers/educationyear.controller.js";

const router = Router();

router.get("/educationyear", getYears);
router.get("/educationyear/:id", getYear);

export default router;