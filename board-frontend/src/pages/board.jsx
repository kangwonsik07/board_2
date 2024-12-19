import { Container, Typography, Pagination, Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { fetchBoardsThunk } from '../features/boardSilce'
import { Link } from 'react-router-dom'
import BoardItem from '../components/post/BoardItem'

const Board = ({ isAuthenticated, user }) => {
   const [page, setPage] = useState(1) // 현재 페이지
   const dispatch = useDispatch()
   const { boards, pagination, loading, error } = useSelector((state) => state.boards)
   console.log('isAuthenticatedboard:', isAuthenticated)
   console.log('user:', user)
   useEffect(() => {
      dispatch(fetchBoardsThunk(page))
   }, [dispatch, page])

   const handlePageChange = useCallback((event, value) => {
      setPage(value)
   }, [])

   return (
      <Container maxWidth="xs">
         <Link to="/boards/create">게시판 등록</Link>
         <Typography variant="h4" align="center" gutterBottom>
            Home Feed
         </Typography>

         {loading && (
            <Typography variant="body1" align="center">
               로딩 중...
            </Typography>
         )}

         {error && (
            <Typography variant="body1" align="center" color="error">
               에러 발생:{error}
            </Typography>
         )}

         {boards.length > 0 ? (
            <>
               {boards.map((board) => (
                  <BoardItem key={board.id} board={board} isAuthenticated={isAuthenticated} user={user} />
               ))}
               <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
                  <Pagination
                     count={pagination.totalPages} // 총페이지
                     page={page} // 현재 페이지
                     onChange={handlePageChange} //페이지를 변경할 함수
                  />
               </Stack>
            </>
         ) : (
            !loading && (
               <Typography variant="body1" align="center">
                  게시물이 없습니다.
               </Typography>
            )
         )}
      </Container>
   )
}

export default Board
