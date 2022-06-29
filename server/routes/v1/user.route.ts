import { Router } from "express";
import { getConnectionsByDaysController, getUserInfoController } from "../../controllers/user.controller";
import { authenticationGuard } from "../../middleware/authentication.guard";

const router = Router();

router.get("/:username/info", authenticationGuard, getUserInfoController);

router.get("/connections-by-days", authenticationGuard, getConnectionsByDaysController);

export default router;
