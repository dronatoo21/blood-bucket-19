import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
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
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import EditDonation from "../Pages/DonorRoutes/EditDonation";
import Blogs from "../Pages/Home/Blogs/Blogs";
import AddBlog from "../Pages/AdminRoutes/AddBlog";
import EditBlog from "../Pages/AdminRoutes/EditBlog";
import SearchPage from "../Pages/Home/SearchPage/SearchPage";
  
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      errorElement: <ErrorPage/>,
      children: [
        {
            path: '/',
            element: <Home/>
        },
        {
          path: '/blogs',
          element: <Blogs/>,
          loader: () => fetch('http://localhost:4000/blogs')
        },
        {
          path: '/searchPage',
          element: <SearchPage/>,
          loader: () => fetch('http://localhost:4000/users')
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
    // Dashboard
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard/></PrivateRoute>,
      errorElement: <ErrorPage/>,
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
          path: 'editDonation/:id',
          element: <EditDonation/>,
          loader: ({params}) => fetch(`http://localhost:4000/donations/${params.id}`)
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
        },
        {
          path: 'addBlog',
          element: <AddBlog/>
        },
        {
          path: 'editBlog/:id',
          element: <EditBlog/>,
          loader: ({params}) => fetch(`http://localhost:4000/blogs/${params.id}`)
        }
      ]
    }
  ]);