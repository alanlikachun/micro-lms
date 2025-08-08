import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller";

const router = Router();

router.get("/list", getUsers);
router.get("/:id", getUser);

export default router;
