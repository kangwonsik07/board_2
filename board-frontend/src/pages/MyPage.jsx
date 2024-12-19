import MyProfile from '../components/page/MyProfile'
import { Container } from '@mui/material'

const MyPage = ({ auth }) => {
   return (
      <Container maxWidth="md">
         <h1>MyFeed</h1>
         <MyProfile auth={auth} />
      </Container>
   )
}

export default MyPage
