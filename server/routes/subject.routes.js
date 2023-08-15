import { Router } from "express";

import {
  getSubject,
  createSubject,
  updateSubject,
  deleteSubject,
} from "../controllers/subject.controller.js";

const router = Router();

router.get("/subject", getSubject);
router.post("/subject", createSubject);
router.patch("/subject/:id", updateSubject);
router.delete("/subject/:id", deleteSubject);

export default router;
