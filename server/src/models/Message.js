import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        messageText: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const messageModel = mongoose.model("Message", messageSchema);
export default messageModel;
