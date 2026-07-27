import { Router } from "express";


import { newsController } from "../controller/news.controller";
import { authMiddleware } from "../middlewares/auth.middleware";


const router = Router()
router.get('/',newsController.getAllNews);
router.get('/:newsId',newsController.getNewsById)
router.post('/:newsId/uploadImage',authMiddleware.checkAccessToken,newsController.uploadNewsImage);


export const newsRouter = router; 