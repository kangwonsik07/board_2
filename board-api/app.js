const express = require('express')
const path = require('path')
const morgan = require('morgan')
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')

const authRouter = require('./routes/auth')
const { sequelize } = require('./models')
const passportConfig = require('./passport')
const boardRotuer = require('./routes/board')

const app = express()
app.set('port', process.env.PORT || 8002)
passportConfig()

sequelize
   .sync({ force: false }) // 기존 테이블을 초기화 할지 여부-> 초기화 X
   .then(() => {
      console.log('데이터베이스 연결 성공')
   })
   .catch((err) => {
      console.error(`데이터 베이스 연결 실패: ${err}`)
   })

app.use(
   cors({
      origin: 'http://localhost:3000', // 특정 주소만 request 허용
      credentials: true, // 쿠키, 세션 등 인증 정보 허용
   })
)
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
   session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.COOKIE_SECRET,
      cookie: {
         httpOnly: true,
         secure: false,
      },
   })
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/', authRouter)
app.use('/board', boardRotuer)

app.use((req, res, next) => {
   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
   error.status = 404
   next(error)
})

//에러 미들웨어
app.use((err, req, res, next) => {
   const statusCode = err.status || 500
   const errorMessage = err.message || '서버 내부 오류'
   res.status(statusCode).json({
      success: false,
      message: errorMessage,
      error: err,
   })
})

app.options('*', cors())
app.listen(app.get('port'), () => {
   console.log(app.get('port'), '번 포트에서 대기중')
})
