import { Request,Response,NextFunction } from "express";
import { ITokenPayload } from "../interface/token.intrrface";
import { chatService } from "../services/chat.service";
import { ICreateChatPayload } from "../interface/chat.interface";


class ChatController {
  async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = res.locals.jwtPayload as ITokenPayload;
      const placeId = req.params.placeId as string;
      const dto = req.body as ICreateChatPayload;

      if (!dto.text) {
        return res.status(400).json({ message: "Text is required" });
      }

      const message = await chatService.sendMessage(jwtPayload, placeId, dto);

      res.status(201).json(message);
    } catch (e) {
      next(e);
    }
  }
  async sendMessageManager(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = res.locals.jwtPayload as ITokenPayload;
      const chatId = req.params.chatId as string;
      const dto = req.body as ICreateChatPayload;
      if (!dto.text) {
        return res.status(400).json({ message: "Text is required" });
      }
      const result = await chatService.sendMessageManager(jwtPayload, chatId, dto);

      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
  async updateMessage(req: Request, res: Response, next: NextFunction) {
    try {
        const jwtPayload = res.locals.jwtPayload as ITokenPayload;
        const messageId = req.params.messageId as string;
        const dto = req.body as ICreateChatPayload;
        if (!dto.text) {
        throw new Error("Text is required");
       }
        const result = await chatService.updateMessage(messageId,jwtPayload,dto)
        res.json(result)

    }catch (e) {
        next(e);
    }
}
async deleteMessage(req: Request, res: Response, next: NextFunction) {
  try {
  const jwtPayload = res.locals.jwtPayload as ITokenPayload;
  const messageId = req.params.messageId as string;
 const result = await chatService.deleteMessage(messageId,jwtPayload)
 res.json({
    result,
    message: "Message deleted successfully",
 })
  } catch (e) {
    next(e);
  }}

  deleteChat(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = res.locals.jwtPayload as ITokenPayload;
      const chatId = req.params.chatId as string;
      const result = chatService.deleteChat(jwtPayload, chatId);
      res.json({
        result,
        message: "Chat deleted successfully",
      });
    } catch (e) {
      next(e);
    }
  }

  async getMeChatList(req: Request, res: Response, next: NextFunction) {
    try {
        const jwtPayload = res.locals.jwtPayload as ITokenPayload;
        const result = await chatService.getMeChatList(jwtPayload)
        res.json(result)

    }
        catch (e) {
        next(e);
        }
  }
  async getChatById(req: Request, res: Response, next: NextFunction) {
    try {

      const chatId = req.params.chatId as string;
      const result = await chatService.getChatById(chatId);
      res.json(result);
      
    } catch (e) {
      next(e);
    }
  }
  async getMessagesByChatId(req: Request, res: Response, next: NextFunction) {
    try{
        const jwtPayload = res.locals.jwtPayload as ITokenPayload;
        const chatId = req.params.chatId as string;
        const messages = await chatService.getMessagesByPlaceId(jwtPayload,chatId)
        res.json(messages)
    }catch(e){
        next(e)
    }
  }
}

export const chatController = new ChatController();
