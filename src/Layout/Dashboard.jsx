import { FaCube, FaHome, FaList, FaServicestack, FaThumbtack, FaUser, FaUsers, FaVial, FaWeightHanging } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const Dashboard = () => {
  const {user} = useContext(AuthContext)
  const [userData, setUserData] = useState(null)
  const URL = `http://localhost:4000/users?email=${user?.email}`
  useEffect(()=>{
      fetch(URL)
      .then(res => res.json())
      .then(data => {
          setUserData(data[0])
      })
  },[URL])
    return (
        <div>
            <div className="drawer lg:drawer-open">
              <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content flex flex-col">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn bg-gradient-to-r from-[#0a3d62] to bg-[#b33939] drawer-button lg:hidden text-white"> <FaList/> Menu</label>
                <div className="">
                <Outlet></Outlet>
            </div>
              </div> 
              <div className="drawer-side min-h-screen">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-80 min-h-full bg-gradient-to-r from-[#0a3d62] to bg-[#b33939] text-white">
                  {/* Sidebar content here */}
                <div className="flex items-center mb-5">
                    <img className="w-9" src="https://i.ibb.co/SR7G805/bos.png" alt="logo"/>
                    <h1 className="text-lg md:text-2xl font-bold ml-2">Blood Bucket</h1>
                </div>
                  {
                    userData?.role === "admin" ? <>
                        <NavLink to="/dashboard/adminDashboardHome" className="px-5 py-2 rounded-md border-2 text-white flex items-center gap-2"><FaCube/>Dashboard Home</NavLink>
                        <NavLink style={({ isActive })=> ({background: isActive ? "#0a3d62" : "transparent",})} to="/dashboard/userProfile" className="px-5 py-2 rounded-md border-2 my-2 text-white flex items-center gap-2"><FaUser/> Your Profile</NavLink>
                        <NavLink style={({ isActive })=> ({background: isActive ? "#0a3d62" : "transparent",})} to="/dashboard/allUsers" className="px-5 py-2 rounded-md border-2 my-2 text-white flex items-center gap-2"><FaUsers/> All Users</NavLink>
                        <NavLink style={({ isActive })=> ({background: isActive ? "#0a3d62" : "transparent",})} to="/dashboard/allDonationReq" className="px-5 py-2 rounded-md border-2 my-2 text-white flex items-center gap-2"><FaWeightHanging/> All Donation Requests</NavLink>
                        <NavLink style={({ isActive })=> ({background: isActive ? "#0a3d62" : "transparent",})} to="/dashboard/contentManagement" className="px-5 py-2 rounded-md border-2 my-2 text-white flex items-center gap-2"><FaServicestack/> Manage Contents</NavLink>
                    </> : null
                  }
                  {
                    userData?.role === "donor" ? <>
                    <NavLink to="/dashboard/donorDashboardHome" className="px-5 py-2 rounded-md border-2 text-white flex items-center gap-2"><FaCube/>Dashboard Home</NavLink>
                        <NavLink style={({ isActive })=> ({background: isActive ? "#0a3d62" : "transparent",})} to="/dashboard/userProfile" className="px-5 py-2 rounded-md border-2 my-2 text-white flex items-center gap-2"><FaUser/> Your Profile</NavLink>
                        <NavLink style={({ isActive })=> ({background: isActive ? "#0a3d62" : "transparent",})} to="/dashboard/myDonationRequests" className="px-5 py-2 rounded-md border-2 my-2 text-white flex items-center gap-2"><FaThumbtack/> My donation requests</NavLink>
                        <NavLink style={({ isActive })=> ({background: isActive ? "#0a3d62" : "transparent",})} to="/dashboard/createDonationRequest" className="px-5 py-2 rounded-md border-2 my-2 text-white flex items-center gap-2"><FaVial/> Create donation request</NavLink>
                    </> : null
                  }
                  
                  <hr className="my-5 mx-5" />
                  <NavLink style={({ isActive })=> ({background: isActive ? "#0a3d62" : "transparent",})} to="/" className="px-5 py-2 rounded-md border-2 my-2 text-white flex items-center gap-2"><FaHome/> Home</NavLink>
                </ul>
              </div>
            </div>
        </div>
    );
};

export default Dashboard;