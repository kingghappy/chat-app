import React from "react";
import { useConvs } from "../../../store/zustand/auth.store";
import useGetMessage from "../../../hooks/useGetMessage";

const Conversation = ({ conv, isOnline, actionIcon }) => {
  const { fullName, profilePic, username } = conv;
  const { getMessage } = useGetMessage();
  const setSelectedConv = useConvs((s) => s.setSelectedConv);
  const selectedConv = useConvs((s) => s.selectedConv);
  const isSelected = username === selectedConv?.username;

  const handleClick = async () => {
    setSelectedConv(conv);
    await getMessage(username);
  };

  return (
    <div
      className={`
        flex items-center justify-between p-2 rounded-lg cursor-pointer
        transition duration-200
        ${isSelected ? "bg-blue-600/50" : "hover:bg-white/10"}
      `}
      onClick={handleClick}
    >
      {/* Phần Avatar và Tên */}
      <div className="flex items-center space-x-3">
        {/* Avatar với chấm trạng thái */}
        <div className="relative">
          <img
            src={profilePic}
            alt={`${fullName} profile`}
            className="w-12 h-12 rounded-full object-cover border-2 border-white/50"
          />
          {/* Chấm trạng thái Online/Offline */}
          <span
            className={`
              absolute bottom-0 right-0 block w-3 h-3 rounded-full
              border-2 border-gray-800
              ${isOnline ? "bg-green-500" : "bg-gray-500"}
            `}
          ></span>
        </div>

        {/* Tên và Thông báo */}
        <div className="flex flex-col">
          <span className="font-semibold text-white">{fullName}</span>
          {/* (Bạn có thể thêm tin nhắn cuối cùng ở đây) */}
          {/* <span className="text-sm text-gray-300">Last message...</span> */}
        </div>
      </div>

      {/* Phần Icon bên phải (Notification, Action) */}
      <div className="flex items-center space-x-2">
        {/* Số thông báo mới */}
        {/* {notificationCount > 0 && (
          <span className="flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
            {notificationCount}
          </span>
        )} */}

        {/* Icon hành động (ghim, tắt chuông,...) */}
        {actionIcon && (
          <div className="text-gray-400 hover:text-white">{actionIcon}</div>
        )}
      </div>
    </div>
  );
};

export default Conversation;
