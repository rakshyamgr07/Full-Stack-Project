import axios from 'axios'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

const VerifyUser = () => {
    const {verificationToken} = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
        async function handleSubmit(e) {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/verify-email/${verificationToken}`)
      toast.success(res.data.message)
      navigate("/login")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  handleSubmit()
  //eslint-disable-next-Line react-hook/exhaustive-deps

    },[verificationToken])
  return (
    <div>
      verify user
    </div>
  )
}

export default VerifyUser
