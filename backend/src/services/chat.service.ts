import { ApiError } from "../errors/api-errors";
import { IMessage } from "../interface/message.interface";
import { IChat, ICreateChatPayload } from "../interface/chat.interface";
import { ITokenPayload } from "../interface/token.intrrface";
import { Chat } from "../models/chat.model";
import { chatRepository } from "../repositories/chat.repository";
import { messageRepository } from "../repositories/message.repository";
import { placeRepository } from "../repositories/place.repository";
import { userRepository } from "../repositories/user.repository";

import { isUserIdExistOrThrow } from "../utils/validator";

class ChatService{
    async getMeChatList(jwtPayload:ITokenPayload):Promise<IChat[] | null>{
        const user = await userRepository.getById(jwtPayload.userId)
        if(!user){ 
            throw new ApiError('User not found',404)
        }
        return await chatRepository.findByUserId(user._id);
    }

 async getChatById(chatId: string): Promise<IChat | null> {

  const chat = await chatRepository.getChatById(chatId);
  if (!chat) {
    throw new ApiError('Chat not found', 404);
  }
  return chat;
 }  
async sendMessage(jwtPayload:ITokenPayload,placeId:string, dto:ICreateChatPayload):Promise<IMessage>{
 const chat = await this.createChat(jwtPayload,placeId)

    const message = await messageRepository.create(chat._id,jwtPayload.userId,dto.text)

  await Chat.findByIdAndUpdate(chat._id, {
    lastMessage: dto.text,
    lastMessageAt: new Date()
  });
 
    return message  
    
}
async sendMessageManager(jwtPayload:ITokenPayload,chatId:string,dto:ICreateChatPayload):Promise<IMessage>{

    const message = await messageRepository.create(chatId,jwtPayload.userId,dto.text)

  await Chat.findByIdAndUpdate(message.chatId, {
    lastMessage: dto.text,
    lastMessageAt: new Date()
  });
 
    return message  
    
}

async createChat(jwtPayload:ITokenPayload,placeId:string):Promise<IChat | null>{
    const user = await userRepository.getById(jwtPayload.userId);
    if(!user){
        throw new ApiError('User not found',404)
    }
    const place = await placeRepository.getPlace(placeId)
    if(!place){
        throw new ApiError('Place not found',404)
    }
    let chat = await chatRepository.findByUserAndPlace(user._id, place._id);
    if(!chat){
    await chatRepository.createChat(user._id,place._id,place._userId)}
    return chat;
}

async updateMessage(messageId:string,jwtPayload:ITokenPayload, dto:ICreateChatPayload):Promise<IMessage>{
    const user = await isUserIdExistOrThrow(jwtPayload.userId)
   const message = await messageRepository.updateMessage(messageId,user._id,dto.text)
    return message
}

async deleteMessage(messageId:string,jwtPayload:ITokenPayload):Promise<boolean>{
  const user = await isUserIdExistOrThrow(jwtPayload.userId);
  const message = await messageRepository.deleteMessage(messageId,user._id)
  return message
}

async deleteChat(jwtPayload:ITokenPayload,chatId:string):Promise<void>{
  const user = await isUserIdExistOrThrow(jwtPayload.userId);
  const chat = await chatRepository.getChatById(chatId)
  if(!chat){
    throw new ApiError('Chat not found',404)
  }
  await chatRepository.deleteChat(chatId,user._id)

}

async getMessagesByPlaceId(
  jwtPayload: ITokenPayload,
  chatId: string
): Promise<IMessage[]> {

  const user = await userRepository.getById(jwtPayload.userId);
  if (!user) {
    throw new ApiError('User not found', 404);
  }

  const chat = await chatRepository.getChatById(chatId);

  if (!chat) {
    throw new ApiError('Chat not found', 404);
  }

  if (
    chat.userId.toString() !== user._id.toString() &&
    chat.managerId.toString() !== user._id.toString()
  ) {
    throw new ApiError('Forbidden', 403);
  }

  await messageRepository.updateReadBy(chat._id, user._id);

  const messages = await messageRepository.getMessagesByChatId(chat._id);

return messages;
}




}
export const chatService = new ChatService();