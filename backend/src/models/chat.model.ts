import { model, Schema } from "mongoose";

import { IChat } from "../interface/chat.interface";



const chatSchema =new Schema({
userId:{type:Schema.Types.ObjectId,required:true,ref:"User"},
placeId:{type:Schema.Types.ObjectId,required:true,ref:"Place"},
managerId:{type:Schema.Types.ObjectId,ref:"User"},
lastMessage:{type:String},
lastMessageTime:{type:Date}

},{
    timestamps:true,
    versionKey:false
})
chatSchema.index({ userId: 1, placeId: 1 }, { unique: true });
export const Chat = model<IChat>("Chat",chatSchema)