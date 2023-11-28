import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
            <ToastContainer/> 
        </div>
    );
};

export default Main;