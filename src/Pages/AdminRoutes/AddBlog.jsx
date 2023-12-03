import { useForm } from "react-hook-form";
import UseAxiosPublic from "../../Hooks/useAxiosPublic";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import HTMLReactParser from "html-react-parser";
import UseAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
const AddBlog = () => {
    const axiosPublic = UseAxiosPublic()
    const axiosSecure = UseAxiosSecure()
    const { register, handleSubmit } = useForm()
    const editor = useRef(null);
	const [content, setContent] = useState('');

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
                blogStatus: 'draft',
            }
            const response = await axiosSecure.post('/blogs', blogInfo)
            if(response?.data?.insertedId){
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Blog added to drafts",
                  showConfirmButton: false,
                  timer: 1500
                });
            }
          }
    }
    return (
        <div>
            <div>
              <div className="hero-content flex-col py-5">
                <div className="text-center">
                <h1 className="font-bold text-3xl text-center my-5">Add A Blog!</h1>
                </div>
                    <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-5">
                            <label className="form-control w-full ">
                              <div className="label">
                                <span className="label-text">Title</span>
                              </div>
                              <input {...register("title")} type="text" placeholder="Title" className="input input-bordered w-full" required/>
                            </label>
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text">thumbnail</span>
                              </label>
                              <input {...register("image")} type="file" className="file-input file-input-bordered w-full max-w-xs"/>
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
                        <button type="submit" className="mt-5 btn bg-gradient-to-r from-[#0a3d62] to bg-[#b33939] text-white">Create Blog</button>
                    </form>
                    </div>
                </div>
              </div>
            </div>
    );
};

export default AddBlog;