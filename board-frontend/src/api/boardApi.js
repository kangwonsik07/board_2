import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL

const boardApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json',
   },
   withCredentials: true, // 세션 쿠키를 요청에 포함
})

export const registerUser = async (userData) => {
   // userData: 회원가입 창에서 입력한 데이터
   try {
      const response = await boardApi.post('/', userData)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error // request 할때 오류 발생시 에러를 registerUser()함수를 실행한 곳으로 던짐
   }
}

export const loginUser = async (credentials) => {
   try {
      const response = await boardApi.post('/login', credentials)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error // request 할때 오류 발생시 에러를 registerUser()함수를 실행한 곳으로 던짐
   }
}

// 로그아웃
export const logoutUser = async () => {
   try {
      const response = await boardApi.get('/logout')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error // request 할때 오류 발생시 에러를 registerUser()함수를 실행한 곳으로 던짐
   }
}

// 로그인 상태확인
export const checkAuthStatus = async () => {
   try {
      const response = await boardApi.get('/status')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 보드 등록
export const createBoard = async (boardData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data', // 데이터 형식 지정 , 파일 정송시 반드시 지정
         },
      }

      const response = await boardApi.post('/board', boardData, config)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 보드 수정

export const updateBoard = async (id, boardData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data', // 데이터 형식 지정 , 파일 정송시 반드시 지정
         },
      }

      const response = await boardApi.put(`/board/${id}`, boardData, config)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 보드 삭제
export const deleteBoard = async (id) => {
   try {
      const response = await boardApi.delete(`/board/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 특정 보드 가져오기
export const getBoardById = async (id) => {
   try {
      const response = await boardApi.get(`/board/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 전체 보드 가져오기(페이징)
export const getBoards = async (page) => {
   try {
      const response = await boardApi.get(`/board?page=${page}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
