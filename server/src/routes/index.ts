import { Router } from "express";
import healthRoute from "./health.route";
import apiRoute from "./api.route";

const router = Router();

router.use("/health", healthRoute);
router.use("/api", apiRoute);

export default router;
