import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FaHandHoldingUsd, FaUser, FaVial } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import useAllDonationReq from "../../../Hooks/useAllDonationReq";
const AdminDashboard = () => {
    const {user} = useContext(AuthContext)
    const donations = useAllDonationReq();
    const users = useLoaderData()
    return (
        <div>
            <h1 className="font-bold text-3xl text-center mt-14 mb-2">Hello! <span className="text-[#b33939]">{user?.displayName}</span>, Welcome to the Dashboard!</h1>          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
                <div className="bg-base-100 flex items-center py-5 px-10 shadow-xl rounded-xl border-x-[#0a3d62] border-y-[#b33939] border">
                      <div className="w-3/12">
                        <FaUser className="text-2xl text-center"/>
                      </div>
                      <div className="">
                        <h2 className="card-title">Total Users</h2>
                        <p>{users?.length}</p>
                      </div>
                </div>
                <div className="bg-base-100 flex items-center py-5 px-10 shadow-xl rounded-xl border-x-[#0a3d62] border-y-[#b33939] border">
                      <div className="w-3/12">
                        <FaHandHoldingUsd className="text-2xl text-center"/>
                      </div>
                      <div className="">
                        <h2 className="card-title">Total Fundings</h2>
                        <p>{users?.length}</p>
                      </div>
                </div>
                <div className="bg-base-100 flex items-center py-5 px-10 shadow-xl rounded-xl border-y-[#0a3d62] border-x-[#b33939] border">
                      <div className="w-3/12">
                        <FaVial className="text-2xl text-center"/>
                      </div>
                      <div className="">
                        <h2 className="card-title">Total Blood Donation Request</h2>
                        <p>{donations?.length}</p>
                      </div>
                </div>
                
            </div>
        </div>
    );
};

export default AdminDashboard;