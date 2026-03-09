import { Router } from "express";
import { container } from "tsyringe";
import { AuthController } from "../../http/controllers/AuthController";
import { adaptRoute } from "../../adaptors/ExpressAdaptor";
import { protect } from "../middleware/AuthMiddleware";


const router = Router();
const authController = container.resolve(AuthController);

router.post("/login", adaptRoute(authController.login));
router.post("/signup", adaptRoute(authController.signup));
router.get("/me", protect, adaptRoute(authController.findUser));
router.post('/refresh',  adaptRoute(authController.refresh));

export default router;