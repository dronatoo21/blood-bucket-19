import Banner from "../Banner/Banner";
import ContactUs from "../ContactUs/ContactUs";
import TopDonors from "../TopDonors/TopDonors";

const Home = () => {
    return (
        <div>
            <Banner/>
            <h1 className="font-bold text-3xl text-center mt-14 mb-2">Top Donors!</h1>
            <TopDonors/>
            <h1 className="font-bold text-3xl text-center mt-14 mb-2">Contact Us!</h1>
            <ContactUs/>
        </div>
    );
};

export default Home;