import { useState } from "react";
import Card from "../components/Card";
import usePagination from "../hook/usePagination";
import Button from "../components/Button";
import { useSearchParams } from "react-router-dom";

const SearchPost = () => {
     const [page, setPage] = useState(1)
     const [searchParams] = useSearchParams()
     const search = searchParams.get("q")
     const { posts, hasMore, totalPost } = usePagination("post/search-post", { search }, 2, page)
     return (
          <div className="w-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 lg:px-20 py-10">
               <div className="mb-3 flex items-center">
                    <span className="text-4xl text-gray-500 font-bold">Result for {search}{posts.length > 0 && <span>    ({totalPost})</span>}</span>
               </div>
               <div className="flex flex-cols-1 sm:flex-cols-2 md:flex-cols-3 lg:flex-cols-4 gap-4">
                    {posts.map((item) => (
                         <Card key={item._id} item={item} />
                    ))}
               </div>
               {hasMore && (
                    <Button onClick={() => setPage((prev) => prev + 1)}>Load More</Button>
               )}
          </div>
     );
};

export default SearchPost;