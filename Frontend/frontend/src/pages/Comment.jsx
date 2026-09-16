import Button from "../components/Button";
import { useState } from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { commentLike, deleteComments, setComments, updateComments } from "../utils/postSlice";
import { formatDate } from "../utils/formatDate";

const Comment = () => {
  const dispatch = useDispatch();
  const { token, id: userId } = useSelector((state) => state.user);
  const { _id, comments = [] } = useSelector((state) => state.post);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [editingComment, setEditingComment] = useState("");
  // Add Comment
  const handleComment = async () => {
    if (!comment.trim()) return toast.error("Comment rrquired")
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/post/${_id}/comment`, { comment },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        }
      )
      dispatch(setComments(res.data.newComment));
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err.response.data.message)
    } finally {
      setLoading(false);
    }
  };

  // Delete Comment
  const handleDeleteComment = async (commentId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/post/${commentId}/comment`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success(res?.data?.message);
      dispatch(deleteComments(commentId))
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }

  // Like Comment
  const handleLikeComment = async (commentId) => {
    if (token) {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/post/${commentId}/comment-like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
      toast.success(res.data.message);
      dispatch(commentLike({ commentId, userId }));
    } else {
      return toast.error("Please signing for comment this post");
    }
  }
  const updateComment = async (commentId) => {
    if (!editingComment.trim()) return toast.error("Comment required");

    try {
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/post/${commentId}/comment`,
        { comment: editingComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
      dispatch(updateComments({ commentId, newComment: editingComment }))
      setEditingId(null);
      setComment("")
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }
  return (
    <div className="mt-12 border-t pt-8">

      {/* Comment Heading */}
      <h2 className="text-2xl font-bold text-gray-900">
        Comments ({comments.length})
      </h2>

      {/* Comment Form */}
      <div className="mt-5">

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          placeholder="Write a comment..."
          className="w-full rounded-xl border border-gray-300 p-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <div className="mt-3 flex justify-end">
          <Button loading={loading}
            onClick={handleComment}
            className="rounded-xl px-6"
          >
            Post Comment
          </Button>
        </div>

      </div>

      {/* Comment List */}
      <div className="mt-8 space-y-5">

        {comments.map((item) => (
          <div
            key={item._id}
            className="flex gap-3 rounded-xl bg-gray-50 p-4"
          >

            {/* Avatar */}
            <img
              src={`https://api.dicebear.com/10.x/initials/svg?seed=${item.user.name}`}
              alt={item.user?.name}
              className="h-10 w-10 rounded-full"
            />

            {/* Comment Content */}
            < div className="flex-1" >

              {/* Name + Time + Actions */}
              <div div className="flex items-center justify-between" >

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {item.user?.name}
                  </h3>
                  <p className="text-sm text-gray-500">{formatDate(item.createdAt)}</p>

                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">

                  {/* Like */}
                  <button
                    onClick={() =>
                      handleLikeComment(item._id)
                    }
                    className={`flex items-center gap-1 transition`}
                  >
                    {item.likes?.includes(userId) ? (
                      <FaHeart size={16} className="text-red-500" />
                    ) : (
                      <FaRegHeart size={16} />
                    )}

                    <span className="text-sm">
                      {item?.likes.length}
                    </span>
                  </button>

                  {/* Edit */}
                  {userId === item.user?._id && (
                    <button
                      className="text-gray-500 transition hover:text-blue-500"
                      title="Edit comment"
                      onClick={() => {
                        setEditingId(item?._id);
                        setEditingComment(item?.comment)
                      }}
                    >
                      <FiEdit2 size={17} />
                    </button>

                  )}
                  {/* Delete */}
                  <button
                    onClick={() =>
                      handleDeleteComment(item._id)
                    }
                    className="text-red-500 transition hover:text-red-700"
                    title="Delete comment"
                  >
                    <FiTrash2 size={18} />
                  </button>

                </div>
              </div >

              {/* Comment Text */}
              {editingId === item?._id ? (
                <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <textarea
                    placeholder="Edit your comment..."
                    value={editingComment}
                    onChange={(e) => setEditingComment(e.target.value)}
                    className="w-full min-h-27 resize-none rounded-lg border border-gray-300 bg-white p-3 text-gray-700 placeholder-gray-400 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />

                  <div className="mt-4 flex items-center justify-end gap-3">
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditingComment("");
                      }}
                      className="rounded-lg border border-gray-300 px-5 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => updateComment(item?._id)}
                      className="rounded-lg bg-green-600 px-5 py-2 font-medium text-white shadow-sm transition hover:bg-green-700 hover:shadow-md"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (< p className="mt-2 text-sm leading-6 text-gray-600" >
                {item.comment}
              </p >)}

            </div >
          </div >
        ))}

      </div >

    </div >
  );
};

export default Comment;