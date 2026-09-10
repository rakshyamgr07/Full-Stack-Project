import axios from "axios";
import { useEffect, useState } from "react";

function usePagination(path,queryParams={},limit,page) {
    const [hasMore,setHasMore]=useState(false)
    const [posts,setPosts] = useState([])
    const [totalPost,setTotalPost] = useState(0)

    useEffect(()=>
        async function fetchSearchPost(){

        },
        [path,queryParams,search,limit,page]
    )

  return {
    posts,hasMore,totalPost
  }
}

export default usePagination
