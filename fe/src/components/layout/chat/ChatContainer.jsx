import WelcomeScreen from './WelcomeScreen';
import ChatHeader from './ChatHeader';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { useConvs } from '../../../store/zustand/auth.store';

const ChatContainer = () => {
  const selectedConv = useConvs((s) => s.selectedConv)
  
  return (
    // Component cha đã có: flex-1 flex flex-col border-l border-white/20
    <div className="flex-1 flex flex-col">
      {!selectedConv ? (
        // 1. Trạng thái CHƯA CHỌN chat
        <WelcomeScreen />
      ) : (
        // 2. Trạng thái ĐÃ CHỌN chat
        <>
          {/* Header (Tên & Ảnh đại diện) */}
          <ChatHeader 
            fullName={selectedConv.fullName}
            profilePic={selectedConv.profilePic}
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