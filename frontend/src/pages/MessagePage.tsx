import { chatService } from '@/redux/features/chat/chat.api';
import { IMessage } from '@/redux/features/chat/chat.types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MessagePage = () => {
    const {chatId} = useParams();
    const [messages, setMessages] = useState<IMessage[]>([]);
    useEffect(() => {
        if (chatId) {
          chatService.getMessagesByChatId(chatId).then(setMessages).catch((error) => console.error('Error fetching messages:', error));
        }
    }, [chatId]);

    return (
        <div>
            {messages.map((message) => (
                <div key={message._id}>
                    <p>{message.text}</p>
                    <small>{message.createdAt?.toLocaleString()}</small>
                </div>
            ))}

        </div>
    );
};

export default MessagePage;