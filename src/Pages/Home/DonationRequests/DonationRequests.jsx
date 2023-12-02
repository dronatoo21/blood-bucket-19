import { useEffect, useState } from "react";
import { FaCubes } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";

const DonationRequests = () => {
    const [pendingRequests, setPendingRequests] = useState()
    const donations = useLoaderData()
    useEffect(()=>{
        const filteredDonations = donations?.filter((donation) => donation.donationStatus.toLowerCase().includes("pending"))
        setPendingRequests(filteredDonations)
    },[donations])
    console.log(pendingRequests);
    return (
        <div>
            <h1 className="font-bold text-3xl text-center mt-14 mb-2">Donation requests</h1> 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-20">
                {
                pendingRequests?.map(request => 
                <div key={request?._id}>
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h1><FaCubes className="text-4xl"/></h1>
                    <h2 className="card-title font-semibold">Requester Name: {request?.requesterName}</h2>
                    <p className="font-normal"><span className="font-semibold">Location:</span> {request?.district}, {request?.upazila}</p>
                    <p className="font-normal"><span className="font-semibold">Donation Date:</span> {request?.donationDate}</p>
                    <p className="font-normal"><span className="font-semibold">Donation Time:</span> {request?.donationTime}</p>
                    <div className="card-actions justify-end">
                      <Link to={`/donationRequestDetail/${request?._id}`}><button className="btn bg-gradient-to-r from-[#0a3d62] to bg-[#b33939] text-white">View</button></Link>
                    </div>
                  </div>
                </div>
            </div>)
            }
            </div>
        </div>
    );
};

export default DonationRequests;