import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { toast } from "react-toastify";
// import { GoogleAuthProvider } from "firebase/auth";

const Login = () => {
    const { Login } = useContext(AuthContext)
    const [loginErrorMsg, setLoginErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
  //   const googleProvider = new GoogleAuthProvider();

  //   const handleGoogleSignIn = () => {
  //     setLoginErrorMsg('');
  //     setSuccessMsg('');
  //     googleLogin(googleProvider)
  //     .then(res => {
  //         console.log(res.user);
  //         setSuccessMsg('successfully logged in');
  //         toast("successfully logged in");
  //         navigate(location?.state ? location.state : '/')
  //     })
  //     .catch(error => {
  //         setLoginErrorMsg(error.message);
  //     })
  // }

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        setLoginErrorMsg('');
        setSuccessMsg('');
        Login(email, password)
        .then(res => {
            setSuccessMsg('Login Successful');
            toast('Login Successful');
            navigate(location?.state ? location.state : '/');
            console.log(res.data);
        })
        .catch(error => {
            setLoginErrorMsg(error.message);
        })
    }
    return (
        <div className="mt-5 mx-2">
          <h1 className="font-bold text-xl mt-7 mb-5 md:text-2xl lg:text-3xl text-center">Please Login!</h1>
            <div className="hero my-5">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                  <form onSubmit={handleLogin} className="card-body">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Password</span>
                      </label>
                      <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                      <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                      </label>
                    </div>
                    <div className="form-control flex gap-2 mt-6">
                      <button className="btn bg-gradient-to-r from-[#0a3d62] to bg-[#b33939] text-white">Login</button>
                      {/* <p className="text-center">or</p>
                      <button onClick={handleGoogleSignIn} className="btn bg-gradient-to-r from-[#0a3d62] to bg-[#b33939] text-white">Login with Google</button> */}
                    </div>
                  </form>
                  {
                    loginErrorMsg && <p className="text-red-700 px-8 pb-5">{loginErrorMsg}</p>
                  }
                  {
                    successMsg && <p className="text-green-500 px-8 pb-5">{successMsg}</p>
                  }
                  <p className="px-8 pb-5">New here? Please <Link className="text-purple-700 font-bold" to="/registration">Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;