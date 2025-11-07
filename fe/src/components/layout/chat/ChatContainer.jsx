import React, { useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import ChatHeader from './ChatHeader';
import Messages from './Messages';
import MessageInput from './MessageInput';

const ChatContainer = () => {
  // TODO: State này nên được quản lý toàn cục (Context, Redux, Zustand)
  // Khi người dùng bấm vào 1 Conversation bên Sidebar, state này sẽ được cập nhật.
  // Tạm thời, chúng ta sẽ để là `null` để thấy màn hình Welcome.
  // Đổi `null` thành một object (ví dụ bên dưới) để thấy màn hình Active Chat.
  
  const [selectedConversation, setSelectedConversation] = useState(null);
  
  // const [selectedConversation, setSelectedConversation] = useState({
  //   fullName: 'Sam Edwards',
  //   profilePic: 'https://avatar.iran.liara.run/public/1'
  // });

  return (
    // Component cha đã có: flex-1 flex flex-col border-l border-white/20
    <div className="flex-1 flex flex-col">
      {!selectedConversation ? (
        // 1. Trạng thái CHƯA CHỌN chat
        <WelcomeScreen />
      ) : (
        // 2. Trạng thái ĐÃ CHỌN chat
        <>
          {/* Header (Tên & Ảnh đại diện) */}
          <ChatHeader 
            fullName={selectedConversation.fullName}
            profilePic={selectedConversation.profilePic}
          />

          {/* Khung chứa tin nhắn (sẽ có cuộn) */}
          <Messages />

          {/* Ô nhập tin nhắn */}
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default ChatContainer;