import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { toast } from "react-toastify";
import { FaList } from "react-icons/fa";

const Navbar = () => {
    const {user, logOut} = useContext(AuthContext)
    const handleLogout = () => {
      logOut()
      .then(()=>{
        toast('Successfully logged out')
      })
      .then(error => console.log(error))
    }
    const [userData, setUserData] = useState(null)
    const URL = `https://blood-bucket-server-phi.vercel.app/users?email=${user?.email}`
    useEffect(()=>{
        fetch(URL)
        .then(res => res.json())
        .then(data => {
            setUserData(data[0])
        })
    },[URL])
    const links = <>
        <li><NavLink className="rounded-none" style={({ isActive })=> ({borderBottom: isActive ? "2px solid white" : " ", background: "transparent",})} to="/">Home</NavLink></li>
        <li><NavLink className="rounded-none" style={({ isActive })=> ({borderBottom: isActive ? "2px solid white" : " ", background: "transparent",})} to="/donationRequests">Donation Request</NavLink></li>
        <li><NavLink className="rounded-none" style={({ isActive })=> ({borderBottom: isActive ? "2px solid white" : " ", background: "transparent",})} to="/blogs">Blog</NavLink></li>
        <li><NavLink className="rounded-none" style={({ isActive })=> ({borderBottom: isActive ? "2px solid white" : " ", background: "transparent",})} to="/registration">Registration</NavLink></li>
        {
          userData?.role === "admin" || userData?.role === "volunteer" ? <li><NavLink className="rounded-none" style={({ isActive })=> ({borderBottom: isActive ? "2px solid white" : " ", background: "transparent",})} to="/dashboard/adminDashboardHome">Dashboard</NavLink></li> : <li><NavLink className="rounded-none" style={({ isActive })=> ({borderBottom: isActive ? "2px solid white" : " ", background: "transparent",})} to="/dashboard/donorDashboardHome">Dashboard</NavLink></li>
        }
        <li><NavLink className="rounded-none" style={({ isActive })=> ({borderBottom: isActive ? "2px solid white" : " ", background: "transparent",})} to="/fundings">Fundings</NavLink></li>
    </>
    return (
        <div>
            <div className="navbar bg-gradient-to-r from-[#0a3d62] to bg-[#b33939] text-white py-8 md:px-10">
              <div className="navbar-start">
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <FaList className="text-2xl"/>
                  </div>
                  <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 text-black shadow bg-base-100 rounded-box w-52">
                    {links}
                  </ul>
                </div>
                <div className="flex items-center">
                    <img className="w-14" src="https://i.ibb.co/SR7G805/bos.png" alt="logo"/>
                    <h1 className="text-lg md:text-3xl font-bold ml-2">Blood Bucket</h1>
                </div>
              </div>
              <div className="navbar-end">
              <div className="hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                  {links}
                </ul>
              </div>
                {
                  user ? <>
                  <NavLink><button onClick={handleLogout} className="btn bg-[#0a3d62] border-none text-white mr-2">Logout</button></NavLink>
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                      <img className="rounded-full" src={user?.photoURL} alt="img" />
                      <p className="w-16">{user?.displayName}</p>
                  </label>                 
                  </> : <NavLink to="/login"><button className="btn">Login</button></NavLink>
                }
              </div>
            </div>
        </div>
    );
};

export default Navbar;