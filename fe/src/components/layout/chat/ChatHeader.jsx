import React from 'react';
import { IoCallOutline, IoVideocamOutline, IoInformationCircleOutline } from 'react-icons/io5';

const ChatHeader = ({ fullName, profilePic }) => {
  return (
    <div className="
      flex items-center justify-between 
      p-4 
      bg-black/20       /* Hơi tối hơn 1 chút so với nền */
      border-b border-white/20
    ">
      {/* Thông tin người nhận */}
      <div className="flex items-center space-x-3">
        <img
          src={profilePic}
          alt={`${fullName} profile`}
          className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
        />
        <span className="font-semibold text-white text-lg">{fullName}</span>
        {/* (Bạn có thể thêm trạng thái online ở đây) */}
      </div>

      {/* Các nút hành động (Call, Video, Info) */}
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition duration-200">
          <IoCallOutline size={22} />
        </button>
        <button className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition duration-200">
          <IoVideocamOutline size={22} />
        </button>
        <button className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition duration-200">
          <IoInformationCircleOutline size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;