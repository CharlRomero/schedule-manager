import { Router } from "express";

import {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
} from "../controllers/room.controller.js";

const router = Router();

router.get("/room", getRooms);
router.get("/room/:id", getRoom);
router.post("/room", createRoom);
router.patch("/room/:id", updateRoom);

export default router;
