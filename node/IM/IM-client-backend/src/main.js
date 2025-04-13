import { static as expressStatic } from 'express'
import app from './app/index.js'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import fs from 'node:fs'
import readline from 'node:readline'
import { SERVER_PORT } from './config/index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, 'data')
const MESSAGES_FILE = join(DATA_DIR, 'message.jsonl')

// 设置静态文件目录
app.use(expressStatic(join(__dirname, 'public')))

const httpServer = createServer(app)
// 初始化数据目录
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// 创建可写流（追加模式）
const messageStream = fs.createWriteStream(MESSAGES_FILE, {
  flags: 'a+', // 追加模式
  encoding: 'utf8',
})

// 错误处理
messageStream.on('error', err => {
  console.error('写入流错误:', err)
})

// 读取历史消息的异步生成器
async function* readMessages() {
  if (!fs.existsSync(MESSAGES_FILE)) return

  const fileStream = fs.createReadStream(MESSAGES_FILE, 'utf8')

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  for await (const line of rl) {
    try {
      yield JSON.parse(line)
    } catch (err) {
      console.error('解析消息失败:', err)
    }
  }
}

// 加载所有最近50条消息
const loadRecentMessages = async () => {
  const messages = []
  try {
    for await (const msg of readMessages()) {
      messages.push(msg)
      // 保留最后50条
      if (messages.length > 50) messages.shift()
    }
  } catch (err) {
    console.error('读取历史消息失败:', err)
  }
  return messages
}

// 依据发送者的 id 查找历史消息
const loadMessagesBySender = async (senderId) => {
  const messages = []
  try {
    for await (const msg of readMessages()) {
      if (msg.senderId === senderId) {
        messages.push(msg)
      }
    }
  } catch (err) {
    console.error('读取历史消息失败:', err)
  }
  return messages
}



const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
})

io.on('connection', async socket => {

  // 发送欢迎信息和历史消息
  socket.emit('welcome', {
    id: socket.id,
    message: `欢迎进入聊天室，你的ID是 ${socket.id}`,
    history: await loadRecentMessages(),
  })

  // 处理新消息
  socket.on('chatMessage', msg => {
    try {
      const message = {
        ...msg,
        id: `${socket.id}-${Date.now()}`,
        timestamp: Date.now(),
      }

      // 写入流（自动追加换行符）
      messageStream.write(JSON.stringify(message) + '\n')

      // 广播消息
      io.emit('newMessage', message)
    } catch (err) {
      console.error('消息处理失败:', err)
      socket.emit('error', '消息处理失败')
    }
  })

  // 断开连接处理
  socket.on('disconnect', () => {
    console.log(`用户断开: ${socket.id}`)
  })
})

// 优雅关闭
process.on('SIGINT', () => {
  messageStream.end(() => {
    console.log('消息流已安全关闭')
    process.exit()
  })
})

httpServer.listen(SERVER_PORT, () => {
  console.log(`Server is running on http://localhost:${SERVER_PORT}`)
})
