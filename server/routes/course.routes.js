import { Router } from "express";

import {
  getCourse,
  createCourse,
  updateCourse,
} from "../controllers/course.controller.js";

const router = Router();

router.get("/course", getCourse);
router.post("/course", createCourse);
router.patch("/course/:id", updateCourse);

export default router;
