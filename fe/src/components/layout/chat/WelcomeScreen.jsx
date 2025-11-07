import React from 'react';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { useAuth } from './../../../store/context/AuthContext';

const WelcomeScreen = () => {
  const {user} = useAuth()

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
      {/* Icon lớn */}
      <IoChatbubblesOutline size={80} className="text-white/30 mb-6" />

      {/* Lời chào */}
      <h2 className="text-3xl font-bold text-white mb-2">
        Welcome 👋 {user.fullName}
      </h2>
      <p className="text-lg text-gray-300">
        Select a chat to start messaging
      </p>
      <p className="text-gray-400 text-sm mt-1">
        (Hoặc tìm kiếm bạn bè để bắt đầu cuộc trò chuyện mới)
      </p>
    </div>
  );
};

export default WelcomeScreen;