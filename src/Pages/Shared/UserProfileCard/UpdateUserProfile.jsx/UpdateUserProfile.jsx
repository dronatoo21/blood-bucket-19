import { useForm } from "react-hook-form";
import UseAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import UseDistricts from "../../../../Hooks/UseDistricts";
import UseUpazilas from "../../../../Hooks/UseUpazilas";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import { updateProfile } from "firebase/auth";

const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
const UpdateUserProfile = () => {
    const {user} = useContext(AuthContext)
    const [userData, setUserData] = useState('')
    const URL = `https://blood-bucket-server-phi.vercel.app/users?email=${user?.email}`
    useEffect(()=>{
        fetch(URL)
        .then(res => res.json())
        .then(data => {
            setUserData(data[0])
            console.log(data);
        })
    },[URL])
    console.log(userData);
    const { register, handleSubmit } = useForm({
        defaultValues: { email: user?.email, name: "" }
    })
    const axiosPublic = UseAxiosPublic()
    const [districts] = UseDistricts();
    const [upazilas] = UseUpazilas();
    const onSubmit = async (data) => {
        const imageFile = {image : data.image[0]}
        console.log(imageFile);
        const res = await axiosPublic.post(imageHostingApi, imageFile, {
            headers: {
                'content-type':'multipart/form-data'
            }
        })
        console.log(res.data);
        if(res.data.success){
            const userInfo = {
                email : userData.email,
                name: data.name,
                password: data.password,
                avater: res.data.data.display_url,
                bloodGroup: data.bloodGroup,
                district: data.district,
                upazila: data.upazila,
                status: 'active',
                role: 'donor'
            }
            fetch(`https://blood-bucket-server-phi.vercel.app/users/${userData?._id}`, {
                method: 'PUT',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify(userInfo)
                })
                .then(res => res.json())
                .then(data =>{
                  console.log(data);
                  if(data.modifiedCount > 0){
                    Swal.fire({
                      title: 'Success',
                      text: 'Profile updated successfully',
                      icon: 'success',
                      confirmButtonText: 'Okay'
                    })
                  }
                })
                updateProfile(user, {
                    displayName: data.name,
                    photoURL: res.data.data.display_url
                  })
                  .then(()=> {})
                  .catch(error=> console.error(error.message))
          }
}
    return (
        <div>
            <div className="hero ">
              <div className="hero-content flex-col py-5">
                <div className="text-center">
                <h1 className="font-bold text-3xl text-center my-5">Please Update!</h1>
                </div>
                    <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <label className="form-control w-full max-w-xs">
                              <div className="label">
                                <span className="label-text">E-mail</span>
                              </div>
                              <input {...register("email")} type="email" defaultValue={user?.email} className="input text-gray-500 input-bordered w-full max-w-xs" readOnly/>
                            </label>
                            <label className="form-control w-full max-w-xs">
                              <div className="label">
                                <span className="label-text">Blood Group</span>
                              </div>
                              <select defaultValue="default" {...register("bloodGroup")} className="select select-bordered" required>
                                <option disabled value="default">Pick one</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                              </select>
                            </label>
                            <label className="form-control w-full max-w-xs">
                              <div className="label">
                                <span className="label-text">Name</span>
                              </div>
                              <input {...register("name")} type="text" placeholder="Your Name" className="input input-bordered w-full max-w-xs" required/>
                            </label>
                            <label className="form-control w-full max-w-xs">
                              <div className="label">
                                <span className="label-text">District</span>
                              </div>
                              <select defaultValue="default" {...register("district")} className="select select-bordered" required>
                                    <option disabled value="default">Pick one</option>
                                    {
                                        districts?.map(district => <option key={district?.id}>{district?.name}</option>)
                                    }
                              </select>
                            </label>

                            <div className="form-control">
                              <label className="label">
                                <span className="label-text">Avatar</span>
                              </label>
                              <input {...register("image")} type="file" className="file-input file-input-bordered w-full max-w-xs" required/>
                            </div>

                            <label className="form-control w-full max-w-xs">
                              <div className="label">
                                <span className="label-text">Upazila</span>
                              </div>
                              <select defaultValue="default" {...register("upazila")} className="select select-bordered" required>
                                    <option disabled value="default">Pick one</option>
                                    {
                                        upazilas?.map(upazila => <option key={upazila?.id}>{upazila?.name}</option>)
                                    }
                              </select>
                            </label>
                        </div>
                        <button type="submit" className="mt-5 btn bg-gradient-to-r from-[#0a3d62] to bg-[#b33939] text-white">Update Profile</button>
                    </form>
                      <p className="px-8 pb-5">Already have an account? <Link className="text-purple-700 font-bold" to="/login">Login</Link></p>
                    </div>
                </div>
              </div>
            </div>
    );
};

export default UpdateUserProfile;