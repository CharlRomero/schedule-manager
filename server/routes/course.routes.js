import { Router } from "express";

import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller.js";

const router = Router();

router.get("/course", getCourses);
router.get("/course/:id", getCourse);
router.post("/course", createCourse);
router.patch("/course/:id", updateCourse);
router.delete("/course/:id", deleteCourse);

export default router;
