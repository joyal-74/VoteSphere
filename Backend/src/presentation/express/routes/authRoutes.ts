import { Router } from "express";
import { container } from "tsyringe";
import { AuthController } from "../../http/controllers/AuthController.js";
import { adaptRoute } from "../../adaptors/ExpressAdaptor.js";
import { protect } from "../middleware/AuthMiddleware.js";


const router = Router();
const authController = container.resolve(AuthController);

router.post("/login", adaptRoute(authController.login));
router.post("/signup", adaptRoute(authController.signup));
router.get("/me", protect, adaptRoute(authController.findUser));
router.post('/refresh', adaptRoute(authController.refresh));
router.post('/logout', protect, adaptRoute(authController.logout));

export default router;