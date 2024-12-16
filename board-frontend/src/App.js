import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/home'
import Login from './pages/login'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { checkAuthStatusThunk } from './features/authSlice'

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
      </Routes>
   )
}

export default App
