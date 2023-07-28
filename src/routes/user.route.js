import express from "express";
import { deleteUser, getUsers } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", verifyToken, getUsers);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
