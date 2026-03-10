import dotenv from 'dotenv'
dotenv.config()

const requiredEnvVars = [
  'PORT',
  'FRONTEND_URL',
  'MONGO_URI',
  'EMAIL_PASS',
  'EMAIL_USER',
  'JWT_SECRET_KEY',
  'FRONTEND_URL',
  'BASE_URL',
  'EMAIL_VERIFY_SECRET'
]

const missing = requiredEnvVars.filter(key => !process.env[key])

if (missing.length > 0) {
  console.error('❌ Missing env variables:', missing.join(', '))
  process.exit(1)
}

console.log('✅ All env variables loaded')

const env = {
  PORT: process.env.PORT,
  FRONTEND_URL: process.env.FRONTEND_URL,
  MONGO_URI: process.env.MONGO_URI,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  BASE_URL: process.env.BASE_URL,
  EMAIL_VERIFY_SECRET: process.env.EMAIL_VERIFY_SECRET
}

export default env
