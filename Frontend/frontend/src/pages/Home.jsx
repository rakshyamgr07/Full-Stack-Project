import  { useState } from 'react'
import usePagination from '../hook/usePagination'
import Card from '../components/Card'
import Button from '../components/Button'

const Home = () => {
  const [page,setPage] = useState(1)
  const {posts,hasMore,totalpost} = usePagination("post",{},2,page) // 2 means limit in 1 page how many post we want to see
  console.log(posts,hasMore,totalpost)
  return (
    <div className='w-full px-4 sm:px-6 md:px-10 lg:px-20 py-10'>
       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cold-3 lg:grid-cols-4 gap-4'>
      {posts.map((item)=>(
        <Card key={item._id} item={item}/>
      ))}
    </div>
    {/* //if we have more data then button occur otherwise not */}
    {hasMore &&(
      <Button onClick={()=>
        setPage((prev)=>prev+1)
      }>Load More</Button> //load more data along with previous post
    )}
    </div>
  )
}

export default Home
