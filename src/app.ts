import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import * as middlewares from './middlewares'
import api from './api'
import MessageResponse from './interfaces/MessageResponse'

import { WithId } from 'mongodb'
import { User } from './api/user/user.model'

declare global {
  namespace Express {
    interface Request {
      user?: WithId<User>
    }
  }
}

require('dotenv').config()

const app = express()

app.use(cookieParser())
app.use(morgan('dev'))
app.use(helmet())
app.use(
  cors({
    origin: [process.env.FRONTEND_URI || 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
)
app.use(express.json())

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  })
})

app.use('/api/v1', api)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

export default app
