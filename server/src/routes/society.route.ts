import express from "express";
import {
  createSociety,
  getSocieties,
  getSociety,
  updateSociety,
  deleteSocieties,
  addMembers,
} from "../controllers/society.controller";
import { validateResource } from "../middlewares/validateResource";
import {
  addMembersSchema,
  createSocietySchema,
  deleteSocietiesSchema,
  getSocietySchema,
  updateSocietySchema,
} from "../schemas/society.schema";
import { authMiddleware, rbacMiddleware } from "../middlewares/authMiddleware";
import { Role } from "../models/user.model";

const router = express.Router();

router.post(
  "/",
  rbacMiddleware([Role.ADMIN]),
  validateResource(createSocietySchema),
  createSociety
);
router.get("/", getSocieties);
router.get("/:id", validateResource(getSocietySchema), getSociety);
router.patch("/:id", validateResource(updateSocietySchema), updateSociety);
router.delete("/", validateResource(deleteSocietiesSchema), deleteSocieties);
router.post(
  "/add-members/:id",
  rbacMiddleware([Role.ADMIN, Role.TEACHER]),
  validateResource(addMembersSchema),
  addMembers
);

export default router;
