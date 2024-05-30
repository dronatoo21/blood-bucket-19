import Banner from "../Banner/Banner";
import ContactUs from "../ContactUs/ContactUs";
import TopDonors from "../TopDonors/TopDonors";
import MessengerCustomerChat from 'react-messenger-customer-chat';

const Home = () => {
    return (
        <div>
            <Banner/>
            <h1 className="font-bold text-3xl text-center mt-14 mb-2">Contact Us!</h1>
            <ContactUs/>
            <h1 className="font-bold text-3xl text-center mt-14 mb-2">Top Donors!</h1>
            <TopDonors/>
            <MessengerCustomerChat
               pageId="206269595893067"
               appId="320625840736669"
             />
        </div>
    );
};

export default Home;