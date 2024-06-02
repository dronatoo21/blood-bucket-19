import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UseDistricts from "../../Hooks/UseDistricts";
import UseUpazilas from "../../Hooks/UseUpazilas";
import UseAxiosPublic from "../../Hooks/useAxiosPublic";
import UseAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { updateProfile } from "firebase/auth";
const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
const Registration = () => {
    const { userCreation } = useContext(AuthContext)
    const axiosPublic = UseAxiosPublic()
    const axiosSecure = UseAxiosSecure()
    const location = useLocation();
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState('');
    const [districts] = UseDistricts();
    const [upazilas] = UseUpazilas();
    const { register, handleSubmit } = useForm()
    const onSubmit = async (data) => {
        setRegisterError('');
        if(data.password !== data.confirmPassword){
          setRegisterError('Please Check your Password')
          return
        }
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
                email : data.email,
                name: data.name,
                avater: res.data.data.display_url,
                bloodGroup: data.bloodGroup,
                district: data.district,
                upazila: data.upazila,
                status: 'active',
                role: 'donor'
            }
            const user = await axiosSecure.post('/user', userInfo)
            console.log(user.data);
          }
          userCreation(data?.email, data?.password)
          .then(response => {
              console.log(res.user);
              toast("Registration Successful");
              navigate(location?.state ? location.state : '/')
              updateProfile(response.user, {
                displayName: data.name,
                photoURL: res.data.data.display_url
              })
              .then(()=> {
                window.location.reload()
              })
              .catch(error=> console.error(error.message))
          })
          .catch(error => {
              setRegisterError(error.message);
          });
    }
    return (
        <div>
            <div className="hero">
              <div className="hero-content flex-col py-5">
                <div className="text-center">
                <h1 className="font-bold text-xl mt-7 mb-5 md:text-2xl lg:text-3xl text-center">Please Register!</h1>
                </div>
                    <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <label className="form-control w-full max-w-xs">
                              <div className="label">
                                <span className="label-text">E-mail</span>
                              </div>
                              <input {...register("email")} type="email" placeholder="E-mail" className="input input-bordered w-full max-w-xs" required/>
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
                              <input {...register("name")} type="text" placeholder="Name" className="input input-bordered w-full max-w-xs" required/>
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
                            <label className="form-control w-full max-w-xs">
                              <div className="label">
                                <span className="label-text">Password</span>
                              </div>
                              <input {...register("password")} type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" required/>
                            </label>
                            <label className="form-control w-full max-w-xs">
                              <div className="label">
                                <span className="label-text">Confirm Password</span>
                              </div>
                              <input {...register("confirmPassword")} type="password" placeholder="Confirm Password" className="input input-bordered w-full max-w-xs" required/>
                            </label>
                        </div>
                        <button type="submit" className="mt-5 btn bg-gradient-to-r from-[#0a3d62] to bg-[#b33939] text-white">Register</button>
                    </form>
                      {
                        registerError && <p className="text-red-700 px-8 pb-5">{registerError}</p>
                      }
                      <p className="px-8 pb-5">Already have an account? <Link className="text-purple-700 font-bold" to="/login">Login</Link></p>
                    </div>
                </div>
              </div>
            </div>
    );
};

export default Registration;