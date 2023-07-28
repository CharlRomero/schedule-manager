import { Router } from "express";

import {
  getSubject,
  createSubject,
  updateSubject,
} from "../controllers/subject.controller.js";

const router = Router();

router.get("/subject", getSubject);
router.post("/subject", createSubject);
router.patch("/subject/:id", updateSubject);

export default router;