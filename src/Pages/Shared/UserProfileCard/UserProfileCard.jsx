import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import UseUsers from "../../../Hooks/UseUsers";
import { Link } from "react-router-dom";

const UserProfileCard = () => {
    const {user} = useContext(AuthContext)
    const {userData} = UseUsers();
    return (
        <div>
            <h1 className="font-bold text-xl mt-7 mb-5 md:text-2xl lg:text-3xl text-center">Your Profile</h1>
            <div className="card m-5 bg-base-100 shadow-xl">
            <div className="flex ml-5 mt-5 items-center gap-3">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <img className="rounded-full" src={user?.photoURL} alt="img" />
                        </label>  
                        <div>
                        <p className="text-base font-medium"><u>{userData?.role}</u></p>
                        <p className="font-bold">{user?.displayName}</p>
                        </div>
                </div>
              <div className="card-body">
                <p className="text-base font-medium"><span className="font-bold">E-mail:</span> {user?.email}</p>
                <p className="text-base font-medium"><span className="font-bold">Address:</span> {userData?.district}, {userData?.upazila}</p>
                <p className="text-base font-medium"><span className="font-bold">Blood Group:</span> {userData?.bloodGroup}</p>
                <div className="card-actions w-full">
                  <Link to="/dashboard/updateProfile"><button className="btn w-full bg-gradient-to-r from-[#0a3d62] to bg-[#b33939] text-white mt-6">Update Your Profile</button></Link>
                </div>
              </div>
            </div>
        </div>
    );
};

export default UserProfileCard;