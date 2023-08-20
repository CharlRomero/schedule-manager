import { Router } from "express";

import {
  getCourseSchedules,
  getCourseSchedule,
  createCourseSchedule,
  updateCourseSchedule,
  deleteCourseSchedule,
} from "../controllers/schedule.controller.js";

const router = Router();

router.get("courseschedules/", getCourseSchedules);
router.get("/courseschedule/:id", getCourseSchedule);
router.post("/courseschedule", createCourseSchedule);
router.put("/courseschedule/:id", updateCourseSchedule);
router.delete("/courseschedule/:id", deleteCourseSchedule);

export default router;
