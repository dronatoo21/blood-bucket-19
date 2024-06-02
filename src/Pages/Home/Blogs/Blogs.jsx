import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const Blogs = () => {
    const blogs = useLoaderData()
    const [allBlogs, setAllBlogs] = useState()
    useEffect(()=>{
        const publishedBlogs = blogs?.filter((blog) =>
        blog.blogStatus.toLowerCase().includes('published'))
        setAllBlogs(publishedBlogs)
    },[blogs])
    return (
        <>
            <h1 className="font-bold text-xl mt-7 mb-5 md:text-2xl lg:text-3xl text-center">Blogs</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10 px-3">
                {
                    allBlogs?.map(blog => 
                <div key={blog?._id} className="card min-h-[450px] card-compact bg-base-100 shadow-xl">
                    <figure><img className="w-full h-64" src={blog?.thumbnail} alt="Shoes" /></figure>
                    <div className="card-body">
                      <h2 className="card-title">{blog?.title}</h2>
                      <p>{blog?.BlogContent}</p>
                    </div>
                  </div>)
                }
            </div>
        </>
    );
};

export default Blogs;