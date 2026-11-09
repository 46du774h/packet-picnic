import { Router } from "express";
import {
	googleLogin,
	getCurrentUser,
	updateCurrentUser,
	deleteCurrentUser,
} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import { googleLoginSchema } from "../schemas/user.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/google").post(validate(googleLoginSchema), googleLogin);
router.route("/me").get(authMiddleware, getCurrentUser);
router.route("/me").patch(authMiddleware, updateCurrentUser);
router.route("/me").delete(authMiddleware, deleteCurrentUser);

export default router;