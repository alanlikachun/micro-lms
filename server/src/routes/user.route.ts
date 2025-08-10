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
  deleteUsersSchema,
  getUserSchema,
  getUsersSchema,
  updateUserSchema,
} from "../schemas/user.schema";
import { Role } from "../models/user.model";
import { authMiddleware, rbacMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  rbacMiddleware([Role.ADMIN]),
  validateResource(createUserSchema),
  createUser
);
router.get("/", validateResource(getUsersSchema), getUsers);
router.get("/:id", validateResource(getUserSchema), getUser);
router.patch("/:id", validateResource(updateUserSchema), updateUser);
router.delete(
  "/",
  authMiddleware,
  rbacMiddleware([Role.ADMIN]),
  validateResource(deleteUsersSchema),
  deleteUsers
);

export default router;
