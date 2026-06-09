import { model, Schema } from "mongoose";
import { IComment } from "../interface/comment.interface";


const commentSchema = new Schema<IComment>(
{
    _placeId:{type:String,required:true,ref:"place"},
    _userId:{type:String,required:true,ref:"users"},
    text:{type:String},
    rating:{type:Number,min:1,max:5}
},
{
    timestamps: true,
    versionKey: false
  }
);
export const Comment = model<IComment>("comment",commentSchema) 