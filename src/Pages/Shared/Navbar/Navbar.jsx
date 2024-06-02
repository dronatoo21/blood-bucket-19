import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { toast } from "react-toastify";
import { FaList } from "react-icons/fa";
import logo from "../../../assets/logo/bos.png"

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
        {
          user ? <li onClick={handleLogout}><Link className="rounded-none lg:hidden text-black" >Logout</Link></li> : <li><NavLink className="rounded-none lg:hidden" style={({ isActive })=> ({borderBottom: isActive ? "2px solid white" : " ", background: "transparent",})} to="/login">Login</NavLink></li>
        }
    </>
    return (
        <div>
            <div className="navbar bg-gradient-to-r from-[#0a3d62] to bg-[#b33939] text-white md:py-8 py-4 px-5 md:px-10">
              <div className="navbar-start">
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="p-2 lg:hidden">
                    <FaList className="md:text-2xl text-lg"/>
                  </div>
                  <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 text-black shadow bg-base-100 rounded-box w-52">
                    {links}
                  </ul>
                </div>
                <div className="flex items-center">
                    <img className="w-7 md:w-11 lg:w-14" src={logo} alt="logo"/>
                    <h1 className="text-base md:text-2xl lg::text-3xl font-bold md:ml-1">Blood Bucket</h1>
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
                  <NavLink><button onClick={handleLogout} className="btn bg-[#0a3d62] border-none lg:flex hidden text-white mr-2">Logout</button></NavLink>
                  <label tabIndex={0} className="dropdown dropdown-end justify-center flex btn btn-sm lg:mx-2 text-white btn-circle avatar mb-4">
                      <img  tabIndex={0} role="button" className="rounded-full" src={user?.photoURL} alt="img" />
                        <ul tabIndex={0} className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-[260px] mt-[400px] text-black">
                          <div className="flex ml-5 mt-5 items-center gap-3">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <img className="rounded-full" src={user?.photoURL} alt="img" />
                            </label>  
                            <div>
                            <p className="text-base font-medium"><u>{userData?.role}</u></p>
                            <p className="font-bold">{user?.displayName}</p>
                            </div>
                          </div>
                          <div className="p-5 flex flex-col gap-3">
                            <p className="text-base text-start font-medium"><span className="font-bold">E-mail:<br/></span> {user?.email}</p>
                            <p className="text-base text-start font-medium"><span className="font-bold">Address:<br/></span> {userData?.district}, {userData?.upazila}</p>
                            <p className="text-base text-start font-medium"><span className="font-bold">Blood Group:<br/></span> {userData?.bloodGroup}</p>
                            <Link className="btn btn-outline w-full mt-2" to="/dashboard/userProfile">View</Link>
                          </div>
                        </ul>
                      <p className="text-sm text-center">{user?.displayName?.split(' ').pop()}</p>
                  </label>                 
                  </> : <NavLink to="/login"><button className="btn btn-sm md:btn-md">Login</button></NavLink>
                }
              </div>
            </div>
        </div>
    );
};

export default Navbar;