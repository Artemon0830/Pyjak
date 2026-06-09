import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { commentActions } from '@/redux/features/places/comments.slice';
import React, { FC, useEffect } from 'react';
interface IProps{
    placeId:string;
}
const CommentsComponent: FC<IProps> = ({ placeId }) => {
    const { comments } = useAppSelector((state) => state.commentSlice);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(commentActions.getCommentsByPlace(placeId));
    }, [dispatch, placeId]);

    return (
        <div>
                <h2>Comments</h2>
            {comments.length === 0 ? (
                <p>No comments yet.</p>
            ) : (
                comments
                 .slice()
                 .sort(
                (a, b) =>
                new Date(b.сreatedAt).getTime() -
                new Date(a.сreatedAt).getTime()
                 )
                 .map((comment) => (
                 <div key={comment._id}>
                 <p>{comment.text}</p>
                 </div>
                 )))
                 }
        </div>
    );
};

export default CommentsComponent;