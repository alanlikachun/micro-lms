import { Router } from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import societyRoute from "./society.route";

const router = Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/society", societyRoute);

export default router;
