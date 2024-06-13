import express from 'express';
import getOneController from '../../controllers/User/profile-controller';
import validateTokenMiddelware from '../../middleware/validateTokenMiddelware';

const router = express.Router();

router.get('/', validateTokenMiddelware, getOneController);

export default router;