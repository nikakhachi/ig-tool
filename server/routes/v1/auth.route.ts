import { Router } from "express";
import { registerInstagramUserController, signInController, validateUserController } from "../../controllers/auth.controller";
import { authenticationGuard } from "../../middleware/authentication.guard";

const router = Router();

router.get("/validate-user", authenticationGuard, validateUserController);

router.post("/sign-in", signInController);

router.post("/register-instagram-user", registerInstagramUserController);

export default router;
