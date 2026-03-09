import { Router } from "express";
import { container } from "tsyringe";
import { adaptRoute } from "../../adaptors/ExpressAdaptor";
import { RoomController } from "../../http/controllers/RoomController";
import { protect } from "../middleware/AuthMiddleware";


const router = Router();
const roomController = container.resolve(RoomController);

router.post("/rooms/create", protect, adaptRoute(roomController.create));
router.post("/rooms/join", protect, adaptRoute(roomController.join));
router.get("/rooms/user", protect, adaptRoute(roomController.myRooms));
router.get("/rooms/:roomId", protect, adaptRoute(roomController.details));

export default router;