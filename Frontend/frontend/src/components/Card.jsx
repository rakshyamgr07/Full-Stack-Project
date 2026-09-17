import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { useState } from "react";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Card = ({ item }) => {
  const navigate = useNavigate();

  const { token, id } = useSelector((state) => state.user);

  // Check whether current user already liked this post
  const [isLike, setIsLike] = useState(
    item.likes?.includes(id) || false
  );

  const [likeCount, setLikeCount] = useState(
    item.likes?.length || 0
  );

  const handlePostLike = async (e) => {
    e.preventDefault();

    if (!token) {
      return toast.error("Please sign in to like this post");
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/post/likes/${item._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsLike((prev) => !prev);

      setLikeCount((prev) =>
        isLike ? prev - 1 : prev + 1
      );

      toast.success(res.data.message);

    } catch (error) {
      toast.error(
        error.response?.data?.message 
      );
    }
  };

  const handleComment = (e) => {
    e.preventDefault();

    navigate(`/post/${item.postId}`);
  };

  return (
    <div className="flex flex-col justify-center items-center ">

      <Link
        to={`/post/${item.postId}`}
        className="p-4 bg-white border border-gray-200
        hover:-translate-y-1 transition duration-300
        rounded-lg shadow shadow-black/10
        w-[700px] flex flex-col"
      >

        {/* User Profile */}
        <div className="flex items-center gap-3 mb-4">

          <img
            src={`https://api.dicebear.com/10.x/initials/svg?seed=${
              item.creator?.name || "User"
            }`}
            alt={item.creator?.name || "User"}
            className="h-10 w-10 rounded-full"
          />

          <div>
            <p className="font-semibold text-gray-900 capitalize">
              {item.creator?.name || "Unknown User"}
            </p>

            <p className="text-sm text-gray-500">
              {item.createdAt
                ? formatDate(item.createdAt)
                : "Just now"}
            </p>
          </div>

        </div>

        {/* Description */}
        <p className="text-sm/6 mt-2 mb-2 line-clamp-4">
          {item.description}
        </p>

        {/* Post Image */}
        <img
          className="rounded-md h-[500px] w-full object-cover"
          src={item.imageUrl}
          alt={item.title}
        />

        {/* Like + Comment */}
        <div className="flex items-center gap-6 border-b py-4 text-gray-600">

          {/* Like */}
          <button
            onClick={handlePostLike}
            className="flex items-center gap-2 hover:text-red-500"
          >
            {isLike ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart />
            )}

            <span>{likeCount}</span>
          </button>

          {/* Comment */}
          <button
            onClick={handleComment}
            className="flex items-center gap-2 hover:text-blue-500"
          >
            <FaRegComment />

            <span>
              {item.comments?.length || 0}
            </span>
          </button>

        </div>

      </Link>

    </div>
  );
};

export default Card;