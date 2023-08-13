import { Router } from "express";

import {
  getEducationTypes,
  getEducationType,
  createEducationType,
  updateEducationType,
  deleteEducationType,
} from "../controllers/educationtype.controller.js";

const router = Router();

router.get("/educationtype", getEducationTypes);
router.get("/educationtype/:id", getEducationType);
router.post("/educationtype", createEducationType);
router.patch("educationtype/:id", updateEducationType);
router.delete("educationtype/:id", deleteEducationType);

export default router;
