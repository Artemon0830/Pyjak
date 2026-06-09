import { Router } from "express";
import { userController } from "../controller/user.controller";
import { placeController } from "../controller/place.controller";
import { commentController } from "../controller/comment.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { RoleEnum } from "../enums/role.enum";
import { authController } from "../controller/auth.controller";

const router = Router();

// USERS
router.post('/users',authMiddleware.checkAccessToken,roleMiddleware.checkRole(RoleEnum.ADMIN), authController.signUp),
router.get('/users',authMiddleware.checkAccessToken,roleMiddleware.checkRole(RoleEnum.ADMIN), userController.getUsersList);
router.get('/users/:userId',authMiddleware.checkAccessToken,roleMiddleware.checkRole(RoleEnum.ADMIN),userController.getById);
router.put('/users/:userId', authMiddleware.checkAccessToken,roleMiddleware.checkRole(RoleEnum.ADMIN),userController.updateById);
router.delete('/users/:userId', authMiddleware.checkAccessToken,roleMiddleware.checkRole(RoleEnum.ADMIN),userController.deleteById);

// PLACES (СПОЧАТКУ конкретні!)
router.get('/places/pending',authMiddleware.checkAccessToken,roleMiddleware.checkRole(RoleEnum.ADMIN), placeController.getAllPending);
router.put('/places/:placeId/approve',authMiddleware.checkAccessToken,roleMiddleware.checkRole(RoleEnum.ADMIN), placeController.approve);
router.put('/places/:placeId/reject',authMiddleware.checkAccessToken,roleMiddleware.checkRole(RoleEnum.ADMIN), placeController.reject);

router.get('/places/comments', authMiddleware.checkAccessToken,roleMiddleware.checkRole(RoleEnum.ADMIN),commentController.getComments);
router.get('/places/user/:userId',authMiddleware.checkAccessToken,roleMiddleware.checkRole(RoleEnum.ADMIN) ,placeController.getPlaceByUser);

// ПОТІМ динамічні
router.get('/places/:placeId',authMiddleware.checkAccessToken,roleMiddleware.checkRole(RoleEnum.ADMIN), placeController.getPlace);

router.get('/places',authMiddleware.checkAccessToken,roleMiddleware.checkRole(RoleEnum.ADMIN), placeController.getAllPlaces);
router.post('/places/:userId',authMiddleware.checkAccessToken,roleMiddleware.checkRole(RoleEnum.ADMIN), placeController.create);
router.put('/places/:placeId/:userId',authMiddleware.checkAccessToken,roleMiddleware.checkRole(RoleEnum.ADMIN), placeController.update);
router.delete('/places/:placeId/:userId',authMiddleware.checkAccessToken,roleMiddleware.checkRole(RoleEnum.ADMIN), placeController.delete);

router.post('/places/:placeId/:userId/comments',authMiddleware.checkAccessToken,roleMiddleware.checkRole(RoleEnum.ADMIN), commentController.create);
router.get('/places/:placeId/comments',authMiddleware.checkAccessToken,roleMiddleware.checkRole(RoleEnum.ADMIN), commentController.getCommentsByPlace);

export const adminRouter = router; 