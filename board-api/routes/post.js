const express = require('express')
const multer = require('multer')
const path = require('path')
const { Board, Hashtag, User } = require('../models')
const { isLoggedIn } = require('./middlewares')
const fs = require('fs')
const router = express.Router()

// uploads폴더가 없을경우 새로 생성
try {
   fs.readdirSync('uploads') //폴더 있는지 확인
} catch (error) {
   console.log('uploads 폴더가 없어 uploads 폴더 생성')
   fs.mkdirSync('uploads') //폴더생성
}

const upload = multer({
   storage: multer.diskStorage({
      destination(req, res, cb) {
         cb(null, 'uploads/')
      },
      filename(req, file, cb) {
         const ext = path.extname(file.originalname)

         cb(null, path.basename(file.originalname, ext) + Date.now() + ext)
      },
   }),

   limits: { fileSize: 5 * 1024 * 1024 },
})

// 게시물 등록
router.post('/', isLoggedIn, upload.single('img'), async (req, res) => {
   try {
      if (!req.file) {
         return res.status(400).json({ success: false, message: '파일 업로드 실패' })
      }

      const board = await Board.create({
         content: req.body.content,
         img: `${req.file.filename}`,
         UserId: req.user.id,
      })

      res.json({
         success: true,
         board: {
            id: board.id,
            content: board.content,
            img: board.img,
            UserId: board.UserId,
         },
         message: '게시물이 성공적으로 등록되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물 등록 중 오류가 발생했습니다.', error })
   }
})

// 게시물 수정
router.put('/:id', isLoggedIn, upload.single('img'), async (req, res) => {
   try {
      const board = await Board.findOne({ where: { id: req.params.id, UserId: req.params.id } })
      if (!board) {
         return res.status(404).json({ success: false, message: '게시물을 찾을 수 없습니다.' })
      }

      await board.update({
         content: req.body.content, // 수정된 내용
         img: req.file ? `/${req.file.filename}` : board.img, // 수정된 이미지 파일이 있으면 교체 없으면 기존 값 유지
      })

      const updateboard = await Board.findOne({
         where: { id: req.params.id },
         // user와 hashtag 테이블의 칼럼 값을 포함해서 가져옴
         include: [
            {
               model: User,
               attributes: ['id', 'nick'], // user테이블의 id, nick 칼럼 값만 가져옴
            },
            {
               model: Hashtag,
               attributes: ['title'], // hashtags테이블 title 칼럼 값만 가져옴
            },
         ],
      })

      res.json({
         success: true,
         board: updateboard,
         message: '게시물이 성공적으로 수정되었습니다. ',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물 수정 중 오류가 발생했습니다.', error })
   }
})

//게시물 삭제
router.delete('/:id', isLoggedIn, async (req, res) => {
   try {
      //삭제할 게시물 존재여부 확인
      const board = await Board.findOne({ where: { id: req.params.id, UserId: req.user.id } })
      if (!Board) {
         return res.status(404).json({ success: false, message: '게시물을 찾을 수 없음' })
      }

      await board.destroy()

      res.json({
         success: true,
         message: '게시물 삭제 완료',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물 삭제 중 오류가 발생했습니다.', error })
   }
})

// 특정 게시물 불러오기
router.get('/:id', async (req, res) => {
   try {
      const board = await Board.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: User,
               attributes: ['id', 'nick'],
            },
            {
               model: Hashtag,
               attributes: ['tatle'],
            },
         ],
      })

      if (!board) {
         return res.status(404).json({ success: false, message: '게시물을 찾을 수 없음' })
      }

      res.json({
         success: true,
         board,
         message: '게시물 불러오기 완료',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물 불러오는 중 오류가 발생했습니다.', error })
   }
})

module.exports = router
