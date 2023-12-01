import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import ErrorAnimation from "../../assets/erer.json"
const ErrorPage = () => {
    return (
        <div>
            <div className="text-center my-20">
            <Link to="/"><button className="btn bg-gray-800 text-white rounded-xl">Go To Home</button></Link>
            <Lottie className="w-8/12 lg:w-1/3 mx-auto" animationData={ErrorAnimation}/>
        </div>
        </div>
    );
};

export default ErrorPage;