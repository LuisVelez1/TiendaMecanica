import express from 'express';
import getAllByClientController from '../../controllers/Product/getAllByClient-controller';
import validateToken from '../../middleware/validateTokenMiddelware';

const router = express.Router();

router.post('/:idProduct', validateToken, getAllByClientController);

export default router;