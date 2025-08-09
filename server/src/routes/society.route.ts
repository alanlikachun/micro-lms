import express from "express";
import {
  createSociety,
  getSocieties,
  getSociety,
  updateSociety,
  deleteSocieties,
} from "../controllers/society.controller";
import { validateResource } from "../middlewares/validateResource";
import {
  createSocietySchema,
  deleteSocietiesSchema,
  getSocietySchema,
  updateSocietySchema,
} from "../schemas/society.schema";

const router = express.Router();

router.post("/", validateResource(createSocietySchema), createSociety);
router.get("/", getSocieties);
router.get("/:id", validateResource(getSocietySchema), getSociety);
router.patch("/:id", validateResource(updateSocietySchema), updateSociety);
router.delete("/", validateResource(deleteSocietiesSchema), deleteSocieties);

export default router;
