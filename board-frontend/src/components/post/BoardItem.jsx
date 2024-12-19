import { Card, CardMedia, CardContent, Typography, Box, CardActions, Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs' //날짜 시간 포맷해주는 패키지
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBoardThunk } from '../../features/boardSilce'

const BoardItem = ({ board, isAuthenticated, user }) => {
   const dispatch = useDispatch()
   //게시물 삭제 실행
   const onClickDelete = useCallback(
      (id) => {
         dispatch(deleteBoardThunk(id))
            .unwrap()
            .then(() => {
               window.location.href = '/boards'
            })
            .catch((error) => {
               console.error('게시물 삭제 중 오류 발생:', error)
               alert('게시물 삭제에 실패했습니다.', error)
            })
      },
      [dispatch]
   )

   return (
      <Card style={{ margin: '20px 0' }}>
         <CardMedia sx={{ height: 240 }} image={`${process.env.REACT_APP_API_URL}/${board.img}`} title={board.content} />
         <CardContent>
            <Link to={`/my/${board.User.id}`} style={{ textDecoration: 'none' }}>
               <Typography sx={{ color: 'primary.main' }}>@{board.User.nick} </Typography>
            </Link>
            <Typography>{dayjs(board.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Typography>
            <Typography>{board.content}</Typography>
         </CardContent>
         <CardActions>
            <Button size="small" color="primary">
               <FavoriteBorderIcon fontSize="small" />
            </Button>
            {/* isAuthenticated가 true 이면서 post.User.id와 user.id가 같을때 렌더링 => 내가 작성한 게시글만 수정, 삭제 */}
            {/* 로그인한 상태 이면서 로그인한 사람과 글을 작성한 사람이 같으면 렌더링 */}
            {isAuthenticated && board.User.id === user.id && (
               <Box sx={{ p: 2 }}>
                  <Link to={`/boards/edit/${board.id}`}>
                     <IconButton aria-label="edit" size="small">
                        <EditIcon fontSize="small" />
                     </IconButton>
                  </Link>
                  <IconButton aria-label="delete" size="small" onClick={() => onClickDelete(board.id)}>
                     <DeleteIcon fontSize="small" />
                  </IconButton>
               </Box>
            )}
         </CardActions>
      </Card>
   )
}

export default BoardItem
