import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://blood-bucket-server-phi.vercel.app',
})
const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;