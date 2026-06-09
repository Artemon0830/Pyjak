import { Router } from "express";
import { placeController } from "../controller/place.controller";
import { commentController } from "../controller/comment.controller";
import { authMiddleware } from "../middlewares/auth.middleware";


const router = Router();
router.post('/create',authMiddleware.checkAccessToken,placeController.create);
router.get('/allPlaces',placeController.getAllPlaces);
router.get('/search',placeController.getAllPlacesSearch);
router.get('/pending',placeController.getPlacesPending);
router.get('/me',authMiddleware.checkAccessToken,placeController.getAllPlacesMe);
router.get('/comments',commentController.getComments)
router.get('/user/:userId',placeController.getPlaceByUser);
router.get('/pending',placeController.getPlacesPending);
router.get('/:placeId',placeController.getPlace);
// router.post('/:userId',placeController.create);
router.put('/:placeId',authMiddleware.checkAccessToken,placeController.update)
router.delete('/:placeId',authMiddleware.checkAccessToken,placeController.delete);
router.post('/:placeId/uploadPhotos',authMiddleware.checkAccessToken,placeController.uploadPhotos);
router.post('/:placeId/comments',authMiddleware.checkAccessToken,commentController.create)
router.get('/:placeId/comments',commentController.getCommentsByPlace)
router.put('/:placeId/comments/:commentId',authMiddleware.checkAccessToken,commentController.update)
router.delete('/:placeId/comments/:commentId',authMiddleware.checkAccessToken,commentController.delete)

export const placeRouter = router
