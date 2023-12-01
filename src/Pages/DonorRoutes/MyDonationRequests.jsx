import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import UseAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaPen, FaPrescriptionBottle, FaSlidersH } from "react-icons/fa";

const MyDonationRequests = () => {
    const axiosSecure = UseAxiosSecure()
    const [searchedDonations, setSearchedDonations] = useState()
    const {data: donations = [], } = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const res = await axiosSecure.get('/donations')
            setSearchedDonations(res.data)
            return res.data;   
        }
    })

    const filterDonation = donationStatus => {
        const filteredDonations = donations?.filter((donation) =>
        donation.donationStatus.toLowerCase().includes(donationStatus)
            )
            setSearchedDonations(filteredDonations)
        };

    return (
        <div>
            <div className="mx-5">
            <h1 className="font-bold text-3xl text-center my-10 mb-2">All Donations</h1>
            <div className="dropdown dropdown-bottom">
              <div tabIndex={0} role="button" className="btn m-1 bg-gradient-to-r from-[#0a3d62] to bg-[#b33939] text-white"><FaSlidersH/>Filter</div>
              <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><button onClick={() => filterDonation("pending")} className="btn btn-outline">Pending</button></li>
                <li><button onClick={() => filterDonation("inprogress")} className="btn btn-outline my-2">Inprogress</button></li>
                <li><button onClick={() => filterDonation("done")} className="btn btn-outline">Done</button></li>
                <li><button onClick={() => filterDonation("canceled")} className="btn btn-outline mt-2">Canceled</button></li>
              </ul>
            </div>
            <div className="overflow-x-auto">
            <div className="overflow-x-auto lg:w-11/12 md:w-[750px] w-[375px]">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>
                      #
                    </th>
                    <th>Recipient Name</th>
                    <th>Recipient Location</th>
                    <th>Donation date</th>
                    <th>Donation Time</th>
                    <th>Donation Status</th>
                    <th>Donor Information</th>
                    <th>Details</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    searchedDonations?.map((donation, index) => <tr key={donation?._id}>
                        <th>
                            {index + 1}
                        </th>
                        <td>
                          <div className="flex items-center gap-3">
                            <div>
                              <div className="font-bold">{donation?.recipientName}</div>
                            </div>
                          </div>
                        </td>
                        <td>{donation?.district}, {donation?.upazila}</td>
                        <td>{donation?.donationDate}</td>
                        <td>{donation?.donationTime}</td>
                        <td>{donation?.donationStatus}</td>
                        <td>
                            <div>
                                <div>donor name</div>
                                <div>donor email</div>
                            </div>
                        </td>
                        <td><button className="btn">view</button></td>
                        <td><button className="btn text-blue-800"><FaPen/></button></td>
                        <td><button className="btn text-red-700"><FaPrescriptionBottle/></button></td>
                      </tr>
                      )
                  }
                </tbody>                
              </table>
            </div>
            </div>
        </div>
        </div>
    );
};

export default MyDonationRequests;