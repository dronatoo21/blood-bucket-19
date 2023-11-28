import { NavLink } from "react-router-dom";

const Navbar = () => {
    const links = <>
        <li><NavLink className="rounded-none" style={({ isActive })=> ({borderBottom: isActive ? "2px solid white" : " ", background: "transparent",})} to="/">Home</NavLink></li>
        <li><NavLink className="rounded-none" style={({ isActive })=> ({borderBottom: isActive ? "2px solid white" : " ", background: "transparent",})} to="/donationRequest">Donation Request</NavLink></li>
        <li><NavLink className="rounded-none" style={({ isActive })=> ({borderBottom: isActive ? "2px solid white" : " ", background: "transparent",})} to="/blog">Blog</NavLink></li>
        <li><NavLink className="rounded-none" style={({ isActive })=> ({borderBottom: isActive ? "2px solid white" : " ", background: "transparent",})} to="/registration">Registration</NavLink></li>
        <li><NavLink className="rounded-none" style={({ isActive })=> ({borderBottom: isActive ? "2px solid white" : " ", background: "transparent",})} to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink className="rounded-none" style={({ isActive })=> ({borderBottom: isActive ? "2px solid white" : " ", background: "transparent",})} to="/fundings">Fundings</NavLink></li>
    </>
    return (
        <div>
            <div className="navbar bg-gradient-to-r from-[#0a3d62] to bg-[#b33939] text-white py-5 md:px-10">
              <div className="navbar-start">
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
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
                <NavLink  style={({ isActive })=> ({background: isActive ? "#0a3d62" : "transparent", borderRadius: '10px'})} to='/login'><button className="btn">Login</button></NavLink>
              </div>
            </div>
        </div>
    );
};

export default Navbar;