import CreateNewsFormComponent from '@/components/news/CreateNewsFormComponent';
import React from 'react';
import { useParams } from 'react-router-dom';

const CreateNewsPage = () => {
    const {placeId}=useParams()
    return (
        <div>
         <CreateNewsFormComponent placeId={placeId} />   
        </div>
    );
};

export default CreateNewsPage;