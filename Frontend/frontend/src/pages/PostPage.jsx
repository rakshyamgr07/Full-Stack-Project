import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "../utils/formatDate.js"
import { FiEdit2, FiTrash2 } from "react-icons/fi"; import Button from "../components/Button.jsx";
const PostPage = () => {
    const { postId } = useParams();
    const [postData, setPostData] = useState({})
    async function fetchPostById() {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/post/${postId}`)
            toast.success(res.data.message);
            setPostData(res.data.posts)

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    useEffect(() => {
        // eslint-disable-next-line
        fetchPostById()
        // eslint-disable-next-line
    }, [postId])
    console.log(postData)
    return (
        <>
            <article className="lg:col-span-2 rounded-2xl bg-white shadow-sm overflow-hidden">

                {/* Featured Image */}
                <img
                    src={postData.imageUrl}
                    alt={postData.title}
                    className="h-100 w-full object-cover"
                />

                <div className="p-6 md:p-10">


                    {/* Title */}
                    <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                        {postData.title}
                    </h1>

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

                    {/* Actions */}
                    <div className="flex items-center gap-6 border-b py-4 text-gray-600">
                        <button className="flex items-center gap-2 hover:text-red-500">
                            <FaRegHeart />
                            <span>{postData.likes?.length}</span>
                        </button>

                        <button className="flex items-center gap-2 hover:text-blue-500">
                            <FaRegComment />
                            <span>{postData.comments?.length}</span>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg mt-8 max-w-none text-gray-700">
                        {postData.description}
                    </div>
                    <div className="flex gap-2">
                        <Link to={`/edit-post/${postData.postId}`}>
                            <Button className="rounded-xl px-6">
                                <span className="flex items-center gap-2">
                                    <FiEdit2 />
                                    Update
                                </span>
                            </Button>
                        </Link>
                        <Button
                            className="bg-red-500 hover:bg-red-600 rounded-xl px-6 max-w-28"

                        >
                            <span className="flex items-center gap-2 ">
                                <FiTrash2 />
                                Delete
                            </span>
                        </Button>
                    </div>

                </div>
            </article>
        </>
    )
}

export default PostPage