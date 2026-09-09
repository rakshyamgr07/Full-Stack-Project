import React from 'react'
import CreatePost from '../components/CreatePost'
import PostDetails from './PostDetails'

function Home() {
  return (
    <div>
      <CreatePost/>
      <PostDetails/>
    </div>
  )
}

export default Home
