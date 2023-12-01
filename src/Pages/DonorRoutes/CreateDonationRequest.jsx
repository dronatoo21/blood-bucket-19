import { useContext, useState } from "react";
import UseDistricts from "../../Hooks/UseDistricts";
import UseUpazilas from "../../Hooks/UseUpazilas";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import UseUsers from "../../Hooks/UseUsers";
const CreateDonationRequest = () => {
    const {user} = useContext(AuthContext)
    const [districts] = UseDistricts();
    const [upazilas] = UseUpazilas();
    const [bloodGroup, setBloodGroup] = useState();
    const [district, setDistrict] = useState();
    const [upazila, setUpazila] = useState();
    const {userData} = UseUsers();
    const addRequest = e => { 
        e.preventDefault();
        const form = e.target;
        const requesterName = user?.displayName; 
        const requesterEmail = user?.email;
        const recipientName = form.recipientName.value; 
        const hospitalName = form.hospitalName.value;
        const fullAddress = form.fullAddress.value;
        const requestMessage = form.requestMessage.value;
        const donationDate = form.donationDate.value;
        const donationTime = form.donationTime.value;
        const donationStatus = "pending";
        const district = form.district.value;
        const upazila = form.upazila.value;
        const bloodGroup = form.bloodGroup.value;
        const donationReqData = {recipientName, requesterEmail, fullAddress, requesterName, hospitalName, requestMessage, donationDate,donationTime, donationStatus, district, upazila, bloodGroup};
        fetch('http://localhost:4000/donations', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(donationReqData)
        })
        .then(res => res.json())
        .then(data =>{
          console.log(data);
          if(data.insertedId){
            Swal.fire({
              title: 'Success',
              text: 'Request sent successfully',
              icon: 'success',
              confirmButtonText: 'Okay'
            })
          }
        })
    }
    return (
        <div>
            { userData?.status === 'active' ?
                <div className="hero">
                <div className="hero-content flex-col py-5">
                  <div className="text-center">
                  <h1 className="font-bold text-3xl text-center my-5">Please Register!</h1>
                  </div>
                      <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                        <form onSubmit={addRequest} className="card-body">
                          <div className="gap-5 grid grid-cols-1 lg:grid-cols-2">
                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text">Requester name</span>
                                </label>
                                <input type="text" defaultValue={user?.displayName} name="requesterName" className="input input-bordered" required readOnly/>
                              </div>
                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text">Recipient name</span>
                                </label>
                                <input type="text" placeholder="Recipient name" name="recipientName" className="input input-bordered" required/>
                              </div>
  
                              
                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text">Requester name</span>
                                </label>
                                <input type="email" defaultValue={user?.email} name="requesterEmail" className="input input-bordered" required readOnly/>
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
                                <input type="text" placeholder="Hospital name" name="hospitalName" className="input input-bordered" required/>
                              </div>
                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text">Full address </span>
                                </label>
                                <input type="text" placeholder="Full address " name="fullAddress" className="input input-bordered" required/>
                              </div>
                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text">Donation date</span>
                                </label>
                                <input type="date" name="donationDate" className="input input-bordered" required/>
                              </div>
                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text">Donation Time</span>
                                </label>
                                <input type="time" name="donationTime" className="input input-bordered" required/>
                              </div>
                          </div>
                          <div className="form-control">
                                <label className="label">
                                  <span className="label-text">Request Message</span>
                                </label>
                                <textarea type="text" placeholder="Type your message here" name="requestMessage" className="input input-bordered" required/>
                              </div>
                          <div className="form-control">
                            <button className="btn bg-gradient-to-r from-[#0a3d62] to bg-[#b33939] text-white">Send Request</button>
                          </div>
                        </form>
                      </div>
                  </div>
                </div> : 
                <div className="container w-11 my-36 mx-auto">
                <span className="loading loading-dots loading-lg"></span>
                </div>
            }    
            {
              userData?.status === 'blocked' && <div><h1 className="text-center my-10 text-lg font-semibold">Sorry you are blocked by the Admin.</h1></div>
            }
        </div>
    );
};

export default CreateDonationRequest;
