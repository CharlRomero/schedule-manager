import { Router } from "express";

import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
} from "../controllers/course.controller.js";

const router = Router();

router.get("/course", getCourses);
router.get("/course/:id", getCourse);
router.post("/course", createCourse);
router.patch("/course/:id", updateCourse);

export default router;
