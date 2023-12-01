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
import PrivateRoute from "./privateRoute";
import DonorDashboard from "../Pages/Dashboard/DonorDashboard/DonorDashboard";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard/AdminDashboard";
import AllDonationReq from "../Pages/AdminRoutes/AllDonationReq";
import Allusers from "../Pages/AdminRoutes/Allusers";
import ContentManagement from "../Pages/AdminRoutes/contentManagement";
import MyDonationRequests from "../Pages/DonorRoutes/MyDonationRequests";
import CreateDonationRequest from "../Pages/DonorRoutes/CreateDonationRequest";
import DonationRequests from "../Pages/Home/DonationRequests/DonationRequests";
import BloodDonationDetail from "../Pages/Home/BloodDonationDetail/BloodDonationDetail";
  
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
        },
        {
          path: '/donationRequests',
          element: <DonationRequests/>,
          loader: () => fetch('http://localhost:4000/donations')
        },
        {
          path: '/donationRequestDetail/:id',
          element: <PrivateRoute><BloodDonationDetail/></PrivateRoute>,
          loader: ({params}) => fetch(`http://localhost:4000/donations/${params.id}`)
        }
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard/></PrivateRoute>,
      children: [
        {
          path: 'userProfile',
          element: <UserProfile/>
        },
        {
          path: 'updateProfile',
          element: <UpdateUserProfile/>
        },
        {
          path: 'donorDashboardHome',
          element: <DonorDashboard/>
        },
        {
          path: 'myDonationRequests',
          element: <MyDonationRequests/>
        },
        {
          path: 'createDonationRequest',
          element: <CreateDonationRequest/>
        },
        {
          path: 'adminDashboardHome',
          element: <AdminDashboard/>,
          loader: () => fetch('http://localhost:4000/users')
        },
        {
          path: 'allDonationReq',
          element: <AllDonationReq/>
        },
        {
          path: 'allUsers',
          element: <Allusers/>
        },
        {
          path: 'contentManagement',
          element: <ContentManagement/>
        }
      ]
    }
  ]);