import { useEffect, useState } from "react";
import UseDistricts from "../../../Hooks/UseDistricts";
import UseUpazilas from "../../../Hooks/UseUpazilas";
import { useLoaderData } from "react-router-dom";

const SearchPage = () => {
    const users = useLoaderData()
    const [searchedDonors, setSearchedDonors] = useState()
    const [allDonors, setAllDonors] = useState()
    const [districts] = UseDistricts();
    const [upazilas] = UseUpazilas();
    const [bloodGroup, setBloodGroup] = useState('A+');
    const [district, setDistrict] = useState('Dhaka');
    const [upazila, setUpazila] = useState('Shahjadpur');
    useEffect(()=>{
        const donors = users?.filter((user) =>
        user?.role.toLowerCase().includes('donor'))
        setAllDonors(donors)
    },[users])
    const handleSearch = e => {
        e.preventDefault()
        const donorDistrict = district;
        const donorUpazila = upazila;
        const donorBloodGroup = bloodGroup;
        const donorEmail = e.target.email.value
        const filteredDonors = allDonors?.filter(donor => {
            const emailInclude =  donor?.email.toLowerCase().includes(donorEmail.toLowerCase());
            const bloodInclude = donorBloodGroup ? donor?.bloodGroup.toLowerCase().includes(donorBloodGroup.toLowerCase()) : true;
            const districtInclude = donorDistrict ? donor?.district.toLowerCase().includes(donorDistrict.toLowerCase()) : true;
            const upazilaInclude = donorUpazila ? donor?.upazila.toLowerCase().includes(donorUpazila.toLowerCase()) : true;
            return emailInclude && bloodInclude && districtInclude && upazilaInclude
        })
        setSearchedDonors(filteredDonors);
    }
    return (
        <>
            <div>
            <div className="hero">
            <div className="hero-content flex-col py-5">
              <div className="text-center">
              <h1 className="font-bold text-3xl text-center my-5">Please Search!</h1>
              </div>
                  <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                    <form onSubmit={handleSearch} className="card-body">
                      <div className="gap-5 grid grid-cols-1 lg:grid-cols-2">
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">District</span>
                            </label>
                              <select value={district} onChange={e => setDistrict(e.target.value)} name="district" className="input input-bordered" >
                                  {
                                      districts?.map(district => <option key={district?.id}>{district?.name}</option>)
                                  }
                              </select>
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Blood Group</span>
                            </label>
                              <select value={bloodGroup} onChange={e => setBloodGroup(e.target.value)} name="bloodGroup" className="input input-bordered" >
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
                              <select value={upazila} onChange={e => setUpazila(e.target.value)} name="upazila" className="input input-bordered">
                                  {
                                      upazilas?.map(upazila => <option key={upazila?.id}>{upazila?.name}</option>)
                                  }
                              </select>
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Donor E-mail</span>
                            </label>
                            <input type="email" name="email" placeholder="example@gmail.com" className="input input-bordered" required/>
                          </div>
                      </div>
                      <div className="form-control mt-4">
                        <button type="submit" className="btn bg-gradient-to-r from-[#0a3d62] to bg-[#b33939] text-white">Search</button>
                      </div>
                    </form>
                  </div>
              </div>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
        {
            searchedDonors?.map(donor => 
                <div key={donor?._id} className="card bg-base-100 shadow-xl border-x-[#0a3d62] border-y-[#b33939] border">
                <div className="card-body">
                <div className="flex items-center gap-3">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <img className="rounded-full" src={donor?.avater} alt="img" />
                        </label>  
                        <div>
                        <p className="text-base font-medium"><u>{donor?.role}</u></p>
                        <p className="font-bold">{donor?.name}</p>
                        </div>
                </div>
                  <h2 className="card-title">Blood Group: {donor?.bloodGroup}</h2>
                  <p><span className="font-semibold">District:</span> {donor?.district}</p>
                  <p><span className="font-semibold">Upazila:</span> {donor?.upazila}</p>
                </div>
              </div>)
        }
        </div>
        </>
    );
};

export default SearchPage;