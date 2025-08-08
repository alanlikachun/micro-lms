import { Router } from "express";
import {
  createUser,
  deleteUsers,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller";
import { validateResource } from "../middlewares/validateResource";
import {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
} from "../schemas/user.schema";

const router = Router();

router.post("/", validateResource(createUserSchema), createUser);
router.get("/list", getUsers);
router.get("/:id", validateResource(getUserSchema), getUser);
router.patch("/:id", validateResource(updateUserSchema), updateUser);
router.delete("/", deleteUsers);

export default router;
