import Swal from "sweetalert2";
import UseDistricts from "../../Hooks/UseDistricts";
import UseUpazilas from "../../Hooks/UseUpazilas";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const EditDonation = () => {
    const [districts] = UseDistricts();
    const donation = useLoaderData();
    const [upazilas] = UseUpazilas();
    const [bloodGroup, setBloodGroup] = useState(donation?.bloodGroup);
    const [district, setDistrict] = useState(donation?.district);
    const [upazila, setUpazila] = useState(donation?.upazila);
    const addRequest = e => { 
        e.preventDefault();
        const form = e.target;
        const requesterName = donation?.requesterName; 
        const requesterEmail = donation?.requesterEmail;
        const recipientName = form.recipientName.value; 
        const hospitalName = form.hospitalName.value;
        const fullAddress = form.fullAddress.value;
        const requestMessage = form.requestMessage.value;
        const donationDate = form.donationDate.value;
        const donationTime = form.donationTime.value;
        const donationStatus = donation?.donationStatus;
        const district = form.district.value;
        const upazila = form.upazila.value;
        const bloodGroup = form.bloodGroup.value;
        const donationReqData = {recipientName, requesterEmail, fullAddress, requesterName, hospitalName, requestMessage, donationDate,donationTime, donationStatus, district, upazila, bloodGroup};
        console.log(donationReqData);
        fetch(`https://blood-bucket-server-phi.vercel.app/myDonation/${donation?._id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(donationReqData)
        })
        .then(res => res.json())
        .then(data =>{
          console.log(data);
          if(data.modifiedCount > 0){
            Swal.fire({
              title: 'Success',
              text: 'Request Updated successfully',
              icon: 'success',
              confirmButtonText: 'Okay'
            })
          }
        })
    }
    return (
        <div>
            <div className="hero">
            <div className="hero-content flex-col py-5">
              <div className="text-center">
              <h1 className="font-bold text-3xl text-center my-5">Please Update!</h1>
              </div>
                  <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                    <form onSubmit={addRequest} className="card-body">
                      <div className="gap-5 grid grid-cols-1 lg:grid-cols-2">
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Requester name</span>
                            </label>
                            <input type="text" defaultValue={donation?.requesterName} name="requesterName" className="input input-bordered" required readOnly/>
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Recipient name</span>
                            </label>
                            <input type="text" defaultValue={donation?.recipientName} name="recipientName" className="input input-bordered" required/>
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Requester name</span>
                            </label>
                            <input type="email" defaultValue={donation?.requesterEmail} name="requesterEmail" className="input input-bordered" required readOnly/>
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">District</span>
                            </label>
                              <select value={district} onChange={e => setDistrict(e.target.value)} name="district" className="input input-bordered" required>
                                  {
                                      districts?.map(district => <option key={district?.id}>{district?.name}</option>)
                                  }
                              </select>
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Blood Group</span>
                            </label>
                              <select value={bloodGroup} onChange={e => setBloodGroup(e.target.value)} name="bloodGroup" className="input input-bordered" required>
                                  <option>A+</option>
                                  <option>A-</option>
                                  <option>B+</option>
                                  <option>B-</option>
                                  <option>AB+</option>
                                  <option>AB-</option>
                                  <option>O+</option>
                                  <option>O-</option>
                              </select>
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Upazila</span>
                            </label>
                              <select value={upazila} onChange={e => setUpazila(e.target.value)} name="upazila" className="input input-bordered" required>
                                  {
                                      upazilas?.map(upazila => <option key={upazila?.id}>{upazila?.name}</option>)
                                  }
                              </select>
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">hospital name</span>
                            </label>
                            <input type="text" defaultValue={donation?.hospitalName} name="hospitalName" className="input input-bordered" required/>
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Full address </span>
                            </label>
                            <input type="text" defaultValue={donation?.fullAddress} name="fullAddress" className="input input-bordered" required/>
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Donation date</span>
                            </label>
                            <input type="date" name="donationDate" defaultValue={donation?.date} className="input input-bordered" required/>
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Donation Time</span>
                            </label>
                            <input type="time" name="donationTime" defaultValue={donation?.donationTime} className="input input-bordered" required/>
                          </div>
                      </div>
                      <div className="form-control">
                            <label className="label">
                              <span className="label-text">Request Message</span>
                            </label>
                            <textarea type="text" defaultValue={donation?.requestMessage} placeholder="Type your message here" name="requestMessage" className="input input-bordered" required/>
                          </div>
                      <div className="form-control">
                        <button className="btn bg-gradient-to-r from-[#0a3d62] to bg-[#b33939] text-white">Update Donation Request</button>
                      </div>
                    </form>
                  </div>
              </div>
            </div> : 
            <div className="container w-11 my-36 mx-auto">
            <span className="loading loading-dots loading-lg"></span>
            </div>
        </div>
    );
};

export default EditDonation;