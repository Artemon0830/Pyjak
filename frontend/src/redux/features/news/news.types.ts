export interface INews {
  _id: string;
  title: string;
  content: string;
  shortDescription?: string;
 newsImage?: string;
  placeId:string;
  author: string;
  tags:string[]
}

export interface ICreateAndUpdateNewsDto{
  title:string,
  content:string,
  shortDescription?: string;
  tags:string[]
}