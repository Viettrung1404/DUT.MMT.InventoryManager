import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { ValidateMiddleware } from "../middlewares/validate.middleware.js";
import { VerifyMiddleware } from "../middlewares/verify.middleware.js";


const router = Router();

router.post('/register', 
  ValidateMiddleware.validateCreateUser,
  authController.registerUser);
  
router.post('/login',
  ValidateMiddleware.validateCreateUser,
  authController.loginUser);

router.get('/me', 
  VerifyMiddleware.validateToken,
  authController.getMe);

export default router;