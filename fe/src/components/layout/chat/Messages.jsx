import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { useMessage } from "../../../store/zustand/auth.store";
import { useAuth } from "../../../store/context/AuthContext";
import { useSocket } from "./../../../store/context/SocketContext";
import TypingIndicator from "../../common/TypingIndicator";

const Messages = () => {
  const { user } = useAuth();
  const messages = useMessage((s) => s.messages);
  const currMessage = useMessage((s) => s.currMessage);
  const addMessage = useMessage((s) => s.addMessage);
  const { socket } = useSocket();

  const [isOtherUserTyping, setIsOtherUserTyping] = useState(false);

  // Ref để tự động cuộn xuống tin nhắn cuối
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    // Cuộn xuống dưới cùng mỗi khi tin nhắn thay đổi
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!socket || !currMessage) return;

    // 1. Báo server là tôi đang tham gia phòng này
    console.log(`Tham gia phòng: ${currMessage}`);
    socket.emit("joinRoom", currMessage);
    return () => {
      // Khi bạn rời khỏi phòng chat này, hãy tắt indicator
      setIsOtherUserTyping(false);
      // Bạn cũng có thể emit "leaveRoom" nếu cần
    };
  }, [socket, currMessage]); // Chạy lại khi socket hoặc conversationId thay đổi

  // Effect 2: Lắng nghe tin nhắn MỚI và "Đang gõ"
  useEffect(() => {
    if (!socket) return;

    // 2. Lắng nghe sự kiện "receiveMessage" từ server
    const handleReceiveMessage = (newMessage) => {
      // (Logic này của BE: API POST /message -> server emit "receiveMessage")
      console.log("Nhận được tin nhắn mới:", newMessage);
      addMessage(newMessage);
      setIsOtherUserTyping(false);
    };
    // Lắng nghe "đang gõ"
    const handleUserTyping = ({ userId, isTyping }) => {
      if (userId !== user.sub) {
        setIsOtherUserTyping(isTyping);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("userTyping", handleUserTyping);

    // 3. CLEANUP (CỰC KỲ QUAN TRỌNG)
    // Khi component unmount (chuyển chat), gỡ bỏ listener
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("userTyping", handleUserTyping);
    };
  }, [socket, addMessage, user.sub]);
  return (
    // flex-1: Chiếm hết không gian còn lại
    // overflow-y-auto: Cho phép cuộn
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500 text-center">
            Đây là khởi đầu cuộc trò chuyện của bạn.
            <br />
            Hãy gửi tin nhắn để bắt đầu!
          </p>
        </div>
      ) : (
        // Trường hợp 2: Có tin nhắn
        // Chúng ta bọc list tin nhắn và ref trong React.Fragment (<>...</>)
        <>
          {messages.map((msg) => (
            <Message
              key={msg._id}
              content={msg.content}
              isFromSelf={msg.sender === user.sub}
              timestamp={msg.createdAt}
            />
          ))}

          {isOtherUserTyping && (
            <div className="flex justify-start">
              {" "}
              {/* Căn lề trái */}
              <TypingIndicator />
            </div>
          )}

          {/* Element rỗng để đánh dấu vị trí cuộn xuống */}
          <div ref={endOfMessagesRef} />
        </>
      )}
    </div>
  );
};

export default Messages;
