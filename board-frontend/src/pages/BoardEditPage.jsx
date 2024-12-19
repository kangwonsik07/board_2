import { Container } from '@mui/material'
import BoardForm from '../components/post/BoardForm'
import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoardByIdThunk, updateBoardThunk } from '../features/boardSilce'

const PostEditPage = () => {
   const { id } = useParams() // board의 id
   const dispatch = useDispatch()
   const { board, loading, error } = useSelector((state) => state.boards)
   console.log('userid:', id)
   useEffect(() => {
      dispatch(fetchBoardByIdThunk(id))
   }, [dispatch, id])

   // 게시물 수정
   const handleSubmit = useCallback(
      (boardData) => {
         dispatch(updateBoardThunk({ id, boardData }))
            .unwrap()
            .then(() => {
               window.location.href = '/boards'
            })
            .catch((error) => {
               console.error('게시물 수정 중 오류 발생:', error)
               alert('게시물 수정에 실패했습니다.', error)
            })
      },
      [dispatch, id]
   )

   if (loading) return <p>로딩중...</p>
   if (error) return <p>에러 발생:{error}</p>

   return (
      <Container maxWidth="md">
         <h1>게시물 수정</h1>
         {board && <BoardForm onSubmit={handleSubmit} initialValues={board} />}
      </Container>
   )
}

export default PostEditPage
