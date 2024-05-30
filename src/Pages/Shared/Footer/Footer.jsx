import { FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';
import logo from "../../../assets/logo/bos.png"
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <div className="bg-gradient-to-r from-[#0a3d62] to bg-[#b33939] rounded-t-md font-normal text-base text-white pb-5">
            <footer className="footer p-10 text-white">
              <aside className='space-y-1'>
              <img className="w-14" src={logo} alt="logo" />
                <p><span className="font-medium text-sm">Blood Bucket.</span><br/>Providing reliable service since 2010</p>
              </aside>
              <nav>
                <header className="footer-title">Company</header> 
                <a className="link link-hover">About us</a> 
                <a className="link link-hover">Contact</a> 
                <a className="link link-hover">Delivery info</a> 
              </nav> 
              <nav>
                <header className="footer-title">Legal</header> 
                <a className="link link-hover">Terms of use</a> 
                <a className="link link-hover">Privacy policy</a> 
                <a className="link link-hover">Cookie policy</a>
              </nav>
              <nav>
               <header className="footer-title">Social</header> 
               <div className="grid text-2xl grid-flow-col gap-4">
                <Link to="#"><FaFacebook/></Link>
                <Link to="#"><FaLinkedin/></Link>
                <Link to="#"><FaTwitter/></Link>
               </div>
             </nav>
            </footer>
            <p className="text-center text-sm">Copyright © 2023 - All right reserved by Blood Bucket.</p> 
        </div>
    );
};

export default Footer;