class MessagesRepository {
    constructor(messageModel) {
        this.messageModel = messageModel;
    }

    async createMessage(message) {
        const newMessage = await this.messageModel.create(message);

        const populatedMessage = await this.messageModel
            .findById(newMessage._id)
            .populate({ path: "sender", select: "name" })
            .lean();

        return populatedMessage;
    }

    async getMessagesByConversationId(conversationId) {
        return await this.messageModel
            .find({ conversationId })
            .populate({
                path: "sender",
                select: "name",
            })
            .lean();
    }

    // async updateMessage(id, updates) {
    // 	return this.messageModel.findByIdAndUpdate(id, updates).lean();
    // }

    // async deleteMessage(id) {
    // 	return this.messageModel.findByIdAndDelete(id).lean();
    // }
}

export default MessagesRepository;
