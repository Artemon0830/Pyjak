
import ChatPage from "@/pages/ChatsPage";
import CreatePlacePage from "@/pages/CreatePlacePage";
import FavoritesPage from "@/pages/FavoritesPage";
import MainLayout from "@/pages/MainLayout";
import MessagePage from "@/pages/MessagePage";
import PlacePage from "@/pages/PlacePage";
import PlacesPage from "@/pages/PlacesPage";
import ProfilePage from "@/pages/ProfilePage";
import RegisterPage from "@/pages/RegisterPage";
import SearchPage from "@/pages/SearchPage";
import SignInPage from "@/pages/SignInPage";
import SignUpManagerPage from "@/pages/SignUpManagerPage";
import SignUpPage from "@/pages/SignUpPage";
import UserPage from "@/pages/UserPage";
import UsersPage from "@/pages/UsersPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {path:'/',element:<MainLayout/>,children:[
    {path:'users',element:<UsersPage/>},
    {path:'users/:userId',element:<UserPage/>},
    {path:'places',element:<PlacesPage/>},
    {path:'places/:placeId',element:<PlacePage/>},
    {path:'places/comments/:placeId',element:<PlacePage/>},
    {path:'places/create',element:<CreatePlacePage/>},
    {path:'auth/register',element:<RegisterPage/>},
    {path:'auth/sign-in',element:<SignInPage/>},
    {path:'auth/sign-up',element:<SignUpPage/>},
    {path:'auth/sign-up-manager',element:<SignUpManagerPage/>},
    {path:'favorites',element:<FavoritesPage/>},
    {path:'profile',element:<ProfilePage/>},
    {path:'search',element:<SearchPage/>},
    {path:'mychat',element:<ChatPage/>},
    {path:'chats/:chatId/messages',element:<MessagePage/>}
  

  ]}  
])