const TypingIndicator = () => (
  <div className="flex items-center space-x-1 p-2">
    {/* Các chấm, với độ trễ animation khác nhau để tạo hiệu ứng lượn sóng */}
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
  </div>
);

export default TypingIndicator