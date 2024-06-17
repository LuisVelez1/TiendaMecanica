import express from 'express';
import showAllController from '../../controllers/Product/showProductsClient-controller';
import validateToken from '../../middleware/validateTokenMiddelware';

const router = express.Router();

router.get('/', validateToken, showAllController);

export default router;