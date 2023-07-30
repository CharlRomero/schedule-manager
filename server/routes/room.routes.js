import { Router } from "express";

import {
  getRooms,
  getRoom,
  updateRoom,
} from "../controllers/room.controller.js";

const router = Router();

router.get("/room", getRooms);
router.get("/room/:id", getRoom);
router.patch("/room/:id", updateRoom);

export default router;
