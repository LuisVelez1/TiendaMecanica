import express from 'express';
import changePasswordController from '../../controllers/User/updatePassword-controller';
import validateTokenMiddelware from '../../middleware/validateTokenMiddelware';

const router = express.Router();

router.put('/', validateTokenMiddelware, changePasswordController);

export default router;
  