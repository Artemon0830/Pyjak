
import { IMessage } from "../interface/message.interface";
import { Message } from "../models/message.model";
import { chatRepository } from "./chat.repository";

class MessageRepository {
async create(chatId:string|null,senderId:string,text:string):Promise<IMessage| null>{
    return await Message.create({chatId,senderId,text,readBy:[senderId]}) 
}
async updateReadBy(chatId: string, userId: string): Promise<void> {
  await Message.updateMany(
    {
      chatId,
      readBy: { $ne: userId } 
    },
    {
      $addToSet: { readBy: userId } 
    }
  );
}
async getMessagesByChatId(chatId:string):Promise<IMessage[]>{
    return await Message.find({chatId}).sort({createdAt:1})
}
async updateMessage(
  messageId: string,
  userId: string,
  text: string
): Promise<IMessage | null> {
  const message = await Message.findOneAndUpdate(
    { _id: messageId, senderId: userId },
    { text },
    { new: true }
  );

  if (!message) return null;

  const lastMessage = await Message.findOne({ chatId: message.chatId })
    .sort({ createdAt: -1 });

  if (lastMessage && lastMessage._id.toString() === messageId) {
    await chatRepository.updateLastMessage(
      message.chatId.toString(),
      { lastMessage: text, lastMessageTime: new Date() }
    );
  }

  return message;
}
async deleteMessage(
  messageId: string,
  userId: string
): Promise<boolean> {
  const message = await Message.findOneAndDelete({
    _id: messageId,
    senderId: userId
  });

  if (!message) return false;

  // знайти актуальне останнє повідомлення
  const lastMessage = await Message.findOne({
    chatId: message.chatId
  }).sort({ createdAt: -1 });

  if (lastMessage) {
    await chatRepository.updateLastMessage(
      message.chatId.toString(),
      {
        lastMessage: lastMessage.text,
        lastMessageTime: new Date(lastMessage.createdAt)
      }
    );
  } else {
    // якщо чат пустий
    await chatRepository.updateLastMessage(
      message.chatId.toString(),
      {
        lastMessage: "",
        lastMessageTime: new Date(0)
      }
    );
  }

  return true;
}
}



export const messageRepository = new MessageRepository();