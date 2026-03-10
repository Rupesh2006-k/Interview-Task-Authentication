import express from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import {
  loginController,
  registerController,
  verifyEmailController,
  profileController,
  logoutController
} from '../controllers/user.controller.js'

let userRoutes = express.Router()

userRoutes.post('/register', registerController)
userRoutes.get('/verify-email', verifyEmailController)
userRoutes.post('/login', loginController)

userRoutes.post('/logout', authMiddleware, logoutController)

userRoutes.get('/profile', authMiddleware, profileController)

export default userRoutes
