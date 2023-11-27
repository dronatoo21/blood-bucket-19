const Banner = () => {
    return (
        <div>
            <div className="hero h-[250px] md:h-[400px] lg:h-[600px]" style={{backgroundImage: 'url(https://i.ibb.co/0ZxSTfq/12.jpg)'}}>
                <div className="hero-overlay bg-opacity-10"></div>
                <div className="w-full px-10">
                  <h1 className="mb-5 text-xl md:text-2xl lg:text-5xl font-bold text-[#b33939]"><i>A blood bag in time<span className="text-[#0a3d62]"> saves a life.</span></i></h1>
                  <button className="btn bg-[#0a3d62] text-white">Join as a donor</button>
                  <button className="btn bg-[#b33939] text-white ml-5">Search Donors</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;