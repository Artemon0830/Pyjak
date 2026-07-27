import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { placeActions } from "@/redux/features/places/places.slice";
import { useEffect} from "react";
import { useSearchParams } from "react-router-dom";


const MyPlacePage = () => {
    const dispatch=useAppDispatch()
       const {places}=useAppSelector(state=>state.placeSlice)
     const [searchParams, setSearchParams] =
        useSearchParams()
       const status = searchParams.get('status')||''  
       useEffect(()=>{
         if(!status) return
         dispatch(placeActions.loadMePlaces(status))
      
       },[dispatch,status])
       const onSubmitHandler=(status:string)=>{
         setSearchParams({status:status})
       }    
       const emptyMessage = {
       pending: 'На жаль, у вас немає закладів на перевірці',
       approved: 'У вас немає опублікованих закладів',
       rejected: 'У вас немає закладів, що потребують виправлення',
       }[status];
    return (
        <div>
         {!status && <p>Оберіть статус для фільтрації</p>}
           <button onClick={()=>{onSubmitHandler('pending')}}>На перевірці</button>
           <button onClick={()=>{onSubmitHandler('approved')}}>Опубліковано</button>
           <button onClick={()=>{onSubmitHandler('rejected')}}>Потребує виправлення</button>
         {status && places.length === 0 && (
         <p>
          {emptyMessage} 
         </p>
         )}

        {status &&
        places.map(place => (
        <div key={place._id}>
        {place._id}
        {place.status}
        </div>
        ))}
        </div>
    );
};

export default MyPlacePage;