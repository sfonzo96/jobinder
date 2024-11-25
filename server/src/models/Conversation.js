import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
    {
        participants: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
            ],
        },
        lastMessage: {
            messageText: { type: String },
            timestamp: { type: Date },
        },
        uniqueParticipants: { type: String },
    },
    {
        timestamps: true,
    }
);

conversationSchema.pre("save", function (next) {
    this.participants.sort();
    this.uniqueParticipants = this.participants.join(","); //Simular regla pk compuesta
    next();
});

conversationSchema.index({ uniqueParticipants: 1 }, { unique: true });

const ConversationModel = mongoose.model("Conversation", conversationSchema);

export default ConversationModel;
