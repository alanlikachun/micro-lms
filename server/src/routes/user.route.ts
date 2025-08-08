import { Router } from "express";
import { createUser, getUser, getUsers } from "../controllers/user.controller";

const router = Router();

router.post("/", createUser);
router.get("/list", getUsers);
router.get("/:id", getUser);

export default router;
