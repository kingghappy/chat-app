import  { useEffect, useState, createContext} from 'react'
import io from "socket.io-client";

import { BASE_SERVER } from '../../utils/config';
import { useAuth } from './../../store/context/AuthContext';

// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext(null);


export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  
  // Lấy user từ AuthContext
  const { user } = useAuth()

  // 4. Logic kết nối và ngắt kết nối
  useEffect(() => {
    // Chỉ kết nối khi user đã đăng nhập
    if (user) {
      // Khởi tạo kết nối socket
      // Thay đổi URL thành URL backend của bạn
      const newSocket = io(BASE_SERVER, { 
        // Gửi `userId` lên server qua 'query'
        // Server sẽ lấy nó bằng `socket.handshake.query.userId`
        query: {
          userId: user.sub, // (Giả sử user object có _id)
        },
      });

      setSocket(newSocket);

      // 5. Lắng nghe sự kiện "updateOnlineUsers" từ server
      newSocket.on("updateOnlineUsers", (userIds) => {
        setOnlineUsers(userIds);
      });
      
      console.log("Socket connected:", newSocket.id);

      // 6. Cleanup: ngắt kết nối khi component unmount
      // (ví dụ: khi user đăng xuất)
      return () => {
        newSocket.close(); // Ngắt kết nối socket
        setSocket(null);
        console.log("Socket disconnected");
      };
    } else {
      // Nếu user đăng xuất, đóng socket cũ (nếu có)
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]); // Phụ thuộc vào `user`, chạy lại khi user đăng nhập/đăng xuất

  // 7. Cung cấp socket và danh sách online cho các component con
  const value = {
    socket,
    setSocket,
    onlineUsers,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};