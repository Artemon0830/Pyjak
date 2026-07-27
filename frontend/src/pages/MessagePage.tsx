
import CreateMessage2 from '@/components/CreateMessage2';
import MessageComponent from '@/components/MessageComponent';
import { chatService } from '@/redux/features/chat/chat.api';
import {IMessage } from '@/redux/features/chat/chat.types';
import { userService } from '@/redux/features/users/users.api';
import { IUser } from '@/redux/features/users/users.types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MessagePage = () => {
    const { chatId } = useParams();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [currentUserId, setCurrentUserId] = useState<IUser['_id']>('');
    useEffect(() => {
        userService.getMe()
            .then((user) => setCurrentUserId(user._id));
        chatService.getMessagesByChatId(chatId!)
            .then((data) => setMessages(data));
    }, [chatId]);
    const clickMessages = (message: IMessage) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    }
    return (
        <div>
            <MessageComponent messages={messages} currentUserId={currentUserId} />
            <CreateMessage2 chatId={chatId!} clickMessages={clickMessages}/>
        </div>
    );
};

export default MessagePage;