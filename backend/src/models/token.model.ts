import { model, Schema } from "mongoose";
import { User } from "./user.model";
import { IToken } from "../interface/token.intrrface";


const tokenSchema =new Schema({
accessToken:{type:String},
refreshToken:{type:String},
_userId:{type:Schema.Types.ObjectId,required:true,ref:User}
},{
    timestamps:true,
    versionKey:false
})

export const Token = model<IToken>("tokens",tokenSchema)