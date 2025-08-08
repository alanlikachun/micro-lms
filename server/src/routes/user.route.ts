import { Router } from "express";
import { createUser, deleteUsers, getUser, getUsers } from "../controllers/user.controller";

const router = Router();

router.post("/", createUser);
router.get("/list", getUsers);
router.get("/:id", getUser);
router.delete("/", deleteUsers);

export default router;
