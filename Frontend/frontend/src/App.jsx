import { Routes, Route, Navigate } from 'react-router-dom'
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
import Account from './pages/Account'

function ProtectedRoute({ children }) {
  const { token } = useSelector((state) => state.user)
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}
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

        <Route element={<LayOut />}>

          <Route path="/" element={<ProtectedRoute>
            <Home />
          </ProtectedRoute>} />

          <Route path="/post/:postId" element={<ProtectedRoute>
            <PostPage />
          </ProtectedRoute>} />

          <Route path="/search" element={<ProtectedRoute>
            <SearchPost />
          </ProtectedRoute>} />

          <Route path="/add-post" element={<ProtectedRoute>
            <AddPost />
          </ProtectedRoute>} />
          <Route path="/edit-post/:postId" element={<ProtectedRoute>
            <AddPost />
          </ProtectedRoute>} />
          <Route path="/comment" element={<ProtectedRoute>
            <Comment />
          </ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute>
            <Account />
          </ProtectedRoute>} />

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