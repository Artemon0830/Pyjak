import ChatComponent from '@/components/ChatComponent';
import { chatService } from '@/redux/features/chat/chat.api';
import { IChat } from '@/redux/features/chat/chat.types';
import { placeService } from '@/redux/features/places/places.api';
import { IPlace } from '@/redux/features/places/places.types';
import React, { useEffect, useState } from 'react';




const ChatsPage = () => {
    
    const [chats, setChats] = useState<IChat[]>([]);
    const [places, setPlaces] = useState<IPlace[]>([]); // Assuming you have a way to fetch places

    useEffect(() => {
        placeService.getAll().then((data) => setPlaces(data)); // Fetch places if needed

        chatService.getMyChats()
            .then((data) => setChats(data))
            .catch((error) => console.error('Error fetching chats:', error));
    }, []);

    return (
        <div>
    
        <ChatComponent chats={chats} places={places} />  
        </div>
    );
};

export default ChatsPage;
