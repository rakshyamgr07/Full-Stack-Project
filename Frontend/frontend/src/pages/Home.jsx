import { useState } from 'react'
import usePagination from '../hook/usePagination'
import Card from '../components/Card'
import Button from '../components/Button'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Home = () => {
  const [page, setPage] = useState(1)
  const { token, name, id } = useSelector((state) => state.user)

  const { posts, hasMore, totalPost } = usePagination("post", {}, 2, page)

  return (
    <div className="w-full min-h-screen px-3 sm:px-6 md:px-10 lg:px-20 py-6 sm:py-10 flex flex-col items-center gap-6">

      {/* Create Post */}
      <div className="w-full max-w-6xl p-3 sm:p-4 bg-white border border-gray-200
        hover:-translate-y-1 transition duration-300
        rounded-lg shadow shadow-black/10">

        <div className="flex items-start sm:items-center gap-2 sm:gap-3">

          <img
            src={`https://api.dicebear.com/10.x/initials/svg?seed=${name || "User"}`}
            alt="Author"
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />

          <form className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full min-w-0">

            {/* Input */}
            <div className="flex items-center w-full border gap-2 bg-white
              border-gray-500/30 h-12 rounded-full overflow-hidden">

              <Link to="/add-post" className="w-full">
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  className="w-full h-12 px-4 sm:px-6 outline-none text-sm 
                  placeholder-gray-500 bg-transparent cursor-pointer"
                  readOnly
                />
              </Link>

            </div>


          </form>

        </div>
      </div>

      {/* Posts */}
      <div className="w-full max-w-6xl flex flex-col gap-6">
        {posts.map((item) => (
          <Card key={item._id} item={item} />
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <Button
          onClick={() => setPage((prev) => prev + 1)}
        >
          Load More
        </Button>
      )}

    </div>
  )
}

export default Home