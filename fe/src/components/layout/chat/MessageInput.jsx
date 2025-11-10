import React, { useState, useRef } from "react";
import { IoSend, IoAttach, IoMic } from "react-icons/io5";
import { useMessage } from "../../../store/zustand/auth.store";
import { useAuth } from "./../../../store/context/AuthContext";
import { useSocket } from "../../../store/context/SocketContext";

const MessageInput = () => {
  const currMessage = useMessage((s) => s.currMessage);

  const { user } = useAuth();
  const { socket } = useSocket();

  const [message, setMessage] = useState("");
  const typingTimeoutRef = useRef(null);

  const handleTyping = (e) => {
    setMessage(e.target.value);

    if (!socket || !currMessage) return;

    // 1. Gửi sự kiện 'typing: true' ngay lập tức
    // Chỉ gửi nếu chưa gửi (quản lý bởi timeout)
    if (!typingTimeoutRef.current) {
      socket.emit("typing", { roomId: currMessage, isTyping: true });
    }

    // 2. Hủy bỏ timeout cũ (nếu có)
    // Kỹ thuật này gọi là "debouncing"
    clearTimeout(typingTimeoutRef.current);

    
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing", { roomId: currMessage, isTyping: false });
      typingTimeoutRef.current = null; // Reset ref
    }, 2000); // 2 giây
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    
    socket.emit("sendMessage", {
      content: message,
      roomId: currMessage,
      sender: user.sub,
    });
    
    setMessage("");

    if (socket && typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
      socket.emit("typing", { roomId: currMessage, isTyping: false });
    }
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
          onChange={handleTyping}
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
