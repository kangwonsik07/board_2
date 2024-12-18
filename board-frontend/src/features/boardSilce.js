import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createBoard, updateBoard, deleteBoard, getBoardById, getBoards } from '../api/boardApi'

//게시물 등록 thunk
export const createBoardThunk = createAsyncThunk('board/createBoard', async (boardData, { rejectWithValue }) => {
   try {
      const response = await createBoard(boardData)
      return response.data.board
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 등록 실패')
   }
})

//전체 게시물 가져오기

export const fetchBoardsThunk = createAsyncThunk('boards/fetchBoards', async (page, { rejectWithValue }) => {
   try {
      const response = await getBoards(page)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 리스트 불러오기 실패')
   }
})

const boardSlice = createSlice({
   name: 'boards',
   initialState: {
      boards: [],
      board: null,
      pagination: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      //게시물 등록
      builder
         .addCase(createBoardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createBoardThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(createBoardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      builder
         .addCase(fetchBoardsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchBoardsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.boards = action.payload.boards
            state.pagination = action.payload.pagination
         })
         .addCase(fetchBoardsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default boardSlice.reducer
