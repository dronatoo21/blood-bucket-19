import { Link } from "react-router-dom";

const contentManagement = () => {
    return (
        <div>
            <div className="text-end my-5">
                <Link to='/dashboard/addBlog'><button className="btn bg-gradient-to-r from-[#0a3d62] to bg-[#b33939] text-white">Add Blog</button></Link>
            </div>
        </div>
    );
};

export default contentManagement;