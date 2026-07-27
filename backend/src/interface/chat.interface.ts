
import { Types } from "mongoose";

export interface IChat {
    _id: string;
    userId: Types.ObjectId;
    placeId: Types.ObjectId;
    managerId?: Types.ObjectId;
    lastMessage?: string;
    lastMessageTime?: Date;
}


export interface ICreateChatPayload {
    text: string;
}