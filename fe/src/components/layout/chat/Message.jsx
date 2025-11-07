import React from 'react';

const Message = ({ content, isFromSelf, timestamp }) => {
  // Quyết định vị trí bong bóng chat
  const alignment = isFromSelf ? 'justify-end' : 'justify-start';
  
  // Quyết định màu sắc bong bóng chat
  const bubbleColor = isFromSelf
    ? 'bg-blue-600 text-white' // Tin nhắn của mình
    : 'bg-gray-700 text-white'; // Tin nhắn của người khác (trong nền tối)
    // Nếu nền sáng, bạn có thể dùng 'bg-gray-200 text-black'

  return (
    <div className={`flex ${alignment}`}>
      <div className="flex flex-col max-w-xs md:max-w-md">
        {/* Bong bóng chat */}
        <div className={`px-4 py-2 rounded-2xl ${bubbleColor} shadow-md`}>
          <p>{content}</p>
        </div>
        
        {/* Dấu thời gian */}
        <span className={`
          text-xs 
          text-gray-400 
          mt-1 
          ${isFromSelf ? 'text-right' : 'text-left'}
        `}>
          {timestamp}
        </span>
      </div>
    </div>
  );
};

export default Message;