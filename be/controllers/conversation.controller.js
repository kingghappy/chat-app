import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
import User from "./../models/user.js";

export const getConvController = async (req, res) => {
  const { sub } = req.user;
  const { username } = req.params;
  const { before } = req.query;

  try {
    const peer = await User.findOne({ username }).lean();
    if (!peer) return res.status(404).json({ message: "User not found !!" });
    if (sub === String(peer._id))
      return res.status(400).json({ message: "Can not chat to yourself !!" });

    const pairKey = [String(sub), String(peer._id)].sort().join(":");

    const result = await Conversation.findOneAndUpdate(
      { pairKey },
      { $setOnInsert: { pairKey } },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
        includeResultMetadata: true,
      }
    );

    const convDoc = result.value;
    const wasCreated =
      !!result.lastErrorObject?.upserted ||
      result.lastErrorObject?.updatedExisting === false;

    if (wasCreated) {
      // mới tạo => chắc chắn chưa có message
      return res.json({ convId: String(convDoc._id), messages: [] });
    }

    const match = {
      conversationId: convDoc._id,
    };

    if (before) {
      if (!Types.ObjectId.isValid(before))
        return res.status(400).json({ message: "Invalid beforeId" });
      match._id = { $lt: new Types.ObjectId(before) };
    }

    // đã tồn tại => lấy messages (nên phân trang sau này)
    const messages = await Message.find(
      match,
      { content: 1, sender: 1, recipient: 1, createdAt: 1, _id: 0 } // projection rõ ràng
    )
      .sort({ _id: -1 })
      .limit(20)
      .lean();

    return res.json({
      convId: String(convDoc._id),
      messages: messages.reverse(),
    });
  } catch (error) {
    console.error("conversation.controller.js:getConv error:", error);
    return res.status(500).json({ message: "Internal error" });
  }
};

export const getAllConvController = async (req, res) => {
  // const { sub } = req.user;
console.log("hihi")
  try {
    // const convs = await Conversation.find()
    const users = await User.find()
      .select("-_id username fullName profilePic")
      .lean();

    res.json({ ok: true, users });
  } catch (error) {
    console.log("🚀 conversation.controller.js:80 - error:", error);
  }
};
