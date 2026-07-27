import { INews } from "../interface/news.interface";


class NewsPresenter{
 toPubblicResDto(entity:INews){
    return{
        id:entity._id,
        title:entity.title,
        content:entity.content,
        shortDescription:entity.shortDescription,
        newsImage:entity.newsImage ? `${process.env.MINIO_PUBLIC_URL}/photos/${entity.newsImage}` : null,
        placeId:entity.placeId,
        author:entity.author,
        tags:entity.tags
    }
 }
}
export const newsPresenter = new NewsPresenter();

