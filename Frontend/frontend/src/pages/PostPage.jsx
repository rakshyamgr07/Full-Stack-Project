import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegHeart, FaRegComment, FaHeart } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../utils/formatDate.js"
import { FiEdit2, FiTrash2 } from "react-icons/fi"; import Button from "../components/Button";
import Comment from "./Comment.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedPost, deleteSelectedPost, likePost } from "../utils/postSlice.js";
const PostPage = () => {
     const { token, email, id } = useSelector((state) => state.user)
     const { likes, comments } = useSelector((state) => state.post)
     const { postId } = useParams();
     const [postData, setPostData] = useState({})
     const [loading, setLoading] = useState(false);
     const [isLike, setIsLike] = useState(false);
     const navigate = useNavigate();
     const dispatch = useDispatch();
     async function fetchPostById() {
          try {
               const res = await axios.get(`${import.meta.env.VITE_API_URL}/post/${postId}`,
                    {
                         headers: {
                              Authorization: `Bearer ${token}`,
                         },
                    }
               )
               toast.success(res.data.message);
               setPostData(res.data.posts)
               if (res.data.posts.likes.includes(id)) {
                    setIsLike(true)
               }
               dispatch(addSelectedPost(res.data.posts))

          } catch (error) {
               toast.error(error.response.data.message);
          }
     }
     async function handleDeletePost() {
          setLoading(true);
          try {
               const response = await axios.delete(
                    `${import.meta.env.VITE_API_URL}/post/${postData._id}`,
                    {
                         headers: {
                              Authorization: `Bearer ${token}`,
                         },
                    }
               );
               navigate("/");
               toast.success(response.data.message);
          } catch (error) {
               toast.error("Failed to delete user:" + error.response?.data?.message);
          } finally {
               setLoading(false);
          }
     }
     const handlePostlike = async () => {
          if (token) {
               setIsLike((prev) => !prev)
               try {
                    const res = await axios.post(`${import.meta.env.VITE_API_URL}/post/likes/${postData._id}`, {},
                         {
                              headers: {
                                   "Authorization": `Bearer ${token}`,
                              }
                         }
                    )
                    toast.success(res.data.message);
                    dispatch(likePost(id))
               } catch (err) {
                    toast.error(err.response.data.message);
                    // console.log(err.response.data.message)
               }
          } else {
               return toast.error("Please sign in for like this post");
          }
     };

     const handleComment = (e) => {
          e.preventDefault();
          navigate("/comment")
     };
     useEffect(() => {
          // eslint-disable-next-line
          fetchPostById()
          return () => {
               if (window.location.pathname !== `/edit-post/${postId}`) {
                    dispatch(deleteSelectedPost())
               }
          }
          // eslint-disable-next-line
     }, [postId])
     return (
          <div className="rounded-lg shadow shadow-black/10 p-4 m-5">
               <article className="lg:col-span-2 rounded-2xl bg-white shadow-sm overflow-hidden">
                    {/* Author Info */}
                    <div className="mt-6 flex items-center justify-between border-b pb-6">

                         <div className="flex items-center gap-3">
                              <img
                                   src={`https://api.dicebear.com/10.x/initials/svg?seed=${postData.creator?.name}`}
                                   alt="Author"
                                   className="h-12 w-12 rounded-full object-cover"
                              />

                              <div>
                                   <p className="font-semibold text-gray-900">
                                        {postData.creator?.name}
                                   </p>
                                   <p className="text-sm text-gray-500">
                                        {formatDate(postData.createdAt)}
                                   </p>
                              </div>
                         </div>

                    </div>
                    <div className="prose prose-lg m-4 max-w-none text-gray-700 ">
                         {postData.description}
                    </div>
                    {/* Featured Image */}
                    <img
                         src={postData.imageUrl}
                         alt={postData.title}
                         className=" w-full object-fit"
                    />

                    <div className="p-6 md:p-10">


                         {/* Title
                         <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                              {postData.title}
                         </h1> */}



                         {/* Actions */}
                         <div className="flex items-center gap-6 border-b py-4 text-gray-600">
                              <button className="flex items-center gap-2 hover:text-red-500">
                                   {isLike ?
                                        <FaHeart className="text-red-500" onClick={handlePostlike} />
                                        :
                                        <FaRegHeart onClick={handlePostlike} />
                                   }
                                   <span>{likes?.length}</span>
                              </button>

                              <button className="flex items-center gap-2 hover:text-blue-500 "
                                   >
                                   <FaRegComment onClick={handleComment} />
                                   <span>{comments?.length}</span>
                              </button>
                         </div>

                         {/* Content */}

                         {token && email == postData.creator?.email && (
                              <div className="flex gap-2 py-2 items-start">
                                   <Link to={`/edit-post/${postData.postId}`}>
                                        <Button className="rounded-xl px-6">
                                             <span className="flex items-center gap-2">
                                                  <FiEdit2 />
                                                  Update
                                             </span>
                                        </Button>
                                   </Link>
                                   <Button onClick={handleDeletePost} loading={loading}
                                        className="bg-red-500 hover:bg-red-600 rounded-xl px-6 max-w-28"

                                   >
                                        <span className="flex items-center gap-2 ">
                                             <FiTrash2 />
                                             Delete
                                        </span>
                                   </Button>
                              </div>

                         )}
                    </div>
               </article>
               <Comment />
          </div>
     )
}

export default PostPage