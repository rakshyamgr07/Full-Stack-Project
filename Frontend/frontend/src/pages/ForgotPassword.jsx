import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-hot-toast'
import axios from 'axios'
import Button from '../components/Button'

function ForgotPassword() {
  const navigator = useNavigate()
  const [email,setEmail]=useState("")
  const [loading, setLoading] = useState(false)
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/forgot-password`,{email})
      toast.success(res.data.message)
      navigator("/login")
    } catch (error) {
      toast.error(
        error.response?.data?.message
      );
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen  '>
      < div className="flex flex-col  shadow-xl m-2 p-2 rounded-lg mt-23 ">
        <div className='2'>
          <h1 className='text-green-700 text-2xl font-bold text-center text-3xl'>Forgot Password</h1>

        </div>
        <div className='flex flex-col gap-2 min-h-full  m-2 p-4 rounded-sm  w-sm'>
          {/* <h3 className='text-center font-bold text-lg text-green-900'>Register form</h3> */}
          <form onSubmit={handleSubmit} method="post" className='flex flex-col gap-5'>


            <label htmlFor="email" className='font-semibold'>Enter email address</label>
            <input type="email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              id="email" placeholder="example@example.com"
              required

              className="border border-gray-900 rounded-sm text-gray-700 p-2"
            />

            <Button type="submit" loading={loading} >Send Reset Link</Button>

            <p className="text-center flex justify-center gap-1">Remember Your Password?
              <a href="/login" className="hover:text-green-700  hover:underline hover:decoration-solid">Log in</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword