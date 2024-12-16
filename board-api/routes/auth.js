const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const User = require('../models/user')
const router = express.Router()
const { isLoggedIn, isNotLoggenIn } = require('./middlewares')

router.post('/', isNotLoggenIn, async (req, res, next) => {
   const { email, nick, password } = req.body
   try {
      const exUser = await User.findOne({ where: { email } })
      if (exUser) {
         return res.status(409).json({
            success: false,
            message: '이미 존재하는 사용자 입니다',
         })
      }

      const hash = await bcrypt.hash(password, 12)

      const newUser = await User.create({
         email,
         nick,
         password: hash,
      })

      res.status(201).json({
         success: true,
         message: '사용자가 성공적으로 등록되었습니다',
         user: {
            id: newUser.id,
            email: newUser.email,
            nick: newUser.nuck,
         },
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '회원가입중 오류',
         error,
      })
   }
})

router.post('/login', isNotLoggenIn, async (req, res, next) => {
   passport.authenticate('local', (authError, user, info) => {
      if (authError) {
         return res.status(500).json({ success: false, message: '인증 주 오류 발생', error: authError })
      }

      if (!user) {
         return res.status(401).json({
            success: false,
            message: info.message || '로그인 실패',
         })
      }

      req.login(user, (loginError) => {
         if (loginError) {
            return res.status(500).json({ success: false, message: '로그인 중 오류 발생', error: loginError })
         }

         res.json({
            success: true,
            message: '로그인 성공',
            user: {
               id: user.id,
               nick: user.nick,
            },
         })
      })
   })(req, res, next)
})

router.get('/logout', isLoggedIn, async (req, res, next) => {
   req.logout((err) => {
      if (err) {
         console.log(err)
         return res.status(500).json({
            success: false,
            message: '로그아웃 중 오류가 발생했습니다.',
            error: err,
         })
      }

      res.json({
         success: true,
         message: '로그아웃에 성공했습니다.',
      })
   })
})

router.get('/status', async (req, res, next) => {
   if (req.isAuthenticated()) {
      res.json({
         isAuthenticated: true,
         user: {
            id: req.user.id,
            nick: req.user.nick,
         },
      })
   } else {
      res.json({
         isAuthenticated: false,
      })
   }
})

module.exports = router
