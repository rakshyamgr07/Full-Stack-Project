import React, { useState } from 'react'
import usePagination from '../hook/usePagination'

const Home = () => {
  const [page,setPage] = useState(1)
  const {posts,hasMore,totalpost} = usePagination("posts",{},1,page)
  console.log(posts,hasMore,totalpost)
  return (
    <div>
       <div className='w-full px-4 sm:px-6 md:px-10 lg:px-20 py-10'>
      {[1,2,3,4,5].map((item)=>{
        <Card key={item}/>
      })}
    </div>
    </div>
  )
}

export default Home
