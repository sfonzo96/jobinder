class ConversationsService {
    constructor(conversationsRepository) {
        this.conversationsRepository = conversationsRepository;
    }

    async createConversation(conversation) {
        return await this.conversationsRepository.createConversation(
            conversation
        );
    }

    async getConversationsByUserId(userId) {
        return this.conversationsRepository.getConversationsByUserId(userId);
    }

    async setLastMessage(conversationId, message) {
        return await this.conversationsRepository.setLastMessage(
            conversationId,
            message
        );
    }
    // async deleteConversation(conversationId) {
    //     return this.conversationsRepository.deleteConversation(conversationId);
    // }
}

export default ConversationsService;
