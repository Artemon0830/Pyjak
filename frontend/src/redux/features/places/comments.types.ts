export interface IComment{
    _id:string;
    _placeId:string;
    _userId:string;
    text:string;
    rating:number
    сreatedAt:string;
    updatedAt:string;
}
export interface ICreateComment{
    text:string;
    rating:number
}

export interface IUpdateComment{
    text:string;
    rating:number
}