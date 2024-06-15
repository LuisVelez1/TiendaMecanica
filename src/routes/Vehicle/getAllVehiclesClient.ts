import express from "express";
import getAllVehiclesClientController from "../../controllers/Vehicle/getAllVehicles-controller";
import validateToken from "../../middleware/validateTokenMiddelware";

const router = express.Router();

router.get('/', validateToken, getAllVehiclesClientController);

export default router;