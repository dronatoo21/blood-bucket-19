import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div>
            <div className="hero h-[200px] md:h-[400px] lg:h-[600px]" style={{backgroundImage: 'url(https://i.ibb.co/0ZxSTfq/12.jpg)'}}>
                <div className="hero-overlay bg-opacity-5"></div>
                <div className="w-full px-4 md:px-10">
                  <h1 className="mb-5 text-lg md:text-3xl lg:text-5xl font-bold text-[#b33939]"><i>A blood bag in time<span className="text-[#0a3d62]"> saves a life.</span></i></h1>
                  <Link to="/registration"><button className="btn w-24 md:w-auto bg-[#0a3d62] text-white">Join as a donor</button></Link>
                  <Link to="/searchPage"><button className="btn w-24 md:w-auto bg-[#b33939] text-white ml-5">Search Donors</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;