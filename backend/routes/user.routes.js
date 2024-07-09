import express from "express";
import {
  findMutualFriends,
  getUserProfile,
  createUser,
  deleteUser,
  updateUser,
  saveProfile,fetchRepositories,  fetchFollowers,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUser);
router.get("/:username", getUserProfile);
router.post("/:username/save", saveProfile); 
router.get("/:username/repos", fetchRepositories);
router.put("/:username", updateUser);
router.get("/:username/mutual-friend", findMutualFriends);
router.get("/:username/followers", fetchFollowers);
router.delete("/:username", deleteUser);

export default router;
