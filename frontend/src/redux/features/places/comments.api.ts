import { axiosInstanse } from "@/app/axios";
import { IComment, ICreateComment } from "./comments.types";

export const commentService = {
  create: async (placeId: string, comment: ICreateComment): Promise<IComment> => {
    const response = await axiosInstanse.post(`/places/${placeId}/comments`, comment); 
    return response.data;
  },
  getCommentsByPlace: async (placeId: string): Promise<IComment[]> => {
    const response = await axiosInstanse.get(`/places/${placeId}/comments`);
    return response.data;
  },
  update: async (placeId: string, commentId: string, comment: ICreateComment): Promise<IComment> => {
    const response = await axiosInstanse.put(`/places/${placeId}/comments/${commentId}`, comment);
    return response.data;
  },
  delete: async (placeId: string, commentId: string): Promise<void> => {
    await axiosInstanse.delete(`/places/${placeId}/comments/${commentId}`);
  } 
}