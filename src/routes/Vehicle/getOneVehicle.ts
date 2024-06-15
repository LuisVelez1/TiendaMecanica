import express from 'express';
import getOneVehicleController from '../../controllers/Vehicle/getOneVehicle-controller';
import validateToken from '../../middleware/validateTokenMiddelware';

const router = express.Router();

router.get('/:idVehicle', validateToken, getOneVehicleController);

export default router;