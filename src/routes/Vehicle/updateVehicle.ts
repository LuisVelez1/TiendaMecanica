import express from 'express';
import updateController from '../../controllers/Vehicle/update-controller';
import validateToken from '../../middleware/validateTokenMiddelware';

const router = express.Router();

router.put('/:idVehicle', validateToken, updateController);

export default router;