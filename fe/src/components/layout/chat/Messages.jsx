import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { useMessage } from "../../../store/zustand/auth.store";
import { useAuth } from "../../../store/context/AuthContext";

const Messages = () => {
  const { user } = useAuth();
  const messages = useMessage((s) => s.messages);

  // Ref để tự động cuộn xuống tin nhắn cuối
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    // Cuộn xuống dưới cùng mỗi khi tin nhắn thay đổi
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
          {/* Element rỗng để đánh dấu vị trí cuộn xuống */}
          <div ref={endOfMessagesRef} />
        </>
      )}
    </div>
  );
};

export default Messages;
