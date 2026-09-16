import { useEffect, useState } from "react";
import Button from "../components/Button";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteSelectedPost } from "../utils/postSlice";

const AddPost = () => {
     const { postId } = useParams();
     const navigate = useNavigate();
     const { token } = useSelector((slice) => slice.user);
     const { _id: id,
         title,
          description,
           draft, 
           imageUrl: image
         } = useSelector((slice) => slice.post);
     const [PostData, setPostData] = useState({
          title: "",
          description: "",
          image: null,
          draft: false,
     });
     const dispatch = useDispatch();

     const [loading, setLoading] = useState(false);

     const handleChange = (e) => {
          const { name, value, type, files, checked } = e.target;

          setPostData((PostData) => ({
               ...PostData,
               [name]: type == "file" ? files[0] : type == "checkbox" ? checked : value,
          }));
     };

     const handlePostPost = async () => {
          setLoading(true);
          try {
               const res = await axios.post(`${import.meta.env.VITE_API_URL}/post`, PostData,
                    {
                         headers: {
                              "Authorization": `Bearer ${token}`,
                              "Content-Type": "multipart/form-data",
                         }
                    }
               )
               toast.success(res.data.message);
               navigate("/")
          } catch (err) {
               toast.error(err.response.data.message);
               console.log(err.response.data.message)
          } finally {
               setLoading(false);
          }
     };
     const handlePostUpdate = async () => {
          setLoading(true);
          try {
               const res = await axios.patch(`${import.meta.env.VITE_API_URL}/post/${id}`, PostData,
                    {
                         headers: {
                              "Authorization": `Bearer ${token}`,
                              "Content-Type": "multipart/form-data",
                         }
                    }
               )
               toast.success(res.data.message);
               navigate(`/post/${postId}`)
          } catch (err) {
               toast.error(err.response.data.message);
               console.log(err.response.data.message)
          } finally {
               setLoading(false);
          }
     };

     async function fetchByPost() {
          setPostData({ title, description, draft, image })
     }
     useEffect(() => {
          if (!token) return navigate("/login")
          // eslint-disable-next-line react-hooks/set-state-in-effect
          if (postId) fetchByPost()
          return () => {
               if (window.location.pathname !== `/edit-post/${postId}`) {
                    dispatch(deleteSelectedPost())
               }
          }
          // eslint-disable-next-line
     }, [postId])

     return (
          <div className="max-w-2xl w-full mx-auto p-4">
               <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">

                    {/* Heading */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                         {postId ? "Update Post" : " Create New Post"}
                    </h2>

                    {/* Title */}
                    <div className="mb-5">
                         <label
                              htmlFor="title"
                              className="block text-sm font-semibold text-gray-700 mb-2"
                         >
                              Title
                         </label>

                         <input
                              id="title"
                              name="title"
                              type="text"
                              placeholder="Enter Post title"
                              value={PostData.title}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500
            focus:border-blue-500 transition"
                         />
                    </div>

                    {/* Description */}
                    <div className="mb-5">
                         <label
                              htmlFor="description"
                              className="block text-sm font-semibold text-gray-700 mb-2"
                         >
                              Description
                         </label>

                         <textarea
                              id="description"
                              name="description"
                              rows="6"
                              placeholder="Write your Post description..."
                              value={PostData.description}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500
            focus:border-blue-500 transition resize-none"
                         />
                    </div>

                    {/* Image */}
                    <div className="mb-6">
                         <label
                              htmlFor="image"
                              className="block text-sm font-semibold text-gray-700 mb-2"
                         >
                              Post Image
                         </label>

                         <label
                              htmlFor="image"
                              className="block cursor-pointer border-2 border-dashed
            border-gray-300 rounded-lg overflow-hidden
            hover:border-blue-400 transition"
                         >
                              {PostData.image ? (
                                   <img src={typeof PostData.image == "string" ? PostData.image : URL.createObjectURL(PostData.image)} className="w-full aspect-video object-cover" />
                              ) : (
                                   <div className="aspect-video bg-gray-100 flex flex-col justify-center items-center text-gray-500">
                                        <p className="font-medium">
                                             Click to upload image
                                        </p>

                                        <p className="text-sm mt-1">
                                             JPG, JPEG or PNG
                                        </p>
                                   </div>
                              )}
                         </label>

                         <input
                              id="image"
                              name="image"
                              type="file"
                              accept=".jpg,.jpeg,.png"
                              onChange={handleChange}
                              className="hidden"
                         />
                    </div>
                    <div className="mb-6 flex items-center gap-2">
                         <input
                              id="draft"
                              name="draft"
                              type="checkbox"
                              checked={PostData.draft}
                              onChange={handleChange}
                              className="w-4 h-4 accent-blue-600"
                         />

                         <label
                              htmlFor="draft"
                              className="text-sm font-medium text-gray-700 cursor-pointer"
                         >
                              Save as draft
                         </label>
                    </div>


                    {/* Submit Button */}
                    <Button
                         onClick={postId ? handlePostUpdate : handlePostPost}
                         loading={loading}
                         className="w-full bg-blue-600 text-white py-3 rounded-lg
          font-semibold hover:bg-blue-700 transition"
                    >
                         {postId ? "Update" : "Post"}
                    </Button>

               </div>
          </div>
     );
};

export default AddPost;