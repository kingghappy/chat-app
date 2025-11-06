import { model, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    conversationId: { type: Schema.Types.ObjectId, ref: "Conversation" },
    content: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    recipient: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
messageSchema.index({ conversation: 1, createdAt: -1 })

const Message = model("Message", messageSchema)

export default Message
