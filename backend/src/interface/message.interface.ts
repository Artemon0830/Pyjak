import { Types } from "mongoose";
export interface IMessage {
    _id?: string 
    chatId:Types.ObjectId
    senderId: Types.ObjectId 
    text: string
    readBy: Types.ObjectId[]
    createdAt?: Date 
    updatedAt?: Date 
}