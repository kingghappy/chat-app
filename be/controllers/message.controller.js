import Conversation from "./../models/conversation.js";
import Message from "./../models/message.js";

// export const sendMessageController = async (req, res) => {
//   const { sub } = req.user;
//   const { convid } = req.params;
//   const { content } = req.body;

//   try {
//     const { pairKey } = await Conversation.findOne({ _id: convid })
//       .select("-_id pairKey")
//       .lean();
//     if (!pairKey)
//       return res.status(404).json({ message: "Conversation not found !!" });

//     const [, recipient] = pairKey.split(":");

//     const newMessage = new Message({
//       conversationId: convid,
//       content,
//       sender: sub,
//       recipient,
//     });
//     await newMessage.save();

//     res.json({ oke: true });
//   } catch (error) {
//     console.log("🚀 message.controller.js:28 - error:", error);
//   }
// };


export const sendMessageController = async (roomId, content, sender) => {

  try {
    const { pairKey } = await Conversation.findOne({ _id: roomId })
      .select("-_id pairKey")
      .lean();
    if (!pairKey)
      return res.status(404).json({ message: "Conversation not found !!" });

    const [, recipient] = pairKey.split(":");

    const newMessage = new Message({
      conversationId: roomId,
      content,
      sender,
      recipient,
    });
    
   return await newMessage.save();


  } catch (error) {
    console.log("🚀 message.controller.js:28 - error:", error);
  }
};