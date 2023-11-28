import Banner from "../Banner/Banner";
import ContactUs from "../ContactUs/ContactUs";

const Home = () => {
    return (
        <div>
            <Banner/>
            <h1 className="font-bold text-3xl text-center mt-14 mb-2">Contact Us!</h1>
            <ContactUs/>
        </div>
    );
};

export default Home;