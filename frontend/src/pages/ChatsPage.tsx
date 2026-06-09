import { chatService } from '@/redux/features/chat/chat.api';
import React, { useEffect, useState } from 'react';

interface IChat {
    _id: string;
    userId: string;
    placeId: string;
    managerId?: string;
    lastMessage?: string;
    lastMessageTime?: string;
}
const ChatsPage = () => {
    const [chats, setChats] = useState<IChat[]>([]);

    useEffect(() => {
    chatService.getMyChats()
      .then((data) => setChats(data))
      .catch((error) => console.error('Error fetching chats:', error));
    }, []);

    return (
        <div>
         
           {chats.map(chat => (
            <div key={chat._id}>
                <h3>Chat with {chat.userId === chat.managerId ? 'Manager' : 'User'}</h3>
                {chat.lastMessage && <p>Last message: {chat.lastMessage}</p>}
                {chat.lastMessageTime && <p>Last message time: {new Date(chat.lastMessageTime).toLocaleString()}</p>}
                {chat.placeId && <p>Place ID: {chat.placeId}</p>}
             
            </div>
           ))}
        </div>
    );
};

export default ChatsPage;