import { chatService } from '@/redux/features/chat/chat.api';
import { ICreateChatPayload } from '@/redux/features/chat/chat.types';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
interface IProps {
    placeId: string;
}
const CreateMessage:FC<IProps> = ({ placeId }) => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<ICreateChatPayload>();
    const onSubmit = async (data: ICreateChatPayload) => {
        try {
            const chat = await chatService.createChat(placeId, data);
            console.log('Chat created:', chat);
            navigate(`/chats/${chat.chatId}/messages`);
        } catch (error) {
            console.error('Error creating chat:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <textarea {...register('text')} placeholder='Message text' required />
                <button type='submit'>Send Message</button>
            </form>
        </div>
    );
};

export default CreateMessage;