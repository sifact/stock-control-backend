import express from "express";
import {
  addToSoldProducts,
  getSales,
  getSoldProducts,
  handleOverallStat,
} from "../controllers/sales.js";

const router = express.Router();

router.get("/", getSales);
router.patch("/stat", handleOverallStat);

router.get("/sold", getSoldProducts);
router.post("/", addToSoldProducts);

export default router;
