import  { useState } from 'react'
import  { useNavigate } from 'react-router-dom'

import { toast } from 'react-hot-toast'
import axios from 'axios'
import Button from '../components/Button'

function Register() {
  const navigator = useNavigate()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  })
  const [loading,setLoading]=useState(false)
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
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user`,form)
      toast.success(res.data.message)
      navigator("/login")
    } catch (error) {
      toast.error(error.response.data.message)
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen  '>
      < div className="flex flex-col  shadow-xl m-2 p-2 rounded-lg mt-23 ">
        <div className='2'>
        <h1 className='text-green-700 text-2xl font-bold text-center text-3xl'>Register</h1>

      </div>
      <div className='flex flex-col gap-2 min-h-full  m-2 p-4 rounded-sm  w-sm'>
        {/* <h3 className='text-center font-bold text-lg text-green-900'>Register form</h3> */}
        <form onSubmit={handleSubmit} method="post" className='flex flex-col gap-5'>

          <label htmlFor="name" className='font-semibold'>Name</label>
          <input type="text"
            onChange={handleChange}
            value={form.name}
            name="name"
            id="name"
            placeholder="eg. John Doe "
              required

            className="border border-gray-900 rounded-sm text-gray-700 p-2"
          />

          <label htmlFor="email" className='font-semibold'>Email</label>
          <input type="email"
            onChange={handleChange}
            value={form.email}
            name="email"
            id="email" placeholder="example@example.com"
              required

            className="border border-gray-900 rounded-sm text-gray-700 p-2"
          />

          <label htmlFor="password" className='font-semibold'>Password</label>
          <input type="password"
            onChange={handleChange}
            value={form.password}
            name="password"
            id="password"
            placeholder="Password"
              required
            className="border border-gray-900 rounded-sm text-gray-700 p-2"
          />

          <label htmlFor="cpassword" className='font-semibold'>Confirm Password</label>
          <input type="password"
            onChange={handleChange}
            value={form.cpassword}
            name="cpassword"
            id="cpassword"
            placeholder="Re-type Password"
              required
            className="border border-gray-900 rounded-sm  text-gray-700 p-2"
          />
          {/* <button
            type="submit"
            className="  bg-green-700 p-2 rounded  not-italic
            text-white font-semibold transition duration-300 hover:scale-105 hover:bg-green-800"
          >
            {loading?"Loading.....":"Register"}
          </button> */}
          <Button type="submit" loading={loading}>Register</Button>

          <p className="text-center flex justify-center gap-1">Already have an account?
              <a href="/login" className="hover:text-green-700  hover:underline hover:decoration-solid">Log in</a>
            </p>
        </form>
      </div>
      </div>
    </div>
  )
}

export default Register
//forgot and register password design garne