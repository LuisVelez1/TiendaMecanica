import express from "express";
import deleteController from "../../controllers/User/delete-controller";
import validateTokenMiddleware from "../../middleware/validateTokenMiddelware";
const router = express.Router();

router.delete('/', validateTokenMiddleware, deleteController);

export default router;