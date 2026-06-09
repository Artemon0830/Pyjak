import { axiosInstanse } from "@/app/axios";
import { ICreateChatPayload, IMessage } from "./chat.types";
interface IChat {
    _id: string;
    userId: string;
    placeId: string;
    managerId?: string;
    lastMessage?: string;
    lastMessageTime?: string;
}
export const chatService = {
  getMyChats: async(): Promise<IChat[]> => {
    const response = await axiosInstanse.get('/chats/me');
    return response.data;
  },
  createChat: async (placeId:string, dto:ICreateChatPayload): Promise<IMessage> => {
    const response = await axiosInstanse.post<IMessage>(`/chats/places/${placeId}/messages`, dto);
    return response.data;
  },
  sendMessage: async (chatId:string, dto:ICreateChatPayload): Promise<IChat> => {
    const response = await axiosInstanse.post(`/chats/${chatId}/messages`, dto);
    return response.data;
        },
  getMessagesByChatId: async (chatId:string): Promise<IMessage[]> => {
    const response = await axiosInstanse.get<IMessage[]>(`/chats/${chatId}/messages`);
    return response.data;
  },      
   


}

// router.get('/me',authMiddleware.checkAccessToken,chatController.getMeChatList);
//router.put('/messages/:messageId',authMiddleware.checkAccessToken,chatController.updateMessage);
//router.delete('/messages/:messageId',authMiddleware.checkAccessToken,chatController.deleteMessage);
//router.post('/places/:placeId/messages',authMiddleware.checkAccessToken,chatController.sendMessage);
//router.post('/:chatId/messages',authMiddleware.checkAccessToken,chatController.sendMessageManager);
//router.get('/:chatId/messages',authMiddleware.checkAccessToken,chatController.getMessagesByChatId);
//router.get('/:chatId',authMiddleware.checkAccessToken,chatController.getChatById);
//router.delete('/:chatId',authMiddleware.checkAccessToken,chatController.deleteChat);//*