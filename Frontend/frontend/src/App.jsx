import { Routes, Route } from 'react-router-dom'
import './App.css'
import LayOut from './LayOut'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import VerifyUser from './pages/VerifyUser'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { logout } from './utils/userSlice'
import PostPage from './pages/PostPage'
import AddPost from './pages/AddPost'
import SearchPost from './pages/SearchPost'
import Comment from './pages/Comment'

function App() {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.user);
  useEffect(() => {
    if (!token) return
    const pay = JSON.parse(atob(token.split(".")[1]))
    if (pay.exp * 1000 < Date.now()) {
      dispatch(logout())
    }
  }, [token, dispatch])
  return (
    <>
      <Routes>

        <Route element={<LayOut/>}>
          <Route path="/" element={<Home />} />
          <Route path="/post/:postId" element={<PostPage />} />
          <Route path="/search" element={<SearchPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/edit-post/:postId" element={<AddPost />} />
          <Route path="/comment" element={<Comment/>} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email/:verificationToken" element={<VerifyUser />} />
        <Route path="/reset-email/:token" element={<ResetPassword />} />

      </Routes>
    </>
  )
}

export default App