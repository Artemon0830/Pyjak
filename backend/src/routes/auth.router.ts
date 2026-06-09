import { Router } from "express";
import { authController } from "../controller/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router()
router.post('/sign-up',authController.signUp);
router.post('/sign-up-manager',authController.signUpManager);
router.post('/sign-in',authController.signIn);
router.post('/refresh',authMiddleware.checkRefreshToken,authController.refreshToken)
router.post('/logout',authMiddleware.checkRefreshToken,authController.logout)


export const authRouter = router; 