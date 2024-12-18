import { Container } from '@mui/material'
import BoardForm from '../components/post/BoardForm'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { createBoardThunk } from '../features/boardSilce'

const BoardCreatePage = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const handleSubmit = useCallback(
      (boardData) => {
         dispatch(createBoardThunk(boardData))
            .unwrap()
            .then(() => {
               navigate('/board')
            })
            .catch((error) => {
               console.error('게시물 등록 에러', error)
               alert('게시물 등록 실패', error)
            })
      },
      [dispatch, navigate]
   )

   return (
      <Container maxWidth="md">
         <h1>게시물 등록</h1>
         <BoardForm onSubmit={handleSubmit} />
      </Container>
   )
}

export default BoardCreatePage
