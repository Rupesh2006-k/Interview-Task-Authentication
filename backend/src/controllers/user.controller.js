import env from '../config/env.js'
import UserModel from '../models/user.model.js'
import sendEmail from '../services/email.service.js'
import emailTemplate from '../utils/emailTemplate.js'
import generateToken from '../utils/generateToken.js'
import jwt from 'jsonwebtoken'

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // 1. Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })
    }

    // 2. Check if user exists
    const userExists = await UserModel.findOne({ email })
    if (userExists) {
      return res.status(409).json({
        success: false,
        message: 'User already exists'
      })
    }

    // 4. Create user
    const user = await UserModel.create({
      name,
      email,
      password
    })

    const token = generateToken({
      userId: user._id,
      secret: env.EMAIL_VERIFY_SECRET,
      exTime: '1h'
    })

    const verifyUrl = `${env.BASE_URL}/api/auth/verify-email?token=${token}`

    await sendEmail({
      sendTo: email,
      html: emailTemplate({
        name: user.name,
        url: verifyUrl
      })
    })

    return res.status(201).json({
      success: true,
      message: 'Registration successful. Please verify your email.'
    })
  } catch (error) {
    console.error('Register Error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

const verifyEmailController = async (req, res) => {
  try {
    const { token } = req.query

    console.log('Received token:', token)

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Verification token missing'
      })
    }

    // token decode
    let decoded
    try {
      decoded = jwt.verify(token, env.EMAIL_VERIFY_SECRET)
      console.log('Decoded token:', decoded)
    } catch (err) {
      console.log('JWT Error:', err.message)
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired token: ' + err.message
      })
    }

    // Find user first
    const user = await UserModel.findById(decoded._id)
    console.log('User found:', user)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    // Check if already verified
    if (user.isVerified) {
      return res.status(200).json({
        success: true,
        message: 'Email already verified. You can login.'
      })
    }

    // Update user
    user.isVerified = true
    await user.save()

    console.log('User after update:', user)

    return res.status(200).send(`
             <head>
               <title>Email Verified</title>
             </head>
             <body style=" margin:0; height:100vh; display:flex; align-items:center; justify-content:center; font-family:Arial, sans-serif; background:#0a0a0f; color:white;">
               <div style="text-align:center;">
                 <h1 style="color:#22c55e;">✅ Email Verified!</h1>
                 <p>Your email has been successfully verified.</p>
                 <a href="${env.FRONTEND_URL}/login"
                   style=" display:inline-block; margin-top:20px; padding:10px 20px; background:#22c55e; color:white; text-decoration:none; border-radius:6px; font-weight:bold;">
                   Go to Login →
                 </a>
               </div>
             </body>`)
  } catch (error) {
    console.error('Verify Email Error:', error)
    return res.status(400).json({
      success: false,
      message: 'Verification failed: ' + error.message
    })
  }
}

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      })
    }

    // 2. Find user

    const user = await UserModel.findOne({ email }).select('+password')
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    // 3. Check email verification
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: 'Please verify your email first'
      })
    }

    // 4. Compare password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    // 5. Generate JWT (LOGIN TOKEN)
    const token = generateToken({
      userId: user._id,
      secret: env.JWT_SECRET_KEY,
      exTime: '1d'
    })
    // ✅ Cookie + JSON dono
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000 // 1d
    })

    // 6. Send token in response (frontend stores in localStorage)
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token: token
    })
  } catch (error) {
    console.error('Login Error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error' + error.message
    })
  }
}

const profileController = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      })
    }

    const user = await UserModel.findById(req.user._id).select('-password')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Current user Profile',
      user
    })
  } catch (error) {
    console.error('Profile Error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

const logoutController = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'None'
    })

    return res.status(200).json({
      success: true,
      message: 'Logout successful'
    })
  } catch (error) {
    console.error('Logout Error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

export {
  registerController,
  verifyEmailController,
  loginController,
  profileController,
  logoutController
}
