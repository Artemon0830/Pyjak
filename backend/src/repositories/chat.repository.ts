
import { ApiError } from "../errors/api-errors";
import { IChat } from "../interface/chat.interface";
import { Chat } from "../models/chat.model";

class ChatRepository { 
async createChat(userId:string | undefined,placeId:string,managerId:string):Promise<IChat | null>{
    return (await Chat.create({userId,placeId,managerId}))
}
async findByUserId(userId: string): Promise<IChat[]> {
    return Chat.find({
        $or: [{ managerId: userId }, { userId }]
    })
}
async findByUserAndPlace(userId:string | undefined,placeId:string):Promise<IChat | null>{
    return await Chat.findOne({$or: [{managerId: userId}, {userId: userId}], placeId })
}   
async getChatById(chatId:string):Promise<IChat | null>{
    return await Chat.findById(chatId)
}
async updateLastMessage(chatId:string,message:{lastMessage:string,lastMessageTime:Date}):Promise<IChat | null>{
    return await Chat.findByIdAndUpdate(chatId,message,{new:true})
}
async deleteChat(chatId: string, userId: string): Promise<void> {

  const chat = await Chat.findOneAndDelete({
    _id: chatId,
    $or: [
      { userId },
      { managerId: userId }
    ]
  });

  if (!chat) {
    throw new ApiError('Chat not found or access denied', 404);
  }
}
}

export const chatRepository = new ChatRepository(); 