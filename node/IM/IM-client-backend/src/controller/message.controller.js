class MessageController {
  constructor() {}

  async loadRecentMessages(req, res) {
    await this.MessageService.loadRecentMessages()
  }

  async loadMessagesBySender(req, res) {
    await this.MessageService.loadMessagesBySender(req.params.senderId)
  }

  async saveMessage(req, res) {
    await this.MessageService.saveMessage(req.body)
  }
}

export default new MessageController