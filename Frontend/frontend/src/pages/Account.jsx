import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Card from '../components/Card'

const Account = () => {
     console.log("ACCOUNT PAGE LOADED")
  const { token, name } = useSelector((state) => state.user)
  const [posts, setPosts] = useState([])
console.log("TOKEN:", token)
  useEffect(() => {
    const getMyPosts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/post/my-posts`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        setPosts(res.data.posts)

      } catch (error) {
        console.log(error)
      }
    }

    if (token) {
      getMyPosts()
    }
  }, [token])

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">

      {/* Account Information */}
      <div className="flex justify-center items-center gap-5 mb-10">

        <img
          src={`https://api.dicebear.com/10.x/initials/svg?seed=${name || "User"}`}
          alt="Author"
          className="h-16 w-16 rounded-full object-cover"
        />

        <div className="flex flex-col">
          <span className="font-semibold text-lg">
            {name}
          </span>

          <span className="text-sm text-gray-500">
            {posts.length} Posts
          </span>
        </div>

      </div>

      {/* My Posts */}
      <div className="flex flex-col gap-6">

        {posts.length > 0 ? (
          posts.map((item) => (
            <Card
              key={item._id}
              item={item}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">
            You haven't created any posts yet.
          </p>
        )}

      </div>

    </div>
  )
}

export default Account