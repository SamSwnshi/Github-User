import express from "express";
import {
  findMutualFriends,
  getUserProfile,
  createUser,
  deleteUser,
  updateUser,
  saveProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUser);
router.get("/:username", getUserProfile);
router.put("/:username", updateUser);
router.post("/:username/save", saveProfile); 
router.get("/:username/mutual-friend", findMutualFriends);
router.delete("/:username", deleteUser);

export default router;
