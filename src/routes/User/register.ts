import express from "express";
import registerController from "../../controllers/User/register-controller";
import {registerValidator, handleValidation} from "../../middleware/registerValidatorMiddleware";
const router = express.Router();

router.post('/',registerValidator, handleValidation, registerController);


export default router;