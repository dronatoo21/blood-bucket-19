import Banner from "../Banner/Banner";
import ContactUs from "../ContactUs/ContactUs";
import TopDonors from "../TopDonors/TopDonors";
import MessengerCustomerChat from 'react-messenger-customer-chat';

const Home = () => {
    return (
        <div>
            <Banner/>
            <h1 className="font-bold text-3xl text-center mt-14 mb-2">Top Donors!</h1>
            <TopDonors/>
            <h1 className="font-bold text-3xl text-center mt-14 mb-2">Contact Us!</h1>
            <ContactUs/>
            <MessengerCustomerChat
               pageId="180357251829446"
               appId="1003824134021262"
             />,
        </div>
    );
};

export default Home;