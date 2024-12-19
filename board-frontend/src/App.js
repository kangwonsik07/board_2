import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/home'
import Login from './pages/login'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { checkAuthStatusThunk } from './features/authSlice'
import Board from './pages/board'
import BoardCreatePage from './pages/BoardCreatePage'
import BoardEditPage from './pages/BoardEditPage'
import MyPage from './pages/MyPage'

function App() {
   const dispatch = useDispatch()
   const { isAuthenticated, user } = useSelector((state) => state.auth)

   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])
   console.log('appisAuthenticated', isAuthenticated)

   return (
      <Routes>
         <Route path="/" element={<Home isAuthenticated={isAuthenticated} user={user} />} />
         <Route path="/Login" element={<Login />} />
         <Route path="/boards" element={<Board isAuthenticated={isAuthenticated} user={user} />} />
         <Route path="boards/create" element={<BoardCreatePage />} />
         <Route path="boards/edit/:id" element={<BoardEditPage />} />
         <Route path="/my/" element={<MyPage auth={user} />} />
         <Route path="/my/:id" element={<MyPage auth={user} />} />
      </Routes>
   )
}

export default App
