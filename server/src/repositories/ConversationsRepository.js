class ConversationsRepository {
    constructor(conversationModel) {
        this.conversationModel = conversationModel;
    }

    async createConversation(conversation) {
        // conversation.participants = conversation.participants.sort(); // en pre middleware modelo
        return await this.conversationModel.create(conversation);
    }

    async getConversationsByUserId(userId) {
        const conversations = await this.conversationModel
            .find({
                participants: userId,
            })
            .populate({ path: "participants", select: "name" })
            .lean();

        return conversations;
    }

    async setLastMessage(conversationId, message) {
        return await this.conversationModel.updateOne(
            { _id: conversationId },
            { lastMessage: message }
        );
    }

    async deleteConversation(conversationId) {
        return await this.conversationModel.findByIdAndDelete(conversationId);
    }

    // async getFullConversationById(conversationId) {
    // 	return await this.conversationModel.findById(conversationId).populate("messages");
    // }

    // async addMessageToConversation(message) {
    // 	const conversation = await this.conversationModel.findById(message.conversationId);
    // 	conversation.messages.push(message);
    // 	return await conversation.save();
    // }
}

export default ConversationsRepository;
