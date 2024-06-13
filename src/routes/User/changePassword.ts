import express from 'express';
import changePasswordController from '../../controllers/User/updatePassword-controller';
import validateTokenMiddelware from '../../middleware/validateTokenMiddelware';
import { changePasswordValidator, handleValidation } from '../../middleware/User/changePasswordMiddleware';

const router = express.Router();

router.put('/', changePasswordValidator, handleValidation, validateTokenMiddelware, changePasswordController);

export default router;
