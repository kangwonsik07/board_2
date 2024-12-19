const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('./middlewares')
const User = require('../models/user')

// 내 프로필 조회
router.get('/profile', isLoggedIn, async (req, res) => {
   res.json({
      success: true,
      user: req.user,
      message: '프로필 정보를 성공적으로 가져왔습니다.',
   })
})

// 특정 프로필 조회
router.get('/profile/:id', isLoggedIn, async (req, res) => {
   try {
      const userId = req.params.id
      const user = await User.findOne({
         where: { id: userId },
         attributes: ['id', 'nick', 'email', 'createdAt', 'updatedAt'],
         include: [
            {
               model: User,
               as: 'Followers',
               attributes: ['id', 'nick', 'email'],
            },
            {
               model: User,
               as: 'Followings',
               attributes: ['id', 'nick', 'email'],
            },
         ],
      })

      if (!user) {
         return res.status(400).json({
            success: false,
            message: '사용자를 찾을수 없음',
         })
      }

      res.json({
         success: true,
         user,
         message: '프로필 정보를 성공적으로 가져옴',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '특정 사용자 정보를 불러오는 중 오류가 발생했습니다.', error })
   }
})

module.exports = router
