import { Types } from "mongoose";


export interface INews {
  _id: string;
  title: string;
  content: string;
  shortDescription?: string;
  newsImage?: string;
  placeId: Types.ObjectId;
  author: Types.ObjectId;
  tags:string[]
}

export interface ICreateAndUpdateNewsDto{
  title:string,
  content:string,
  shortDescription?: string;
  tags:string[]
}