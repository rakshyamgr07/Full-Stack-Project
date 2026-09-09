import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { login } from "../utils/userSlice";

function Login() {
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const [form, setForm] = useState({
    email: "",
    password: ""
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
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`,form)
      toast.success(res.data.message)
      dispatch(login())
      // localStorage.setItem("user",res.data.user.token)
      navigator("/")
    } catch (error) {
      toast.error(error.response.data.message)
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen ">

      <div className="flex flex-col gap-3 shadow-xl m-4 p-4 rounded-lg">
        <div className="flex flex-col text-center  ">
          <h1 className="text-blue-600 text-2xl font-bold text-3xl m-4">
            Login
          </h1>
        </div>

        <div className="flex flex-col gap-4  p-5 bg-white rounded-sm w-sm">
          <h3 className="font-bold text-xl md:text-3xl text-blue- flex flex-col gap-2 ">Welcome back!
            <p className="text-sm text-gray-500 font-semibold">Sign into your account </p>
          </h3>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-sm"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className='font-semibold'>Email</label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@example.com"
              value={form.email}
              onChange={handleChange}
              className="border border-gray-900 rounded-sm  p-2 text-gray-700"
            />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className='font-semibold'>Password</label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="border border-gray-900 rounded-sm text-gray-700 p-2"

            />
            <a href="/forgot-password" className=" text-sm hover:text-blue-800  hover:underline hover:decoration-solid">Forgot password?</a>
            </div>

          <Button type="submit" loading={loading}>Login</Button>
           
            <p className="text-center flex justify-center gap-1">Don't have an account?
              <a href="/register" className="hover:text-blue-800  hover:underline hover:decoration-solid">Sign Up</a>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
//account delete rw logout