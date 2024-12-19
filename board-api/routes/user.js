const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('./middlewares')
const User = require('../models/user')

// 사용자를 팔로우하는 라우트
router.post('/:id/follow', isLoggedIn, async(req, res))

module.exports = router
