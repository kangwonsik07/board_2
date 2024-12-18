import React, { useState, useCallback, useMemo } from 'react'
import { TextField, Button, Box } from '@mui/material'

// 등록, 수정 폼 컴포넌트
const BoardForm = ({ onSubmit, initialValues = {} }) => {
   // const [imgUrl, setImgUrl] = useState(initialValues.img ? process.env.REACT_APP_API_URL + initialValues.img : '') // 이미지 경로(파일명 포함)
   const [imgUrl, setImgUrl] = useState('')
   const [imgFile, setImgFile] = useState(null) // 이미지 파일 객체
   const [content, setContent] = useState('') // 게시물 내용

   // 이미지 파일 미리보기
   const handleImageChange = useCallback((e) => {
      /* 
       e.target.files는 없로드한 파일 객체를 배열형태로 가져온다
       File1, File2....파일 객체는 업로드한 파일의 정보들이 들어있다
       e.target.files = [File1, File2, File3]

       우리는 하나의 파일만 업로드 하므로 
       e.target.files = [File1]

       */

      // e.target.files가 있으면 첫번째 파일 객체를 가져온다
      const file = e.target.files && e.target.files[0]
      if (!file) return // 파일이 없을경우 함수 종료

      setImgFile(file) // 업로드한 파일 객체를 state에 저장

      const reader = new FileReader() // 파일을 비동기적으로 읽을 수 있도록 해주는 객체 -> 이미지 미리보기 or 텍스트 파일 읽기 등에 주로 사용

      // dog.jpg => data.imege/jpg;base64,idasdfsadfasdfef...
      reader.readAsDataURL(file) // 업로드한 파일을 Base64 URL로 변환(이미지 미리보기에 주로 사용)

      // onload(): 파일을 성공적으로 읽은 후에 실행되는 함수
      reader.onload = (event) => {
         setImgUrl(event.target.result) //data.imege/jpg;base64,idasdfsadfasdfef...(Base64 URL로 변환된 형태의 이미지 URL이 들어있음)
      }
   }, [])

   // 작성한 내용 전송
   const handleSubmit = useCallback(
      (e) => {
         e.preventDefault()

         if (!content.trim()) {
            alert('내용을 입력하세요.')
            return
         }

         if (!imgFile) {
            alert('이미지 파일을 추가하세요.')
            return
         }

         const formData = new FormData() // 폼데이터를 쉽게 생성하고 전송할 수 있도록 하는 객체
         formData.append('content', content) // 게시물 내용 추가

         formData.append('img', imgFile) // 이미지 파일 추가

         // PostCreatePage.jsx의 handleSubmit()함수를 실행시킴
         onSubmit(formData) // formData 객체 전송
      },
      [content, imgFile, onSubmit]
   )

   return (
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} encType="multipart/form-data">
         {/* 이미지 업로드 필드 */}
         <Button variant="contained" component="label">
            이미지 업로드
            <input type="file" name="img" accept="image/*" hidden onChange={handleImageChange} />
         </Button>

         {imgUrl && (
            <Box mt={2}>
               <img src={imgUrl} alt="업로드 이미지 미리보기" style={{ width: '400px' }} />
            </Box>
         )}

         {/* 게시물 내용 입력 필드 */}
         <TextField label="게시물 내용" variant="outlined" fullWidth multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)} sx={{ mt: 2 }} />

         {/* 등록 / 수정 버튼 */}
         <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            {/* {submitButtonLabel} */}
            등록
         </Button>
      </Box>
   )
}

export default BoardForm
