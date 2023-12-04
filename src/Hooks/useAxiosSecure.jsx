import axios from "axios";

const  axiosSecure = axios.create({
    baseURL: "https://blood-bucket-server-phi.vercel.app"
})
const UseAxiosSecure = () => {
    return axiosSecure;
};

export default UseAxiosSecure;