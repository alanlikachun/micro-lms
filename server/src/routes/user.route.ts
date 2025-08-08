import { Router } from "express";
import {
  createUser,
  deleteUsers,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller";
import { validateResource } from "../middlewares/validateResource";
import { createUserSchema } from "../schemas/user.schema";

const router = Router();

router.post("/", validateResource(createUserSchema), createUser);
router.get("/list", getUsers);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/", deleteUsers);

export default router;
