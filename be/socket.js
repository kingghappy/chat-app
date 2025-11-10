// /socket.js

import { sendMessageController } from "./controllers/message.controller.js";

// Bản đồ theo dõi (Map) <userId, Set<socketId>>
// State này giờ được quản lý tập trung trong file này
const userSocketMap = new Map();

// Hàm helper để lấy danh sách ID người dùng đang online
const getOnlineUserIds = () => {
  return Array.from(userSocketMap.keys());
};

// Hàm chính export ra ngoài
export const initSocketServer = (io) => {
  
  // Dán toàn bộ logic io.on("connection") của bạn vào đây
  io.on("connection", (socket) => {
    console.log(`Một client đã kết nối: ${socket.id}`);
    
    // Lấy userId và xử lý online
    const userId = socket.handshake.query.userId;
    if (userId) {
      socket.userId = userId; // Lưu lại userId vào socket để dùng khi disconnect

      // Thêm vào Map
      if (!userSocketMap.has(userId)) {
        userSocketMap.set(userId, new Set());
      }
      userSocketMap.get(userId).add(socket.id);

      console.log(`User ${userId} kết nối với socket ${socket.id}`);
      socket.join(userId); // Tham gia phòng riêng

      // Gửi danh sách online cập nhật cho TẤT CẢ client
      io.emit("updateOnlineUsers", getOnlineUserIds());
    }

    // Lắng nghe sự kiện "joinRoom"
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`Client ${socket.id} đã tham gia phòng chat ${roomId}`);
    });

    // Lắng nghe sự kiện "sendMessage"
    socket.on("sendMessage", async(data) => {
      const { roomId, content, sender } = data;

       const newMessage =  await sendMessageController(roomId, content, sender)

      io.to(roomId).emit("receiveMessage", newMessage);
    });
    
    // Lắng nghe sự kiện "typing"
    socket.on("typing", (data) => {
      const { roomId } = data;
      socket.broadcast.to(roomId).emit("userTyping", { userId: socket.userId, isTyping: data.isTyping });
    });

    // Xử lý khi ngắt kết nối
    socket.on("disconnect", () => {
      console.log(`Client đã ngắt kết nối: ${socket.id}`);
      
      const userId = socket.userId;
      if (userId && userSocketMap.has(userId)) {
        const userSockets = userSocketMap.get(userId);
        userSockets.delete(socket.id); // Xóa socket này khỏi Set

        if (userSockets.size === 0) {
          userSocketMap.delete(userId);
          console.log(`User ${userId} đã offline.`);
          
          // Gửi danh sách online cập nhật cho TẤT CẢ client
          io.emit("updateOnlineUsers", getOnlineUserIds());
        }
      }
    });
  });
};