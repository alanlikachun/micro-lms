import express from "express";
import {
  createSociety,
  getSocieties,
  getSociety,
  updateSociety,
  deleteSociety,
} from "../controllers/society.controller";

const router = express.Router();

router.post("/", createSociety);
router.get("/", getSocieties);
router.get("/:id", getSociety);
router.patch("/:id", updateSociety);
router.delete("/:id", deleteSociety);

export default router;
