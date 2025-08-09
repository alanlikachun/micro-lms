import express from "express";
import {
  createSociety,
  getSocieties,
  getSociety,
  updateSociety,
  deleteSocieties,
} from "../controllers/society.controller";

const router = express.Router();

router.post("/", createSociety);
router.get("/", getSocieties);
router.get("/:id", getSociety);
router.patch("/:id", updateSociety);
router.delete("/", deleteSocieties);

export default router;
