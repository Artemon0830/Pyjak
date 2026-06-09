const baseUrl = 'http://localhost/api';

const urls = {
    users: {
    base:'/users',
    me:'users/me',
    favorites:'users/me/favorites',
    favoritesById:(placeId:string)=>urls.users.favorites + `/${placeId}`,
    avatar:'users/me/avatar',
    byId:(id:string)=>urls.users.base + `/${id}`,
},
    places: {
    base:'/places',
    allPlaces:'/places/allPlaces',
    search:'/places/search',
    byId:(id:string)=>urls.places.base + `/${id}`,
},
   auth:{
    base:'/auth',
    signIn:'/auth/sign-in',
    signUp:'/auth/sign-up',
    signUpManager:'/auth/sign-up-manager',
    refreshToken:'/auth/refresh-token',
    logout:'/auth/logout'
   }

}
export {baseUrl,urls}
