import { ICreateAndUpdateNewsDto, INews } from "../interface/news.interface";
import { News } from "../models/news.model";

class NewsRepository{
 async create(author:string,placeId:string,dto:ICreateAndUpdateNewsDto):Promise<INews>{
    const createNews = await News.create({author:author,placeId:placeId,...dto})
    return createNews
 }
   async update(
   newsId: string,
   userId: string | undefined,
   dto: Partial<INews>
 ): Promise<INews | null> {
   return await News.findOneAndUpdate(
     { _id: newsId, author: userId },
     dto,
     { new: true }
   )
 }
 async getAllNews():Promise<INews[]>{
    return await News.find({})
 }
  async getAllMeNews(author:string):Promise<INews[]>{
    return await News.find({author:author})
 }
  async getMeNews(author:string,newsId:string):Promise<INews|null>{
    return await News.findOne({author:author,_id:newsId})
  }
    async getNewsById(newsId:string):Promise<INews|null>{
    return await News.findById(newsId)
  } 
   async updateMeNews(author:string,newsId:string,dto:Partial<INews>):Promise<INews>{
     return await News.findOneAndUpdate({author:author,_id:newsId},dto,{new:true})
   }
   
   async deleteMeNews(author:string,newsId:string):Promise<void>{
      return await News.findOneAndDelete({author:author,_id:newsId})
   }
   
  

}
export const newsRepository= new NewsRepository()