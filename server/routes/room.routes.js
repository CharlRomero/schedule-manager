import { Router } from "express";

import {
  getRooms,
  getRoom,
} from "../controllers/room.controller.js";

const router = Router();

router.get("/room", getRooms);
router.get("/room/:id", getRoom);

export default router;