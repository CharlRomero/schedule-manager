import { Router } from "express";

import {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/room.controller.js";

const router = Router();

router.get("/room", getRooms);
router.get("/room/:id", getRoom);
router.post("/room", createRoom);
router.patch("/room/:id", updateRoom);
router.delete("/room/:id", deleteRoom);

export default router;
