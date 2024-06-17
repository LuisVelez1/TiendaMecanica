import express from 'express';
import addProductController from '../../controllers/Product/add-controller';

const router = express.Router();

router.post('/', addProductController);

export default router;