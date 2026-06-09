import { useAppDispatch } from '@/app/hooks';
import { commentActions } from '@/redux/features/places/comments.slice';
import { ICreateComment } from '@/redux/features/places/comments.types';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

 interface IProps{
    placeId:string;
}
const CreateCommenFormComponent:FC<IProps> = ({ placeId }) => {
    const { register, handleSubmit } = useForm<ICreateComment>();
    const dispatch = useAppDispatch();
    const handleCreateComment = (data: ICreateComment) => {
        dispatch(commentActions.createComment({placeId,commentData:data}));

    }

    return (
        <div>
            <h2>Create Comment</h2>
           <form onSubmit={handleSubmit(handleCreateComment)}>
  <div>
    <label>Your Comment:</label>
    <input
      id="text"
      {...register('text', { required: true })}
    />
  </div>

  <div>
    <label>Rating:</label>
    <input
      id="rating"
      type="number"
      min={1}
      max={5}
      {...register('rating', {
        required: true,
        valueAsNumber: true,
      })}
    />
  </div>

  <button type="submit">Create Comment</button>
</form>
            
        </div>
    );
};

export default CreateCommenFormComponent;