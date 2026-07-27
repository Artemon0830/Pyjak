import { useAppDispatch } from '@/app/hooks';

import { newsActions } from '@/redux/features/news/news.slice';
import { ICreateAndUpdateNewsDto } from '@/redux/features/news/news.types';
import React, { FC, useState} from 'react';
import { useForm } from 'react-hook-form';
import UploadPhotosNewsComponent from './UploadImageNewsComponent';

interface IProps{
    placeId:string | undefined;
}
const CreateNewsFormComponent:FC<IProps> = ({placeId}) => {

  const dispatch = useAppDispatch()
    const [successMessage, setSuccessMessage] = useState('')
        const [step,setStep]=useState(1)
        const [newsId, setNewsId] = useState<string | null>(null)
    const{handleSubmit,register}=useForm<ICreateAndUpdateNewsDto>();

    const clickHandler= async(formData:ICreateAndUpdateNewsDto)=>{
        if(placeId){
            const news = await dispatch(newsActions.createNews({ placeId, data: formData })).unwrap()
            setNewsId(news._id)
            setSuccessMessage('News created successfully!')
            setStep(2)
        }
    }

    return (
       <div className='sign-in'>
            <div className='sign-in-form'>
            {step === 1 &&(
            <form onSubmit={handleSubmit(clickHandler)} >
             <label>Title</label>
             <div className='input-box'>
                <input type='text'placeholder='New Summer Menu'{...register('title',{required:true})}/>
                </div>
             <label>Content</label>
             <div className='input-box'>   
             <input type='text'placeholder='New summer menu with fresh seasonal dishes'{...register('content',{required:true})}/>
             </div>
             <label>shortDescription</label>
             <div className='input-box'>   
             <input type='text'placeholder='Fresh seasonal dishes are now available'{...register('shortDescription',{required:true})}/>
             </div>
             <label>tags</label>
             <div className='input-box'>
             <input type='text' part='food, menu, summer'{...register('tags')}/>
                </div>
             <button type='submit'>Create News</button>
             {successMessage && (
                        <p>{successMessage}</p>
                    )}

            </form>
            )}
            {step === 2 && newsId && (
                <UploadPhotosNewsComponent
                    newsId={newsId}
                />
            )}
            Step {step} / 2
        </div>
         </div>
    );
};

export default CreateNewsFormComponent;