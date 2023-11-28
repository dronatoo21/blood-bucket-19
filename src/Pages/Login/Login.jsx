import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
    const { Login } = useContext(AuthContext)
    const [loginErrorMsg, setLoginErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

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
        <div className="my-5">
          <h1 className="text-3xl font-semibold text-center">Please Login!</h1>
            <div className="hero my-10">
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
                    <div className="form-control mt-6">
                      <button className="btn bg-gradient-to-r from-[#0a3d62] to bg-[#b33939] text-white">Login</button>
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