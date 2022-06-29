import { Router } from "express";
import { SuccessResponse } from "../../utils/responses";
import authRoutes from "./auth.route";
import userRoutes from "./user.route";

const router = Router();

router.get("/healthcheck", (req, res) => new SuccessResponse(res));

router.use("/auth", authRoutes);

router.use("/user", userRoutes);

export default router;
