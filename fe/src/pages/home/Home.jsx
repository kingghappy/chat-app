import React from 'react';
import Sidebar from './../../components/layout/sidebar/Sidebar';
import ChatContainer from './../../components/layout/chat/ChatContainer';

const Home = () => {
  return (
    // Div này căn giữa toàn bộ khung chat trên màn hình
    // Nó nằm bên trong .app-container (từ App.jsx) đã có ảnh nền
    <div className="flex items-center justify-center h-screen p-4">
      
      {/* Đây là khung 'glassmorphism' chính.
        Nó chứa cả Sidebar và ChatContainer.
      */}
      <div className="
        flex 
        w-full 
        max-w-6xl        /* Giới hạn chiều rộng tối đa */
        h-[90vh]         /* Chiều cao 90% màn hình */
        rounded-2xl
        shadow-2xl
        overflow-hidden  /* Bắt buộc để giữ bo góc cho các component con */
        bg-white/5       /* Nền mờ (glassmorphism) */
        backdrop-blur-lg
        border           /* Thêm viền nhẹ cho đẹp */
        border-white/20
      ">
        {/* Bố cục bên trong rất đơn giản:
          1. Sidebar (sẽ có chiều rộng cố định hoặc % nhỏ)
          2. ChatContainer (sẽ chiếm phần còn lại với flex-1)
        */}
        
        <Sidebar />
        <ChatContainer />
        
      </div>
    </div>
  );
};

export default Home;