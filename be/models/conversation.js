import { model, Schema } from "mongoose";

const conversationSchema = new Schema(
  {
    pairKey: { type: String, unique: true },
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message"},
  },
  { timestamps: true }
);

const Conversation = model("Conversation", conversationSchema);

export default Conversation;
