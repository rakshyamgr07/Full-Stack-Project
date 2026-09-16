import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function usePagination(path, queryParams = {}, limit, page) {
  const [hasMore, setHasMore] = useState(false)
  const [posts, setPosts] = useState([])
  const [totalPost, setTotalPost] = useState(0)

  useEffect(() =>
    async function fetchSearchPost() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/${path}`, 
          { params: { ...queryParams, limit, page } })

        //needed old post + new post
        setPosts((prev) => page == 1 ? res.data.posts : [...prev, ...res.data.posts])
        setHasMore(res.data.hasMore)
        setTotalPost(res.data.totalPost)
        toast.success(res.data.message)
      } catch (error) {
        toast.error(error.response.data.message)
      }

    },
    [path, queryParams.search, limit, page]
  )

  return {
    posts, hasMore, totalPost
  }
}

export default usePagination
