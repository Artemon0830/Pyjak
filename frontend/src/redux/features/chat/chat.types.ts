export interface IChat {
    _id:string;
    userId: string;
    placeId: string;
    managerId?: string;
    lastMessage?: string;
    lastMessageTime?: Date;
} 
export interface ICreateChatPayload {
    placeId: string;
    text: string;
}
export interface IMessage {
    _id?: string 
    chatId:string
    senderId: string 
    text: string
    readBy: string[]
    createdAt?: Date 
    updatedAt?: Date 
}