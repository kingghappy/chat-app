import React, { useState } from "react";
import { IoSend, IoAttach, IoMic } from "react-icons/io5";
import { useMessage } from "../../../store/zustand/auth.store";
import { useAuth } from "./../../../store/context/AuthContext";
import useSendMessage from "../../../hooks/useSendMessage";

const MessageInput = () => {
  const currMessage = useMessage((s) => s.currMessage);
  const addMessage = useMessage((s) => s.addMessage);
  const recipient = useMessage((s) => s.recipient);

  const { user } = useAuth();
  const { sendMessage } = useSendMessage();

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    const messageWrap = {
      _id: Math.random().toString(36).slice(2),
      content: message,
      sender: user.sub,
      recipient,
      createdAt: new Date(),
    };

    addMessage(messageWrap);
    sendMessage(currMessage, message);
    setMessage("");
  };

  return (
    <div className="p-4 bg-black/10 border-t border-white/20">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        {/* Nút đính kèm & Mic (ví dụ) */}
        <button type="button" className="p-2 text-gray-300 hover:text-white">
          <IoAttach size={22} />
        </button>
        <button type="button" className="p-2 text-gray-300 hover:text-white">
          <IoMic size={22} />
        </button>

        {/* Ô nhập text */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="
            flex-1 
            px-4 py-2 
            text-white 
            placeholder-gray-400 
            bg-white/10   /* Nền mờ */
            rounded-full   /* Bo tròn */
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-500 
            focus:bg-white/20
          "
        />

        {/* Nút Gửi */}
        <button
          type="submit"
          className="
            p-2 
            bg-blue-600 
            text-white 
            rounded-full 
            hover:bg-blue-700 
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-500
            transition duration-200
            disabled:opacity-50
          "
          disabled={message.trim() === ""} // Vô hiệu hóa nếu không có text
        >
          <IoSend size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
