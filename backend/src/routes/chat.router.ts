import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { chatController } from "../controller/chat.controller";


const router = Router();
router.get('/me',authMiddleware.checkAccessToken,chatController.getMeChatList);
router.put('/messages/:messageId',authMiddleware.checkAccessToken,chatController.updateMessage);
router.delete('/messages/:messageId',authMiddleware.checkAccessToken,chatController.deleteMessage);
router.post('/places/:placeId/messages',authMiddleware.checkAccessToken,chatController.sendMessage);
router.post('/:chatId/messages',authMiddleware.checkAccessToken,chatController.sendMessageManager);
router.get('/:chatId/messages',authMiddleware.checkAccessToken,chatController.getMessagesByChatId);
router.get('/:chatId',authMiddleware.checkAccessToken,chatController.getChatById);
router.delete('/:chatId',authMiddleware.checkAccessToken,chatController.deleteChat);


export const chatRouter = router;
