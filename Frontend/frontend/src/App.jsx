import  { useEffect } from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import LayOut from './LayOut'
import VerifyUser from './pages/VerifyUser'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './utils/userSlice'
import SearchPost from './pages/SearchPost'

function App() {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.user)
  useEffect(() => {
    if (!token) return
    const pay = JSON.parse(atob(token.split(".")[1]))
    if(pay.exp*100<Date.now()){
      dispatch(logout())
    }

  }, [token,dispatch])
  return (
    <div>
      <Routes>

        <Route element={<LayOut />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPost/>}/>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />



        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email/:verificationToken" element={<VerifyUser />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

      </Routes>

      <ToastContainer />
    </div>
  )
}

export default App
