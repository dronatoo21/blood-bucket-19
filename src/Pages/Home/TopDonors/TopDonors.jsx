const TopDonors = () => {
    return (
        <div className="mb-10">
            <div className="text-center my-10 py-5 grid grid-cols-1 md:grid-cols-2 lg:gap-0 md:gap-5 gap-10 lg:grid-cols-4">
                <div >
                    <img className="h-[250px] w-[250px] border-x-[#0a3d62] border-y-[#b33939] rounded-full border-2 mx-auto" src="https://i.ibb.co/PhCktw6/Screenshot-2023-11-27-161949.png" alt="img" />
                    <h2 className="text-2xl mt-3 font-bold">Sara</h2>
                    <p className="font-semibold text-xl"><i>Blood : 0+</i></p>
                </div>
                <div>
                    <img className="h-[250px] w-[250px] border-x-[#b33939] border-y-[#0a3d62] rounded-full border-2 mx-auto" src="https://i.ibb.co/34zyH6T/Screenshot-2023-11-27-162105.png" alt="img" />
                    <h2  className="text-2xl mt-3 font-bold">Tommy</h2>
                    <p className="font-semibold text-xl"><i>Blood : AB+</i></p>
                </div>
                <div>
                    <img className="h-[250px] w-[250px] border-x-[#0a3d62] border-y-[#b33939] rounded-full border-2 mx-auto" src="https://i.ibb.co/ZWBF47D/Screenshot-2023-11-27-162308.png" alt="img" />
                    <h2  className="text-2xl mt-3 font-bold">Victor</h2>
                    <p className="font-semibold text-xl"><i>Blood : 0-</i></p>
                </div>
                <div>
                    <img className="h-[250px] w-[250px] border-x-[#b33939] border-y-[#0a3d62] rounded-full border-2 mx-auto" src="https://i.ibb.co/y096HH7/Screenshot-2023-11-27-162427.png" alt="img" />
                    <h2  className="text-2xl mt-3 font-bold">Jack</h2>
                    <p className="font-semibold text-xl"><i>Blood : B+</i></p>
                </div>
            </div>
        </div>
    );
};

export default TopDonors;