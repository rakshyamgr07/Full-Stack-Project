import { useEffect, useState } from "react";
import CommentForm from "../components/CommentForm";
import toast from "react-hot-toast";
import axios from "axios";

export default function Home() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        async function getPost(e) {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/post`, { posts })
                setPosts(res.data.posts)
                console.log(Array.isArray(res.data.posts));

            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
        getPost()
    }, [])


    return (
        <div >
            {posts.map((post) => {
                return (
                    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl min-h-full shadow-md  m-4 p-5 gap-3" >
                    <div key={post.id} className="flex flex-col gap-3">
                        <div className="flex gap-3">
                            <img src={post.avatar} alt="profile" className="w-11 h-11 rounded-full object-cover" />
                            <div className="flex flex-col">
                                <h3 className="font-semibold text-gray-800">{post.creator.name.charAt(0).toUpperCase() + post.creator.name.slice(1)}</h3>
                                {/* slice(start) = take the string starting from that index */}
                                {/* <p className="text-sm text-gray-500">@{post.creator.name.toLowerCase()}</p> */}
                                <p className="text-sm text-gray-500"> {new Date(post.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric"
                                })}</p>

                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="normal">{post.description}</p>
                            <img src={post.imageUrl} alt="post" className="rounded-sm"></img>
                        </div>
                        <div className="flex gap-6 justify-between">
                            <div className="flex  gap-4">
                                <p>❤️ {post.likes.length}</p>
                                <p>💬 {post.comments.length}</p>
                            </div>
                            <CommentForm />
                        </div>
                    </div>
                    </div>
                )
            })}

        </div>
    );
}

