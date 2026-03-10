import jwt from 'jsonwebtoken'
import env from '../config/env.js'

const generateToken = ({ userId, secret ,exTime}) => {
  return jwt.sign({ _id: userId }, secret, { expiresIn: exTime })
}

export default generateToken
