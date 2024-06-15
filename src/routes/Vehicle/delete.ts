import express from 'express';
import deleteVehicleController from '../../controllers/Vehicle/delete-controller';
import validateToken from '../../middleware/validateTokenMiddelware';

const router = express.Router();

router.delete('/:idVehicle', validateToken, deleteVehicleController);

export default router;