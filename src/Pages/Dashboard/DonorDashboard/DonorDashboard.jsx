import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const DonorDashboard = () => {
    const {user} = useContext(AuthContext)
    return (
        <div>
            <h1 className="font-bold text-3xl text-center mt-14 mb-2">Hello! <span className="text-[#b33939]">{user?.displayName}</span>, Welcome to the Dashboard!</h1>
        </div>
    );
};

export default DonorDashboard;