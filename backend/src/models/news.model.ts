import { model, Schema } from "mongoose";
import { INews } from "../interface/news.interface";

const newsSchema = new Schema<INews>({
  title:{type:String,required:true},
  content:{type:String,required:true},
  shortDescription:{type:String,required:true},
  newsImage:{type:String,required:false},
  placeId:{type:Schema.Types.ObjectId,required:true,ref:"Place"},
  author:{type:Schema.Types.ObjectId,required:true,ref:"User"},
  tags: [
      {
        type: String,default:[]
      }
    ]
},

  {timestamps:true,
    versionKey:false
  }
   
)

export const News = model<INews>("News",newsSchema)