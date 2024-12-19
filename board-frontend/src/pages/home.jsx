import { TextField, Button, Container, Typography, CircularProgress } from '@mui/material'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUserThunk } from '../features/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUserThunk } from '../features/authSlice'

const Home = ({ isAuthenticated, user }) => {
   const [email, setEmail] = useState('')
   const [nick, setNick] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [isSignupComplete, setIsSignupComplete] = useState(false)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { loading, error } = useSelector((state) => state.auth)

   const handleLogout = useCallback(() => {
      dispatch(logoutUserThunk())
         .unwrap()
         .then(() => {
            navigate('/') // 로그아웃 완료 후 메인페이지로 이동
         })
         .catch((error) => {
            alert(error)
         })
   }, [dispatch, navigate])

   const handleSignup = useCallback(() => {
      if (!email.trim() || !nick.trim() || !password.trim() || !confirmPassword.trim()) {
         alert('모든 필드 입력')
         return
      }

      if (password !== confirmPassword) {
         alert('비밀번호 불일치 ')
         return
      }

      dispatch(registerUserThunk({ email, nick, password }))
         .unwrap()
         .then(() => {
            setIsSignupComplete(true)
         })
         .catch((error) => {
            console.error('회원가입 에러', error)
         })
   }, [email, nick, password, confirmPassword, dispatch])

   if (isSignupComplete) {
      return (
         <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom align="center">
               회원가입이 완료되었습니다!
            </Typography>
            <p>
               <Link to="/Login">로그인</Link>
            </p>
         </Container>
      )
   }

   return (
      <Container maxWidth="sm">
         <Typography variant="h4" gutterBottom>
            회원가입
         </Typography>
         {error && (
            <Typography color="error" align="center">
               {error}
            </Typography>
         )}

         <TextField label="이메일" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />

         <TextField label="사용자 이름" variant="outlined" fullWidth margin="normal" value={nick} onChange={(e) => setNick(e.target.value)} />

         <TextField label="비밀번호" variant="outlined" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />

         <TextField label="비밀번호 확인" variant="outlined" type="password" fullWidth margin="normal" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

         <Button variant="contained" color="primary" onClick={handleSignup} fullWidth disabled={loading} style={{ marginTop: '20px' }}>
            {loading ? <CircularProgress size={24} /> : '회원가입'}
         </Button>
         {isAuthenticated ? (
            <>
               <Typography variant="body1" style={{ marginRight: '20px', color: 'black' }}>
                  {/* ?(optional chaining): 값이 undefined이거나 null일때 에러를 반환하지 않고 그냥 undifined를 반환 */}
                  {user?.nick}님
               </Typography>
               <Button onClick={handleLogout} variant="outlined">
                  로그아웃
               </Button>
            </>
         ) : (
            <Link to="/Login">로그인</Link>
         )}
         <Link to="/boards">게시판</Link>
      </Container>
   )
}

export default Home
