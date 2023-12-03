import { useForm } from "react-hook-form";
import UseAxiosPublic from "../../Hooks/useAxiosPublic";
import UseAxiosSecure from "../../Hooks/useAxiosSecure";
import { useRef, useState } from "react";
import HTMLReactParser from "html-react-parser";
import Swal from "sweetalert2";
import { useLoaderData, useParams } from "react-router-dom";
import JoditEditor from 'jodit-react';
import UseUsers from "../../Hooks/UseUsers";

const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
const EditBlog = () => {
    const userData = UseUsers()
    const blogData = useLoaderData()
    const axiosPublic = UseAxiosPublic()
    const axiosSecure = UseAxiosSecure()
    const {id} = useParams();
    const { register, handleSubmit } = useForm()
    const editor = useRef(null);
	const [content, setContent] = useState(blogData?.BlogContent);

    const onSubmit = async (data) => {
        const imageFile = {image : data.image[0]}
        const res = await axiosPublic.post(imageHostingApi, imageFile, {
            headers: {
                'content-type':'multipart/form-data'
            }
        })
        console.log(res.data);
        if(res?.data?.success){
            const blogInfo = {
                title: data?.title,
                thumbnail: res?.data?.data?.display_url,
                BlogContent: HTMLReactParser(content)?.props?.children,
                blogStatus: blogData?.blogStatus,
            }
            const response = await axiosSecure.put(`/blogs/${id}`, blogInfo)
            if(response?.data?.modifiedCount){
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Blog edited successfully",
                  showConfirmButton: false,
                  timer: 1500
                });
            }
          }
    }
    return (
        <div>
            <>
            { userData?.role === 'admin' || userData?.role === 'volunteer' ? 
                <div>
                <div>
                  <div className="hero-content flex-col py-5">
                    <div className="text-center">
                    <h1 className="font-bold text-3xl text-center my-5">Edit Blog!</h1>
                    </div>
                        <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-5">
                                <label className="form-control w-full ">
                                  <div className="label">
                                    <span className="label-text">Title</span>
                                  </div>
                                  <input {...register("title")} type="text" defaultValue={blogData?.title} placeholder="Title" className="input input-bordered w-full" required/>
                                </label>
                                <div className="form-control">
                                  <label className="label">
                                    <span className="label-text">thumbnail</span>
                                  </label>
                                  <input {...register("image")} type="file" className="file-input file-input-bordered w-full max-w-xs" required/>
                                </div>
                                <div className="form-control">
                                  <label className="label">
                                    <span className="label-text">Content</span>
                                  </label>
                                  <JoditEditor
                                    ref={editor}
                                    value={content}
                                    onChange={newContent => setContent(newContent)}
                                  />
                                </div>
                            </div>
                            <button type="submit" className="mt-5 btn bg-gradient-to-r from-[#0a3d62] to bg-[#b33939] text-white">Update Blog</button>
                        </form>
                        </div>
                    </div>
                  </div>
                </div> : <div><h1 className="text-center my-10 text-lg">Only Admin and Volunteer Can See This Page</h1></div>
            }
            </>
        </div>
    );
};

export default EditBlog;