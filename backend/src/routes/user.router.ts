import { Router } from "express";
import { userController } from "../controller/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { RoleEnum } from "../enums/role.enum";
import { newsController } from "../controller/news.controller";

const router = Router()
router.get('/',userController.getUsersList);
router.get('/me',authMiddleware.checkAccessToken,userController.getMe);
router.put('/me',authMiddleware.checkAccessToken,userController.updateMe)
router.delete('/me',authMiddleware.checkAccessToken,userController.deleteMe);
router.post('/me/avatar',authMiddleware.checkAccessToken,userController.uploadAvatar)
router.delete('/me/avatar',authMiddleware.checkAccessToken,userController.deleteAvatar)
router.get('/me/favorites',authMiddleware.checkAccessToken,userController.getFavorites)
router.get('/me/news',authMiddleware.checkAccessToken,roleMiddleware.checkRole(RoleEnum.MANAGER),newsController.getMeAllNews)
router.get('/me/news/:newsId',authMiddleware.checkAccessToken,roleMiddleware.checkRole(RoleEnum.MANAGER),newsController.getMeNew)
router.put('/me/news/:newsId',authMiddleware.checkAccessToken,roleMiddleware.checkRole(RoleEnum.MANAGER),newsController.updateMeNews)
router.delete('/me/news/:newsId',authMiddleware.checkAccessToken,roleMiddleware.checkRole(RoleEnum.MANAGER),newsController.deleteMeNews)
router.post('/me/favorites/:placeId',authMiddleware.checkAccessToken,userController.addToFavorite)
router.delete('/me/favorites/:placeId',authMiddleware.checkAccessToken,userController.removeFromFavorite)
router.get('/:userId',userController.getById); 

export const userRouter = router; 