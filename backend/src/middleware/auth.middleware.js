import jwt from 'jsonwebtoken'
import env from '../config/env.js'

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        message: 'Token not provided',
        success: false
      })
    }

    const decoded = jwt.verify(token, env.JWT_SECRET_KEY)

    req.user = decoded

    next()
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token',
      success: false
    })
  }
}

export default authMiddleware
