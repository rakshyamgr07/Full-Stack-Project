import React from 'react'
import { useState } from 'react'

function CommentForm() {
  const [comment,setComment] = useState("")
  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(comment)
    setComment("")

  }
  return (
    <div >
      <form onSubmit={handleSubmit}
      className='flex gap-4'>


        <input type="text"
        value={comment}
        placeholder='Write a comment....'
        onChange={(e)=>setComment(e.target.value)}
        className='shadow-md rounded-sm p-2 '
         />

         <button type="submit"
         className='bg-gray-300 p-2 rounded-sm hover:bg-gray-400 transition duration-300 hover:scale-105 
         font-semibold hover:cursor-pointer'>Add Comment</button>
      </form>
    </div>
  )
}

export default CommentForm
