import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { FaHandHoldingMedical } from "react-icons/fa";

const BloodDonationDetail = () => {
    const {user} = useContext(AuthContext)
    const {id} = useParams()
    const [donation, setDonation] = useState()
    const idURL = `http://localhost:4000/donations/${id}`
    useEffect(() => {
        fetch(idURL)
        .then(res => res.json())
        .then(data => {
            setDonation(data)
        })
    }, [idURL])

    const handleConfirm = donation => {
        const donationInfo = {
            donorName: user?.displayName,
            donorEmail: user?.email,
            donationStatus: "inprogress",
        }
        fetch(`http://localhost:4000/donorC/donations/${donation?._id}`, {
                method: 'PATCH',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify(donationInfo)
                })
                .then(res => res.json())
                .then(data =>{
                  console.log(data);
                  if(data.modifiedCount > 0){
                    Swal.fire({
                      title: 'Success',
                      text: 'Confirmed Donation successfully',
                      icon: 'success',
                      confirmButtonText: 'Okay'
                    })
                  }
                })
                console.log(donation);
    }

    return (
        <div className="px-4">
            <h1 className="font-bold text-3xl text-center my-10 mb-2">Request details!</h1>
            <div className="card bg-base-100 shadow-xl mb-5">
              <div className="card-body">
                <h1><FaHandHoldingMedical className="text-4xl"/></h1>
                <h2 className="card-title"><span className="font-semibold">Requester Name: </span>{donation?.requesterName}</h2>
                <p><span className="font-semibold">Requester Email: </span>{donation?.requesterEmail}</p>
                <p><span className="font-semibold">Recipient Name: </span>{donation?.recipientName}</p>
                <p><span className="font-semibold">Full Address: </span>{donation?.fullAddress}</p>
                <p><span className="font-semibold">District: </span>{donation?.district}</p>
                <p><span className="font-semibold">Upazila: </span>{donation?.upazila}</p>
                <p><span className="font-semibold">Hospital Name: </span>{donation?.hospitalName}</p>
                <p><span className="font-semibold">Donation Date: </span>{donation?.donationDate}</p>
                <p><span className="font-semibold">Donation Time: </span>{donation?.donationTime}</p>
                <p><span className="font-semibold">Blood Group: </span>{donation?.bloodGroup}</p>
                <p><span className="font-semibold">Status: </span>{donation?.donationStatus}</p>
                <div className="card-actions">
                  <button className="btn my-4 bg-gradient-to-r from-[#0a3d62] to bg-[#b33939] text-white" onClick={()=>document.getElementById('my_modal_2').showModal()}>View</button>
                  <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                    <h1 className="text-center font-semibold mb-5">Please Confirm!</h1>
                      <div>
                          <div className="grid grid-cols-1 md:grid-cols-2">
                              <div className="gap-5 grid grid-cols-1 lg:grid-cols-2 mb-5">
                                  <div>
                                    <label className="label">
                                      <span className="label-text">Donor name</span>
                                    </label>
                                    <input type="text" defaultValue={user?.displayName} name="donorName" className="input input-bordered" required readOnly/>
                                  </div>
                                </div>
                              <div className="gap-5 grid grid-cols-1 lg:grid-cols-2">
                                  <div>
                                    <label className="label">
                                      <span className="label-text">Donor Email</span>
                                    </label>
                                    <input type="text" defaultValue={user?.email} name="donorEmail" className="input input-bordered" required readOnly/>
                                  </div>
                              </div>
                          </div>
                          <div className="text-center">
                              <button onClick={() => handleConfirm(donation)} className="btn my-4 bg-gradient-to-r from-[#0a3d62] to bg-[#b33939] text-white">Please Confirm</button>
                          </div>
                      </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </div>
              </div>
            </div>
        </div>
    );
};

export default BloodDonationDetail;

