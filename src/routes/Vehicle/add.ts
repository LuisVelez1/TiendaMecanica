import express from "express";
import registerController from '../../controllers/Vehicle/add-controller';
import validateToken from "../../middleware/validateTokenMiddelware";

const router = express.Router();


router.post('/', validateToken, registerController);

export default router;


