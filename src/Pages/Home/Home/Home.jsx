import Banner from "../Banner/Banner";
import ContactUs from "../ContactUs/ContactUs";
import TopDonors from "../TopDonors/TopDonors";
import MessengerCustomerChat from 'react-messenger-customer-chat';

const Home = () => {
    return (
        <div>
            <Banner/>
            <h1 className="font-bold text-xl mt-7 mb-5 md:text-2xl lg:text-3xl text-center">Contact Us!</h1>
            <ContactUs/>
            <h1 className="font-bold text-xl mt-7 mb-5 md:text-2xl lg:text-3xl text-center">Top Donors!</h1>
            <TopDonors/>
            <MessengerCustomerChat
               pageId="206269595893067"
               appId="320625840736669"
             />
        </div>
    );
};

export default Home;