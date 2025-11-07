import React, { useEffect, useRef } from "react";
import Message from "./Message";

const Messages = () => {
  // TODO: Lấy tin nhắn thật từ API/state
  const dummyMessages = [
    {
      id: 1,
      content: "Hey, how are you?",
      sender: "recipient",
      timestamp: "10:00 AM",
    },
    {
      id: 2,
      content: "I am good, thanks! How about you?",
      sender: "self",
      timestamp: "10:01 AM",
    },
    {
      id: 3,
      content: "Doing great! Working on the new chat UI.",
      sender: "recipient",
      timestamp: "10:02 AM",
    },
    {
      id: 4,
      content: "Awesome! Can you send me a screenshot?",
      sender: "recipient",
      timestamp: "10:02 AM",
    },
    {
      id: 5,
      content: "Sure, here it is.",
      sender: "self",
      timestamp: "10:03 AM",
    },
    {
      id: 6,
      content: "Looks amazing! That glassmorphism effect is cool.",
      sender: "recipient",
      timestamp: "10:05 AM",
    },
  ];

  // Ref để tự động cuộn xuống tin nhắn cuối
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    // Cuộn xuống dưới cùng mỗi khi tin nhắn thay đổi
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [dummyMessages]);

  return (
    // flex-1: Chiếm hết không gian còn lại
    // overflow-y-auto: Cho phép cuộn
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {dummyMessages.map((msg) => (
        <Message
          key={msg.id}
          content={msg.content}
          isFromSelf={msg.sender === "self"}
          timestamp={msg.timestamp}
        />
      ))}
      {/* Element rỗng để đánh dấu vị trí cuộn xuống */}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default Messages;
