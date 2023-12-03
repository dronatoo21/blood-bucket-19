import { Link } from "react-router-dom";
import UseUsers from "../../Hooks/UseUsers";
import { FaPen, FaPrescriptionBottle, FaSlidersH } from "react-icons/fa";
import UseAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";

const ContentManagement = () => {
    const {userData} = UseUsers()
    const axiosSecure = UseAxiosSecure()
    const [searhedBlogs, setSearchedBlogs] = useState()
    const {data: blogs = [], refetch} = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/blogs')
            setSearchedBlogs(res.data)
            return res.data;   
        }
    })
    console.log(searhedBlogs);

    const filterBlogs = status => {
      const filteredBlogs = blogs?.filter((blog) =>
      blog.blogStatus.toLowerCase().includes(status)
          )
          setSearchedBlogs(filteredBlogs)
      };

      const handlePublish = blog => {
        axiosSecure.patch(`/blogs/${blog._id}`)
        .then(res => {
          console.log(res.data);
            if(res.data.modifiedCount > 0){
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Blog Published successfully`,
                    showConfirmButton: false,
                    timer: 1500 
                })
            }
        })
    }

      const handleUnpublish = blog => {
        axiosSecure.patch(`/blog/${blog._id}`)
        .then(res => {
          console.log(res.data);
            if(res.data.modifiedCount > 0){
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Blog Unpublished successfully`,
                    showConfirmButton: false,
                    timer: 1500 
                })
            }
        })
    }

      const handleDelete = blog => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
          axiosSecure.delete(`/blogs/${blog._id}`)
          .then(res => {
              console.log(res);
              if(res.data.deletedCount > 0){
                  refetch()
                  Swal.fire({
                      title: "Deleted!",
                      text: "Blog has been deleted.",
                      icon: "success"
                  });
              }
          })
          }
        });
    }

    return (
        <div>
            {
            userData?.role === 'admin' || userData?.role === 'volunteer' ? <>
            <div className="text-end my-5">
                <Link to='/dashboard/addBlog'><button className="btn bg-gradient-to-r from-[#0a3d62] to bg-[#b33939] text-white">Add Blog</button></Link>
            </div>
            <div>
            <div>
            <div className="mx-5">
            <h1 className="font-bold text-3xl text-center my-10 mb-2">All Blogs</h1>
            { searhedBlogs && 
              <>
                <div className="dropdown dropdown-bottom">
                  <div tabIndex={0} role="button" className="btn m-1 bg-gradient-to-r from-[#0a3d62] to bg-[#b33939] text-white"><FaSlidersH/>Filter</div>
                  <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><button onClick={() => filterBlogs("")} className="btn btn-outline">ALL</button></li>
                    <li><button onClick={() => filterBlogs("draft")} className="btn btn-outline my-2">Drafts</button></li>
                    <li><button onClick={() => filterBlogs("published")} className="btn btn-outline">PUBLISHED</button></li>
                  </ul>
                </div>
                <div className="overflow-x-auto">
                <div className="overflow-x-auto lg:w-[1200px] md:w-[750px] w-[375px]">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>
                          #
                        </th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Content</th>
                        {
                            userData?.role === 'admin' || userData?.role === 'volunteer' ?
                            <th>Edit</th> : <th></th>
                        }
                        { userData?.role === 'admin' ?
                              <>
                                <th>Publish/Draft</th>
                                <th>Delete</th>
                              </> : <>
                                <th></th>
                                <th></th>
                              </>
                            }
                      </tr>
                    </thead>
                    <tbody>
                      {
                        searhedBlogs?.map((blog, index) => <tr key={blog?._id}>
                            <th>
                                {index + 1}
                            </th>
                            <td>{blog?.title}</td>
                            <td>{blog?.blogStatus}</td>
                            <td>{blog?.BlogContent}</td>
                            {
                                userData?.role === 'admin' || userData?.role === 'volunteer' ? 
                              <>
                                <td><Link to={`/dashboard/editBlog/${blog?._id}`}><button className="btn text-blue-800"><FaPen/></button></Link></td>
                              </> : <td></td>
                            }
                            { userData?.role === 'admin' ?
                              <>
                                {
                                    blog?.blogStatus === 'draft' ? 
                                    <td><button onClick={()=>handlePublish(blog)} className="btn">Publish</button></td> :
                                    <td><button onClick={()=>handleUnpublish(blog)} className="btn">Unpublish</button></td>
                                }
                                <td><button onClick={()=>handleDelete(blog)} className="btn text-red-600"><FaPrescriptionBottle/></button></td>
                              </> : <>
                              <td></td>
                              <td></td>
                              </>
                            }
                          </tr>
                          )
                      }
                    </tbody>                
                  </table>
                </div>
                </div>
              </>
            }
        </div>
        </div>
            </div>
            </> : <div><h1 className="text-center my-10 text-lg">Only Admin And Volunteer Can See This Page</h1></div>}
        </div>
    );
};

export default ContentManagement;