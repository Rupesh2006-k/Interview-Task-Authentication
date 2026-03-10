import nodemailer from 'nodemailer'
import env from '../config/env.js'
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS
  }
})

const sendEmail = async ({ sendTo, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Authentication" <${env.EMAIL_USER}>`,
      to: sendTo,
      subject: 'Verify your email',
      html: html
    })

    return info
  } catch (error) {
    console.error('Email Error:', error)
  }
}

export default sendEmail
