import { model, Schema } from "mongoose";
import { IMessage } from "../interface/message.interface";

const messageSchema = new Schema({
  chatId: { type: Schema.Types.ObjectId, ref: 'chats', required: true },
  senderId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  text: { type: String, required: true },
  readBy: [{ type: Schema.Types.ObjectId, ref: 'users' }]
}, { timestamps: true });

messageSchema.index({ chatId: 1, createdAt: 1 }); 
export const Message = model<IMessage>("Message", messageSchema);  