import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import UseAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaPen, FaPrescriptionBottle, FaSlidersH } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

const MyDonationRequests = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = UseAxiosSecure()
    const [searchedDonations, setSearchedDonations] = useState()
    const {data: donations = [], refetch} = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations?requesterEmail=${user?.email}`)
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

        const handleCancel = donation => {
          axiosSecure.patch(`/donations/${donation._id}`)
          .then(res => {
            console.log(res.data);
              if(res.data.modifiedCount > 0){
                  refetch()
                  Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: `Cancelled request`,
                      showConfirmButton: false,
                      timer: 1500 
                  })
              }
          })
      }

        const handleDone = donation => {
          axiosSecure.patch(`/myDonations/${donation._id}`)
          .then(res => {
            console.log(res.data);
              if(res.data.modifiedCount > 0){
                  refetch()
                  Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: `Request completed`,
                      showConfirmButton: false,
                      timer: 1500 
                  })
              }
          })
      }
        const handleDelete = donation => {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
            axiosSecure.delete(`/myDonations/${donation._id}`)
            .then(res => {
                console.log(res);
                if(res.data.deletedCount > 0){
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            })
            }
          });
      }
    return (
        <div>
            <div className="mx-5">
            <h1 className="font-bold text-3xl text-center my-10 mb-2">All Donations</h1>
            { searchedDonations && 
              <>
                <div className="dropdown dropdown-bottom">
                  <div tabIndex={0} role="button" className="btn m-1 bg-gradient-to-r from-[#0a3d62] to bg-[#b33939] text-white"><FaSlidersH/>Filter</div>
                  <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><button onClick={() => filterDonation("pending")} className="btn btn-outline">Pending</button></li>
                    <li><button onClick={() => filterDonation("inprogress")} className="btn btn-outline my-2">Inprogress</button></li>
                    <li><button onClick={() => filterDonation("done")} className="btn btn-outline">Done</button></li>
                    <li><button onClick={() => filterDonation("cancelled")} className="btn btn-outline mt-2">Cancelled</button></li>
                    <li><button onClick={() => filterDonation("")} className="btn btn-outline mt-2">All</button></li>
                  </ul>
                </div>
                <div className="overflow-x-auto">
                <div className="overflow-x-auto lg:w-[1200px] md:w-[750px] w-[375px]">
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
                        <th></th>
                        <th></th>
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
                            {
                              donation?.donationStatus === 'inprogress' ? 
                              <td>
                                <div>
                                    <div>{donation?.donorName}</div>
                                    <div>{donation?.donorEmail}</div>
                                </div>
                              </td> : <td>N/A</td>
                            }
                            {
                              donation?.donationStatus === 'inprogress' ?
                              <td><button onClick={()=>handleCancel(donation)} className="btn">Cancel</button></td> : <td></td>
                            }
                            {
                              donation?.donationStatus === 'inprogress' ?
                              <td><button onClick={()=>handleDone(donation)} className="btn">Done</button></td> : <td></td>
                            }
                            <td><Link to={`/donationRequestDetail/${donation?._id}`}><button className="btn">View</button></Link></td>
                            <td><Link to={`/dashboard/editDonation/${donation?._id}`}><button className="btn text-blue-800"><FaPen/></button></Link></td>
                            <td><button onClick={()=>handleDelete(donation)} className="btn text-red-700"><FaPrescriptionBottle/></button></td>
                          </tr>
                          )
                      }
                    </tbody>                
                  </table>
                </div>
                </div>
              </>
            }
        </div>
        </div>
    );
};

export default MyDonationRequests;