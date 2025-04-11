import express, { static as expressStatic } from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import { SERVER_PORT } from './config/index.js'
import router from './router/index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()

const httpServer = createServer(app)

app.use(expressStatic(join(__dirname, 'static')))

app.use(router)

const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})

io.on('connection', socket => {
  console.log(`一位靓仔上线了,ID is ${socket.id}`)
  
  socket.emit('welcome', `欢迎来到聊天室,你的ID是${socket.id}`)
})

httpServer.listen(SERVER_PORT, () => {
  console.log(`Server is running on http://localhost:${SERVER_PORT}`)
})
