class MessagesService {
    constructor(messagesRepository) {
        this.messagesRepository = messagesRepository;
    }

    async createMessage(message) {
        return await this.messagesRepository.createMessage(message);
    }

    async getMessagesByConversationId(conversationId) {
        return await this.messagesRepository.getMessagesByConversationId(
            conversationId
        );
    }

    // async deleteMessage(messageId) {
    //     return await this.messagesRepository.deleteMessage(messageId);
    // }

    // async updateMessage(messageId, updates) {
    //     return await this.messagesRepository.updateMessage(messageId, updates);
    // }
}

export default MessagesService;
