import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import healthRoute from './health/routes'
import productRoute from './product/routes'
import authRoutes from './auth/routes'
import { rateLimit } from './ratelimit/middlewares'
import { authenticate } from './auth/middlewares'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

app.use('/', healthRoute)
// TODO revise this. authenticate and rateLimit via route
// ie: GET is OK for public, CUD/ for admins
// app.use('/products', rateLimit, authenticate, productRoute)

app.use('/products', productRoute)
app.use('/auth', authRoutes)

app.use('/static', express.static('s3/public'))

// TODO: winston or another logger
const server = async () => {
  try {
    await mongoose.connect('mongodb://root:example@127.0.0.1:27017')
    console.log(
      `📄 MongoDB connected on: ${
        process.env.MONGO_URL || 'mongodb://127.0.0.1:27017'
      }`
    )
  } catch (err) {
    console.error('MongoDB connection failed')
    console.error(err)
    throw err
  }

  app.listen(port, () => {
    console.log(`🚀 App running on port:: ${port}`)
  })
}

export { server }
