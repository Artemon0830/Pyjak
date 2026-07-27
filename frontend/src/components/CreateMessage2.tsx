import { chatService } from '@/redux/features/chat/chat.api';
import { ICreateMessage, IMessage } from '@/redux/features/chat/chat.types';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

interface IProps {
    chatId:string
    clickMessages:(message:IMessage)=>void
}


const CreateMessage2: FC<IProps> = ({ chatId,clickMessages }) => {
    const { register, handleSubmit} = useForm<ICreateMessage>();

    const onSubmit = async (data: ICreateMessage) => {
        try {
            
        const newMessage =await chatService.sendMessage(chatId, data);

        clickMessages(newMessage)


        } catch (error) {
            console.error('Error creating chat:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            
            < input {...register('text')} placeholder='Message text' required />
            <button type='submit'>Send Message</button>
        </form>
    );
};


export default CreateMessage2;