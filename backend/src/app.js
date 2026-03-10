import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import env from './config/env.js'
import userRoutes from './routes/user.routes.js'

const app = express()
// 🔐 Security headers
app.use(
  helmet({
    contentSecurityPolicy: false
  })
)

// 📝 Logger
app.use(morgan('dev'))

// 📦 Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 🍪 Cookie parser
app.use(cookieParser())

// 🌍 CORS
app.use(
  cors({
      credentials: true,
    origin:env.FRONTEND_URL
  })
)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/auth', userRoutes)



export default app
