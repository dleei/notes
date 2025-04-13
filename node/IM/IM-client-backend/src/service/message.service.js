class MessageService {
  constructor() {
    this.messages = []
  }

  async loadRecentMessages() {
    // 从文件中加载最近50条消息
  }

  async loadMessagesBySender(senderId) {
    // 依据发送者的 id 查找历史消息
  }

  async saveMessage(message) {
    // 保存消息到文件
  }
}

export default new MessageService()
