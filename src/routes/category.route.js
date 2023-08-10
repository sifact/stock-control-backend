import express from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/category.controller.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", createCategory);
// router.patch("/:id", verifyToken, updateProduct);

export default router;
