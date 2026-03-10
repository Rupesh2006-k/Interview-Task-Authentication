import app from './src/app.js'
import env from './src/config/env.js'
import connectDB from './src/db/connectDB.js'

;(async () => {
  try {
    await connectDB()

    app.listen(env.PORT, () => {
      console.log(`🚀 Server running on port ${env.PORT}`)
    })

  } catch (error) {
    console.error("❌ Failed to start server:", error.message)
    process.exit(1)
  }
})()