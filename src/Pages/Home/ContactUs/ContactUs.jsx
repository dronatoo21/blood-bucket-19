import Lottie from "lottie-react";
import paperPlane from "../../../assets/paperPlane.json"
import { FaPhone } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import { useRef } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_pbygnou', 'template_0hi7g9j', form.current, '_dzfusUuJKpRjr6od')
    .then((result) => {
      console.log(result);
      if(result.text === "OK"){
          Swal.fire({
              title: "Successfully sent message",
              text: "To Blood Bucket",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
      }
  }, (error) => {
          console.log(error.text);
          toast(error.text)
      });
  };
    return (
        <div className="lg:p-0 md:p-0 p-5">
            <div className="hero lg:h-[650px] bg-gradient-to-r from-[#b33939] to bg-[#0a3d62] rounded-lg md:my-10">
              <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left ">
                  <Lottie className="md:h-[400px] md::flex lg:flex hidden lg:h-[600px]" animationData={paperPlane}/>
                </div>               
                <div className="flex-shrink-0 w-full rounded-tl-[50px] rounded-br-[50px] max-w-sm  lg:m-14">
                  <form ref={form} onSubmit={sendEmail} className="card-body">
                    <h1 className="font-semibold text-white mb-3">Contact US</h1>
                    <div className="form-control">
                      <input type="text" placeholder="Your Name" name="user_name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                      <input type="email" placeholder="Your E-mail" name="user_email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <textarea type="text" placeholder="Your Message" name="message" className="input input-bordered pt-3 h-20" required />
                    </div>
                    <div className="form-control mt-6">
                      <button  className="btn bg-[#b33939] text-white border-none">Send Message</button>
                    </div>
                    <div className="flex items-center gap-3 text-white mt-5">
                        <FaPhone/>
                        <p className="text-white">Call us on : <span className="font-semibold">88242###</span></p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
        </div>
    );
};

export default ContactUs;