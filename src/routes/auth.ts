import express from "express";
import authController from '../controllers/AuthController/auth-controller';
import { authValidator, handleValidation } from "../middleware/authValidatorMiddleware"; 

const router = express.Router();


router.post('/', authValidator, handleValidation, authController);

export default router;


