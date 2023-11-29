import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Footer from "../Pages/Shared/Footer/Footer";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import Dashboard from "../Layout/Dashboard";
import UserProfile from "../Pages/Dashboard/UserProfile/UserProfile";
import UpdateUserProfile from "../Pages/Shared/UserProfileCard/UpdateUserProfile.jsx/UpdateUserProfile";
  
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: '/',
            element: <Home/>
        },
        {
          path: '/blog',
          element: <Footer/>  
        },
        {
          path: '/login',
          element: <Login/>
        },
        {
          path: '/registration',
          element: <Registration/>
        }
      ]
    },
    {
      path: 'dashboard',
      element: <Dashboard/>,
      children: [
        {
          path: 'userProfile',
          element: <UserProfile/>
        },
        {
          path: 'updateProfile',
          element: <UpdateUserProfile/>
        }
      ]
    }
  ]);