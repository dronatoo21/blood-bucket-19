import axios from "axios";

const  axiosSecure = axios.create({
    baseURL: "http://localhost:4000"
})
const UseAxiosSecure = () => {
    return axiosSecure;
};

export default UseAxiosSecure;