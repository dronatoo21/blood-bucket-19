import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Footer from "../Pages/Shared/Footer/Footer";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
  
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
  ]);