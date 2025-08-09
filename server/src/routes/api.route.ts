import { Router } from "express";
import userRoute from "./user.route";
import societyRoute from "./society.route";

const router = Router();

router.use("/user", userRoute);
router.use("/society", societyRoute);

export default router;
