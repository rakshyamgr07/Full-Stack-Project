import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { toast } from 'react-hot-toast'
import axios from 'axios'
import Button from '../components/Button'

function ResetPassword() {
  const { token } = useParams()
  const navigator = useNavigate()
  const [form, setForm] = useState({
    password: "",
    cpassword: ""
  })
  const [loading, setLoading] = useState(false)
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/reset-password/${token}`,
        { newPassword: form.password }
      )
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
          <h1 className='text-green-700 text-2xl font-bold text-center text-3xl'>Reset Password</h1>
          <p className="text-gray-500 text-center mb-6">
            Create a new password for your account
          </p>
        </div>
        <div className='flex flex-col gap-2 min-h-full  m-2 p-4 rounded-sm  w-sm'>
          {/* <h3 className='text-center font-bold text-lg text-green-900'>Register form</h3> */}
          <form onSubmit={handleSubmit} method="post" className='flex flex-col gap-5'>


            <label htmlFor="password" className='font-semibold'>New Password</label>
            <input type="password"
              onChange={handleChange}
              value={form.password}
              name="password"
              id="password"
              placeholder="New Password"
              required
              className="border border-gray-900 rounded-sm text-gray-700 p-2"
            />

            <label htmlFor="cpassword" className='font-semibold'>Confirm New Password</label>
            <input type="password"
              onChange={handleChange}
              value={form.cpassword}
              name="cpassword"
              id="cpassword"
              placeholder="Re-type Password"
              required
              className="border border-gray-900 rounded-sm  text-gray-700 p-2"
            />
            <Button type="submit" loading={loading}>Reset Password</Button>

            <a href="/login" className="hover:text-green-700  hover:underline hover:decoration-solid text-center">Back to login</a>

          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword